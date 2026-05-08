@echo off
echo ========================================================
echo        Starting SchoolFee Now - Fullstack App
echo ========================================================

echo Starting Backend Server...
cd "backend"
start "SchoolFee Now - Backend" cmd /k "npx nodemon server.js"

echo Starting Frontend Server...
cd "../frontend"
start "SchoolFee Now - Frontend" cmd /k "npm run dev"

echo.
echo Both servers are launching in separate windows!
echo Make sure MongoDB is running locally on your machine.
echo.
echo Launching Browser...
timeout /t 3 /nobreak > nul
start http://localhost:5173
echo ========================================================
