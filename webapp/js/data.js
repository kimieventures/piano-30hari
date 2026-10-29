/* ============================================================
   Piano 30 Hari — Kandungan (30 hari, 4 minggu)
   Setiap hari: { n, week, title, emoji, goal, secs[], practice }
   secs[i].w = widget interaktif:
     freeplay {lo,hi} | chord {syms[]} | scale {notes[],both}
     prog {chords[],pattern:'block|beat8|waltz|arp',bpm}
     song {id} | metro {bpm} | check {items[]}
   ============================================================ */

const SONGS = {
  mary: {
    title: 'Mary Had a Little Lamb',
    bpm: 90,
    notes: [ // [not, len dalam beat]
      ['E4',1],['D4',1],['C4',1],['D4',1],['E4',1],['E4',1],['E4',2],
      ['D4',1],['D4',1],['D4',2],['E4',1],['G4',1],['G4',2],
      ['E4',1],['D4',1],['C4',1],['D4',1],['E4',1],['E4',1],['E4',1],['E4',1],
      ['D4',1],['D4',1],['E4',1],['D4',1],['C4',4]
    ]
  },
  twinkle: {
    title: 'Twinkle Twinkle Little Star',
    bpm: 90,
    notes: [
      ['C4',1],['C4',1],['G4',1],['G4',1],['A4',1],['A4',1],['G4',2],
      ['F4',1],['F4',1],['E4',1],['E4',1],['D4',1],['D4',1],['C4',2],
      ['G4',1],['G4',1],['F4',1],['F4',1],['E4',1],['E4',1],['D4',2],
      ['G4',1],['G4',1],['F4',1],['F4',1],['E4',1],['E4',1],['D4',2],
      ['C4',1],['C4',1],['G4',1],['G4',1],['A4',1],['A4',1],['G4',2],
      ['F4',1],['F4',1],['E4',1],['E4',1],['D4',1],['D4',1],['C4',2]
    ]
  },
  ode: {
    title: 'Ode to Joy — Beethoven',
    bpm: 100,
    notes: [
      ['E4',1],['E4',1],['F4',1],['G4',1],['G4',1],['F4',1],['E4',1],['D4',1],
      ['C4',1],['C4',1],['D4',1],['E4',1],['E4',1.5],['D4',0.5],['D4',2],
      ['E4',1],['E4',1],['F4',1],['G4',1],['G4',1],['F4',1],['E4',1],['D4',1],
      ['C4',1],['C4',1],['D4',1],['E4',1],['D4',1.5],['C4',0.5],['C4',2]
    ]
  },
  happy: {
    title: 'Happy Birthday',
    bpm: 100,
    notes: [
      ['G3',0.75],['G3',0.25],['A3',1],['G3',1],['C4',1],['B3',2],
      ['G3',0.75],['G3',0.25],['A3',1],['G3',1],['D4',1],['C4',2],
      ['G3',0.75],['G3',0.25],['G4',1],['E4',1],['C4',1],['B3',1],['A3',2],
      ['F4',0.75],['F4',0.25],['E4',1],['C4',1],['D4',1],['C4',3]
    ]
  },
  ballad30: {
    title: 'Senja Pertama (lagu latihan asal Piano 30 Hari)',
    bpm: 80,
    chords: ['C','G','Am','F','C','G','Am','F'],
    notes: [
      ['E4',2],['G4',1],['A4',1],
      ['G4',2],['E4',1],['D4',1],
      ['A4',1],['B4',1],['C5',2],
      ['A4',2],['G4',2],
      ['E4',2],['G4',2],
      ['D4',2],['E4',1],['G4',1],
      ['A4',3],['G4',1],
      ['E4',2],['D4',1],['C4',1]
    ]
  }
};

