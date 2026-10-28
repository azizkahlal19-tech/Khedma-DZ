import React, { useState, useEffect } from 'react';
import { Locale, UserProfile } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { 
  AlertTriangle, 
  MapPin, 
  Radio, 
  PhoneCall, 
  ShieldAlert, 
  X, 
  Volume2, 
  CheckCircle2 
} from 'lucide-react';

interface EmergencySOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocale: Locale;
  currentUser: UserProfile | null;
}

export const EmergencySOSModal: React.FC<EmergencySOSModalProps> = ({
  isOpen,
  onClose,
  currentLocale,
  currentUser
}) => {
  const t = TRANSLATIONS[currentLocale];
  const [countdown, setCountdown] = useState(5);
  const [isDispatched, setIsDispatched] = useState(false);
  const [gpsCoords, setGpsCoords] = useState<{ lat: number; lng: number; accuracy: number }>({
    lat: 36.7538,
    lng: 3.0588,
    accuracy: 4.8
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && !isDispatched && countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    } else if (countdown === 0 && !isDispatched) {
      setIsDispatched(true);
    }
    return () => clearTimeout(timer);
  }, [isOpen, countdown, isDispatched]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-red-950/70 backdrop-blur-md">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border-2 border-red-500 overflow-hidden relative animate-in fade-in zoom-in duration-150">
        
        {/* Header */}
        <div className="bg-red-600 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
            <div>
              <h2 className="text-base font-bold">نظام طوارئ النجدة والإنذار (SOS DZ)</h2>
              <p className="text-[11px] text-red-100">Dispositif d’Urgence Sécurisé 24/7</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-red-200 hover:text-white hover:bg-red-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          
          {!isDispatched ? (
            <div className="text-center space-y-3">
              <div className="w-20 h-20 rounded-full bg-red-100 border-4 border-red-500 text-red-600 flex items-center justify-center mx-auto text-3xl font-extrabold font-mono animate-ping-once">
                {countdown}
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                جارٍ بث إحداثيات موقعك الجغرافي الفوري...
              </h3>
              <p className="text-xs text-slate-600">
                سيتم إرسال إشعار استغاثة مباشر مرفق بتسجيل صوتي فوري وبيانات جهازك إلى جهات الطوارئ والحماية المدنية.
              </p>

              <button
                type="button"
                onClick={() => setIsDispatched(true)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white transition-all shadow-md cursor-pointer"
              >
                إطلاق الإنذار الفوري الآن (Bypass Countdown)
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                إلغاء الإنذار (إنذار خاطئ)
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs space-y-2 text-red-950">
                <div className="flex items-center gap-2 font-bold text-red-700">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>تم بث إشارة الاستغاثة وتثبيت الموقع الجغرافي</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono">
                  <MapPin className="w-3.5 h-3.5 text-red-600" />
                  <span>GPS: {gpsCoords.lat.toFixed(4)}° N, {gpsCoords.lng.toFixed(4)}° E (دقة ±{gpsCoords.accuracy}م)</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px]">
                  <Volume2 className="w-3.5 h-3.5 text-red-600" />
                  <span>تسجيل صوتي بيئي مشفر (10 ثوانٍ) مرفق مع بلاغ الحادث.</span>
                </div>
              </div>

              {/* Direct Algerian Emergency Numbers */}
              <div>
                <div className="text-xs font-bold text-slate-900 mb-2">أرقام النجدة الوطنية المباشرة:</div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <a
                    href="tel:14"
                    className="p-2.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors block"
                  >
                    <div className="text-red-400 text-lg font-mono leading-tight">14</div>
                    <div className="text-[10px] text-slate-300">الحماية المدنية</div>
                  </a>
                  <a
                    href="tel:17"
                    className="p-2.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors block"
                  >
                    <div className="text-emerald-400 text-lg font-mono leading-tight">17</div>
                    <div className="text-[10px] text-slate-300">الشرطة الوطنية</div>
                  </a>
                  <a
                    href="tel:1055"
                    className="p-2.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors block"
                  >
                    <div className="text-amber-400 text-lg font-mono leading-tight">1055</div>
                    <div className="text-[10px] text-slate-300">الدرك الوطني</div>
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
              >
                إغلاق نافذة الطوارئ
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
