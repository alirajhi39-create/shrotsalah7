import React, { useState } from 'react';
import { CITY_CALENDAR } from '../../data/lessonData';
import { InteractiveShadowSimulator, PrayerSceneSvg } from '../PrayerVisuals';

interface StationProps {
  onComplete: (stars: number) => void;
  soundEnabled: boolean;
  playSfx: (type: 'success' | 'error' | 'click' | 'win') => void;
}

/* =========================================================
   STATION 1: Brainstorming & Expectation Questions
   ========================================================= */
export const Station1Brainstorm: React.FC<StationProps> = ({ onComplete, playSfx }) => {
  const questions = [
    {
      id: 1,
      q: 'هل تصح صلاة الظهر لو صلاها خالد الساعة ٩ صباحًا قبل دخول وقتها؟',
      options: ['نعم، تصح في أي وقت', 'لا، لا تصح قبل دخول وقتها'],
      correct: 1,
      feedback: 'أحسنت! لكل صلاة وقت محدد لا تصح الصلاة قبله.',
    },
    {
      id: 2,
      q: 'هل يجوز للمسلم أن يصلي متجهًا إلى أي جهة يريدها دون استقبال الكعبة؟',
      options: ['لا، يجب استقبال القبلة (الكعبة المشرفة)', 'نعم، أي جهة تكفي'],
      correct: 0,
      feedback: 'ممتاز! استقبال القبلة شرط أساسي لصحة الصلاة.',
    },
    {
      id: 3,
      q: 'عندما يقف المسلم للصلاة، هل ينطق بالنية بصوت عالٍ أم محلها القلب؟',
      options: ['ينطق بها بصوت مسموع', 'النية محلها القلب ولا ينطق بها'],
      correct: 1,
      feedback: 'رائع! لا تنطق بالنية، فالنية محلها القلب.',
    },
  ];

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const allAnswered = Object.keys(answers).length === questions.length;
  const correctCount = questions.filter((q) => answers[q.id] === q.correct).length;

  const choose = (qId: number, idx: number, correctIdx: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: idx }));
    playSfx(idx === correctIdx ? 'success' : 'error');
  };

  return (
    <div className="space-y-6 animate-fadeup">
      <div className="rounded-3xl border-2 border-turq-200 bg-gradient-to-l from-turq-50 to-white p-5">
        <p className="text-sm font-black text-turq-700">تذكّر من الدرس السابق (شروط الصلاة ١):</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {['١. الإسلام', '٢. العقل', '٣. التمييز', '٤. الطهارة', '٥. إزالة النجاسة', '٦. ستر العورة'].map((item) => (
            <span
              key={item}
              className="rounded-2xl border border-turq-200 bg-white px-3 py-1.5 text-sm font-bold text-turq-900 shadow-sm"
            >
              ✅ {item}
            </span>
          ))}
        </div>
        <p className="mt-3 text-base font-bold text-slate-700">
          واليوم سنكتشف معًا <span className="text-brand-orange font-black">الشروط الثلاثة المتبقية</span> لتكتمل شروط الصلاة التسعة!
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-black text-turq-900">🤔 فكّر وتوقّع قبل أن نبدأ:</h3>
        {questions.map((item) => {
          const picked = answers[item.id];
          const isAnswered = picked !== undefined;
          const isCorrect = picked === item.correct;
          return (
            <div key={item.id} className="rounded-3xl border-2 border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-base font-black text-slate-800 sm:text-lg">
                {item.id}. {item.q}
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {item.options.map((opt, idx) => {
                  const selected = picked === idx;
                  let cls = 'border-slate-200 bg-slate-50 text-slate-700 hover:border-turq-300';
                  if (selected) {
                    cls =
                      idx === item.correct
                        ? 'border-brand-green bg-emerald-50 text-emerald-900'
                        : 'border-rose-400 bg-rose-50 text-rose-900 animate-wiggle';
                  }
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => choose(item.id, idx, item.correct)}
                      className={`touch-target rounded-2xl border-2 p-3.5 text-right text-sm font-bold transition-all sm:text-base ${cls}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {isAnswered && (
                <p
                  className={`mt-3 rounded-xl px-3 py-2 text-sm font-bold ${
                    isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
                  }`}
                >
                  {isCorrect ? `🌟 ${item.feedback}` : '💡 جرّب الإجابة الأخرى لتتأكد من التوقع الصحيح!'}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          disabled={!allAnswered}
          onClick={() => onComplete(Math.max(1, correctCount))}
          className="touch-target rounded-2xl bg-turq-500 px-8 py-4 text-lg font-black text-white shadow-lg shadow-turq-500/30 transition hover:bg-turq-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          انطلق إلى المحطة التالية ⬅️
        </button>
      </div>
    </div>
  );
};

/* =========================================================
   STATION 2: Quranic Verse Reflection (Condition 7)
   ========================================================= */
export const Station2Verse: React.FC<StationProps> = ({ onComplete, playSfx }) => {
  const [revealedMeaning, setRevealedMeaning] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);

  const options = ['دخول الوقت', 'الجلوس بين السجدتين', 'قراءة دعاء الاستفتاح'];
  const correctIdx = 0;

  const handlePick = (idx: number) => {
    setPicked(idx);
    playSfx(idx === correctIdx ? 'success' : 'error');
  };

  return (
    <div className="space-y-6 animate-fadeup">
      <div className="rounded-3xl border-2 border-turq-300 bg-gradient-to-br from-turq-50 via-white to-amber-50/40 p-6 text-center shadow-md">
        <span className="inline-block rounded-full bg-turq-100 px-4 py-1 text-xs font-black text-turq-800">
          صفحة ٦٦ من الكتاب المدرسي
        </span>
        <p className="mt-4 text-base font-bold text-slate-600">قَالَ اللهُ تَعَالَى:</p>
        <p className="font-quran mt-3 text-3xl leading-loose font-bold text-turq-900 sm:text-4xl">
          ﴿ إِنَّ الصَّلَوٰةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَٰبًا مَّوْقُوتًا ﴾
        </p>
        <p className="mt-2 text-xs font-bold text-slate-500">سورة النساء – الآية (١٠٣)</p>

        <div className="mt-5">
          <button
            type="button"
            onClick={() => {
              setRevealedMeaning(true);
              playSfx('click');
            }}
            className="rounded-2xl border-2 border-brand-orange/40 bg-orange-50 px-5 py-2.5 text-sm font-black text-orange-800 transition hover:bg-orange-100"
          >
            🔍 اضغط لمعرفة معنى كلمة: «مَوْقُوتًا»
          </button>

          {revealedMeaning && (
            <div className="animate-pop mx-auto mt-3 max-w-xl rounded-2xl border-2 border-amber-300 bg-amber-50 p-4 text-right">
              <p className="text-sm font-black text-amber-900">
                💡 معنى <span className="underline">مَوْقُوتًا</span>:
              </p>
              <p className="mt-1 text-base font-bold text-slate-800">
                مؤقتًا بوقتٍ محدد لا يجوز تقديمها عليه ولا تأخيرها عنه.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-3xl border-2 border-slate-100 bg-white p-6 shadow-sm">
        <p className="text-lg font-black text-turq-900">
          يتّضح من هذه الآية الكريمة الشرط السابع من شروط الصلاة الذي لا تصح الصلاة إلا به، ما هو؟
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {options.map((opt, idx) => {
            const isSelected = picked === idx;
            let cls = 'border-slate-200 bg-slate-50 hover:border-turq-300';
            if (isSelected) {
              cls =
                idx === correctIdx
                  ? 'border-brand-green bg-emerald-50 text-emerald-900 shadow-md'
                  : 'border-rose-400 bg-rose-50 text-rose-900 animate-wiggle';
            }
            return (
              <button
                key={opt}
                type="button"
                onClick={() => handlePick(idx)}
                className={`touch-target rounded-2xl border-2 p-4 text-base font-black transition-all ${cls}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {picked === correctIdx && (
          <div className="animate-pop mt-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-4">
            <p className="text-lg font-black text-emerald-900">
              ✅ الشرطُ السَّابِعُ: <span className="text-orange-700">دخولُ الوقت.</span>
            </p>
            <p className="mt-1 text-sm font-bold text-emerald-800">
              بارك الله فيك! والآن لنتعرف معًا على مواقيت الصلوات الخمس من بدايتها إلى نهايتها.
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          disabled={picked !== correctIdx}
          onClick={() => onComplete(3)}
          className="touch-target rounded-2xl bg-turq-500 px-8 py-4 text-lg font-black text-white shadow-lg shadow-turq-500/30 transition hover:bg-turq-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          تعلّم أوقات الفجر والظهر ⬅️
        </button>
      </div>
    </div>
  );
};

/* =========================================================
   STATION 3: Fajr & Dhuhr Times + Interactive Shadow Sim
   ========================================================= */
export const Station3FajrDhuhr: React.FC<StationProps> = ({ onComplete, playSfx }) => {
  const [answer, setAnswer] = useState<number | null>(null);

  return (
    <div className="space-y-6 animate-fadeup">
      {/* Fajr Card matching textbook p.66 */}
      <div className="overflow-hidden rounded-3xl border-2 border-turq-300 bg-white shadow-md">
        <div className="flex flex-col md:flex-row">
          <div className="flex items-center justify-center bg-turq-500 p-4 text-center text-white md:w-36">
            <p className="text-xl font-black leading-snug">وَقْتُ صَلَاةِ الفَجْرِ</p>
          </div>
          <div className="grid flex-1 gap-4 p-4 sm:grid-cols-2">
            <div className="rounded-2xl border-2 border-turq-200 bg-turq-50/40 p-3 text-center">
              <p className="mb-2 text-base font-black text-turq-900">مِنْ طُلُوعِ الفَجْرِ الثَّانِي</p>
              <PrayerSceneSvg scene="fajr-start" />
            </div>
            <div className="rounded-2xl border-2 border-turq-200 bg-turq-50/40 p-3 text-center">
              <p className="mb-2 text-base font-black text-turq-900">إِلَى طُلُوعِ الشَّمْسِ</p>
              <PrayerSceneSvg scene="sunrise" />
            </div>
          </div>
        </div>
      </div>

      {/* Dhuhr Card matching textbook p.66 */}
      <div className="overflow-hidden rounded-3xl border-2 border-turq-300 bg-white shadow-md">
        <div className="flex flex-col md:flex-row">
          <div className="flex items-center justify-center bg-turq-500 p-4 text-center text-white md:w-36">
            <p className="text-xl font-black leading-snug">وَقْتُ صَلَاةِ الظُّهْرِ</p>
          </div>
          <div className="grid flex-1 gap-4 p-4 sm:grid-cols-2">
            <div className="rounded-2xl border-2 border-turq-200 bg-turq-50/40 p-3 text-center">
              <p className="mb-2 text-base font-black text-turq-900">مِنْ زَوَالِ الشَّمْسِ</p>
              <PrayerSceneSvg scene="zawal" />
            </div>
            <div className="rounded-2xl border-2 border-turq-200 bg-turq-50/40 p-3 text-center">
              <p className="mb-2 text-base font-black text-turq-900">إِلَى أَنْ يَصِيرَ ظِلُّ كُلِّ شَيْءٍ مِثْلَهُ</p>
              <PrayerSceneSvg scene="equal-shadow" />
            </div>
          </div>
        </div>
        <div className="border-t border-turq-100 bg-amber-50/70 px-5 py-3 text-sm font-bold text-amber-950">
          💡 <b>معنى زوال الشمس:</b> الوقت الذي تكون فيه الشمس في كبد السماء ثم تميل من جهة الشرق إلى الغرب.
        </div>
      </div>

      {/* Interactive Simulator */}
      <InteractiveShadowSimulator />

      {/* Quick Verification */}
      <div className="rounded-3xl border-2 border-slate-100 bg-white p-5 shadow-sm">
        <p className="text-base font-black text-turq-900">✅ تحقّق سريع: متى ينتهي وقت صلاة الفجر؟</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {['عند زوال الشمس', 'عند طلوع الشمس', 'عند غروب الشمس'].map((opt, idx) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                setAnswer(idx);
                playSfx(idx === 1 ? 'success' : 'error');
              }}
              className={`touch-target rounded-2xl border-2 p-3 font-bold transition ${
                answer === idx
                  ? idx === 1
                    ? 'border-brand-green bg-emerald-50 text-emerald-900'
                    : 'border-rose-400 bg-rose-50 text-rose-900 animate-wiggle'
                  : 'border-slate-200 bg-slate-50 hover:border-turq-300'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          disabled={answer !== 1}
          onClick={() => onComplete(3)}
          className="touch-target rounded-2xl bg-turq-500 px-8 py-4 text-lg font-black text-white shadow-lg shadow-turq-500/30 transition hover:bg-turq-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          متابعة: العصر والمغرب والعشاء ⬅️
        </button>
      </div>
    </div>
  );
};

/* =========================================================
   STATION 4: Asr, Maghrib, and Isha Times (Page 67)
   ========================================================= */
export const Station4AsrMaghribIsha: React.FC<StationProps> = ({ onComplete, playSfx }) => {
  const [selectedPrayer, setSelectedPrayer] = useState<'asr' | 'maghrib' | 'isha'>('asr');
  const [quizAns, setQuizAns] = useState<number | null>(null);

  const info = {
    asr: {
      label: 'وَقْتُ صَلَاةِ العَصْرِ',
      startText: 'مِنْ خُرُوجِ وَقْتِ الظُّهْرِ',
      endText: 'إِلَى اصْفِرَارِ الشَّمْسِ',
      startScene: 'equal-shadow' as const,
      endScene: 'asr-end' as const,
      footnote: '📌 يُحسب الظل بعد فيء الزوال، والمراد بفيء الزوال: الظل الباقي عند زوال الشمس.',
    },
    maghrib: {
      label: 'وَقْتُ صَلَاةِ المَغْرِبِ',
      startText: 'مِنْ غُرُوبِ الشَّمْسِ',
      endText: 'إِلَى أَنْ يَغِيبَ الشَّفَقُ الأَحْمَرُ',
      startScene: 'maghrib-start' as const,
      endScene: 'shafaq-red' as const,
      footnote: '📌 الشفق الأحمر: هو الضوء الأحمر الذي يظهر في جهة الغرب بعد غروب الشمس.',
    },
    isha: {
      label: 'وَقْتُ صَلَاةِ العِشَاءِ',
      startText: 'مِنْ مَغِيبِ الشَّفَقِ الأَحْمَرِ',
      endText: 'إِلَى نِصْفِ اللَّيْلِ',
      startScene: 'shafaq-red' as const,
      endScene: 'midnight' as const,
      footnote:
        '📌 يتم حساب نصف الليل بحساب الوقت من حين الغروب إلى طلوع الفجر الثاني، ثم يضاف نصف هذا الوقت إلى وقت المغرب، والحاصل هو نصف الليل، وليس نصف الليل هو الساعة الثانية عشرة ليلاً.',
    },
  }[selectedPrayer];

  return (
    <div className="space-y-6 animate-fadeup">
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'asr' as const, label: '☀️ صلاة العصر' },
          { key: 'maghrib' as const, label: '🌇 صلاة المغرب' },
          { key: 'isha' as const, label: '🌙 صلاة العشاء' },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => {
              setSelectedPrayer(tab.key);
              playSfx('click');
            }}
            className={`touch-target flex-1 rounded-2xl border-2 px-4 py-3 text-base font-black transition-all ${
              selectedPrayer === tab.key
                ? 'border-turq-500 bg-turq-500 text-white shadow-md'
                : 'border-slate-200 bg-white text-turq-900 hover:border-turq-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Selected Prayer Card */}
      <div className="overflow-hidden rounded-3xl border-2 border-turq-300 bg-white shadow-md">
        <div className="flex flex-col md:flex-row">
          <div className="flex items-center justify-center bg-turq-500 p-4 text-center text-white md:w-36">
            <p className="text-xl font-black leading-snug">{info.label}</p>
          </div>
          <div className="grid flex-1 gap-4 p-4 sm:grid-cols-2">
            <div className="rounded-2xl border-2 border-turq-200 bg-turq-50/40 p-3 text-center">
              <p className="mb-2 text-base font-black text-turq-900">{info.startText}</p>
              <PrayerSceneSvg scene={info.startScene} />
            </div>
            <div className="rounded-2xl border-2 border-turq-200 bg-turq-50/40 p-3 text-center">
              <p className="mb-2 text-base font-black text-turq-900">{info.endText}</p>
              <PrayerSceneSvg scene={info.endScene} />
            </div>
          </div>
        </div>
        <div className="border-t border-turq-100 bg-amber-50/70 px-5 py-3 text-sm font-bold text-amber-950">
          {info.footnote}
        </div>
      </div>

      {/* Quick question */}
      <div className="rounded-3xl border-2 border-slate-100 bg-white p-5 shadow-sm">
        <p className="text-base font-black text-turq-900">
          🎯 تحقّق من فهمك: هل نهاية وقت صلاة العشاء (نصف الليل) تعني دائمًا الساعة ١٢:٠٠ ليلاً؟
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {[
            'نعم، دائمًا الساعة ١٢ ليلاً',
            'لا، بل يُحسب نصف الوقت بين غروب الشمس وطلوع الفجر الثاني',
          ].map((opt, idx) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                setQuizAns(idx);
                playSfx(idx === 1 ? 'success' : 'error');
              }}
              className={`touch-target rounded-2xl border-2 p-3.5 text-right text-sm font-bold transition sm:text-base ${
                quizAns === idx
                  ? idx === 1
                    ? 'border-brand-green bg-emerald-50 text-emerald-900'
                    : 'border-rose-400 bg-rose-50 text-rose-900 animate-wiggle'
                  : 'border-slate-200 bg-slate-50 hover:border-turq-300'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          disabled={quizAns !== 1}
          onClick={() => onComplete(3)}
          className="touch-target rounded-2xl bg-turq-500 px-8 py-4 text-lg font-black text-white shadow-lg shadow-turq-500/30 transition hover:bg-turq-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          تطبيق عملي: نشاط (١) التقويم ⬅️
        </button>
      </div>
    </div>
  );
};

/* =========================================================
   STATION 5: Textbook Activity 1 (Page 68 Calendar)
   ========================================================= */
export const Station5Activity1Calendar: React.FC<StationProps> = ({ onComplete, playSfx }) => {
  const [cityIdx, setCityIdx] = useState(2); // Riyadh default
  const [pickedStart, setPickedStart] = useState<string | null>(null);
  const [pickedEnd, setPickedEnd] = useState<string | null>(null);

  const city = CITY_CALENDAR[cityIdx];

  // Build plausible distractors for start and end
  const startOptions = [city.maghrib, city.isha, city.asr];
  const endOptions = [city.midnight, '12:00 م', city.fajr];

  const handleCityChange = (idx: number) => {
    setCityIdx(idx);
    setPickedStart(null);
    setPickedEnd(null);
    playSfx('click');
  };

  const bothCorrect = pickedStart === city.isha && pickedEnd === city.midnight;

  return (
    <div className="space-y-6 animate-fadeup">
      <div className="rounded-3xl border-2 border-turq-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-full bg-turq-500 px-4 py-1 text-sm font-black text-white">
            📘 نشاط (١) — صفحة ٦٨
          </span>
          <span className="text-xs font-bold text-slate-500">اختر منطقتك من التقويم</span>
        </div>
        <p className="mt-3 text-lg font-black text-turq-900">
          أُحدِّدُ بدايةَ وقتِ صلاةِ العشاءِ في منطقتي ووقتَ نهايتِهِ مِنْ خلالِ التَّوقيتِ الظَّاهِرِ في التَّقويمِ:
        </p>

        {/* City selector */}
        <div className="mt-4 flex flex-wrap gap-2">
          {CITY_CALENDAR.map((c, idx) => (
            <button
              key={c.city}
              type="button"
              onClick={() => handleCityChange(idx)}
              className={`rounded-xl border-2 px-3 py-1.5 text-sm font-bold transition ${
                idx === cityIdx
                  ? 'border-turq-500 bg-turq-500 text-white shadow'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-turq-300'
              }`}
            >
              📍 {c.city}
            </button>
          ))}
        </div>

        {/* Mini authentic calendar table */}
        <div className="mt-4 overflow-x-auto rounded-2xl border-2 border-amber-300 bg-amber-50/40">
          <table className="w-full text-center text-xs sm:text-sm">
            <thead>
              <tr className="bg-amber-200/80 font-black text-amber-950">
                <th className="p-2">المدينة</th>
                <th className="p-2">الفجر</th>
                <th className="p-2">الشروق</th>
                <th className="p-2">الظهر</th>
                <th className="p-2">العصر</th>
                <th className="p-2">المغرب</th>
                <th className="p-2 bg-turq-200 text-turq-950">العشاء</th>
              </tr>
            </thead>
            <tbody>
              {CITY_CALENDAR.map((row, idx) => (
                <tr
                  key={row.city}
                  onClick={() => handleCityChange(idx)}
                  className={`cursor-pointer border-t border-amber-200/60 transition ${
                    idx === cityIdx ? 'bg-turq-100 font-black text-turq-950' : 'hover:bg-amber-100/50'
                  }`}
                >
                  <td className="p-2">{row.city}</td>
                  <td className="p-2">{row.fajr}</td>
                  <td className="p-2">{row.sunrise}</td>
                  <td className="p-2">{row.dhuhr}</td>
                  <td className="p-2">{row.asr}</td>
                  <td className="p-2">{row.maghrib}</td>
                  <td className="p-2 font-black text-turq-800">{row.isha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Helper card for half-night */}
      <div className="rounded-2xl border-2 border-sky-200 bg-sky-50 p-4 text-sm font-bold text-sky-900">
        🧮 <b>مساعد حساب نصف الليل لمدينة {city.city}:</b>
        <p className="mt-1">
          المغرب: <b>{city.maghrib}</b> — الفجر الثاني: <b>{city.fajr}</b> ⬅️ بإضافة نصف الوقت بينهما إلى وقت المغرب يصبح نصف الليل الساعة: <span className="rounded-lg bg-white px-2 py-0.5 font-black text-turq-800">{city.midnight}</span>
        </p>
      </div>

      {/* Questions */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border-2 border-slate-100 bg-white p-5 shadow-sm">
          <p className="font-black text-turq-900">١. يبدأُ وقتُ صلاةِ العِشاءِ في ({city.city}) الساعةَ:</p>
          <div className="mt-3 flex flex-col gap-2">
            {startOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  setPickedStart(opt);
                  playSfx(opt === city.isha ? 'success' : 'error');
                }}
                className={`touch-target rounded-2xl border-2 p-3 font-black transition ${
                  pickedStart === opt
                    ? opt === city.isha
                      ? 'border-brand-green bg-emerald-50 text-emerald-900'
                      : 'border-rose-400 bg-rose-50 text-rose-900 animate-wiggle'
                    : 'border-slate-200 bg-slate-50 hover:border-turq-300'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border-2 border-slate-100 bg-white p-5 shadow-sm">
          <p className="font-black text-turq-900">٢. ينتهي وقتُ صلاةِ العِشاءِ في ({city.city}) الساعةَ:</p>
          <div className="mt-3 flex flex-col gap-2">
            {endOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  setPickedEnd(opt);
                  playSfx(opt === city.midnight ? 'success' : 'error');
                }}
                className={`touch-target rounded-2xl border-2 p-3 font-black transition ${
                  pickedEnd === opt
                    ? opt === city.midnight
                      ? 'border-brand-green bg-emerald-50 text-emerald-900'
                      : 'border-rose-400 bg-rose-50 text-rose-900 animate-wiggle'
                    : 'border-slate-200 bg-slate-50 hover:border-turq-300'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          disabled={!bothCorrect}
          onClick={() => onComplete(3)}
          className="touch-target rounded-2xl bg-turq-500 px-8 py-4 text-lg font-black text-white shadow-lg shadow-turq-500/30 transition hover:bg-turq-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          انتقل إلى الشرط الثامن ⬅️
        </button>
      </div>
    </div>
  );
};

/* =========================================================
   STATION 6: Condition 8 - Facing the Qiblah (Page 68)
   ========================================================= */
export const Station6Qiblah: React.FC<StationProps> = ({ onComplete, playSfx }) => {
  const statements = [
    { id: 1, text: 'تَقَعُ فِي مَكَّةَ المُكَرَّمَةِ.', shouldCheck: true },
    { id: 2, text: 'قِبْلَةُ المُسْلِمِينَ.', shouldCheck: true },
    { id: 3, text: 'تَقَعُ فِي المَدِينَةِ المُنَوَّرَةِ.', shouldCheck: false },
  ];

  const [picks, setPicks] = useState<Record<number, boolean>>({});

  const toggle = (id: number, choice: boolean, expected: boolean) => {
    setPicks((prev) => ({ ...prev, [id]: choice }));
    playSfx(choice === expected ? 'success' : 'error');
  };

  const allCorrect = statements.every((s) => picks[s.id] === s.shouldCheck);

  return (
    <div className="space-y-6 animate-fadeup">
      <div className="rounded-3xl border-2 border-turq-200 bg-white p-6 shadow-sm">
        <h3 className="text-2xl font-black text-turq-900">
          الشَّرطُ الثَّامِنُ: <span className="text-orange-700">اسْتِقْبَالُ القِبْلَةِ.</span>
        </h3>
        <p className="mt-2 text-base font-bold text-slate-700">
          أَضَعُ عَلَامَةَ (✓) أَمَامَ كُلِّ عِبَارَةٍ لَهَا ارْتِبَاطٌ بِصُورَةِ الكَعْبَةِ، وعلامة (✗) للعبارة غير الصحيحة:
        </p>

        <div className="mt-5 grid items-center gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border-4 border-turq-200 shadow-lg">
            <img
              src="/images/kaaba.png"
              alt="الكعبة المشرفة في مكة المكرمة"
              className="h-64 w-full object-cover"
            />
          </div>

          <div className="space-y-3">
            {statements.map((st) => {
              const val = picks[st.id];
              const answered = val !== undefined;
              const isCorrect = val === st.shouldCheck;
              return (
                <div
                  key={st.id}
                  className={`flex items-center justify-between gap-3 rounded-2xl border-2 p-3.5 transition ${
                    answered
                      ? isCorrect
                        ? 'border-brand-green bg-emerald-50/70'
                        : 'border-rose-400 bg-rose-50 animate-wiggle'
                      : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <span className="text-base font-black text-slate-800">• {st.text}</span>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => toggle(st.id, true, st.shouldCheck)}
                      className={`grid h-11 w-11 place-items-center rounded-xl border-2 text-lg font-black transition ${
                        val === true
                          ? 'border-turq-600 bg-turq-500 text-white'
                          : 'border-slate-300 bg-white text-slate-600 hover:border-turq-400'
                      }`}
                      title="نعم مرتبطة بالكعبة"
                    >
                      ✓
                    </button>
                    <button
                      type="button"
                      onClick={() => toggle(st.id, false, st.shouldCheck)}
                      className={`grid h-11 w-11 place-items-center rounded-xl border-2 text-lg font-black transition ${
                        val === false
                          ? 'border-orange-500 bg-orange-500 text-white'
                          : 'border-slate-300 bg-white text-slate-600 hover:border-orange-300'
                      }`}
                      title="غير مرتبطة"
                    >
                      ✗
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-orange-100/80 p-4 text-center">
          <p className="text-xl font-black text-rose-700">لا تَصِحُّ الصَّلَاةُ دُونَ اسْتِقْبَالِ القِبْلَةِ</p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          disabled={!allCorrect}
          onClick={() => onComplete(3)}
          className="touch-target rounded-2xl bg-turq-500 px-8 py-4 text-lg font-black text-white shadow-lg shadow-turq-500/30 transition hover:bg-turq-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          انتقل إلى الشرط التاسع ⬅️
        </button>
      </div>
    </div>
  );
};
