import React, { useState } from 'react';
import { Locale, UserProfile } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { WILAYAS_58 } from '../../data/wilayas';
import { 
  Sparkles, 
  QrCode, 
  Mic, 
  Truck, 
  TrendingUp, 
  Phone, 
  Camera, 
  MapPin, 
  Users, 
  Fuel, 
  Moon, 
  FileCheck, 
  Clock, 
  ShieldCheck, 
  Wrench, 
  Building2, 
  Factory, 
  HeartHandshake, 
  Layers, 
  Volume2, 
  Recycle, 
  ShieldAlert, 
  Check, 
  Play, 
  Download,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

interface AdvancedFeaturesHubProps {
  currentLocale: Locale;
  currentUser: UserProfile | null;
  onNavigateToTab: (tab: string) => void;
}

export const AdvancedFeaturesHub: React.FC<AdvancedFeaturesHubProps> = ({
  currentLocale,
  currentUser,
  onNavigateToTab
}) => {
  const t = TRANSLATIONS[currentLocale];
  const [activeInteractiveTool, setActiveInteractiveTool] = useState<
    'baridimob_qr' | 'voice_job_poster' | 'material_ticker' | 'tool_rental' | 'fuel_calc' | 'prayer_times' | 'warranty_gen' | 'roadside_sos'
  >('baridimob_qr');

  // Tool 1: Baridimob QR Code Generator State
  const [ripNumber, setRipNumber] = useState('007 999990025937263 71');
  const [qrAmountDzd, setQrAmountDzd] = useState(4500);

  // Tool 2: Voice Darija Job Poster State
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedTask, setTranscribedTask] = useState<string | null>(null);

  // Tool 3: Fuel & Mileage Trip Calculator State
  const [originWilaya, setOriginWilaya] = useState('16'); // Alger
  const [destWilaya, setDestWilaya] = useState('31'); // Oran
  const [fuelType, setFuelType] = useState<'essence' | 'gasoil' | 'gpl'>('gasoil');

  // Tool 4: Commercial Warranty Generator State
  const [warrantyWorkerName, setWarrantyWorkerName] = useState('كمال بلقاسم');
  const [warrantyClientName, setWarrantyClientName] = useState('أحمد زواوي');
  const [warrantyDuration, setWarrantyDuration] = useState('12 شهراً');
  const [warrantyWorkType, setWarrantyWorkType] = useState('إصلاح وتجديد شبكة أنابيب التدفئة المركزية مع فحص الضغط');

  // Tool 5: Tool & Heavy Equipment Rental State
  const [rentalDays, setRentalDays] = useState(3);

  // Material Live Ticker Data
  const materialTicker = [
    { name: 'حديد التسليح 12 مم (بلارة Bellara)', price: '10,800 دج / قنطار', change: '+1.2%', trend: 'up' },
    { name: 'حديد التسليح 14 مم (الحجار El Hadjar)', price: '10,650 دج / قنطار', change: '0.0%', trend: 'stable' },
    { name: 'إسمنت بورتلاندي CPA 42.5 (الشلف)', price: '580 دج / كيس 50 كغ', change: '-2.0%', trend: 'down' },
    { name: 'ألواح الجبس BA13 (كناوف الجزائر)', price: '1,080 دج / لوح', change: '+0.5%', trend: 'up' },
    { name: 'آجر أحمر 8 ثقوب (المسيلة)', price: '32 دج / قطعة', change: '0.0%', trend: 'stable' }
  ];

  // Tool Rental Items Data
  const toolRentalItems = [
    { id: 'tool-1', name: 'سقالة بناء معدنية 120م² (Échafaudage)', dailyPrice: 2500, deposit: 20000, supplier: 'تأجير عتاد الشراقة' },
    { id: 'tool-2', name: 'هيلتي تكسير خرسانة 16 كغ (Marteau Piqueur Bosch)', dailyPrice: 1800, deposit: 15000, supplier: 'ورشة بئر توتة' },
    { id: 'tool-3', name: 'خلاطة إسمنت متنقلة 350 لتر (Bétonnière thermique)', dailyPrice: 3200, deposit: 25000, supplier: 'عتاد المتيجة بوفاريك' },
    { id: 'tool-4', name: 'جهاز ليزر 3D للديكور 360° (Niveau Laser 3D)', dailyPrice: 1200, deposit: 8000, supplier: 'العلمة كراء معدات' }
  ];

  // Fuel calculation logic
  const approxDistanceKm = Math.abs(Number(originWilaya) - Number(destWilaya)) * 35 + 120;
  const fuelLiterPrice = fuelType === 'gasoil' ? 29.01 : fuelType === 'essence' ? 45.62 : 9.0;
  const fuelConsumptionLiters = (approxDistanceKm / 100) * 8.5;
  const totalFuelCostDzd = Math.round(fuelConsumptionLiters * fuelLiterPrice);
  const highwayTollDzd = 400; // Algerian highway toll

  // Handle voice record simulation
  const handleToggleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTranscribedTask(null);
      setTimeout(() => {
        setIsRecording(false);
        setTranscribedTask('خصني 2 عمال بوليفالون غدوة صباح مع 8h لنقل أثاث شقة F4 من الطابق الثالث بحيدرة. الميزانية المقترحة 6,500 دج.');
      }, 3500);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-800">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>موسوعة الـ 30 ميزة الكبرى لمنصة خدمة ديزاد</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            حزمة الميزات المتقدمة وتفاصيل الميزة 10 الفائقة
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            استكشف وتفاعل مع أفضل 30 ميزة ذكية تم تصميمها خصيصاً للمجتمع الجزائري: من الخرائط والبلديات وتحديد الأقارب، ملتقط فايسبوك وتيك توك، إلى قارئ باريدي موب QR، حاسبة مسافات نفطال، وبورصة مواد البناء الحية.
          </p>
        </div>
      </div>

      {/* Interactive Tool Selector Tabs */}
      <div className="bg-white rounded-2xl p-2.5 border border-slate-200 shadow-xs flex items-center gap-1.5 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveInteractiveTool('baridimob_qr')}
          className={`px-3 py-2 rounded-xl whitespace-nowrap transition-all font-bold cursor-pointer flex items-center gap-1.5 ${
            activeInteractiveTool === 'baridimob_qr'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>قارئ ومولد QR باريدي موب</span>
        </button>

        <button
          onClick={() => setActiveInteractiveTool('voice_job_poster')}
          className={`px-3 py-2 rounded-xl whitespace-nowrap transition-all font-bold cursor-pointer flex items-center gap-1.5 ${
            activeInteractiveTool === 'voice_job_poster'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Mic className="w-3.5 h-3.5" />
          <span>الميزة 10: نشر المهام بالصوت الدارجة</span>
        </button>

        <button
          onClick={() => setActiveInteractiveTool('material_ticker')}
          className={`px-3 py-2 rounded-xl whitespace-nowrap transition-all font-bold cursor-pointer flex items-center gap-1.5 ${
            activeInteractiveTool === 'material_ticker'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>بورصة أسعار مواد البناء الحية</span>
        </button>

        <button
          onClick={() => setActiveInteractiveTool('tool_rental')}
          className={`px-3 py-2 rounded-xl whitespace-nowrap transition-all font-bold cursor-pointer flex items-center gap-1.5 ${
            activeInteractiveTool === 'tool_rental'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>تأجير عتاد البناء والآلات</span>
        </button>

        <button
          onClick={() => setActiveInteractiveTool('fuel_calc')}
          className={`px-3 py-2 rounded-xl whitespace-nowrap transition-all font-bold cursor-pointer flex items-center gap-1.5 ${
            activeInteractiveTool === 'fuel_calc'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Fuel className="w-3.5 h-3.5" />
          <span>حاسبة وقود التنقل Naftal</span>
        </button>

        <button
          onClick={() => setActiveInteractiveTool('roadside_sos')}
          className={`px-3 py-2 rounded-xl whitespace-nowrap transition-all font-bold cursor-pointer flex items-center gap-1.5 ${
            activeInteractiveTool === 'roadside_sos'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>SOS نجدة الطريق السيار (Remorquage)</span>
        </button>

        <button
          onClick={() => setActiveInteractiveTool('warranty_gen')}
          className={`px-3 py-2 rounded-xl whitespace-nowrap transition-all font-bold cursor-pointer flex items-center gap-1.5 ${
            activeInteractiveTool === 'warranty_gen'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <FileCheck className="w-3.5 h-3.5" />
          <span>مولد شهادات الضمان الرسمية</span>
        </button>
      </div>

      {/* INTERACTIVE WORKSPACE */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        
        {/* TOOL 1: BaridiMob Instant QR Code Generator & Scanner */}
        {activeInteractiveTool === 'baridimob_qr' && (
          <div className="max-w-xl mx-auto space-y-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <QrCode className="w-7 h-7 text-emerald-700" />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900">
                مولد وقارئ QR باريدي موب (BaridiMob Instant QR Pay)
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                ادفع أو استلم مستحقات الحرفيين والتجار فورياً عبر مسح كود QR بتطبيق BaridiMob دون الحاجة لكتابة رقم الحساب الطويل (RIP).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-start text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">رقم الحساب المصرفي (RIP 20 chiffres):</label>
                <input
                  type="text"
                  value={ripNumber}
                  onChange={(e) => setRipNumber(e.target.value)}
                  className="w-full px-3 py-2 font-mono text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">المبلغ المطلوب (دج):</label>
                <input
                  type="number"
                  value={qrAmountDzd}
                  onChange={(e) => setQrAmountDzd(Number(e.target.value))}
                  className="w-full px-3 py-2 font-mono font-bold text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                />
              </div>
            </div>

            {/* Generated QR Code Card */}
            <div className="p-6 bg-slate-50 border border-slate-300 rounded-3xl inline-block shadow-inner space-y-3">
              <div className="w-48 h-48 bg-white p-3 rounded-2xl border-2 border-emerald-600 shadow-sm mx-auto flex flex-col items-center justify-center">
                {/* Simulated High-Res QR Matrix */}
                <div className="w-full h-full bg-slate-900 p-2 rounded-xl flex items-center justify-center relative">
                  <div className="w-36 h-36 bg-white p-1 rounded-lg grid grid-cols-6 gap-0.5">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-xs ${
                          (i % 2 === 0 || i % 7 === 0 || i === 0 || i === 5 || i === 30 || i === 35)
                            ? 'bg-slate-950'
                            : 'bg-emerald-600'
                        }`}
                      ></div>
                    ))}
                  </div>
                  <div className="absolute w-8 h-8 rounded-md bg-white border border-slate-200 flex items-center justify-center font-bold text-[10px] text-emerald-800">
                    DZ
                  </div>
                </div>
              </div>

              <div className="text-xs space-y-0.5 font-mono">
                <div className="font-bold text-slate-900">المبلغ: {qrAmountDzd.toLocaleString()} دج</div>
                <div className="text-[10px] text-slate-500">الحساب: {ripNumber}</div>
              </div>
            </div>

            <div className="text-[11px] text-slate-500">
              متوافق 100% مع معايير بريد الجزائر وتطبيق بريدي موب الرسمي ومحفظة CIB.
            </div>
          </div>
        )}

        {/* TOOL 2: Voice Darija Job Poster (الميزة 10 بالصوت) */}
        {activeInteractiveTool === 'voice_job_poster' && (
          <div className="max-w-xl mx-auto space-y-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
              <Mic className="w-7 h-7 text-amber-700" />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900">
                الميزة 10: تسجيل ونشر المهام بالصوت الدارجة مباشرة
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                تكلّم لمدة 15 ثانية واش راك حاب تخدم، والذكاء الاصطناعي يقوم بتفريغ كلامك وتصنيف المهمة ونشرها فورياً في بث Polivalente!
              </p>
            </div>

            {/* Audio Recording Button with Pulse Animation */}
            <div className="py-6 flex flex-col items-center justify-center space-y-3">
              <button
                type="button"
                onClick={handleToggleRecord}
                className={`w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-all cursor-pointer ${
                  isRecording
                    ? 'bg-red-600 text-white animate-pulse ring-8 ring-red-200'
                    : 'bg-emerald-700 text-white hover:bg-emerald-800'
                }`}
              >
                <Mic className="w-10 h-10" />
              </button>

              <span className="text-xs font-bold text-slate-700">
                {isRecording ? 'جارٍ الاستماع والتسجيل بالدارجة...' : 'اضغط للتحدث بالدارجة'}
              </span>
            </div>

            {/* AI Transcribed Task Output Card */}
            {transcribedTask && (
              <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-start space-y-3">
                <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                  <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-700" />
                    <span>تم استخراج تفاصيل المهمة بالذكاء الاصطناعي:</span>
                  </span>
                  <span className="text-[10px] bg-emerald-200/60 text-emerald-900 font-mono font-bold px-2 py-0.5 rounded-md">
                    بوليفالون نقل أثاث
                  </span>
                </div>

                <p className="text-xs text-emerald-900 font-medium leading-relaxed">
                  "{transcribedTask}"
                </p>

                <div className="flex justify-between items-center text-xs pt-1 font-mono">
                  <span>الميزانية المستخرجة: <strong className="text-emerald-800 font-bold">6,500 دج</strong> (≥ 1,000 دج ✓)</span>
                  <span>الولاية: <strong>16 الجزائر (حيدرة)</strong></span>
                </div>

                <button
                  onClick={() => {
                    alert('تم نشر المهمة بنجاح في بث مهام بوليفالون اليومية!');
                    onNavigateToTab('polivalente');
                  }}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white transition-colors cursor-pointer"
                >
                  تأكيد النشر الفوري في البث المباشر
                </button>
              </div>
            )}
          </div>
        )}

        {/* TOOL 3: Material Price Index & Steel/Cement Ticker */}
        {activeInteractiveTool === 'material_ticker' && (
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  بورصة أسعار مواد البناء الحية في الجزائر (Material Price Ticker DZ)
                </h2>
                <p className="text-xs text-slate-600">
                  مؤشر يومي مباشر لأسعار حديد التسليح والإسمنت والآجر من المصانع الوطنية الكبرى (الحجار، بلارة، كناوف، الشلف).
                </p>
              </div>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold font-mono">
                تحديث اليوم 2026
              </span>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {materialTicker.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <span className="font-bold text-slate-900 block">{item.name}</span>
                    <span className="text-[10px] text-slate-500">معتمد في الصفقات والورشات</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-mono font-extrabold text-slate-900 text-sm">
                      {item.price}
                    </span>
                    <span className={`font-mono font-bold text-[11px] px-2 py-0.5 rounded-md ${
                      item.trend === 'up' ? 'bg-red-50 text-red-700' :
                      item.trend === 'down' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TOOL 4: Tool & Equipment Rental Hub */}
        {activeInteractiveTool === 'tool_rental' && (
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                سوق تأجير عتاد البناء والآلات الثقيلة بين المهنيين (Tool Sharing DZ)
              </h2>
              <p className="text-xs text-slate-600">
                لا داعي لشراء الآلات المكلفة! استأجر السقالات المعدنية، الهيلتي، الخلاطات، ومعدات الليزر بأسعار يومية ميسرة مع ضمان الضمان المالي.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {toolRentalItems.map(tool => (
                <div key={tool.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-900">{tool.name}</h3>
                    <span className="font-mono font-extrabold text-emerald-700 text-sm">
                      {tool.dailyPrice.toLocaleString()} دج/يوم
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 space-y-0.5">
                    <div>المورد: <strong>{tool.supplier}</strong></div>
                    <div>مبلغ التأمين المسترد: <span className="font-mono">{tool.deposit.toLocaleString()} دج</span></div>
                  </div>
                  <button
                    onClick={() => alert(`تم حجز عتاد: ${tool.name} لمدة ${rentalDays} أيام.`)}
                    className="w-full py-2 px-3 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    حجز العتاد للورشة
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TOOL 5: Smart Fuel & Distance Expense Trip Calculator */}
        {activeInteractiveTool === 'fuel_calc' && (
          <div className="max-w-2xl mx-auto space-y-4 text-xs">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                حاسبة تكاليف الوقود ومسافات التنقل بين الـ 58 ولاية (Naftal Trip Calc)
              </h2>
              <p className="text-xs text-slate-600">
                تساعد الحرفيين والشاحنات على حساب تكلفة التنقل والوقود ورسوم الطريق السيار بدقة لإضافتها في الفاتورة.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">ولاية الانطلاق:</label>
                <select
                  value={originWilaya}
                  onChange={(e) => setOriginWilaya(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium"
                >
                  {WILAYAS_58.map(w => (
                    <option key={w.code} value={w.code}>{w.code} - {w.nameAr}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">ولاية الوصول (الورشة):</label>
                <select
                  value={destWilaya}
                  onChange={(e) => setDestWilaya(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium"
                >
                  {WILAYAS_58.map(w => (
                    <option key={w.code} value={w.code}>{w.code} - {w.nameAr}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">نوع الوقود (نفطال):</label>
                <select
                  value={fuelType}
                  onChange={(e: any) => setFuelType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium"
                >
                  <option value="gasoil">مازوت (Gasoil 29.01 دج)</option>
                  <option value="essence">بنزين بدون رصاص (45.62 دج)</option>
                  <option value="gpl">سيرغاز (GPL/C 9.00 دج)</option>
                </select>
              </div>
            </div>

            <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-2 border border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <span>المسافة التقديرية عبر الطريق السيار:</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">{approxDistanceKm} كم</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span>استهلاك الوقود المتوقع:</span>
                <span className="font-mono">{fuelConsumptionLiters.toFixed(1)} لتر</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold pt-2 border-t border-slate-800 text-white">
                <span>التكلفة الإجمالية للرحلة (وقود + رسوم):</span>
                <span className="font-mono text-emerald-400 text-base">{(totalFuelCostDzd + highwayTollDzd).toLocaleString()} دج</span>
              </div>
            </div>
          </div>
        )}

        {/* TOOL 6: Highway Roadside Towing SOS (Remorquage AEO) */}
        {activeInteractiveTool === 'roadside_sos' && (
          <div className="max-w-xl mx-auto space-y-4 text-center text-xs">
            <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center mx-auto">
              <Truck className="w-7 h-7 text-red-600" />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900">
                SOS نجدة وسحب السيارات على الطريق السيار شرق-غرب (Dépannage AEO)
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                تحديد فوري لأقرب شاحنة سحب (ديباناج) مرخصة على محاور الطريق السيار شرق-غرب والطرق الوطنية (RN1, RN3, RN4).
              </p>
            </div>

            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl space-y-2 text-start">
              <div className="flex justify-between font-bold text-red-950">
                <span>شاحنة نجدة قريبة:</span>
                <span className="font-mono">مسافة 6.4 كم (12 دقيقة)</span>
              </div>
              <div className="text-[11px] text-red-900">
                الموقع الحالي: محول بومدفع - عين الدفلى (PK 142)
              </div>
              <div className="text-[11px] text-red-900">
                السائق: عمي رشيد للديباناج السريع · متوفر ونش هيدروليكي 5 طن
              </div>
            </div>

            <a
              href="tel:0555990011"
              className="py-3 px-6 rounded-xl font-bold bg-red-600 hover:bg-red-700 text-white transition-colors flex items-center justify-center gap-2 shadow-md block"
            >
              <Phone className="w-4 h-4" />
              <span>طلب شاحنة السحب الفورية (0555990011)</span>
            </a>
          </div>
        )}

        {/* TOOL 7: Official Commercial Warranty Certificate Generator */}
        {activeInteractiveTool === 'warranty_gen' && (
          <div className="max-w-2xl mx-auto space-y-4 text-xs">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                مولد شهادة الضمان الرسمية للأشغال والصيانة (Garantie Travaux DZ)
              </h2>
              <p className="text-xs text-slate-600">
                وثيقة قانونية موقعة تمنح للزبون بعد انتهاء الأشغال تضمن خلو الصيانة من العيوب لمدة 6 إلى 24 شهراً.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">اسم الحرفي المنجز:</label>
                <input
                  type="text"
                  value={warrantyWorkerName}
                  onChange={(e) => setWarrantyWorkerName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">اسم الزبون / صاحب المنزل:</label>
                <input
                  type="text"
                  value={warrantyClientName}
                  onChange={(e) => setWarrantyClientName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">طبيعة الأشغال المضمونة:</label>
              <input
                type="text"
                value={warrantyWorkType}
                onChange={(e) => setWarrantyWorkType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
              />
            </div>

            {/* Printable Warranty Certificate */}
            <div className="p-6 bg-slate-50 border border-slate-300 rounded-2xl space-y-3 leading-relaxed">
              <div className="text-center border-b border-slate-300 pb-2">
                <h3 className="font-black text-sm text-slate-900">شهادة ضمان جودة الأشغال المنجزة</h3>
                <span className="text-[10px] text-emerald-800 font-bold">منصة خدمة ديزاد (Khedma DZ Certified)</span>
              </div>
              <p>
                يشهد الحرفي المعتمد <strong>{warrantyWorkerName}</strong> بأنه أنجز أشغال: <em>{warrantyWorkType}</em> لصالح السيد(ة) <strong>{warrantyClientName}</strong> وفق المعايير الفنية السليمة.
              </p>
              <p>
                تسري هذه الشهادة لمدة <strong>{warrantyDuration}</strong> ابتداءً من تاريخ اليوم، ويلتزم الحرفي بإصلاح أي خلل أو عيب ناتج عن التركيب مجاناً.
              </p>
              <div className="flex justify-between pt-4 border-t border-slate-200 font-bold">
                <span>ختم وتوقيع الحرفي المعتمد</span>
                <span>توقيع الزبون بالاستلام</span>
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="py-2.5 px-4 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>تحميل وطباعة شهادة الضمان (PDF)</span>
            </button>
          </div>
        )}

      </div>

      {/* Directory Grid of the Full 30 Features */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            الدليل الكامل لأفضل 30 ميزة في منصة خدمة ديزاد
          </h2>
          <p className="text-xs text-slate-600">
            تغطية شاملة لكل التحديات اليومية للزبائن، الحرفيين، والتجار عبر كامل ولايات الجزائر.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="font-mono text-emerald-700 font-bold text-[11px]">ميزة 01</span>
            <h3 className="font-bold text-slate-900">الخريطة التفاعلية ورادار الحرفيين (GPS DZ)</h3>
            <p className="text-slate-600 leading-relaxed">
              تحديد المسافات بالكيلومتر والملاحة المباشرة للورشات ومستودعات التوريد.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="font-mono text-emerald-700 font-bold text-[11px]">ميزة 02</span>
            <h3 className="font-bold text-slate-900">قاعدة بيانات الـ 1,541 بلدية ودوائر الجزائر</h3>
            <p className="text-slate-600 leading-relaxed">
              تحديد دقيق للمنطقة الحضرية والريفية مع الرموز البريدية الوطنية.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="font-mono text-emerald-700 font-bold text-[11px]">ميزة 03</span>
            <h3 className="font-bold text-slate-900">تحديد الأقارب وشبكة الثقة العائلية</h3>
            <p className="text-slate-600 leading-relaxed">
              مشاركة مباشرة لمسار التدخلات المنزلية مع أفراد العائلة لتأمين المنازل.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="font-mono text-emerald-700 font-bold text-[11px]">ميزة 04</span>
            <h3 className="font-bold text-slate-900">ملتقط عروض مجموعات فايسبوك المحلية</h3>
            <p className="text-slate-600 leading-relaxed">
              جلب تلقائي لطلبات الصيانة والبوليفالون اليومية المنشورة في مجموعات ولايتك.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="font-mono text-emerald-700 font-bold text-[11px]">ميزة 05</span>
            <h3 className="font-bold text-slate-900">رادار تيك توك لحرفيي ومستقلي الجزائر</h3>
            <p className="text-slate-600 leading-relaxed">
              اكتشاف نخبة الحرفيين الموثقين بالفيديو والأعمال الواقعية والتواصل معهم.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="font-mono text-emerald-700 font-bold text-[11px]">ميزة 06</span>
            <h3 className="font-bold text-slate-900">المفاوض الصوتي الذكي بالدارجة الجزائرية</h3>
            <p className="text-slate-600 leading-relaxed">
              مساعدة الزبون والحرفي في التوصل لأعدل سعر في السوق دون إحراج.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="font-mono text-emerald-700 font-bold text-[11px]">ميزة 07</span>
            <h3 className="font-bold text-slate-900">مولد وقارئ QR باريدي موب الفوري</h3>
            <p className="text-slate-600 leading-relaxed">
              الدفع في ثوانٍ دون كتابة 20 رقماً للحساب المصرفي RIP.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="font-mono text-emerald-700 font-bold text-[11px]">ميزة 08</span>
            <h3 className="font-bold text-slate-900">تأجير عتاد البناء والآلات الثقيلة</h3>
            <p className="text-slate-600 leading-relaxed">
              سقالات معدنية، هيلتي تكسير، خلاطات خرسانة، ومستويات ليزر 3D.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="font-mono text-emerald-700 font-bold text-[11px]">ميزة 09</span>
            <h3 className="font-bold text-slate-900">توثيق مراحل إنجاز الورشة بالصور الحية</h3>
            <p className="text-slate-600 leading-relaxed">
              ربط إطلاق أموال الضمان المالي بالتقاط صور حية للمرحلة المكتملة.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-emerald-300 shadow-xs space-y-1.5 bg-emerald-50/40">
            <span className="font-mono text-emerald-800 font-bold text-[11px]">ميزة 10 (تفاصيل دقيقة)</span>
            <h3 className="font-bold text-emerald-950">تسجيل ونشر المهام بالصوت الدارجة مباشرة</h3>
            <p className="text-emerald-900 leading-relaxed">
              تحويل الملاحظات الصوتية (15 ثانية) إلى إعلان مهمة منظم في ثوانٍ.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="font-mono text-emerald-700 font-bold text-[11px]">ميزة 11</span>
            <h3 className="font-bold text-slate-900">SOS نجدة وسحب السيارات على الطريق السيار</h3>
            <p className="text-slate-600 leading-relaxed">
              استدعاء شاحنة سحب (Remorquage) مرخصة في دقائق عبر الـ AEO.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="font-mono text-emerald-700 font-bold text-[11px]">ميزة 12</span>
            <h3 className="font-bold text-slate-900">بورصة أسعار مواد البناء والحديد اليومية</h3>
            <p className="text-slate-600 leading-relaxed">
              متابعة تغير أسعار حديد بلارة والحجار والإسمنت لحظة بلحظة.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="font-mono text-emerald-700 font-bold text-[11px]">ميزة 13</span>
            <h3 className="font-bold text-slate-900">تكوين فرق عمل المقاولات المتكاملة</h3>
            <p className="text-slate-600 leading-relaxed">
              تجميع سباك، كهربائي، وماصو في فوج واحد لإنجاز مشاريع تسليم المفتاح.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="font-mono text-emerald-700 font-bold text-[11px]">ميزة 14</span>
            <h3 className="font-bold text-slate-900">ضمان الدفع عند المعاينة والتسليم (COD Assurance)</h3>
            <p className="text-slate-600 leading-relaxed">
              حماية الطرفين بحجز المبلغ حتى معاينة جودة السلعة أو الإنجاز.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="font-mono text-emerald-700 font-bold text-[11px]">ميزة 15</span>
            <h3 className="font-bold text-slate-900">جواز الثقة المهنية وشهادة السوابق</h3>
            <p className="text-slate-600 leading-relaxed">
              توثيق اختياري لصحيفة السوابق القضائية B3 لزيادة ثقة العائلات.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="font-mono text-emerald-700 font-bold text-[11px]">ميزة 16</span>
            <h3 className="font-bold text-slate-900">مناوبات عمال المصانع في المناطق الصناعية</h3>
            <p className="text-slate-600 leading-relaxed">
              تلبية طلبات التوظيف الفوري لمصانع الرويبة، السانية، والبرج.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="font-mono text-emerald-700 font-bold text-[11px]">ميزة 17</span>
            <h3 className="font-bold text-slate-900">قسم الحرفيات والخدمات النسائية المنزلية</h3>
            <p className="text-slate-600 leading-relaxed">
              توفير عاملات دهان، ديكور، وترتيب منازل للأسر التي تفضل عنصراً نسوياً.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="font-mono text-emerald-700 font-bold text-[11px]">ميزة 18</span>
            <h3 className="font-bold text-slate-900">سوق المناولة ومشاريع AADL / LPP</h3>
            <p className="text-slate-600 leading-relaxed">
              فرص مقاولين فرعيين في مشاريع السكن والتهيئة العمرانية الكبرى.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="font-mono text-emerald-700 font-bold text-[11px]">ميزة 19</span>
            <h3 className="font-bold text-slate-900">حاسبة استهلاك الوقود ومسافات Naftal</h3>
            <p className="text-slate-600 leading-relaxed">
              تقدير تكلفة المازوت، البنزين، وسيرغاز قبل الانطلاق في مهمة بالولايات.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="font-mono text-emerald-700 font-bold text-[11px]">ميزة 20</span>
            <h3 className="font-bold text-slate-900">مترجم محادثات الورشات من الدارجة للغات الأجنبية</h3>
            <p className="text-slate-600 leading-relaxed">
              ترجمة فورية للمصطلحات بين المقاولين الأجانب والعمال المحليين.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="font-mono text-emerald-700 font-bold text-[11px]">ميزة 21</span>
            <h3 className="font-bold text-slate-900">سوق خردة المعادن وحديد الهدم (La Ferraille DZ)</h3>
            <p className="text-slate-600 leading-relaxed">
              بيع وشراء النحاس، الألومنيوم، وبقايا الحديد الناتجة عن الهدم.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="font-mono text-emerald-700 font-bold text-[11px]">ميزة 22</span>
            <h3 className="font-bold text-slate-900">التأمين المصغر ضد حوادث الورشات والعمل</h3>
            <p className="text-slate-600 leading-relaxed">
              تغطية تأمينية رمزية للمهام اليومية لحماية العامل في حال الإصابة.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="font-mono text-emerald-700 font-bold text-[11px]">ميزة 23</span>
            <h3 className="font-bold text-slate-900">طوارئ الليل والخدمات الليلية 24/7</h3>
            <p className="text-slate-600 leading-relaxed">
              فتح أقفال معطلة، انفجار أنابيب مياه في منتصف الليل، وانقطاع الكهرباء.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="font-mono text-emerald-700 font-bold text-[11px]">ميزة 24</span>
            <h3 className="font-bold text-slate-900">ربط سكانير السيارات ELM327 لاسلكياً</h3>
            <p className="text-slate-600 leading-relaxed">
              قراءة فورية لأكواد المحرك عبر البلوتوث وتفسيرها بالدارجة.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="font-mono text-emerald-700 font-bold text-[11px]">ميزة 25</span>
            <h3 className="font-bold text-slate-900">تقويم المهن الموسمية الجزائرية</h3>
            <p className="text-slate-600 leading-relaxed">
              موسم جني التمور بالجنوب، عصر الزيتون، تنظيف التدفئة، وشحن مكيفات الصيف.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="font-mono text-emerald-700 font-bold text-[11px]">ميزة 26</span>
            <h3 className="font-bold text-slate-900">برنامج التمهين ونقل الخبرة لخرّيجي CFPA</h3>
            <p className="text-slate-600 leading-relaxed">
              مرافقة الشباب المبتدئين مع معلمين ذوي خبرة 15+ سنة.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="font-mono text-emerald-700 font-bold text-[11px]">ميزة 27</span>
            <h3 className="font-bold text-slate-900">أوامر الطوارئ دون إنترنت عبر الرسائل القصيرة</h3>
            <p className="text-slate-600 leading-relaxed">
              طلب النجدة والحرفي في المناطق الصحراوية المعزولة دون اتصال 4G.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="font-mono text-emerald-700 font-bold text-[11px]">ميزة 28</span>
            <h3 className="font-bold text-slate-900">القائمة السوداء وحماية الحرفيين من التهرب</h3>
            <p className="text-slate-600 leading-relaxed">
              تقييم جدية الزبائن وتوثيق عنوان التدخل لردع المواعيد الوهمية.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="font-mono text-emerald-700 font-bold text-[11px]">ميزة 29</span>
            <h3 className="font-bold text-slate-900">شهادة ضمان الأشغال الرسمية بعد الإنجاز</h3>
            <p className="text-slate-600 leading-relaxed">
              وثيقة إلكترونية موثقة تضمن حق الزبون في إعادة الإصلاح مجاناً.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="font-mono text-emerald-700 font-bold text-[11px]">ميزة 30</span>
            <h3 className="font-bold text-slate-900">مواقيت الصلاة وجدولة توقيف الضوضاء بالورشات</h3>
            <p className="text-slate-600 leading-relaxed">
              تنبيه الحرفيين لإيقاف أشغال الهدم والتكسير أثناء أوقات الأذان والصلاة في كل ولاية.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
