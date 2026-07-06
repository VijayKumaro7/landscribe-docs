#!/usr/bin/env bash
# Downloads the Noto fonts required by scripts/generate-demo-pdfs.mjs into
# ~/.fonts so headless Chromium can shape Devanagari, Kannada, Tamil and
# Telugu text correctly. Run once before generating the demo PDF library.
set -euo pipefail

FONT_DIR="${HOME}/.fonts"
mkdir -p "${FONT_DIR}"

BASE="https://raw.githubusercontent.com/google/fonts/main/ofl"

declare -A FONTS=(
  ["NotoSerif.ttf"]="notoserif/NotoSerif%5Bwdth%2Cwght%5D.ttf"
  ["NotoSans.ttf"]="notosans/NotoSans%5Bwdth%2Cwght%5D.ttf"
  ["NotoSerifDevanagari.ttf"]="notoserifdevanagari/NotoSerifDevanagari%5Bwdth%2Cwght%5D.ttf"
  ["NotoSansDevanagari.ttf"]="notosansdevanagari/NotoSansDevanagari%5Bwdth%2Cwght%5D.ttf"
  ["NotoSerifKannada.ttf"]="notoserifkannada/NotoSerifKannada%5Bwght%5D.ttf"
  ["NotoSansKannada.ttf"]="notosanskannada/NotoSansKannada%5Bwdth%2Cwght%5D.ttf"
  ["NotoSerifTamil.ttf"]="notoseriftamil/NotoSerifTamil%5Bwdth%2Cwght%5D.ttf"
  ["NotoSansTamil.ttf"]="notosanstamil/NotoSansTamil%5Bwdth%2Cwght%5D.ttf"
  ["NotoSerifTelugu.ttf"]="notoseriftelugu/NotoSerifTelugu%5Bwght%5D.ttf"
  ["NotoSansTelugu.ttf"]="notosanstelugu/NotoSansTelugu%5Bwdth%2Cwght%5D.ttf"
)

for name in "${!FONTS[@]}"; do
  echo "Fetching ${name}…"
  curl -sfL "${BASE}/${FONTS[$name]}" -o "${FONT_DIR}/${name}"
done

fc-cache -f "${FONT_DIR}" >/dev/null
echo "Installed $(ls "${FONT_DIR}" | wc -l) fonts into ${FONT_DIR}"
