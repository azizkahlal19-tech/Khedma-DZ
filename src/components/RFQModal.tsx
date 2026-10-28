import React, { useState } from 'react';
import { Locale } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { FileSpreadsheet, Send, X, CheckCircle2, Building, MapPin } from 'lucide-react';
import { WILAYAS_58 } from '../data/wilayas';

interface RFQModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocale: Locale;
}

export const RFQModal: React.FC<RFQModalProps> = ({
  isOpen,
  onClose,
  currentLocale
}) => {
  const t = TRANSLATIONS[currentLocale];
  const [projectTitle, setProjectTitle] = useState('');
  const [wilayaCode, setWilayaCode] = useState('16');
  const [deliveryDeadline, setDeliveryDeadline] = useState('خلال 7 أيام');
  const [materialsList, setMaterialsList] = useState(
    '1. إسمنت CPA 42.5: 400 كيس 50 كغ\n2. حديد تسليح FeE500 قطري 12 مم: 4 أطنان\n3. آجر أحمر 8 ثقوب: 3000 قطعة\n4. رمل وادي الباطنة مغسول: 25 متر مكعب'
  );
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">{t.marketplace.rfqTitle}</h2>
              <p className="text-xs text-slate-700">Request For Quote (RFQ) - B2B Construction Portal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSent ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              تم بث طلب عرض الأسعار بنجاح!
            </h3>
            <p className="text-xs text-slate-700">
              تم إشعار 18 تاجراً ومورداً معتمداً في الولاية {wilayaCode}. ستصلك عروض الأسعار المفصلة عبر مركز الرسائل.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                اسم المشروع / الورشة:
              </label>
              <input
                type="text"
                required
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="مثال: مشروع بناء فيلا سكنية R+2 بالشراقة"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  الولاية المستهدفة:
                </label>
                <select
                  value={wilayaCode}
                  onChange={(e) => setWilayaCode(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
                >
                  {WILAYAS_58.map(w => (
                    <option key={w.code} value={w.code}>
                      {w.code} - {w.nameAr} ({w.nameFr})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  مهلة التوريد القصوى:
                </label>
                <select
                  value={deliveryDeadline}
                  onChange={(e) => setDeliveryDeadline(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
                >
                  <option value="خلال 48 ساعة">خلال 48 ساعة (عاجل جداً)</option>
                  <option value="خلال 7 أيام">خلال 7 أيام</option>
                  <option value="خلال 15 يوماً">خلال 15 يوماً</option>
                  <option value="توريد أسبوعي مجدول">توريد أسبوعي مجدول</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                جدول المواد والكميات المطلوبة:
              </label>
              <textarea
                required
                rows={5}
                value={materialsList}
                onChange={(e) => setMaterialsList(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-mono text-slate-900"
              />
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 flex items-center gap-2">
              <Building className="w-4 h-4 shrink-0 text-amber-700" />
              <span>يتيح هذا النموذج للتجار تقديم عروض أسعار تنافسية مع تفاصيل النقل والتفريغ في الورشة.</span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>بث طلب الأسعار لجميع موردي ومصانع الولاية</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
