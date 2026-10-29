# 📓 JOURNAL — Projek Piano 30 Hari (PianobookBot)

Journal & log aktiviti untuk semua projek di bawah profile ini. Entry terbaru di atas.
Disaster management: repo git lokal di sini (persistent /opt/data) + semua keputusan & senibina direkod sini.

---

## 2026-10-29 (Thu) — BUILD v1 SIAP & TERVERIFIKASI ✅

**Apa siap:**
- `webapp/` penuh: index.html + css/style.css + js/{audio,data,app}.js
- `tools/build.py` — bundle single-file
- `dist/piano30hari.html` (85KB) — SATU fail, tiada dependency luar, sedia deploy
- 30 hari kandungan penuh BM: 4 minggu tema, setiap hari matlamat + pelajaran + widget + latihan
- Widget: freeplay keyboard (klik → bunyi piano synth Web Audio), chord player (highlight+main, 20+ chord termasuk slash/inversions/sus), scale player (jari bernombor), progression player (pattern: block/beat8/waltz/arp, tempo, loop), song player (5 lagu: Mary, Twinkle, Ode to Joy, Happy Birthday, Senja Pertama—asli), metronome (slider BPM), checklist kemahiran (persist), jam improvisasi (H27)
- Progress tracking: checkbox selesai per hari + progress bar header (localStorage)

**Verifikasi (browser sebenar, bukan teori):**
- node --check semua JS: OK
- Build sanity: tiada rujukan fail luar: OK
- Browser (headless Chrome): home render 30 kad + 4 minggu + progress bar ✓
- Test interaktif: klik kekunci bunyi ✓; chord Dm → highlight midis 62/65/69 (D4/F4/A4 betul) ✓; progression player main + highlight ✓; song player strip menyala ikut not ✓; metronome start/stop + BPM slider ✓; checklist persist [true,true] ✓; tandakan hari → progress 1/30 · 3% ✓; **zero JS errors**
- Audit visual (screenshot home): layout clean, kontras tinggi, tiada bug visual — day cards di bawah fold (perlu scroll, by design)

**Isu dijumpai & penyelesaian:**
- file:// diblock oleh browser ujian → guna `python3 -m http.server 8877` semasa dev/verify
- gh CLI tidak wujud dalam box → backup masa ini git lokal sahaja

**Pending / next steps:**
- [ ] Keputusan user: GitHub repo untuk backup remote (perlu token/credentials) — cadangan: kimieventures/piano-30hari
- [ ] Keputusan user: deploy ke mana (GAS webapp macam Rak Modul / GitHub Pages / hosting lain)
- [ ] V2 cadangan: computer-keyboard mapping, audio demo riang, warna tema, PWA offline
- [ ] Cron backup harian (macam trading project) bila repo remote ada

---

## 2026-10-29 (Thu) — Kickoff projek Piano 30 Hari

**Projek:** Webapp ebook interaktif "Piano 30 Hari" — belajar main piano/keyboard dari kosong, 30 hari, chord-first approach, BM (Bahasa Malaysia), self-paced.

**Objektif:**
- Ebook webapp interaktif ala "Rak Modul" (GAS webapp kimie77) tapi untuk muzik.
- Sasaran: beginner tanpa asas muzik; semua umur; tanpa guru — self-guided.
- Output: boleh main lagu kegemaran guna chord structure & chord progression dalam 30 hari.
- Banyak animated/interactive visuals (keyboard interaktif, chord diagram, progression player), penerangan simple + jelas.

**Keputusan design:**
- Format: static webapp vanilla HTML/CSS/JS, dibundle jadi SATU fail HTML (dist/piano30hari.html) — senang deploy ke Google Apps Script HtmlService / GitHub Pages / mana-mana hosting.
- Tiada dependency luar (offline, no CDN): Web Audio API synth sendiri, CSS animation, SVG/div keyboard.
- Bahasa: BM santai. Surface: Learn/ebook (day rack → lesson view), progress tracking localStorage.
- Ciri: keyboard interaktif boleh klik (bunyi piano synth), highlight chord/scale, progression player (C-G-Am-F dsb), metronome, song player (lagu PD), progress bar + checkbox selesai setiap hari.

**Struktur modul 30 hari (ringkas):**
- Minggu 1 (H1–7): Kenali keyboard, posisi tangan, skala C, tempo, melodi pertama.
- Minggu 2 (H8–14): Dunia chord — triad, C/F/G, minor, progression I-V-vi-IV, inversions, iringan LH.
- Minggu 3 (H15–21): Main lagu — lead sheet, melodi+chord, pop & ballad pattern, sus chords, transpose.
- Minggu 4 (H22–30): Polish — pedal, dynamics, arpeggio, repertoir 2 lagu, improvisasi pentatonic, rutin latihan, grad.
- Detail penuh: docs/kurikulum.md

**Status:** ✅ v1 siap & verified — tunggu keputusan deploy/backup remote.

**Backup:** git lokal (main). GitHub remote belum ada (tiada gh/credentials di box) — perlu keputusan user.
