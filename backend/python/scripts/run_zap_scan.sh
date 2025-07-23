#!/bin/bash

# Create output folder if it doesn't exist
mkdir -p zap_reports

# Initialize counter
i=0

# Loop through all arguments passed to the script
for target in "$@"
do
    i=$((i+1))
    echo "🔍 [$i] Scanning $target"

    # Create output filename
    fname="${i}_zap.json"
    echo "Output file: $fname"

    # Run ZAP Docker scan
    docker run --rm -t \
        -v "$(pwd)/zap_reports:/zap/wrk" \
        ghcr.io/zaproxy/zaproxy:stable \
        zap-baseline.py \
        -t "$target" \
        -J "$fname" \
        -z "-config api.disablekey=true -config spider.userAgent=Mozilla/5.0" \
        -T 5

    sleep 2
done

echo "✅ Scanning complete."