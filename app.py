from flask import Flask, request, jsonify
from flask_cors import CORS
from google.generativeai import configure, GenerativeModel
import os
from dotenv import load_dotenv
import json
from typing import List, Dict, Any
import logging

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Configure Gemini API
api_key = os.getenv('GEMINI_API_KEY', 'AIzaSyCjvR39xym6c9bEdo_qaPkwI0LUC7qw-Mo')
configure(api_key=api_key)
gemini_model = GenerativeModel("gemini-2.0-flash")

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "AI Itinerary Planner API is running"})

@app.route('/api/generate-itinerary', methods=['POST'])
def generate_itinerary():
    """Generate AI-powered travel itinerary"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        city = data.get('city', '').strip()
        interests = data.get('interests', [])
        days = data.get('days', 1)
        budget = data.get('budget', 'moderate')
        travel_style = data.get('travel_style', 'balanced')
        
        if not city or not interests or days <= 0:
            return jsonify({"error": "Invalid input parameters"}), 400
        
        # Enhanced prompt for better AI responses
        prompt = f"""
        Create a detailed, engaging {days}-day travel itinerary for {city} that includes:
        
        Destination: {city}
        Duration: {days} days
        Interests: {', '.join(interests)}
        Budget Level: {budget}
        Travel Style: {travel_style}
        
        For each day, provide:
        1. 🌅 Morning: Cultural activities, sightseeing, or nature experiences
        2. 🌞 Afternoon: Adventure activities, historical tours, or food experiences  
        3. 🌙 Evening: Entertainment, nightlife, or relaxation options
        4. 🍽️ Recommended local restaurants and cafes
        5. 🚗 Transportation tips and best routes
        6. 💰 Estimated costs for activities
        7. ⚠️ Important tips and local customs
        
        Make it personal, practical, and exciting. Include specific location names, timing, and insider tips.
        Format as structured JSON with clear sections for each day.
        """
        
        response = gemini_model.generate_content(prompt)
        
        if response and response.text:
            # Try to parse as JSON, fallback to text if needed
            try:
                itinerary_data = json.loads(response.text)
                return jsonify({
                    "success": True,
                    "itinerary": itinerary_data,
                    "city": city,
                    "days": days,
                    "interests": interests
                })
            except json.JSONDecodeError:
                # Return as formatted text if not JSON
                return jsonify({
                    "success": True,
                    "itinerary": response.text,
                    "city": city,
                    "days": days,
                    "interests": interests,
                    "format": "text"
                })
        else:
            return jsonify({"error": "Failed to generate itinerary"}), 500
            
    except Exception as e:
        logger.error(f"Error generating itinerary: {str(e)}")
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500

@app.route('/api/suggestions', methods=['GET'])
def get_suggestions():
    """Get travel suggestions and tips"""
    try:
        city = request.args.get('city', '').strip()
        if not city:
            return jsonify({"error": "City parameter required"}), 400
        
        prompt = f"""
        Provide 5 unique travel tips and hidden gems for {city} that most tourists don't know about.
        Include:
        - Local food spots
        - Hidden attractions
        - Best photo spots
        - Cultural insights
        - Money-saving tips
        
        Format as a concise list with practical advice.
        """
        
        response = gemini_model.generate_content(prompt)
        
        if response and response.text:
            return jsonify({
                "success": True,
                "city": city,
                "suggestions": response.text
            })
        else:
            return jsonify({"error": "Failed to generate suggestions"}), 500
            
    except Exception as e:
        logger.error(f"Error getting suggestions: {str(e)}")
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500

@app.route('/api/weather-tips', methods=['GET'])
def get_weather_tips():
    """Get weather-based travel tips"""
    try:
        city = request.args.get('city', '').strip()
        season = request.args.get('season', 'current')
        
        if not city:
            return jsonify({"error": "City parameter required"}), 400
        
        prompt = f"""
        Provide weather-appropriate travel tips for {city} during {season}.
        Include:
        - What to pack
        - Best activities for the weather
        - Indoor/outdoor alternatives
        - Seasonal attractions
        - Weather considerations for activities
        
        Make it practical and helpful for travelers.
        """
        
        response = gemini_model.generate_content(prompt)
        
        if response and response.text:
            return jsonify({
                "success": True,
                "city": city,
                "season": season,
                "weather_tips": response.text
            })
        else:
            return jsonify({"error": "Failed to generate weather tips"}), 500
            
    except Exception as e:
        logger.error(f"Error getting weather tips: {str(e)}")
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)