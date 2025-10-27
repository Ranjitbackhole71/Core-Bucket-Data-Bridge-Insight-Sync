@echo off
echo Starting Land Utilization RL System frontend development server...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Check if dependencies are installed
if not exist "node_modules" (
    echo Error: Dependencies not installed
    echo Please run install-deps.bat first
    echo.
    pause
    exit /b 1
)

echo Starting development server...
echo.
echo The application will be available at http://localhost:3000
echo.
npm run dev