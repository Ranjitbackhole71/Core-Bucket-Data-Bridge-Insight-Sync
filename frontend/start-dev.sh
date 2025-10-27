#!/bin/bash

# Land Utilization RL System Frontend Development Server Script
# This script starts the development server on Unix-like systems (Linux, macOS)

echo "🚀 Starting Land Utilization RL System Frontend Development Server..."
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed"
    echo "Please install Node.js (v18 or higher) from https://nodejs.org/"
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "❌ Dependencies not installed"
    echo "Please run setup.sh first"
    exit 1
fi

echo "✅ Starting development server..."
echo
echo "The application will be available at http://localhost:3000"
echo
echo "Press Ctrl+C to stop the server"
echo

# Start the development server
npm run dev