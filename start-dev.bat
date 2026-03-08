@echo off
echo Starting Job Finder App - Full Stack Development Environment
echo.
echo This will start both the Angular frontend and Laravel backend
echo.

REM Get the current directory
setlocal
cd /d "%~dp0"

REM Check if api directory exists
if not exist "api" (
    echo Error: api directory not found. Please ensure you're in the job-finder-app root directory.
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
)

REM Check if vendor exists in api
if not exist "api\vendor" (
    echo Installing backend dependencies...
    cd api
    call composer install
    cd ..
)

REM Create two terminals
echo Starting Angular frontend on http://localhost:4200
start "Job Finder Frontend" cmd /k "npm start"

echo Starting Laravel backend on http://localhost:8000
start "Job Finder Backend" cmd /k "cd api && php artisan serve"

echo.
echo Both services are starting in separate windows...
echo Frontend: http://localhost:4200
echo Backend: http://localhost:8000
echo.
echo Press any key to close this window...
pause
