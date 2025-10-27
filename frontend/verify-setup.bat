@echo off
echo Verifying Land Utilization RL System frontend setup...
echo.

REM Check if required directories exist
if not exist "app" (
    echo ❌ Error: app directory not found
    exit /b 1
)

if not exist "components" (
    echo ❌ Error: components directory not found
    exit /b 1
)

if not exist "lib" (
    echo ❌ Error: lib directory not found
    exit /b 1
)

if not exist "types" (
    echo ❌ Error: types directory not found
    exit /b 1
)

if not exist "public" (
    echo ❌ Error: public directory not found
    exit /b 1
)

echo ✅ Required directories exist

REM Check if required configuration files exist
if not exist "package.json" (
    echo ❌ Error: package.json not found
    exit /b 1
)

if not exist "tsconfig.json" (
    echo ❌ Error: tsconfig.json not found
    exit /b 1
)

if not exist "tailwind.config.js" (
    echo ❌ Error: tailwind.config.js not found
    exit /b 1
)

if not exist "postcss.config.js" (
    echo ❌ Error: postcss.config.js not found
    exit /b 1
)

if not exist ".env.local" (
    echo ❌ Error: .env.local not found
    exit /b 1
)

echo ✅ Required configuration files exist

REM Check if required page directories exist
if not exist "app\dashboard" (
    echo ❌ Error: app/dashboard directory not found
    exit /b 1
)

if not exist "app\case" (
    echo ❌ Error: app/case directory not found
    exit /b 1
)

if not exist "app\feedback" (
    echo ❌ Error: app/feedback directory not found
    exit /b 1
)

if not exist "app\logs" (
    echo ❌ Error: app/logs directory not found
    exit /b 1
)

if not exist "app\about" (
    echo ❌ Error: app/about directory not found
    exit /b 1
)

echo ✅ Required page directories exist

REM Check if required page files exist
if not exist "app\dashboard\page.tsx" (
    echo ❌ Error: app/dashboard/page.tsx not found
    exit /b 1
)

if not exist "app\case\page.tsx" (
    echo ❌ Error: app/case/page.tsx not found
    exit /b 1
)

if not exist "app\feedback\page.tsx" (
    echo ❌ Error: app/feedback/page.tsx not found
    exit /b 1
)

if not exist "app\logs\page.tsx" (
    echo ❌ Error: app/logs/page.tsx not found
    exit /b 1
)

if not exist "app\about\page.tsx" (
    echo ❌ Error: app/about/page.tsx not found
    exit /b 1
)

echo ✅ Required page files exist

REM Check if required API client exists
if not exist "lib\api.ts" (
    echo ❌ Error: lib/api.ts not found
    exit /b 1
)

echo ✅ API client exists

REM Check if required type definitions exist
if not exist "types\index.ts" (
    echo ❌ Error: types/index.ts not found
    exit /b 1
)

echo ✅ Type definitions exist

REM Check if required documentation exists
if not exist "README.md" (
    echo ❌ Error: README.md not found
    exit /b 1
)

if not exist "VALIDATION_CHECKLIST.md" (
    echo ❌ Error: VALIDATION_CHECKLIST.md not found
    exit /b 1
)

echo ✅ Documentation files exist

echo.
echo 🎉 All required files and directories are present!
echo.
echo Next steps:
echo 1. Run install-deps.bat to install dependencies
echo 2. Run start-dev.bat to start the development server
echo.