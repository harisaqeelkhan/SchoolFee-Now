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
set /p commitMsg="Enter commit title (required): "
if "%commitMsg%"=="" set commitMsg=Automated sync: Updated files

set /p commitDesc="Enter commit description (optional, press Enter to skip): "

echo.
echo Committing changes...
if "%commitDesc%"=="" (
    git commit -m "%commitMsg%"
) else (
    git commit -m "%commitMsg%" -m "%commitDesc%"
)

echo.
echo Pushing to GitHub (main branch)...
git push -u origin main

echo.
echo ========================================================
echo        Sync Complete! Check your GitHub repository.
echo ========================================================
pause
