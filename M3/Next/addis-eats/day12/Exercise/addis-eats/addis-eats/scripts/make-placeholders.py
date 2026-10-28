"""Generates the PLACEHOLDER artwork in public/ (needs: pip install pillow numpy).
These are stand-ins, deliberately a bit oversized (like camera photos) so there is something to optimise.
Replace them with your own photographs, ideally about 800px wide, keeping the same file names."""
import random
import numpy as np
from PIL import Image, ImageDraw, ImageFont

FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
DISHES = {  # id: (name, plate colour, food colour)
    "kitfo": ("Kitfo", (214, 197, 170), (150, 40, 40)),
    "shiro": ("Shiro", (222, 210, 190), (200, 140, 40)),
    "tibs": ("Doro Tibs", (210, 200, 185), (170, 80, 30)),
    "firfir": ("Firfir", (225, 205, 180), (160, 60, 30)),
    "key-wot": ("Key Wot", (215, 200, 180), (140, 30, 30)),
    "doro-wot": ("Doro Wot", (220, 205, 185), (150, 50, 20)),
    "misir": ("Misir Wot", (222, 208, 190), (190, 70, 30)),
    "gomen": ("Gomen", (220, 215, 195), (60, 110, 50)),
    "dulet": ("Dulet", (212, 198, 178), (120, 50, 40)),
    "ful": ("Ful", (224, 210, 188), (160, 110, 50)),
    "chechebsa": ("Chechebsa", (226, 212, 190), (190, 120, 50)),
    "sambusa": ("Sambusa", (218, 204, 182), (200, 150, 60)),
}

def canvas(w, h, top, bottom):
    t = np.linspace(0, 1, h)[:, None, None]
    a, b = np.array(top, float), np.array(bottom, float)
    return Image.fromarray((a + (b - a) * t * np.ones((h, w, 1))).astype("uint8"))

def noisy(img, sigma):
    arr = np.asarray(img).astype(np.int16)
    arr += np.random.normal(0, sigma, arr.shape).astype(np.int16)
    return Image.fromarray(np.clip(arr, 0, 255).astype("uint8"))

def plate(d, cx, cy, r, plate_c, food_c):
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(245, 245, 240), outline=(200, 195, 185), width=max(2, r // 40))
    d.ellipse([cx - r * .85, cy - r * .85, cx + r * .85, cy + r * .85], fill=plate_c)
    for _ in range(14):
        a, rr = random.random() * 6.28, random.random() * r * .55
        x, y, s = cx + rr * np.cos(a), cy + rr * np.sin(a), r * (.12 + random.random() * .18)
        shade = tuple(int(max(0, min(255, c + random.randint(-25, 25)))) for c in food_c)
        d.ellipse([x - s, y - s * .8, x + s, y + s * .8], fill=shade)

def label(img, text, size, y):
    d = ImageDraw.Draw(img)
    f = ImageFont.truetype(FONT, size)
    w = d.textlength(text, font=f)
    d.text(((img.width - w) / 2, y), text, font=f, fill=(60, 40, 30))

random.seed(7); np.random.seed(7)
for did, (name, pc, fc) in DISHES.items():
    img = canvas(1600, 1200, (120, 82, 55), (70, 45, 30))
    plate(ImageDraw.Draw(img), 800, 560, 470, pc, fc)
    img = noisy(img, 7)
    label(img, name, 90, 1040)
    img.save(f"public/dishes/{did}.jpg", quality=85, optimize=True)

hero = canvas(2400, 1350, (150, 100, 60), (80, 50, 30))
d = ImageDraw.Draw(hero)
for i, (cx, cy, r) in enumerate([(520, 700, 380), (1200, 650, 450), (1900, 720, 360)]):
    pc, fc = list(DISHES.values())[i * 3][1:]
    plate(d, cx, cy, r, pc, fc)
hero = noisy(hero, 7)
label(hero, "ADDIS EATS", 150, 90)
hero.save("public/hero.jpg", quality=85, optimize=True)
print("done")
