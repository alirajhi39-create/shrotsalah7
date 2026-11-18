import React, { useState } from 'react';

export type SceneType =
  | 'fajr-start'
  | 'sunrise'
  | 'zawal'
  | 'equal-shadow'
  | 'asr-end'
  | 'maghrib-start'
  | 'shafaq-red'
  | 'midnight';

interface PrayerSceneProps {
  scene: SceneType;
  className?: string;
}

export const PrayerSceneSvg: React.FC<PrayerSceneProps> = ({ scene, className = '' }) => {
  switch (scene) {
    case 'fajr-start':
      return (
        <svg viewBox="0 0 320 180" className={`w-full rounded-2xl shadow-inner ${className}`}>
          <defs>
            <linearGradient id="fajrSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#050816" />
              <stop offset="65%" stopColor="#0d1b3e" />
              <stop offset="92%" stopColor="#264b8c" />
              <stop offset="100%" stopColor="#7ca7d9" />
            </linearGradient>
          </defs>
          <rect width="320" height="180" fill="url(#fajrSky)" />
          {/* Faint horizon dawn line */}
          <ellipse cx="160" cy="156" rx="150" ry="18" fill="#6ea4e8" opacity="0.35" />
          {/* Stars fading */}
          <circle cx="50" cy="35" r="1.2" fill="#fff" opacity="0.7" />
          <circle cx="120" cy="25" r="1" fill="#fff" opacity="0.6" />
          <circle cx="240" cy="40" r="1.3" fill="#fff" opacity="0.7" />
          <circle cx="280" cy="22" r="1" fill="#fff" opacity="0.5" />
          {/* Dark terrain silhouette */}
          <path d="M0,158 Q60,144 130,155 T250,152 T320,158 L320,180 L0,180 Z" fill="#070a12" />
          <path d="M18,158 L22,145 L26,158 M34,158 L39,142 L44,158" fill="#070a12" />
        </svg>
      );

    case 'sunrise':
      return (
        <svg viewBox="0 0 320 180" className={`w-full rounded-2xl shadow-inner ${className}`}>
          <defs>
            <linearGradient id="sunriseSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0c6dc2" />
              <stop offset="60%" stopColor="#58aee8" />
              <stop offset="100%" stopColor="#fde68a" />
            </linearGradient>
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="320" height="180" fill="url(#sunriseSky)" />
          <circle cx="115" cy="90" r="46" fill="url(#sunGlow)" />
          <circle cx="115" cy="90" r="14" fill="#fffbeb" />
          {/* Desert dunes */}
          <path d="M0,130 Q90,108 180,126 T320,115 L320,180 L0,180 Z" fill="#d9a05b" />
          <path d="M0,150 Q120,110 210,180 L0,180 Z" fill="#e6b878" />
          <path d="M150,180 Q215,122 320,145 L320,180 Z" fill="#b77935" />
        </svg>
      );

    case 'zawal':
      return (
        <svg viewBox="0 0 320 180" className={`w-full rounded-2xl shadow-inner ${className}`}>
          <rect width="320" height="180" fill="#d9b991" />
          <rect width="320" height="180" fill="url(#sandPattern)" opacity="0.2" />
          {/* Stick 1m */}
          <rect x="218" y="20" width="8" height="130" rx="2" fill="#5c3a21" />
          {/* 1m arrow */}
          <line x1="236" y1="22" x2="236" y2="148" stroke="#1e293b" strokeWidth="1.5" />
          <polygon points="236,18 233,25 239,25" fill="#1e293b" />
          <polygon points="236,152 233,145 239,145" fill="#1e293b" />
          <text x="252" y="90" fill="#1e293b" fontSize="14" fontWeight="bold" textAnchor="middle">١ م</text>
          {/* Tiny shadow at Zawal */}
          <polygon points="218,146 184,138 186,144 218,150" fill="#7c6348" opacity="0.85" />
          <line x1="216" y1="138" x2="185" y2="132" stroke="#dc2626" strokeWidth="2" />
          <polygon points="181,131 188,129 187,135" fill="#dc2626" />
          <text x="200" y="166" fill="#78350f" fontSize="11" fontWeight="bold" textAnchor="middle">فيء الزوال</text>
        </svg>
      );

    case 'equal-shadow':
      return (
        <svg viewBox="0 0 320 180" className={`w-full rounded-2xl shadow-inner ${className}`}>
          <rect width="320" height="180" fill="#d9b991" />
          {/* Stick 1m */}
          <rect x="242" y="18" width="8" height="132" rx="2" fill="#5c3a21" />
          <line x1="260" y1="20" x2="260" y2="148" stroke="#1e293b" strokeWidth="1.5" />
          <polygon points="260,16 257,23 263,23" fill="#1e293b" />
          <polygon points="260,152 257,145 263,145" fill="#1e293b" />
          <text x="276" y="88" fill="#1e293b" fontSize="14" fontWeight="bold" textAnchor="middle">١ م</text>
          {/* Zawal remnant */}
          <polygon points="242,146 212,139 214,144 242,150" fill="#7c6348" opacity="0.9" />
          <text x="228" y="166" fill="#78350f" fontSize="10" fontWeight="bold" textAnchor="middle">فيء الزوال</text>
          {/* Equal shadow */}
          <polygon points="212,139 68,107 70,114 214,144" fill="#6b5239" opacity="0.88" />
          <line x1="210" y1="133" x2="72" y2="101" stroke="#dc2626" strokeWidth="2.2" />
          <polygon points="67,100 75,98 73,104" fill="#dc2626" />
          <text x="142" y="106" fill="#0369a1" fontSize="11" fontWeight="bold" textAnchor="middle" transform="rotate(12 142 106)">
            طول ظل العصا يساوي طول العصا
          </text>
        </svg>
      );

    case 'asr-end':
      return (
        <svg viewBox="0 0 320 180" className={`w-full rounded-2xl shadow-inner ${className}`}>
          <defs>
            <linearGradient id="asrSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="55%" stopColor="#e2d5c1" />
              <stop offset="100%" stopColor="#fcd34d" />
            </linearGradient>
            <radialGradient id="paleSun" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef9c3" />
              <stop offset="60%" stopColor="#fde047" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="320" height="180" fill="url(#asrSky)" />
          <circle cx="170" cy="65" r="52" fill="url(#paleSun)" />
          <circle cx="170" cy="65" r="22" fill="#fef3c7" opacity="0.92" />
          <path d="M0,130 Q90,104 185,124 T320,118 L320,180 L0,180 Z" fill="#a88463" />
          <path d="M0,145 Q130,120 260,152 T320,142 L320,180 L0,180 Z" fill="#8f6b4a" />
        </svg>
      );

    case 'maghrib-start':
      return (
        <svg viewBox="0 0 320 180" className={`w-full rounded-2xl shadow-inner ${className}`}>
          <defs>
            <linearGradient id="maghribSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f3d75" />
              <stop offset="50%" stopColor="#2d6aa6" />
              <stop offset="78%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          <rect width="320" height="180" fill="url(#maghribSky)" />
          <ellipse cx="160" cy="158" rx="140" ry="22" fill="#fb923c" opacity="0.45" />
          <path d="M0,164 L320,164 L320,180 L0,180 Z" fill="#090d16" />
        </svg>
      );

    case 'shafaq-red':
      return (
        <svg viewBox="0 0 320 180" className={`w-full rounded-2xl shadow-inner ${className}`}>
          <defs>
            <linearGradient id="shafaqSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="40%" stopColor="#9a5c54" />
              <stop offset="78%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
          </defs>
          <rect width="320" height="180" fill="url(#shafaqSky)" />
          {/* Thin crescent */}
          <path d="M122,62 A8,8 0 1,0 130,72 A6.5,6.5 0 1,1 122,62 Z" fill="#fef3c7" opacity="0.9" />
          <path d="M0,152 Q50,145 90,155 T210,150 T320,154 L320,180 L0,180 Z" fill="#0a0d12" />
          <circle cx="30" cy="164" r="1.5" fill="#fde047" />
          <circle cx="48" cy="166" r="1.5" fill="#fde047" />
          <circle cx="290" cy="162" r="1.5" fill="#fde047" />
        </svg>
      );

    case 'midnight':
      return (
        <svg viewBox="0 0 320 180" className={`w-full rounded-2xl shadow-inner ${className}`}>
          <rect width="320" height="180" fill="#030712" />
          {[
            [35, 28, 1.5], [75, 50, 1.1], [110, 22, 1.8], [150, 62, 1.2],
            [185, 30, 1.6], [230, 48, 1.2], [275, 25, 1.7], [295, 70, 1.1],
            [45, 95, 1.2], [95, 118, 1.5], [140, 102, 1.0], [195, 125, 1.6],
            [245, 92, 1.2], [285, 132, 1.4], [60, 148, 1.3], [165, 152, 1.5],
            [215, 158, 1.1], [20, 62, 1.4], [130, 75, 1.1], [260, 115, 1.6],
          ].map(([cx, cy, r], idx) => (
            <circle key={idx} cx={cx} cy={cy} r={r} fill="#f8fafc" opacity={0.7 + (idx % 3) * 0.1} />
          ))}
        </svg>
      );
  }
};

export const InteractiveShadowSimulator: React.FC = () => {
  // slider 0 = Zawal (noon), 50 = shadow equals stick (end of Dhuhr / start of Asr), 100 = Asr late
  const [sunPos, setSunPos] = useState(0);

  // Compute shadow length in px (at zawal = 24px remnant, at 50 = 132px + 24px, at 100 = 200px)
  const shadowLen = 24 + (sunPos / 100) * 180;
  const sunX = 160 - (sunPos / 100) * 120;
  const sunY = 24 + (sunPos / 100) * 62;

  const getStatusLabel = () => {
    if (sunPos <= 15) {
      return {
        title: '☀️ وقت زوال الشمس (بداية الظهر)',
        desc: 'الشمس مالت قليلًا من كبد السماء، والظل قصير جدًا (فيء الزوال). هنا يدخل وقت صلاة الظهر!',
        badge: 'بداية وقت الظهر',
        color: 'bg-sky-100 text-sky-900 border-sky-300',
      };
    }
    if (sunPos < 65) {
      return {
        title: '🌤️ وقت صلاة الظهر مستمر',
        desc: 'الظل يزداد طولًا كلما مالت الشمس نحو الغرب، وما زال طول الظل أقل من طول العصا (١ م).',
        badge: 'أثناء وقت الظهر',
        color: 'bg-turq-100 text-turq-900 border-turq-300',
      };
    }
    if (sunPos <= 78) {
      return {
        title: '📏 صار ظل كل شيء مثله! (نهاية الظهر وبداية العصر)',
        desc: 'الآن أصبح طول ظل العصا (بعد فيء الزوال) مساويًا لطول العصا (١ م)! هنا ينتهي وقت الظهر ويدخل وقت العصر.',
        badge: 'نهاية الظهر = بداية العصر',
        color: 'bg-amber-100 text-amber-900 border-amber-300',
      };
    }
    return {
      title: '🌅 وقت صلاة العصر حتى اصفرار الشمس',
      desc: 'زاد الظل عن طول العصا وتقترب الشمس من الاصفرار والغروب.',
      badge: 'وقت صلاة العصر',
      color: 'bg-orange-100 text-orange-900 border-orange-300',
    };
  };

  const status = getStatusLabel();

  return (
    <div className="rounded-3xl border-2 border-turq-200 bg-white p-4 shadow-lg sm:p-6">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-black text-turq-900">🔬 المختبر التفاعلي: حرّك الشمس وراقب الظل!</h3>
        <span className={`rounded-full border px-3 py-1 text-xs font-black ${status.color}`}>
          {status.badge}
        </span>
      </div>

      <svg viewBox="0 0 360 190" className="w-full rounded-2xl border border-amber-200 bg-gradient-to-b from-sky-200 via-sky-100 to-amber-100">
        {/* Ground */}
        <rect x="0" y="135" width="360" height="55" fill="#d9b991" />
        {/* Sun */}
        <circle cx={sunX} cy={sunY} r="20" fill="#fde047" opacity="0.45" />
        <circle cx={sunX} cy={sunY} r="13" fill="#facc15" />
        {/* Sun ray */}
        <line
          x1={sunX}
          y1={sunY}
          x2={275 - shadowLen}
          y2="148"
          stroke="#f59e0b"
          strokeDasharray="4 4"
          strokeWidth="1.5"
          opacity="0.7"
        />
        {/* Stick 1m (height = 85px) */}
        <rect x="275" y="63" width="8" height="85" rx="2" fill="#5c3a21" />
        <text x="296" y="110" fill="#1e293b" fontSize="13" fontWeight="bold">١ م</text>
        {/* Shadow */}
        <rect
          x={275 - shadowLen}
          y="144"
          width={shadowLen}
          height="6"
          rx="2"
          fill="#6b5239"
          opacity="0.85"
        />
        {/* 1m marker on ground for comparison */}
        <line x1="166" y1="160" x2="251" y2="160" stroke="#0369a1" strokeWidth="2" strokeDasharray="3 2" />
        <text x="208" y="176" fill="#0369a1" fontSize="10" fontWeight="bold" textAnchor="middle">
          مقياس ١ م (طول العصا)
        </text>
      </svg>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600">
          <span>☀️ الزوال (بداية الظهر)</span>
          <span>📏 ظل الشيء مثله</span>
          <span>🌇 اصفرار الشمس</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={sunPos}
          onChange={(e) => setSunPos(Number(e.target.value))}
          className="h-3 w-full cursor-pointer appearance-none rounded-full bg-turq-100 accent-[#1fadab]"
          aria-label="تحريك الشمس لملاحظة طول الظل"
        />
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            type="button"
            onClick={() => setSunPos(0)}
            className="rounded-xl bg-sky-50 px-3 py-1.5 text-xs font-bold text-sky-800 hover:bg-sky-100"
          >
            عند الزوال
          </button>
          <button
            type="button"
            onClick={() => setSunPos(70)}
            className="rounded-xl bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800 hover:bg-amber-100"
          >
            ظل العصا = طول العصا
          </button>
          <button
            type="button"
            onClick={() => setSunPos(100)}
            className="rounded-xl bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-800 hover:bg-orange-100"
          >
            دخول العصر
          </button>
        </div>
      </div>

      <div className={`mt-4 rounded-2xl border p-3 text-sm ${status.color}`}>
        <p className="font-black">{status.title}</p>
        <p className="mt-1 font-semibold opacity-90">{status.desc}</p>
      </div>
    </div>
  );
};
