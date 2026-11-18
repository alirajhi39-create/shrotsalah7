import React, { useState } from 'react';
import { NINE_CONDITIONS, PRAYER_TIMES_DATA } from '../../data/lessonData';
import { StudentRecord } from '../../types';
import { PrayerSceneSvg } from '../PrayerVisuals';

interface StationProps {
  onComplete: (stars: number) => void;
  soundEnabled: boolean;
  playSfx: (type: 'success' | 'error' | 'click' | 'win') => void;
}

/* =========================================================
   STATION 7: Condition 9 - Niyyah (Page 68)
   ========================================================= */
export const Station7Niyyah: React.FC<StationProps> = ({ onComplete, playSfx }) => {
  const [deduced, setDeduced] = useState<number | null>(null);
  const [scenarioAns, setScenarioAns] = useState<number | null>(null);

  const canFinish = deduced === 1 && scenarioAns === 0;

  return (
    <div className="space-y-6 animate-fadeup">
      <div className="rounded-3xl border-2 border-turq-200 bg-white p-6 shadow-sm">
        <h3 className="text-2xl font-black text-turq-900">
          الشَّرطُ التَّاسِعُ: <span className="text-orange-700">النِّيَّةُ.</span>
        </h3>

        <div className="mt-4 rounded-3xl border-2 border-turq-200 bg-gradient-to-br from-turq-50 to-white p-6 text-center">
          <p className="text-base font-bold text-slate-600">قالَ النَّبِيُّ ﷺ:</p>
          <p className="font-quran mt-2 text-3xl font-bold text-turq-900 sm:text-4xl">
            « إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ »
          </p>
          <p className="mt-2 text-xs font-bold text-slate-500">أخرجه البخاري (١)، ومسلم (١٩٠٧)</p>
        </div>

        <div className="mt-5">
          <p className="text-base font-black text-sky-900">
            • أَسْتَنْتِجُ مِنْ هَذَا الحَدِيثِ شَرْطًا مِنْ شُرُوطِ الصَّلَاةِ:
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {['استقبال القبلة', 'النِّيَّةُ', 'إزالة النجاسة'].map((opt, idx) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  setDeduced(idx);
                  playSfx(idx === 1 ? 'success' : 'error');
                }}
                className={`touch-target rounded-2xl border-2 p-3.5 text-base font-black transition ${
                  deduced === idx
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

        <div className="mt-6 rounded-2xl bg-orange-100/80 p-4 text-center">
          <p className="text-xl font-black text-rose-700">لا تَنْطِقُ بِالنِّيَّةِ، النِّيَّةُ مَحَلُّهَا القَلْبُ.</p>
        </div>
      </div>

      {/* Scenario Check */}
      <div className="rounded-3xl border-2 border-slate-100 bg-white p-5 shadow-sm">
        <p className="text-base font-black text-turq-900">
          🧠 موقف تطبيقي: وقف فهد ليصلي العصر وقال بصوت مسموع: «نويت أصلي العصر أربع ركعات». بمَ تنصحه؟
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {[
            'أنصحه بألا ينطق بالنية لأن النية محلها القلب',
            'أخبره أن النطق بالنية واجب بصوت مرتفع',
          ].map((opt, idx) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                setScenarioAns(idx);
                playSfx(idx === 0 ? 'success' : 'error');
              }}
              className={`touch-target rounded-2xl border-2 p-3.5 text-right text-sm font-bold transition sm:text-base ${
                scenarioAns === idx
                  ? idx === 0
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
          disabled={!canFinish}
          onClick={() => onComplete(3)}
          className="touch-target rounded-2xl bg-turq-500 px-8 py-4 text-lg font-black text-white shadow-lg shadow-turq-500/30 transition hover:bg-turq-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          انتقل إلى نشاط (٢): الشروط التسعة ⬅️
        </button>
      </div>
    </div>
  );
};

/* =========================================================
   STATION 8: Activity 2 - All 9 Conditions Grid (Page 69)
   ========================================================= */
export const Station8NineConditions: React.FC<StationProps> = ({ onComplete, playSfx }) => {
  const missingNums = [2, 4, 6, 8];
  const wordBank = ['العقل', 'الطهارة', 'إزالة النجاسة', 'استقبال القبلة'];

  const [slots, setSlots] = useState<Record<number, string>>({});
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const usedWords = Object.values(slots);
  const availableWords = wordBank.filter((w) => !usedWords.includes(w));

  const placeInSlot = (num: number) => {
    // If slot already has a word and no word selected, remove it back to bank
    if (slots[num] && !selectedWord) {
      const next = { ...slots };
      delete next[num];
      setSlots(next);
      setChecked(false);
      playSfx('click');
      return;
    }

    if (selectedWord) {
      setSlots((prev) => ({ ...prev, [num]: selectedWord }));
      setSelectedWord(null);
      setChecked(false);
      playSfx('click');
    } else if (availableWords.length === 1) {
      setSlots((prev) => ({ ...prev, [num]: availableWords[0] }));
      setChecked(false);
      playSfx('click');
    }
  };

  const allFilled = missingNums.every((n) => Boolean(slots[n]));
  const allCorrect = NINE_CONDITIONS.filter((c) => !c.prefilled).every(
    (c) => slots[c.num] === c.label
  );

  const handleCheck = () => {
    setChecked(true);
    playSfx(allCorrect ? 'success' : 'error');
  };

  return (
    <div className="space-y-6 animate-fadeup">
      <div className="rounded-3xl border-2 border-turq-200 bg-white p-5 shadow-sm">
        <span className="rounded-full bg-turq-500 px-4 py-1 text-sm font-black text-white">
          📘 نشاط (٢) — صفحة ٦٩
        </span>
        <p className="mt-3 text-lg font-black text-turq-900">
          أَتَعَاوَنُ مَعَ مَجْمُوعَتِي وَأُكْمِلُ: لِلصَّلَاةِ شُرُوطٌ تِسْعَةٌ لا تَصِحُّ إِلَّا بِهَا:
        </p>
        <p className="mt-1 text-sm font-bold text-slate-500">
          اختر البطاقة من بنك الكلمات ثم اضغط على المربع الفارغ المناسب لترتيب الشروط التسعة:
        </p>

        {/* Word bank */}
        <div className="mt-4 flex flex-wrap gap-2 rounded-2xl border-2 border-dashed border-turq-300 bg-turq-50/70 p-4">
          {availableWords.length === 0 ? (
            <p className="text-sm font-bold text-turq-800">✅ تم وضع جميع البطاقات! اضغط «تحقق من إجابتي»</p>
          ) : (
            availableWords.map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => {
                  setSelectedWord(selectedWord === w ? null : w);
                  playSfx('click');
                }}
                className={`rounded-2xl border-2 px-4 py-2.5 text-base font-black shadow-sm transition ${
                  selectedWord === w
                    ? 'scale-105 border-brand-orange bg-brand-orange text-white'
                    : 'border-turq-400 bg-white text-turq-900 hover:bg-turq-100'
                }`}
              >
                {w}
              </button>
            ))
          )}
        </div>

        {/* 3x3 Grid matching Page 69 */}
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {NINE_CONDITIONS.map((cond) => {
            const val = cond.prefilled ? cond.label : slots[cond.num];
            const isCorrectSlot = checked && !cond.prefilled && val === cond.label;
            const isWrongSlot = checked && !cond.prefilled && val !== cond.label;

            return (
              <div key={cond.num} className="flex flex-col items-center">
                <span className="mb-1.5 grid h-8 w-8 place-items-center rounded-full border-2 border-turq-500 bg-white text-sm font-black text-turq-900">
                  {cond.num}
                </span>
                {cond.prefilled ? (
                  <div className="w-full rounded-2xl border-2 border-turq-400 bg-turq-50 px-4 py-3 text-center text-lg font-black text-turq-900">
                    {cond.label}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => placeInSlot(cond.num)}
                    className={`touch-target w-full rounded-2xl border-2 px-4 py-3 text-center text-lg font-black transition ${
                      isCorrectSlot
                        ? 'border-brand-green bg-emerald-50 text-emerald-900'
                        : isWrongSlot
                          ? 'border-rose-400 bg-rose-50 text-rose-900 animate-wiggle'
                          : val
                            ? 'border-turq-500 bg-sky-50 text-turq-900'
                            : selectedWord
                              ? 'border-dashed border-brand-orange bg-orange-50/70 text-orange-700'
                              : 'border-dashed border-turq-300 bg-slate-50 text-slate-400'
                    }`}
                  >
                    {val || 'اضغط هنا لوضع الشرط'}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {allFilled && (
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleCheck}
              className="rounded-2xl bg-brand-blue px-6 py-3 font-black text-white shadow transition hover:opacity-95"
            >
              تحقق من إجابتي ✔️
            </button>
            {checked && (
              <p className={`text-sm font-black ${allCorrect ? 'text-emerald-700' : 'text-rose-600'}`}>
                {allCorrect
                  ? '🌟 ممتاز! أكملت شروط الصلاة التسعة بنجاح!'
                  : '💡 بعض الخانات في غير موضعها، اضغط على البطاقة لإعادتها وتصحيح الترتيب.'}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          disabled={!checked || !allCorrect}
          onClick={() => onComplete(3)}
          className="touch-target rounded-2xl bg-turq-500 px-8 py-4 text-lg font-black text-white shadow-lg shadow-turq-500/30 transition hover:bg-turq-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          انتقل إلى نشاط (٣): أوقات الصلوات ⬅️
        </button>
      </div>
    </div>
  );
};

/* =========================================================
   STATION 9: Activity 3 - Specify Prayer Times (Page 69)
   ========================================================= */
export const Station9Activity3Times: React.FC<StationProps> = ({ onComplete, playSfx }) => {
  const startChoices = [
    'طلوع الفجر الثاني',
    'زوال الشمس',
    'خروج وقت الظهر',
    'غروب الشمس',
    'مغيب الشفق الأحمر',
  ];
  const endChoices = [
    'طلوع الشمس',
    'أن يصير ظل كل شيء مثله',
    'اصفرار الشمس',
    'أن يغيب الشفق الأحمر',
    'نصف الليل',
  ];

  const [starts, setStarts] = useState<Record<string, string>>({});
  const [ends, setEnds] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const allFilled = PRAYER_TIMES_DATA.every((p) => starts[p.id] && ends[p.id]);
  const allCorrect = PRAYER_TIMES_DATA.every((p) => starts[p.id] === p.start && ends[p.id] === p.end);

  const handleCheck = () => {
    setChecked(true);
    playSfx(allCorrect ? 'success' : 'error');
  };

  return (
    <div className="space-y-6 animate-fadeup">
      <div className="rounded-3xl border-2 border-turq-200 bg-white p-5 shadow-sm">
        <span className="rounded-full bg-turq-500 px-4 py-1 text-sm font-black text-white">
          📘 نشاط (٣) — صفحة ٦٩
        </span>
        <p className="mt-3 text-lg font-black text-turq-900">
          أُحَدِّدُ أَوْقَاتَ الصَّلَوَاتِ فِي الفَرَاغَاتِ التَّالِيَةِ:
        </p>

        <div className="mt-4 space-y-3">
          {PRAYER_TIMES_DATA.map((p, idx) => {
            const sOk = checked && starts[p.id] === p.start;
            const sBad = checked && starts[p.id] !== p.start;
            const eOk = checked && ends[p.id] === p.end;
            const eBad = checked && ends[p.id] !== p.end;

            return (
              <div
                key={p.id}
                className="flex flex-col gap-3 rounded-2xl border-2 border-turq-200 bg-turq-50/50 p-4 lg:flex-row lg:items-center"
              >
                <div className="flex items-center gap-2 lg:w-44 shrink-0">
                  <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-turq-500 bg-white text-sm font-black text-turq-900">
                    {idx + 1}
                  </span>
                  <span className="font-black text-turq-900">وَقْتُ {p.name}:</span>
                </div>

                <div className="flex flex-1 flex-wrap items-center gap-2">
                  <span className="font-black text-turq-800">من</span>
                  <select
                    value={starts[p.id] || ''}
                    onChange={(e) => {
                      setStarts((prev) => ({ ...prev, [p.id]: e.target.value }));
                      setChecked(false);
                    }}
                    className={`flex-1 min-w-[170px] rounded-xl border-2 bg-white p-2.5 text-sm font-bold focus:outline-none ${
                      sOk
                        ? 'border-brand-green bg-emerald-50 text-emerald-900'
                        : sBad
                          ? 'border-rose-400 bg-rose-50 text-rose-900'
                          : 'border-slate-200 focus:border-turq-400'
                    }`}
                  >
                    <option value="">اختر بداية الوقت...</option>
                    {startChoices.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>

                  <span className="font-black text-turq-800">إلى</span>
                  <select
                    value={ends[p.id] || ''}
                    onChange={(e) => {
                      setEnds((prev) => ({ ...prev, [p.id]: e.target.value }));
                      setChecked(false);
                    }}
                    className={`flex-1 min-w-[170px] rounded-xl border-2 bg-white p-2.5 text-sm font-bold focus:outline-none ${
                      eOk
                        ? 'border-brand-green bg-emerald-50 text-emerald-900'
                        : eBad
                          ? 'border-rose-400 bg-rose-50 text-rose-900'
                          : 'border-slate-200 focus:border-turq-400'
                    }`}
                  >
                    <option value="">اختر نهاية الوقت...</option>
                    {endChoices.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            disabled={!allFilled}
            onClick={handleCheck}
            className="rounded-2xl bg-brand-blue px-6 py-3 font-black text-white shadow transition hover:opacity-95 disabled:opacity-40"
          >
            تحقق من جميع الأوقات ✔️
          </button>
          {checked && (
            <p className={`text-sm font-black ${allCorrect ? 'text-emerald-700' : 'text-rose-600'}`}>
              {allCorrect
                ? '🌟 رائع جدًا! جميع أوقات الصلوات الخمس صحيحة!'
                : '💡 راجع الخانات الحمراء وعدّل الإجابة ثم تحقق مرة أخرى.'}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          disabled={!checked || !allCorrect}
          onClick={() => onComplete(3)}
          className="touch-target rounded-2xl bg-turq-500 px-8 py-4 text-lg font-black text-white shadow-lg shadow-turq-500/30 transition hover:bg-turq-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          انطلق إلى تحدي المصحح الصغير ⬅️
        </button>
      </div>
    </div>
  );
};

/* =========================================================
   STATION 10: Error Correction Detective (Page 70 Q1 & Q2)
   ========================================================= */
export const Station10Detective: React.FC<StationProps> = ({ onComplete, playSfx }) => {
  const [case1, setCase1] = useState<number | null>(null);
  const [case2, setCase2] = useState<number | null>(null);
  const [q2, setQ2] = useState<number | null>(null);

  const allDone = case1 === 0 && case2 === 1 && q2 === 1;

  return (
    <div className="space-y-6 animate-fadeup">
      <div className="rounded-3xl border-2 border-amber-300 bg-white p-5 shadow-sm">
        <span className="rounded-full bg-amber-600 px-4 py-1 text-sm font-black text-white">
          📙 التقويم (س١ وس٢) — صفحة ٧٠
        </span>
        <p className="mt-3 text-lg font-black text-turq-900">
          ١. أُصَحِّحُ الخَطَأَ فِي المَوَاقِفِ الآتِيَةِ:
        </p>

        {/* Case 1 */}
        <div className="mt-4 rounded-2xl border-2 border-turq-200 bg-turq-50/40 p-4">
          <p className="text-base font-black text-turq-900">الموقف (١): «صَلَّى سعدٌ عكسَ القِبْلَةِ»</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {[
              'يتجه نحو القبلة (الكعبة المشرفة) ويعيد صلاته لأن استقبال القبلة شرط لصحة الصلاة',
              'صلاته صحيحة ولا يلزمه استقبال القبلة',
            ].map((opt, idx) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  setCase1(idx);
                  playSfx(idx === 0 ? 'success' : 'error');
                }}
                className={`touch-target rounded-2xl border-2 p-3 text-right text-sm font-bold transition ${
                  case1 === idx
                    ? idx === 0
                      ? 'border-brand-green bg-emerald-50 text-emerald-900'
                      : 'border-rose-400 bg-rose-50 text-rose-900 animate-wiggle'
                    : 'border-slate-200 bg-white hover:border-turq-300'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Case 2 */}
        <div className="mt-4 rounded-2xl border-2 border-turq-200 bg-turq-50/40 p-4">
          <p className="text-base font-black text-turq-900">
            الموقف (٢): «صَلَّى مُحَمَّدٌ المَغْرِبَ قَبْلَ غُرُوبِ الشَّمْسِ»
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {[
              'تصح صلاته ما دام صلى ثلاث ركعات',
              'لا تصح صلاته؛ بل ينتظر حتى تغرب الشمس ويدخل وقت المغرب ثم يصلي',
            ].map((opt, idx) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  setCase2(idx);
                  playSfx(idx === 1 ? 'success' : 'error');
                }}
                className={`touch-target rounded-2xl border-2 p-3 text-right text-sm font-bold transition ${
                  case2 === idx
                    ? idx === 1
                      ? 'border-brand-green bg-emerald-50 text-emerald-900'
                      : 'border-rose-400 bg-rose-50 text-rose-900 animate-wiggle'
                    : 'border-slate-200 bg-white hover:border-turq-300'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Q2 Page 70 */}
        <div className="mt-5 rounded-2xl border-2 border-slate-200 bg-white p-4">
          <p className="text-base font-black text-turq-900">
            ٢. عَدَدُ شُرُوطِ الصَّلَاةِ تِسْعَةٌ، فَإِذَا صَلَّيْتَ بِدُونِ تَحْقِيقِ أَحَدِ هَذِهِ الشُّرُوطِ فَهَلْ صَلَاتُكَ صَحِيحَةٌ؟
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {[
              'نعم، تكفي ثمانية شروط فقط',
              'لا، لا تصح الصلاة إلا بتحقيق جميع الشروط التسعة',
            ].map((opt, idx) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  setQ2(idx);
                  playSfx(idx === 1 ? 'success' : 'error');
                }}
                className={`touch-target rounded-2xl border-2 p-3 text-right text-sm font-bold transition ${
                  q2 === idx
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
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          disabled={!allDone}
          onClick={() => onComplete(3)}
          className="touch-target rounded-2xl bg-turq-500 px-8 py-4 text-lg font-black text-white shadow-lg shadow-turq-500/30 transition hover:bg-turq-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          انطلق إلى التقويم الختامي ⬅️
        </button>
      </div>
    </div>
  );
};

/* =========================================================
   STATION 11: Final Interactive Evaluation (Page 70 Q3 + Quiz)
   ========================================================= */
export const Station11FinalQuiz: React.FC<StationProps> = ({ onComplete, playSfx }) => {
  const questions = [
    {
      id: 1,
      hasImage: true,
      q: 'أ. انظر إلى الصورة (صفحة ٧٠): مَا الوَقْتُ الَّذِي تَدُلُّ عليه الصُّورَةُ؟',
      options: ['طلوع الفجر الثاني', 'غروب الشمس وبداية الشفق الأحمر', 'زوال الشمس'],
      correct: 1,
    },
    {
      id: 2,
      q: 'ب. مَا الصَّلَاةُ الَّتِي تُؤَدَّى فِي هَذَا الوَقْتِ؟',
      options: ['صلاة المغرب', 'صلاة الظهر', 'صلاة الفجر'],
      correct: 0,
    },
    {
      id: 3,
      q: 'مَا الدَّلِيلُ على أنَّ النِّيَّةَ شرطٌ مِنْ شروطِ الصلاة؟',
      options: [
        'قوله ﷺ: «إنما الأعمال بالنيات»',
        'قوله تعالى: ﴿إن الصلاة كانت على المؤمنين كتابًا موقوتًا﴾',
        'اتجاه الكعبة في مكة المكرمة',
      ],
      correct: 0,
    },
    {
      id: 4,
      q: 'متى يخرجُ وقتُ صلاةِ الظهر ويدخلُ وقتُ صلاةِ العصر؟',
      options: [
        'عند طلوع الشمس',
        'إذا صار ظل كل شيء مثله (بعد فيء الزوال)',
        'عند مغيب الشفق الأحمر',
      ],
      correct: 1,
    },
    {
      id: 5,
      q: 'أيُّ العبارات التالية صحيحة عن النِّيَّة في الصلاة؟',
      options: [
        'يُنطق بها بصوتٍ مرتفع قبل التكبير',
        'محلها القلب ولا يُنطق بها باللسان',
        'ليست من شروط الصلاة التسعة',
      ],
      correct: 1,
    },
  ];

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = Object.keys(answers).length === questions.length;
  const score = questions.filter((q) => answers[q.id] === q.correct).length;

  const submitQuiz = () => {
    setSubmitted(true);
    playSfx(score >= 4 ? 'win' : 'success');
  };

  return (
    <div className="space-y-6 animate-fadeup">
      {questions.map((item) => {
        const picked = answers[item.id];
        return (
          <div key={item.id} className="rounded-3xl border-2 border-slate-100 bg-white p-5 shadow-sm">
            {item.hasImage && (
              <div className="mb-4 max-w-sm overflow-hidden rounded-2xl border-2 border-amber-300">
                <PrayerSceneSvg scene="maghrib-start" />
              </div>
            )}
            <p className="text-base font-black text-turq-900 sm:text-lg">{item.q}</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {item.options.map((opt, idx) => {
                const isSelected = picked === idx;
                let cls = 'border-slate-200 bg-slate-50 hover:border-turq-300';
                if (submitted) {
                  if (idx === item.correct) {
                    cls = 'border-brand-green bg-emerald-50 text-emerald-900 font-black';
                  } else if (isSelected) {
                    cls = 'border-rose-400 bg-rose-50 text-rose-900';
                  }
                } else if (isSelected) {
                  cls = 'border-turq-500 bg-turq-50 text-turq-900 font-black';
                }
                return (
                  <button
                    key={opt}
                    type="button"
                    disabled={submitted}
                    onClick={() => {
                      setAnswers((prev) => ({ ...prev, [item.id]: idx }));
                      playSfx('click');
                    }}
                    className={`touch-target rounded-2xl border-2 p-3.5 text-right text-sm font-bold transition ${cls}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {!submitted ? (
        <div className="flex justify-end">
          <button
            type="button"
            disabled={!allAnswered}
            onClick={submitQuiz}
            className="touch-target rounded-2xl bg-brand-blue px-8 py-4 text-lg font-black text-white shadow-lg transition hover:opacity-95 disabled:opacity-40"
          >
            اعتماد إجابات التقويم 📝
          </button>
        </div>
      ) : (
        <div className="animate-pop rounded-3xl border-2 border-emerald-300 bg-emerald-50 p-6 text-center">
          <p className="text-2xl font-black text-emerald-900">
            نتيجتك في التقويم الختامي: {score} من {questions.length} 🌟
          </p>
          <p className="mt-1 font-bold text-emerald-800">
            {score === 5
              ? 'درجة كاملة! أنت مستعد لمحطة التتويج والشهادة!'
              : 'أحسنت! هيا ننتقل إلى لعبة التتويج والحصول على الشهادة!'}
          </p>
          <button
            type="button"
            onClick={() => onComplete(score >= 4 ? 3 : 2)}
            className="touch-target mt-4 rounded-2xl bg-turq-500 px-8 py-4 text-lg font-black text-white shadow-lg transition hover:bg-turq-600"
          >
            إلى محطة التتويج والشهادة 🏆
          </button>
        </div>
      )}
    </div>
  );
};

/* =========================================================
   STATION 12: Game "سباق المؤذن" + Printable Certificate
   ========================================================= */
interface Station12Props extends StationProps {
  student: StudentRecord;
  alreadyFinished: boolean;
}

export const Station12Champion: React.FC<Station12Props> = ({
  student,
  alreadyFinished,
  onComplete,
  playSfx,
}) => {
  const gameItems = [
    { clue: 'طلوع الفجر الثاني ⬅️ طلوع الشمس', answer: 'الفجر', choices: ['الفجر', 'الظهر', 'العشاء'] },
    { clue: 'زوال الشمس ⬅️ ظل كل شيء مثله', answer: 'الظهر', choices: ['المغرب', 'الظهر', 'الفجر'] },
    { clue: 'خروج وقت الظهر ⬅️ اصفرار الشمس', answer: 'العصر', choices: ['العشاء', 'العصر', 'المغرب'] },
    { clue: 'غروب الشمس ⬅️ غياب الشفق الأحمر', answer: 'المغرب', choices: ['المغرب', 'الظهر', 'العصر'] },
    { clue: 'مغيب الشفق الأحمر ⬅️ نصف الليل', answer: 'العشاء', choices: ['الفجر', 'العشاء', 'الظهر'] },
    { clue: 'الاتجاه نحو الكعبة المشرفة في مكة', answer: 'استقبال القبلة', choices: ['النية', 'استقبال القبلة', 'دخول الوقت'] },
  ];

  const [step, setStep] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [gameDone, setGameDone] = useState(alreadyFinished);

  const pickGame = (choice: string) => {
    const isRight = choice === gameItems[step].answer;
    playSfx(isRight ? 'success' : 'error');
    if (isRight) setGameScore((s) => s + 1);

    if (step + 1 < gameItems.length) {
      setStep((s) => s + 1);
    } else {
      setGameDone(true);
      onComplete(3);
      playSfx('win');
    }
  };

  if (!gameDone) {
    const current = gameItems[step];
    return (
      <div className="space-y-6 animate-fadeup">
        <div className="rounded-3xl border-2 border-turq-300 bg-white p-6 text-center shadow-lg">
          <div className="flex items-center justify-between text-sm font-black text-turq-700">
            <span>🎮 تحدي التتويج: سباق المؤذن الصغير</span>
            <span>
              السؤال {step + 1} / {gameItems.length}
            </span>
          </div>

          <div className="my-6 rounded-3xl bg-gradient-to-br from-turq-500 to-brand-blue p-6 text-white shadow-md">
            <p className="text-sm font-bold opacity-90">اختر الصلاة أو الشرط المطابق:</p>
            <p className="mt-2 text-2xl font-black sm:text-3xl">{current.clue}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {current.choices.map((ch) => (
              <button
                key={ch}
                type="button"
                onClick={() => pickGame(ch)}
                className="touch-target rounded-2xl border-2 border-turq-200 bg-turq-50 p-4 text-xl font-black text-turq-900 transition hover:scale-105 hover:border-turq-500 hover:bg-turq-100"
              >
                {ch}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const today = new Date().toLocaleDateString('ar-SA');

  return (
    <div className="space-y-6 animate-pop">
      <div className="print-only-card relative overflow-hidden rounded-3xl border-8 border-double border-turq-600 bg-gradient-to-br from-white via-turq-50/40 to-amber-50/50 p-8 text-center shadow-2xl">
        <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-full bg-amber-100 text-4xl shadow">
          🏆
        </div>
        <p className="text-sm font-black tracking-wide text-turq-700">
          المملكة العربية السعودية • مدرسة العروس الابتدائية • الدراسات الإسلامية (الفقه)
        </p>
        <h2 className="mt-2 text-3xl font-black text-turq-900 sm:text-4xl">
          شهادة تفوّق: «بطل شروط الصلاة (٢)»
        </h2>
        <p className="mt-4 text-lg font-bold text-slate-600">تُمنح هذه الشهادة للطالب المتميّز:</p>
        <p className="mt-2 text-3xl font-black text-brand-blue sm:text-4xl">{student.name}</p>
        <p className="mt-1 text-base font-black text-orange-700">الصف: {student.section}</p>

        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed font-bold text-slate-700">
          لإتمامه بنجاح رحلة <b>الدرس الثامن: شروط الصلاة (٢)</b> (دخول الوقت – استقبال القبلة – النية)
          ومواقيت الصلوات الخمس بجميع محطاتها الـ ١٢!
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <div className="rounded-2xl border border-turq-200 bg-white px-5 py-3 shadow-sm">
            <p className="text-xs font-bold text-slate-500">النجوم المكتسبة</p>
            <p className="text-2xl font-black text-amber-500">{student.totalStars} ⭐</p>
          </div>
          <div className="rounded-2xl border border-turq-200 bg-white px-5 py-3 shadow-sm">
            <p className="text-xs font-bold text-slate-500">نتيجة سباق المؤذن</p>
            <p className="text-2xl font-black text-turq-700">
              {gameScore > 0 ? `${gameScore} / ${gameItems.length}` : 'مكتمل ✅'}
            </p>
          </div>
          <div className="rounded-2xl border border-turq-200 bg-white px-5 py-3 shadow-sm">
            <p className="text-xs font-bold text-slate-500">التاريخ</p>
            <p className="text-lg font-black text-slate-700">{today}</p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-turq-200 pt-4 text-sm font-black text-turq-900">
          <span>المعلم: علي عبدالله راجحي</span>
          <span>ختم الإنجاز الرقمي 🕌</span>
        </div>
      </div>

      <div className="no-print flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => window.print()}
          className="touch-target rounded-2xl bg-brand-orange px-7 py-3.5 text-lg font-black text-white shadow-lg transition hover:opacity-95"
        >
          🖨️ طباعة / حفظ الشهادة PDF
        </button>
      </div>
    </div>
  );
};
