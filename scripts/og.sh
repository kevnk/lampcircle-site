#!/bin/sh
# Renders scripts/og.html to public/og.png with headless Chrome (fonts load from Google Fonts).
set -e
cd "$(dirname "$0")/.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1200,630 --virtual-time-budget=8000 \
  --screenshot="$PWD/public/og.png" "file://$PWD/scripts/og.html"
