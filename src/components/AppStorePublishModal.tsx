import React, { useState } from 'react';
import { Locale } from '../types';
import { 
  Smartphone, 
  Download, 
  ExternalLink, 
  Copy, 
  Check, 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Terminal, 
  Sparkles,
  Layers,
  HelpCircle,
  FileCode,
  Image as ImageIcon,
  DollarSign,
  ChevronRight,
  Info
} from 'lucide-react';

interface AppStorePublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocale: Locale;
}

export const AppStorePublishModal: React.FC<AppStorePublishModalProps> = ({
  isOpen,
  onClose,
  currentLocale
}) => {
  const [activeTab, setActiveTab] = useState<'googlePlay' | 'appStore' | 'assetLinks' | 'privacy' | 'assets'>('googlePlay');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://khedmadz.app';
  const privacyUrl = `${currentOrigin}/privacy-policy.html`;
  const manifestUrl = `${currentOrigin}/manifest.json`;
  const assetLinksUrl = `${currentOrigin}/.well-known/assetlinks.json`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const bubblewrapCode = `# 1. تثبيت أداة Trusted Web Activity الرسمية من Google
npm install -g @bubblewrap/cli

# 2. تهيئة المشروع باستخدام رابط تطبيق خدمة ديزاد
bubblewrap init --manifest="${manifestUrl}"

# 3. تجميع حزمة الأندرويد (.aab) الجاهزة للنشر
bubblewrap build`;

  const capacitorCode = `# 1. تثبيت Capacitor في المشروع
npm install @capacitor/core @capacitor/cli @capacitor/ios

# 2. تهيئة الحزمة لمتجر Apple App Store
npx cap init "Khedma DZ" "com.khedmadz.app" --web-dir dist

# 3. بناء وتوليد مشروع Xcode للآيفون
npm run build
npx cap add ios
npx cap open ios`;

  const assetLinksJson = `[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.khedmadz.app",
      "sha256_cert_fingerprints": [
        "14:6D:E9:7D:0F:52:AB:FC:02:12:12:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90"
      ]
    }
  }
]`;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full my-auto shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white p-5 sm:p-6 relative shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xl">🚀</span>
                <span className="text-[11px] font-bold bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Store Deployment Hub
                </span>
                <span className="text-[11px] bg-white/20 text-white px-2 py-0.5 rounded-full">
                  58 ولاية جزائرية
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black tracking-tight">
                مركز النشر في Google Play و Apple App Store
              </h2>
              <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed max-w-2xl">
                الدليل التقني الكامل وحزم التصدير الجاهزة لتحويل منصة خدمة ديزاد إلى تطبيق رسمي معتمد على متجري جوجل بلاي وآبل ستور.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white rounded-xl bg-white/10 hover:bg-white/20 transition-all shrink-0 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-4 scrollbar-none text-xs font-bold">
            <button
              onClick={() => setActiveTab('googlePlay')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                activeTab === 'googlePlay'
                  ? 'bg-white text-emerald-900 shadow-md'
                  : 'bg-emerald-950/40 text-emerald-100 hover:bg-emerald-950/70'
              }`}
            >
              <span>🤖</span>
              <span>Google Play (أندرويد)</span>
            </button>

            <button
              onClick={() => setActiveTab('appStore')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                activeTab === 'appStore'
                  ? 'bg-white text-emerald-900 shadow-md'
                  : 'bg-emerald-950/40 text-emerald-100 hover:bg-emerald-950/70'
              }`}
            >
              <span>🍏</span>
              <span>Apple App Store (آيفون)</span>
            </button>

            <button
              onClick={() => setActiveTab('assetLinks')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                activeTab === 'assetLinks'
                  ? 'bg-white text-emerald-900 shadow-md'
                  : 'bg-emerald-950/40 text-emerald-100 hover:bg-emerald-950/70'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>ملف assetlinks.json</span>
            </button>

            <button
              onClick={() => setActiveTab('privacy')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                activeTab === 'privacy'
                  ? 'bg-white text-emerald-900 shadow-md'
                  : 'bg-emerald-950/40 text-emerald-100 hover:bg-emerald-950/70'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>سياسة الخصوصية (إلزامية)</span>
            </button>

            <button
              onClick={() => setActiveTab('assets')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                activeTab === 'assets'
                  ? 'bg-white text-emerald-900 shadow-md'
                  : 'bg-emerald-950/40 text-emerald-100 hover:bg-emerald-950/70'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>أيقونات وصور المتجر</span>
            </button>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-5 sm:p-7 space-y-6 overflow-y-auto text-xs sm:text-sm">
          
          {/* TAB 1: GOOGLE PLAY STORE */}
          {activeTab === 'googlePlay' && (
            <div className="space-y-6">
              
              {/* Highlight Box: 1-Click Package Generator */}
              <div className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-300 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-sm sm:text-base">
                      <Sparkles className="w-5 h-5 text-emerald-600" />
                      <span>الطريقة السريعة بنقرة واحدة: أداة PWABuilder (المدعومة من Google و Microsoft)</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      لا تحتاج لتثبيت Android Studio! تقوم أداة PWABuilder بتحليل الرابط وتوليد ملف <strong className="text-emerald-800">.aab (Android App Bundle)</strong> جاهز وموقّع مباشرة لرفعه على Google Play Console.
                    </p>
                  </div>
                  <span className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0">
                    موصى به ⚡
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href={`https://www.pwabuilder.com/?site=${encodeURIComponent(currentOrigin)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <span>فتح PWABuilder وتوليد حزمة Google Play (.aab)</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => copyToClipboard(currentOrigin, 'appUrl')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-emerald-300 rounded-xl font-semibold text-emerald-800 hover:bg-emerald-50 transition cursor-pointer"
                  >
                    {copiedText === 'appUrl' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>تم نسخ الرابط!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>نسخ رابط التطبيق للتحليل</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Step-by-Step Google Play Roadmap */}
              <div className="space-y-4">
                <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-700" />
                  <span>خطوات نشر التطبيق على Google Play Console في الجزائر بالتفصيل:</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Step 1 */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                        1
                      </span>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        25$ لمرة واحدة مدى الحياة
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900">فتح حساب Google Play Developer</h4>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      ادخل على <a href="https://play.google.com/console/signup" target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-bold underline">Google Play Console Signup</a>. يتم دفع الرسوم ببطاقة دفع دولية مثل <strong>Wise, Paysera, Pyypl</strong> أو بطاقة فيزا/ماستركارد من البنوك الجزائرية (BNA, BEA, SGA, AGB).
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                        2
                      </span>
                      <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                        Package: com.khedmadz.app
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900">توليد ملف .aab عبر TWA / PWABuilder</h4>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      يتم توليد حزمة <strong>Android App Bundle (.aab)</strong> الرسمية. محرك TWA المعتمد من جوجل يضمن فتح التطبيق بدون شريط عنوان المتصفح كأنه تطبيق أصلي 100%.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                        3
                      </span>
                      <span className="text-[11px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                        مجهز ومستضاف بالفعل
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900">ربط النطاق عبر Digital Asset Links</h4>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      ملف <code className="bg-slate-200 px-1 rounded font-mono">assetlinks.json</code> موجود بالفعل في مشروعك داخل مجلد <code className="bg-slate-200 px-1 rounded font-mono">public/.well-known/</code>. هذا الملف يربط بصمة تطبيق الأندرويد بالنطاق لإزالة شريط الويب نهائياً.
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                        4
                      </span>
                      <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                        مراجعة جوجل 24-48 ساعة
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900">ملء صفحة المتجر والموافقة</h4>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      أضف اسم التطبيق: <strong>خدمة ديزاد - Khedma DZ</strong>، رابط سياسة الخصوصية، الأيقونة 512x512، ولائحة الولايات الـ 58. بعد إرساله للمراجعة سيصبح متاحاً للتحميل من متجر جوجل بلاي الرسمي!
                    </p>
                  </div>

                </div>
              </div>

              {/* Developer Command Line Alternative: Bubblewrap CLI */}
              <div className="p-4 bg-slate-900 text-slate-100 rounded-2xl space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-300 font-sans">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-xs">طريقة سطر الأوامر (CLI): Google Bubblewrap</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(bubblewrapCode, 'bubblewrap')}
                    className="flex items-center gap-1 text-[11px] bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-md text-emerald-400 cursor-pointer"
                  >
                    {copiedText === 'bubblewrap' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedText === 'bubblewrap' ? 'تم النسخ!' : 'نسخ الأوامر'}</span>
                  </button>
                </div>
                <pre className="bg-slate-950 p-3 rounded-xl overflow-x-auto text-[11px] leading-relaxed text-emerald-300">
                  {bubblewrapCode}
                </pre>
              </div>

            </div>
          )}

          {/* TAB 2: APPLE APP STORE (iOS) */}
          {activeTab === 'appStore' && (
            <div className="space-y-6">
              
              {/* iOS Overview Alert */}
              <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 space-y-3">
                <div className="flex items-center gap-2 text-blue-900 font-extrabold text-sm sm:text-base">
                  <Smartphone className="w-5 h-5 text-blue-600" />
                  <span>طريقتان لتشغيل خدمة ديزاد على أجهزة الآيفون (iPhone & iPad):</span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  تتيح لك منصة خدمة ديزاد خيارين: النشر الفوري المجاني كـ PWA عبر متصفح Safari بدون دفع سنتيم واحد لشركة آبل، أو النشر الرسمي داخل متجر <strong>Apple App Store</strong> عبر حزمة Capacitor / WKWebView.
                </p>
              </div>

              {/* Two Options Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Method A: Free Safari PWA */}
                <div className="p-5 bg-white rounded-2xl border-2 border-emerald-300 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                      مجاني 100% وبدون عمولة 30%
                    </span>
                    <span className="text-xl">📲</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    المسار 1: التثبيت المباشر على الآيفون (Safari PWA)
                  </h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    لا يتطلب شراء حساب مطور من آبل (توفير 99 دولار سنوياً)، ولا يخضع لاقتطاع آبل لنسبة 30% من الاشتراكات!
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside">
                    <li>المستخدم يفتح الرابط في متصفح Safari.</li>
                    <li>يضغط على زر المشاركة (Share) في الأسفل.</li>
                    <li>يختار "إضافة إلى الشاشة الرئيسية" (Sur l'écran d'accueil).</li>
                    <li>يظهر التطبيق كأيقونة مستقلة فوراً.</li>
                  </ul>
                </div>

                {/* Method B: Native App Store Package */}
                <div className="p-5 bg-white rounded-2xl border-2 border-blue-300 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">
                      متجر Apple الرسمي
                    </span>
                    <span className="text-xl">🍏</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    المسار 2: التغليف الرسمي عبر Capacitor و Xcode
                  </h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    للنشر الرسمي في App Store ليظهر في بحث ملايين المستخدمين:
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                    <li>حساب <strong>Apple Developer Program</strong> بقيمة 99$ / سنة.</li>
                    <li>تغليف الواجهة عبر <strong>@capacitor/ios</strong>.</li>
                    <li>تجميع المشروع في برنامج Xcode على جهاز Mac (أو سحابياً عبر Codemagic / GitHub Actions بدون الحاجة لشراء Mac!).</li>
                    <li>رفع النسخة إلى <strong>TestFlight</strong> ثم الإرسال للمراجعة (App Store Review).</li>
                  </ul>
                </div>

              </div>

              {/* Capacitor Code Block for iOS */}
              <div className="p-4 bg-slate-900 text-slate-100 rounded-2xl space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-300 font-sans">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-blue-400" />
                    <span className="font-bold text-xs">أوامر تحويل التطبيق لـ iOS App Store باستخدام Capacitor:</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(capacitorCode, 'capacitor')}
                    className="flex items-center gap-1 text-[11px] bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-md text-blue-400 cursor-pointer"
                  >
                    {copiedText === 'capacitor' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedText === 'capacitor' ? 'تم النسخ!' : 'نسخ أوامر iOS'}</span>
                  </button>
                </div>
                <pre className="bg-slate-950 p-3 rounded-xl overflow-x-auto text-[11px] leading-relaxed text-blue-300">
                  {capacitorCode}
                </pre>
              </div>

              {/* Quick Online Generator via PWABuilder for iOS */}
              <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="space-y-1 text-center sm:text-start">
                  <span className="font-bold text-slate-900 text-xs sm:text-sm">
                    توليد ملف مشروع iOS مباشرة بدون سطر الأوامر:
                  </span>
                  <p className="text-slate-500 text-xs">
                    توفر PWABuilder أيضاً خيار توليد حزمة iOS Package بضغطة زر واحدة.
                  </p>
                </div>
                <a
                  href={`https://www.pwabuilder.com/?site=${encodeURIComponent(currentOrigin)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center gap-2 transition cursor-pointer shrink-0"
                >
                  <span>توليد حزمة iOS</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          )}

          {/* TAB 3: ASSET LINKS */}
          {activeTab === 'assetLinks' && (
            <div className="space-y-5">
              <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 space-y-2">
                <div className="flex items-center gap-2 text-purple-900 font-bold">
                  <FileCode className="w-4 h-4 text-purple-600" />
                  <span>ما هو ملف Digital Asset Links ولماذا تطلبه Google؟</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  يطلب متجر Google Play وجود ملف باسم <code className="bg-purple-100 px-1 py-0.5 rounded font-mono font-bold text-purple-900">assetlinks.json</code> مستضاف داخل مسار <code className="bg-purple-100 px-1 py-0.5 rounded font-mono font-bold text-purple-900">/.well-known/</code> لإثبات ملكيتك للموقع. عند وجوده، يقوم هاتف أندرويد <strong>بإخفاء شريط المتصفح فوراً</strong> ليظهر التطبيق في شاشة كاملة ونقية بنسبة 100%.
                </p>
              </div>

              <div className="p-4 bg-slate-900 text-slate-100 rounded-2xl space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-300 font-sans">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-purple-300">محتوى ملف public/.well-known/assetlinks.json</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(assetLinksJson, 'assetlinks')}
                    className="flex items-center gap-1 text-[11px] bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-md text-purple-300 cursor-pointer"
                  >
                    {copiedText === 'assetlinks' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedText === 'assetlinks' ? 'تم النسخ!' : 'نسخ الكود'}</span>
                  </button>
                </div>
                <pre className="bg-slate-950 p-3 rounded-xl overflow-x-auto text-[11px] leading-relaxed text-purple-200">
                  {assetLinksJson}
                </pre>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 block">رابط الملف المباشر على الخادم:</span>
                  <a 
                    href={assetLinksUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-emerald-700 underline font-mono text-xs block truncate"
                  >
                    {assetLinksUrl}
                  </a>
                </div>
                <a
                  href={assetLinksUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-bold text-xs flex items-center gap-1 shrink-0"
                >
                  <span>معاينة الرابط</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* TAB 4: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-5">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-900 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>سياسة الخصوصية الرسمية الجاهزة للمتاجر (Google Play & App Store):</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  ترفض كل من Google و Apple أي تطبيق لا يحتوي على رابط سياسة خصوصية يعمل على الويب. قمنا بإنشاء وتجهيز صفحة كاملة متوافقة مع <strong>القانون الجزائري رقم 18-07 لحماية المعطيات ذات الطابع الشخصي</strong>.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">الرابط الإلزامي الذي تضعه في Google Play Console:</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    شغال وجاهز
                  </span>
                </div>
                
                <div className="flex items-center gap-2 p-2.5 bg-slate-100 rounded-xl font-mono text-xs text-slate-800 break-all">
                  <span className="truncate flex-1">{privacyUrl}</span>
                  <button
                    onClick={() => copyToClipboard(privacyUrl, 'privacyUrl')}
                    className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-sans font-bold text-xs flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    {copiedText === 'privacyUrl' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedText === 'privacyUrl' ? 'تم النسخ!' : 'نسخ الرابط'}</span>
                  </button>
                </div>

                <div className="flex justify-end pt-1">
                  <a
                    href="/privacy-policy.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-bold hover:underline"
                  >
                    <span>فتح صفحة سياسة الخصوصية وقراءتها</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Legal Summary */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-600">
                <h4 className="font-bold text-slate-900">أهم بنود الخصوصية المعتمدة في تطبيق خدمة ديزاد:</h4>
                <ul className="space-y-1.5 list-disc list-inside">
                  <li>حماية وتشفير أرقام هواتف المتعاملين الجزائريين (Ooredoo, Mobilis, Djezzy).</li>
                  <li>استخدام الموقع الجغرافي فقط عند طلب حرفي طارئ (SOS) أو البحث عن ورشات قريبة.</li>
                  <li>حماية وثائق الهوية البيومترية وبطاقة الحرفي (CAM) وعدم مشاركتها مع أطراف ثالثة.</li>
                  <li>حق المستخدم في طلب حذف حسابه وبياناته نهائياً في أي وقت.</li>
                </ul>
              </div>

            </div>
          )}

          {/* TAB 5: STORE ASSETS & GRAPHICS */}
          {activeTab === 'assets' && (
            <div className="space-y-6">
              
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-emerald-600" />
                  <span>المواصفات الإلزامية لتصاميم وأيقونات متجري التطبيقات:</span>
                </h4>
                <p className="text-slate-600 text-xs">
                  يجب تجهيز الملفات بالقياسات التالية قبل الضغط على نشر في لوحة التحكم:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Google Play Specs */}
                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold">
                    <span>🤖 متطلبات Google Play Store:</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>أيقونة التطبيق:</strong> 512 × 512 بكسل (PNG 32-bit مع قناة ألفا، حجم أقل من 1MB).
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>اللافتة المميزة (Feature Graphic):</strong> 1024 × 500 بكسل (JPEG أو PNG، بدون شفافية).
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>لقطات الشاشة (Screenshots):</strong> صورتين على الأقل للهاتف بقياس 16:9 أو 9:16 (بين 320 و 3840 بكسل).
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Apple App Store Specs */}
                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-blue-800 font-bold">
                    <span>🍏 متطلبات Apple App Store:</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>أيقونة App Store Icon:</strong> 1024 × 1024 بكسل (PNG بدون شفافية RGB).
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>لقطات آيفون 6.7 بوصة:</strong> 1290 × 2796 بكسل (iPhone 15 Pro Max / 14 Pro Max).
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>لقطات آيباد 12.9 بوصة (اختياري):</strong> 2048 × 2732 بكسل (iPad Pro).
                      </div>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Download Current App Icon */}
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-extrabold text-xl shadow-md border-2 border-emerald-800 shrink-0">
                    DZ
                  </div>
                  <div>
                    <h5 className="font-bold text-emerald-950 text-xs sm:text-sm">
                      أيقونة خدمة ديزاد الرسمية متوفرة في المشروع
                    </h5>
                    <p className="text-[11px] text-emerald-800">
                      ملف فيكتور عالي الدقة: <code className="bg-white/80 px-1 py-0.5 rounded font-mono">/public/pwa-icon.svg</code>
                    </p>
                  </div>
                </div>

                <a
                  href="/pwa-icon.svg"
                  download="khedma-dz-store-icon.svg"
                  className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition shrink-0 cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>تنزيل الأيقونة</span>
                </a>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2 text-slate-600">
            <Info className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>معرف الحزمة المعتمد: <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono font-bold text-slate-900">com.khedmadz.app</code></span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition cursor-pointer"
            >
              إغلاق النافذة
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
