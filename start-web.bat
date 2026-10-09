@echo off
title MTS System - Web Server (Bina API)
cd /d "%~dp0"
echo ================================================
echo   MTS System — Static File Server
echo   Bina API/SQL ke chalega
echo ================================================
echo.
echo Pehle wala address: http://192.168.100.18:5000
echo Secure address: https://192.168.100.18:5001
echo.
echo Band karne ke liye Ctrl+C dabayein
echo.
dotnet exec "web-server\published\MtsWeb.dll"
pause
