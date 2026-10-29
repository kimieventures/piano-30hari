# 📓 JOURNAL — Projek Piano 30 Hari (PianobookBot)

Journal & log aktiviti untuk semua projek di bawah profile ini. Entry terbaru di atas.
Disaster management: repo git lokal di sini (persistent /opt/data) + semua keputusan & senibina direkod sini.

---

## 2026-10-29 (Thu) — v1.2: LAGU MELODI 🎵 — sistem mata & papan lagu

**Request user:** point system — mata dari kuiz contribute kepada sesuatu (contoh dia: anak benih → pokok berbuah). Soalan dia: untuk muzik apa metafora paling sesuai?

**Keputusan design (jawapan Zizi):** muzik punya reward semulajadi = **LAGU**. Jadi metafora: **30 hari = 30 nota yang MEMBINA "Lagu Melodi"** (lagu asli AABA+koda di atas C-G-Am-F). Nota terbuka bila hari selesai; kualiti nota dari skor kuiz (locked → plain → silver 1/2 → GOLD 2/2 + ★). Milestone 7/14/21/30 → melodi terkumpul DIMAINKAN sebenar (Web Audio) + backing chord frasa. 30/30 → lagu penux + confetti + badge graduation. Lebih sesuai dari pokok sebab: reward = kemahiran (lagu), progres BOLEH DIDENGAR, kuiz jadi bermakna (nota emas). Skin boleh tukar (pokok dsb.) tanpa ubah sistem mata.

**Implementasi (semua dalam melodi.js + app.js hook + CSS):**
- SONG_MELODI (30 nota asli), SONG_CHORDS (bass frasa: C G Am F C)
- p30NoteState(d) → locked/plain/silver/gold dari localStorage (p30_done + p30_quiz_dN)
- P30SongBoard() — papan lagu di home: 30 nota (stem+★ gold), pemisah M1-M4, 3 stats (nota/mata/emas), 4 badge milestone, butang main
- P30PlaySong(count) — main nota terkumpul + chord backing, nota pulse satu-satu, Melodi "conducting" (wiggle loop)
- P30OnDayDone(n) — dipanggil app.js bila tandakan selesai: bubble update ("Nota ke-8 terbuka!"), Melodi happy; milestone → auto-play + confetti (30)
- P30Confetti() — 44 piece CSS fall, auto-remove 5s

**Lesson penting (testing):** jsdom AUTO-fire hashchange bila location.hash berubah — dispatchEvent manual = DOUBLE render = elemen diganti selepas sync check → mula nampak macam "bug animasi". Fix: navigasi test guna set hash + sleep, bukan dispatch manual. Jangan agak — instrument dulu (debug3.js).

**Verifikasi:** test2.js (28 test baru) + test.js (28 regression) = **56/56 LULUS** — state locked/plain/silver/gold, stats, badge, milestone bubble (8 & 14), confetti, conducting, playback pulse, kuiz regression. Live: HTTP 200, 124,307 bytes exact, SONG_MELODI + songboard confirmed dalam HTML served (propagasi ~70s).

**Deploy:** df50488 (main) + 2e79fd1 (gh-pages) via tools/deploy.sh.

**Roadmap interaktif (cadangan belum buat):** computer-keyboard mapping (A-L), rakam mainan sendiri (MediaRecorder), ear-training "dengar & teka chord", MIDI input, share progress card, Stripe paywall minggu 3-4.

---

## 2026-10-29 (Thu) — v1.1: MELODI 🎵 + KUIZ

**Update (request user — "elemen kuiz dan animated pesona yang comel"):**

1. **Melodi** — pesona nota muzik comel, 100% CSS-animated (tiada imej):
   - Body blob float + shadow, mata blink (4.4s cycle), cheek blush, tangan kecil, antena ♪ sway
   - Ekspresi: HAPPY (jump + arms up + hearts float), SAD (droop + eyes lid + frown), WIGGLE (bila user tekan kekunci — semua keyboard)
   - Bubble ucapan: home (progress-aware greeting) + setiap hari (30 mesej unik BM)
   - Fail: webapp/js/melodi.js (P30Melodi(), P30_CHAT, P30_HOME_GREET)
