#!/bin/bash

echo "🚀 Setting up MindMate..."

# Check if Python is installed
if ! command -v python &> /dev/null; then
    echo "❌ Python not found! Please install Python 3.10+"
    exit 1
fi

# Check if Node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found! Please install Node.js 18+"
    exit 1
fi

# Setup Backend
echo "📦 Setting up backend..."
cd backend
python -m venv venv

# Activate virtual environment (Windows Git Bash)
source venv/Scripts/activate

# Install Python packages
pip install -r requirements.txt

# Create .env file
echo "SECRET_KEY=your-secret-key-here-change-in-production" > .env
echo "DEBUG=True" >> .env
echo "DATABASE_URL=sqlite:///db.sqlite3" >> .env

echo "✅ Backend setup complete!"

# Setup Frontend
echo "📦 Setting up frontend..."
cd ../frontend
npm install

echo "✅ Frontend setup complete!"

echo ""
echo "🎉 Setup complete! Next steps:"
echo "1. cd backend && source venv/Scripts/activate && python manage.py runserver"
echo "2. Open new terminal: cd frontend && npm start"