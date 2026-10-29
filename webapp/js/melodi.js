/* ============================================================
   Piano 30 Hari — Melodi 🎵 & Kuiz
   Melodi: pesona comel (CSS-animated) yang menyapa, menari bila
   kekunci ditekan, dan react kepada jawapan kuiz.
   Kuiz: 2 soalan setiap hari, skor disimpan, penjelasan diberi.
   ============================================================ */

/* ---------- Ucapan Melodi setiap hari ---------- */
const P30_CHAT = {
  1: 'Hai! Saya Melodi 🎵 Saya jadi teman you sepanjang 30 hari ni. Jangan malu — klik kekunci bawah dulu!',
  2: 'Postur betul = main lama tak penat. Jom duduk elok-elok, bahu relax!',
  3: 'Skala ni macam tangga — naik satu-satu, jangan tergesa ya!',
  4: 'Dua tangan serentak? Otak you memang boleh! Kuncinya: perlahankan separuh.',
  5: 'Rentak ialah jantung lagu. Denger degutan dia~ 1-2-3-4!',
  6: 'Lagu PERTAMA you hari ni! Saya tak sabar nak dengar 😊',
  7: 'Wow, dah satu minggu penuh! Saya memang bangga dengan you!',
  8: 'Hari ni rahsianya dibuka... chord! Let\'s go!',
  9: 'Tiga chord ni buka ratusan lagu tau. Hafal bentuk jari je!',
  10: 'Minor = rasa hujan petang. Sedih tapi cantik 🌧️',
  11: 'Progression NI yang buat lagu-lagu jadi hit! Dengar betapa familiar-nya.',
  12: 'Tangan kiri you kini ada tugas rasmi. Teamwork makes the dream work!',
  13: 'Inversion macam jalan pintas — jimat tenaga, licin bunyinya!',
  14: 'Dua minggu! You sekarang chord warrior 💪',
  15: 'Baca chord chart = superpower pemain pop. Semua band guna ni!',
  16: 'Dua tangan, dua peranan. Harmoni indah!',
  17: '8-beat ni bunyi radio sebenar. Tukar pattern, dengar beza!',
  18: 'Satuu-dua-tigaa... melayang macam waltz! 🌀',
  19: 'Sus tu macam gula-gula tergantung. Manis dan menagih jawapan!',
  20: 'Pindah key = lagu yang sama, rumah baru. Bentuk jari tak berubah!',
  21: 'TIGA MINGGU! You dah boleh main lagu penuh, tahu?!',
  22: 'Hari ni kaki pun belajar piano 😄 Pedal tu penting!',
  23: 'Kuat, lembut — macam ombak laut. Beri cerita anda bukit & lembah!',
  24: 'Arpeggio = chord yang berkecai jadi bunga 🌸',
  25: 'Lagu ballad PENUH hari ni. Dengar betapa indahnya~',
  26: 'Lagu kedua dalam repertoir! Anda membesar sebagai pemain!',
  27: 'Hari improv! Tiada jawapan salah hari ni — cuma not yang belum you dengar 🎶',
  28: 'Rutin 5-5-10: ringkas tapi power. Konsisten > lama!',
  29: 'Rakam, dengar, baikkan. Juri terbaik anda ialah anda sendiri!',
  30: 'GRADUATION! 🎓 Saya dari awal memang tahu you boleh. Jumpa di keyboard!'
};

/* ---------- Ucapan di halaman utama ---------- */
const P30_HOME_GREET = [
  'Jom mula! Klik hari mana-mana — semua terbuka, ikut rentak sendiri 🎹',
  'Tip saya: 20 minit sehari lagi power daripada 3 jam sekali minggu!',
  'Klik kekunci di bawah — bunyi piano sebenar, tak payah piano mahal!',
  'Progress you tersimpan kat sini. Balik semula bila-bila masa ya!'
];

