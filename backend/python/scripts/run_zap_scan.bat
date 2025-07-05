@echo off
setlocal enabledelayedexpansion

:: Create output folder if it doesn't exist
if not exist zap_reports mkdir zap_reports

:: Initialize counter
set /a i=0

:: Loop through all arguments passed to the bat file
for %%A in (%*) do (
    set /a i+=1
    set "target=%%A"
    echo 🔍 [!i!] Scanning !target!

    :: Create output filename
    set "fname=!i!_zap.json"
    echo Output file: !fname!

    :: Run ZAP Docker scan
    docker run --rm -t ^
        -v "%cd%\zap_reports:/zap/wrk" ^
        ghcr.io/zaproxy/zaproxy:stable ^
        zap-baseline.py ^
        -t "!target!" ^
        -J "!fname!" ^
        -z "-config api.disablekey=true -config spider.userAgent=Mozilla/5.0" ^
        -T 5

    timeout /t 2 >nul
    
)

echo ✅ Scanning complete.
