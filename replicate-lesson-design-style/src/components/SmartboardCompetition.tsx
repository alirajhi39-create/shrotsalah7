import React, { useEffect, useState } from 'react';
import { COMPETITION_QUESTIONS, CompetitionQuestion } from '../data/lessonData';
import { ConfettiBurst, playTone } from './SoundConfetti';

export interface Team {
  id: string;
  name: string;
  score: number;
  color: string;
  emoji: string;
}

const TEAM_PRESETS: Array<{ name: string; color: string; emoji: string }> = [
  { name: 'فريق الفجر', color: 'from-turq-500 to-turq-700 border-turq-400 bg-turq-50 text-turq-950', emoji: '🌅' },
  { name: 'فريق النور', color: 'from-brand-blue to-blue-700 border-sky-400 bg-sky-50 text-sky-950', emoji: '🌟' },
  { name: 'فريق القبلة', color: 'from-amber-500 to-orange-600 border-amber-400 bg-amber-50 text-amber-950', emoji: '🕋' },
  { name: 'فريق الإخلاص', color: 'from-emerald-500 to-emerald-700 border-emerald-400 bg-emerald-50 text-emerald-950', emoji: '💚' },
  { name: 'فريق الأبطال', color: 'from-indigo-500 to-indigo-700 border-indigo-400 bg-indigo-50 text-indigo-950', emoji: '🦁' },
  { name: 'فريق الصدق', color: 'from-rose-500 to-rose-700 border-rose-400 bg-rose-50 text-rose-950', emoji: '🏅' },
];

const TEAMS_STORAGE_KEY = 'shrotsalsh2_smartboard_teams';

