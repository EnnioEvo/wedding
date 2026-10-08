"""Create the numbered wedding table cards using the original image assets."""

from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.graphics import renderPDF
from svglib.svglib import svg2rlg


ROOT = Path(__file__).resolve().parents[2]
FONTS = Path("/home/ennio/.codex/skills/canvas-design/canvas-fonts")
OUTPUT = ROOT / "output/pdf/segnatavoli-1-16-fronte-retro.pdf"
WIDTH, HEIGHT = 100 * mm, 150 * mm
INK = HexColor("#506400")
SAGE = HexColor("#8a9570")


def centered_text(
    page: canvas.Canvas, text: str, y: float, font: str, size: float,
    tracking: float = 0,
) -> None:
    """Center text including its letter spacing."""
    width = pdfmetrics.stringWidth(text, font, size)
    width += max(len(text) - 1, 0) * tracking
    block = page.beginText((WIDTH - width) / 2, y * mm)
    block.setFont(font, size)
    block.setCharSpace(tracking)
    block.textOut(text)
    page.drawText(block)


def frame(page: canvas.Canvas) -> None:
    """Apply the shared botanical border and wedding signature."""
    page.setStrokeColor(HexColor("#c9cfb9"))
    page.setLineWidth(0.55)
    page.rect(5 * mm, 5 * mm, WIDTH - 10 * mm, HEIGHT - 10 * mm)
    ivy = str(ROOT / "assets/images/decor/edera_vertical_1.png")
    page.drawImage(ivy, 82 * mm, 4 * mm, width=16 * mm, height=38 * mm,
                   mask="auto", preserveAspectRatio=True)
    page.setFillColor(INK)
    centered_text(page, "Miriam ed Ennio", 22, "Names", 25)
    centered_text(page, "17 OTTOBRE 2026", 12, "Sans", 8.5, 0.9)


def foreground_vase(page: canvas.Canvas, x: float = 6) -> None:
    """Paint the hanging plant above the heading artwork."""
    vase = str(ROOT / "assets/images/decor/edera_on_vase_transparent_compress.png")
    page.drawImage(vase, x * mm, 112 * mm, width=20.44 * mm, height=33 * mm,
                   mask="auto", preserveAspectRatio=True)


def front(page: canvas.Canvas, number: int) -> None:
    """Give the table number visual priority for easy recognition."""
    frame(page)
    page.setFillColor(INK)
    centered_text(page, "TAVOLO", 110, "Sans", 10, 3)
    centered_text(page, str(number), 66, "Serif", 110)
    page.setStrokeColor(SAGE)
    page.setLineWidth(0.6)
    page.line(43 * mm, 54 * mm, 57 * mm, 54 * mm)
    foreground_vase(page)
    page.showPage()


def back(page: canvas.Canvas) -> None:
    """Keep the upload request and the original QR clearly separated."""
    frame(page)
    page.drawImage(str(ROOT / "assets/tables/share_the_love.png"),
                   18 * mm, 107 * mm, width=64 * mm, height=30.77 * mm,
                   preserveAspectRatio=True, mask="auto")
    page.setFillColor(INK)
    centered_text(page, "CARICA LE TUE FOTO", 98, "Sans", 9, 0.65)
    centered_text(page, "DEL MATRIMONIO", 92, "Sans", 9, 0.65)
    centered_text(page, "E VEDI QUELLE DEGLI ALTRI", 82, "Sans", 7.5, 0.25)
    qr = svg2rlg(str(ROOT / "assets/tables/qr.svg"))
    if qr is None:
        raise ValueError("Unable to read the QR SVG")
    left, bottom, right, top = qr.getBounds()
    scale = 34 * mm / max(right - left, top - bottom)
    qr.scale(scale, scale)
    renderPDF.draw(qr, page, 33 * mm - left * scale, 40 * mm - bottom * scale)
    foreground_vase(page, x=2)
    page.showPage()


def main() -> None:
    """Write the shared reverse followed by sixteen 100 × 150 mm fronts."""
    pdfmetrics.registerFont(TTFont("Names", "/tmp/GreatVibes-Regular.ttf"))
    for name, filename in (
        ("Serif", "InstrumentSerif-Regular.ttf"),
        ("Sans", "InstrumentSans-Regular.ttf"),
    ):
        pdfmetrics.registerFont(TTFont(name, str(FONTS / filename)))
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    page = canvas.Canvas(str(OUTPUT), pagesize=(WIDTH, HEIGHT))
    page.setTitle("Miriam ed Ennio | Segnatavoli 1–16 | Fronte e retro")
    page.setAuthor("Miriam ed Ennio")
    back(page)
    for number in range(1, 17):
        front(page, number)
    page.save()


if __name__ == "__main__":
    main()