function P30HomeGreeting() {
  let done = 0;
  try { done = (JSON.parse(localStorage.getItem('p30_done')) || []).length; } catch (e) {}
  if (done >= 30) return '30/30 HARI?! You legend sebenar! 🏆 Saya menangis happy ni...';
  if (done >= 15) return 'Sudah ' + done + '/30! Separuh jalan! Momentum jangan lepaskan ya 💪';
  if (done >= 5) return done + '/30 hari siap! Bakar terus api semangat ni! 🔥';
  return P30_HOME_GREET[Math.floor(Math.random() * P30_HOME_GREET.length)];
}

function P30ChatDay(n) { return P30_CHAT[n] || 'Jom belajar!'; }

/* ---------- Kuiz: 2 soalan sehari ---------- */
const P30_QUIZ = {
  1: [
    { q: 'Berapa not putih dalam satu oktaf?', o: ['7 — C D E F G A B', '5 — C D E F G', '12 — semua kekunci'], a: 0, w: '7 not putih berulang setiap oktaf. Kekunci hitam menyempitkan jurang antara not putih.' },
    { q: 'Kekunci putih di sebelah KIRI 2 kekunci hitam ialah...', o: ['C', 'F', 'A'], a: 0, w: 'Pola 2-3 hitam inilah "peta" anda untuk jumpa C dengan pantas.' }
  ],
  2: [
    { q: 'Telunjuk tangan kanan ialah jari nombor...', o: ['2', '1', '3'], a: 0, w: 'Ibu jari = 1, telunjuk = 2, sehingga kelingking = 5. Bahasa jari standard seluruh dunia.' },
    { q: 'Postur betul: lengan anda mesti...', o: ['Selari dengan lantai', 'Tegak ke atas', 'Bengkok ke bawah'], a: 0, w: 'Kerusi terlalu rendah/tinggi = ketegangan. Lengan selari = kawalan maksimum.' }
  ],
  3: [
    { q: 'Formula major scale ialah...', o: ['W-W-H-W-W-W-H', 'W-W-W-H-W-H-W', 'H-W-W-H-W-W-W'], a: 0, w: 'Formula ini membina SEMUA major scale — C major paling mudah sebab semua not putih.' },
    { q: 'Jarak E→F ialah...', o: ['Semitone (half)', 'Whole tone', 'Tak tentu'], a: 0, w: 'Tiada kekunci hitam antara E dan F — jadi jaraknya half sahaja.' }
  ],
  4: [
    { q: 'Latihan 5-not tangan kiri mula dengan jari...', o: ['5 (kelingking)', '1 (ibu jari)', '3 (tengah)'], a: 0, w: 'Tangan kiri mirror tangan kanan: kelingking mula dari C3 ke atas.' },
    { q: 'Cara terbaik mula main dua tangan serentak?', o: ['Separuh kelajuan', 'Kelajuan penuh terus', 'Tutup mata'], a: 0, w: 'Otak perlukan masa bina "wayar" baru. Perlahan dulu, kelajuan datang kemudian.' }
  ],
  5: [
    { q: 'BPM bermaksud...', o: ['Beats per minute', 'Bass per music', 'Basic piano mode'], a: 0, w: '60 BPM = 1 beat setiap saat — rentak lagu diukur dengan ini.' },
    { q: 'Peraturan emas latihan dengan metronome?', o: ['Naik BPM hanya bila lancar 3x berturut', 'Naik BPM setiap 2 minit', 'Metronome untuk pro sahaja'], a: 0, w: 'Kelajuan perfect-perlahan mengalahkan kelajuan huru-hara!' }
  ],
  6: [
    { q: '3 not pertama "Mary Had a Little Lamb" ialah...', o: ['E D C', 'C D E', 'G E C'], a: 0, w: '"Ma-ry had..." = E D C. Not berpusat di sekeliling C — sebab itu lagu sesuai pertama.' },
    { q: 'Cara paling pantas hafal lagu?', o: ['Pecah kepada frasa 4 bar', 'Main 30 not sekaligus', 'Hafal nombor jari sahaja'], a: 0, w: 'Otak suka blok kecil. 4 frasa pendek >> 1 lagu panjang.' }
  ],
  7: [
    { q: 'Middle C ialah...', o: ['C yang paling dekat tengah keyboard', 'C paling rendah', 'Mana-mana C'], a: 0, w: 'Ia "alamat rumah" kedua-dua tangan — RH ke kanannya, LH ke kirinya.' },
    { q: 'Fokus Minggu 2 nanti?', o: ['Chord — blok bangunan lagu!', 'Nota staf klasik', 'Main laju'], a: 0, w: 'Chord dulu, sheet music kemudian — cara paling pantas ke lagu sebenar.' }
  ],
  8: [
    { q: 'Formula major triad dari root...', o: ['+4 kemudian +3 semitone', '+3 kemudian +4', '+5 dan +5'], a: 0, w: 'C → E (+4) → G (+3). Songsangkan urutan itu dan anda dapat minor!' },
    { q: 'C major terdiri daripada not...', o: ['C E G', 'C D E', 'C F A'], a: 0, w: 'Tekan serentak dengan jari 1-3-5 — bentuk yang akan anda bawa ke semua chord.' }
  ],
  9: [
    { q: 'G major =', o: ['G B D', 'G A B', 'G C E'], a: 0, w: 'Gunakan formula +4/+3 dari G dan anda sampai ke B dan D.' },
    { q: 'F major =', o: ['F A C', 'F G A', 'F B D'], a: 0, w: 'C, F, G = "tiga chord emas" key of C. Ratusan lagu guna tiga-tiga ni sahaja!' }
  ],
  10: [
    { q: 'Am terdiri daripada...', o: ['A C E', 'A D F', 'A B E'], a: 0, w: 'Minor formula: +3 kemudian +4 dari root A.' },
    { q: 'Rasa chord minor lazimnya...', o: ['Sedih / pilu', 'Gembira', 'Marah'], a: 0, w: 'Satu not sahaja berubah dari major, tetapi emosi berubah sepenuhnya. Itulah kuasa chord!' }
  ],
  11: [
    { q: 'I–V–vi–IV dalam key of C =', o: ['C G Am F', 'C Dm Em F', 'Am F C G'], a: 0, w: 'Progression yang sama dipakai oleh ratusan lagu hit — "progression 4 chord".' },
    { q: 'Cuba nyanyi lagu kegemaran anda atas C-G-Am-F...', o: ['Kebanyakan melodi akan muat!', 'Tiada lagu akan muat', 'Hanya lagu rock muat'], a: 0, w: 'Itulah sebabnya progression ini terkenal — ia bahasa muzik pop sejagat.' }
  ],
  12: [
    { q: 'Tugas tangan kiri dalam iringan?', o: ['Root chord (bass)', 'Melodi', 'Semua not serentak'], a: 0, w: 'LH = "bumi" (bass), RH = "badan" (chord). Pembahagian kerja klasik pemain keyboard.' },
    { q: 'Pola "boom-chick": boom datang pada...', o: ['Beat 1 & 3', 'Beat 2 & 4', 'Setiap 8 not'], a: 0, w: 'Boom (bass) pada 1 & 3, chick (chord) mengisi selebihnya — denyut pop sebenar.' }
  ],
  13: [
    { q: '1st inversion C major =', o: ['E G C', 'G C E', 'C E G'], a: 0, w: 'Not sama, susunan lain — E paling bawah. Bunyinya tetap "chord C".' },
    { q: 'Faedah utama inversion?', o: ['Peralihan chord lebih licin', 'Bunyi 2x lebih kuat', 'Tak perlu hafal chord'], a: 0, w: 'Tangan bergerak minimum tapi chord tetap bertukar — rahsia bunyi "pro".' }
  ],
  14: [
    { q: 'Dm =', o: ['D F A', 'D A C', 'D E G'], a: 0, w: 'Minor +3/+4 dari root D. Nombor 3 nota terakhir F memberi rasa minor.' },
    { q: 'Em =', o: ['E G B', 'E A B', 'E G C'], a: 0, w: 'Chord minor paling mesra pemula — semua not putih, mudah dibentuk.' }
  ],
  15: [
    { q: 'Chord chart / lead sheet menulis...', o: ['Nama chord + lirik', 'Nota staf penuh', 'Lirik sahaja'], a: 0, w: 'Inilah cara pemain pop & band wedding membaca ratusan lagu — dan anda kini boleh juga!' },
    { q: 'Bahagian "top" lagu yang selalu diulang ialah...', o: ['Chorus', 'Verse', 'Intro'], a: 0, w: 'Verse bercerita, chorus meletup. Dengar lagu kegemaran dan kenal pasti bila ia "bertukar bahagian".' }
  ],
  16: [
    { q: 'Dalam teknik melodi + chord, tangan kanan main...', o: ['Melodi lagu', 'Root chord', 'Rentak drum'], a: 0, w: 'RH nyanyi melodi, LH menyokong — kedengaran macam dua orang, tetapi anda seorang!' },
    { q: 'Tangan kiri paling mudah main...', o: ['Root chord sahaja', 'Melodi pantas', 'Chord 10 not'], a: 0, w: 'Cukup root sahaja untuk mula! Canggih kemudian.' }
  ],
  17: [
    { q: 'Pattern 8-beat beri berapa not setiap bar?', o: ['8', '4', '16'], a: 0, w: 'Lapan not berterusan — "jantung" lagu pop tempo sederhana.' },
    { q: 'Rasa 8-beat paling sesuai untuk...', o: ['Ballad & lagu pop tempo sederhana', 'Muzik marching', 'Lagu tidur'], a: 0, w: 'Dari "Let It Be" hingga evergreen Melayu — denyut 8 yang sama.' }
  ],
  18: [
    { q: 'Waltz dikira berapa beat setiap bar?', o: ['3', '4', '6'], a: 0, w: 'BERAT-lembut-lembut. 1-2-3, 1-2-3 — rasa melayang era dulu.' },
    { q: 'Penekanan waltz jatuh pada beat...', o: ['1', '2', '3'], a: 0, w: 'Root dalam pada beat 1, chord lembut pada 2 & 3.' }
  ],
  19: [
    { q: 'Csus4 =', o: ['C F G', 'C D G', 'C F A'], a: 0, w: 'Gantikan not ke-3 (E) dengan ke-4 (F). Rasa "terbuka & menagih jawapan".' },
    { q: 'Sus chord memberi rasa...', o: ['Tergantung — mahu penyelesaian', 'Tidur dan tenang', 'Marah dan kasar'], a: 0, w: 'Sebab itu ia sesuai di akhir baris lagu — bertanya sebelum chord asal "menjawab".' }
  ],
  20: [
    { q: 'C-G-Am-F dipindahkan ke key of G menjadi...', o: ['G D Em C', 'G C D E', 'G D G C'], a: 0, w: 'Semua chord naik jarak sama. Bentuk & rasa lagu TIDAK berubah — hanya key baru.' },
    { q: 'Sebab utama transpose lagu?', o: ['Supaya muat suara penyanyi', 'Bunyi lebih mahal', 'Untuk guna kekunci hitam'], a: 0, w: 'Suara manusia ada julat berbeza — keyboard anda boleh "memindahkan rumah" dengan mudah.' }
  ],
  21: [
    { q: 'Happy Birthday bermula dengan not...', o: ['G', 'C', 'E'], a: 0, w: '"Hap-py..." = G G. Lagu wajib dalam repertoir semua orang!' },
    { q: 'Selang penukaran chord lazimnya berapa beat?', o: ['4 (satu bar)', '2', '16'], a: 0, w: 'Kebanyakan pop: satu chord sebar. Dengar bila melodi "bertukar rumah" — itu masanya tukar chord.' }
  ],
  22: [
    { q: 'Pedal kanan dipanggil pedal...', o: ['Sustain', 'Mute', 'Volume'], a: 0, w: 'Ia mengangkat damper supaya not terus bergetar — bunyi menjadi sepoi dan menyambung.' },
    { q: 'Bila angkat & tekan semula pedal?', o: ['Pada setiap pertukaran chord', 'Setiap 2 minit sahaja', 'Jangan sentuh langsung'], a: 0, w: 'Tekan terus-terusan dan semua not bercampur jadi sop santan! Bertukar pada chord baru.' }
  ],
  23: [
    { q: 'Simbol "f" bermaksud...', o: ['Forte — kuat', 'Finish', 'Flat'], a: 0, w: 'f = forte (kuat), p = piano (lembut). Dua huruf, dua dunia emosi.' },
    { q: 'Crescendo bermaksud...', o: ['Membesar — kian kuat', 'Berhenti seketika', 'Pelan sepanjang lagu'], a: 0, w: 'Dynamics memberikan lagu anda bukit dan lembah — cerita, bukan robot.' }
  ],
  24: [
    { q: 'Arpeggio ialah chord yang...', o: ['Dipecah not demi not', 'Dimainkan 2x lebih kuat', 'Dibalik urutannya'], a: 0, w: 'C… E… G… E… seperti ombak — rasa luas dan romantis.' },
    { q: 'Urutan arpeggio asas?', o: ['Root–3rd–5th–3rd', '5th–3rd–root–root', 'Rawak bebas'], a: 0, w: 'Naik lalu turun semula. Pattern ini boleh dipakai atas hampir semua chord!' }
  ],
  25: [
    { q: 'Progression "Senja Pertama"?', o: ['C G Am F', 'C D E F', 'Am G F E'], a: 0, w: 'Progression kegemaran kita — lagu asal Piano 30 Hari ditulis khas untuk kemahiran anda hari ini.' },
    { q: 'Struktur soalan-jawab dalam lagu dipanggil...', o: ['Frasa (phrase)', 'Bridge', 'Coda'], a: 0, w: 'Frasa 1 bertanya, frasa 2 menjawab — bahasa muzik yang hampir semua lagu guna.' }
  ],
  26: [
    { q: 'Twinkle Twinkle dipakai Mozart untuk...', o: ['Variation terkenal', 'Simfoni ketiganya', 'Opera pertamanya'], a: 0, w: 'Ya! Melodi "kanak-kanak" ini menjadi karya agung — jangan dipandang rendah!' },
    { q: '"Versi persembahan" bermula dengan...', o: ['Block chord lembut, kemudian naik suasa', 'Rentak penuh dari not pertama', 'Diam 4 bar dulu'], a: 0, w: 'Bina dari tenang ke hangat — penonton masuk ke dalam cerita anda.' }
  ],
  27: [
    { q: 'Pentatonic C =', o: ['C D E G A', 'C D E F G', 'C E G B D'], a: 0, w: 'Skala 5 not — buang F & B, dua not "berbahaya".' },
    { q: 'Kenapa pentatonic senang untuk improvisasi?', o: ['Not "berbahaya" sudah dibuang', 'Semua kekunci hitam', 'Cuma 3 not perlu'], a: 0, w: 'Hampir mustahil silap atas chord C, Am atau F. Main bebas tanpa takut!' }
  ],
  28: [
    { q: 'Rutin latihan berkesan hari ini?', o: ['5-5-10 (warm-up, teknik, lagu)', '10-10-10', 'Main bila teringat'], a: 0, w: 'Warm-up 5 min, teknik 5 min, lagu 10 min — struktur pro dalam 20 minit sahaja.' },
    { q: 'Mana LAGI berkesan?', o: ['20 minit setiap hari', '3 jam sekali seminggu', 'Tengok video tutorial sahaja'], a: 0, w: 'Konsistensi mengalahkan durasi. Otak belajar melalui pengulangan berkala.' }
  ],
  29: [
    { q: 'Cara termudah merakam diri?', o: ['Telefon di atas meja, jarak 1 meter', 'Sewa studio', 'Mic diletak atas piano'], a: 0, w: 'Getaran piano terlalu kuat untuk mic di atasnya — meja bersebelahan lebih jernih.' },
    { q: 'Berapa kelemahan fokus untuk diperbaiki esok?', o: ['SATU sahaja', 'Lima sekaligus', 'Semua lagi-lagi'], a: 0, w: 'Peraturan 80/20: satu fokus tunggal membaiki lebih banyak daripada "baiki semua".' }
  ],
  30: [
    { q: 'Roadmap bulan depan?', o: ['Chord 7th — bunyi jazz & blues', 'Terus berhenti di sini', 'Ulang Hari 1 sahaja'], a: 0, w: 'C7, G7, Am7 — chord "bumbuk" profesional. Anda sudah ada asas untuk itu!' },
    { q: 'Prinsip terakhir daripada Melodi?', o: ['Kembali ke kekunci setiap hari', 'Beli piano baru dulu', 'Guru mesti ada'], a: 0, w: 'Pemain hebat bukan yang berlatih lama sekali — tetapi yang kembali setiap hari. Jumpa di keyboard! 🎹' }
  ]
};

