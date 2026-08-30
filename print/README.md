# Print assets

Source files:

- `invito.html` - 5x7 inch invitation.
- `rsvp.html` - 4.7x3.5 inch RSVP card.
- `print.css` - shared print styling.

Generated files live in `../assets/print/`.

To regenerate the PDFs:

```bash
./print/generate-pdfs.sh
```

You can also regenerate just one file:

```bash
./print/generate-pdfs.sh invito
./print/generate-pdfs.sh rsvp
```

The script prints the HTML with headless Chrome, then runs Ghostscript to keep the
PDF MediaBox exactly at the intended print sizes: 5x7 inches for the invitation
and 4.7x3.5 inches for the RSVP.
