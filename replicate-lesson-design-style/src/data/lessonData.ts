import { CityPrayerTime, StationMeta } from '../types';

export const STATIONS: StationMeta[] = [
  { id: 1, emoji: '🤔', title: 'استعد للرحلة!', subtitle: 'العصف الذهني وأسئلة التوقع', pageRef: 'تمهيد' },
  { id: 2, emoji: '📖', title: 'تدبّر الآية', subtitle: 'الشرط السابع: دخول الوقت', pageRef: 'ص 66' },
  { id: 3, emoji: '☀️', title: 'وقتا الفجر والظهر', subtitle: 'التعلم البصري ومحاكي الظل', pageRef: 'ص 66' },
  { id: 4, emoji: '🌇', title: 'العصر والمغرب والعشاء', subtitle: 'رحلة الشمس والشفق والنجوم', pageRef: 'ص 67' },
  { id: 5, emoji: '📅', title: 'نشاط (١): تقويم العشاء', subtitle: 'تحديد وقت العشاء من التقويم', pageRef: 'ص 68' },
  { id: 6, emoji: '🕋', title: 'استقبال القبلة', subtitle: 'الشرط الثامن وصورة الكعبة', pageRef: 'ص 68' },
  { id: 7, emoji: '❤️', title: 'النية محلها القلب', subtitle: 'الشرط التاسع والحديث الشريف', pageRef: 'ص 68' },
  { id: 8, emoji: '🧩', title: 'نشاط (٢): الشروط التسعة', subtitle: 'ترتيب وإكمال شروط الصلاة', pageRef: 'ص 69' },
  { id: 9, emoji: '⏰', title: 'نشاط (٣): أوقات الصلوات', subtitle: 'تحديد بداية ونهاية كل صلاة', pageRef: 'ص 69' },
  { id: 10, emoji: '🔍', title: 'تحدي المصحح الصغير', subtitle: 'تصحيح الأخطاء والمواقف', pageRef: 'ص 70' },
  { id: 11, emoji: '📝', title: 'التقويم الختامي', subtitle: 'أسئلة الكتاب والتقويم التفاعلي', pageRef: 'ص 70' },
  { id: 12, emoji: '🏆', title: 'بطل شروط الصلاة (٢)', subtitle: 'سباق المؤذن والشهادة', pageRef: 'التتويج' },
];

export const HERO_BADGES = [
  { emoji: '⏰', label: 'دخول الوقت' },
  { emoji: '🕋', label: 'استقبال القبلة' },
  { emoji: '❤️', label: 'النية' },
  { emoji: '🌅', label: 'الفجر والظهر' },
  { emoji: '🌇', label: 'العصر والمغرب' },
  { emoji: '🌙', label: 'العشاء ونصف الليل' },
];

export const CITY_CALENDAR: CityPrayerTime[] = [
  { city: 'مكة المكرمة', fajr: '5:25 ص', sunrise: '6:45 ص', dhuhr: '12:13 م', asr: '3:18 م', maghrib: '5:39 م', isha: '7:09 م', midnight: '11:32 م' },
  { city: 'المدينة المنورة', fajr: '5:30 ص', sunrise: '6:52 ص', dhuhr: '12:13 م', asr: '3:14 م', maghrib: '5:34 م', isha: '7:04 م', midnight: '11:32 م' },
  { city: 'الرياض', fajr: '5:02 ص', sunrise: '6:24 ص', dhuhr: '11:45 ص', asr: '2:45 م', maghrib: '5:05 م', isha: '6:35 م', midnight: '11:04 م' },
  { city: 'بريدة', fajr: '5:15 ص', sunrise: '6:39 ص', dhuhr: '11:56 ص', asr: '2:53 م', maghrib: '5:13 م', isha: '6:43 م', midnight: '11:14 م' },
  { city: 'الدمام', fajr: '4:51 ص', sunrise: '6:14 ص', dhuhr: '11:33 ص', asr: '2:28 م', maghrib: '4:48 م', isha: '6:18 م', midnight: '10:50 م' },
  { city: 'أبها', fajr: '5:10 ص', sunrise: '6:29 ص', dhuhr: '12:02 م', asr: '3:12 م', maghrib: '5:34 م', isha: '7:04 م', midnight: '11:22 م' },
  { city: 'تبوك', fajr: '5:48 ص', sunrise: '7:13 ص', dhuhr: '12:26 م', asr: '3:19 م', maghrib: '5:38 م', isha: '7:08 م', midnight: '11:43 م' },
  { city: 'جازان', fajr: '5:08 ص', sunrise: '6:26 ص', dhuhr: '12:02 م', asr: '3:13 م', maghrib: '5:37 م', isha: '7:07 م', midnight: '11:23 م' },
];

