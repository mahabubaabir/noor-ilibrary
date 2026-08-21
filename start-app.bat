@echo off
cd /d "%~dp0"
title Noor - Islamic Knowledge Library

echo.
echo   Starting Noor - Islamic Knowledge Library
echo   Keep this window open while you use the app.
echo   Your browser will open http://127.0.0.1:3000
echo.

powershell -WindowStyle Hidden -Command "Start-Sleep 6; Start-Process 'http://127.0.0.1:3000'"

call npm.cmd run dev

echo.
echo   The server stopped. Press any key to close this window.
pause >nul