/* ============================================================
   MElODI — pesona CSS-animated
   ============================================================ */
function P30Melodi(msg, opts) {
  opts = opts || {};
  const wrap = document.createElement('div');
  wrap.className = 'melodi-row' + (opts.small ? ' small' : '');

  const m = document.createElement('div');
  m.className = 'melodi';
  m.setAttribute('aria-hidden', 'true');
  m.innerHTML =
    '<div class="m-note">♪</div>' +
    '<div class="m-body">' +
      '<div class="m-eye l"></div><div class="m-eye r"></div>' +
      '<div class="m-cheek l"></div><div class="m-cheek r"></div>' +
      '<div class="m-mouth"></div>' +
      '<div class="m-arm l"></div><div class="m-arm r"></div>' +
    '</div>' +
    '<div class="m-shadow"></div>' +
    '<div class="m-hearts"><span>♥</span><span>♥</span><span>♥</span></div>';
  m._set = function (state, ms) { /* tukar ekspresi seketika */
    m.classList.remove('happy', 'sad');
    void m.offsetWidth;
    m.classList.add(state);
    if (ms) setTimeout(() => m.classList.remove(state), ms);
  };
  wrap.appendChild(m);

  if (msg) {
    const b = document.createElement('div');
    b.className = 'm-bubble';
    b.textContent = msg;
    wrap.appendChild(b);
  }
  wrap.melodi = m;
  return wrap;
}

