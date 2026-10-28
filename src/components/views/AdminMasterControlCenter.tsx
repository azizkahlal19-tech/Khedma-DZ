import React, { useState } from 'react';
import { Locale, PaymentProof, DisputeRecord } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { WILAYAS_58 } from '../../data/wilayas';
import { INITIAL_PAYMENT_PROOFS, INITIAL_DISPUTES } from '../../data/mockData';
import { 
  ShieldAlert, 
  Wallet, 
  CreditCard, 
  CheckCircle2, 
  XCircle, 
  Users, 
  DollarSign, 
  Building2, 
  AlertTriangle, 
  RefreshCw,
  Search,
  Lock,
  Unlock,
  Check,
  TrendingUp,
  MapPin
} from 'lucide-react';

interface AdminMasterControlCenterProps {
  currentLocale: Locale;
}

export const AdminMasterControlCenter: React.FC<AdminMasterControlCenterProps> = ({
  currentLocale
}) => {
  const t = TRANSLATIONS[currentLocale];
  const [activeTab, setActiveTab] = useState<'overview' | 'verification_queue' | 'escrow_disputes' | 'wilayas_density'>('overview');
  
  // Hardcoded RedotPay Gateway Tracker
  const [redotPayBalance, setRedotPayBalance] = useState({
    receiverWallet: '1392637804',
    balanceUsd: 14892.40,
    balanceUsdt: 14892.40,
    lastRefreshed: 'منذ دقيقة واحدة'
  });

  // Verification queue state
  const [paymentProofs, setPaymentProofs] = useState<PaymentProof[]>(INITIAL_PAYMENT_PROOFS);
  
  // Escrow disputes state
  const [disputes, setDisputes] = useState<DisputeRecord[]>(INITIAL_DISPUTES);
  const [releasedDisputes, setReleasedDisputes] = useState<string[]>([]);
  
  // User freeze state simulation
  const [frozenUsers, setFrozenUsers] = useState<string[]>([]);

  // Wilaya search
  const [wilayaSearch, setWilayaSearch] = useState('');

  const handleApprovePayment = (id: string) => {
    setPaymentProofs(prev =>
      prev.map(p => (p.id === id ? { ...p, status: 'approved' } : p))
    );
  };

  const handleRejectPayment = (id: string) => {
    setPaymentProofs(prev =>
      prev.map(p => (p.id === id ? { ...p, status: 'rejected' } : p))
    );
  };

  const handleForceReleaseEscrow = (disputeId: string) => {
    setReleasedDisputes(prev => [...prev, disputeId]);
    setDisputes(prev =>
      prev.map(d => (d.id === disputeId ? { ...d, status: 'manual_override' } : d))
    );
  };

  const handleToggleFreezeUser = (userId: string) => {
    if (frozenUsers.includes(userId)) {
      setFrozenUsers(frozenUsers.filter(u => u !== userId));
    } else {
      setFrozenUsers([...frozenUsers, userId]);
    }
  };

  const filteredWilayas = WILAYAS_58.filter(w =>
    w.nameAr.includes(wilayaSearch) ||
    w.nameFr.toLowerCase().includes(wilayaSearch.toLowerCase()) ||
    w.code.includes(wilayaSearch)
  );

  return (
    <div className="space-y-6">
      
      {/* Super Admin Control Center Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950 text-red-400 text-xs font-bold border border-red-800">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{t.admin.phoneBypassActive}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t.admin.title}
            </h1>
            <p className="text-xs text-slate-400">
              {t.admin.subtitle}
            </p>
          </div>

          {/* Integrated RedotPay Live Balance Tracker */}
          <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-1 min-w-[240px]">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{t.admin.redotPayBalance}</span>
              <RefreshCw className="w-3 h-3 text-slate-400 hover:text-white cursor-pointer" />
            </div>
            <div className="text-xl font-black font-mono text-emerald-400">
              ${redotPayBalance.balanceUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              محفظة النظام المركزية: <strong>1392637804</strong> (USDT/Card Rails)
            </div>
          </div>
        </div>

        {/* Hardcoded Credentials Quick Strip */}
        <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-mono">
          <div>
            <span className="text-slate-500 font-sans">{t.admin.ccpCreds}:</span>{' '}
            <strong className="text-white">0025937263 Clé 71</strong>
          </div>
          <div>
            <span className="text-slate-500 font-sans">{t.admin.ribCreds}:</span>{' '}
            <strong className="text-white">007 999990025937263 71</strong>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-xs flex items-center gap-1.5 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all font-bold cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          نظرة عامة على الإيرادات (Revenue Telemetry)
        </button>

        <button
          onClick={() => setActiveTab('verification_queue')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all font-bold cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'verification_queue'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span>طابور تدقيق الإيصالات</span>
          {paymentProofs.filter(p => p.status === 'pending').length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-mono text-[10px] font-bold">
              {paymentProofs.filter(p => p.status === 'pending').length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('escrow_disputes')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all font-bold cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'escrow_disputes'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span>فض نزاعات الضمان (Escrow Overrides)</span>
          <span className="px-1.5 py-0.2 rounded-full bg-red-500 text-white font-mono text-[10px] font-bold">
            {disputes.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('wilayas_density')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all font-bold cursor-pointer ${
            activeTab === 'wilayas_density'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          خريطة كثافة الـ 58 ولاية (58 Wilayas Matrix)
        </button>
      </div>

      {/* TAB 1: OVERVIEW & REVENUE ANALYTICS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metric Gauges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs text-slate-700 block font-semibold">{t.admin.stats.activeTrials}</span>
              <div className="text-2xl font-black font-mono text-emerald-700">48,290</div>
              <div className="text-[11px] text-slate-700">تحديث فوري عبر محرك الـ 30 يوماً</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs text-slate-700 block font-semibold">{t.admin.stats.paidSubscribers}</span>
              <div className="text-2xl font-black font-mono text-slate-900">14,892</div>
              <div className="text-[11px] text-emerald-800 font-semibold font-mono">+12.4% هذا الشهر</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs text-slate-700 block font-semibold">{t.admin.stats.totalRevenueDzd}</span>
              <div className="text-2xl font-black font-mono text-emerald-700">3,723,000 دج</div>
              <div className="text-[11px] text-slate-700">ما يعادل $14,892 USD</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs text-slate-700 block font-semibold">{t.admin.stats.disputedEscrow}</span>
              <div className="text-2xl font-black font-mono text-amber-800">45,000 دج</div>
              <div className="text-[11px] text-amber-900">ملف نزاع نشط في البويرة</div>
            </div>

          </div>

          {/* Quick Override Controls Strip */}
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              أدوات الإشراف الفوري (Instant Overrides Engine):
            </h3>
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <button
                type="button"
                onClick={() => handleToggleFreezeUser('usr-flagged-001')}
                className={`py-2 px-3 rounded-xl font-bold border transition-colors cursor-pointer flex items-center gap-1.5 ${
                  frozenUsers.includes('usr-flagged-001')
                    ? 'bg-red-700 text-white border-red-800'
                    : 'bg-white text-red-600 border-red-200 hover:bg-red-50'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>
                  {frozenUsers.includes('usr-flagged-001') ? 'إلغاء تجميد الحساب المشبوه' : 'تجميد حساب مشبوه (Freeze Account)'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => alert('تم إفراغ الذاكرة المؤقتة (Cache Cleaned) وضبط الفهارس بنجاح.')}
                className="py-2 px-3 rounded-xl font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                تنظيف كاش وقواعد بيانات النظام (VACUUM ANALYZE)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MANUAL PAYMENT PROOF VERIFICATION QUEUE */}
      {activeTab === 'verification_queue' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">{t.admin.verificationQueue}</h2>
              <p className="text-xs text-slate-700">
                تدقيق إيصالات الحوالات البريدية CCP وتطبيقات بريدي موب ومطابقتها بضغطة زر.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {paymentProofs.map(proof => (
              <div
                key={proof.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={proof.receiptImageUrl}
                    alt="Receipt Screenshot"
                    className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{proof.userName}</span>
                      <span className="font-mono text-slate-700">({proof.userPhone})</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-800 font-mono uppercase text-[10px]">
                        {proof.type}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-700">
                      رقم العملية المستخرج بالـ OCR:{' '}
                      <strong className="font-mono text-slate-900">{proof.extractedOcr.referenceNo}</strong>
                    </div>

                    <div className="text-[11px] text-slate-700">
                      الحساب المستهدف: <strong className="font-mono">{proof.extractedOcr.accountTarget}</strong> · المبلغ:{' '}
                      <strong className="font-mono text-emerald-700 font-bold">{proof.amountDzd} دج</strong>
                    </div>
                  </div>
                </div>

                {/* Status & Action */}
                <div className="flex items-center gap-2 shrink-0">
                  {proof.status === 'pending' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleApprovePayment(proof.id)}
                        className="py-1.5 px-3 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>قبول وتفعيل</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRejectPayment(proof.id)}
                        className="py-1.5 px-3 rounded-xl text-xs font-bold bg-red-100 text-red-700 hover:bg-red-200 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>رفض</span>
                      </button>
                    </>
                  ) : proof.status === 'approved' ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                      <Check className="w-3.5 h-3.5" />
                      <span>تم الاعتماد والتفعيل</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-red-700 bg-red-100 px-3 py-1 rounded-full">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>مرفوض</span>
                    </span>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ESCROW DISPUTES & MANUAL OVERRIDE */}
      {activeTab === 'escrow_disputes' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">
              ملفات النزاع المعلقة والإفراج اليدوي عن أموال الضمان (Escrow Overrides)
            </h2>
            <p className="text-xs text-slate-700">
              يحق للمشرف العام فقط الإفراج القسري عن أموال المشاريع المحتجزة للطرف المتضرر بعد فحص الإثباتات.
            </p>
          </div>

          <div className="space-y-4">
            {disputes.map(dispute => {
              const isOverridden = releasedDisputes.includes(dispute.id);

              return (
                <div
                  key={dispute.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3 text-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{dispute.contractTitle}</h3>
                      <span className="text-[11px] text-slate-700 font-mono">
                        الملف: {dispute.id} · العميل: {dispute.clientName} · الحرفي: {dispute.workerName}
                      </span>
                    </div>

                    <div className="text-start sm:text-end">
                      <span className="text-sm font-extrabold font-mono text-emerald-700 block">
                        {dispute.amountInEscrowDzd.toLocaleString()} دج
                      </span>
                      <span className="text-[10px] text-amber-800 font-semibold">محتجز في الخزينة المركزية</span>
                    </div>
                  </div>

                  <p className="text-slate-800 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                    <strong>سبب النزاع المرفوع:</strong> {dispute.reason}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <div className="text-[11px] text-slate-700">
                      تاريخ رفع النزاع: {dispute.filedAt}
                    </div>

                    {isOverridden ? (
                      <span className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>تم الإفراج اليدوي للمستفيد (Escrow Released)</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleForceReleaseEscrow(dispute.id)}
                        className="py-2 px-4 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Unlock className="w-3.5 h-3.5" />
                        <span>{t.admin.releaseEscrow}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: 58 WILAYAS GEOGRAPHICAL TRAFFIC & DENSITY */}
      {activeTab === 'wilayas_density' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">{t.admin.trafficDensity}</h2>
              <p className="text-xs text-slate-700">
                متابعة حركة المستخدمين المسجلين، الوظائف النشطة، وتوزيع السلع عبر كامل التراب الوطني.
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={wilayaSearch}
                onChange={(e) => setWilayaSearch(e.target.value)}
                placeholder="ابحث برقم أو اسم الولاية..."
                className="w-full ps-9 pe-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white text-slate-900"
              />
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 text-slate-400">
                <Search className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Wilayas Density Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3 text-start">الرمز</th>
                  <th className="py-2.5 px-3 text-start">اسم الولاية</th>
                  <th className="py-2.5 px-3 text-start">المنطقة اللوجستية</th>
                  <th className="py-2.5 px-3 text-start">الأولوية الحرفية</th>
                  <th className="py-2.5 px-3 text-start">المستخدمون النشطون</th>
                  <th className="py-2.5 px-3 text-start">المهام اليومية</th>
                  <th className="py-2.5 px-3 text-start">مؤشر النشاط</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {filteredWilayas.map(w => (
                  <tr key={w.code} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-800">{w.code}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-900">
                      {w.nameAr} <span className="text-slate-600 font-normal">({w.nameFr})</span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-700">{w.logisticsCorridor}</td>
                    <td className="py-2.5 px-3 text-slate-800 text-[11px] max-w-[220px] truncate" title={w.tradePriority}>
                      {w.tradePriority}
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900">{w.activeUsers.toLocaleString()}</td>
                    <td className="py-2.5 px-3 font-mono text-emerald-800 font-bold">{w.activeJobs}</td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-16 h-2 rounded-full bg-slate-200 overflow-hidden">
                          <div 
                            className="h-full bg-emerald-600 rounded-full" 
                            style={{ width: `${w.densityScore}%` }}
                          ></div>
                        </div>
                        <span className="font-mono text-[10px] text-slate-700">{w.densityScore}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
