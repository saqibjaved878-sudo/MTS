@echo off
title MTS Deploy
color 0A
echo.
echo ============================================
echo    MTS System - Vercel Deploy
echo ============================================
echo.

where vercel >nul 2>&1
if %errorlevel% neq 0 (
    echo [X] Vercel CLI nahi mili!
    echo     npm install -g vercel
    pause
    exit /b 1
)

vercel whoami >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] Pehle login karo: vercel login
    vercel login
)

echo [>> Code update karo aur phir is .bat ko project folder pe drag karo
echo.

if "%~1"=="" (
    echo [>] Folder drag karo ya path paste karo:
    set /p FOLDER="Path: "
) else (
    set "FOLDER=%~1"
)

if not exist "%~FOLDER%" (
    echo [X] Folder nahi mila!
    pause
    exit /b 1
)

cd /d "%~FOLDER%"
echo [OK] Folder: %cd%
echo.
echo [>> Deploy ho raha hai...
echo.

vercel --prod --yes

echo.
echo ============================================
echo    DONE! Link: https://mts-mtsapp-1.vercel.app
echo ============================================
echo.
pause
