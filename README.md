# 🎹 Piano 30 Hari — Ebook Webapp Interaktif

Belajar main piano/keyboard dari **kosong hingga boleh main lagu** dalam 30 hari — tanpa guru, self-paced, bahasa Melayu. Chord-first: faham chord structure & progression supaya boleh main lagu kegemaran sendiri.

## Ciri webapp
- 30 hari modul berstruktur (4 minggu tema)
- Keyboard interaktif (klik/tap → bunyi piano, Web Audio synth, tiada fail audio)
- Chord & scale visualizer — kekunci menyala + animasi
- Chord progression player (I–V–vi–IV dsb) dengan pattern iringan
- Metronome + song player (lagu public domain: Mary Had a Little Lamb, Ode to Joy, Amazing Grace, Twinkle Twinkle, Jingle Bells)
- Progress tracking (localStorage) — checkbox selesai + progress bar
- Single-file build → mudah deploy ke Google Apps Script / GitHub Pages / hosting sendiri

## Struktur repo
```
docs/kurikulum.md   — rangka modul 30 hari (sumber kandungan)
webapp/             — source (index.html, css/, js/)
tools/build.py      — bundle ke satu fail
dist/piano30hari.html — BUILD FINAL (single-file, deployable)
JOURNAL.md          — log aktiviti projek
```

## Build
```bash
python3 tools/build.py   # hasilkan dist/piano30hari.html
```

## Deploy (pilihan)
1. **Google Apps Script** (macam Rak Modul): project baru → Code.gs `doGet(){ return HtmlService.createHtmlOutputFromFile('piano30hari') }` → paste kandungan dist ke `piano30hari.html` → Deploy as web app.
2. **GitHub Pages**: push repo ini → Settings → Pages.
3. **Hosting sendiri**: upload dist/piano30hari.html sahaja.

## Backup / disaster management
- Git commit setiap sesi perubahan (lihat JOURNAL.md).
- Fail penting: docs/kurikulum.md, webapp/, dist/.
