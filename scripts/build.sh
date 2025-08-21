#!/bin/bash

# Build script for AI Travel Planner

echo "🔨 Building AI Travel Planner"
echo "============================="

# Build frontend
echo "📦 Building React frontend..."
cd frontend
npm run build
cd ..

echo "✅ Frontend build complete!"
echo "📁 Build files are in frontend/build/"

# Build Docker image
echo "🐳 Building Docker image..."
docker build -t ai-travel-planner:latest .

echo "✅ Docker image built successfully!"
echo ""
echo "🚀 To run the built image:"
echo "docker run -p 8000:8000 -e GEMINI_API_KEY=your_key ai-travel-planner:latest"