/* ============================================================
   WIDGET KUIZ
   ============================================================ */
function P30QuizWidget(n) {
  const qs = P30_QUIZ[n];
  if (!qs) return document.createElement('span');

  const w = document.createElement('div');
  w.className = 'widget quiz-widget';
  const head = document.createElement('div');
  head.className = 'widget-head';
  const melodiRow = P30Melodi('', { small: true });
  melodiRow.classList.add('in-head');
  head.appendChild(melodiRow);
  head.insertAdjacentHTML('beforeend',
    '<div><div class="wtitle">🎮 Kuiz Hari ' + n + '</div>' +
    '<div class="wsub">Jawab & lihat Melodi react! Jawapan dihuraikan.</div></div>');
  w.appendChild(head);

  const body = document.createElement('div');
  body.className = 'widget-body';
  w.appendChild(body);

  const KEY = 'p30_quiz_d' + n;
  let best = 0;
  try { best = +localStorage.getItem(KEY) || 0; } catch (e) {}

  let idx = 0, score = 0;

  function sfx(ok) {
    try {
      Audio30.ensure();
      if (ok) {
        Audio30.playNote('C5', 0, 0.18, 0.35);
        Audio30.playNote('E5', 0.09, 0.18, 0.35);
        Audio30.playNote('G5', 0.18, 0.5, 0.35);
      } else {
        Audio30.playNote('G3', 0, 0.3, 0.3);
        Audio30.playNote('F#3', 0.12, 0.45, 0.3);
      }
    } catch (e) {}
  }

  function renderQ() {
    body.innerHTML = '';
    if (idx >= qs.length) return renderEnd();

    const q = qs[idx];
    const correct = q.o[q.a];
    const order = q.o.map((t, i) => ({ t, i })).sort(() => Math.random() - 0.5);

    const prog = document.createElement('div');
    prog.className = 'q-progress';
    prog.textContent = 'Soalan ' + (idx + 1) + ' / ' + qs.length + ' · Skor terbaik: ' + best + '/' + qs.length;
    body.appendChild(prog);

    const qt = document.createElement('div');
    qt.className = 'q-text';
    qt.textContent = q.q;
    body.appendChild(qt);

    const opts = document.createElement('div');
    opts.className = 'q-opts';
    let answered = false;
    order.forEach(it => {
      const b = document.createElement('button');
      b.className = 'q-opt';
      b.textContent = it.t;
      b.onclick = () => {
        if (answered) return;
        answered = true;
        const ok = it.i === q.a;
        if (ok) score++;
        body.querySelectorAll('.q-opt').forEach(x => x.disabled = true);
        if (ok) b.classList.add('correct');
        else {
          b.classList.add('wrong');
          body.querySelectorAll('.q-opt').forEach(x => { if (x.textContent === correct) x.classList.add('correct'); });
        }
        sfx(ok);
        melodiRow.melodi._set(ok ? 'happy' : 'sad', 1400);
        const why = document.createElement('div');
        why.className = 'q-why';
        why.innerHTML = (ok ? '<b class="ok-txt">Betul! 🎉</b> ' : '<b class="bad-txt">Belum tepat.</b> ') + q.w;
        body.appendChild(why);
        const next = document.createElement('button');
        next.className = 'btn small q-next';
        next.textContent = idx + 1 < qs.length ? 'Soalan seterusnya →' : 'Lihat skor saya →';
        next.onclick = () => { idx++; renderQ(); };
        body.appendChild(next);
      };
      opts.appendChild(b);
    });
    body.appendChild(opts);
  }

  function renderEnd() {
    const total = qs.length;
    if (score > best) { best = score; try { localStorage.setItem(KEY, String(best)); } catch (e) {} }
    const perfect = score === total;
    const msg = perfect ? 'PERFECT! Melodi melompat gembira! 🎉' :
                score > 0 ? 'Tidak buruk — baca huraian & cuba lagi untuk skor penuh!' :
                'Tak apa! Ulang pelajaran hari ni dan cuba semula ya 💪';
    body.innerHTML =
      '<div class="q-end' + (perfect ? ' perfect' : '') + '">' +
        '<div class="q-score">' + score + ' / ' + total + (perfect ? ' 🏆' : '') + '</div>' +
        '<p>' + msg + '</p>' +
        '<div class="q-meta">Skor terbaik anda: ' + best + '/' + total + '</div>' +
      '</div>';
    const again = document.createElement('button');
    again.className = 'btn small ghost';
    again.textContent = '↻ Cuba lagi';
    again.onclick = () => { idx = 0; score = 0; renderQ(); };
    body.appendChild(again);
    if (perfect) melodiRow.melodi._set('happy', 3000);
  }

  renderQ();
  return w;
}
