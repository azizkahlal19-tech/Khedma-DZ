import React, { useState } from 'react';
import { PolivalenteTask, Locale, UserProfile } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { WILAYAS_58 } from '../../data/wilayas';
import { 
  Users, 
  MapPin, 
  Plus, 
  Clock, 
  ShieldAlert, 
  ArrowRightLeft, 
  CheckCircle2, 
  AlertCircle,
  Phone,
  Wrench,
  Search,
  SlidersHorizontal,
  X
} from 'lucide-react';

interface PolivalenteFeedViewProps {
  tasks: PolivalenteTask[];
  currentLocale: Locale;
  currentUser: UserProfile | null;
  onPostNewTask: (task: Partial<PolivalenteTask>) => void;
  onSubmitCounterOffer: (taskId: string, price: number, note: string) => void;
  onAcceptTask: (taskId: string) => void;
}

export const PolivalenteFeedView: React.FC<PolivalenteFeedViewProps> = ({
  tasks,
  currentLocale,
  currentUser,
  onPostNewTask,
  onSubmitCounterOffer,
  onAcceptTask
}) => {
  const t = TRANSLATIONS[currentLocale];
  const [selectedWilaya, setSelectedWilaya] = useState('all');
  const [maxDistance, setMaxDistance] = useState(25);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [counterOfferTaskId, setCounterOfferTaskId] = useState<string | null>(null);
  const [counterPrice, setCounterPrice] = useState(2500);
  const [counterNotes, setCounterNotes] = useState('');

  // New task form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newBudget, setNewBudget] = useState(2500); // Default >= 1000
  const [newWilaya, setNewWilaya] = useState('16');
  const [newAddress, setNewAddress] = useState('');
  const [newCategory, setNewCategory] = useState<'moving' | 'unloading' | 'site_cleanup' | 'demolition' | 'gardening' | 'general_labor'>('moving');
  const [newCrewTotal, setNewCrewTotal] = useState(1);
  const [newTools, setNewTools] = useState('قفازات حماية، حبال تثبيت');
  const [budgetError, setBudgetError] = useState<string | null>(null);

  const filteredTasks = tasks.filter(task => {
    const matchesWilaya = selectedWilaya === 'all' || task.wilayaCode === selectedWilaya;
    const matchesDistance = task.distanceKm <= maxDistance;
    return matchesWilaya && matchesDistance;
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    // STRICT 1,000 DZD FLOOR ENFORCEMENT
    if (newBudget < 1000) {
      setBudgetError('تنبيه النظام: الحد الأدنى الإلزامي هو 1,000 دج لأي مهمة يومية حمايةً لحقوق العمال.');
      return;
    }
    setBudgetError(null);

    onPostNewTask({
      titleAr: newTitle,
      titleFr: newTitle,
      description: newDesc,
      budgetDzd: newBudget,
      wilayaCode: newWilaya,
      address: newAddress || 'الجزائر',
      category: newCategory,
      crewSlotsTotal: newCrewTotal,
      crewSlotsFilled: 0,
      requiredEquipment: newTools.split('،').map(s => s.trim()).filter(Boolean),
      distanceKm: 2.5,
      urgent: true,
      status: 'open',
      bidsCount: 0,
      counterOffers: []
    });

    setIsPostModalOpen(false);
    setNewTitle('');
    setNewDesc('');
    setNewBudget(2500);
  };

  const handleSendCounterOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!counterOfferTaskId) return;

    // STRICT 1,000 DZD FLOOR ON COUNTER OFFERS TOO
    if (counterPrice < 1000) {
      alert('يجب أن يكون العرض 1,000 دج أو أكثر طبقاً لقانون المنصة.');
      return;
    }

    onSubmitCounterOffer(counterOfferTaskId, counterPrice, counterNotes);
    setCounterOfferTaskId(null);
    setCounterNotes('');
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-800">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-emerald-400">بث حي ومباشر للمهام اليومية</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-300">نقل أثاث، تفريغ شاحنات، وتنظيف ورشات</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {t.polivalente.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300">
            {t.polivalente.subtitle}
          </p>

          <div className="pt-2">
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="py-2.5 px-5 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{t.polivalente.postTask}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mandatory Budget Floor Compliance Banner */}
      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <h4 className="text-xs font-bold text-emerald-950">
            {t.polivalente.floorRuleTitle}
          </h4>
          <p className="text-xs text-emerald-900 leading-relaxed">
            {t.polivalente.floorRuleDesc}
          </p>
        </div>
      </div>

      {/* Granular Distance & Wilaya Filters */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        
        {/* Wilaya Filter */}
        <div className="w-full sm:w-64">
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
            {t.common.selectWilaya}:
          </label>
          <select
            value={selectedWilaya}
            onChange={(e) => setSelectedWilaya(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
          >
            <option value="all">{t.common.allWilayas}</option>
            {WILAYAS_58.map(w => (
              <option key={w.code} value={w.code}>
                {w.code} - {w.nameAr} ({w.nameFr})
              </option>
            ))}
          </select>
        </div>

        {/* Distance Range Slider */}
        <div className="flex-1 min-w-[220px]">
          <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
            <span>{t.polivalente.filterDistance}</span>
            <span className="font-mono text-emerald-700">{maxDistance} كم</span>
          </div>
          <input
            type="range"
            min="1"
            max="50"
            value={maxDistance}
            onChange={(e) => setMaxDistance(Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer"
          />
        </div>

      </div>

      {/* Task Feed Cards List */}
      <div className="space-y-4">
        {filteredTasks.map(task => {
          const wilayaInfo = WILAYAS_58.find(w => w.code === task.wilayaCode);
          const slotsRemaining = task.crewSlotsTotal - task.crewSlotsFilled;

          return (
            <div
              key={task.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow space-y-4"
            >
              {/* Header: Title, Category, Budget Floor Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-slate-900">
                      {currentLocale === 'ar' ? task.titleAr : task.titleFr}
                    </h3>
                    {task.urgent && (
                      <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold">
                        عاجل جداً
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-700 flex-wrap">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{task.address} ({wilayaInfo ? wilayaInfo.nameAr : task.wilayaCode})</span>
                    </span>
                    <span>·</span>
                    <span className="font-mono text-emerald-700 font-semibold">{task.distanceKm} كم من موقعك</span>
                    <span>·</span>
                    <span className="text-slate-700">{task.postedAt}</span>
                  </div>
                </div>

                {/* Budget Floor Indicator */}
                <div className="text-start sm:text-end shrink-0">
                  <div className="text-lg font-black font-mono text-emerald-700">
                    {task.budgetDzd.toLocaleString()} {t.common.dzd}
                  </div>
                  <div className="text-[10px] text-emerald-800 font-semibold">
                    ✓ متوافق مع الحد الأدنى (≥ 1,000 دج)
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-700 leading-relaxed">
                {task.description}
              </p>

              {/* Equipment Tags & Crew Slots */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                
                {/* Required Tools */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Wrench className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                  <span className="text-slate-700 font-medium">العتاد المطلوب:</span>
                  {task.requiredEquipment.map((eq, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 text-[11px]">
                      {eq}
                    </span>
                  ))}
                </div>

                {/* Multi-Worker Crew Slots */}
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Users className="w-3.5 h-3.5 text-emerald-600" />
                  <span>طاقم العمل:</span>
                  <span className="font-mono font-bold text-slate-900">
                    {task.crewSlotsFilled} / {task.crewSlotsTotal} مكتمل
                  </span>
                  {slotsRemaining > 0 ? (
                    <span className="text-[10px] text-amber-700 font-semibold">
                      ({slotsRemaining} {t.polivalente.slots})
                    </span>
                  ) : (
                    <span className="text-[10px] text-red-600 font-semibold">(مكتمل)</span>
                  )}
                </div>

              </div>

              {/* Counter-offers history (if any) */}
              {task.counterOffers.length > 0 && (
                <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1.5 border border-slate-200">
                  <div className="font-semibold text-slate-700 flex items-center gap-1">
                    <ArrowRightLeft className="w-3.5 h-3.5 text-slate-700" />
                    <span>العروض التفاوضية المقدمة:</span>
                  </div>
                  {task.counterOffers.map((co, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[11px] text-slate-600">
                      <span><strong>{co.workerName}:</strong> {co.notes}</span>
                      <span className="font-mono font-bold text-emerald-700">{co.offeredPriceDzd.toLocaleString()} دج</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions: One-tap apply & Counter-offer */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => onAcceptTask(task.id)}
                  className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{t.polivalente.oneTapAccept} ({task.clientPhone})</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCounterOfferTaskId(task.id);
                    setCounterPrice(task.budgetDzd + 1000);
                  }}
                  className="py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5 text-slate-600" />
                  <span>{t.polivalente.counterOffer}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* POST TASK MODAL (Enforces 1,000 DZD Minimum) */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in duration-200">
            
            <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">نشر مهمة يدوية يومية جديدة</h2>
              <button onClick={() => setIsPostModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  عنوان المهمة:
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="مثال: تفريغ شاحنة مواد بناء، نقل أثاث، تنظيف..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
                />
              </div>

              {/* STRICT 1,000 DZD BUDGET INPUT */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    الميزانية المقترحة (دج):
                  </label>
                  <span className="text-[10px] text-emerald-700 font-bold">
                    الحد الأدنى الإلزامي: 1,000 دج
                  </span>
                </div>
                <input
                  type="number"
                  min="1000"
                  step="100"
                  required
                  value={newBudget}
                  onChange={(e) => setNewBudget(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
                />
                {budgetError && (
                  <p className="text-[11px] text-red-600 mt-1 font-semibold">{budgetError}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    الولاية:
                  </label>
                  <select
                    value={newWilaya}
                    onChange={(e) => setNewWilaya(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
                  >
                    {WILAYAS_58.map(w => (
                      <option key={w.code} value={w.code}>{w.code} - {w.nameAr}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    عدد العمال المطلوبين (الطاقم):
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newCrewTotal}
                    onChange={(e) => setNewCrewTotal(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  العنوان بالتفصيل:
                </label>
                <input
                  type="text"
                  required
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  placeholder="مثال: حي الصنوبر، الشراقة، الجزائر العاصمة"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  العتاد والشاحنات المطلوبة من العامل:
                </label>
                <input
                  type="text"
                  value={newTools}
                  onChange={(e) => setNewTools(e.target.value)}
                  placeholder="مثال: شاحنة باشي صغيرة، حبال، قفازات..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  تفاصيل العمل وشروطه:
                </label>
                <textarea
                  rows={3}
                  required
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="وصف دقيق للحمولة، الأدوار، المصعد، ساعات العمل..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 transition-all shadow-xs cursor-pointer"
              >
                نشر المهمة فورياً في البث المباشر
              </button>
            </form>

          </div>
        </div>
      )}

      {/* COUNTER OFFER NEGOTIATION MODAL */}
      {counterOfferTaskId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in duration-200">
            
            <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">{t.polivalente.counterOffer}</h2>
              <button onClick={() => setCounterOfferTaskId(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendCounterOffer} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  السعر المقترح من طرفك (دج):
                </label>
                <input
                  type="number"
                  min="1000"
                  step="100"
                  required
                  value={counterPrice}
                  onChange={(e) => setCounterPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ملاحظاتك وشرح العرض (مثال: توفر عتاد أو شاحنة):
                </label>
                <textarea
                  rows={3}
                  required
                  value={counterNotes}
                  onChange={(e) => setCounterNotes(e.target.value)}
                  placeholder="مثال: جاهز للالتحاق في خلال 30 دقيقة ومعي شاحنة نقل صغيرة وأحزمة تثبيت."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 transition-all shadow-xs cursor-pointer"
              >
                {t.polivalente.submitOffer}
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
