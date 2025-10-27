@echo off
echo Installing dependencies for Land Utilization RL System frontend...
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

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: npm is not installed or not in PATH
    echo Please install Node.js (which includes npm) from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo npm version:
npm --version
echo.

echo Installing dependencies...
npm install

if %errorlevel% equ 0 (
    echo.
    echo Dependencies installed successfully!
    echo.
    echo To start the development server, run:
    echo npm run dev
    echo.
) else (
    echo.
    echo Error installing dependencies.
    echo Please check the error messages above.
    echo.
)

pause