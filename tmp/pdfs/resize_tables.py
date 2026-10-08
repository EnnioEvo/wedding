"""Reposition approved PDF artwork without changing its embedded fonts or QR."""

from pathlib import Path

from pypdf import PageObject, PdfReader, PdfWriter
from pypdf.generic import ContentStream, FloatObject, NameObject, RectangleObject


ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "output/pdf/segnatavoli-backup-prima-formato-106x152.pdf"
OUTPUT = ROOT / "output/pdf/segnatavoli-1-16-fronte-retro.pdf"
DUPLEX_OUTPUT = ROOT / "output/pdf/segnatavoli-1-16-stampa-fronte-retro.pdf"
MM = 72 / 25.4
WIDTH, HEIGHT = 106 * MM, 157 * MM


def reposition_page(page: PageObject, reader: PdfReader) -> None:
    """Center content and anchor the ivy to the 106 × 157 mm border."""
    content = ContentStream(page.get_contents(), reader)
    depth = 0
    border_count = 0
    for operands, operator in content.operations:
        if operator == b"q":
            depth += 1
        elif operator == b"Q":
            depth -= 1
        elif operator == b"re" and depth == 0:
            # Only the outer border is at this depth; QR cells remain untouched.
            operands[2] = FloatObject(WIDTH - 10 * MM)
            operands[3] = FloatObject(HEIGHT - 10 * MM)
            border_count += 1
        elif operator == b"Tm" and depth == 0:
            operands[4] = FloatObject(float(operands[4]) + 3 * MM)
            operands[5] = FloatObject(float(operands[5]) + 7 * MM)
        elif operator in (b"m", b"l") and depth == 0:
            operands[0] = FloatObject(float(operands[0]) + 3 * MM)
            operands[1] = FloatObject(float(operands[1]) + 7 * MM)
        elif operator == b"cm" and depth == 1:
            dx, dy = 3 * MM, 7 * MM
            if float(operands[0]) > 1:
                if float(operands[5]) < 10 * MM:
                    # Lower ivy follows the right border, keeping its bottom edge.
                    dx, dy = 6 * MM, 0
                elif float(operands[5]) > 110 * MM:
                    # Hanging vase stays attached to the upper left border.
                    dx = 0
            operands[4] = FloatObject(float(operands[4]) + dx)
            operands[5] = FloatObject(float(operands[5]) + dy)

    if border_count != 1 or depth != 0:
        raise ValueError("Unexpected artwork structure in the source PDF")
    page[NameObject("/Contents")] = content
    page.mediabox = RectangleObject((0, 0, WIDTH, HEIGHT))
    page.cropbox = RectangleObject((0, 0, WIDTH, HEIGHT))


def main() -> None:
    """Export both page orders from the preserved 100 × 150 mm artwork."""
    reader = PdfReader(SOURCE)
    if len(reader.pages) != 17:
        raise ValueError("Expected one QR reverse and sixteen numbered fronts")
    for page in reader.pages:
        if (
            abs(float(page.mediabox.width) - 100 * MM) > 0.01
            or abs(float(page.mediabox.height) - 150 * MM) > 0.01
        ):
            raise ValueError("The source must be the original 100 × 150 mm PDF")

    writer = PdfWriter()
    for page in reader.pages:
        reposition_page(page, reader)
        writer.add_page(page)
    writer.add_metadata(
        {
            "/Title": "Miriam ed Ennio | Segnatavoli 1-16 | 106 x 157 mm",
            "/Author": "Miriam ed Ennio",
        }
    )
    with OUTPUT.open("wb") as stream:
        writer.write(stream)

    resized = PdfReader(OUTPUT)
    duplex = PdfWriter()
    for numbered_page in resized.pages[1:]:
        duplex.add_page(numbered_page)
        duplex.add_page(resized.pages[0])
    duplex.add_metadata(
        {
            "/Title": "Miriam ed Ennio | Stampa fronte-retro | 106 x 157 mm",
            "/Author": "Miriam ed Ennio",
        }
    )
    with DUPLEX_OUTPUT.open("wb") as stream:
        duplex.write(stream)


if __name__ == "__main__":
    main()
