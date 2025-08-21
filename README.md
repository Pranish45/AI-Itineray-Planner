
# 🧠✈️ AI Itinerary Planner - Modern Web Application

> **"Plan less, travel more — with the power of AI."**

The **AI Itinerary Planner** is now a cutting-edge web application featuring a modern React frontend with stunning animations, glass morphism effects, and a powerful Flask backend API. Experience the future of travel planning with AI-powered itineraries that adapt to your style, budget, and interests.

![AI Itinerary Planner](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Flask](https://img.shields.io/badge/Flask-2.3.3-red)
![AI](https://img.shields.io/badge/AI-Gemini%202.0%20Flash-orange)

---

## 🚀 What's New

✨ **Modern React Frontend**
- Beautiful glass morphism UI with backdrop blur effects
- Smooth animations powered by Framer Motion
- Responsive design that works on all devices
- Interactive form with smart suggestions

🎨 **Cutting-Edge Design**
- Gradient backgrounds and modern color schemes
- Floating cards with hover effects
- Smooth scroll animations and micro-interactions
- Professional typography with Google Fonts

🧠 **Enhanced AI Backend**
- RESTful Flask API with CORS support
- Multiple endpoints for different features
- Better error handling and logging
- Structured JSON responses

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **Lucide React** - Beautiful & consistent icon toolkit
- **React Hot Toast** - Elegant notifications

### Backend
- **Flask** - Lightweight Python web framework
- **Google Gemini AI** - Advanced AI model for itinerary generation
- **Flask-CORS** - Cross-origin resource sharing
- **Python-dotenv** - Environment variable management

---

## 📦 Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd ai-itinerary-planner
```

### 2. Backend Setup
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Set environment variables
cp .env.example .env
# Edit .env with your Gemini API key
```

### 3. Frontend Setup
```bash
# Install Node.js dependencies
npm install

# Start development server
npm start
```

### 4. Start Backend Server
```bash
# In a new terminal (with venv activated)
python app.py
```

---

## 🌟 Features

### ✨ Interactive Form
- **Smart Input Fields** - Auto-complete and validation
- **Interest Suggestions** - Quick-add buttons for common interests
- **Budget Selection** - Visual budget level picker
- **Travel Style** - Choose your adventure type

### 🎯 AI-Powered Planning
- **Personalized Itineraries** - Based on your preferences
- **Smart Scheduling** - Optimized daily plans
- **Local Insights** - Hidden gems and pro tips
- **Budget Awareness** - Cost estimates for activities

### 📱 Modern UI/UX
- **Glass Morphism** - Beautiful backdrop blur effects
- **Smooth Animations** - Framer Motion powered interactions
- **Responsive Design** - Works perfectly on all devices
- **Dark Theme** - Easy on the eyes

### 🔄 Real-time Features
- **Live Updates** - Instant itinerary generation
- **Interactive Elements** - Hover effects and micro-animations
- **Toast Notifications** - User feedback and status updates
- **Loading States** - Beautiful loading animations

---

## 🚀 Usage

### 1. Open the Application
Navigate to `http://localhost:3000` in your browser

### 2. Fill Out the Form
- Enter your destination city
- Select number of days
- Choose your interests
- Pick budget level
- Select travel style

### 3. Generate Itinerary
Click "Generate AI Itinerary" and watch the magic happen!

### 4. Explore Your Plan
- Navigate between days
- View detailed schedules
- Download or share your itinerary
- Get local tips and insights

---

## 🔧 API Endpoints

### Generate Itinerary
```
POST /api/generate-itinerary
Content-Type: application/json

{
  "city": "Paris",
  "days": 3,
  "interests": ["Culture", "Food", "Art"],
  "budget": "moderate",
  "travel_style": "balanced"
}
```

### Get Suggestions
```
GET /api/suggestions?city=Paris
```

### Get Weather Tips
```
GET /api/weather-tips?city=Paris&season=summer
```

---

## 🎨 Customization

### Colors & Themes
Edit `tailwind.config.js` to customize:
- Color schemes
- Typography
- Animations
- Spacing

### Components
All React components are modular and easily customizable:
- `src/components/Header.js` - Navigation and branding
- `src/components/Hero.js` - Hero section
- `src/components/ItineraryForm.js` - Main form
- `src/components/ItineraryDisplay.js` - Results display
- `src/components/Features.js` - Feature showcase
- `src/components/Footer.js` - Footer and links

---

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** - Full feature set with side-by-side layouts
- **Tablet** - Adaptive layouts with touch-friendly interactions
- **Mobile** - Mobile-first design with optimized navigation

---

## 🚀 Deployment

### Frontend (React)
```bash
npm run build
# Deploy the build folder to your hosting service
```

### Backend (Flask)
```bash
# Set production environment variables
export FLASK_ENV=production
export PORT=5000

# Run with production server
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful AI capabilities
- **Framer Motion** for beautiful animations
- **Tailwind CSS** for modern styling
- **React Community** for excellent tooling

---

## 📞 Support

- **Email**: hello@aitravel.com
- **Documentation**: [docs.aitravel.com](https://docs.aitravel.com)
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)

---

**Ready to transform your travel experience? Start planning with AI today! 🚀✈️**

