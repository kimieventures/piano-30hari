/* ============================================================
   Piano 30 Hari — App: router, renderer & widget interaktif
   Vanilla JS, tiada framework. Progress disimpan dalam localStorage.
   ============================================================ */
(() => {
  const $app = document.getElementById('app');
  const LS_DONE = 'p30_done';
  const timers = { all: [], byWidget: {} };

  /* ---------- util ---------- */
  const el = (tag, cls, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  };
  const getDone = () => { try { return JSON.parse(localStorage.getItem(LS_DONE)) || []; } catch (e) { return []; } };
  const setDone = (arr) => { localStorage.setItem(LS_DONE, JSON.stringify(arr)); };
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

  function schedule(widgetId, fn, ms) {
    const id = setTimeout(() => {
      (timers.byWidget[widgetId] = timers.byWidget[widgetId] || []).filter(x => x !== id);
      fn();
    }, ms);
    (timers.byWidget[widgetId] = timers.byWidget[widgetId] || []).push(id);
    timers.all.push(id);
  }
  function stopWidget(widgetId) {
    (timers.byWidget[widgetId] || []).forEach(clearTimeout);
    timers.byWidget[widgetId] = [];
  }
  function stopAllWidgets() { Object.keys(timers.byWidget).forEach(stopWidget); }

  /* ============================================================
     KEYBOARD BUILDER
     ============================================================ */
  function buildKeyboard(loName, hiName, opts) {
    opts = opts || {};
    const lo = Audio30.midiOf(loName), hi = Audio30.midiOf(hiName);
    const whites = [], blacks = [];
    for (let m = lo; m <= hi; m++) {
      (Audio30.NAMES[m % 12].length === 1 ? whites : blacks).push(m);
    }
    const kb = el('div', 'kb' + (opts.small ? ' small' : ''));
    kb.dataset.wcount = whites.length;
    const nW = whites.length;
    whites.forEach(m => {
      const k = el('div', 'wk', Audio30.NAMES[m % 12] + (Audio30.NAMES[m % 12] === 'C' ? (Math.floor(m / 12) - 1) : ''));
      k.dataset.midi = m;
      kb.appendChild(k);
    });
    blacks.forEach(m => {
      const wi = whites.indexOf(m - 1); // kekunci putih di sebelah kiri
      const k = el('div', 'bk', Audio30.NAMES[m % 12].replace('#', '♯'));
      k.dataset.midi = m;
      k.style.left = ((wi + 1) * 100 / nW - 3.2) + '%';
      kb.appendChild(k);
    });
    if (opts.onKey) {
      kb.addEventListener('pointerdown', ev => {
        const key = ev.target.closest('[data-midi]');
        if (!key) return;
        const m = +key.dataset.midi;
        flash(kb, [m], 180);
        Audio30.ensure();
        Audio30.tone(Audio30.freqOf(m), Audio30.now(), 1.1, 0.5);
        if (opts.onKey) opts.onKey(m);
      });
    }
    return kb;
  }
  const keyOf = (kb, m) => kb.querySelector('[data-midi="' + m + '"]');
  function hlKeys(kb, midis, labels) {
    clearHl(kb);
    midis.forEach((m, i) => {
      const k = keyOf(kb, m);
      if (k) { k.classList.add('hl'); if (labels && labels[i]) k.dataset.lbl = labels[i]; }
    });
  }
  function clearHl(kb) { kb.querySelectorAll('.hl').forEach(k => { k.classList.remove('hl'); delete k.dataset.lbl; }); }
  function flash(kb, midis, ms) {
    midis.forEach(m => { const k = keyOf(kb, m); if (k) k.classList.add('hit'); });
    setTimeout(() => midis.forEach(m => { const k = keyOf(kb, m); if (k) k.classList.remove('hit'); }), ms || 140);
  }
  /* julat keyboard yang memuat semua not + ruang sikit */
  function fitRange(names, pad) {
    pad = pad == null ? 2 : pad;
    const midis = names.map(n => Audio30.midiOf(n)).sort((a, b) => a - b);
    let lo = midis[0] - pad, hi = midis[midis.length - 1] + pad;
    while (Audio30.NAMES[lo % 12].length > 1) lo--; // snap ke kekunci putih
    while (Audio30.NAMES[hi % 12].length > 1) hi++;
    return [Audio30.nameOf(lo), Audio30.nameOf(hi)];
  }

  /* ============================================================
     WIDGETS
     ============================================================ */
  const W = {};

  /* ---- freeplay ---- */
  W.freeplay = (w, host, wid) => {
    const kb = buildKeyboard(w.lo || 'C3', w.hi || 'C6', { onKey: () => {}, small: false });
    if (w.mark && w.mark.length) {
      const lo = Audio30.midiOf(w.lo || 'C3'), hi = Audio30.midiOf(w.hi || 'C6');
      const midis = [];
      for (let m = lo; m <= hi; m++) if (w.mark.includes(Audio30.NAMES[m % 12])) midis.push(m);
      hlKeys(kb, midis, midis.map(() => '✨'));
    }
    const body = el('div', 'kb-shell'); body.appendChild(kb); host.appendChild(body);
  };

  /* ---- chord ---- */
  W.chord = (w, host, wid) => {
    const chords = w.syms.map(parseChord);
    const allNotes = chords.flatMap(c => c.notes).concat(chords.filter(c => c.bass).map(c => c.bass));
    const [lo, hi] = fitRange(allNotes);
    const kb = buildKeyboard(lo, hi, { small: true });
    const body = el('div', 'widget-body');
    const controls = el('div', 'controls');

    function showChord(i, play) {
      const c = chords[i];
      const notes = c.bass ? [c.bass].concat(c.notes) : c.notes;
      hlKeys(kb, notes.map(n => Audio30.midiOf(n)), notes.map((n, j) => j === 0 ? '1' : (j === 1 ? '3' : '5')));
      controls.querySelectorAll('.chip-btn').forEach((b, j) => b.classList.toggle('active', j === i));
      if (play) {
        Audio30.ensure();
        notes.forEach(n => Audio30.playNote(n, 0, 1.4, 0.34));
        flash(kb, notes.map(n => Audio30.midiOf(n)), 300);
      }
    }
    chords.forEach((c, i) => {
      const b = el('button', 'chip-btn', esc(c.sym));
      b.onclick = () => showChord(i, true);
      controls.appendChild(b);
    });
    if (chords.length > 1) {
      const all = el('button', 'btn small ghost', '▶ Main ketiga-tiga');
      all.onclick = () => {
        stopWidget(wid);
        chords.forEach((c, i) => {
          schedule(wid, () => showChord(i, true), i * 1300);
        });
      };
      controls.appendChild(all);
    }
    body.appendChild(controls);
    const shell = el('div', 'kb-shell'); shell.appendChild(kb); body.appendChild(shell);
    if (w.label) body.appendChild(el('p', 'wsub', esc(w.label)));
    host.appendChild(body);
    if (chords.length) showChord(0, false);
  };

  /* ---- scale ---- */
  W.scale = (w, host, wid) => {
    const notes = w.notes;
    const fingers = w.fingers ? w.fingers.split('-') : null;
    const [lo, hi] = fitRange(notes, 1);
    const kb = buildKeyboard(lo, hi, { small: true });
    const body = el('div', 'widget-body');
    const controls = el('div', 'controls');
    const btn = el('button', 'btn', '▶ Main ' + (w.label ? 'skala' : 'urutan'));
    const dt = 0.48;
    btn.onclick = () => {
      stopWidget(wid); Audio30.ensure();
      clearHl(kb);
      notes.forEach((n, i) => {
        Audio30.playNote(n, i * dt, dt * 1.4, 0.5);
        schedule(wid, () => hlKeys(kb, [Audio30.midiOf(n)], fingers ? [fingers[i]] : null), i * dt * 1000);
      });
      schedule(wid, () => clearHl(kb), notes.length * dt * 1000 + 900);
    };
    controls.appendChild(btn);
    if (w.label) controls.appendChild(el('span', 'wsub', esc(w.label)));
    body.appendChild(controls);
    const shell = el('div', 'kb-shell'); shell.appendChild(kb); body.appendChild(shell);
    if (w.desc) body.appendChild(el('p', 'wsub', esc(w.desc)));
    host.appendChild(body);
  };

  /* ---- prog / jam (chord progression + pattern) ---- */
  function progEvents(chordSyms, pattern, bpm, loopBars) {
    const beat = 60 / bpm;
    const beatsPerBar = pattern === 'waltz' ? 3 : 4;
    const barLen = beat * beatsPerBar;
    const ev = []; // {t, notes, dur, vol}
    const bars = [];
    for (let b = 0; b < loopBars; b++) bars.push(chordSyms[b % chordSyms.length]);
    bars.forEach((sym, bi) => {
      const c = parseChord(sym);
      const root3 = Audio30.nameOf(Audio30.midiOf(c.root + '3'));
      const t0 = bi * barLen;
      bars[bi] = { sym, c, t0, barLen };
      if (pattern === 'block') {
        ev.push({ t: t0, notes: [root3].concat(c.notes), dur: barLen, vol: 0.34 });
      } else if (pattern === 'beat8') {
        for (let k = 0; k < 8; k++) {
          const bassHit = k % 2 === 0;
          ev.push({
            t: t0 + k * beat / 2,
            notes: bassHit ? [root3] : c.notes,
            dur: beat * 0.7, vol: bassHit ? 0.42 : 0.26
          });
        }
      } else if (pattern === 'waltz') {
        ev.push({ t: t0, notes: [root3], dur: beat * 0.95, vol: 0.42 });
        ev.push({ t: t0 + beat, notes: c.notes, dur: beat * 0.9, vol: 0.26 });
        ev.push({ t: t0 + beat * 2, notes: c.notes, dur: beat * 0.9, vol: 0.26 });
      } else if (pattern === 'arp') {
        const seq = [root3, c.notes[1], c.notes[2], c.notes[1]];
        seq.forEach((n, k) => ev.push({ t: t0 + k * beat, notes: [n], dur: beat * 1.1, vol: 0.38 }));
      }
    });
    return { ev, bars, barLen, total: loopBars * barLen };
  }

  W.prog = W.jam = (w, host, wid) => {
    const pattern = w.pattern || 'block';
    const bpm = w.bpm || 80;
    const loopBars = w.loop || 8;
    const chords = w.chords.map(parseChord);
    const allNotes = chords.flatMap(c => c.notes);
    const [lo, hi] = fitRange(allNotes.concat(chords.map(c => Audio30.midiOf(c.root + '3') + '' ? Audio30.nameOf(Audio30.midiOf(c.root + '3')) : '')), 2);
    const kb = buildKeyboard(lo, hi, { small: true });
    const body = el('div', 'widget-body');
    const controls = el('div', 'controls');

    if (w.chartTitle) body.appendChild(el('p', 'wtitle', esc(w.chartTitle)));
    if (w.splitLabels) {
      const lg = el('div', 'controls');
      w.splitLabels.forEach((s, i) => lg.appendChild(el('span', 'pill', esc(s))));
      body.appendChild(lg);
    }

    const playBtn = el('button', 'btn', '▶ Main');
    const stopBtn = el('button', 'btn small ghost', '■ Stop');
    stopBtn.style.display = 'none';
    playBtn.onclick = () => {
      stopWidget(wid); Audio30.ensure();
      const { ev, bars, total } = progEvents(w.chords, pattern, bpm, loopBars);
      ev.forEach(e => {
        e.notes.forEach(n => Audio30.playNote(n, e.t, e.dur, e.vol));
        schedule(wid, () => flash(kb, e.notes.map(n => Audio30.midiOf(n)), 150), e.t * 1000);
      });
      bars.forEach(b => {
        schedule(wid, () => hlKeys(kb, b.c.notes.map(n => Audio30.midiOf(n)), null), b.t0 * 1000);
      });
      schedule(wid, () => { clearHl(kb); playBtn.style.display = ''; stopBtn.style.display = 'none'; }, total * 1000 + 600);
      playBtn.style.display = 'none'; stopBtn.style.display = '';
    };
    stopBtn.onclick = () => { stopWidget(wid); clearHl(kb); playBtn.style.display = ''; stopBtn.style.display = 'none'; };
    controls.appendChild(playBtn); controls.appendChild(stopBtn);
    controls.appendChild(el('span', 'wsub', pattern.toUpperCase() + ' · ' + bpm + ' BPM · ' + w.chords.join(' – ')));
    body.appendChild(controls);

    const shell = el('div', 'kb-shell'); shell.appendChild(kb); body.appendChild(shell);

    if (w.notes && w.notes.length) { // widget jam: serlahkan not pentatonic
      hlKeys(kb, w.notes.map(n => Audio30.midiOf(n)), w.notes.map(() => '★'));
    }
    if (w.pedalHint) body.appendChild(el('p', 'wsub', 'Petua pedal: angkat & tekan semula pada setiap pertukaran chord.'));
    host.appendChild(body);
  };

  /* ---- song ---- */
  W.song = (w, host, wid) => {
    const song = SONGS[w.id];
    const bpm = song.bpm || 90;
    const beat = 60 / bpm;
    const midis = song.notes.map(x => Audio30.midiOf(x[0]));
    const [lo, hi] = fitRange(song.notes.map(x => x[0]), 2);
    const kb = buildKeyboard(lo, hi, { small: true, onKey: null });
    const body = el('div', 'widget-body');
    const controls = el('div', 'controls');
    const playBtn = el('button', 'btn', '▶ Main lagu');
    const stopBtn = el('button', 'btn small ghost', '■ Stop');
    stopBtn.style.display = 'none';

    const strip = el('div', 'strip');
    song.notes.forEach(x => strip.appendChild(el('span', null, esc(x[0]))));

    playBtn.onclick = () => {
      stopWidget(wid); Audio30.ensure();
      const backing = song.chords ? progEvents(song.chords, 'block', bpm, song.chords.length) : null;
      if (backing) backing.ev.forEach(e => e.notes.forEach(n => Audio30.playNote(n, e.t, e.dur, 0.20)));
      let t = 0;
      song.notes.forEach((x, i) => {
        const [name, len] = x;
        Audio30.playNote(name, t, Math.min(len * beat * 0.92, beat * 3), 0.5);
        const at = t;
        schedule(wid, () => {
          clearHl(kb);
          hlKeys(kb, [midis[i]], null);
          flash(kb, [midis[i]], Math.min(len * beat * 800, 600));
          strip.querySelectorAll('span').forEach((s, j) => s.classList.toggle('on', j === i));
        }, at * 1000);
        t += len * beat;
      });
      schedule(wid, () => {
        clearHl(kb);
        strip.querySelectorAll('span').forEach(s => s.classList.remove('on'));
        playBtn.style.display = ''; stopBtn.style.display = 'none';
      }, t * 1000 + 700);
      playBtn.style.display = 'none'; stopBtn.style.display = '';
    };
    stopBtn.onclick = () => { stopWidget(wid); clearHl(kb); strip.querySelectorAll('span').forEach(s => s.classList.remove('on')); playBtn.style.display = ''; stopBtn.style.display = 'none'; };
    controls.appendChild(playBtn); controls.appendChild(stopBtn);
    controls.appendChild(el('span', 'wsub', esc(song.title) + ' · ' + bpm + ' BPM'));
    body.appendChild(controls);
    const shell = el('div', 'kb-shell'); shell.appendChild(kb); body.appendChild(shell);
    body.appendChild(strip);
    host.appendChild(body);
  };

  /* ---- metronome ---- */
  W.metro = (w, host, wid) => {
    const body = el('div', 'widget-body');
    const controls = el('div', 'controls');
    let bpm = w.bpm || 80;
    let playing = false, beatNo = 0, interval = null;

    const playBtn = el('button', 'btn', '▶ Main metronome');
    const slider = el('input'); slider.type = 'range'; slider.min = 40; slider.max = 180; slider.value = bpm;
    const val = el('span', 'bpm-val', bpm + '');
    const lamp = el('span', 'lamp');
    slider.oninput = () => {
      bpm = +slider.value; val.textContent = bpm;
      if (playing) { stop(); start(); }
    };
    function tick() {
      const accent = beatNo % 4 === 0;
      Audio30.click(0, accent);
      lamp.classList.add('on');
      setTimeout(() => lamp.classList.remove('on'), 70);
      beatNo++;
    }
    function start() {
      Audio30.ensure();
      playing = true; beatNo = 0;
      tick();
      interval = setInterval(tick, 60000 / bpm);
      playBtn.textContent = '■ Stop';
    }
    function stop() {
      playing = false;
      if (interval) clearInterval(interval); interval = null;
      playBtn.textContent = '▶ Main metronome';
    }
    playBtn.onclick = () => playing ? stop() : start();
    controls.appendChild(playBtn);
    controls.appendChild(lamp);
    controls.appendChild(slider);
    controls.appendChild(val);
    controls.appendChild(el('span', 'wsub', 'BPM'));
    body.appendChild(controls);
    host.appendChild(body);
  };

  /* ---- check ---- */
  W.check = (w, host, wid) => {
    const body = el('div', 'widget-body');
    const key = 'p30_check_' + (w.id || wid);
    let saved = [];
    try { saved = JSON.parse(localStorage.getItem(key)) || []; } catch (e) {}
    w.items.forEach((item, i) => {
      const row = el('div', 'check-item' + (saved[i] ? ' done' : ''));
      const cb = el('input'); cb.type = 'checkbox'; cb.checked = !!saved[i];
      const lb = el('label', null, esc(item));
      const toggle = () => {
        saved[i] = cb.checked;
        localStorage.setItem(key, JSON.stringify(saved));
        row.classList.toggle('done', cb.checked);
      };
      cb.onchange = toggle;
      row.appendChild(cb); row.appendChild(lb);
      body.appendChild(row);
    });
    host.appendChild(body);
  };

  /* ============================================================
     RENDER
     ============================================================ */
  function renderHeader() {
    const done = getDone().length;
    const pct = Math.round(done / DAYS.length * 100);
    document.getElementById('pbar').style.width = pct + '%';
    document.getElementById('plabel').textContent = done + '/30 hari · ' + pct + '%';
  }

  function renderHome() {
    stopAllWidgets();
    const done = getDone();
    const firstOpen = DAYS.find(d => !done.includes(d.n)) || DAYS[DAYS.length - 1];
    const app = el('div');
    app.appendChild(el('div', 'hero',
      '<div class="kicker">Ebook interaktif · belajar sendiri · tanpa guru</div>' +
      '<h1>Belajar Main Piano & Keyboard<br>— <em>30 Hari</em></h1>' +
      '<p class="lead">Dari kosong terus ke lagu kegemaran anda. Fokus <b>chord &amp; chord progression</b> — cara paling pantas main lagu sebenar tanpa perlu membaca nota staf. Percuma, mengikut rentak sendiri, untuk semua umur.</p>' +
      '<div class="stats">' +
        '<span class="pill"><b>30</b> hari berstruktur</span>' +
        '<span class="pill"><b>8+</b> chord &amp; progression</span>' +
        '<span class="pill"><b>5</b> lagu repertoir</span>' +
        '<span class="pill">🎹 keyboard interaktif bawa sendiri</span>' +
      '</div>'));
    const cta = el('div', 'controls');
    cta.style.margin = '10px 0 6px';
    const start = el('button', 'btn', done.length ? '▶ Terus Hari ' + firstOpen.n : '▶ Mula Hari 1 — percuma!');
    start.onclick = () => { location.hash = '#/hari-' + firstOpen.n; };
    cta.appendChild(start);
    app.appendChild(cta);

    let curWeek = 0;
    DAYS.forEach(d => {
      if (d.week !== curWeek) {
        curWeek = d.week;
        const wk = WEEKS[curWeek];
        app.appendChild(el('div', 'week-band', '<h2>Minggu ' + curWeek + ' — ' + esc(wk.title) + '</h2><span class="wk-sub">' + esc(wk.sub) + '</span>'));
        app.appendChild(el('hr', 'week-line'));
      }
      const card = el('a', 'day-card' + (done.includes(d.n) ? ' is-done' : ''));
      card.href = '#/hari-' + d.n;
      card.innerHTML = (done.includes(d.n) ? '<span class="done-badge">✓</span>' : '') +
        '<span class="num">Hari ' + d.n + '</span><h3>' + d.emoji + ' ' + esc(d.title) + '</h3><p>' + esc(d.goal) + '</p>';
      app.appendChild(card);
    });
    $app.innerHTML = '';
    $app.appendChild(app);
    renderHeader();
    window.scrollTo(0, 0);
  }

  function renderDay(n) {
    stopAllWidgets();
    const d = DAYS.find(x => x.n === n);
    if (!d) { renderHome(); return; }
    const done = getDone();
    const app = el('div');
    app.appendChild(el('div', 'crumb', '<a href="#/">← Rak Hari</a> &nbsp;·&nbsp; <span>Minggu ' + d.week + ' — ' + esc(WEEKS[d.week].title) + '</span>'));
    const head = el('div', 'day-head',
      '<div class="num">Hari ' + d.n + ' dari 30</div><h1>' + d.emoji + ' ' + esc(d.title) + '</h1>' +
      '<div class="goal"><b>🎯 Matlamat hari ini:</b> ' + esc(d.goal) + '</div>');
    app.appendChild(head);

    d.secs.forEach((s, i) => {
      const sec = el('section', 'lesson');
      sec.appendChild(el('h2', null, '<span class="no">' + (i + 1) + '</span>' + esc(s.h)));
      const body = el('div', null, s.body);
      sec.appendChild(body);
      if (s.w) {
        const wid = 'd' + n + 's' + i;
        const widget = el('div', 'widget');
        const title = ({
          freeplay: '🎹 Keyboard — cuba sendiri', chord: '🎼 Chord player', scale: '🪜 Scale player',
          prog: '🎶 Progression player', song: '🎵 Song player', metro: '🥁 Metronome',
          check: '✅ Senarai semak', jam: '🔥 Jam — main bebas'
        })[s.w.t] || 'Widget';
        widget.appendChild(el('div', 'widget-head', '<span class="wtitle">' + title + '</span>'));
        (W[s.w.t] || (h => {}))(s.w, widget, wid);
        sec.appendChild(widget);
      }
      app.appendChild(sec);
    });

    app.appendChild(el('div', 'tip', '<b>📋 ' + esc(d.practice) + '</b>'));

    /* butang selesai */
    const fin = el('div', 'finish');
    const finBtn = el('button', 'btn done-btn' + (done.includes(n) ? ' is-done' : ''),
      done.includes(n) ? '✓ Hari ini selesai — teruskan!' : '✓ Tandakan Hari ' + n + ' selesai');
    finBtn.onclick = () => {
      const cur = getDone();
      const idx = cur.indexOf(n);
      if (idx >= 0) cur.splice(idx, 1); else cur.push(n);
      setDone(cur.sort((a, b) => a - b));
      renderHeader();
      const isDone = cur.includes(n);
      finBtn.classList.toggle('is-done', isDone);
      finBtn.textContent = isDone ? '✓ Hari ini selesai — teruskan!' : '✓ Tandakan Hari ' + n + ' selesai';
    };
    fin.appendChild(finBtn);
    fin.appendChild(el('p', null, 'Progress disimpan dalam pelayar anda — balik semula bila-bila masa.'));
    app.appendChild(fin);

    /* nav hari */
    const nav = el('div', 'day-nav');
    if (n > 1) {
      const p = DAYS.find(x => x.n === n - 1);
      nav.appendChild(el('a', null, '<div class="dir">← Sebelum</div><b>Hari ' + p.n + ': ' + esc(p.title) + '</b>')).href = '#/hari-' + (n - 1);
    }
    if (n < 30) {
      const nx = DAYS.find(x => x.n === n + 1);
      const a = el('a', 'next', '<div class="dir">Seterusnya →</div><b>Hari ' + nx.n + ': ' + esc(nx.title) + '</b>');
      a.href = '#/hari-' + (n + 1);
      nav.appendChild(a);
    }
    app.appendChild(nav);

    $app.innerHTML = '';
    $app.appendChild(app);
    renderHeader();
    window.scrollTo(0, 0);
  }

  function route() {
    const m = /^#\/hari-(\d+)/.exec(location.hash);
    if (m) renderDay(+m[1]); else renderHome();
  }
  window.addEventListener('hashchange', route);
  route();
})();
