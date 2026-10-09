@echo off
echo Starting Cloudflare Tunnel to http://localhost:5000 ...
echo.
echo Tunnel URL will appear below after a few seconds:
echo.
"C:\mtsapi\cloudflared.exe" tunnel --url http://localhost:5000
pause
