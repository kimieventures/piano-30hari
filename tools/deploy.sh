#!/usr/bin/env bash
# ============================================================
# Piano 30 Hari — deploy script
# Guna: bash tools/deploy.sh
# Buat apa: build single-file → commit+push main (source) →
#           rebuild branch gh-pages (deploy) → GitHub Pages auto-build.
# Prasyarat: gh CLI authenticated (login kimieventures) —
#            export PATH="/tmp/gh_2.103.3_linux_amd64/bin:$PATH" jika gh di /tmp
# ============================================================
set -euo pipefail
cd "$(dirname "$0")/.."

GH="${GH:-gh}"
command -v "$GH" >/dev/null || { echo "gh CLI tidak dijumpai — export GH=/path/ke/gh"; exit 1; }
"$GH" auth status >/dev/null 2>&1 || { echo "Sila gh auth login dahulu (account: kimieventures)"; exit 1; }

echo "[1/4] Build single-file..."
python3 tools/build.py

echo "[2/4] Commit & push main (source)..."
git add -A
git diff --cached --quiet || git commit -m "Update kandungan/webapp $(date -u +%F)"
git push origin main

echo "[3/4] Rebuild branch gh-pages (deploy)..."
git checkout --orphan gh-pages-new 2>/dev/null || git checkout gh-pages
git rm -rf --quiet . 2>/dev/null || true
cp dist/piano30hari.html index.html
git add index.html
git commit -m "Deploy: $(date -u '+%F %H:%M') UTC" || true
git branch -M gh-pages-new gh-pages 2>/dev/null || true
git push -f origin gh-pages
git checkout main

echo "[4/4] Selesai. Tunggu ~1 min untuk Pages build, kemudian:"
echo "  https://kimieventures.github.io/piano-30hari/"
