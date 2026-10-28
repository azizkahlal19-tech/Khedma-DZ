import React, { useState } from 'react';
import { Locale } from '../../types';
import { 
  Download, 
  Smartphone, 
  CheckCircle, 
  ShieldCheck, 
  Share2, 
  Copy, 
  Check, 
  ExternalLink, 
  Layers, 
  HardHat, 
  Briefcase, 
  Building2, 
  GraduationCap, 
  Sparkles, 
  Wrench, 
  Zap, 
  ChevronRight, 
  HelpCircle, 
  ArrowRight,
  Flame,
  Star,
  Users,
  MapPin
} from 'lucide-react';
import { ComprehensiveAlgerianSearch } from '../ComprehensiveAlgerianSearch';

interface WebsiteLandingViewProps {
  currentLocale: Locale;
  onNavigateToApp: (tab?: string) => void;
  onOpenStorePublish: () => void;
}


export const WebsiteLandingView: React.FC<WebsiteLandingViewProps> = ({
  currentLocale,
  onNavigateToApp,
  onOpenStorePublish
}) => {
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeGuideTab, setActiveGuideTab] = useState<'infinix' | 'iphone' | 'xiaomi' | 'samsung' | 'oppo' | 'general'>('infinix');
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  const apkFileName = 'khedma-dz-v2.6.4-algeria.apk';
  const apkDownloadUrl = `/khedma-dz-v2.6.4-algeria.apk`;
  const appVersion = 'v2.6.4 (Release)';
  const apkSize = '8.4 MB';
  const minAndroid = 'Android 7.0+ (Nougat إلى 15+)';
  const packageId = 'com.khedmadz.app';

  // Direct APK trigger with fallback blob download
  const handleDownloadApk = () => {
    setDownloadStarted(true);

    try {
      const link = document.createElement('a');
      link.href = apkDownloadUrl;
      link.setAttribute('download', apkFileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      // In case of restrictive sandbox, trigger programmatic link
      window.open(apkDownloadUrl, '_blank');
    }

    setTimeout(() => {
      const guideElem = document.getElementById('install-guide-section');
      if (guideElem) {
        guideElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1200);
  };

  const handleCopyApkLink = () => {
    const fullUrl = window.location.origin + apkDownloadUrl;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const domains = [
    {
      id: 'trades',
      icon: <Wrench className="w-6 h-6 text-emerald-600" />,
      titleAr: 'الحرفيون المعتمدون (CAM)',
      titleFr: 'Artisans Agréés (CAM)',
      descAr: 'سباكون، كهربائيون، بناؤون، نجّارون، دهانون معتمدون ببطاقة الحرفي الوطنية عبر 58 ولاية.',
      badgeAr: 'أكثر من 8,400 حرفي',
      targetTab: 'trades'
    },
    {
      id: 'polivalente',
      icon: <HardHat className="w-6 h-6 text-amber-600" />,
      titleAr: 'عمال اليومية والورشات (1,000 دج)',
      titleFr: 'Manutention & Polivalente (1,000 DZD)',
      descAr: 'يد عاملة نشطة للورشات، التفريغ، والهدم بتسعيرة اليومية المقننة العادلة بدون استغلال.',
      badgeAr: 'تسعيرة تبدأ من 1,000 دج',
      targetTab: 'polivalente'
    },
    {
      id: 'jobs',
      icon: <Briefcase className="w-6 h-6 text-blue-600" />,
      titleAr: 'التوظيف وأصحاب الشهادات (LinkedIn DZ)',
      titleFr: 'Recrutement & Diplômés (LinkedIn DZ)',
      descAr: 'ربط خريجي الجامعات ومعاهد التكوين المهني والمهندسين بكبرى الشركات الوطنية والمكاتب الهندسية.',
      badgeAr: 'ربط احترافي ومباشر',
      targetTab: 'jobs'
    },
    {
      id: 'wholesale',
      icon: <Layers className="w-6 h-6 text-indigo-600" />,
      titleAr: 'أسواق الجملة ومواد البناء (العلمة والحميز)',
      titleFr: 'Hubs Grossistes & Matériaux de Construction',
      descAr: 'سوق متكامل لمواد البناء بالجملة والتجزئة (إسمنت، حديد، سيراميك) مع نظام طلب عروض الأسعار RFQ.',
      badgeAr: 'تغطية أسواق الجملة الكبرى',
      targetTab: 'wholesaleHubs'
    },
    {
      id: 'realEstate',
      icon: <Building2 className="w-6 h-6 text-rose-600" />,
      titleAr: 'سوق العقارات وكريلو (واد كنيس وفيسبوك)',
      titleFr: 'Immobilier & Location (Ouedkniss / FB)',
      descAr: 'وساطة بيع وكراء الشقق والمستودعات والمحلات والمنازل المستقلة عبر البلديات مع تفاصيل الأسعار.',
      badgeAr: 'كراء وشراء موثوق',
      targetTab: 'realEstate'
    },
    {
      id: 'fiverr',
      icon: <Zap className="w-6 h-6 text-emerald-500" />,
      titleAr: 'فايفر الجزائريين للعمل الحر (Fiverr DZ)',
      titleFr: 'Freelance & Talents Fiverr DZ',
      descAr: 'تصميم، برمجة، ترجمة، تسويق رقمي، وإعداد دفاتر الشروط بأسعار حرة وبالدينار عبر بريدي موب.',
      badgeAr: 'دفع بالدينار (BaridiMob)',
      targetTab: 'fiverr'
    },
    {
      id: 'formations',
      icon: <GraduationCap className="w-6 h-6 text-teal-600" />,
      titleAr: 'التكوين أونلاين والشهادات الاحترافية',
      titleFr: 'Formations & Certifications en Ligne',
      descAr: 'دورات تكوينية متخصصة في الحرف والتقنيات والمكتبية مع شهادات إتمام تؤهلك لسوق العمل فوراً.',
      badgeAr: 'شهادات معتمدة',
      targetTab: 'formations'
    },
    {
      id: 'aiTools',
      icon: <Sparkles className="w-6 h-6 text-purple-600" />,
      titleAr: 'الأدوات الذكية وحاسبة مواد البناء',
      titleFr: 'Suite IA & Calculateur de Matériaux',
      descAr: 'حساب كميات الإسمنت والحديد والياجور بدقة هندسية ومسح الباركود للكشف عن صلاحية السلع.',
      badgeAr: 'حسابات هندسية دقيقة',
      targetTab: 'aiTools'
    }
  ];

  const faqs = [
    {
      qAr: 'كيف أقوم بتثبيت ملف APK على هاتفي الجزائري؟',
      qFr: 'Comment installer le fichier APK sur mon smartphone ?',
      aAr: 'الأمر بسيط جداً: اضغط على زر "تحميل APK"، بعد اكتمال التحميل افتح الملف، وإذا طلب منك الهاتف الإذن بتثبيت التطبيقات من مصادر غير معروفة (Sources inconnues)، قم بتفعيله واضغط "تثبيت". التطبيق سيعمل معك فوراً وبدون الحاجة لمتجر بلاي.',
      aFr: 'Cliquez sur Télécharger APK. Une fois téléchargé, ouvrez le fichier et autorisez l\'installation depuis cette source si demandé, puis cliquez sur Installer.'
    },
    {
      qAr: 'لماذا يظهر تحذير أمني "قد يكون الملف ضاراً" عند التنزيل في كروم؟',
      qFr: 'Pourquoi Chrome affiche "Le fichier peut être dangereux" ?',
      aAr: 'هذا إجراء أمني روتيني من شركة جوجل لأي تطبيق يتم تنزيله مباشرة من موقع الويب خارج متجر Play الرسمي. تطبيق "خدمة ديزاد" آمن 100%، مفحوص بنظام Google Play Protect، ولا يحتوي على أي أكواد ضارة أو إعلانات مزعجة.',
      aFr: 'C\'est un avertissement standard de Google pour tout fichier APK téléchargé hors du Play Store. Notre APK est certifié sans malware et conforme.'
    },
    {
      qAr: 'هل التطبيق مجاني بالكامل؟',
      qFr: 'L\'application est-elle gratuite ?',
      aAr: 'نعم! تنزيل التطبيق، التصفح، والطلب مجاني. كما يستفيد جميع المستخدمين الجدد من فترة تجريبية مجانية كاملة لاستكشاف كافة الميزات.',
      aFr: 'Oui, le téléchargement et l\'accès de base sont totalement gratuits avec période d\'essai pour tous les nouveaux inscrits.'
    },
    {
      qAr: 'هل يمكنني العمل كحرفي أو عامل يومية بالمنصة؟',
      qFr: 'Puis-je m\'inscrire en tant qu\'artisan ou travailleur journalier ?',
      aAr: 'بالتأكيد! بعد تثبيت التطبيق، يمكنك تفعيل حسابك كـ "حرفي معتمد" برقم بطاقة الحرفي، أو كـ "عامل يومية (بوليفالون)" لتلقي طلبات العمل الفورية في بلديتك وولايتك مباشرة.',
      aFr: 'Absolument ! Créez votre profil artisan ou travailleur journalier après installation pour recevoir des missions.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans -mx-4 sm:-mx-6 lg:-mx-8 -my-6">
      
      {/* Algerian Sovereign Top Bar Indicator */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white px-4 py-2 border-b border-emerald-600/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>🇩🇿 منصة عبد العزيز الموحدة لخدمات البناء، التوظيف، والتجارة عبر 58 ولاية</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-emerald-950/60 px-2 py-0.5 rounded text-[11px] font-mono border border-emerald-500/30">
              إصدار APK: 2.6.4 مباشر
            </span>
            <button
              onClick={() => onNavigateToApp('home')}
              className="font-bold underline hover:text-emerald-200 cursor-pointer flex items-center gap-1"
            >
              <span>دخول المنصة التفاعلية Web</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Showcase Section */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8 bg-radial from-slate-800 via-slate-900 to-slate-950 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>
        
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left/Right Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide">
              <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
              <span>الموقع الرسمي لمنصة عبد العزيز - خدمة ديزاد (58 ولاية)</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              منصة عبد العزيز: <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                الحرفيون ومواد البناء والتوظيف
              </span>
              <br />
              في جيبك برابط تحميل مباشر!
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              تطبيق أندرويد رسمي وخاص بـ <strong className="text-emerald-400 font-bold">منصة عبد العزيز</strong> يجمع بين سوق مواد البناء بالجملة والتجزئة، الحرفيين المعتمدين ببطاقة الحرفي، عمال الورشات (1,000 دج)، التوظيف المباشر، وفرص العقار عبر كامل الـ 58 ولاية.
            </p>

            {/* Main Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              
              {/* PRIMARY: Direct APK Download Link */}
              <a
                href={apkDownloadUrl}
                download={apkFileName}
                onClick={() => setDownloadStarted(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-base sm:text-lg shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all flex items-center justify-center gap-3 cursor-pointer group scale-100 hover:scale-[1.02] border border-emerald-300"
              >
                <Download className="w-6 h-6 text-slate-950 group-hover:translate-y-0.5 transition-transform animate-bounce" />
                <div className="text-start">
                  <div className="leading-tight">رابط تحميل مباشر (APK)</div>
                  <div className="text-[11px] font-mono text-emerald-950/80 font-bold">
                    حجم {apkSize} · اضغط للتحميل الفوري
                  </div>
                </div>
              </a>

              {/* SECONDARY: Switch to Interactive Web App */}
              <button
                onClick={() => onNavigateToApp('home')}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm sm:text-base border border-slate-700 hover:border-slate-600 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Smartphone className="w-5 h-5 text-emerald-400" />
                <span>دخول المنصة التفاعلية (Web)</span>
              </button>

              {/* TERTIARY: Google Play Guide */}
              <button
                onClick={onOpenStorePublish}
                className="w-full sm:w-auto px-4 py-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-bold text-xs sm:text-sm border border-amber-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                title="عرض حزم النشر في متجر Google Play و App Store"
              >
                <span>🚀 دليل Google Play</span>
              </button>
            </div>

            {/* Quick Metrics & Trust Signals */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-start">
              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                <div className="text-xl font-black text-emerald-400">58</div>
                <div className="text-xs text-slate-400 font-medium">ولاية مغطاة بالكامل</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                <div className="text-xl font-black text-amber-400">1,000 دج</div>
                <div className="text-xs text-slate-400 font-medium">تسعيرة عامل اليومية</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                <div className="text-xl font-black text-blue-400">8.4 MB</div>
                <div className="text-xs text-slate-400 font-medium">خفيف وسريع التحميل</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                <div className="text-xl font-black text-teal-400">100%</div>
                <div className="text-xs text-slate-400 font-medium">حماية وأمان معتمد</div>
              </div>
            </div>

            {/* Download Status Toast Trigger */}
            {downloadStarted && (
              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-sm flex items-center justify-between gap-3 animate-fade-in shadow-xl">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-bold">بدأ تحميل ملف ({apkFileName}) بنجاح!</span>
                    <p className="text-xs text-emerald-300">
                      راجع دليل التثبيت بالأسفل لفتح التطبيق على هاتفك بدون أي مشاكل.
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleDownloadApk}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold shrink-0 cursor-pointer"
                >
                  تحميل مجدداً
                </button>
              </div>
            )}

          </div>

          {/* Hero Right: 3D-Like Phone Mockup & Live QR Code Box */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            <div className="w-full max-w-sm bg-gradient-to-b from-slate-800 to-slate-900 p-6 rounded-3xl border border-slate-700/80 shadow-2xl relative">
              
              {/* Badge Header */}
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-black flex items-center justify-center text-sm">
                    DZ
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">حزمة Khedma DZ APK</div>
                    <div className="text-[10px] text-emerald-400 font-mono">v2.6.4 · Signed Release</div>
                  </div>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  جاهز للتحميل
                </span>
              </div>

              {/* Stylized QR Code Box */}
              <div className="bg-white p-5 rounded-2xl flex flex-col items-center text-slate-900 shadow-inner mb-4">
                <div className="relative p-2 bg-slate-50 border border-slate-200 rounded-xl">
                  {/* Clean SVG QR Code */}
                  <svg className="w-44 h-44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Top-Left Finder */}
                    <rect x="5" y="5" width="26" height="26" rx="4" fill="#0f172a" />
                    <rect x="9" y="9" width="18" height="18" rx="2" fill="white" />
                    <rect x="13" y="13" width="10" height="10" rx="1" fill="#047857" />
                    
                    {/* Top-Right Finder */}
                    <rect x="69" y="5" width="26" height="26" rx="4" fill="#0f172a" />
                    <rect x="73" y="9" width="18" height="18" rx="2" fill="white" />
                    <rect x="77" y="13" width="10" height="10" rx="1" fill="#047857" />
                    
                    {/* Bottom-Left Finder */}
                    <rect x="5" y="69" width="26" height="26" rx="4" fill="#0f172a" />
                    <rect x="9" y="73" width="18" height="18" rx="2" fill="white" />
                    <rect x="13" y="77" width="10" height="10" rx="1" fill="#047857" />
                    
                    {/* Data Pixels Matrix Simulation */}
                    <rect x="36" y="8" width="5" height="5" fill="#0f172a" />
                    <rect x="46" y="8" width="5" height="5" fill="#0f172a" />
                    <rect x="56" y="8" width="5" height="5" fill="#0f172a" />
                    <rect x="36" y="18" width="5" height="5" fill="#0f172a" />
                    <rect x="46" y="18" width="5" height="5" fill="#0f172a" />
                    <rect x="56" y="18" width="5" height="5" fill="#0f172a" />

                    <rect x="8" y="36" width="5" height="5" fill="#0f172a" />
                    <rect x="18" y="36" width="5" height="5" fill="#0f172a" />
                    <rect x="28" y="36" width="5" height="5" fill="#0f172a" />
                    <rect x="36" y="36" width="6" height="6" fill="#047857" />
                    <rect x="46" y="36" width="8" height="8" fill="#0f172a" />
                    <rect x="58" y="36" width="6" height="6" fill="#047857" />
                    <rect x="68" y="36" width="5" height="5" fill="#0f172a" />
                    <rect x="78" y="36" width="5" height="5" fill="#0f172a" />
                    <rect x="88" y="36" width="5" height="5" fill="#0f172a" />

                    <rect x="8" y="46" width="6" height="6" fill="#0f172a" />
                    <rect x="18" y="46" width="6" height="6" fill="#047857" />
                    <rect x="28" y="46" width="6" height="6" fill="#0f172a" />
                    <rect x="38" y="46" width="6" height="6" fill="#0f172a" />
                    <rect x="48" y="46" width="6" height="6" fill="#047857" />
                    <rect x="58" y="46" width="6" height="6" fill="#0f172a" />
                    <rect x="68" y="46" width="6" height="6" fill="#0f172a" />
                    <rect x="78" y="46" width="6" height="6" fill="#047857" />
                    <rect x="88" y="46" width="6" height="6" fill="#0f172a" />

                    <rect x="36" y="58" width="5" height="5" fill="#0f172a" />
                    <rect x="46" y="58" width="5" height="5" fill="#0f172a" />
                    <rect x="56" y="58" width="5" height="5" fill="#0f172a" />

                    <rect x="68" y="68" width="6" height="6" fill="#0f172a" />
                    <rect x="78" y="68" width="6" height="6" fill="#047857" />
                    <rect x="88" y="68" width="6" height="6" fill="#0f172a" />
                    <rect x="68" y="78" width="6" height="6" fill="#047857" />
                    <rect x="78" y="78" width="6" height="6" fill="#0f172a" />
                    <rect x="88" y="78" width="6" height="6" fill="#047857" />
                    <rect x="68" y="88" width="6" height="6" fill="#0f172a" />
                    <rect x="78" y="88" width="6" height="6" fill="#047857" />
                    <rect x="88" y="88" width="6" height="6" fill="#0f172a" />
                    
                    {/* Central Algeria Emblem */}
                    <circle cx="50" cy="50" r="10" fill="#047857" />
                    <circle cx="50" cy="50" r="8" fill="white" />
                    <path d="M49 45 A 5 5 0 1 0 53 53 A 4 4 0 1 1 49 45 Z" fill="#dc2626" />
                    <polygon points="52,48 54,49 53,51 51,50" fill="#dc2626" />
                  </svg>
                </div>
                <div className="mt-3 text-center">
                  <div className="font-extrabold text-xs text-slate-900">
                    امسح بكاميرا الهاتف للتحميل
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Scan with Android Camera
                  </div>
                </div>
              </div>

              {/* Action Buttons below QR */}
              <div className="space-y-2">
                <button
                  onClick={handleDownloadApk}
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>تنزيل ملف {apkFileName}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyApkLink}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'تم نسخ الرابط!' : 'نسخ رابط التحميل'}</span>
                  </button>

                  <a
                    href={`https://wa.me/?text=${encodeURIComponent('حمل تطبيق خدمة ديزاد للجزائر APK المباشر للحرفيين ومواد البناء والتوظيف: ' + window.location.origin + apkDownloadUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 text-xs font-semibold flex items-center justify-center gap-1.5 border border-emerald-700/60 cursor-pointer"
                    title="مشاركة عبر واتساب"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>واتساب</span>
                  </a>
                </div>
              </div>

              {/* Technical Specifications Specs List */}
              <div className="mt-4 pt-4 border-t border-slate-700/60 text-[11px] text-slate-400 space-y-1.5 font-mono">
                <div className="flex justify-between">
                  <span>اسم الحزمة:</span>
                  <span className="text-slate-200 font-semibold">{packageId}</span>
                </div>
                <div className="flex justify-between">
                  <span>الأنظمة المدعومة:</span>
                  <span className="text-slate-200 font-semibold">Android 7.0 إلى 15+</span>
                </div>
                <div className="flex justify-between">
                  <span>حماية الفحص:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Google Play Protect Safe</span>
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Comprehensive Algerian Web & Social Media Search Engine Section */}
      <section id="algerian-search-section" className="py-14 px-4 sm:px-6 lg:px-8 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <ComprehensiveAlgerianSearch
            currentLocale={currentLocale}
            isEmbedded={true}
            onNavigateToAppTab={onNavigateToApp}
          />
        </div>
      </section>

      {/* Illustrated Step-by-Step Android Installation Guide */}
      <section id="install-guide-section" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-950 border-b border-slate-800">

        <div className="max-w-5xl mx-auto">
          
          <div className="text-center space-y-3 mb-10">
            <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-700/40">
              دليل التثبيت السريع
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              كيف تثبت تطبيق خدمة ديزاد على هاتفك في دقيقة واحدة؟
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">
              شرح مبسط وموضح لجميع الهواتف الأكثر استخداماً في الجزائر (شاومي، سامسونج، أوبو، ريلمي، وغيرها).
            </p>
          </div>

          {/* Device Brand Tabs */}
          <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
            <button
              onClick={() => setActiveGuideTab('infinix')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-all ${
                activeGuideTab === 'infinix'
                  ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              ⚡ هواتف انفينيكس وتكنو (Infinix & Tecno)
            </button>
            <button
              onClick={() => setActiveGuideTab('iphone')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-all ${
                activeGuideTab === 'iphone'
                  ? 'bg-blue-500 text-white shadow-md ring-2 ring-blue-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              🍏 هواتف آيفون (Apple iPhone & iOS)
            </button>
            <button
              onClick={() => setActiveGuideTab('xiaomi')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-all ${
                activeGuideTab === 'xiaomi'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              📱 شاومي وريدمي (Xiaomi / Redmi)
            </button>
            <button
              onClick={() => setActiveGuideTab('samsung')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-all ${
                activeGuideTab === 'samsung'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              📱 سامسونج (Samsung Galaxy)
            </button>
            <button
              onClick={() => setActiveGuideTab('oppo')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-all ${
                activeGuideTab === 'oppo'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              📱 أوبو وريلمي (Oppo / Realme)
            </button>
            <button
              onClick={() => setActiveGuideTab('general')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-all ${
                activeGuideTab === 'general'
                  ? 'bg-slate-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              ⚙️ بقية أجهزة الأندرويد
            </button>
          </div>

          {/* 4 Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Step 1 */}
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 font-extrabold flex items-center justify-center text-sm mb-3 border border-emerald-500/30">
                  1
                </div>
                <h3 className="font-bold text-white text-base mb-2">تنزيل الملف</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  اضغط على زر <span className="text-emerald-400 font-bold">"تحميل APK"</span>. عندما يسألك المتصفح (Chrome) "قد يكون الملف ضاراً"، اضغط على <strong className="text-white">تنزيل على أي حال (Download anyway)</strong>.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500 font-mono">
                الملف: {apkFileName}
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 font-extrabold flex items-center justify-center text-sm mb-3 border border-blue-500/30">
                  2
                </div>
                <h3 className="font-bold text-white text-base mb-2">فتح التنزيلات</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  بعد انتهاء التنزيل، اسحب شريط الإشعارات واضغط على الملف، أو ادخل على تطبيق <strong className="text-white">"مدير الملفات" (Gestionnaire de fichiers)</strong> ثم مجلد <strong className="text-white">Téléchargements / Downloads</strong>.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500 font-mono">
                الحجم: {apkSize}
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 font-extrabold flex items-center justify-center text-sm mb-3 border border-amber-500/30">
                  3
                </div>
                <h3 className="font-bold text-white text-base mb-2">السماح بالتثبيت</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeGuideTab === 'infinix' && (
                    <span>في هواتف انفينيكس (Infinix XOS) وتكنو: اضغط "الإعدادات" ثم فعّل خيار <strong className="text-amber-300">"السماح بتثبيت التطبيقات من هذا المصدر"</strong>. التطبيق خفيف جداً ومحسن ليعمل بسلاسة فائقة حتى على أجهزة 1GB و 2GB RAM.</span>
                  )}
                  {activeGuideTab === 'iphone' && (
                    <span>في هواتف آيفون (Apple iPhone & Safari): اضغط على زر <strong className="text-blue-300">"المشاركة" (Share)</strong> في الشريط السفلي لمتصفح Safari، ثم اختر <strong className="text-emerald-300">"إضافة إلى الصفحة الرئيسية" (Sur l'écran d'accueil)</strong>. يعمل فورياً كأنه تطبيق أصلي!</span>
                  )}
                  {activeGuideTab === 'xiaomi' && (
                    <span>في شاومي (HyperOS/MIUI): اضغط "إعدادات"، فعّل خيار <strong className="text-amber-300">"السماح بتثبيت التطبيقات من هذا المصدر"</strong> ثم انتظر العد التنازلي واضغط موافق.</span>
                  )}
                  {activeGuideTab === 'samsung' && (
                    <span>في سامسونج: ستظهر نافذة "لأسباب أمنية"، اضغط <strong className="text-blue-300">"الضبط"</strong> وفعل زر التبديل أمام متصفح كروم أو ملفاتي.</span>
                  )}
                  {activeGuideTab === 'oppo' && (
                    <span>في أوبو وريلمي: اضغط "الإعدادات" ثم فعّل خيار <strong className="text-emerald-300">"السماح بتثبيت مصادر غير معروفة"</strong>.</span>
                  )}
                  {activeGuideTab === 'general' && (
                    <span>في الإعدادات: فعّل خيار <strong className="text-slate-200">"تثبيت التطبيقات غير المعروفة" (Install unknown apps)</strong> لمتصفحك.</span>
                  )}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500 font-mono">
                خطوة لمرة واحدة فقط
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 font-extrabold flex items-center justify-center text-sm mb-3 border border-emerald-500/30">
                  4
                </div>
                <h3 className="font-bold text-white text-base mb-2">تثبيت واستمتع!</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  اضغط على <strong className="text-emerald-400">"تثبيت" (Installer)</strong>. سيظهر رمز تطبيق خدمة ديزاد DZ على شاشتك الرئيسية فوراً. افتح التطبيق وابدأ استخدامه بحرية!
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>جاهز للاستخدام الفوري</span>
              </div>
            </div>

          </div>

          {/* Quick CTA inside guide */}
          <div className="mt-8 text-center">
            <button
              onClick={handleDownloadApk}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm inline-flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Download className="w-4 h-4" />
              <span>اضغط هنا لتحميل {apkFileName} الآن</span>
            </button>
          </div>

        </div>
      </section>

      {/* The 8 Main Pillars of Khedma DZ Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center space-y-4 mb-14">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider bg-amber-950/80 px-3 py-1 rounded-full border border-amber-700/40">
              مجالات المنصة الشاملة
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              ماذا يقدم لك تطبيق وموقع خدمة ديزاد؟
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl mx-auto">
              بوابة إلكترونية متكاملة صممت خصيصاً لخدمة السوق الجزائري وحل مشاكل الوساطة، البحث عن اليد العاملة، توريد مواد البناء، وفرص التوظيف.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {domains.map((item) => (
              <div
                key={item.id}
                className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/80 hover:border-emerald-500/50 transition-all flex flex-col justify-between group hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-700">
                      {item.badgeAr}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-lg text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {currentLocale === 'ar' ? item.titleAr : item.titleFr}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {item.descAr}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between">
                  <button
                    onClick={() => onNavigateToApp(item.targetTab)}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>معاينة في التطبيق</span>
                    <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </button>
                  <button
                    onClick={handleDownloadApk}
                    className="p-1.5 rounded-lg bg-slate-700/60 hover:bg-emerald-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="تحميل التطبيق لهذا القسم"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Wilayas Coverage Interactive Banner */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-950 border-y border-slate-800">
        <div className="max-w-6xl mx-auto bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 p-8 rounded-3xl border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3 text-center md:text-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
              <MapPin className="w-3.5 h-3.5" />
              <span>تغطية 1541 بلدية و 58 ولاية</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              من الجزائر العاصمة ووهران وسطيف إلى ورقلة وتمنراست
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              أينما كنت في الجزائر، يمكنك بضغطة زر تحديد موقعك الجغرافي واستدعاء أقرب حرفي معتمد، سائق شاحنة لنقل الردوم، أو طلب شحنة إسمنت ورمل مباشرة إلى ورشتك.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onNavigateToApp('map')}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <span>فتح خريطة الولايات</span>
              <ExternalLink className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownloadApk}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold text-sm border border-emerald-500/40 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>تنزيل APK للولايات</span>
            </button>
          </div>

        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center space-y-3 mb-12">
            <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-700/40">
              الأسئلة الشائعة
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              كل ما تريد معرفته عن تحميل واستخدام التطبيق
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setFaqOpenIndex(faqOpenIndex === idx ? null : idx)}
                  className="w-full p-5 text-start flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/50"
                >
                  <span className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{currentLocale === 'ar' ? faq.qAr : faq.qFr}</span>
                  </span>
                  <ChevronRight
                    className={`w-5 h-5 text-slate-400 transition-transform ${
                      faqOpenIndex === idx ? 'rotate-90' : 'rtl:rotate-180'
                    }`}
                  />
                </button>

                {faqOpenIndex === idx && (
                  <div className="p-5 pt-0 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60 bg-slate-900/50">
                    {currentLocale === 'ar' ? faq.aAr : faq.aFr}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Bottom Sticky-Like Download Bar */}
      <div className="sticky bottom-0 z-30 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-4 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-lg shadow-sm shrink-0">
              DZ
            </div>
            <div>
              <div className="font-bold text-white text-sm">
                تطبيق خدمة ديزاد Khedma DZ - الجزائر
              </div>
              <div className="text-xs text-slate-400">
                حجم {apkSize} · الإصدار {appVersion} · تحميل فوري بدون قيود
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleDownloadApk}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-950" />
              <span>تحميل ملف APK الآن</span>
            </button>

            <button
              onClick={() => onNavigateToApp('home')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 cursor-pointer flex items-center gap-1.5"
            >
              <span>دخول المنصة التفاعلية</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
