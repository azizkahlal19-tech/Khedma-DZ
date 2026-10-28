import React, { useState } from 'react';
import { Locale } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { Truck, MapPin, CheckCircle2, Clock, X, Search, ShieldCheck } from 'lucide-react';

interface ParcelTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocale: Locale;
}

export const ParcelTrackerModal: React.FC<ParcelTrackerModalProps> = ({
  isOpen,
  onClose,
  currentLocale
}) => {
  const t = TRANSLATIONS[currentLocale];
  const [trackingNumber, setTrackingNumber] = useState('DZ-FRET-2026-9812');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Truck className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">{t.marketplace.parcelTracker}</h2>
              <p className="text-xs text-slate-700">Réseau Logistique Fret National 58 Wilayas</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          
          {/* Tracking Search Input */}
          <div className="relative">
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="أدخل رقم بوليصة الشحن (e.g. DZ-FRET-...)"
              className="w-full ps-3 pe-10 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-mono text-slate-900"
            />
            <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
          </div>

          {/* Active Freight Card */}
          <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">بوليصة الشحن النشطة</span>
                <span className="text-xs font-mono font-bold text-emerald-400">{trackingNumber}</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[10px] font-semibold border border-emerald-800">
                قيد العبور (En Transit)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs border-t border-slate-800 pt-2">
              <div>
                <span className="text-slate-400 block text-[10px]">مستودع الانطلاق:</span>
                <span className="font-semibold">02 الشلف (Chlef ECDE)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">وجهة التسليم:</span>
                <span className="font-semibold">16 الجزائر (ورشة حيدرة)</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-300 bg-slate-800/60 p-2 rounded-lg flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>موقع الشاحنة الحالي: الطريق السيار شرق-غرب (محول بومدفع - عين الدفلى)</span>
            </div>
          </div>

          {/* Corridor Checkpoints Timeline */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-bold text-slate-900">محطات المسار اللوجستي:</div>
            
            <div className="relative ps-6 space-y-4 before:absolute before:start-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              
              <div className="relative">
                <div className="absolute -start-6 top-1 w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white"></div>
                <div className="text-xs font-bold text-slate-900">تم التحميل من المصنع بالشلف</div>
                <div className="text-[10px] text-slate-700 font-mono">2026-10-27 08:30 · وزن الحمولة 24 طناً</div>
              </div>

              <div className="relative">
                <div className="absolute -start-6 top-1 w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white"></div>
                <div className="text-xs font-bold text-slate-900">عبور نقطة مراقبة عين الدفلى (RN4 / AEO)</div>
                <div className="text-[10px] text-slate-700 font-mono">2026-10-27 10:15 · تأكيد وزن المحاور</div>
              </div>

              <div className="relative">
                <div className="absolute -start-6 top-1 w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-white animate-pulse"></div>
                <div className="text-xs font-bold text-amber-700">في الطريق إلى مدخل العاصمة (محطة بوفاريك)</div>
                <div className="text-[10px] text-slate-700 font-mono">الوقت المتوقع للوصول: 13:45</div>
              </div>

              <div className="relative opacity-60">
                <div className="absolute -start-6 top-1 w-3.5 h-3.5 rounded-full bg-slate-300 border-2 border-white"></div>
                <div className="text-xs font-semibold text-slate-600">التفريغ والتسليم للعميل بحيدرة</div>
                <div className="text-[10px] text-slate-700">تأكيد الرمز السري عند الاستلام</div>
              </div>

            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {t.common.close}
          </button>

        </div>
      </div>
    </div>
  );
};