export const NINE_CONDITIONS = [
  { num: 1, label: 'الإسلام', prefilled: true, lesson: 1 },
  { num: 2, label: 'العقل', prefilled: false, lesson: 1 },
  { num: 3, label: 'التمييز', prefilled: true, lesson: 1 },
  { num: 4, label: 'الطهارة', prefilled: false, lesson: 1 },
  { num: 5, label: 'ستر العورة', prefilled: true, lesson: 1 },
  { num: 6, label: 'إزالة النجاسة', prefilled: false, lesson: 1 },
  { num: 7, label: 'دخول الوقت', prefilled: true, lesson: 2 },
  { num: 8, label: 'استقبال القبلة', prefilled: false, lesson: 2 },
  { num: 9, label: 'النية', prefilled: true, lesson: 2 },
];

export const PRAYER_TIMES_DATA = [
  {
    id: 'fajr',
    name: 'صلاة الفجر',
    start: 'طلوع الفجر الثاني',
    end: 'طلوع الشمس',
    color: 'from-slate-800 to-amber-500',
    startScene: 'fajr-start' as const,
    endScene: 'sunrise' as const,
    note: 'الفجر الثاني هو الفجر الصادق الذي ينتشر ضوؤه في الأفق شرقاً.',
  },
  {
    id: 'dhuhr',
    name: 'صلاة الظهر',
    start: 'زوال الشمس',
    end: 'أن يصير ظل كل شيء مثله',
    color: 'from-sky-500 to-amber-400',
    startScene: 'zawal' as const,
    endScene: 'equal-shadow' as const,
    note: 'زوال الشمس: الوقت الذي تكون فيه الشمس في كبد السماء ثم تميل من جهة الشرق إلى الغرب.',
  },
  {
    id: 'asr',
    name: 'صلاة العصر',
    start: 'خروج وقت الظهر',
    end: 'اصفرار الشمس',
    color: 'from-amber-400 to-orange-500',
    startScene: 'equal-shadow' as const,
    endScene: 'asr-end' as const,
    note: 'يُحسب الظل بعد فيء الزوال (الظل الباقي عند زوال الشمس).',
  },
  {
    id: 'maghrib',
    name: 'صلاة المغرب',
    start: 'غروب الشمس',
    end: 'أن يغيب الشفق الأحمر',
    color: 'from-orange-500 to-rose-600',
    startScene: 'maghrib-start' as const,
    endScene: 'shafaq-red' as const,
    note: 'الشفق الأحمر: هو الضوء الأحمر الذي يظهر في جهة الغرب بعد غروب الشمس.',
  },
  {
    id: 'isha',
    name: 'صلاة العشاء',
    start: 'مغيب الشفق الأحمر',
    end: 'نصف الليل',
    color: 'from-indigo-700 to-slate-900',
    startScene: 'shafaq-red' as const,
    endScene: 'midnight' as const,
    note: 'يُحسب نصف الليل بحساب الوقت من الغروب إلى الفجر الثاني، وإضافة نصفه لوقت المغرب (وليس الساعة 12 ليلاً).',
  },
];
