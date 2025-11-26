#!/bin/bash

echo "🚀 Starting Life Tracker Microservices..."

# Start API Gateway
echo "🔷 Starting API Gateway on port 8000..."
cd life-tracker-api-gateway
nohup node server.js > ../logs/api-gateway.log 2>&1 &

# Start Habit Service
echo "🔵 Starting Habit Service on port 8001..."
cd ../life-tracker-habit-service
nohup uvicorn main:app --reload --port 8001 > ../logs/habit.log 2>&1 &

# Start Frontend
echo "🟩 Starting Frontend on port 5173..."
cd ../life-tracker-frontend
nohup npm run dev > ../logs/frontend.log 2>&1 &

echo ""
echo "✨ All services running!"
echo "🌍 UI → http://localhost:5173"
echo "🔗 API Gateway → http://localhost:8000"
echo "📊 Habit Service → http://localhost:8001"
echo ""
