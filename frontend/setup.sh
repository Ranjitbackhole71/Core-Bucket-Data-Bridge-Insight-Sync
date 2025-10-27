#!/bin/bash

# Land Utilization RL System Frontend Setup Script
# This script helps set up the frontend on Unix-like systems (Linux, macOS)

echo "🚀 Setting up Land Utilization RL System Frontend..."
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed"
    echo "Please install Node.js (v18 or higher) from https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v)
echo "✅ Node.js version: $NODE_VERSION"

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "❌ npm is not installed"
    echo "Please install Node.js (which includes npm) from https://nodejs.org/"
    exit 1
fi

# Check npm version
NPM_VERSION=$(npm -v)
echo "✅ npm version: $NPM_VERSION"

echo
echo "📦 Installing dependencies..."
echo

# Install dependencies
npm install

if [ $? -eq 0 ]; then
    echo
    echo "🎉 Dependencies installed successfully!"
    echo
    echo "To start the development server, run:"
    echo "npm run dev"
    echo
    echo "The application will be available at http://localhost:3000"
    echo
else
    echo
    echo "❌ Error installing dependencies"
    echo "Please check the error messages above"
    exit 1
fi