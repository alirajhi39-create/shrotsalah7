import React, { useState } from 'react';
import { ClassSection, StudentRecord } from '../types';
import { SmartboardCompetition } from './SmartboardCompetition';

interface TeacherDashboardProps {
  records: StudentRecord[];
  onClose: () => void;
  onClearRecords: () => void;
  onUpdateRecord: (id: string, name: string, section: ClassSection) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  records,
  onClose,
  onClearRecords,
  onUpdateRecord,
}) => {
  const [pin, setPin] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState<'records' | 'competition'>('records');
  const [filter, setFilter] = useState<'all' | ClassSection>('all');

  // Student inline edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editSection, setEditSection] = useState<ClassSection>('الثالث (أ)');

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === '139613') {
      setUnlocked(true);
      setPinError('');
    } else {
      setPinError('كلمة المرور غير صحيحة، حاول مرة أخرى.');
    }
  };

  const startEditStudent = (rec: StudentRecord) => {
    setEditingId(rec.id);
    setEditName(rec.name);
    setEditSection(rec.section);
  };

  const saveEditStudent = (id: string) => {
    const trimmed = editName.trim();
    if (trimmed.length >= 2) {
      onUpdateRecord(id, trimmed, editSection);
    }
    setEditingId(null);
  };

  const filtered = filter === 'all' ? records : records.filter((r) => r.section === filter);
  const completedCount = filtered.filter((r) => r.completedStations.length === 12).length;
  const avgStars =
    filtered.length > 0
      ? Math.round(filtered.reduce((acc, r) => acc + r.totalStars, 0) / filtered.length)
      : 0;
  const todayStr = new Date().toLocaleDateString('ar-SA');

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div className="teacher-print-overlay fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm print:static print:block print:bg-white print:p-0 print:backdrop-blur-none">
      <div
        className={`teacher-print-sheet max-h-[92vh] w-full overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl animate-pop print:max-h-none print:max-w-none print:overflow-visible print:rounded-none print:p-4 print:shadow-none ${
          activeTab === 'competition' ? 'max-w-6xl' : 'max-w-4xl'
        }`}
      >
        {/* Screen Header */}
        <div className="no-print flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-turq-100 text-2xl">
              👨‍🏫
            </span>
            <div>
              <h2 className="text-xl font-black text-turq-900">بوابة المعلم – الدرس (٢)</h2>
              <p className="text-xs font-bold text-slate-500">
                المعلم: علي عبدالله راجحي — مدرسة العروس الابتدائية
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unlocked && (
              <div className="flex rounded-2xl bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('records')}
                  className={`rounded-xl px-4 py-2 text-sm font-black transition ${
                    activeTab === 'records'
                      ? 'bg-turq-500 text-white shadow'
                      : 'text-slate-700 hover:text-turq-900'
                  }`}
                >
                  📊 سجل الطلاب
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('competition')}
                  className={`rounded-xl px-4 py-2 text-sm font-black transition ${
                    activeTab === 'competition'
                      ? 'bg-brand-orange text-white shadow'
                      : 'text-slate-700 hover:text-turq-900'
                  }`}
                >
                  🏆 مسابقة السبورة
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-black text-slate-700 hover:bg-slate-200"
            >
              إغلاق ✕
            </button>
          </div>
        </div>

        {/* Formal Print-Only Header */}
        <div className="hidden border-b-2 border-turq-600 pb-4 text-center print:block">
          <p className="text-sm font-bold text-slate-600">
            المملكة العربية السعودية • مدرسة العروس الابتدائية • الدراسات الإسلامية (الفقه)
          </p>
          <h1 className="mt-1 text-2xl font-black text-turq-900">
            تقرير متابعة إنجاز الطلاب – درس: شروط الصلاة (٢)
          </h1>
          <div className="mt-2 flex justify-center gap-6 text-xs font-bold text-slate-700">
            <span>المعلم: علي عبدالله راجحي</span>
            <span>النطاق: {filter === 'all' ? 'جميع الفصول' : filter}</span>
            <span>تاريخ التقرير: {todayStr}</span>
          </div>
        </div>

        {!unlocked ? (
          <form onSubmit={handleUnlock} className="no-print mx-auto my-8 max-w-sm space-y-4 text-center">
            <p className="font-bold text-slate-700">أدخل كلمة المرور للدخول إلى لوحة المعلم</p>
            <input
              type="password"
              inputMode="numeric"
              autoFocus
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                if (pinError) setPinError('');
              }}
              placeholder="أدخل كلمة المرور"
              className="w-full rounded-2xl border-2 border-slate-200 p-3 text-center text-xl font-black tracking-widest focus:border-turq-400 focus:outline-none"
            />
            {pinError && <p className="text-sm font-bold text-rose-600">{pinError}</p>}
            <button
              type="submit"
              className="w-full rounded-2xl bg-turq-500 py-3 font-black text-white shadow transition hover:bg-turq-600"
            >
              دخول
            </button>
          </form>
        ) : activeTab === 'competition' ? (
          <div className="mt-5">
            <SmartboardCompetition />
          </div>
        ) : (
          <div className="mt-5 space-y-5">
            <div className="grid gap-3 sm:grid-cols-3 print:grid-cols-3">
              <div className="rounded-2xl bg-turq-50 p-4 print:border print:border-turq-200">
                <p className="text-xs font-bold text-turq-700">إجمالي الطلاب</p>
                <p className="text-2xl font-black text-turq-900">{filtered.length}</p>
              </div>
              <div className="rounded-2xl bg-emerald-50 p-4 print:border print:border-emerald-200">
                <p className="text-xs font-bold text-emerald-700">أكملوا الـ ١٢ محطة</p>
                <p className="text-2xl font-black text-emerald-900">{completedCount}</p>
              </div>
              <div className="rounded-2xl bg-amber-50 p-4 print:border print:border-amber-200">
                <p className="text-xs font-bold text-amber-700">متوسط النجوم</p>
                <p className="text-2xl font-black text-amber-900">{avgStars} ⭐</p>
              </div>
            </div>

            <div className="no-print flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-2">
                {(['all', 'الثالث (أ)', 'الثالث (ب)'] as const).map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => setFilter(sec)}
                    className={`rounded-xl px-3 py-1.5 text-sm font-bold ${
                      filter === sec
                        ? 'bg-turq-500 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {sec === 'all' ? 'جميع الفصول' : sec}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handlePrintPdf}
                  className="rounded-xl bg-brand-blue px-4 py-2 text-xs font-black text-white shadow transition hover:opacity-95 sm:text-sm"
                >
                  🖨️ طباعة / حفظ PDF
                </button>
                {records.length > 0 && (
                  <button
                    type="button"
                    onClick={onClearRecords}
                    className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-black text-rose-700 hover:bg-rose-100"
                  >
                    🗑️ مسح السجل المحلي
                  </button>
                )}
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center font-bold text-slate-500">
                لا يوجد طلاب مسجلون في هذا الفصل بعد. سيظهر الطلاب تلقائيًا بمجرد بدء الدرس!
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-slate-200 print:overflow-visible">
                <table className="w-full text-right text-sm">
                  <thead className="bg-slate-50 font-black text-slate-700">
                    <tr>
                      <th className="p-3">#</th>
                      <th className="p-3">اسم الطالب</th>
                      <th className="p-3">الفصل</th>
                      <th className="p-3">المحطات المكتملة</th>
                      <th className="p-3">النجوم</th>
                      <th className="p-3">الحالة</th>
                      <th className="no-print p-3">تعديل</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((rec, idx) => {
                      const isEditing = editingId === rec.id;
                      return (
                        <tr key={rec.id} className="border-t border-slate-100">
                          <td className="p-3 font-bold text-slate-500">{idx + 1}</td>
                          <td className="p-3 font-black text-turq-900">
                            {isEditing ? (
                              <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="w-full min-w-[140px] rounded-lg border-2 border-turq-400 px-2 py-1 text-sm font-black focus:outline-none"
                              />
                            ) : (
                              rec.name
                            )}
                          </td>
                          <td className="p-3 font-bold text-slate-600">
                            {isEditing ? (
                              <select
                                value={editSection}
                                onChange={(e) => setEditSection(e.target.value as ClassSection)}
                                className="rounded-lg border-2 border-turq-400 bg-white px-2 py-1 text-xs font-bold"
                              >
                                <option value="الثالث (أ)">الثالث (أ)</option>
                                <option value="الثالث (ب)">الثالث (ب)</option>
                              </select>
                            ) : (
                              rec.section
                            )}
                          </td>
                          <td className="p-3 font-bold">{rec.completedStations.length} / 12</td>
                          <td className="p-3 font-black text-amber-600">{rec.totalStars} ⭐</td>
                          <td className="p-3">
                            {rec.completedStations.length === 12 ? (
                              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800">
                                بطل الدرس 🏆
                              </span>
                            ) : (
                              <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-black text-sky-800">
                                محطة {rec.currentStation}
                              </span>
                            )}
                          </td>
                          <td className="no-print p-3">
                            {isEditing ? (
                              <div className="flex gap-1">
                                <button
                                  type="button"
                                  onClick={() => saveEditStudent(rec.id)}
                                  className="rounded-lg bg-emerald-500 px-2.5 py-1 text-xs font-black text-white hover:bg-emerald-600"
                                >
                                  حفظ
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditingId(null)}
                                  className="rounded-lg bg-slate-200 px-2 py-1 text-xs font-bold text-slate-700"
                                >
                                  إلغاء
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => startEditStudent(rec)}
                                className="rounded-lg bg-turq-50 px-2.5 py-1 text-xs font-black text-turq-800 hover:bg-turq-100"
                              >
                                ✏️ تعديل
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Formal Print-Only Footer */}
            <div className="hidden justify-between border-t border-slate-300 pt-4 text-xs font-bold text-slate-700 print:flex">
              <span>توقيع المعلم: علي عبدالله راجحي</span>
              <span>إدارة مدرسة العروس الابتدائية</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
