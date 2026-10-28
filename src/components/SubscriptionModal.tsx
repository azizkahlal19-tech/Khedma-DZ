import React, { useState } from 'react';
import { Locale, UserProfile } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { 
  CreditCard, 
  Clock, 
  ShieldCheck, 
  Copy, 
  Check, 
  Upload, 
  X, 
  Building2, 
  Wallet,
  AlertCircle
} from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocale: Locale;
  currentUser: UserProfile | null;
  onPaymentSubmitted: (reference: string, type: 'redotpay' | 'ccp' | 'baridimob') => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  currentLocale,
  currentUser,
  onPaymentSubmitted
}) => {
  const t = TRANSLATIONS[currentLocale];
  const [selectedMethod, setSelectedMethod] = useState<'redotpay' | 'ccp' | 'baridimob'>('redotpay');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [receiptTxId, setReceiptTxId] = useState('');
  const [isSuccessSubmitted, setIsSuccessSubmitted] = useState(false);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = receiptTxId || (selectedMethod === 'redotpay' ? 'RP-' + Date.now() : 'CCP-' + Math.floor(100000 + Math.random() * 900000));
    onPaymentSubmitted(ref, selectedMethod);
    setIsSuccessSubmitted(true);
    setTimeout(() => {
      setIsSuccessSubmitted(false);
      onClose();
    }, 2000);
  };

  const remainingDays = currentUser?.subscription.remainingDays ?? 30;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Clock className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {currentLocale === 'ar' ? 'نظام الاشتراكات وبوابات الدفع الوطنية' : 'Abonnement & Passerelles de Paiement'}
              </h2>
              <p className="text-xs text-slate-700">Khedma DZ Billing Engine</p>
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
          
          {/* 30-Day Free Trial Monitor & Remaining Time */}
          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {t.common.trialBadge}
              </span>
              <span className="text-xs font-mono bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-sm">
                {remainingDays} {t.common.daysRemaining}
              </span>
            </div>
            <p className="text-xs text-slate-300">
              {currentLocale === 'ar'
                ? 'بعد انتهاء الـ 30 يوماً التجريبية، تبلغ رسوم الاشتراك الرمزية 1 دولار شهرياً (أو ما يعادلها 250 دج) للحفاظ على جميع ميزات المنصة.'
                : 'Après l’essai gratuit de 30 jours, l’abonnement est de 1 $/mois (ou 250 DZD) pour un accès illimité.'}
            </p>
            {remainingDays <= 3 && (
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold bg-amber-950/40 p-2 rounded-lg border border-amber-800/40">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>تنبيه النظام: تبقى أقل من 3 أيام قبل الدخول في فترة السماح (Grace Period 72h).</span>
              </div>
            )}
          </div>

          {/* Payment Gateway Options Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              {currentLocale === 'ar' ? 'اختر بوابة الدفع المعتمدة' : 'Sélectionnez le mode de paiement'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedMethod('redotpay')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  selectedMethod === 'redotpay'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Wallet className="w-5 h-5 mx-auto mb-1 text-emerald-700" />
                <div className="text-xs">RedotPay</div>
                <div className="text-[10px] text-slate-700 font-mono">1.00 USD</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('baridimob')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  selectedMethod === 'baridimob'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <CreditCard className="w-5 h-5 mx-auto mb-1 text-emerald-700" />
                <div className="text-xs">بريدي موب</div>
                <div className="text-[10px] text-slate-700 font-mono">250 DZD</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('ccp')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  selectedMethod === 'ccp'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Building2 className="w-5 h-5 mx-auto mb-1 text-emerald-700" />
                <div className="text-xs">بريد الجزائر CCP</div>
                <div className="text-[10px] text-slate-700 font-mono">250 DZD</div>
              </button>
            </div>
          </div>

          {/* Method Specific Details & Hardcoded Credentials */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs">
            {selectedMethod === 'redotpay' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">RedotPay Primary Receiver Wallet:</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('1392637804', 'redotpay')}
                    className="flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-mono font-bold cursor-pointer"
                  >
                    <span>1392637804</span>
                    {copiedKey === 'redotpay' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-700">
                  تحويل مباشر فوري عبر معرّف المحفظة الرقمية الدولية RedotPay (USDT / USD). التفعيل يتم فورياً بفضل الـ Webhook.
                </p>
              </div>
            )}

            {selectedMethod === 'baridimob' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">الرقم الوطني المصرفي (RIB):</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('007 999990025937263 71', 'rib')}
                    className="flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-mono font-bold cursor-pointer"
                  >
                    <span>007 999990025937263 71</span>
                    {copiedKey === 'rib' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-700">
                  قم بإجراء تحويل بمبلغ 250 دج عبر تطبيق BaridiMob باستخدام الـ RIP المذكور أعلاه، ثم أدخل رقم المعاملة أدناه.
                </p>
              </div>
            )}

            {selectedMethod === 'ccp' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">حساب CCP بريد الجزائر:</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('0025937263 71', 'ccp')}
                    className="flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-mono font-bold cursor-pointer"
                  >
                    <span>0025937263 Clé 71</span>
                    {copiedKey === 'ccp' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-700">
                  دفع وصل الحوالة البريدية بقيمة 250 دج في أي مكتب بريدي عبر الـ 58 ولاية وإرفاق رقم الوصل للمطابقة السريعة.
                </p>
              </div>
            )}

            {/* Transaction Reference Input */}
            <div className="pt-2 border-t border-slate-200">
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                رقم العملية / Transaction Reference:
              </label>
              <input
                type="text"
                value={receiptTxId}
                onChange={(e) => setReceiptTxId(e.target.value)}
                placeholder={selectedMethod === 'redotpay' ? 'RP-1392637804-XXXX' : 'BM-XXXXXXXXXX أو رقم وصل CCP'}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-mono text-slate-900"
              />
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="button"
            onClick={handleConfirmPayment}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
          >
            {isSuccessSubmitted ? (
              <>
                <Check className="w-4 h-4" />
                <span>تم إرسال إشعار الدفع بنجاح للنظام</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>تأكيد التحويل وتفعيل الاشتراك السنوي/الشهري</span>
              </>
            )}
          </button>

          {/* Grace period notice */}
          <div className="text-[11px] text-slate-700 text-center">
            فترة سماح تشغيلية لمدة 72 ساعة (Grace Period) تضمن استمرار الولوج للقراءة والفواتير في حال تأخر الدفع.
          </div>

        </div>
      </div>
    </div>
  );
};
