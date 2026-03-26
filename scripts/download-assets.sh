#!/bin/bash
# F1 2025 Asset Download Script
# Run from f1-2025/ directory: bash scripts/download-assets.sh
#
# Downloads driver headshots from Wikipedia Commons.
# Car images and logos must be sourced manually — see comments below.

set -e
cd "$(dirname "$0")/.."

echo "=== F1 2025 Asset Downloader ==="
echo ""

echo "--- Downloading driver headshots ---"

download_driver() {
  local filename=$1
  local url=$2
  local dest="public/images/drivers/$filename"
  if [ -f "$dest" ] && [ -s "$dest" ]; then
    echo "  SKIP (exists): $filename"
  else
    echo "  Downloading: $filename"
    curl -L --silent --show-error --max-time 30 -o "$dest" "$url" || echo "  FAILED: $filename (check URL manually)"
  fi
}

# Red Bull
download_driver "verstappen.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Max_Verstappen_2023_%28cropped%29.jpg/400px-Max_Verstappen_2023_%28cropped%29.jpg"
download_driver "lawson.jpg"     "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Liam_Lawson_2023_Headshot.jpg/400px-Liam_Lawson_2023_Headshot.jpg"

# Ferrari
download_driver "leclerc.jpg"   "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Charles_Leclerc_2022.jpg/400px-Charles_Leclerc_2022.jpg"
download_driver "hamilton.jpg"  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg/400px-Lewis_Hamilton_2016_Malaysia_2.jpg"

# Mercedes
download_driver "russell.jpg"   "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/George_Russell_2022_%28cropped%29.jpg/400px-George_Russell_2022_%28cropped%29.jpg"
download_driver "antonelli.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Kimi_Antonelli_2024.jpg/400px-Kimi_Antonelli_2024.jpg"

# McLaren
download_driver "norris.jpg"    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Lando_Norris_2023_%28cropped%29.jpg/400px-Lando_Norris_2023_%28cropped%29.jpg"
download_driver "piastri.jpg"   "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Oscar_Piastri_2022.jpg/400px-Oscar_Piastri_2022.jpg"

# Aston Martin
download_driver "alonso.jpg"    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Fernando_Alonso_2023_%28cropped%29.jpg/400px-Fernando_Alonso_2023_%28cropped%29.jpg"
download_driver "stroll.jpg"    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Lance_Stroll_2022_%28cropped%29.jpg/400px-Lance_Stroll_2022_%28cropped%29.jpg"

# Alpine
download_driver "gasly.jpg"     "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Pierre_Gasly_2021_%28cropped%29.jpg/400px-Pierre_Gasly_2021_%28cropped%29.jpg"
download_driver "doohan.jpg"    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Jack_Doohan_2023.jpg/400px-Jack_Doohan_2023.jpg"

# Williams
download_driver "albon.jpg"     "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Alexander_Albon_2023_%28cropped%29.jpg/400px-Alexander_Albon_2023_%28cropped%29.jpg"
download_driver "sainz.jpg"     "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Carlos_Sainz_Jr._2022_%28cropped%29.jpg/400px-Carlos_Sainz_Jr._2022_%28cropped%29.jpg"

# Haas
download_driver "ocon.jpg"      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Esteban_Ocon_2022_%28cropped%29.jpg/400px-Esteban_Ocon_2022_%28cropped%29.jpg"
download_driver "bearman.jpg"   "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Oliver_Bearman_2024.jpg/400px-Oliver_Bearman_2024.jpg"

# Racing Bulls
download_driver "tsunoda.jpg"   "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Yuki_Tsunoda_2023_%28cropped%29.jpg/400px-Yuki_Tsunoda_2023_%28cropped%29.jpg"
download_driver "hadjar.jpg"    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Isack_Hadjar_2024.jpg/400px-Isack_Hadjar_2024.jpg"

# Kick Sauber
download_driver "hulkenberg.jpg"  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Nico_H%C3%BClkenberg_2023_%28cropped%29.jpg/400px-Nico_H%C3%BClkenberg_2023_%28cropped%29.jpg"
download_driver "bortoleto.jpg"   "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Gabriel_Bortoleto_2024.jpg/400px-Gabriel_Bortoleto_2024.jpg"

echo ""
echo "--- Download complete. Checking for failures (0-byte files): ---"
failed=0
for f in public/images/drivers/*.jpg; do
  [ -f "$f" ] && [ ! -s "$f" ] && { echo "  EMPTY: $f"; failed=$((failed+1)); }
done
[ $failed -eq 0 ] && echo "  All driver images downloaded successfully!" || echo "  $failed file(s) failed - fix manually"

echo ""
echo "=== MANUAL STEPS REQUIRED ==="
echo ""
echo "1. CAR IMAGES (public/images/cars/) — required filenames:"
echo "   redbull.png, ferrari.png, mercedes.png, mclaren.png, astonmartin.png"
echo "   alpine.png, williams.png, haas.png, racingbulls.png, sauber.png"
echo "   Source: Wikipedia Commons — search '2025 [team] F1 car livery'"
echo "   Prefer PNG with transparent background (side-on render)"
echo ""
echo "2. TEAM LOGOS (public/images/logos/) — required filenames:"
echo "   redbull.png, ferrari.png, mercedes.png, mclaren.png, astonmartin.png"
echo "   alpine.png, williams.png, haas.png, racingbulls.png, sauber.png"
echo "   Source: Wikipedia team infobox images"
echo "   NOTE: If downloaded as SVG, convert: magick logo.svg logo.png"
echo ""
echo "3. AUDIO (public/audio/background.mp3):"
echo "   Download royalty-free F1-style track from https://pixabay.com/music/"
echo "   Trim to 52s: ffmpeg -i downloaded.mp3 -t 52 -c copy public/audio/background.mp3"
echo ""
echo "Once all assets are in place, proceed to code tasks."
