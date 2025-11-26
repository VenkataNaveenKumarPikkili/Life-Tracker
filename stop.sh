#!/bin/bash

echo "🛑 Stopping Life Tracker services..."

kill -9 $(lsof -t -i:8000) 2>/dev/null
kill -9 $(lsof -t -i:8001) 2>/dev/null
pkill -f "npm run dev" 2>/dev/null

echo "👌 Services stopped."
