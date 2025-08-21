
# 🧠✈️ AI Itinerary Planner - Modern Web Application

> **"Plan less, travel more — with the power of AI."**

The **AI Itinerary Planner** is a cutting-edge, full-stack web application that creates personalized, optimized travel plans using advanced AI technology. Built with modern web technologies, it features a stunning interactive UI, real-time AI responses, and a seamless user experience.

![AI Itinerary Planner](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Flask](https://img.shields.io/badge/Flask-2.3.3-red)
![AI](https://img.shields.io/badge/AI-Gemini%202.0-orange)

---

## 🚀 Features

### ✨ Modern UI/UX
- **Glass Morphism Design** - Beautiful translucent effects and modern aesthetics
- **Smooth Animations** - Framer Motion powered interactions and micro-animations
- **Responsive Design** - Mobile-first approach with perfect desktop experience
- **Interactive Components** - Dynamic forms, real-time updates, and engaging elements

### 🧠 AI-Powered Intelligence
- **Gemini 2.0 Flash** - Latest AI model for intelligent travel planning
- **Personalized Itineraries** - Tailored to your interests, budget, and travel style
- **Smart Recommendations** - Location-based suggestions and hidden gems
- **Real-time Generation** - Instant itinerary creation with progress tracking

### 🌍 Travel Features
- **Global Coverage** - 50+ countries with detailed local insights
- **Multi-day Planning** - 1-30 day itineraries with daily breakdowns
- **Interest-based Filtering** - Culture, food, adventure, relaxation, and more
- **Budget Optimization** - Budget, moderate, and luxury travel options
- **Travel Style Matching** - Relaxed, balanced, or adventurous experiences

### 💻 Technical Excellence
- **Full-Stack Architecture** - React frontend + Flask backend
- **RESTful API** - Clean, documented endpoints with error handling
- **Modern Tooling** - Tailwind CSS, PostCSS, and optimized build process
- **Performance Optimized** - Lazy loading, code splitting, and efficient rendering

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Latest React with hooks and modern patterns
- **Framer Motion** - Professional animations and transitions
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **Lucide React** - Beautiful, consistent icon library
- **Axios** - HTTP client for API communication
- **React Hot Toast** - Elegant notifications and feedback

### Backend
- **Flask** - Lightweight Python web framework
- **Google Generative AI** - Gemini 2.0 Flash for AI responses
- **Flask-CORS** - Cross-origin resource sharing support
- **Python-dotenv** - Environment variable management
- **Geopy** - Geocoding and location services

### Development Tools
- **PostCSS** - CSS processing and optimization
- **Autoprefixer** - CSS vendor prefixing
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting

---

## 📦 Installation & Setup

### Prerequisites
- **Node.js** 18+ and **npm** 9+
- **Python** 3.8+
- **Git** for version control

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd ai-itinerary-planner
```

### 2. Backend Setup (Flask)
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

# Run Flask backend
python app.py
```

### 3. Frontend Setup (React)
```bash
# Install Node.js dependencies
npm install

# Start development server
npm start
```

### 4. Environment Variables
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
FLASK_ENV=development
PORT=5000
```

---

## 🚀 Running the Application

### Development Mode
```bash
# Terminal 1 - Backend
cd backend
python app.py

# Terminal 2 - Frontend
cd frontend
npm start
```

### Production Build
```bash
# Build React app
npm run build

# Serve with Flask
python app.py
```

### Docker (Optional)
```bash
# Build and run with Docker
docker build -t ai-itinerary-planner .
docker run -p 5000:5000 ai-itinerary-planner
```

---

## 📱 Usage

### 1. **Plan Your Trip**
- Enter your destination city
- Select trip duration (1-30 days)
- Choose your interests and preferences
- Set budget level and travel style

### 2. **AI Generation**
- Click "Generate AI Itinerary"
- Watch real-time progress with beautiful animations
- Receive personalized travel plan in seconds

### 3. **Explore & Customize**
- Navigate through daily activities
- Download your itinerary as text
- Share with friends and family
- Create new plans for different destinations

---

## 🔧 API Endpoints

### Core Endpoints
- `GET /api/health` - Health check
- `POST /api/generate-itinerary` - Generate travel itinerary
- `GET /api/suggestions` - Get travel tips and hidden gems
- `GET /api/weather-tips` - Weather-based travel advice

### Request Example
```json
POST /api/generate-itinerary
{
  "city": "Paris",
  "days": 5,
  "interests": ["Culture & History", "Food & Dining"],
  "budget": "moderate",
  "travel_style": "balanced"
}
```

---

## 🎨 Customization

### Styling
- **Colors**: Modify `tailwind.config.js` for brand colors
- **Animations**: Adjust Framer Motion settings in components
- **Layout**: Customize component structure and spacing

### Features
- **AI Prompts**: Enhance prompts in `app.py` for better responses
- **New Components**: Add React components in `src/components/`
- **API Endpoints**: Extend Flask backend with new functionality

---

## 🚀 Deployment

### Frontend (React)
```bash
npm run build
# Deploy build/ folder to your hosting service
```

### Backend (Flask)
```bash
# Production server
gunicorn -w 4 -b 0.0.0.0:5000 app:app

# Environment variables
export FLASK_ENV=production
export GEMINI_API_KEY=your_production_key
```

### Recommended Hosting
- **Frontend**: Vercel, Netlify, or AWS S3
- **Backend**: Heroku, DigitalOcean, or AWS EC2
- **Database**: MongoDB Atlas or PostgreSQL

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow React best practices and hooks patterns
- Use TypeScript for better type safety (optional)
- Maintain consistent code formatting with Prettier
- Write meaningful commit messages

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful AI capabilities
- **Framer Motion** for stunning animations
- **Tailwind CSS** for beautiful design system
- **React Community** for amazing tools and libraries

---

## 📞 Support

- **Documentation**: [Project Wiki](wiki-link)
- **Issues**: [GitHub Issues](issues-link)
- **Discussions**: [GitHub Discussions](discussions-link)
- **Email**: support@aiitineraryplanner.com

---

## 🔮 Roadmap

### Phase 1 (Current)
- ✅ Core AI itinerary generation
- ✅ Modern React frontend
- ✅ Responsive design
- ✅ Basic API endpoints

### Phase 2 (Next)
- 🚧 Interactive maps integration
- 🚧 Social sharing features
- 🚧 User accounts and history
- 🚧 Advanced AI customization

### Phase 3 (Future)
- 📋 Multi-language support
- 📋 Offline capabilities
- 📋 Advanced analytics
- 📋 Mobile app development

---

**Made with ❤️ by the AI Itinerary Planner Team**

*Transform your travel planning experience with the power of AI!*

