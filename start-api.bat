@echo off
title MTS System API Server
echo.
echo ================================================
echo   MTS System — API Server
echo   Starting on http://0.0.0.0:5000
echo   Network: http://192.168.100.18:5000
echo ================================================
echo.
cd /d "C:\mtsapi"
dotnet exec MtsApi.dll --urls http://0.0.0.0:5000
pause