const DAYS = [

/* ================= MINGGU 1 — KENALI & MULA ================= */
{ n: 1, week: 1, emoji: '👋', title: 'Selamat Datang & Kenali Kekunci Anda',
  goal: 'Hari ini anda akan kenal "peta" keyboard — dan sedar bahawa 88 kekunci itu sebenarnya cuma 12 not yang BERULANG.',
  secs: [
    { h: 'Keyboard itu lebih mudah daripada sangkaan', body:
      '<p>Piano ada 88 kekunci — nampak menakutkan? Tenang. Sebenarnya ia cuma <b>7 not putih</b> yang berulang berpuluh kali: <span class="kbd">C</span> <span class="kbd">D</span> <span class="kbd">E</span> <span class="kbd">F</span> <span class="kbd">G</span> <span class="kbd">A</span> <span class="kbd">B</span>, kemudian balik ke C semula. Selepas B, datang C lagi — kitaran ini dipanggil <b>oktaf</b>.</p>' +
      '<p>Cara paling pantas mengenali not: kekunci putih <b>di sebelah kiri 2 kekunci hitam</b> itu sentiasa <b>C</b>. Tengok pola kekunci hitam: <b>2 hitam, 3 hitam, 2 hitam, 3 hitam…</b> — pola ini tak pernah berubah.</p>' },
    { h: 'Middle C — "alamat rumah" anda', body:
      '<p><b>Middle C</b> ialah C yang paling dekat dengan tengah keyboard. Ia "alamat rumah" untuk kedua-dua tangan. Tangan kanan lazimnya bermain di sebelah <b>kanan</b> Middle C, tangan kiri di sebelah <b>kiri</b>.</p>' +
      '<p>Kekunci hitam pula ada dua nama: kekunci hitam selepas C ialah <b>C#</b> (atau Db). Belum perlu hafal semua — cukup kenal polanya hari ini.</p>' },
    { h: 'Cuba sendiri', body:
      '<p>Klik kekunci di bawah — dengar bunyinya. Cuba cari <b>semua not C</b> (yang bertanda) dari kiri ke kanan, atas dan bawah keyboard.</p>',
      w: { t: 'freeplay', lo: 'C3', hi: 'C6', mark: ['C'] } }
  ],
  practice: 'Latihan hari ini (10 minit): Sebut setiap not putih C–B sambil menekannya, ulang 3 pusingan. Kemudian tutup mata dan cuba jumpa Middle C.' },

{ n: 2, week: 1, emoji: '🪑', title: 'Postur & Jari Anda',
  goal: 'Belajar duduk betul dan memberi "nama nombor" kepada jari — bahasa yang digunakan dalam semua pelajaran piano.',
  secs: [
    { h: 'Duduk macam professional', body:
      '<ul><li><b>Tinggi kerusi:</b> lengan anda selari dengan lantai apabila tangan diletakkan atas kekunci.</li>' +
      '<li><b>Jarak:</b> duduk di hadapan Middle C, bukan di hujung kanan keyboard.</li>' +
      '<li><b>Kaki:</b> rata di lantai. Belakang tegak tapi bahu <b>relax</b>.</li>' +
      '<li><b>Tangan:</b> bayangkan memegang sebiji oren — kepalan lembut, jari melengkung semula jadi.</li></ul>' },
    { h: 'Jari ada nombor', body:
      '<p>Kedua-dua tangan: ibu jari = <b>1</b>, telunjuk = <b>2</b>, tengah = <b>3</b>, manis = <b>4</b>, kelingking = <b>5</b>. Nombor jari sentiasa ditulis dari sudut pandangan <i>tangan itu sendiri</i> — jadi jari 1 tangan kanan dan jari 1 tangan kiri adalah ibu jari masing-masing.</p>' +
      '<p>Lagu paling ringkas untuk "membangunkan" jari: <b>5-not</b> — C D E F G naik, dan G F E D C turun, dengan jari 1 2 3 4 5.</p>' },
    { h: 'Latihan 5-not', body:
      '<p>Tekan "Main" dan lihat jari mana yang patut digunakan. Kemudian lakukan sendiri dengan tangan kanan, selepas itu tangan kiri.</p>',
      w: { t: 'scale', notes: ['C4','D4','E4','F4','G4','F4','E4','D4','C4'], label: 'Latihan 5-not (jari 1-2-3-4-5-4-3-2-1)', fingers: '1-2-3-4-5-4-3-2-1' } }
  ],
  practice: 'Latihan (15 minit): 5-not tangan kanan ×5, tangan kiri ×5. Perlahan, jari melengkung, pergelangan tangan relax — kelajuan datang kemudian.' },

{ n: 3, week: 1, emoji: '🪜', title: 'Skala C Major — Tangga Muzik Anda',
  goal: 'Kuasai skala yang paling penting untuk beginner — dan faham formula yang membina semua skala lain.',
  secs: [
    { h: 'Apa itu skala?', body:
      '<p>Skala ialah "tangga" not yang disusun ikut urutan. <b>Skala C Major</b> ialah skala paling mudah di dunia: semua not putih sahaja — <b>C D E F G A B C</b>.</p>' +
      '<p>Formula? Jarak antara not dinamakan <b>semitone</b> (kekunci bersebelahan, termasuk hitam) dan <b>whole tone</b> (jarak 2 semitone). Major scale formula: <b>W-W-H-W-W-W-H</b>.</p>' +
      '<ul><li>C→D : whole (lepasi C#)</li><li>D→E : whole</li><li>E→F : half (tak ada kekunci hitam di antara!)</li><li>…dan seterusnya ikut formula.</li></ul>' },
    { h: 'Main skala naik & turun', body:
      '<p>Tekan main dan lihat not menyala satu persatu. Perhatikan: <b>pattern jari sama setiap kali</b> — itu rahsia kelajuan.</p>',
      w: { t: 'scale', notes: ['C4','D4','E4','F4','G4','A4','B4','C5','B4','A4','G4','F4','E4','D4','C4'], label: 'Skala C Major (naik & turun)' } },
    { h: 'Kenapa penting?', body:
      '<p>90% lagu yang anda suka dibina dari not-not dalam skala ini. Hafal "rasa" skala C dan anda akan kenali bila mana-mana not "sesat" daripada lagu.</p>' }
  ],
  practice: 'Latihan (15 minit): Skala C tangan kanan naik-turun ×5, perlahan dan <b>sama rata</b> (setiap not sama panjang). Buat masa ini belum perlu tangan kiri lagi.' },

{ n: 4, week: 1, emoji: '🤝', title: 'Dua Tangan Berpasangan',
  goal: 'Mula gabungkan tangan — kemahiran paling "dibenci" beginner, tapi hari ini kita buat ia mudah.',
  secs: [
    { h: 'Tangan kiri: mirror image', body:
      '<p>Tangan kiri main peranan yang sama, cuma di kawasan kiri Middle C. Latihan 5-not tangan kiri: <b>C3 D3 E3 F3 G3</b> dengan jari 5-4-3-2-1 (mirror dari tangan kanan).</p>' },
    { h: 'Teknik "gelombang"', body:
      '<p>Jangan main kedua-dua tangan serentak dari mula. Ikut urutan ini:</p>' +
      '<ol><li>Tangan kanan bersendirian — sampai lancar.</li>' +
      '<li>Tangan kiri bersendirian — sampai lancar.</li>' +
      '<li>Kedua-dua tangan, <b>separuh kelajuan</b>. Beri diri anda masa — otak perlu membina "wayar" baru!</li></ol>' },
    { h: 'Latihan koordinasi', body:
      '<p>Main 5-not kedua-dua tangan serentak. Perlahan. Jika tersilap, berhenti dan ulang langkah tadi — itu bukan kegagalan, itu cara belajar.</p>',
      w: { t: 'scale', notes: ['C3','D3','E3','F3','G3'], label: 'LH 5-not (C3)', desc: 'Tangan kiri dulu, kemudian gabung dengan RH' } }
  ],
  practice: 'Latihan (15 minit): RH skala ×3, LH skala ×3, kemudian kedua tangan 5-not serentak ×5 — dengan tempo perlahan.' },

{ n: 5, week: 1, emoji: '🥁', title: 'Rentak & Tempo',
  goal: 'Muzik bukan sekadar not — ia adalah not yang tepat pada masa yang tepat. Hari ini kita kawal masa.',
  secs: [
    { h: 'Beat, BPM, dan kiraan', body:
      '<p><b>Beat</b> ialah degupan muzik — seperti degupan jantung lagu. <b>BPM</b> (beats per minute) menyatakan kelajuan: 60 BPM = 1 beat sesaat.</p>' +
      '<p>Untuk kebanyakan lagu pop, kita kira setiap bar kepada <b>1-2-3-4</b> (4/4 time — "empat-empat"). Metronome di bawah akan "mengetuk" untuk anda.</p>' },
    { h: 'Metronome interaktif', body:
      '<p>Set kelajuan, tekan main, dan kira kuat-kuat "1-2-3-4". Ketukan pertama setiap bar berbunyi lebih tinggi — itu beat 1.</p>',
      w: { t: 'metro', bpm: 80 } },
    { h: 'Peraturan emas latihan', body:
      '<div class="tip"><b>Peraturan emas:</b> kelajuan yang <i>perfect perlahan</i> mengalahkan kelajuan yang huru-hara. Naikkan BPM hanya bila boleh main tanpa silap 3 kali berturut-turut.</div>' }
  ],
  practice: 'Latihan (15 minit): Main latihan 5-not dengan metronome: 60 BPM, naik ke 70, 80. Jika tersilap, balik ke kelajuan sebelumnya.' },

{ n: 6, week: 1, emoji: '🎵', title: 'Melodi Pertama Anda',
  goal: 'Hari kebangkitan! Anda akan main lagu PERTAMA anda — Mary Had a Little Lamb — hanya dengan 3 not.',
  secs: [
    { h: 'Hanya 3 not', body:
      '<p>Mary Had a Little Lamb hanya menggunakan <b>C, D dan E</b> (plus satu G). Jika anda sudah buat latihan 5-not, tangan anda sudah tahu jalan ini!</p>' +
      '<p>Petua membaca melodi: not bertema berulang. Baris pertama: <b>E D C D | E E E</b> — "Ma-ry had a lit-tle lamb". Perhatikan pattern simetri.</p>' },
    { h: 'Main bersama player', body:
      '<p>Tekan Main — kekunci akan menyala ikut melodi, dan jalur not di bawah menunjukkan urutan. Ikut dengan mata dulu, kemudian main bersama.</p>',
      w: { t: 'song', id: 'mary' } },
    { h: 'Cara menghafal dengan pantas', body:
      '<p>Pecahkan lagu kepada frasa 4 bar. Lengkapkan frasa 1 sebelum pindah ke frasa 2. Lagu = 4 frasa pendek, bukan 30 not panjang!</p>' }
  ],
  practice: 'Latihan (20 minit): Main Mary Had a Little Lamb dengan tangan kanan, 3 kali berturut-turut tanpa silap, ikut metronome 80 BPM jika boleh.' },

{ n: 7, week: 1, emoji: '✅', title: 'Ujian Minggu 1',
  goal: 'Semak kemahiran minggu ini sebelum kita masuk ke dunia chord — tick apa yang sudah anda kuasai.',
  secs: [
    { h: 'Senarai semak kemahiran', body:
      '<p>Tandakan apa yang sudah boleh anda buat. Yang belum, tak apa — ulang hari berkenaan esok. Akses semua hari sentiasa terbuka (self-paced!).</p>',
      w: { t: 'check', id: 'w1', items: [
        'Saya boleh nama semua not putih (C D E F G A B) tanpa tengok nota',
        'Saya jumpa Middle C dalam 3 saat',
        'Saya boleh main skala C major tangan kanan tanpa silap',
        'Saya boleh main 5-not dengan kedua-dua tangan serentak',
        'Saya boleh main Mary Had a Little Lamb tanpa berhenti'
      ] } },
    { h: 'Sudah siap? Raikan!', body:
      '<div class="tip"><b>Ini bukan kecil!</b> Majoriti orang yang mahu belajar piano berhenti sebelum sampai di sini. Minggu depan anda akan mula bermain <i>chord</i> — sebab sebenar orang boleh main lagu kegemaran mereka.</div>' },
    { h: 'Malam ini', body:
      '<p>Anda boleh bebas bermain di keyboard bawah — dengar, cuba, bermain tanpa takut silap. Bermain tanpa nota pun sebahagian daripada belajar.</p>',
      w: { t: 'freeplay', lo: 'C3', hi: 'C6', mark: [] } }
  ],
  practice: 'Latihan (20 minit): Ulang mana-mana hari minggu ini yang paling anda perlukan + bebas bermain 5 minit.' },

/* ================= MINGGU 2 — DUNIA CHORD ================= */
{ n: 8, week: 2, emoji: '🧱', title: 'Apa Itu Chord?',
  goal: 'Hari ini rahsia muzik pop dibuka: chord. Anda akan main chord PERTAMA anda dan faham cara ia dibina.',
  secs: [
    { h: 'Satu chord = 3 not ditekan serentak', body:
      '<p><b>Chord</b> ialah sekumpulan not dimainkan bersama — "blok bangunan" lagu. Sambil penyanyi menyanyi melodi, pemain keyboard menyokong dengan chord. Kuasai chord, dan anda boleh main hampir semua lagu pop.</p>' +
      '<p>Chord paling biasa ialah <b>triad</b>: 3 not. Formula Major triad dari root: <b>+4 semitone, kemudian +3 semitone</b>.</p>' +
      '<p>Contoh, C Major: mula dari C → naik 4 semitones (lepasi C#, D, D#) → sampai <b>E</b> → naik 3 lagi → <b>G</b>. Jadi C major = <b>C + E + G</b>.</p>' },
    { h: 'Main chord pertama anda', body:
      '<p>Tekan butang — tiga not akan menyala dan berbunyi bersama. Itu bunyi <b>C major</b> — bunyi paling "gembira" dalam muzik Barat.</p>',
      w: { t: 'chord', syms: ['C'], label: 'Chord C Major — C E G (jari 1-3-5)' } },
    { h: 'Kuasai chord', body:
      '<p>Main C major dengan jari tangan kanan: <b>1 (ibu jari) di C, 3 di E, 5 di G</b>. Tekan-lepas-tekan-lepas 10 kali. Rasakan bentuknya — bentuk inilah yang anda akan "membawa" ke semua tempat keyboard.</p>' }
  ],
  practice: 'Latihan (15 minit): Chord C major, tangan kanan 1-3-5, tekan-lepas ×10, kemudian cuba tanpa tengok tangan.' },

{ n: 9, week: 2, emoji: '🔑', title: 'Tiga Chord Emas: C, F, G',
  goal: 'Dengan 3 chord ini sahaja, anda boleh main ratusan lagu. Ya, betul — tiga.',
  secs: [
    { h: 'Keluarga Key of C', body:
      '<p>Lagu dalam "key of C" lazimnya membina dari 3 chord utama: <b>C</b> (rumah / I), <b>F</b> (IV) dan <b>G</b> (V). Ahli muzik memanggilnya "three-chord song" — dan anda sudah pun boleh membina banyak lagu tradisional dan pop klasik dengannya.</p>' +
      '<ul><li><b>C</b> = C E G</li><li><b>F</b> = F A C</li><li><b>G</b> = G B D</li></ul>' +
      '<p>Perhatikan: bentuk jari <i>hampir sama</i>, cuma berpindah. Jari anda akan menghafal "jalan" ini.</p>' },
    { h: 'Tiga chord, satu skrin', body:
      '<p>Klik setiap butang chord — kekunci menyala menunjukkan not. Kemudian tekan "Main ketiga-tiga" untuk dengar urutan C → F → G → C (bunyi "pulang ke rumah").</p>',
      w: { t: 'chord', syms: ['C', 'F', 'G'], label: 'Tiga Chord Emas' } },
    { h: 'Latihan peralihan', body:
      '<div class="tip"><b>Drill peralihan:</b> main C → F → C → G → C, ulang-ulang. Pergeseran silap di <i>antara</i> chord — bukan pada chord. Fokus memandang not SEA yang mahu didatangi, bukan tangan anda sekarang.</div>' }
  ],
  practice: 'Latihan (20 minit): Kitaran C-F-C-G-C ×10 perlahan. Matlamat: bertukar chord tanpa berhenti.' },

{ n: 10, week: 2, emoji: '🌧️', title: 'Chord Minor: Am, Dm, Em',
  goal: 'Kuasai "senyap sedih" muzik — chord minor — dan dengar beza besar daripada 1 semitones sahaja.',
  secs: [
    { h: 'Major = ceria, Minor = pilu', body:
      '<p>Beza C major dan C minor hanyalah <b>satu semitones</b> (E → Eb), tetapi perasaan berubah sepenuhnya. Itulah kuasa chord: formula kecil, kesan emosi besar.</p>' +
      '<p>Formula minor triad: <b>+3 semitones, kemudian +4</b> — songsang daripada major.</p>' +
      '<p>Dalam key of C, chord minor yang penting: <b>Am</b> (A C E), <b>Dm</b> (D F A), <b>Em</b> (E G B).</p>' },
    { h: 'Banding sendiri', body:
      '<p>Main C, kemudian Am. Dengar bagaimana satu not berubah (E→E? no — tengok jari: C E G → A C E, "rumah" sama tapi rasa lain!). Uji setiap chord minor di bawah.</p>',
      w: { t: 'chord', syms: ['C', 'Am', 'F', 'Dm', 'G', 'Em'], label: 'Major vs Minor — dengar beza' } },
    { h: 'Mengapa belajar minor sekarang?', body:
      '<p>Kerana hampir tiada lagu hit yang major sahaja. Chorus gembira, verse emosi — campuran major + minor itulah resepinya. Besok anda akan main progression yang mengandungi semua ini.</p>' }
  ],
  practice: 'Latihan (15 minit): Main Am, Dm, Em ×5 setiap satu, kemudian urutan C-Am-F-G ×5.' },

{ n: 11, week: 2, emoji: '⭐', title: 'Progression Paling Popular di Dunia',
  goal: 'Hari ini anda main I–V–vi–IV (C-G-Am-F) — progression yang membuatkannya ratusan lagu hit terkenal.',
  secs: [
    { h: 'Formula ajaib', body:
      '<p>Chord <b>progression</b> = urutan chord yang berulang mengikut rentak. Dan progression ini: <b>I–V–vi–IV</b> dalam key of C = <b>C → G → Am → F</b>.</p>' +
      '<p>Lagu yang menggunakannya (atau versi saudaranya vi–IV–I–V): "Let It Be", "Someone Like You", "Someone You Loved", "No Woman No Cry", berpuluh lagu Melayu pop & evergreen… Ramai orang memanggilnya <b>"progression 4 chord"</b>.</p>' },
    { h: 'Main progression ini', body:
      '<p>Progression player di bawah memainkan C-G-Am-F berulang, dengan kekunci menyala mengikut chord. Tukar "pattern" untuk dengar iringan berlainan. Cuba juga <b>versi iringan</b>: block chord dulu, kemudian pattern.</p>',
      w: { t: 'prog', chords: ['C','G','Am','F'], pattern: 'block', bpm: 80, loop: 8 } },
    { h: 'Nyanyi atasnya', body:
      '<div class="tip"><b>Ujian telinga:</b> main progression ini dan cuba nyanyi lagu kegemaran anda di atasnya. Hampa jadi C-G-Am-F adalah bahasa muzik pop sejagat — kebanyakan melodi akan muat dengan achaun yang mengejutkan.</div>' }
  ],
  practice: 'Latihan (20 minit): Main C-G-Am-F dengan tangan kanan, 8 pusingan tanpa berhenti. Kemudian cuba nyanyi sebaris lagu kesukaan di atasnya.' },

{ n: 12, week: 2, emoji: '🎹', title: 'Tangan Kiri Menyokong',
  goal: 'Mula bunyi macam dua orang bermain: tangan kanan chord/melodi, tangan kiri menyokong dengan bass.',
  secs: [
    { h: 'Pembahagian kerja', body:
      '<p>Resepi standard pemain keyboard:</p>' +
      '<ul><li><b>Tangan kiri:</b> main root chord (not nama chord) di oktaf rendah — memberikan "bumi".</li>' +
      '<li><b>Tangan kanan:</b> chord penuh — memberikan "badan".</li></ul>' +
      '<p>Contoh untuk chord C: LH main <b>C3</b> (atau C2), RH main <b>C4 E4 G4</b>.</p>' },
    { h: 'Pattern "boom-chick"', body:
      '<p>Pattern paling asas dan paling digunakan: <b>boom</b> (tangan kiri root) pada beat 1 & 3, <b>chick</b> (chord tangan kanan) pada beat 1-2-3-4 atau 2 & 4. Player di bawah menunjukkan versi 8-nota pop.</p>',
      w: { t: 'prog', chords: ['C','G','Am','F'], pattern: 'beat8', bpm: 80, loop: 8 } },
    { h: 'Jangan tengok tangan', body:
      '<div class="tip"><b>Tip:</b> tangan kiri hanya perlu "melompat" antara beberapa root sahaja. Hafal jarak: C→G jauh sikit, G→Am dekat, Am→F dekat. Sekali otot anda menghafal, mata bebas untuk baca lirik atau sheet!</div>' }
  ],
  practice: 'Latihan (20 minit): LH root + RH chord untuk C-G-Am-F, 8 pusingan. Perlahan dulu, kemudian 80 BPM.' },

{ n: 13, week: 2, emoji: '🔄', title: 'Inversions — Jalan Pintas Chord',
  goal: 'Berhenti melompat seluruh keyboard! Inversion membolehkan tangan anda bergerak minimum tetapi chord tetap bertukar.',
  secs: [
    { h: 'Chord yang sama, susunan berbeza', body:
      '<p><b>Inversion</b> = susunan not chord yang berbeza. C major = C E G, tetapi boleh juga dimainkan <b>E G C</b> (1st inversion) atau <b>G C E</b> (2nd inversion). Bunyinya tetap "chord C" — hanya "warna" dan kedudukan berbeza.</p>' },
    { h: 'Mengapa ia hebat?', body:
      '<p>Bayangkan main C → F tanpa inversion: tangan melompat jauh. Dengan inversion, main C (C E G) → <b>F/C</b> (C F A) — hampir tak bergerak! Ahli piano menggunakan inversion untuk <b>peralihan licin</b>.</p>' },
    { h: 'Lihat & dengar', body:
      '<p>Butang di bawah menunjukkan C, C/E dan C/G — chord sama, susunan lain. Kemudian cuba pasangan "licin": C → C/E → C/G.</p>',
      w: { t: 'chord', syms: ['C', 'C/E', 'C/G', 'F/C', 'G/B'], label: 'Chord & inversions' } },
    { h: 'Jalan licin C-G-Am-F', body:
      '<p>Versi inversion untuk progression kegemaran kita: C → <b>G/B</b> → <b>Am</b> → <b>F/C</b>. Perhatikan betapa kecilnya pergerakan tangan. Ini rahsia bunyi "pro".</p>',
      w: { t: 'prog', chords: ['C','G/B','Am','F/C'], pattern: 'block', bpm: 80, loop: 4 } }
  ],
  practice: 'Latihan (20 minit): Main C-G-Am-F versi inversion ×5. Rasakan beza "melompat" vs "licin".' },

{ n: 14, week: 2, emoji: '✅', title: 'Ujian Minggu 2',
  goal: 'Sahkan kemahiran chord anda — ini kemahiran yang membuka pintu ke hampir semua lagu pop.',
  secs: [
    { h: 'Play-along ujian', body:
      '<p>Main bersama progression di bawah dengan tangan kanan (chord) atau dua tangan (root + chord). Ikut seberapa banyak pusingan yang anda mampu.</p>',
      w: { t: 'prog', chords: ['C','G','Am','F'], pattern: 'beat8', bpm: 90, loop: 8 } },
    { h: 'Senarai semak', body:
      '<p>Tandakan kemahiran yang sudah ada. Jika ada yang belum, ulang hari tersebut esok — semua orang mengikut rentak sendiri.</p>',
      w: { t: 'check', id: 'w2', items: [
        'Saya boleh main 6 chord: C, F, G, Am, Dm, Em tanpa tengok nota',
        'Saya tahu beza bunyi major vs minor',
        'Saya boleh main progression C-G-Am-F tanpa berhenti',
        'Saya boleh main LH root + RH chord serentak',
        'Saya faham apa itu inversion dan bila ia berguna'
      ] } },
    { h: 'Antara anda dan main lagu…', body:
      '<div class="tip"><b>Minggu depan:</b> kita gabungkan semua ini dengan <i>melodi</i>. Anda sudah memiliki "kereta" (chord) — sekarang kita pasang "enjin" (lagu penuh).</div>' }
  ],
  practice: 'Latihan (20 minit): Ulang hari paling lemah minggu ini + play-along progression 5 minit.' },

/* ================= MINGGU 3 — MAIN LAGU KESESUKAAN ================= */
{ n: 15, week: 3, emoji: '📜', title: 'Baca Lead Sheet & Chord Chart',
  goal: 'Belajar "peta" lagu — supaya mana-mana lagu baru hanya ambil 2 minit untuk faham.',
  secs: [
    { h: 'Dua cara membaca muzik', body:
      '<p><b>Nota staf</b> (sheet music klasik) — tepat, tetapi lambat dipelajari. <b>Lead sheet / chord chart</b> — cuma tulis nama chord + lirik. Inilah cara pemain pop, band wedding dan pemain bar bermain ratusan lagu.</p>' +
      '<p>Kerana anda sudah tahu chord, anda boleh baca chord chart SEKARANG.</p>' },
    { h: 'Anatomi lagu', body:
      '<ul><li><b>Intro</b> — pembuka (biasanya progression sama dengan verse)</li>' +
      '<li><b>Verse</b> — bahagian bercerita (lazimnya lebih tenang)</li>' +
      '<li><b>Chorus</b> — bahagian "top" lagu, diulang (lazimnya paling emosional)</li>' +
      '<li><b>Bridge</b> — kejutan sebelum chorus terakhir</li></ul>' +
      '<p>Sekarang, apabila anda dengar lagu, cuba dengar bila ia "bertukar bahagian" — itu bila chord bertukar pattern.</p>' },
    { h: 'Chord chart pertama anda', body:
      '<p>Di bawah ialah "chart" lagu contoh. Main dan dengar strukturnya: setiap bar = 4 beat, setiap chord sebaris. Notasi chart yang sama digunakan oleh pemain profesional.</p>',
      w: { t: 'prog', chords: ['C','G','Am','F'], pattern: 'block', bpm: 80, loop: 4, chartTitle: 'Contoh chart — Verse: C G Am F (×4)' } }
  ],
  practice: 'Latihan (15 minit): Pilih satu lagu kegemaran, cari chord chart dia di internet (cuba cari "chord [nama lagu]"), dan lihat berapa banyak chord yang anda sudah tahu!' },

{ n: 16, week: 3, emoji: '✨', title: 'Teknik Melodi + Chord',
  goal: 'Hari ini anda main lagu dengan "penuh": melodi tangan kanan, chord/root tangan kiri.',
  secs: [
    { h: 'Resepi lengkap', body:
      '<p>Inilah formula pemain solo keyboard:</p>' +
      '<ul><li><b>Tangan kanan:</b> melodi lagu (not demi not)</li>' +
      '<li><b>Tangan kiri:</b> root chord atau chord penuh mengikut progression lagu</li></ul>' +
      '<p>Kedengaran seperti dua orang bermain — tetapi hanya anda seorang. Teknik ini dipanggil <i>melody + accompaniment</i>.</p>' },
    { h: 'Cuba dengan Ode to Joy', body:
      '<p>Main melodi Ode to Joy dengan tangan kanan. Untuk tangan kiri, main root chord: C… G… — cukup. Player menunjukkan melodi; progression di bawah sebagai contoh iringan.</p>',
      w: { t: 'song', id: 'ode' } },
    { h: 'Tangan kiri ikut deria', body:
      '<div class="tip"><b>Tip:</b> jangan bersusah payah menghafal chord setiap melodi — dengar bila terasa "bertukar rumah" di melodi, dan tukar chord saat itu. Untuk kebanyakan lagu, bertukar tiap 4 beat (satu bar).</div>' }
  ],
  practice: 'Latihan (20 minit): Ode to Joy RH melodi + LH root (C, G, C…). Perlahan, kemudian naik tempo.' },

{ n: 17, week: 3, emoji: '💃', title: 'Pattern Pop 8-Beat',
  goal: 'Berikan lagu anda denyut pop sebenar — pattern yang digunakan dalam beribu-ribu lagu.',
  secs: [
    { h: 'Dari "block" ke "alive"', body:
      '<p>Block chord (semua not serentak) berbunyi kaku. Pattern 8-beat memecahkan chord kepada 8 not setiap bar: <b>tum-tum-tum-tum</b> berterusan seperti jantung lagu pop.</p>' +
      '<p>Formula LH: root pada beat 1 & 3 ("boom"), chord pada beat 2 & 4 ("chick") — atau versi 8-nota penuh di player bawah.</p>' },
    { h: 'Dengar pattern ini', body:
      '<p>Player di bawah bermain C-G-Am-F dengan pattern 8-beat. Dengar bagaimana progression yang sama tiba-tiba berbunyi seperti lagu radio!</p>',
      w: { t: 'prog', chords: ['C','G','Am','F'], pattern: 'beat8', bpm: 90, loop: 8 } },
    { h: 'Lagu yang pakai pattern ini', body:
      '<p>Hampir semua pop ballad: "Let It Be", "Someone Like You", majoriti lagu M Nasir, Ella, Siti Nurhaliza yang tempo sederhana. Pattern yang sama — hanya kelajuan dan chord berbeza.</p>' }
  ],
  practice: 'Latihan (20 minit): Main C-G-Am-F dengan pattern 8-beat sendiri (LH boom-chick + RH chord), 100 BPM matlamat akhir minggu.' },

{ n: 18, week: 3, emoji: '🫧', title: 'Pattern Ballad & Waltz',
  goal: 'Belajar "rasa" 3-beat waltz dan pattern ballad lembut — warna baru untuk lagu anda.',
  secs: [
    { h: 'Waltz: 1-2-3, 1-2-3', body:
      '<p>Waltz dikira dalam <b>3/4</b> — tiga beat setiap bar: <b>BERAT</b>-lembut-lembut. Pattern: root dalam pada beat 1, chord pada beat 2 dan 3. Rasanya melayang, seperti kitaran zaman dulu.</p>' +
      '<p>Lagu waltz yang anda mungkin kenali: "Blue Danube", "Tennessee Waltz", majoriti lagu klasik Melayu asli seperti "Cenderawasih" dan rumba-rumba era P. Ramlee.</p>' },
    { h: 'Main waltz', body:
      '<p>Progression yang sama (C-G-Am-F) tetapi kali ini dalam rasa waltz. Dengar beza besar yang dibuat oleh <i>kiraan</i> sahaja!</p>',
      w: { t: 'prog', chords: ['C','G','Am','F'], pattern: 'waltz', bpm: 90, loop: 8 } },
    { h: 'Ballad lembut 6/8', body:
      '<p>Untuk lagu sangat emosi (contoh "Perfect" — Ed Sheeran), rasa 6/8: kira <b>1-2-3-4-5-6</b> dengan penekanan pada 1 dan 4. Pattern ballad: LH root + chord, tetapi dibuat lembut dan berlegar. Ia seperti waltz yang berlari dua kali lebih laju tapi lebih sepoi.</p>' }
  ],
  practice: 'Latihan (20 minit): Waltz LH root-chord-chord untuk C-G-Am-F ×5, kemudian cuba main pola sama atas lagu mana-mana lagu 3-beat yang anda tahu.' },

{ n: 19, week: 3, emoji: '🎨', title: 'Sus Chords & Warna',
  goal: 'Tambah "bumbuk" pada chord anda — sus2 dan sus4, garam & gula muzik pop.',
  secs: [
    { h: 'Chord yang "tergantung"', body:
      '<p><b>Sus</b> = suspended: gantikan not ke-3 chord dengan not ke-4 (sus4) atau ke-2 (sus2), menghasilkan bunyi "tergantung" yang menagih penyelesaian.</p>' +
      '<ul><li><b>Csus4</b> = C F G — bunyi "terbuka", sering di akhir frase</li>' +
      '<li><b>Csus2</b> = C D G — bunyi moden/misty, kegemaran pemain pop & film score</li></ul>' },
    { h: 'Cuba & banding', body:
      '<p>Main C, kemudian Csus4, kemudian balik C. Dengar bagaimana sus "bertanya" dan chord asal "menjawab". Trick yang sama dengan Gsus4 → G.</p>',
      w: { t: 'chord', syms: ['C', 'Csus4', 'Csus2', 'Gsus4', 'G'], label: 'Sus chords — dengar rasa tergantung' } },
    { h: 'Bila guna sus?', body:
      '<ul><li>Pada akhir baris lagu (sebelum pulang ke chorus)</li>' +
      '<li>Untuk "mengisi" saat pemain berhenti sekejap</li>' +
      '<li>Ganti chord asal pada verse untuk rasa lebih modern</li></ul>' +
      '<p>Contoh terkenal: intro "Pinball Wizard", "Summer of 69", banyak intro rock klasik.</p>' }
  ],
  practice: 'Latihan (15 minit): Main C-G-Am-F, tetapi tukar chord terakhir setiap pusingan kepada sus dan balik. Main "licin" tanpa berhenti.' },

{ n: 20, week: 3, emoji: '🚚', title: 'Transpose — Tukar Key',
  goal: 'Belajar pindahkan lagu ke key lain — supaya muat dengan suara anda atau penyanyi rakan.',
  secs: [
    { h: 'Mengapa tukar key?', body:
      '<p>Suara manusia ada julat berbeza. Lagu asal mungkin terlalu tinggi/rendah untuk anda nyanyikan. <b>Transpose</b> = alihkan semua chord dengan jarak yang sama, mengubah key tanpa mengubah lagu.</p>' +
      '<p>Kebaikan untuk pemain keyboard: <b>bentuk jari dan pattern TIDAK berubah</b> — hanya kedudukan berpindah. Kuasai progression di satu key, dan anda punyainya di SEMUA key.</p>' },
    { h: 'C → G: contoh klasik', body:
      '<p>Progression C-G-Am-F dipindahkan ke key of G: setiap chord naik 7 semitones. Hasilnya: <b>G → D → Em → C</b>. Player di bawah memainkan kedua-dua — dengar lagunya "sama", cuma lebih tinggi.</p>',
      w: { t: 'prog', chords: ['C','G','Am','F','G','D','Em','C'], pattern: 'block', bpm: 80, loop: 4, splitLabels: ['Key of C', 'Key of G'] } },
    { h: 'Cara transpose dalam kepala', body:
      '<ol><li>Kenal jarak: C→G = 7 semitones ke atas (atau 5 ke bawah)</li>' +
      '<li>Tukar root setiap chord dengan jarak sama</li>' +
      '<li>Kualiti chord kekal (Am dalam C → Em dalam G, kerana kedua-duanya vi)</li></ol>' }
  ],
  practice: 'Latihan (15 minit): Main C-G-Am-F di key of G (G-D-Em-C) ×5. Kemudian cuba key of F (F-C-Dm-Bb — ok, Bb sedikit mencabar, lompat dulu jika mahu).' },

{ n: 21, week: 3, emoji: '✅', title: 'Ujian Minggu 3',
  goal: 'Gabungkan segalanya: melodi, chord, pattern — dan sahkan bahawa anda boleh main lagu penuh.',
  secs: [
    { h: 'Lagu ujian: Happy Birthday', body:
      '<p>Lagu yang setiap orang perlukan! Main melodi dengan RH, dan LH root chord (C, F, G, C mengikut frasa). Player menyala ikut not.</p>',
      w: { t: 'song', id: 'happy' } },
    { h: 'Play-along pattern', body:
      '<p>Pilih pattern kegemaran anda (block, 8-beat atau waltz) dan main bersama backing C-G-Am-F di bawah — dengan chord penuh dua tangan.</p>',
      w: { t: 'prog', chords: ['C','G','Am','F'], pattern: 'beat8', bpm: 90, loop: 8 } },
    { h: 'Senarai semak minggu 3', body:
      '<p>Tandakan kemahiran yang sudah stabil:</p>',
      w: { t: 'check', id: 'w3', items: [
        'Saya boleh main melodi + LH chord root serentak',
        'Saya boleh main pattern 8-beat dengan kedua-dua tangan',
        'Saya boleh main rasa waltz (1-2-3)',
        'Saya tahu bila dan macam mana guna sus chord',
        'Saya boleh pindahkan C-G-Am-F ke key of G'
      ] } }
  ],
  practice: 'Latihan (25 minit): Happy Birthday penuh (RH melodi + LH root) ×3, kemudian play-along pattern pilihan anda 10 minit.' },

/* ================= MINGGU 4 — POLISH & REPERTOIR ================= */
{ n: 22, week: 4, emoji: '🦶', title: 'Pedal Sustain',
  goal: 'Teknik yang membezakan bunyi "mesin taip" daripada bunyi "penaik mudik" — pedal kanan.',
  secs: [
    { h: 'Tiga pedal, satu yang penting', body:
      '<p>Piano acoustic ada 3 pedal, tetapi 90% masa anda hanya guna <b>pedal kanan (sustain)</b>: mengangkat semua "damper" supaya not terus bergetar selepas jari dilepaskan — bunyi menjadi legap, sepoi, menyambung.</p>' +
      '<p>Keyboard elektronik: cari butang "Sustain" atau sambung pedal yang dijual berasingan. Jika tiada — tidak menghalang pelajaran hari ini, cuma kurang "rasa".</p>' },
    { h: 'Peraturan pedal: bertukar BUKAN menekan', body:
      '<p>Kesilapan paling biasa beginner: pedal ditekan terus-menerus, semua not bercampur jadi sop santan! Peraturan: <b>angkat & tekan semula pedal pada setiap pertukaran chord</b> — tepat ketika chord baru dimainkan. Ini dipanggil "syncopated pedaling".</p>' },
    { h: 'Legato vs staccato — dengar beza', body:
      '<p>Player di bawah main pattern arpeggio: kali pertama bayangkan "dengan pedal" (not menyambung lembut) — kali kedua "tanpa pedal" (not putus). Dengan pedal, arpeggio berubah menjadi ombak.</p>',
      w: { t: 'prog', chords: ['C','G','Am','F'], pattern: 'arp', bpm: 70, loop: 8, pedalHint: true } }
  ],
  practice: 'Latihan (15 minit): Jika keyboard/piano anda ada pedal atau butang sustain: main C-G-Am-F pattern arp + tukar pedal setiap chord. Rasakan beza.' },

{ n: 23, week: 4, emoji: '🌊', title: 'Dynamics & Ekspresi',
  goal: 'Muzik bermula apabila not bertukar menjadi perasaan — kuat, lembut, membesar, surut.',
  secs: [
    { h: 'F, p, crescendo — simbol perasaan', body:
      '<p><b>f (forte)</b> = kuat. <b>p (piano)</b> = lembut. <b>crescendo</b> = membesar. <b>diminuendo</b> = surut. Muzik tanpa dynamics = robot bercerita dengan satu nada sahaja.</p>' },
    { h: 'Resepi emosi lagu', body:
      '<ul><li><b>Verse:</b> lembut (p) — bercerita</li>' +
      '<li><b>Chorus:</b> kuat (f) — meletup</li>' +
      '<li><b>Frasa akhir:</b> crescendo ke climax, kemudian surut ke not akhir</li></ul>' +
      '<p>Anda tidak perlu teknik baru — hanya <i>kelantangan</i> yang dirancang. Beri cerita anda bukit dan lembah.</p>' },
    { h: 'Awas: jari melaju, kelantangan tertinggal', body:
      '<div class="tip"><b>Latihan telinga:</b> main skala C naik dengan crescendo (makin lama makin kuat) dan turun dengan diminuendo. Ini latihan paling ringan tetapi paling jarang dibuat beginner — dan pemain pro sentiasa membayangkan bentuk dynamics walaupun berlatih skala.</div>' }
  ],
  practice: 'Latihan (15 minit): Main lagu Hari 21 anda (Happy Birthday / progression pilihan) dengan rancangan dynamics: verse lembut, baris akhir crescendo. Rakam dan dengar.' },

{ n: 24, week: 4, emoji: '🌊', title: 'Arpeggio & Broken Chords',
  goal: 'Pecahkan chord anda kepada ombak — iringan paling indah untuk lagu ballad.',
  secs: [
    { h: 'Chord "dipecahkan"', body:
      '<p>Seharian ini anda main chord sebagai blok. <b>Arpeggio</b> = main not chord tersebut satu demi satu: C… E… G… E… seperti ombak. Bunyi lebih luas dan romantis — keyboard anda tiba-tiba berbunyi seperti piano konsert.</p>' },
    { h: 'Formula asas arpeggio LH', body:
      '<ol><li>Not root (C3) — beat 1</li><li>Not ke-3 (E3) — beat 2</li>' +
      '<li>Not ke-5 (G3) — beat 3</li><li>Naik semula (C4 atau balik ke E) — beat 4</li></ol>' +
      '<p>Petua: mata lihat <i>chord akan datang</i> sebelum tangan sampai. Sama seperti Hari 13, ini "melihat ke depan".</p>' },
    { h: 'Dengar arpeggio', body:
      '<p>Player di bawah memainkan C-G-Am-F dengan pattern arpeggio. Perhatikan not yang dipilih setiap bar — semua dari chord tersebut, hanya dipecahkan mengikut urutan naik-turun.</p>',
      w: { t: 'prog', chords: ['C','G','Am','F'], pattern: 'arp', bpm: 70, loop: 8 } }
  ],
  practice: 'Latihan (20 minit): Main arpeggio LH untuk C-G-Am-F ×8 pusingan, kemudian cuba tambahkan RH melodi lagu mana-mana di atasnya (senang: Happy Birthday).' },

{ n: 25, week: 4, emoji: '🌙', title: 'Repertoir 1 — Ballad',
  goal: 'Hari ini anda main lagu ballad PENUH — melodi + arpeggio, dari mula hingga tamat.',
  secs: [
    { h: 'Lagu latihan: Senja Pertama', body:
      '<p>Ini lagu asal Piano 30 Hari yang ditulis khas untuk kemahiran anda hari ini: melodi mudah (C major), progression kegemaran kita (C-G-Am-F), dan setiap bar tepat 4 beat. Main RH melodi + LH arpeggio root-not.</p>' },
    { h: 'Main lagu penuh', body:
      '<p>Player menyala melodi + chord backing. Dengar <i>keseluruhan</i> lagu dahulu, kemudian belajar mengikut frasa 2 bar. Lirik? Boleh ganti dengan melodi senyuman anda sendiri.</p>',
      w: { t: 'song', id: 'ballad30' } },
    { h: 'Peta frasa', body:
      '<ol><li>Frasa 1 (bar 1-2): soalan</li><li>Frasa 2 (bar 3-4): jawapan</li>' +
      '<li>Frasa 3-4: sama, penghujung diturunkan — lagu "pulang"</li></ol>' +
      '<p>Struktur soal-jawab ini ada dalam hampir semua lagu yang pernah anda dengar.</p>' }
  ],
  practice: 'Latihan (25 minit): Belajar Senja Pertama mengikut frasa: RH melodi ×3, tambah LH arpeggio, matlamat: penuh 8 bar tanpa berhenti.' },

{ n: 26, week: 4, emoji: '🎉', title: 'Repertoir 2 — Riang',
  goal: 'Lagu kedua, rasa riang — guna pattern 8-beat untuk bunyi band penuh.',
  secs: [
    { h: 'Twinkle Twinkle — jangan dipandang rendah', body:
      '<p>Lagu kanak-kanak? Ya — tetapi lagu yang sama dipakai oleh Mozart untuk variation terkenalnya! Untuk kita: melodi sudah separuh hafal, jadi fokus boleh diberikan kepada <b>iringan dua tangan</b>.</p>' },
    { h: 'Main lagu penuh', body:
      '<p>RH melodi Twinkle Twinkle + LH pattern 8-beat (root-chord ala Hari 17). Player menyala melodi — LH anda ikut progression C, F, C, G… mengikut telinga.</p>',
      w: { t: 'song', id: 'twinkle' } },
    { h: 'Naikkan suasana', body:
      '<div class="tip"><b>Versi persembahan:</b> mulakan dengan block chord (lembut), baris kedua tukar ke 8-beat (kuat), dan baris akhir tambahkan arpeggio naik untuk ending kegemaran penonton.</div>' }
  ],
  practice: 'Latihan (25 minit): Twinkle Twinkle penuh dengan iringan dua tangan, kemudian buat "versi persembahan" 3 susunan seperti tip di atas.' },

{ n: 27, week: 4, emoji: '🔥', title: 'Improvisasi Pertama Anda',
  goal: 'Hari paling menyeronokkan: bermain nota yang TIDAK ditulis oleh sesiapa — nota anda sendiri.',
  secs: [
    { h: 'Pentatonic: skala "tak boleh silap"', body:
      '<p><b>Pentatonic</b> = skala 5 not: <b>C D E G A</b> (buang F dan B — dua not "berbahaya"). Dengan lima not ini, anda <i>hampir mustahil</i> bermain salah di atas chord C, Am atau F. Inilah rahsia improvisasi pemain pop dan budak guitar "solo berakar"<i> kampung tetapi syok</i>.</p>' },
    { h: 'Main bebas di atas backing', body:
      '<p>Backing C-G-Am-F bermain di bawah. Tugas anda: main not pentatonic (yang diserlahkan) secara bebas — melompat, berhenti, ulang, turun. Tidak ada not yang salah, hanya not yang belum anda dengar!</p>',
      w: { t: 'jam', chords: ['C','G','Am','F'], pattern: 'beat8', bpm: 80, notes: ['C4','D4','E4','G4','A4','C5'] } },
    { h: 'Formula improvisasi untuk pemula', body:
      '<ol><li>Mula dengan 3 not sahaja (C, E, G) — buat irama dengan salah satu</li>' +
      '<li>Tambah not ke-4 (D atau A) sebagai "jambatan"</li>' +
      '<li>Buat soalan-jawapan: frasa pendek, berhenti, "jawab" sendiri</li>' +
      '<li>Selalu kembali ke root (C) selepas beberapa not — itu "rumah"</li></ol>' }
  ],
  practice: 'Latihan (20 minit): Jam bersama backing 5 minit tanpa berhenti. Rakam sekali — dengar balik — anda mungkin akan terkejut betapa muziknya bunyi!' },

{ n: 28, week: 4, emoji: '⏱️', title: 'Rutin Latihan Yang Betul',
  goal: 'Bina rutin 20 minit yang lebih berkesan daripada 2 jam main sembarangan.',
  secs: [
    { h: 'Formula 5-5-10', body:
      '<p>Rutin latihan profesional (sesuai untuk semua peringkat):</p>' +
      '<ul><li><b>5 minit warm-up:</b> skala C + latihan 5-not kedua tangan</li>' +
      '<li><b>5 minit teknik:</b> satu kemahiran sahaja (hari ini: peralihan chord pantas)</li>' +
      '<li><b>10 minit lagu:</b> main repertoir anda dengan matlamat kecil (hari ini: frasa licin)</li></ul>' +
      '<p>Konsistensi mengalahkan durasi: 20 minit setiap hari > 3 jam sekali seminggu.</p>' },
    { h: 'Drill: peralihan pantas', body:
      '<p>Player bawah bermain C-G-Am-F pada 100 BPM. Main chord RH bersama backing — matlamat: <b>berkunci tepat pada beat</b>, bukan sedikit selepas. Jika ketinggalan, turun ke 80.</p>',
      w: { t: 'prog', chords: ['C','G','Am','F'], pattern: 'block', bpm: 100, loop: 8 } },
    { h: 'Kalendar anda', body:
      '<div class="tip"><b>Tip momentum:</b> tetapkan masa yang SAMA setiap hari (contoh: selepas solat/makan malam, sebelum tidur). Kekonkritan masa mengalahkan motivasi. Guna progress bar di atas halaman ini sebagai penjejak mingguan anda!</div>' }
  ],
  practice: 'Latihan (20 minit): Buat rutin 5-5-10 penuh HARI INI — dengan jam di sebelah. Esok, masa yang sama.' },

{ n: 29, week: 4, emoji: '🎤', title: 'Rakam & Nilai Diri Anda',
  goal: 'Mata telinga paling jujur: rakaman. Hari ini anda juri untuk diri sendiri.',
  secs: [
    { h: 'Rakam dengan telefon sahaja', body:
      '<p>Tidak perlu peralatan: letakkan telefon di atas meja (bukan atas piano — getarannya terlalu kuat), jarak 1 meter, mode audio/video. Main lagu penuh anda DUA kali: versi "selamat" dan versi "berani" (dengan dynamics penuh).</p>' },
    { h: 'Dengar balik seperti juri', body:
      '<p>Dengar rakaman SELEPAS selesai main, bukan sambil. Dengan mata tertutup, beri tumpuan kepada 3 perkara sahaja:</p>' +
      '<ol><li><b>Steady?</b> Rentak stabil atau berlari-lari?</li>' +
      '<li><b>Licin?</b> Peralihan chord ada "bengkang" atau tidak?</li>' +
      '<li><b>Bercerita?</b> Ada dynamics — atau semua satu kelantangan?</li></ol>' },
    { h: 'Senarai semak penilaian', body:
      '<p>Gunakan senarai di bawah semasa mendengar rakaman kedua:</p>',
      w: { t: 'check', id: 'w4a', items: [
        'Rentak steady dari mula sampai tamat',
        'Tiada peralihan chord yang putus/berhenti seketika',
        'Dynamics ada — bahagian kuat & lembut jelas beza',
        'Not akhir lagu dimainkan dengan yakin (bukan "hilang")',
        'Saya boleh dengar "cerita" dalam mainan saya'
      ] } },
    { h: 'Peraturan 80/20 pembaikan', body:
      '<div class="tip"><b>Pilih SATU kelemahan</b> untuk diperbaiki esok — bukan lima. Fokus tunggal membaiki lebih banyak dalam seminggu daripada "baiki semua" yang tidak selesai.</div>' }
  ],
  practice: 'Latihan (20 minit): Rakam 2 versi lagu repertoir anda, dengar balik, isi senarai semak, dan tulis SATU fokus esok.' },

{ n: 30, week: 4, emoji: '🎓', title: 'Graduation!',
  goal: 'Anda sudah punyai segalanya untuk terus bermain seumur hidup. Hari ini kita raikan dan susun langkah seterusnya.',
  secs: [
    { h: 'Lihat jauh anda sudah berjalan', body:
      '<p>30 hari lalu anda mungkin tak tahu mana satu Middle C. Hari ini anda boleh:</p>' +
      '<ul><li>Main skala & melodi dengan kedua-dua tangan</li>' +
      '<li>Main 8+ chord dan progression paling popular di dunia</li>' +
      '<li>Melodi + iringan dua tangan (lagu penuh!)</li>' +
      '<li>Pattern block, 8-beat, waltz & arpeggio</li>' +
      '<li>Transpose, sus chords, dan improvisasi pertama anda</li></ul>' },
    { h: 'Permainan terakhir: medley', body:
      '<p>Main satu "medley mini" — progression kegemaran kita, kemudian masuk lagu Senja Pertama, akhiri dengan improvisasi pentatonic anda sendiri. Rakam ia — ini diploma anda!</p>',
      w: { t: 'prog', chords: ['C','G','Am','F'], pattern: 'beat8', bpm: 95, loop: 8 } },
    { h: 'Roadmap selepas ini', body:
      '<p>Ke mana sahaja anda mahu pergi, ini jalan berterusan:</p>' +
      '<ul><li><b>Minggu depan:</b> skala G & F major — buka key baru</li>' +
      '<li><b>Bulan depan:</b> chord 7th (C7, G7, Am7) — bunyi jazz/blues</li>' +
      '<li><b>Bila-bila:</b> cari chord chart lagu kegemaran & belajar mengikut frasa</li>' +
      '<li><b>Bercita-cita?</b> Not staf klasik — anda kini ada konteks chord, jadi nota staf akan lebih mudah</li></ul>' },
    { h: 'Prinsip terakhir', body:
      '<div class="tip"><b>"Pemain hebat bukan yang berlatih lama sekali — tetapi yang kembali kepada kekunci setiap hari."</b> Jumpa di keyboard! 🎹</div>' }
  ],
  practice: 'Latihan terakhir (30 minit): Rakam medley mini anda. Simpan. Enam bulan dari sekarang, dengar balik — dan rasakan betapa jauhnya anda sudah berjalan.' }
];

const WEEKS = {
  1: { title: 'Kenali & Mula', sub: 'Kekunci, postur, skala, rentak & melodi pertama' },
  2: { title: 'Dunia Chord', sub: 'Triad, 6 chord utama, progression I-V-vi-IV, inversions' },
  3: { title: 'Main Lagu Kekesukaan', sub: 'Lead sheet, melodi+chord, pattern pop & waltz, sus, transpose' },
  4: { title: 'Polish & Repertoir', sub: 'Pedal, dynamics, arpeggio, improvisasi, repertoir & grad' }
};