export const SmartboardCompetition: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>(() => {
    try {
      const saved = localStorage.getItem(TEAMS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Team[];
        if (Array.isArray(parsed) && parsed.length >= 2) return parsed;
      }
    } catch {
      // ignore
    }
    return [
      { id: 't1', ...TEAM_PRESETS[0], score: 0 },
      { id: 't2', ...TEAM_PRESETS[1], score: 0 },
    ];
  });

  const [questions, setQuestions] = useState<CompetitionQuestion[]>(COMPETITION_QUESTIONS);
  const [qIdx, setQIdx] = useState(0);
  const [activeTeamIdx, setActiveTeamIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isFullscreenBoard, setIsFullscreenBoard] = useState(false);
  const [showWinnerScreen, setShowWinnerScreen] = useState(false);
  const [timerSec, setTimerSec] = useState<0 | 15 | 30>(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [confetti, setConfetti] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [editingTeams, setEditingTeams] = useState(false);

  useEffect(() => {
    localStorage.setItem(TEAMS_STORAGE_KEY, JSON.stringify(teams));
  }, [teams]);

  // Countdown timer
  useEffect(() => {
    if (timerSec === 0 || selectedOption !== null || showWinnerScreen) return;
    if (timeLeft <= 0) return;
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          playTone('error', soundOn);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [timerSec, timeLeft, selectedOption, showWinnerScreen, soundOn]);

  const currentQ = questions[qIdx];
  const activeTeam = teams[activeTeamIdx] || teams[0];

  const handleAddTeam = () => {
    if (teams.length >= 6) return;
    const preset = TEAM_PRESETS[teams.length % TEAM_PRESETS.length];
    setTeams((prev) => [
      ...prev,
      {
        id: `t-${Date.now()}`,
        name: preset.name,
        color: preset.color,
        emoji: preset.emoji,
        score: 0,
      },
    ]);
    playTone('click', soundOn);
  };

  const handleRemoveTeam = (id: string) => {
    if (teams.length <= 2) return;
    setTeams((prev) => {
      const next = prev.filter((t) => t.id !== id);
      if (activeTeamIdx >= next.length) setActiveTeamIdx(0);
      return next;
    });
    playTone('click', soundOn);
  };

  const handleRenameTeam = (id: string, newName: string) => {
    setTeams((prev) => prev.map((t) => (t.id === id ? { ...t, name: newName } : t)));
  };

  const adjustScore = (id: string, delta: number) => {
    setTeams((prev) =>
      prev.map((t) => (t.id === id ? { ...t, score: Math.max(0, t.score + delta) } : t))
    );
    playTone(delta > 0 ? 'success' : 'click', soundOn);
  };

  const handleAnswer = (optIdx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optIdx);
    const isCorrect = optIdx === currentQ.correctIndex;
    if (isCorrect) {
      playTone('success', soundOn);
      setConfetti(true);
      setTimeout(() => setConfetti(false), 1800);
      setTeams((prev) =>
        prev.map((t, i) => (i === activeTeamIdx ? { ...t, score: t.score + 1 } : t))
      );
    } else {
      playTone('error', soundOn);
    }
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setTimeLeft(timerSec);
    setActiveTeamIdx((prev) => (prev + 1) % teams.length);
    if (qIdx + 1 < questions.length) {
      setQIdx((prev) => prev + 1);
    } else {
      setShowWinnerScreen(true);
      setConfetti(true);
      playTone('win', soundOn);
      setTimeout(() => setConfetti(false), 3000);
    }
  };

  const startNewRound = (shuffle = false) => {
    if (shuffle) {
      const copy = [...COMPETITION_QUESTIONS].sort(() => Math.random() - 0.5);
      setQuestions(copy);
    } else {
      setQuestions(COMPETITION_QUESTIONS);
    }
    setQIdx(0);
    setActiveTeamIdx(0);
    setSelectedOption(null);
    setShowWinnerScreen(false);
    setTimeLeft(timerSec);
    playTone('click', soundOn);
  };

  const resetAllScores = () => {
    setTeams((prev) => prev.map((t) => ({ ...t, score: 0 })));
    startNewRound(false);
  };

  const sortedByRank = [...teams].sort((a, b) => b.score - a.score);
  const topScore = sortedByRank[0]?.score ?? 0;

  return (
    <div
      className={
        isFullscreenBoard
          ? 'fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-slate-50 p-4 sm:p-6'
          : 'space-y-5'
      }
    >
      <ConfettiBurst active={confetti} />

      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border-2 border-turq-200 bg-turq-50/70 p-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setEditingTeams((v) => !v)}
            className={`rounded-xl border-2 px-3 py-2 text-sm font-black transition ${
              editingTeams
                ? 'border-brand-orange bg-brand-orange text-white'
                : 'border-turq-300 bg-white text-turq-900 hover:bg-turq-100'
            }`}
          >
            ✏️ تعديل أسماء الفرق ({teams.length})
          </button>

          <button
            type="button"
            disabled={teams.length >= 6}
            onClick={handleAddTeam}
            className="rounded-xl border-2 border-emerald-300 bg-emerald-50 px-3 py-2 text-sm font-black text-emerald-800 hover:bg-emerald-100 disabled:opacity-40"
          >
            ➕ إضافة فريق
          </button>

          <select
            value={timerSec}
            onChange={(e) => {
              const val = Number(e.target.value) as 0 | 15 | 30;
              setTimerSec(val);
              setTimeLeft(val);
            }}
            className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-800"
            aria-label="المؤقت"
          >
            <option value={0}>⏱️ بدون مؤقت</option>
            <option value={15}>⏱️ ١٥ ثانية للسؤال</option>
            <option value={30}>⏱️ ٣٠ ثانية للسؤال</option>
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSoundOn((v) => !v)}
            className="rounded-xl bg-white px-3 py-2 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-100"
          >
            {soundOn ? '🔊 الصوت' : '🔇 صامت'}
          </button>

          <button
            type="button"
            onClick={resetAllScores}
            className="rounded-xl bg-white px-3 py-2 text-sm font-bold text-rose-700 shadow-sm hover:bg-rose-50"
          >
            🔄 تصفير النقاط
          </button>

          <button
            type="button"
            onClick={() => setIsFullscreenBoard((v) => !v)}
            className="rounded-xl bg-turq-600 px-4 py-2 text-sm font-black text-white shadow transition hover:bg-turq-700"
          >
            {isFullscreenBoard ? '↙️ تصغير اللوحة' : '🖥️ ملء شاشة السبورة'}
          </button>
        </div>
      </div>

      {/* Team Name & Score Editor Drawer */}
      {editingTeams && (
        <div className="animate-fadeup rounded-2xl border-2 border-amber-300 bg-amber-50/70 p-4">
          <p className="mb-3 text-base font-black text-amber-950">
            ✏️ إدارة الفرق وتعديل الأسماء (من ٢ إلى ٦ فرق):
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {teams.map((team, idx) => (
              <div
                key={team.id}
                className="flex items-center gap-2 rounded-2xl border-2 border-white bg-white p-2.5 shadow-sm"
              >
                <span className="text-2xl">{team.emoji}</span>
                <input
                  type="text"
                  value={team.name}
                  maxLength={24}
                  onChange={(e) => handleRenameTeam(team.id, e.target.value)}
                  placeholder={`اسم الفريق ${idx + 1}`}
                  className="min-w-0 flex-1 rounded-xl border border-slate-200 px-2.5 py-1.5 text-sm font-black text-slate-900 focus:border-turq-400 focus:outline-none"
                />
                {teams.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveTeam(team.id)}
                    className="rounded-lg bg-rose-50 px-2 py-1 text-xs font-black text-rose-600 hover:bg-rose-100"
                    title="حذف الفريق"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Teams Scoreboard (Click any team to switch turn!) */}
      <div
        className={`grid gap-3 ${
          teams.length === 2
            ? 'grid-cols-2'
            : teams.length === 3
              ? 'grid-cols-3'
              : 'grid-cols-2 sm:grid-cols-4'
        }`}
      >
        {teams.map((team, idx) => {
          const isTurn = idx === activeTeamIdx && !showWinnerScreen;
          return (
            <div
              key={team.id}
              onClick={() => {
                setActiveTeamIdx(idx);
                playTone('click', soundOn);
              }}
              className={`cursor-pointer rounded-3xl border-4 p-3 sm:p-4 text-center transition-all ${
                isTurn
                  ? 'scale-[1.03] border-brand-orange bg-white shadow-xl ring-4 ring-brand-orange/25'
                  : 'border-slate-200 bg-white/90 hover:border-turq-300'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl sm:text-3xl">{team.emoji}</span>
                <p className="truncate text-lg font-black text-slate-900 sm:text-xl">
                  {team.name || `فريق ${idx + 1}`}
                </p>
              </div>
              <p className="mt-1 text-3xl font-black text-turq-700 sm:text-4xl">{team.score}</p>
              {isTurn && (
                <span className="mt-1 inline-block rounded-full bg-brand-orange px-3 py-0.5 text-xs font-black text-white">
                  الدور الحالي 🎯
                </span>
              )}
              <div
                className="mt-2 flex justify-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => adjustScore(team.id, 1)}
                  className="rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-black text-emerald-800 hover:bg-emerald-200"
                >
                  +١
                </button>
                <button
                  type="button"
                  onClick={() => adjustScore(team.id, -1)}
                  className="rounded-lg bg-rose-100 px-2.5 py-1 text-xs font-black text-rose-800 hover:bg-rose-200"
                >
                  -١
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Competition Stage OR Winner Podium */}
      {showWinnerScreen ? (
        <div className="animate-pop rounded-3xl border-4 border-amber-400 bg-gradient-to-br from-amber-50 via-white to-turq-50 p-8 text-center shadow-xl">
          <p className="text-5xl">🏆</p>
          <h3 className="mt-3 text-3xl font-black text-turq-900 sm:text-4xl">
            انتهت المسابقة! نتائج الفرق:
          </h3>

          <div className="mx-auto mt-6 max-w-xl space-y-3">
            {sortedByRank.map((t, idx) => (
              <div
                key={t.id}
                className={`flex items-center justify-between rounded-2xl border-2 p-4 ${
                  t.score === topScore && topScore > 0
                    ? 'border-amber-400 bg-amber-100/70 shadow-md'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black">
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}.`}
                  </span>
                  <span className="text-2xl">{t.emoji}</span>
                  <span className="text-xl font-black text-slate-900">{t.name}</span>
                </div>
                <span className="text-2xl font-black text-turq-800">{t.score} نقطة</span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => startNewRound(true)}
              className="rounded-2xl bg-turq-500 px-6 py-3 text-lg font-black text-white shadow hover:bg-turq-600"
            >
              🔀 جولة جديدة بأسئلة عشوائية
            </button>
            <button
              type="button"
              onClick={resetAllScores}
              className="rounded-2xl bg-brand-orange px-6 py-3 text-lg font-black text-white shadow hover:opacity-95"
            >
              🔄 إعادة من البداية وتصفير النقاط
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 rounded-3xl border-4 border-turq-300 bg-white p-5 shadow-xl sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-turq-100 px-4 py-1 text-sm font-black text-turq-900">
                {currentQ.category}
              </span>
              <span className="text-sm font-black text-slate-500">
                السؤال {qIdx + 1} من {questions.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {timerSec > 0 && (
                <span
                  className={`rounded-full px-4 py-1 text-base font-black ${
                    timeLeft <= 5
                      ? 'bg-rose-100 text-rose-700 animate-pulse'
                      : 'bg-sky-100 text-sky-900'
                  }`}
                >
                  ⏱️ {timeLeft} ثانية
                </span>
              )}
              <button
                type="button"
                onClick={() => {
                  setShowWinnerScreen(true);
                  setConfetti(true);
                  playTone('win', soundOn);
                }}
                className="rounded-xl bg-amber-100 px-3 py-1.5 text-xs font-black text-amber-900 hover:bg-amber-200"
              >
                🏁 إنهاء وإعلان الفائز
              </button>
            </div>
          </div>

          <div className="my-6 text-center">
            <p className="text-sm font-black text-orange-700 sm:text-base">
              الدور الآن على: {activeTeam.emoji} {activeTeam.name}
            </p>
            <h3 className="mt-2 text-2xl leading-relaxed font-black text-slate-900 sm:text-4xl">
              {currentQ.question}
            </h3>
          </div>

          <div className="grid gap-3 sm:gap-4">
            {currentQ.options.map((opt, idx) => {
              const isPicked = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;
              let cls =
                'border-slate-200 bg-slate-50 text-slate-900 hover:border-turq-400 hover:bg-turq-50';
              if (selectedOption !== null) {
                if (isCorrect) {
                  cls = 'border-brand-green bg-emerald-100 text-emerald-950 shadow-md';
                } else if (isPicked) {
                  cls = 'border-rose-500 bg-rose-100 text-rose-950 animate-wiggle';
                } else {
                  cls = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={opt}
                  type="button"
                  disabled={selectedOption !== null}
                  onClick={() => handleAnswer(idx)}
                  className={`touch-target flex items-center gap-4 rounded-2xl border-3 p-4 text-right text-lg font-black transition-all sm:p-5 sm:text-2xl ${cls}`}
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-lg font-black text-turq-900 shadow-sm">
                    {idx === 0 ? 'أ' : idx === 1 ? 'ب' : 'ج'}
                  </span>
                  <span className="flex-1">{opt}</span>
                </button>
              );
            })}
          </div>

          {selectedOption !== null && (
            <div className="animate-pop mt-5 flex flex-col items-center justify-between gap-3 rounded-2xl border-2 border-turq-200 bg-turq-50 p-4 sm:flex-row">
              <p className="text-base font-black text-turq-950 sm:text-lg">
                {selectedOption === currentQ.correctIndex
                  ? `🎉 أحسنت يا ${activeTeam.name}! (+١ نقطة) — `
                  : '💡 التوضيح: '}
                <span className="font-bold text-slate-700">{currentQ.explanation}</span>
              </p>
              <button
                type="button"
                onClick={nextQuestion}
                className="touch-target shrink-0 rounded-2xl bg-turq-600 px-6 py-3 text-lg font-black text-white shadow-lg transition hover:bg-turq-700"
              >
                {qIdx + 1 < questions.length ? 'السؤال التالي ⬅️' : 'عرض النتيجة النهائية 🏆'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
