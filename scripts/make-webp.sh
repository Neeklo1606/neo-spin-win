#!/bin/sh
# Post-build: create <file>.png.webp next to every PNG/JPG in dist.
# nginx serves the .webp to browsers that accept it (see docs/nginx-azotrostovskiy.conf).
set -e
command -v cwebp >/dev/null 2>&1 || { echo "make-webp: cwebp not installed, skipping"; exit 0; }
DIR="${1:-dist}"
find "$DIR" -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \) | while read -r f; do
  [ -f "$f.webp" ] && [ "$f.webp" -nt "$f" ] && continue
  cwebp -quiet -q 82 -alpha_q 90 -m 6 "$f" -o "$f.webp"
done
