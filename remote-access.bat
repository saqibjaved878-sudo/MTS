@echo off
echo ============================================
echo   MTS SYSTEM - REMOTE ACCESS
echo ============================================
echo.
echo Apne MTS system ko ghar se access karne ke liye
echo Tailscale install karein (free, no account needed).
echo.
echo === OPTION 1: Cloudflare Tunnel (free, temporary) ===
echo.
echo Step 1: "C:\mtsapi\cloudflared.exe" tunnel --url http://localhost:5000
echo.
echo URL aayega kuch is tarah:
echo https://something.trycloudflare.com
echo.
echo Yeh URL mobile browser mein khol kar ghar se access karein.
echo NOTE: Har baar naya URL banta hai.
echo.
echo === OPTION 2: Serveo SSH Tunnel (free, temporary) ===
echo.
echo Step 1: ssh -R 80:localhost:5000 serveo.net
echo.
echo URL aayega kuch is tarah:
echo https://something.serveousercontent.com
echo.
echo === OPTION 3: Tailscale (free, permanent) ===
echo.
echo Step 1: https://tailscale.com/download se install karein
echo Step 2: Phone par bhi Tailscale install karein
echo Step 3: Phone browser mein http://100.x.x.x:5000 kholen
echo.
pause
