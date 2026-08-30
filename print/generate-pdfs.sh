#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
OUTPUT_DIR="$ROOT_DIR/assets/print"

CHROME_BIN="${CHROME_BIN:-}"
if [[ -z "$CHROME_BIN" ]]; then
  CHROME_BIN="$(command -v google-chrome || command -v chromium || command -v chromium-browser || true)"
fi

if [[ -z "$CHROME_BIN" ]]; then
  echo "Errore: installa Google Chrome o Chromium, oppure imposta CHROME_BIN." >&2
  exit 1
fi

if ! command -v gs >/dev/null 2>&1; then
  echo "Errore: installa Ghostscript (comando 'gs') per fissare le dimensioni finali dei PDF." >&2
  exit 1
fi

mkdir -p "$OUTPUT_DIR"

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

render_pdf() {
  local source_html="$1"
  local output_pdf="$2"
  local width_points="$3"
  local height_points="$4"
  local chrome_pdf="$TMP_DIR/$(basename "$output_pdf")"
  local chrome_log="$TMP_DIR/$(basename "$output_pdf").chrome.log"

  echo "Genero $(basename "$output_pdf") da $(basename "$source_html")"

  if ! HOME="$TMP_DIR/home" XDG_CONFIG_HOME="$TMP_DIR/config" XDG_CACHE_HOME="$TMP_DIR/cache" \
    "$CHROME_BIN" \
      --headless=new \
      --disable-gpu \
      --disable-dev-shm-usage \
      --disable-breakpad \
      --disable-crash-reporter \
      --no-sandbox \
      --no-pdf-header-footer \
      --run-all-compositor-stages-before-draw \
      --virtual-time-budget=10000 \
      --user-data-dir="$TMP_DIR/chrome-profile" \
      --print-to-pdf="$chrome_pdf" \
      "file://$source_html" > /dev/null 2>"$chrome_log"; then
    cat "$chrome_log" >&2
    exit 1
  fi

  gs \
    -o "$output_pdf" \
    -sDEVICE=pdfwrite \
    -dDEVICEWIDTHPOINTS="$width_points" \
    -dDEVICEHEIGHTPOINTS="$height_points" \
    -dFIXEDMEDIA \
    -dPDFFitPage \
    -dCompatibilityLevel=1.4 \
    "$chrome_pdf" >/dev/null
}

target="${1:-all}"

case "$target" in
  all)
    render_pdf "$SCRIPT_DIR/invito.html" "$OUTPUT_DIR/invito-5x7.pdf" 360 504
    render_pdf "$SCRIPT_DIR/rsvp.html" "$OUTPUT_DIR/rsvp-4.7x3.5.pdf" 338.4 252
    ;;
  invito)
    render_pdf "$SCRIPT_DIR/invito.html" "$OUTPUT_DIR/invito-5x7.pdf" 360 504
    ;;
  rsvp)
    render_pdf "$SCRIPT_DIR/rsvp.html" "$OUTPUT_DIR/rsvp-4.7x3.5.pdf" 338.4 252
    ;;
  *)
    echo "Uso: $0 [all|invito|rsvp]" >&2
    exit 1
    ;;
esac

echo "PDF aggiornati in $OUTPUT_DIR"
