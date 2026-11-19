import { useEffect, useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { ConfettiBurst, playTone } from './components/SoundConfetti';
import { TeacherDashboard } from './components/TeacherDashboard';
import {
  Station1Brainstorm,
  Station2Verse,
  Station3FajrDhuhr,
  Station4AsrMaghribIsha,
  Station5Activity1Calendar,
  Station6Qiblah,
} from './components/stations/StationsPart1';
import {
  Station10Detective,
  Station11FinalQuiz,
  Station12Champion,
  Station7Niyyah,
  Station8NineConditions,
  Station9Activity3Times,
} from './components/stations/StationsPart2';
import { STATIONS } from './data/lessonData';
import { ClassSection, StudentRecord } from './types';

const ACTIVE_KEY = 'shrotsalsh2_active_student';
const RECORDS_KEY = 'shrotsalsh2_teacher_records';

export function App() {
  const [activeStudent, setActiveStudent] = useState<StudentRecord | null>(() => {
    try {
      const raw = localStorage.getItem(ACTIVE_KEY);
      return raw ? (JSON.parse(raw) as StudentRecord) : null;
    } catch {
      return null;
    }
  });

  const [teacherRecords, setTeacherRecords] = useState<StudentRecord[]>(() => {
    try {
      const raw = localStorage.getItem(RECORDS_KEY);
      return raw ? (JSON.parse(raw) as StudentRecord[]) : [];
    } catch {
      return [];
    }
  });

  const [inLesson, setInLesson] = useState(false);
  const [showTeacher, setShowTeacher] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [confetti, setConfetti] = useState(false);
  const [smartboardMode, setSmartboardMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('shrotsalsh2_smartboard_mode') === '1';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('smartboard-mode', smartboardMode);
    localStorage.setItem('shrotsalsh2_smartboard_mode', smartboardMode ? '1' : '0');
  }, [smartboardMode]);

  const toggleSmartboard = () => {
    setSmartboardMode((v) => !v);
    playSfx('click');
  };

  const playSfx = (type: 'success' | 'error' | 'click' | 'win') => {
    playTone(type, soundEnabled);
  };

  useEffect(() => {
    if (activeStudent) {
      localStorage.setItem(ACTIVE_KEY, JSON.stringify(activeStudent));
      setTeacherRecords((prev) => {
        const idx = prev.findIndex((r) => r.id === activeStudent.id);
        const next =
          idx >= 0
            ? prev.map((r, i) => (i === idx ? activeStudent : r))
            : [activeStudent, ...prev];
        localStorage.setItem(RECORDS_KEY, JSON.stringify(next));
        return next;
      });
    }
  }, [activeStudent]);

  const handleStartNew = (name: string, section: ClassSection) => {
    const now = new Date().toISOString();
    const newStudent: StudentRecord = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name,
      section,
      currentStation: 1,
      completedStations: [],
      stationScores: {},
      totalStars: 0,
      startedAt: now,
      updatedAt: now,
    };
    setActiveStudent(newStudent);
    setInLesson(true);
    playSfx('success');
  };

  const handleResume = () => {
    if (activeStudent) {
      setInLesson(true);
      playSfx('click');
    }
  };

  const handleStationComplete = (stationId: number, stars: number) => {
    if (!activeStudent) return;
    playSfx(stationId === 12 ? 'win' : 'success');
    setConfetti(true);
    setTimeout(() => setConfetti(false), 2400);

    setActiveStudent((prev) => {
      if (!prev) return prev;
      const completed = prev.completedStations.includes(stationId)
        ? prev.completedStations
        : [...prev.completedStations, stationId];
      const nextScores = {
        ...prev.stationScores,
        [stationId]: Math.max(prev.stationScores[stationId] || 0, stars),
      };
      const totalStars = Object.values(nextScores).reduce((a, b) => a + b, 0);
      const nextStation = stationId < 12 ? stationId + 1 : 12;

      return {
        ...prev,
        completedStations: completed,
        stationScores: nextScores,
        totalStars,
        currentStation: nextStation,
        updatedAt: new Date().toISOString(),
      };
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToStation = (id: number) => {
    if (!activeStudent) return;
    const highestUnlocked = Math.min(12, activeStudent.completedStations.length + 1);
    if (id <= highestUnlocked) {
      setActiveStudent({ ...activeStudent, currentStation: id });
      playSfx('click');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleClearRecords = () => {
    localStorage.removeItem(RECORDS_KEY);
    localStorage.removeItem(ACTIVE_KEY);
    setTeacherRecords([]);
    setActiveStudent(null);
    setInLesson(false);
  };

  const handleUpdateRecord = (id: string, name: string, section: ClassSection) => {
    const now = new Date().toISOString();
    setTeacherRecords((prev) => {
      const next = prev.map((r) => (r.id === id ? { ...r, name, section, updatedAt: now } : r));
      localStorage.setItem(RECORDS_KEY, JSON.stringify(next));
      return next;
    });
    setActiveStudent((prev) =>
      prev && prev.id === id ? { ...prev, name, section, updatedAt: now } : prev
    );
  };

  const renderStationContent = () => {
    if (!activeStudent) return null;
    const sid = activeStudent.currentStation;
    const props = {
      soundEnabled,
      playSfx,
      onComplete: (stars: number) => handleStationComplete(sid, stars),
    };

    switch (sid) {
      case 1:
        return <Station1Brainstorm {...props} />;
      case 2:
        return <Station2Verse {...props} />;
      case 3:
        return <Station3FajrDhuhr {...props} />;
      case 4:
        return <Station4AsrMaghribIsha {...props} />;
      case 5:
        return <Station5Activity1Calendar {...props} />;
      case 6:
        return <Station6Qiblah {...props} />;
      case 7:
        return <Station7Niyyah {...props} />;
      case 8:
        return <Station8NineConditions {...props} />;
      case 9:
        return <Station9Activity3Times {...props} />;
      case 10:
        return <Station10Detective {...props} />;
      case 11:
        return <Station11FinalQuiz {...props} />;
      case 12:
        return (
          <Station12Champion
            {...props}
            student={activeStudent}
            alreadyFinished={activeStudent.completedStations.includes(12)}
          />
        );
      default:
        return <Station1Brainstorm {...props} />;
    }
  };

  if (!inLesson || !activeStudent) {
    return (
      <>
        <div className={showTeacher ? 'no-print' : ''}>
          <LandingPage
            existingStudent={activeStudent}
            smartboardMode={smartboardMode}
            onToggleSmartboard={toggleSmartboard}
            onStart={handleStartNew}
            onResume={handleResume}
            onOpenTeacher={() => setShowTeacher(true)}
          />
        </div>
        {showTeacher && (
          <TeacherDashboard
            records={teacherRecords}
            onClose={() => setShowTeacher(false)}
            onClearRecords={handleClearRecords}
            onUpdateRecord={handleUpdateRecord}
          />
        )}
      </>
    );
  }

  const currentMeta = STATIONS.find((s) => s.id === activeStudent.currentStation) || STATIONS[0];
  const progressPct = Math.round((activeStudent.completedStations.length / 12) * 100);
  const highestUnlocked = Math.min(12, activeStudent.completedStations.length + 1);

  return (
    <>
      <div className={`pattern-bg min-h-screen pb-16 ${showTeacher ? 'no-print' : ''}`}>
      <ConfettiBurst active={confetti} />

      {/* Top Sticky Lesson Header */}
      <header className="no-print sticky top-0 z-30 border-b border-turq-200 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="mx-auto max-w-5xl px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setInLesson(false)}
                className="rounded-xl bg-turq-50 px-3 py-2 text-sm font-black text-turq-800 transition hover:bg-turq-100"
              >
                🏠 الرئيسية
              </button>
              <div className="hidden sm:block">
                <p className="text-xs font-bold text-slate-500">شروط الصلاة (٢) • {activeStudent.section}</p>
                <p className="text-sm font-black text-turq-900">{activeStudent.name}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-xl bg-amber-100 px-3 py-1.5 text-sm font-black text-amber-800">
                {activeStudent.totalStars} ⭐
              </span>
              <button
                type="button"
                onClick={toggleSmartboard}
                className={`rounded-xl px-3 py-1.5 text-xs font-black transition ${
                  smartboardMode
                    ? 'bg-brand-orange text-white shadow'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                title="تكبير الخط والوضوح على السبورة الذكية"
              >
                🖥️ {smartboardMode ? 'وضع السبورة ✓' : 'وضع السبورة'}
              </button>
              <button
                type="button"
                onClick={() => setSoundEnabled((v) => !v)}
                className="rounded-xl bg-slate-100 px-3 py-1.5 text-sm font-bold text-slate-700 hover:bg-slate-200"
                title={soundEnabled ? 'كتم الصوت' : 'تفعيل الصوت'}
              >
                {soundEnabled ? '🔊' : '🔇'}
              </button>
              <button
                type="button"
                onClick={() => setShowTeacher(true)}
                className="rounded-xl bg-turq-50 px-3 py-1.5 text-xs font-black text-turq-800 hover:bg-turq-100"
              >
                👨‍🏫 المعلم
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 flex items-center gap-3">
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-turq-100">
              <div
                className="h-full rounded-full bg-gradient-to-l from-turq-500 to-brand-blue transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="text-xs font-black text-turq-900">
              {activeStudent.completedStations.length} / 12 محطة
            </span>
          </div>

          {/* 12 Station Stepper */}
          <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
            {STATIONS.map((st) => {
              const isCurrent = st.id === activeStudent.currentStation;
              const isCompleted = activeStudent.completedStations.includes(st.id);
              const unlocked = st.id <= highestUnlocked;
              return (
                <button
                  key={st.id}
                  type="button"
                  disabled={!unlocked}
                  onClick={() => goToStation(st.id)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-black transition ${
                    isCurrent
                      ? 'border-turq-600 bg-turq-500 text-white shadow'
                      : isCompleted
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                        : unlocked
                          ? 'border-turq-200 bg-white text-turq-800 hover:bg-turq-50'
                          : 'cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400 opacity-60'
                  }`}
                >
                  <span>{isCompleted && !isCurrent ? '✅' : st.emoji}</span>
                  <span>{st.id}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Station Workspace */}
        <main className={`mx-auto px-4 pt-6 ${smartboardMode ? 'max-w-6xl' : 'max-w-5xl'}`}>
          <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-white p-5 shadow-md shadow-turq-900/5">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-turq-100 text-3xl">
                {currentMeta.emoji}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-brand-orange/15 px-3 py-0.5 text-xs font-black text-orange-700">
                    المحطة {currentMeta.id} من ١٢
                  </span>
                  {currentMeta.pageRef && (
                    <span className="rounded-full bg-turq-50 px-3 py-0.5 text-xs font-bold text-turq-800">
                      {currentMeta.pageRef}
                    </span>
                  )}
                </div>
                <h1 className="mt-1 text-2xl font-black text-turq-900 sm:text-3xl">
                  {currentMeta.title}
                </h1>
                <p className="text-sm font-bold text-slate-500">{currentMeta.subtitle}</p>
              </div>
            </div>

            {activeStudent.currentStation > 1 && (
              <button
                type="button"
                onClick={() => goToStation(activeStudent.currentStation - 1)}
                className="rounded-2xl border-2 border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50"
              >
                ➡️ المحطة السابقة
              </button>
            )}
          </div>

          {renderStationContent()}
        </main>
      </div>

      {showTeacher && (
        <TeacherDashboard
          records={teacherRecords}
          onClose={() => setShowTeacher(false)}
          onClearRecords={handleClearRecords}
          onUpdateRecord={handleUpdateRecord}
        />
      )}
    </>
  );
}

export default App;
