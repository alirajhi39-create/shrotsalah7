import React, { useState } from 'react';
import { HERO_BADGES, STATIONS } from '../data/lessonData';
import { ClassSection, StudentRecord } from '../types';

interface LandingPageProps {
  existingStudent: StudentRecord | null;
  onStart: (name: string, section: ClassSection) => void;
  onResume: () => void;
  onOpenTeacher: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  existingStudent,
  onStart,
  onResume,
  onOpenTeacher,
}) => {
  const [name, setName] = useState(existingStudent?.name || '');
  const [section, setSection] = useState<ClassSection>(existingStudent?.section || 'الثالث (أ)');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setError('فضلاً اكتب اسمك الكريم للبدء في الرحلة.');
      return;
    }
    setError('');
    onStart(trimmed, section);
  };

  return (
    <main className="pattern-bg min-h-screen">
      {/* Header matching reference */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-turq-500 to-brand-blue text-2xl text-white shadow">
            🕌
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500">العروس الابتدائية</p>
            <p className="font-black text-turq-900">الدراسات الإسلامية – الفقه</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onOpenTeacher}
          className="rounded-2xl bg-white px-4 py-2 text-sm font-bold text-turq-700 shadow transition hover:bg-turq-50"
        >
          👨‍🏫 دخول المعلم
        </button>
      </header>

      {/* Hero section matching reference 2-column layout */}
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-6 lg:grid-cols-2">
        <div className="animate-fadeup">
          <span className="inline-block rounded-full bg-brand-orange/15 px-4 py-1 text-sm font-black text-orange-700">
            الدرس 8 • الصف الثالث الابتدائي • ص 66–70
          </span>
          <h1 className="mt-4 text-4xl font-black leading-tight text-turq-900 md:text-6xl">
            شروط الصلاة (2)
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-700">
            رحلة تعليمية تفاعلية من <b>12 محطة</b>: استنتج، جرّب، العب، وأجب… ثم احصل على شهادة
            «بطل شروط الصلاة»!
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {HERO_BADGES.map((b) => (
              <span
                key={b.label}
                className="rounded-2xl bg-white px-3 py-2 text-sm font-bold text-turq-800 shadow-sm"
              >
                {b.emoji} {b.label}
              </span>
            ))}
          </div>

          <div className="relative mx-auto mt-6 h-64 w-64 animate-float overflow-hidden rounded-3xl lg:h-80 lg:w-80">
            <img
              src="/images/hero-student.png"
              alt="طالب يستعد للصلاة مع البوصلة ومواقيت الصلاة"
              className="h-full w-full object-contain drop-shadow-2xl"
              draggable={false}
            />
          </div>
          <p className="text-center text-sm text-slate-500 lg:text-right">
            المعلم: علي عبدالله راجحي — العروس الابتدائية
          </p>
        </div>

        {/* Sticky login / start card matching reference */}
        <div className="animate-fadeup lg:sticky lg:top-6">
          <div className="rounded-3xl bg-white p-6 shadow-2xl shadow-turq-900/10">
            {existingStudent && (
              <div className="mb-4 rounded-2xl border-2 border-turq-200 bg-turq-50 p-4">
                <p className="text-sm font-bold text-turq-800">
                  أهلاً بعودتك يا <span className="font-black">{existingStudent.name}</span>! 👋
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-600">
                  أكملت {existingStudent.completedStations.length} من 12 محطة • رصيدك{' '}
                  {existingStudent.totalStars} نجمة ⭐
                </p>
                <button
                  type="button"
                  onClick={onResume}
                  className="touch-target mt-3 w-full rounded-2xl bg-brand-green px-5 py-3 text-base font-black text-white shadow transition hover:opacity-95 active:scale-95"
                >
                  متابعة رحلتي من المحطة {existingStudent.currentStation} ▶️
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-black text-turq-900">
                {existingStudent ? 'أو ابدأ رحلة جديدة' : 'ابدأ رحلتك التعليمية'}
              </h2>

              <label className="block">
                <span className="mb-1 block font-bold text-slate-700">اسم الطالب</span>
                <input
                  required
                  minLength={2}
                  maxLength={40}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="اكتب اسمك الثلاثي"
                  className="w-full rounded-2xl border-2 border-slate-200 p-4 text-lg transition focus:border-turq-400 focus:outline-none"
                />
              </label>

              {error && <p className="text-sm font-bold text-rose-600">{error}</p>}

              <div>
                <span className="mb-1 block font-bold text-slate-700">الفصل</span>
                <div className="grid grid-cols-2 gap-2">
                  {(['الثالث (أ)', 'الثالث (ب)'] as ClassSection[]).map((sec) => {
                    const active = section === sec;
                    return (
                      <button
                        key={sec}
                        type="button"
                        onClick={() => setSection(sec)}
                        className={`touch-target rounded-2xl border-2 p-3 text-lg font-bold transition-all ${
                          active
                            ? 'border-turq-500 bg-turq-500 text-white shadow'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-turq-300'
                        }`}
                      >
                        🏫 {sec}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="submit"
                  className="touch-target inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-turq-500 px-8 py-4 text-xl font-bold text-white shadow-lg shadow-turq-500/30 transition-all hover:bg-turq-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-turq-300 active:scale-95"
                >
                  بدء الدرس 🚀
                </button>
              </div>
            </form>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-bold text-slate-600">
            <div className="rounded-2xl bg-white/80 p-3 shadow-sm">
              📱 يعمل على الجوال والأجهزة اللوحية
            </div>
            <div className="rounded-2xl bg-white/80 p-3 shadow-sm">
              🖥️ مناسب للسبورة الذكية
            </div>
            <div className="rounded-2xl bg-white/80 p-3 shadow-sm">
              💾 يحفظ تقدمك تلقائيًا
            </div>
          </div>
        </div>
      </section>

      {/* 12 Stations Grid matching reference */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-4">
        <h2 className="mb-4 text-2xl font-black text-turq-900">محطات الرحلة</h2>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {STATIONS.map((st) => (
            <div
              key={st.id}
              className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-turq-100 text-xl">
                {st.emoji}
              </span>
              <div>
                <p className="text-sm font-black text-turq-900">
                  {st.id}. {st.title}
                </p>
                <p className="text-xs text-slate-500">{st.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