2. **Kuiz** — 2 soalan × 30 hari = 60 soalan BM (op syen di-shuffle setiap render):
   - Jawapan betul: hijau + sfx arpeggio happy + Melodi happy + huraian
   - Jawap salah: shake merah + jawapan betul ditunjuk + sfx rendah + Melodi sad
   - Skor akhir + best score persist (localStorage p30_quiz_dN) + retry
   - Fail: webapp/js/melodi.js (P30_QUIZ, P30QuizWidget()) — integrasi app.js: quiz sebelum practice tip setiap hari

**Bug dijumpai & fix semasa build:**
- build.py regex tak match 4 script tags selepas tambah melodi.js → build 20KB tanpa JS! Fix pattern. LESSON: sentiasa check size + sanity build selepas ubah struktur fail.
- Patch app.js tersilap delete line `d.secs.forEach(` → lint catch (node --check). Fixed + tambah quiz hook.
- jsdom tiada AudioContext → wiggle test fail → harden: wiggle sebelum audio + audio dalam try/catch (bonus: app kini tahan pelayar lama tanpa Web Audio).

**Verifikasi v1.1:** suite jsdom 28 test → **28/28 LULUS** (melodi render semua 30 hari, kuiz render semua 30 hari, correct/wrong/sad/happy/skor/localStorage semua betul). NOTE: browser harness rosak masa ni (remote WS down + Chromium local tiada) — jsdom jadi kaedah verify. Live: HTTP 200, 113,308 bytes (exact match build), P30_QUIZ + m-hearts confirmed dalam HTML served.

**Deploy:** commit 024772a (main) + 6e184ee (gh-pages) — via tools/deploy.sh. Git identity repo set: kimieventures <kimieventures@gmail.com>.

---

## 2026-10-29 (Thu) — DEPLOY SIAP 🚀 — LIVE di GitHub Pages

**URL:** https://kimieventures.github.io/piano-30hari/
**Repo:** https://github.com/kimieventures/piano-30hari (public; account business kimieventures, BUKAN kimie77)

**Cara (tiada secret dalam chat):**
- GitHub device authorization via gh CLI v2.103.3 (binary di /tmp — ephemeral, muat turun semula bila box restart)
- User approve device code dalam browser dia → token tersimpan dalam gh hosts (plain text, /opt/data/.config/gh — nota keselamatan)
- Scopes: gist, read:org, repo

**Langkah deploy:**
1. `gh repo create kimieventures/piano-30hari --public`
2. Push main (source + docs + JOURNAL)
3. Branch `gh-pages` (orphan): dist/piano30hari.html → index.html, push
4. GitHub Pages auto-enable dari branch gh-pages → URL live

**Verifikasi LIVE (browser sebenar):** HTTP 200, 85KB, 30 kad render, Hari 9 chord player — klik chip F → highlight midis 65/69/72 (F4/A4/C5 betul), **zero JS errors**. Propagasi DNS Pages ambil ~1 minit (404 → 200).

**Update akan datang:** `bash tools/deploy.sh` (satu command: build → push main → rebuild gh-pages).

**Keputusan user hari ini:**
- Gunakan account business kimieventures@gmail.com untuk semua benda projek ini (bukan kimie77 personal)
- Stripe account ada (connector stripe_mcp active) — untuk monetization nanti (macam Rak Modul: trial + Payment Link)
- GAS deploy (macam Rak Modul) ditunda — Pages dulu; fail sama (dist/piano30hari.html) boleh paste ke GAS bila nak

**Nota:**
- Repo public sebab Pages percuma perlukan repo public. Kandungan ebook memang untuk umum — OK.
- gh-pages branch hanya ada index.html (build). Source of truth = main.

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
