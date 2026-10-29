/* ============================================================
   Piano 30 Hari — Audio Engine
   Web Audio API synth (bunyi piano-ish, tiada fail audio).
   + helper teori muzik: not → frekuensi, parse simbol chord.
   ============================================================ */
const Audio30 = (() => {
  let ctx = null, master = null;

  function ensure() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.85;
      master.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  /* ---------- Not → MIDI → frekuensi ---------- */
  const PC = { C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5, 'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11 };
  const NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  function midiOf(name) { // "C4" → 60
    const m = /^([A-G][#b]?)(-?\d)$/.exec(name);
    if (!m) return 60;
    return (parseInt(m[2], 10) + 1) * 12 + PC[m[1]];
  }
  function nameOf(m) { // 60 → "C4"
    return NAMES[((m % 12) + 12) % 12] + (Math.floor(m / 12) - 1);
  }
  function freqOf(name) {
    const midi = (typeof name === 'number') ? name : midiOf(name);
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  /* ---------- Synth voice ---------- */
  function tone(f, t, dur, vol) {
    ensure();
    dur = dur || 0.8; vol = (vol == null) ? 0.5 : vol;
    const o1 = ctx.createOscillator(); // badan not
    const o2 = ctx.createOscillator(); // harmonic atas → rasa "ping" piano
    const o3 = ctx.createOscillator(); // sub lembut
    const g = ctx.createGain();
    const g2 = ctx.createGain(); g2.gain.value = 0.22;
    const g3 = ctx.createGain(); g3.gain.value = 0.30;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = Math.min(7000, f * 7);

    o1.type = 'triangle'; o1.frequency.value = f;
    o2.type = 'sine';     o2.frequency.value = f * 2;
    o3.type = 'sine';     o3.frequency.value = f * 0.5;

    o1.connect(g); o2.connect(g2); g2.connect(g); o3.connect(g3); g3.connect(g);
    g.connect(lp); lp.connect(master);

    const a = 0.006, rel = Math.max(dur, 0.22);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + a);
    g.gain.exponentialRampToValueAtTime(0.12 * vol, t + rel * 0.65);
    g.gain.exponentialRampToValueAtTime(0.0001, t + rel);
    [o1, o2, o3].forEach(o => { o.start(t); o.stop(t + rel + 0.05); });
  }

  function now() { ensure(); return ctx.currentTime + 0.02; }
  function playNote(name, when, dur, vol) { tone(freqOf(name), now() + (when || 0), dur, vol); }

  /* ---------- Metronome click ---------- */
  function click(when, accent) {
    ensure();
    const t = now() + when;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'square';
    o.frequency.value = accent ? 1660 : 1180;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(accent ? 0.42 : 0.24, t + 0.002);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
    o.connect(g); g.connect(master);
    o.start(t); o.stop(t + 0.1);
  }

  return { ensure, now, tone, click, playNote, freqOf, midiOf, nameOf, NAMES };
})();

/* ============================================================
   Teori: parse simbol chord → not sebenar
   Format disokong: "C", "Am", "Gsus4", "Csus2", "Dm7", "G7",
   "F/C" (slash chord), "Fmaj7", "Bdim"
   ============================================================ */
const CHORD_QUAL = {
  '':      [0, 4, 7],
  'm':     [0, 3, 7],
  'sus2':  [0, 2, 7],
  'sus4':  [0, 5, 7],
  '7':     [0, 4, 7, 10],
  'm7':    [0, 3, 7, 10],
  'maj7':  [0, 4, 7, 11],
  'dim':   [0, 3, 6],
  'aug':   [0, 4, 8]
};

function parseChord(sym) {
  let bass = null, body = sym;
  if (sym.includes('/')) { const p = sym.split('/'); body = p[0]; bass = p[1]; }
  const m = /^([A-G][#b]?)(.*)$/.exec(body);
  if (!m) return { name: sym, notes: ['C4', 'E4', 'G4'], bass: null, sym: sym };
  const rootPc = Audio30.midiOf(m[1] + '4') - 60;
  const offs = CHORD_QUAL[m[2]] || CHORD_QUAL[''];
  const rootMidi = 60 + rootPc; // oktaf 4
  const notes = offs.map(o => Audio30.nameOf(rootMidi + o));
  const bassNote = bass ? Audio30.nameOf(60 + (Audio30.midiOf(bass + '3') - 48)) : null;
  return { name: body, sym, notes, bass: bassNote, formula: m[2] || 'major', root: m[1] };
}

/* Pecahkan chord ke posisi "kekal tangan" — root oktaf 4 + notes berdekatan */
function closeVoicing(ch) {
  const base = Audio30.midiOf(ch.notes[0]);
  return ch.notes.map((n, i) => Audio30.nameOf(base + CHORD_QUAL[ch.formula][i]));
}
