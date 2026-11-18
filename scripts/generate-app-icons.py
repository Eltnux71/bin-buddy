from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
IMAGES = ROOT / "assets" / "images"
IOS_ICON = ROOT / "assets" / "expo.icon" / "Assets"

SIZE = 1024
TEAL = "#2B7A78"
DARK_TEAL = "#175E5C"
WHITE = "#FFFFFF"
GREEN = "#92C83E"


def recycle_font(size: int) -> ImageFont.FreeTypeFont:
    for name in ("seguiemj.ttf", "seguisym.ttf"):
        try:
            return ImageFont.truetype(str(Path("C:/Windows/Fonts") / name), size)
        except OSError:
            pass
    return ImageFont.load_default()


def draw_bin(draw: ImageDraw.ImageDraw, scale: float = 1.0) -> None:
    s = scale

    def box(left: float, top: float, right: float, bottom: float) -> tuple[int, int, int, int]:
        return tuple(int(value * s) for value in (left, top, right, bottom))

    draw.rounded_rectangle(
        box(196, 210, 828, 330),
        radius=int(54 * s),
        fill=WHITE,
    )
    draw.rounded_rectangle(
        box(340, 168, 684, 246),
        radius=int(38 * s),
        fill=WHITE,
    )
    draw.polygon(
        [
            (int(246 * s), int(312 * s)),
            (int(778 * s), int(312 * s)),
            (int(704 * s), int(806 * s)),
            (int(320 * s), int(806 * s)),
        ],
        fill=WHITE,
    )
    for left in (362, 492, 622):
        width = int(42 * s)
        draw.rounded_rectangle(
            box(left, 390, left + width, 700),
            radius=int(18 * s),
            fill=DARK_TEAL,
        )
    draw.rounded_rectangle(
        box(294, 792, 730, 846),
        radius=int(24 * s),
        fill=WHITE,
    )
    draw.ellipse(box(332, 822, 402, 892), fill=DARK_TEAL)
    draw.ellipse(box(622, 822, 692, 892), fill=DARK_TEAL)


def draw_recycle(draw: ImageDraw.ImageDraw, center: tuple[int, int], size: int, fill: str) -> None:
    font = recycle_font(size)
    text = "\u267b"
    bbox = draw.textbbox((0, 0), text, font=font)
    width = bbox[2] - bbox[0]
    height = bbox[3] - bbox[1]
    position = (center[0] - width // 2, center[1] - height // 2 - bbox[1])
    draw.text(position, text, font=font, fill=fill, stroke_width=2, stroke_fill=fill)


def make_icon() -> Image.Image:
    image = Image.new("RGBA", (SIZE, SIZE), TEAL)
    draw = ImageDraw.Draw(image)
    draw_bin(draw)
    draw_recycle(draw, (512, 620), 310, GREEN)
    return image


def make_foreground() -> Image.Image:
    image = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    draw_bin(draw, 0.86)
    draw_recycle(draw, (512, 585), 270, GREEN)
    return image


def make_monochrome() -> Image.Image:
    image = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    draw_bin(draw, 0.86)
    draw_recycle(draw, (512, 585), 270, WHITE)
    return image


def main() -> None:
    IMAGES.mkdir(parents=True, exist_ok=True)
    IOS_ICON.mkdir(parents=True, exist_ok=True)

    icon = make_icon()
    icon.convert("RGB").save(IMAGES / "icon.png")
    icon.resize((48, 48), Image.Resampling.LANCZOS).convert("RGB").save(IMAGES / "favicon.png")

    foreground = make_foreground()
    foreground.save(IMAGES / "android-icon-foreground.png")
    foreground.convert("RGB").save(IOS_ICON / "bin-buddy-icon.png")

    make_monochrome().save(IMAGES / "android-icon-monochrome.png")
    Image.new("RGBA", (SIZE, SIZE), TEAL).save(IMAGES / "android-icon-background.png")

    print("Generated Bin Buddy icon assets")


if __name__ == "__main__":
    main()
