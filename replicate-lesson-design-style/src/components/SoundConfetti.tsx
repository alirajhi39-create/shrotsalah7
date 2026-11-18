import React from 'react';

let audioCtx: AudioContext | null = null;

function getCtx() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function playTone(type: 'success' | 'error' | 'click' | 'win', enabled = true) {
  if (!enabled) return;
  try {
    const ctx = getCtx();
    if (!ctx) return;
    const now = ctx.currentTime;

    const playNote = (freq: number, start: number, dur: number, wave: OscillatorType = 'sine', vol = 0.12) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = wave;
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(vol, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + dur);
    };

    if (type === 'click') {
      playNote(520, now, 0.06, 'sine', 0.07);
    } else if (type === 'success') {
      playNote(523.25, now, 0.12, 'triangle', 0.14);
      playNote(659.25, now + 0.09, 0.18, 'triangle', 0.14);
    } else if (type === 'error') {
      playNote(260, now, 0.15, 'sawtooth', 0.06);
      playNote(210, now + 0.12, 0.18, 'sawtooth', 0.05);
    } else if (type === 'win') {
      playNote(523.25, now, 0.12, 'triangle', 0.15);
      playNote(659.25, now + 0.1, 0.12, 'triangle', 0.15);
      playNote(783.99, now + 0.2, 0.15, 'triangle', 0.15);
      playNote(1046.5, now + 0.34, 0.35, 'triangle', 0.16);
    }
  } catch {
    // Ignore audio errors on restricted devices
  }
}

export const ConfettiBurst: React.FC<{ active: boolean }> = ({ active }) => {
  if (!active) return null;
  const colors = ['#1fadab', '#f7931e', '#1e6fd9', '#22a06b', '#facc15', '#fb7185'];
  const pieces = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    left: `${(i * 3.6 + (i % 5) * 4) % 98}%`,
    delay: `${(i % 7) * 0.12}s`,
    color: colors[i % colors.length],
    size: 8 + (i % 4) * 3,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="animate-fall absolute top-0 rounded-sm"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size * 0.6}px`,
            backgroundColor: p.color,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
};
