import React, { useState } from 'react';
import { Locale } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { OBD2_CODES_DATABASE, REGIONAL_TERMINOLOGY_DICTIONARY } from '../../data/mockData';
import { 
  Bot, 
  Calculator, 
  Scan, 
  FileText, 
  BookOpen, 
  Cpu, 
  Sun, 
  Wind, 
  Zap, 
  Building, 
  Printer, 
  Check, 
  Search, 
  Volume2, 
  Camera,
  Layers,
  ArrowRight
} from 'lucide-react';

interface AIToolsSuiteViewProps {
  currentLocale: Locale;
}

export const AIToolsSuiteView: React.FC<AIToolsSuiteViewProps> = ({
  currentLocale
}) => {
  const t = TRANSLATIONS[currentLocale];
  const [activeTool, setActiveTool] = useState<string>('voice_assistant');

  // 1. Voice AI Assistant State
  const [darijaQuery, setDarijaQuery] = useState('');
  const [darijaResponse, setDarijaResponse] = useState<string | null>(
    'مرحباً بيك في خدمة ديزاد! أنا مساعدك الذكي بالدارجة. واش راك حاب تخدم اليوم؟ بلومبي، تريسيا، ماصو، ولا تحسب سلعة البناء؟'
  );
  const [isSpeaking, setIsSpeaking] = useState(false);

  // 2. Photo Damage AI State
  const [selectedDamageSample, setSelectedDamageSample] = useState<'wall' | 'pipe' | 'car'>('wall');
  const [isAnalyzingPhoto, setIsAnalyzingPhoto] = useState(false);
  const [damageResult, setDamageResult] = useState<{
    severity: string;
    description: string;
    estimatedLaborDzd: number;
    estimatedMaterialsDzd: number;
    recommendedTrade: string;
  } | null>({
    severity: 'متوسطة إلى مرتفعة',
    description: 'تشقق في الجدار الحامل مع تقشير في طبقة الطلاء والجبس ناتج عن رطوبة داخلية خفيفة.',
    estimatedLaborDzd: 4500,
    estimatedMaterialsDzd: 3200,
    recommendedTrade: 'بناء وترميم شقوق + دهان ستيكو عازل'
  });

  // 3. Construction Materials Calculator State
  const [roomLength, setRoomLength] = useState<number>(5);
  const [roomWidth, setRoomWidth] = useState<number>(4);
  const [roomHeight, setRoomHeight] = useState<number>(3);
  const [wallThickness, setWallThickness] = useState<number>(0.15); // 15cm

  // 4. AC BTU Calculator State
  const [acArea, setAcArea] = useState<number>(25);
  const [acHeight, setAcHeight] = useState<number>(2.8);
  const [acSunExposure, setAcSunExposure] = useState<'normal' | 'high' | 'desert'>('normal');

  // 5. Concrete Batching Mix State
  const [concreteVolume, setConcreteVolume] = useState<number>(1.5); // m³

  // 6. Solar Dimensioning State
  const [dailyKwh, setDailyKwh] = useState<number>(8.5); // kWh/day

  // 7. Wire Gauge Calculator State
  const [wireAmps, setWireAmps] = useState<number>(25);
  const [wireDistance, setWireDistance] = useState<number>(30); // meters

  // 8. OBD-II Search State
  const [obdSearch, setObdSearch] = useState('');

  // 9. Regional Dictionary Search State
  const [dictSearch, setDictSearch] = useState('');

  // 10. Automated Day-Labor Contract State
  const [contractEmployer, setContractEmployer] = useState('رشيد بن عمارة');
  const [contractWorker, setContractWorker] = useState('حميد بلحاج');
  const [contractTaskName, setContractTaskName] = useState('أعمال حفر وتجهيز قنوات الصرف الصحي');
  const [contractDailyRate, setContractDailyRate] = useState<number>(3500); // >= 1000 DZD
  const [contractDays, setContractDays] = useState<number>(3);

  // 11. PDF Commercial Invoice Generator State
  const [invoiceClientName, setInvoiceClientName] = useState('SARL Mitidja Travaux');
  const [invoiceAmountNet, setInvoiceAmountNet] = useState<number>(120000);

  // Handlers
  const handleAskDarija = (e: React.FormEvent) => {
    e.preventDefault();
    if (!darijaQuery.trim()) return;

    const q = darijaQuery.toLowerCase();
    let reply = 'فهمتك خويا! رايح نربطك مع أحسن حرفي موثق في ولايتك بأفضل سومة وضمان كامل.';

    if (q.includes('ماء') || q.includes('سباك') || q.includes('بلومبي') || q.includes('تسرب')) {
      reply = 'عندك مشكل في قنوات الماء أو سخان الغاز؟ نقترح عليك تتصل بالمعلم كمال بلقاسم، سباك معتمد ومعاه كاميرا حرارية لكشف التسرب بدون تكسير.';
    } else if (q.includes('كهرباء') || q.includes('تريسيا') || q.includes('ديجونكتور')) {
      reply = 'خصك تريسيا؟ ننصحك تفحص التأريض (Prise de terre) وتحكم موعد مع المعلم عبد القادر معوش، مختص في الطابلوهات وتوازن الأطوار 380V.';
    } else if (q.includes('اسمنت') || q.includes('بناء') || q.includes('سلعة') || q.includes('بريك')) {
      reply = 'راك تبني؟ تقدر تستعمل حاسبة مواد البناء لي في هاد الصفحة، وتعطيك شحال من كيس إسمنت الشلف وشحال من بريكة 8 ثقوب يخصك بالضبط.';
    } else if (q.includes('سكانير') || q.includes('طوموبيل') || q.includes('محرك') || q.includes('ميكانيك')) {
      reply = 'طالعة عندك لمبة Check Engine؟ تقدر تفتش على الكود في مكتبة الـ OBD-II أسفله باش تعرف العطب وشحال يقاملك التبديل في الجزائر.';
    }

    setDarijaResponse(reply);
    setDarijaQuery('');
  };

  const handleSimulateSpeech = () => {
    setIsSpeaking(true);
    setTimeout(() => setIsSpeaking(false), 3000);
  };

  // Calculations
  // Wall Area = 2 * (L + W) * H; Volume = Area * Thickness
  const perimeter = 2 * (roomLength + roomWidth);
  const wallSurfaceArea = perimeter * roomHeight;
  const brickCountEstimate = Math.round(wallSurfaceArea * 25); // 25 bricks per m2 for 8-hole bricks
  const cementBagsEstimate = Math.ceil((wallSurfaceArea * wallThickness * 0.3 * 350) / 50); // bags of 50kg
  const sandVolumeEstimate = ((wallSurfaceArea * wallThickness * 0.3 * 0.8)).toFixed(2); // m3

  // AC BTU formula
  const volumeM3 = acArea * acHeight;
  let btuFactor = 175; // Standard Algeria North
  if (acSunExposure === 'high') btuFactor = 210;
  if (acSunExposure === 'desert') btuFactor = 260; // Sahara
  const calculatedBtu = Math.round(volumeM3 * btuFactor);
  const recommendedAcTier = 
    calculatedBtu <= 9500 ? '9,000 BTU (1 CV)' :
    calculatedBtu <= 13000 ? '12,000 BTU (1.5 CV)' :
    calculatedBtu <= 19000 ? '18,000 BTU (2 CV)' :
    calculatedBtu <= 26000 ? '24,000 BTU (2.5 CV)' : '30,000+ BTU (مكيف مركزي)';

  // Concrete mix: 350kg cement / m3
  const cementKgs = Math.round(concreteVolume * 350);
  const cementBagsConcrete = Math.ceil(cementKgs / 50);
  const sandLiters = Math.round(concreteVolume * 400);
  const gravelLiters = Math.round(concreteVolume * 800);
  const waterLiters = Math.round(concreteVolume * 175);

  // Solar sizing: 8.5 kWh/day -> Algerian avg peak sun hours = 5.2h
  const peakSunHours = 5.2;
  const solarKwRequired = (dailyKwh / peakSunHours) * 1.25; // 25% system losses
  const panelsCount = Math.ceil((solarKwRequired * 1000) / 450); // 450W Monocrystalline panels
  const batteryAh48V = Math.ceil(((dailyKwh * 1000) / 48) * 1.4); // 48V battery bank

  // Wire section: S = (2 * L * I) / (K * DeltaV)
  const allowedVoltageDropVolts = 220 * 0.03; // 3% max
  const copperConductivity = 56;
  const wireSectionCalculated = ((2 * wireDistance * wireAmps) / (copperConductivity * allowedVoltageDropVolts)).toFixed(2);
  const recommendedStandardSection = 
    Number(wireSectionCalculated) <= 1.5 ? '1.5 مم² (للإنارة)' :
    Number(wireSectionCalculated) <= 2.5 ? '2.5 مم² (للمآخذ والأجهزة)' :
    Number(wireSectionCalculated) <= 4.0 ? '4.0 مم² (للمكيفات الكبيرة والمواقد)' :
    Number(wireSectionCalculated) <= 6.0 ? '6.0 مم² (للسخانات ولوحة التوزيع)' :
    Number(wireSectionCalculated) <= 10.0 ? '10.0 مم² (للتغذية الرئيسية)' : '16.0 مم² فما فوق';

  // Invoice stamp & TVA
  const tvaAmount = Math.round(invoiceAmountNet * 0.19); // 19% TVA
  const fiscalStamp = 100; // 100 DZD Timbre Fiscal Algérien
  const invoiceTotalTtc = invoiceAmountNet + tvaAmount + fiscalStamp;

  const toolsList = [
    { id: 'voice_assistant', title: 'مساعد الدارجة الصوتي', icon: Bot },
    { id: 'photo_damage', title: 'مقدّر تكاليف الأضرار بالصور', icon: Camera },
    { id: 'material_calc', title: 'حاسبة مواد البناء والآجر', icon: Building },
    { id: 'ac_btu', title: 'حاسبة استطاعة المكيف (BTU)', icon: Wind },
    { id: 'concrete_calc', title: 'حاسبة خلط الخرسانة المسلحة', icon: Layers },
    { id: 'solar_calc', title: 'حاسبة الطاقة الشمسية والبطاريات', icon: Sun },
    { id: 'wire_calc', title: 'حاسبة مقطع الأسلاك الكهربائية', icon: Zap },
    { id: 'obd_library', title: 'موسوعة أكواد أعطال السيارات', icon: Cpu },
    { id: 'dialect_dict', title: 'قاموس مصطلحات الحرف بالولايات', icon: BookOpen },
    { id: 'day_contract', title: 'مولد عقود العمل اليومي (PDF)', icon: FileText },
    { id: 'invoice_gen', title: 'مولد الفواتير التجارية الرسمية', icon: Printer }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-800">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-emerald-400">حزمة الذكاء الاصطناعي والحاسبات الهندسية</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-300">مخصصة للمعايير الجزائرية والدارجة</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {t.aiTools.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300">
            {t.aiTools.subtitle}
          </p>
        </div>
      </div>

      {/* Tools Selector Navigation Bar */}
      <div className="bg-white rounded-2xl p-2.5 border border-slate-200 shadow-xs flex items-center gap-1.5 overflow-x-auto text-xs">
        {toolsList.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTool(item.id)}
              className={`px-3 py-2 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTool === item.id
                  ? 'bg-emerald-700 text-white font-bold shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.title}</span>
            </button>
          );
        })}
      </div>

      {/* TOOL 1: Algerian Dialect Voice AI Assistant */}
      {activeTool === 'voice_assistant' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="max-w-2xl mx-auto space-y-6 text-center">
            
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-sm">
              <Bot className="w-8 h-8 text-emerald-700" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">المساعد الصوتي بالدارجة الجزائرية (AI Darija)</h2>
              <p className="text-xs text-slate-700 mt-1">
                تحدث أو اكتب بالدارجة وسيقوم المساعد بفهم طلبك، توجيهك للحرفي المناسب، وتقدير الأسعار.
              </p>
            </div>

            {/* AI Response Card */}
            {darijaResponse && (
              <div className="p-5 bg-slate-900 text-white rounded-2xl text-start shadow-md space-y-3 border border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1.5">
                    <Bot className="w-4 h-4" />
                    <span>مساعد ديزاد الذكي:</span>
                  </span>
                  <button
                    onClick={handleSimulateSpeech}
                    className="p-1 rounded-md text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="الاستماع للصوت"
                  >
                    <Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-emerald-400 animate-bounce' : ''}`} />
                  </button>
                </div>
                <p className="text-sm leading-relaxed text-slate-200 font-medium">
                  {darijaResponse}
                </p>
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleAskDarija} className="flex gap-2">
              <input
                type="text"
                value={darijaQuery}
                onChange={(e) => setDarijaQuery(e.target.value)}
                placeholder="اكتب بالدارجة: (مثال: عندي فوويت في السخان، خصني تريسيا في وهران...)"
                className="flex-1 px-4 py-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
              />
              <button
                type="submit"
                className="py-3 px-6 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white transition-colors cursor-pointer shadow-xs"
              >
                إرسال
              </button>
            </form>

            <div className="flex flex-wrap justify-center gap-2 text-[11px] text-slate-700">
              <span>أمثلة سريعة:</span>
              <button 
                type="button" 
                onClick={() => setDarijaQuery('خصني بلومبي لكشف تسرب الماء في الدار')}
                className="underline hover:text-emerald-700 cursor-pointer"
              >
                تسرب ماء
              </button>
              <span>·</span>
              <button 
                type="button" 
                onClick={() => setDarijaQuery('حاسبة سلعة البناء لشقة F3')}
                className="underline hover:text-emerald-700 cursor-pointer"
              >
                سلعة البناء
              </button>
              <span>·</span>
              <button 
                type="button" 
                onClick={() => setDarijaQuery('شعلاتلي لمبة المحرك Check Engine')}
                className="underline hover:text-emerald-700 cursor-pointer"
              >
                سكانير سيارة
              </button>
            </div>

          </div>
        </div>
      )}

      {/* TOOL 2: Photo Damage & Repair Cost Estimator AI */}
      {activeTool === 'photo_damage' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="max-w-3xl space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">{t.aiTools.photoDamage}</h2>
              <p className="text-xs text-slate-700">
                تحليل ذكي لصور تصدعات الجدران، تسربات الأنابيب، وأعطال السيارات لتقدير تكاليف اليد العاملة والسلعة.
              </p>
            </div>

            {/* Sample Selector */}
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-slate-700">اختر عينة للفحص:</span>
              <button
                type="button"
                onClick={() => setSelectedDamageSample('wall')}
                className={`px-3 py-1.5 rounded-lg border cursor-pointer ${
                  selectedDamageSample === 'wall' ? 'bg-emerald-50 text-emerald-950 font-bold border-emerald-300' : 'bg-slate-50 text-slate-700'
                }`}
              >
                تصدع جدار ورطوبة
              </button>
              <button
                type="button"
                onClick={() => setSelectedDamageSample('pipe')}
                className={`px-3 py-1.5 rounded-lg border cursor-pointer ${
                  selectedDamageSample === 'pipe' ? 'bg-emerald-50 text-emerald-950 font-bold border-emerald-300' : 'bg-slate-50 text-slate-700'
                }`}
              >
                تسرب أنبوب نحاسي
              </button>
              <button
                type="button"
                onClick={() => setSelectedDamageSample('car')}
                className={`px-3 py-1.5 rounded-lg border cursor-pointer ${
                  selectedDamageSample === 'car' ? 'bg-emerald-50 text-emerald-950 font-bold border-emerald-300' : 'bg-slate-50 text-slate-700'
                }`}
              >
                صدمة ممتص سيارة
              </button>
            </div>

            {/* AI Estimation Result Card */}
            {damageResult && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className="space-y-3">
                  <div className="aspect-16/9 rounded-xl overflow-hidden bg-slate-200 border border-slate-300">
                    <img
                      src={
                        selectedDamageSample === 'wall'
                          ? 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=600&auto=format&fit=crop&q=80'
                          : selectedDamageSample === 'pipe'
                          ? 'https://images.unsplash.com/photo-1542013936693-884638332954?w=600&auto=format&fit=crop&q=80'
                          : 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop&q=80'
                      }
                      alt="Sample Damage"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-700">درجة الخطورة المحسوبة:</span>
                    <span className="font-bold text-amber-800">{damageResult.severity}</span>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-700 font-semibold block mb-1">التقرير الفني للذكاء الاصطناعي:</span>
                    <p className="text-slate-800 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                      {damageResult.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-700 block">تقدير اليد العاملة:</span>
                      <span className="font-bold font-mono text-emerald-700 text-sm">
                        {damageResult.estimatedLaborDzd.toLocaleString()} دج
                      </span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-700 block">تقدير قطع الغيار/السلعة:</span>
                      <span className="font-bold font-mono text-emerald-700 text-sm">
                        {damageResult.estimatedMaterialsDzd.toLocaleString()} دج
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 font-semibold">
                    الحرفي الموصى به: {damageResult.recommendedTrade}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* TOOL 3: Construction Material Quantity Calculator */}
      {activeTool === 'material_calc' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="max-w-3xl space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">{t.aiTools.materialCalc}</h2>
              <p className="text-xs text-slate-700">
                أدخل أبعاد الغرفة أو الجدار لاحتساب عدد أكياس الإسمنت (50 كغ)، حجم الرمل، وعدد قطع الآجر تلقائياً.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">الطول (متر):</label>
                <input
                  type="number"
                  step="0.5"
                  value={roomLength}
                  onChange={(e) => setRoomLength(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl focus:bg-white text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">العرض (متر):</label>
                <input
                  type="number"
                  step="0.5"
                  value={roomWidth}
                  onChange={(e) => setRoomWidth(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl focus:bg-white text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">الارتفاع (متر):</label>
                <input
                  type="number"
                  step="0.1"
                  value={roomHeight}
                  onChange={(e) => setRoomHeight(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl focus:bg-white text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">سمك الجدار (متر):</label>
                <input
                  type="number"
                  step="0.05"
                  value={wallThickness}
                  onChange={(e) => setWallThickness(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl focus:bg-white text-slate-900"
                />
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
                <span className="text-xs text-emerald-900 block font-semibold">عدد قطع الآجر (8 ثقوب):</span>
                <span className="text-2xl font-black font-mono text-emerald-800">
                  {brickCountEstimate.toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-800 block mt-1">حوالي {Math.ceil(brickCountEstimate / 420)} باليتة</span>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
                <span className="text-xs text-emerald-900 block font-semibold">أكياس الإسمنت (50 كغ CPA):</span>
                <span className="text-2xl font-black font-mono text-emerald-800">
                  {cementBagsEstimate}
                </span>
                <span className="text-[10px] text-emerald-800 block mt-1">بنسبة 350 كغ/م³ للملاط</span>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
                <span className="text-xs text-emerald-900 block font-semibold">حجم الرمل المغسول:</span>
                <span className="text-2xl font-black font-mono text-emerald-800">
                  {sandVolumeEstimate} م³
                </span>
                <span className="text-[10px] text-emerald-800 block mt-1">حوالي نصف شاحنة متوسطة</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 4: AC BTU Sizing Calculator */}
      {activeTool === 'ac_btu' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="max-w-2xl space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">{t.aiTools.acBtuCalc}</h2>
              <p className="text-xs text-slate-700">
                حساب استطاعة المكيف المناسبة بالمتر المكعب ودرجات الحرارة لضمان كفاءة التبريد وتوفير استهلاك الكهرباء.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">المساحة (م²):</label>
                <input
                  type="number"
                  value={acArea}
                  onChange={(e) => setAcArea(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">علو السقف (متر):</label>
                <input
                  type="number"
                  step="0.1"
                  value={acHeight}
                  onChange={(e) => setAcHeight(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">المنطقة والتعرض للشمس:</label>
                <select
                  value={acSunExposure}
                  onChange={(e: any) => setAcSunExposure(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                >
                  <option value="normal">شمال معتدل / ظل</option>
                  <option value="high">واجهة مشمسة / طابق أخير</option>
                  <option value="desert">الجنوب والصحراء الكبرى (+45°C)</option>
                </select>
              </div>
            </div>

            <div className="p-5 bg-slate-900 text-white rounded-2xl text-center space-y-2 border border-slate-800">
              <span className="text-xs text-slate-400 block">الاستطاعة المحسوبة بدقة:</span>
              <div className="text-2xl font-black font-mono text-emerald-400">
                {calculatedBtu.toLocaleString()} BTU
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold">
                المكيف المناسب للشراء: {recommendedAcTier}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 5: Concrete Batching Mix Calculator */}
      {activeTool === 'concrete_calc' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="max-w-2xl space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">{t.aiTools.concreteCalc}</h2>
              <p className="text-xs text-slate-700">
                عيار 350 كغ/م³ القياسي الجزائري للبلاطات والجسور والأعمدة المسلحة.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                حجم الخرسانة المطلوب صبها (متر مكعب m³):
              </label>
              <input
                type="number"
                step="0.5"
                value={concreteVolume}
                onChange={(e) => setConcreteVolume(Number(e.target.value))}
                className="w-full px-4 py-2.5 text-sm font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-700 block text-[11px]">الإسمنت CPA:</span>
                <span className="text-lg font-bold font-mono text-slate-900">{cementBagsConcrete} كيس</span>
                <span className="text-[10px] text-slate-700 block">({cementKgs} كغ)</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-700 block text-[11px]">الرمل الخشن:</span>
                <span className="text-lg font-bold font-mono text-slate-900">{sandLiters} لتر</span>
                <span className="text-[10px] text-slate-700 block">~ {(sandLiters / 1000).toFixed(2)} م³</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-700 block text-[11px]">الحصى (Gravier):</span>
                <span className="text-lg font-bold font-mono text-slate-900">{gravelLiters} لتر</span>
                <span className="text-[10px] text-slate-700 block">~ {(gravelLiters / 1000).toFixed(2)} م³</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-700 block text-[11px]">الماء النقي:</span>
                <span className="text-lg font-bold font-mono text-slate-900">{waterLiters} لتر</span>
                <span className="text-[10px] text-slate-700 block">نسبة E/C ~ 0.50</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 6: Solar Array & Battery Sizing Tool */}
      {activeTool === 'solar_calc' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="max-w-2xl space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">{t.aiTools.solarCalc}</h2>
              <p className="text-xs text-slate-700">
                تقدير الألواح والبطاريات للمنازل المعزولة والمزارع ومضخات الآبار في الجزائر.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                الاستهلاك اليومي التقريبي (كيلوواط ساعي kWh/يوم):
              </label>
              <input
                type="number"
                step="0.5"
                value={dailyKwh}
                onChange={(e) => setDailyKwh(Number(e.target.value))}
                className="w-full px-4 py-2.5 text-sm font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
                <span className="text-xs text-emerald-900 block font-semibold">عدد الألواح (450W Monocristallin):</span>
                <span className="text-2xl font-black font-mono text-emerald-800">{panelsCount} لوح</span>
                <span className="text-[10px] text-emerald-800 block mt-1">استطاعة حقل: {(panelsCount * 0.45).toFixed(1)} kWp</span>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
                <span className="text-xs text-emerald-900 block font-semibold">سعة بنك البطاريات (نظام 48V):</span>
                <span className="text-2xl font-black font-mono text-emerald-800">{batteryAh48V} Ah</span>
                <span className="text-[10px] text-emerald-800 block mt-1">ليثيوم LiFePO4 أو أنبوبي جل</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 7: Electrical Wire Gauge & Ampacity Calculator */}
      {activeTool === 'wire_calc' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="max-w-2xl space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">{t.aiTools.wireGaugeCalc}</h2>
              <p className="text-xs text-slate-700">
                حساب مقطع الأسلاك لمنع السخونة وهبوط الجهد الكهربائي حسب المعيار الجزائري NFC 15-100.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">التيار المطلوب (أمبير A):</label>
                <input
                  type="number"
                  value={wireAmps}
                  onChange={(e) => setWireAmps(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">طول الخط (متر):</label>
                <input
                  type="number"
                  value={wireDistance}
                  onChange={(e) => setWireDistance(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between border border-slate-800">
              <div>
                <span className="text-xs text-slate-400 block">المقطع النظري: {wireSectionCalculated} مم²</span>
                <span className="text-sm font-bold text-emerald-400">
                  المقطع التجاري القياسي الموصى به:
                </span>
              </div>
              <span className="text-base font-extrabold font-mono text-white bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
                {recommendedStandardSection}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 8: OBD-II Code Diagnostic Library */}
      {activeTool === 'obd_library' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="max-w-3xl space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">{t.aiTools.obd2Library}</h2>
              <p className="text-xs text-slate-700">
                ابحث عن أي كود عطل في سيارتك (e.g. P0300, P0420, P0171...) لمعرفة سببه وكيفية إصلاحه في الجزائر.
              </p>
            </div>

            <div className="relative">
              <input
                type="text"
                value={obdSearch}
                onChange={(e) => setObdSearch(e.target.value)}
                placeholder="ابحث برمز الكود (مثال: P0300, P0420, P0171)..."
                className="w-full ps-10 pe-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl font-mono text-slate-900"
              />
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 text-slate-400">
                <Search className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-3">
              {OBD2_CODES_DATABASE.filter(c => c.code.toLowerCase().includes(obdSearch.toLowerCase())).map(code => (
                <div key={code.code} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold font-mono text-red-600 bg-red-50 px-2 py-0.5 rounded-md border border-red-200">
                      {code.code}
                    </span>
                    <span className="text-xs text-slate-700 font-mono font-semibold">
                      تقدير الإصلاح: {code.costEstimateDzd}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{code.titleAr}</h4>
                  <div className="text-[11px] text-slate-700 space-y-1">
                    <div><strong>الأسباب المحتملة:</strong> {code.causesAr}</div>
                    <div className="text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                      <strong>الحل المعتمد في الجزائر:</strong> {code.algerianSolution}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TOOL 9: Regional Terminology Trade Dictionary */}
      {activeTool === 'dialect_dict' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="max-w-3xl space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">{t.aiTools.dialectDict}</h2>
              <p className="text-xs text-slate-700">
                مقارنة المصطلحات الحرفية والمهنية بين مختلف ولايات الجزائر لتسهيل التواصل بين الحرفي والزبون.
              </p>
            </div>

            <div className="space-y-3">
              {REGIONAL_TERMINOLOGY_DICTIONARY.map((term, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-xs font-bold text-emerald-800">{term.standardArabic}</span>
                    <span className="text-[11px] text-slate-700 italic">{term.meaningFr}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-700 block">العاصمة والوسط:</span>
                      <span className="font-bold text-slate-900">{term.algiersTerm}</span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-700 block">وهران والغرب:</span>
                      <span className="font-bold text-slate-900">{term.oranTerm}</span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-700 block">قسنطينة والشرق:</span>
                      <span className="font-bold text-slate-900">{term.constantineTerm}</span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-700 block">الجنوب والواحات:</span>
                      <span className="font-bold text-slate-900">{term.saharaTerm}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TOOL 10: Automated Day-Labor Contract Generator */}
      {activeTool === 'day_contract' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="max-w-2xl space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">{t.aiTools.laborContract}</h2>
              <p className="text-xs text-slate-700">
                توليد عقد عمل يومي قصير ومطابق لقانون العمل الجزائري لحماية حقوق المشغّل والعامل اليومي.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">اسم صاحب العمل:</label>
                <input
                  type="text"
                  value={contractEmployer}
                  onChange={(e) => setContractEmployer(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">اسم العامل اليومي:</label>
                <input
                  type="text"
                  value={contractWorker}
                  onChange={(e) => setContractWorker(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">الأجر اليومي (دج):</label>
                <input
                  type="number"
                  min="1000"
                  value={contractDailyRate}
                  onChange={(e) => setContractDailyRate(Number(e.target.value))}
                  className="w-full px-3 py-2 font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">مدة الإنجاز (أيام):</label>
                <input
                  type="number"
                  min="1"
                  value={contractDays}
                  onChange={(e) => setContractDays(Number(e.target.value))}
                  className="w-full px-3 py-2 font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                />
              </div>
            </div>

            {/* Contract Printable Preview */}
            <div className="p-6 bg-slate-50 border border-slate-300 rounded-2xl space-y-3 text-xs leading-relaxed print:p-0">
              <div className="text-center border-b border-slate-300 pb-3">
                <h3 className="font-bold text-sm text-slate-900">الجمهورية الجزائرية الديمقراطية الشعبية</h3>
                <h4 className="font-semibold text-xs text-slate-700">اتفاقية تقديم خدمات وأشغال يدوية يومية محددة المدة</h4>
              </div>

              <p>
                بين الطرفين: <strong>{contractEmployer}</strong> (صاحب العمل) من جهة، و <strong>{contractWorker}</strong> (العامل) من جهة ثانية.
              </p>
              <p>
                يلتزم العامل بتنفيذ مهمة: <em>{contractTaskName}</em> لمدة <strong>{contractDays} أيام</strong>، لقاء أجر يومي قدره <strong>{contractDailyRate.toLocaleString()} دج</strong> (الإجمالي: {(contractDailyRate * contractDays).toLocaleString()} دج).
              </p>
              <p className="text-[11px] text-slate-700">
                يلتزم صاحب العمل بتوفير وسائل السلامة والوجبة، كما يلتزم العامل بالانضباط وحسن تنفيذ الأشغال.
              </p>

              <div className="flex justify-between pt-4 border-t border-slate-200">
                <div className="text-center font-bold">توقيع صاحب العمل: .................</div>
                <div className="text-center font-bold">توقيع العامل اليومي: .................</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة العقد الرسمي (Print / PDF)</span>
            </button>
          </div>
        </div>
      )}

      {/* TOOL 11: PDF Commercial Invoice Generator */}
      {activeTool === 'invoice_gen' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="max-w-2xl space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">{t.aiTools.invoiceGenerator}</h2>
              <p className="text-xs text-slate-700">
                توليد فاتورة تجارية رسمية مطابقة للنظام الضريبي الجزائري مع حساب الرسم الجبائي (Timbre Fiscal) ورسم القيمة المضافة (TVA 19%).
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">اسم العميل / المؤسسة:</label>
                <input
                  type="text"
                  value={invoiceClientName}
                  onChange={(e) => setInvoiceClientName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">المبلغ الصافي الخاضع للضريبة (دج):</label>
                <input
                  type="number"
                  step="1000"
                  value={invoiceAmountNet}
                  onChange={(e) => setInvoiceAmountNet(Number(e.target.value))}
                  className="w-full px-3 py-2 font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                />
              </div>
            </div>

            {/* Invoice Breakdown */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-700">المبلغ الإجمالي بدون رسوم (Montant H.T):</span>
                <span className="font-mono font-bold">{invoiceAmountNet.toLocaleString()} دج</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-700">رسم القيمة المضافة (TVA 19%):</span>
                <span className="font-mono font-bold">{tvaAmount.toLocaleString()} دج</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-700">الطابع الجبائي القانوني (Timbre Fiscal):</span>
                <span className="font-mono font-bold">{fiscalStamp} دج</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-emerald-800 pt-2 border-t border-slate-200">
                <span>المبلغ الإجمالي شامل كل الرسوم (T.T.C):</span>
                <span className="font-mono text-base">{invoiceTotalTtc.toLocaleString()} دج</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة الفاتورة التجارية (Imprimer Facture)</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
