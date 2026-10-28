"""Generates the PLACEHOLDER 1200x630 social preview (needs: pip install pillow numpy).
Replace app/opengraph-image.jpg and public/og/default-v1.jpg with your own design (same size).
If you change the design, rename the file (default-v2.jpg ...): chat apps cache previews for days."""
import numpy as np
from PIL import Image, ImageDraw, ImageFont

FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
W, H = 1200, 630
t = np.linspace(0, 1, H)[:, None, None]
top, bottom = np.array((146, 64, 14), float), np.array((69, 26, 3), float)
img = Image.fromarray((top + (bottom - top) * t * np.ones((H, W, 1))).astype("uint8"))
d = ImageDraw.Draw(img)
cx, cy = 900, 315
for r, c in [(250, (254, 243, 199)), (200, (231, 211, 176)), (95, (185, 28, 28))]:
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=c)
d.text((70, 150), "Addis Eats", font=ImageFont.truetype(FONT, 110), fill=(254, 243, 199))
d.text((70, 300), "Ethiopian food,", font=ImageFont.truetype(FONT, 46), fill=(252, 211, 77))
d.text((70, 360), "delivered across Addis Ababa", font=ImageFont.truetype(FONT, 46), fill=(252, 211, 77))
img.save("app/opengraph-image.jpg", quality=88, optimize=True)
img.save("public/og/default-v1.jpg", quality=88, optimize=True)
print(img.size)
