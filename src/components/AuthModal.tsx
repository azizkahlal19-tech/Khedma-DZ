import React, { useState, useEffect } from 'react';
import { Locale, Carrier, UserProfile, UserRole } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { 
  Phone, 
  Smartphone, 
  ShieldCheck, 
  CheckCircle2, 
  X, 
  RefreshCw, 
  KeyRound, 
  Zap,
  Cpu
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocale: Locale;
  currentUser: UserProfile | null;
  onLoginSuccess: (user: UserProfile) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentLocale,
  currentUser,
  onLoginSuccess,
  onLogout
}) => {
  const t = TRANSLATIONS[currentLocale];
  const [phoneNumber, setPhoneNumber] = useState('');
  const [carrier, setCarrier] = useState<Carrier>('Unknown');
  const [step, setStep] = useState<'phone' | 'otp' | 'profile'>('phone');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [cooldown, setCooldown] = useState(120);
  const [isCooldownActive, setIsCooldownActive] = useState(false);
  const [simulatedSms, setSimulatedSms] = useState<string | null>(null);
  const [deviceFingerprint, setDeviceFingerprint] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('client');
  const [userName, setUserName] = useState('');
  const [selectedWilaya, setSelectedWilaya] = useState('16');

  // Generate hardware fingerprint on mount
  useEffect(() => {
    const hash = 'ALG-DEV-' + Math.floor(10000000 + Math.random() * 90000000) + '-IMEI';
    setDeviceFingerprint(hash);
  }, []);

  // Carrier Auto-Detection based on Algerian Prefixes (05, 06, 07)
  useEffect(() => {
    const cleaned = phoneNumber.replace(/\s+/g, '');
    if (cleaned.startsWith('05')) {
      setCarrier('Ooredoo');
    } else if (cleaned.startsWith('06')) {
      setCarrier('Mobilis');
    } else if (cleaned.startsWith('07')) {
      setCarrier('Djezzy');
    } else {
      setCarrier('Unknown');
    }
  }, [phoneNumber]);

  // Cooldown countdown timer (120 seconds)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCooldownActive && cooldown > 0) {
      timer = setTimeout(() => setCooldown(c => c - 1), 1000);
    } else if (cooldown === 0) {
      setIsCooldownActive(false);
    }
    return () => clearTimeout(timer);
  }, [isCooldownActive, cooldown]);

  if (!isOpen) return null;

  // Algerian phone regex validator: 05/06/07 followed by 8 digits = 10 digits
  const isPhoneValid = /^0[567][0-9]{8}$/.test(phoneNumber.trim());
  const isSuperAdminPhone = phoneNumber.trim() === '0562788510';

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPhoneValid) return;

    // SUPER ADMIN DIRECT AUTHENTICATION BYPASS PIPELINE
    if (isSuperAdminPhone) {
      const adminUser: UserProfile = {
        id: 'admin-master-001',
        phone: '0562788510',
        carrier: 'Mobilis',
        hardwareFingerprint: 'MASTER-KEY-OVERRIDE-0562788510',
        name: 'المشرف العام للجمهورية (Super Admin)',
        role: 'admin',
        availableRoles: ['admin', 'client', 'worker', 'merchant', 'freelancer'],
        wilayaCode: '16',
        rating: 5.0,
        reviewCount: 999,
        subscription: {
          status: 'active',
          trialStartDate: '2026-01-01',
          trialExpiresAt: '2030-12-31',
          remainingDays: 9999,
          amountDzd: 0,
          amountUsd: 0
        },
        kyc: {
          isVerified: true,
          documentType: 'id_card',
          documentNumber: 'DZ-MINISTRY-STATE-ADM',
          fullName: 'Super Admin Operational Command',
          livenessConfidenceScore: 100
        },
        isSuspended: false,
        walletBalanceDzd: 2500000
      };
      onLoginSuccess(adminUser);
      onClose();
      return;
    }

    // Standard User Flow: Generate 6-digit OTP & trigger 120s cooldown
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setSimulatedSms(`[خدمة ديزاد - Khedma DZ] رمز تأكيد حسابك هو: ${generatedOtp}. صالح لمدة 10 دقائق.`);
    setStep('otp');
    setCooldown(120);
    setIsCooldownActive(true);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val[0];
    const newOtp = [...otpCode];
    newOtp[index] = val;
    setOtpCode(newOtp);

    // Auto advance
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Move to role persona setup
    setStep('profile');
  };

  const handleProfileComplete = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserProfile = {
      id: 'usr-' + Math.floor(1000 + Math.random() * 9000),
      phone: phoneNumber,
      carrier,
      hardwareFingerprint: deviceFingerprint,
      name: userName || (currentLocale === 'ar' ? 'مستخدم جديد' : 'Nouvel Utilisateur'),
      role: selectedRole,
      availableRoles: ['client', selectedRole],
      wilayaCode: selectedWilaya,
      rating: 5.0,
      reviewCount: 0,
      subscription: {
        status: 'trial',
        trialStartDate: new Date().toISOString(),
        trialExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        remainingDays: 30,
        amountDzd: 0,
        amountUsd: 0
      },
      kyc: {
        isVerified: false
      },
      isSuspended: false,
      walletBalanceDzd: 0
    };
    onLoginSuccess(newUser);
    onClose();
  };

  const quickFillAdmin = () => {
    setPhoneNumber('0562788510');
  };

  const quickFillOtpFromSms = () => {
    if (simulatedSms) {
      const match = simulatedSms.match(/\b\d{6}\b/);
      if (match) {
        const digits = match[0].split('');
        setOtpCode(digits);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-sm">
              DZ
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {currentUser ? (currentLocale === 'ar' ? 'الملف الشخصي والاشتراك' : 'Profil & Abonnement') : t.auth.title}
              </h2>
              <p className="text-xs text-slate-700">Khedma DZ Engine</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If Already Logged In */}
        {currentUser ? (
          <div className="p-6 space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-700">{t.common.role}:</span>
                <span className="text-xs font-bold uppercase px-2 py-0.5 rounded-sm bg-emerald-100 text-emerald-950 font-mono">
                  {currentUser.role}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-700">{t.auth.phoneLabel}:</span>
                <span className="text-xs font-mono font-bold text-slate-900">{currentUser.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-700">{t.auth.detectedCarrier}</span>
                <span className="text-xs font-semibold text-emerald-700">{currentUser.carrier}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-700">الاشتراك (30-Day Engine):</span>
                <span className="text-xs font-semibold text-emerald-700">
                  {currentUser.subscription.status === 'trial' ? `فترة تجريبية (${currentUser.subscription.remainingDays} يوم)` : 'اشتراك مفعّل'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-700">بصمة العتاد (IMEI):</span>
                <span className="text-[10px] font-mono text-slate-700 truncate max-w-[200px]">{currentUser.hardwareFingerprint}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onLogout();
                setStep('phone');
                setPhoneNumber('');
              }}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors cursor-pointer"
            >
              {t.common.logout}
            </button>
          </div>
        ) : (
          <div className="p-6">
            
            {/* Simulated Push SMS Banner on Top */}
            {simulatedSms && step === 'otp' && (
              <div 
                onClick={quickFillOtpFromSms}
                className="mb-4 p-3 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-700 text-xs flex items-center justify-between cursor-pointer hover:bg-slate-800 transition-colors"
                title="اضغط لتعبئة الرمز تلقائياً"
              >
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-[11px] leading-tight">{simulatedSms}</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold shrink-0 underline ml-2">تعبئة</span>
              </div>
            )}

            {/* STEP 1: Algerian Mobile Input */}
            {step === 'phone' && (
              <form onSubmit={handlePhoneSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.auth.phoneLabel}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder={t.auth.placeholder}
                      maxLength={10}
                      className="w-full ps-10 pe-24 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-mono tracking-wider text-slate-900"
                      autoFocus
                    />
                    
                    {/* Carrier Badge inside input */}
                    <div className="absolute inset-y-0 end-0 flex items-center pe-2">
                      {carrier === 'Mobilis' && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                          Mobilis 06
                        </span>
                      )}
                      {carrier === 'Ooredoo' && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-red-100 text-red-800 border border-red-200">
                          Ooredoo 05
                        </span>
                      )}
                      {carrier === 'Djezzy' && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
                          Djezzy 07
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-700">
                    {currentLocale === 'ar' 
                      ? 'أدخل 10 أرقام تبدأ بـ 05، 06، أو 07. بدون الرمز الدولي +213.'
                      : 'Numéro à 10 chiffres débutant par 05, 06, ou 07.'}
                  </p>
                </div>

                {/* Device Fingerprint Information */}
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-[11px] text-slate-700">
                  <span className="flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-slate-700" />
                    {t.auth.imeiLock}
                  </span>
                  <span className="font-mono text-slate-700 font-semibold">{deviceFingerprint}</span>
                </div>

                {/* Submit Phone Button */}
                <button
                  type="submit"
                  disabled={!isPhoneValid}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2 ${
                    isPhoneValid
                      ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <KeyRound className="w-4 h-4" />
                  <span>
                    {isSuperAdminPhone 
                      ? (currentLocale === 'ar' ? 'تجاوز المشرف العام (Direct Bypass)' : 'Super Admin Direct Bypass') 
                      : (currentLocale === 'ar' ? 'إرسال رمز التحقق OTP' : 'Envoyer le code OTP')}
                  </span>
                </button>

                {/* Admin Quick Fill Helper */}
                <div className="pt-2 border-t border-slate-100 text-center">
                  <button
                    type="button"
                    onClick={quickFillAdmin}
                    className="text-[11px] text-amber-800 hover:text-amber-950 font-medium underline cursor-pointer"
                  >
                    {t.auth.adminBypassHint}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: 6-Digit OTP Verification */}
            {step === 'otp' && (
              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div className="text-center">
                  <h3 className="text-sm font-bold text-slate-900 mb-1">{t.auth.enterOtp}</h3>
                  <p className="text-xs text-slate-700">
                    {currentLocale === 'ar' 
                      ? `تم إرسال رسالة SMS إلى الرقم ${phoneNumber}`
                      : `Code envoyé par SMS au ${phoneNumber}`}
                  </p>
                </div>

                {/* 6 Digit Inputs */}
                <div className="flex justify-center gap-2" dir="ltr">
                  {otpCode.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-input-${i}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      className="w-11 h-12 text-center text-lg font-bold font-mono bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
                    />
                  ))}
                </div>

                {/* Cooldown Timer */}
                <div className="text-center text-xs text-slate-700">
                  {isCooldownActive ? (
                    <span>
                      {t.auth.resendOtp} <strong className="font-mono text-emerald-700">{cooldown}</strong> {t.auth.seconds}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
                        setSimulatedSms(`[خدمة ديزاد - Khedma DZ] رمز تأكيد حسابك الجديد هو: ${newOtp}`);
                        setCooldown(120);
                        setIsCooldownActive(true);
                      }}
                      className="text-emerald-700 font-semibold underline hover:text-emerald-800 cursor-pointer"
                    >
                      {currentLocale === 'ar' ? 'إعادة إرسال الرمز الآن' : 'Renvoyer le code maintenant'}
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={otpCode.some(d => !d)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                    !otpCode.some(d => !d)
                      ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {t.auth.verifyButton}
                </button>
              </form>
            )}

            {/* STEP 3: Persona / Role Setup */}
            {step === 'profile' && (
              <form onSubmit={handleProfileComplete} className="space-y-4">
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{t.auth.trialNotice}</h3>
                  <p className="text-xs text-slate-700 mt-0.5">
                    {currentLocale === 'ar' ? 'اختر صفتك الرئيسية في المنصة' : 'Choisissez votre profil d’utilisation'}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {currentLocale === 'ar' ? 'الاسم الكامل أو اسم المؤسسة' : 'Nom complet ou Entreprise'}
                  </label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="مثال: يوسف قادري / SARL Alger Matériaux"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {currentLocale === 'ar' ? 'الصفة الرئيسية (Persona)' : 'Rôle Principal'}
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setSelectedRole('client')}
                      className={`p-2.5 rounded-xl border text-start transition-all cursor-pointer ${
                        selectedRole === 'client' 
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-xs' 
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-semibold">{t.common.client}</div>
                      <div className="text-[10px] text-slate-700 font-normal">طلب خدمات، شراء، ونشر مهام</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedRole('worker')}
                      className={`p-2.5 rounded-xl border text-start transition-all cursor-pointer ${
                        selectedRole === 'worker' 
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-xs' 
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-semibold">{t.common.worker}</div>
                      <div className="text-[10px] text-slate-700 font-normal">سباكة، كهرباء، بناء، وميكانيك</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedRole('merchant')}
                      className={`p-2.5 rounded-xl border text-start transition-all cursor-pointer ${
                        selectedRole === 'merchant' 
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-xs' 
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-semibold">{t.common.merchant}</div>
                      <div className="text-[10px] text-slate-700 font-normal">بيع مواد البناء بالجملة والتجزئة</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedRole('freelancer')}
                      className={`p-2.5 rounded-xl border text-start transition-all cursor-pointer ${
                        selectedRole === 'freelancer' 
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-xs' 
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-semibold">{t.common.freelancer}</div>
                      <div className="text-[10px] text-slate-700 font-normal">برمجة، تصميم، ترجمة وفيديو</div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.common.selectWilaya}
                  </label>
                  <select
                    value={selectedWilaya}
                    onChange={(e) => setSelectedWilaya(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
                  >
                    <option value="16">16 - الجزائر (Alger)</option>
                    <option value="31">31 - وهران (Oran)</option>
                    <option value="25">25 - قسنطينة (Constantine)</option>
                    <option value="19">19 - سطيف (Sétif)</option>
                    <option value="09">09 - البليدة (Blida)</option>
                    <option value="06">06 - بجاية (Béjaïa)</option>
                    <option value="15">15 - تيزي وزو (Tizi Ouzou)</option>
                    <option value="23">23 - عنابة (Annaba)</option>
                    <option value="30">30 - ورقلة (Ouargla)</option>
                    <option value="07">07 - بسكرة (Biskra)</option>
                    <option value="47">47 - غرداية (Ghardaïa)</option>
                    <option value="01">01 - أدرار (Adrar)</option>
                    <option value="58">58 - عين قزام (In Guezzam)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 transition-all shadow-xs cursor-pointer"
                >
                  {currentLocale === 'ar' ? 'بدء الاستخدام وتفعيل الشهر المجاني' : 'Démarrer & Activer le mois gratuit'}
                </button>
              </form>
            )}

          </div>
        )}
      </div>
    </div>
  );
};
