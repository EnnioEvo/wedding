# Print assets

Source files:

- `invito.html` - 5x7 inch invitation.
- `rsvp.html` - 4.7x3.5 inch RSVP card.
- `print.css` - shared print styling.

Generated files live in `../assets/print/`.

To regenerate the PDFs from the repository root:

```bash
google-chrome --headless=new --disable-gpu --disable-dev-shm-usage --no-sandbox --no-pdf-header-footer --run-all-compositor-stages-before-draw --virtual-time-budget=3000 --print-to-pdf=assets/print/invito-5x7.pdf file://"$PWD"/print/invito.html
google-chrome --headless=new --disable-gpu --disable-dev-shm-usage --no-sandbox --no-pdf-header-footer --run-all-compositor-stages-before-draw --virtual-time-budget=3000 --print-to-pdf=assets/print/rsvp-4.7x3.5.pdf file://"$PWD"/print/rsvp.html
gs -o /tmp/rsvp-fixed.pdf -sDEVICE=pdfwrite -dDEVICEWIDTHPOINTS=338.4 -dDEVICEHEIGHTPOINTS=252 -dFIXEDMEDIA -dPDFFitPage -dCompatibilityLevel=1.4 assets/print/rsvp-4.7x3.5.pdf
mv /tmp/rsvp-fixed.pdf assets/print/rsvp-4.7x3.5.pdf
```

The Ghostscript pass keeps the RSVP card's PDF MediaBox at exactly 4.7x3.5 inches;
headless Chrome rounds that custom width slightly when exporting directly.
