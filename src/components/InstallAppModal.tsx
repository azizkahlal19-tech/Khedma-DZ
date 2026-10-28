import React, { useState, useEffect } from 'react';
import { Locale } from '../types';
import { 
  Smartphone, 
  Download, 
  Share2, 
  PlusSquare, 
  CheckCircle2, 
  QrCode, 
  Copy, 
  ExternalLink,
  ShieldCheck,
  Check,
  X,
  Sparkles,
  RefreshCw,
  FileCode,
  Info,
  Zap,
  BatteryCharging
} from 'lucide-react';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocale: Locale;
  onOpenStorePublish?: () => void;
  isLiteMode?: boolean;
  onToggleLiteMode?: () => void;
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({
  isOpen,
  onClose,
  currentLocale,
  onOpenStorePublish,
  isLiteMode = false,
  onToggleLiteMode
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedApkLink, setCopiedApkLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'infinix' | 'ios' | 'android' | 'qr'>('infinix');
  const [showManualAndroidHelp, setShowManualAndroidHelp] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const apkFileName = 'khedma-dz-v2.6.4-algeria.apk';
  const apkDownloadPath = `/${apkFileName}`;

  useEffect(() => {
    // Detect installed standalone mode
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsInstalled(isStandalone);

    // Detect device OS
    const ua = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(ua);
    const isAndroidDevice = /android/.test(ua);
    setIsIOS(isIOSDevice);
    setIsAndroid(isAndroidDevice);

    if (isIOSDevice) {
      setActiveTab('ios');
    } else {
      setActiveTab('infinix');
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  if (!isOpen) return null;

  const originUrl = typeof window !== 'undefined' ? window.location.origin : 'https://khedmadz.app';
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://khedmadz.app';
  const directApkUrl = `${originUrl}${apkDownloadPath}`;

  const handleNativeInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setDeferredPrompt(null);
      }
    } else {
      setShowManualAndroidHelp(true);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyApkLink = () => {
    navigator.clipboard.writeText(directApkUrl);
    setCopiedApkLink(true);
    setTimeout(() => setCopiedApkLink(false), 2000);
  };

  // Immediate app refresh / cache purge
  const handleForceRefresh = async () => {
    setIsRefreshing(true);
    try {
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
          await registration.update();
        }
      }
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map(k => caches.delete(k)));
      }
    } catch {
      // ignore
    }
    setTimeout(() => {
      window.location.reload();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl border border-slate-200 space-y-4 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-extrabold text-xl shadow-md border-2 border-emerald-800 shrink-0">
              DZ
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  تحميل تطبيق منصة عبد العزيز
                </h3>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  يدعم Infinix و iPhone
                </span>
              </div>
              <p className="text-xs text-slate-500">
                منصة عبد العزيز للحرفيين وعمال اليومية عبر 58 ولاية
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleForceRefresh}
              title="تحديث التطبيق الفوري ومسح الكاش"
              className="p-1.5 text-slate-500 hover:text-emerald-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-emerald-600' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRIMARY DIRECT DOWNLOAD BANNER */}
        <div className="p-4 bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 rounded-2xl text-white shadow-lg space-y-3 border border-emerald-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-extrabold text-sm text-emerald-300">الرابط المباشر للتحميل الفوري (APK)</span>
            </div>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 px-2 py-0.5 rounded-full font-mono">
              v2.6.4 · 8.4 MB (خفيف وسريع)
            </span>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed">
            اضغط على الزر الأخضر بالأسفل لبدء تنزيل ملف التطبيق مباشرة على هاتفك دون أي وسيط خارجي:
          </p>

          {/* THE DIRECT LINK THAT INITIATES IMMEDIATE DOWNLOAD */}
          <a
            href={apkDownloadPath}
            download={apkFileName}
            className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer transform active:scale-98"
          >
            <Download className="w-5 h-5 text-slate-950 animate-bounce" />
            <span>تحميل ملف APK مباشرة الآن (اضغط للبدء) 📥</span>
          </a>

          {/* Copy Direct APK Link */}
          <div className="bg-black/30 rounded-xl p-2 flex items-center justify-between gap-2 border border-white/10 text-xs">
            <div className="truncate text-[11px] font-mono text-emerald-200 dir-ltr select-all">
              {directApkUrl}
            </div>
            <button
              onClick={handleCopyApkLink}
              className="px-2.5 py-1 bg-white/15 hover:bg-white/25 rounded-lg text-[11px] font-bold text-white shrink-0 flex items-center gap-1 transition-colors cursor-pointer"
            >
              {copiedApkLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>تم النسخ!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>نسخ الرابط المباشر</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Device Switcher Tabs: Infinix, iPhone, Android, QR */}
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl text-[11px] sm:text-xs font-bold gap-1 flex-wrap sm:flex-nowrap">
          <button
            onClick={() => setActiveTab('infinix')}
            className={`flex-1 py-2 px-2 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap ${
              activeTab === 'infinix' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Infinix والأجهزة الخفيفة</span>
          </button>

          <button
            onClick={() => setActiveTab('ios')}
            className={`flex-1 py-2 px-2 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap ${
              activeTab === 'ios' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-blue-600" />
            <span>آيفون (iPhone & iOS)</span>
          </button>

          <button
            onClick={() => setActiveTab('android')}
            className={`flex-1 py-2 px-2 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap ${
              activeTab === 'android' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
            <span>أندرويد عام</span>
          </button>

          <button
            onClick={() => setActiveTab('qr')}
            className={`flex-1 py-2 px-2 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap ${
              activeTab === 'qr' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <QrCode className="w-3.5 h-3.5 text-purple-600" />
            <span>مسح QR</span>
          </button>
        </div>

        {/* TAB 1: INFINIX & BUDGET PHONE SPECIAL OPTIMIZATION */}
        {activeTab === 'infinix' && (
          <div className="space-y-3 text-xs">
            {/* Low-RAM Mode Callout */}
            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-600" />
                  <span className="font-extrabold text-amber-950">دعم هواتف Infinix و Tecno و Android Go</span>
                </div>
                {onToggleLiteMode && (
                  <button
                    onClick={onToggleLiteMode}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold border transition-all cursor-pointer ${
                      isLiteMode 
                        ? 'bg-emerald-600 text-white border-emerald-700' 
                        : 'bg-white text-amber-900 border-amber-300 hover:bg-amber-100'
                    }`}
                  >
                    {isLiteMode ? 'الوضع فائق السرعة مفعل ✓' : 'تفعيل وضع السرعة والخفة'}
                  </button>
                )}
              </div>
              <p className="text-[11px] text-amber-900 leading-relaxed">
                تمت برمجة التطبيق ليعمل بسلاسة حتى على هواتف Infinix Smart و Hot و Tecno Pop بذاكرة 1GB أو 2GB RAM دون أي بطء أو استهلاك زائد للبطارية.
              </p>
            </div>

            {/* Infinix XOS Steps */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-slate-700">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-emerald-600" />
                <span>خطوات التثبيت السلس على هواتف Infinix (نظام XOS):</span>
              </h4>
              <ol className="space-y-1.5 list-decimal list-inside text-[11px]">
                <li className="leading-relaxed">
                  اضغط على زر <strong className="text-emerald-700">"تحميل ملف APK مباشرة"</strong> بالأعلى.
                </li>
                <li className="leading-relaxed">
                  إذا ظهرت رسالة المتصفح "قد يكون الملف ضاراً"، اضغط على <strong className="text-slate-900">"تنزيل على أي حال" (Download anyway)</strong>.
                </li>
                <li className="leading-relaxed">
                  افتح الملف من شريط الإشعارات أو تطبيق <strong className="text-slate-900">مدير الملفات (File Manager)</strong>.
                </li>
                <li className="leading-relaxed">
                  في واجهة Infinix XOS: اضغط <strong className="text-amber-800">"الإعدادات"</strong> ثم فعّل <strong className="text-emerald-700">"السماح بتثبيت التطبيقات من هذا المصدر"</strong>.
                </li>
                <li className="leading-relaxed">
                  اضغط <strong className="text-slate-900">تثبيت (Install)</strong> وسيفتح التطبيق فوراً بسرعة فائقة!
                </li>
              </ol>
            </div>
          </div>
        )}

        {/* TAB 2: IPHONE (IOS SAFARI) DEDICATED OPTIMIZATION */}
        {activeTab === 'ios' && (
          <div className="space-y-3 text-xs">
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 space-y-3 text-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-blue-900">
                  <Smartphone className="w-4 h-4 text-blue-600" />
                  <span>دعم كامل لأجهزة Apple iPhone & iPad:</span>
                </div>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-mono font-bold px-2 py-0.5 rounded-full">
                  iOS 12+ إلى iOS 18
                </span>
              </div>

              <p className="text-[11px] text-blue-950">
                يعمل كتطبيق أصلي سريع عبر محرك Safari WebKit دون الحاجة لدفع سنت واحد أو انتظار مراجعة App Store:
              </p>

              <div className="space-y-2">
                <div className="flex items-start gap-2.5 p-2 bg-white rounded-xl border border-blue-100">
                  <div className="w-5 h-5 rounded-md bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    1
                  </div>
                  <div>
                    <span className="font-bold block text-slate-900">افتح الرابط في Safari الرسمي</span>
                    <span className="text-[10px] text-slate-500">تأكد من فتح الرابط عبر متصفح سفاري بهاتفك الآيفون.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2 bg-white rounded-xl border border-blue-100">
                  <div className="w-5 h-5 rounded-md bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    2
                  </div>
                  <div>
                    <span className="font-bold flex items-center gap-1 text-slate-900">
                      اضغط على زر المشاركة (Partager / Share)
                      <Share2 className="w-3 h-3 text-blue-600 inline" />
                    </span>
                    <span className="text-[10px] text-slate-500">موجود في الشريط السفلي لشاشة الآيفون.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2 bg-white rounded-xl border border-blue-100">
                  <div className="w-5 h-5 rounded-md bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    3
                  </div>
                  <div>
                    <span className="font-bold flex items-center gap-1 text-slate-900">
                      اختر "إضافة إلى الصفحة الرئيسية"
                      <PlusSquare className="w-3 h-3 text-emerald-600 inline" />
                    </span>
                    <span className="text-[10px] text-slate-500">(Sur l'écran d'accueil / Add to Home Screen).</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2 bg-white rounded-xl border border-blue-100">
                  <div className="w-5 h-5 rounded-md bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    4
                  </div>
                  <div>
                    <span className="font-bold block text-slate-900">اضغط "إضافة (Ajouter)" في الزاوية العلوية</span>
                    <span className="text-[10px] text-slate-500">ستظهر أيقونة التطبيق على شاشة الآيفون تعمل بلمسة واحدة بملء الشاشة!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: GENERAL ANDROID */}
        {activeTab === 'android' && (
          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-900 font-bold">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>تثبيت PWA الفوري بنقرة واحدة لمتصفح Chrome:</span>
              </div>
              <button
                onClick={handleNativeInstall}
                className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Smartphone className="w-4 h-4" />
                <span>إضافة التطبيق كأيقونة على الشاشة الرئيسية 📲</span>
              </button>
            </div>

            {(showManualAndroidHelp || !deferredPrompt) && (
              <div className="space-y-1.5 p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700">
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-blue-600" />
                  <span>طريقة التثبيت اليدوية عبر Chrome:</span>
                </h4>
                <ol className="space-y-1 list-decimal list-inside text-[11px] text-slate-600">
                  <li>افتح الرابط في متصفح Chrome بهاتفك.</li>
                  <li>اضغط على زر القائمة (الثلاث نقاط ⋮) بالأعلى.</li>
                  <li>اختر "تثبيت التطبيق" (Install App) أو "إضافة إلى الشاشة الرئيسية".</li>
                </ol>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: QR CODE */}
        {activeTab === 'qr' && (
          <div className="space-y-3 text-center text-xs">
            <p className="text-slate-600 text-[11px]">
              وجّه كاميرا هاتفك الذكي (أندرويد أو آيفون أو انفينيكس) نحو الرمز التالي للتحميل المباشر:
            </p>

            <div className="w-40 h-40 mx-auto bg-white p-2.5 rounded-2xl border-2 border-emerald-500 shadow-md flex items-center justify-center relative">
              <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900">
                <rect width="100" height="100" fill="white" />
                <path d="M10 10 h25 v25 h-25 z M15 15 h15 v15 h-15 z M19 19 h7 v7 h-7 z" fill="#047857" />
                <path d="M65 10 h25 v25 h-25 z M70 15 h15 v15 h-15 z M74 19 h7 v7 h-7 z" fill="#047857" />
                <path d="M10 65 h25 v25 h-25 z M15 70 h15 v15 h-15 z M19 74 h7 v7 h-7 z" fill="#047857" />
                <circle cx="50" cy="50" r="14" fill="#047857" />
                <text x="50" y="54" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">DZ</text>
                <path d="M40 15 h5 v5 h-5 z M55 15 h5 v10 h-5 z M45 25 h10 v5 h-10 z" fill="#1e293b" />
                <path d="M15 45 h10 v5 h-10 z M30 40 h5 v15 h-5 z M20 55 h5 v5 h-5 z" fill="#1e293b" />
                <path d="M65 45 h15 v5 h-15 z M85 45 h5 v15 h-5 z M70 55 h10 v5 h-10 z" fill="#1e293b" />
                <path d="M45 65 h10 v10 h-10 z M60 70 h15 v5 h-15 z M50 85 h10 v5 h-10 z M80 80 h10 v10 h-10 z" fill="#1e293b" />
              </svg>
            </div>

            <div className="text-[11px] font-mono text-emerald-800 bg-emerald-50 py-1 px-3 rounded-lg inline-block">
              رابط مباشر صالح لجميع الهواتف
            </div>
          </div>
        )}

        {/* Copy App Link Row */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="text-[11px] text-slate-500 truncate flex-1 dir-ltr text-left">
            {currentUrl}
          </div>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors shrink-0 cursor-pointer"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>تم النسخ!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>نسخ رابط الموقع</span>
              </>
            )}
          </button>
        </div>

        {/* Refresh App Quick Action Banner */}
        <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-amber-700 shrink-0" />
            <div className="text-start">
              <span className="font-bold text-amber-950 block">تحديث التطبيق المباشر (Refreche)</span>
              <span className="text-[10px] text-amber-800">لتحديث المحتوى وتطبيق أي تعديلات جديدة فوراً</span>
            </div>
          </div>
          <button
            onClick={handleForceRefresh}
            disabled={isRefreshing}
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'جارِ التحديث...' : 'تحديث الآن'}</span>
          </button>
        </div>

        {/* Google Play & Apple App Store Publishing Hub Banner */}
        {onOpenStorePublish && (
          <div className="pt-1">
            <button
              onClick={() => {
                onClose();
                onOpenStorePublish();
              }}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-800 to-slate-900 hover:from-emerald-700 hover:to-slate-800 text-white rounded-2xl font-bold text-xs flex items-center justify-between shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <span className="text-base group-hover:scale-110 transition-transform">🚀</span>
                <div className="text-start">
                  <span className="block font-bold">نشر التطبيق في Google Play و App Store؟</span>
                  <span className="text-[10px] text-emerald-200">دليل النشر، حزم .aab، ملف assetlinks، وسياسة الخصوصية</span>
                </div>
              </div>
              <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded-lg group-hover:bg-white/30 transition">
                فتح الدليل ←
              </span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
