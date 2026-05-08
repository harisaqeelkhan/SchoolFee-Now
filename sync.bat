@echo off
echo ========================================================
echo        Syncing SchoolFee Now to GitHub
echo ========================================================

:: Initialize git if not already initialized
if not exist ".git" (
    echo Initializing Git repository...
    git init
    git branch -M main
    git remote add origin https://github.com/harisaqeelkhan/SchoolFee-Now.git
) else (
    echo Git repository found.
    :: Ensure the remote is set correctly just in case
    git remote set-url origin https://github.com/harisaqeelkhan/SchoolFee-Now.git 2>nul
    if errorlevel 1 (
        git remote add origin https://github.com/harisaqeelkhan/SchoolFee-Now.git
    )
)

echo.
echo Adding files to staging...
git add .

echo.
echo Committing changes...
git commit -m "Automated sync: Updated backend modules, frontend UI, and NFRs"

echo.
echo Pushing to GitHub (main branch)...
git push -u origin main

echo.
echo ========================================================
echo        Sync Complete! Check your GitHub repository.
echo ========================================================
pause
