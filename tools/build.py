#!/usr/bin/env python3
"""Bundle webapp/ menjadi SATU fail HTML (dist/piano30hari.html).
Hasilnya boleh terus di-deploy: Google Apps Script HtmlService,
GitHub Pages, atau hosting statik mana-mana. Tiada dependency luar."""

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "webapp"
DIST = ROOT / "dist"
DIST.mkdir(exist_ok=True)

html = (SRC / "index.html").read_text(encoding="utf-8")
css = (SRC / "css" / "style.css").read_text(encoding="utf-8")
js_parts = []
for name in ("audio.js", "data.js", "melodi.js", "app.js"):
    js_parts.append(f"/* ===== {name} ===== */\n" + (SRC / "js" / name).read_text(encoding="utf-8"))

html = re.sub(r'<link rel="stylesheet" href="css/style.css">', lambda m: "<style>\n" + css + "\n</style>", html)
html = re.sub(
    r'<script src="js/audio\.js"></script>\s*<script src="js/data\.js"></script>\s*<script src="js/melodi\.js"></script>\s*<script src="js/app\.js"></script>',
    lambda m: "<script>\n" + "\n".join(js_parts) + "\n</script>",
    html,
)

out = DIST / "piano30hari.html"
out.write_text(html, encoding="utf-8")
print(f"OK: {out} ({out.stat().st_size:,} bytes)")

# sanity: tiada rujukan fail luar lagi
leftovers = re.findall(r'(src|href)="(?!#)[^"]*"', html)
if leftovers:
    print("AMARAN: masih ada rujukan luar:", leftovers)
else:
    print("Sanity OK: tiada rujukan fail luar.")
