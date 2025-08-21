from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List, Optional
import json
import asyncio
import os
from google.generativeai import configure, GenerativeModel
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="AI Travel Planner", description="Cutting-edge AI-powered travel itinerary planner")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini AI
api_key = os.getenv("GEMINI_API_KEY", "AIzaSyCjvR39xym6c9bEdo_qaPkwI0LUC7qw-Mo")
configure(api_key=api_key)
gemini_model = GenerativeModel("gemini-2.0-flash")

# Pydantic models
class TravelRequest(BaseModel):
    city: str
    interests: List[str]
    days: int
    budget: Optional[str] = "medium"
    travel_style: Optional[str] = "balanced"
    accommodation_type: Optional[str] = "hotel"

class ItineraryResponse(BaseModel):
    success: bool
    itinerary: str
    structured_data: Optional[dict] = None
    insights: Optional[dict] = None

# WebSocket connection manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

# Enhanced itinerary generation
async def generate_enhanced_itinerary(request: TravelRequest) -> dict:
    interest_str = ", ".join(request.interests)
    
    prompt = f"""
    Create a comprehensive {request.days}-day travel itinerary for {request.city} with the following specifications:
    - Interests: {interest_str}
    - Budget level: {request.budget}
    - Travel style: {request.travel_style}
    - Accommodation preference: {request.accommodation_type}
    
    Please structure your response as a detailed JSON object with the following format:
    {{
        "overview": {{
            "destination": "{request.city}",
            "duration": {request.days},
            "total_estimated_cost": "cost range",
            "best_time_to_visit": "season/months",
            "weather_overview": "weather description"
        }},
        "daily_itinerary": [
            {{
                "day": 1,
                "theme": "day theme",
                "morning": {{
                    "time": "9:00 AM - 12:00 PM",
                    "activity": "activity description",
                    "location": "specific location",
                    "cost": "estimated cost",
                    "tips": "helpful tips"
                }},
                "afternoon": {{
                    "time": "1:00 PM - 5:00 PM",
                    "activity": "activity description",
                    "location": "specific location",
                    "cost": "estimated cost",
                    "tips": "helpful tips"
                }},
                "evening": {{
                    "time": "6:00 PM - 10:00 PM",
                    "activity": "activity description",
                    "location": "specific location",
                    "cost": "estimated cost",
                    "tips": "helpful tips"
                }}
            }}
        ],
        "travel_insights": {{
            "transportation": "best ways to get around",
            "local_culture": "cultural tips and etiquette",
            "food_recommendations": "must-try local dishes",
            "packing_suggestions": "what to pack",
            "safety_tips": "safety considerations",
            "money_tips": "currency and payment methods"
        }},
        "alternative_activities": [
            "backup activity 1",
            "backup activity 2",
            "backup activity 3"
        ]
    }}
    
    Make sure the response is valid JSON and includes specific, actionable recommendations.
    """

    try:
        response = gemini_model.generate_content(prompt)
        
        # Try to parse as JSON first
        try:
            structured_data = json.loads(response.text)
            return {
                "success": True,
                "raw_text": response.text,
                "structured_data": structured_data,
                "insights": structured_data.get("travel_insights", {})
            }
        except json.JSONDecodeError:
            # If JSON parsing fails, return as text with basic structure
            return {
                "success": True,
                "raw_text": response.text,
                "structured_data": None,
                "insights": None
            }
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "raw_text": f"Error generating itinerary: {str(e)}"
        }

@app.post("/api/generate-itinerary", response_model=ItineraryResponse)
async def create_itinerary(request: TravelRequest):
    """Generate a comprehensive travel itinerary using AI"""
    try:
        result = await generate_enhanced_itinerary(request)
        
        return ItineraryResponse(
            success=result["success"],
            itinerary=result["raw_text"],
            structured_data=result.get("structured_data"),
            insights=result.get("insights")
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket endpoint for real-time itinerary generation"""
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            request_data = json.loads(data)
            
            # Send progress updates
            await manager.send_personal_message(
                json.dumps({"type": "progress", "message": "Starting itinerary generation..."}),
                websocket
            )
            
            # Generate itinerary
            travel_request = TravelRequest(**request_data)
            
            await manager.send_personal_message(
                json.dumps({"type": "progress", "message": f"Analyzing {travel_request.city}..."}),
                websocket
            )
            
            result = await generate_enhanced_itinerary(travel_request)
            
            await manager.send_personal_message(
                json.dumps({"type": "progress", "message": "Finalizing recommendations..."}),
                websocket
            )
            
            # Send final result
            await manager.send_personal_message(
                json.dumps({
                    "type": "result",
                    "data": result
                }),
                websocket
            )
            
    except WebSocketDisconnect:
        manager.disconnect(websocket)

@app.get("/api/destinations")
async def get_popular_destinations():
    """Get popular travel destinations with metadata"""
    destinations = [
        {
            "name": "Tokyo, Japan",
            "category": "Urban Culture",
            "image": "tokyo.jpg",
            "highlights": ["Technology", "Food", "Culture", "Shopping"],
            "best_season": "Spring/Fall"
        },
        {
            "name": "Paris, France",
            "category": "Romance & Art",
            "image": "paris.jpg",
            "highlights": ["Museums", "Architecture", "Cuisine", "History"],
            "best_season": "Spring/Summer"
        },
        {
            "name": "Bali, Indonesia",
            "category": "Nature & Relaxation",
            "image": "bali.jpg",
            "highlights": ["Beaches", "Temples", "Nature", "Wellness"],
            "best_season": "Dry Season"
        },
        {
            "name": "New York, USA",
            "category": "Urban Adventure",
            "image": "nyc.jpg",
            "highlights": ["Entertainment", "Food", "Museums", "Shopping"],
            "best_season": "Spring/Fall"
        }
    ]
    return destinations

@app.get("/api/interests")
async def get_interest_categories():
    """Get categorized interest options"""
    categories = {
        "Adventure": ["Hiking", "Water Sports", "Extreme Sports", "Rock Climbing", "Skiing"],
        "Culture": ["Museums", "Historical Sites", "Art Galleries", "Local Festivals", "Architecture"],
        "Food & Drink": ["Fine Dining", "Street Food", "Wine Tasting", "Cooking Classes", "Local Markets"],
        "Nature": ["National Parks", "Wildlife", "Beaches", "Mountains", "Gardens"],
        "Entertainment": ["Nightlife", "Live Music", "Theater", "Casinos", "Theme Parks"],
        "Relaxation": ["Spas", "Yoga Retreats", "Beach Resorts", "Hot Springs", "Meditation"],
        "Shopping": ["Local Markets", "Luxury Shopping", "Vintage Stores", "Artisan Crafts", "Souvenirs"],
        "Photography": ["Scenic Views", "Architecture", "Wildlife", "Street Photography", "Sunrise/Sunset"]
    }
    return categories

# Serve static files (React build)
app.mount("/static", StaticFiles(directory="frontend/build/static"), name="static")

@app.get("/{full_path:path}")
async def serve_react_app(full_path: str):
    """Serve React app for all non-API routes"""
    if full_path.startswith("api/"):
        raise HTTPException(status_code=404, detail="API endpoint not found")
    
    # Check if file exists in build directory
    file_path = f"frontend/build/{full_path}"
    if os.path.exists(file_path) and os.path.isfile(file_path):
        return FileResponse(file_path)
    
    # Default to index.html for React routing
    return FileResponse("frontend/build/index.html")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)