import React from 'react';
import { Locale, ProductItem, ServiceListing, PolivalenteTask } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { 
  Building, 
  Wrench, 
  Users, 
  Laptop, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Star, 
  CheckCircle2, 
  Sparkles,
  MapPin,
  Clock,
  Phone,
  FileSpreadsheet
} from 'lucide-react';

interface HomeViewProps {
  currentLocale: Locale;
  setActiveTab: (tab: string) => void;
  products: ProductItem[];
  craftsmen: ServiceListing[];
  polivalenteTasks: PolivalenteTask[];
  onOpenAuth: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  currentLocale,
  setActiveTab,
  products,
  craftsmen,
  polivalenteTasks,
  onOpenAuth
}) => {
  const t = TRANSLATIONS[currentLocale];

  return (
    <div className="space-y-12">
      
      {/* Hero Section */}
      <section className="relative rounded-3xl bg-slate-900 text-white overflow-hidden p-8 sm:p-12 lg:p-16 border border-slate-800 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>منصة الجمهورية للـ 58 ولاية · من أدرار إلى عين قزام</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            خدمة ديزاد (Khedma DZ)
            <span className="block text-emerald-400 mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold">
              المنصة الشاملة للحرف، التجارة الكبرى والمهام اليومية
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            منصة متكاملة تجمع الحرفيين المعتمدين بالبطاقة البيومترية، سوق الجملة والتجزئة لمواد البناء مباشرة من المصانع، بث حي للمهام اليدوية مع ضمان حد أدنى 1,000 دج، وأدوات هندسية ذكية بالدارجة الجزائرية.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('marketplace')}
              className="py-3 px-6 rounded-xl text-xs sm:text-sm font-bold bg-emerald-700 hover:bg-emerald-800 text-white transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <Building className="w-4 h-4" />
              <span>تصفح سوق مواد البناء B2B/B2C</span>
            </button>

            <button
              onClick={() => setActiveTab('trades')}
              className="py-3 px-6 rounded-xl text-xs sm:text-sm font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all cursor-pointer flex items-center gap-2"
            >
              <Wrench className="w-4 h-4 text-emerald-400" />
              <span>دليل الحرفيين المعتمدين</span>
            </button>

            <button
              onClick={() => setActiveTab('polivalente')}
              className="py-3 px-6 rounded-xl text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>مهام بوليفالون اليومية (≥ 1,000 دج)</span>
            </button>
          </div>

        </div>

        {/* Ambient Decorative Accents */}
        <div className="absolute -top-24 -end-24 w-96 h-96 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none"></div>
      </section>

      {/* Primary New Major Domains Hub (Most Lucrative & Requested Sectors) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              القطاعات الحيوية والأكثر طلباً
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              خدمات المنصة الشاملة عبر الشبكة الإلكترونية
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-mono hidden sm:inline">
            تحديث فوري عبر 58 ولاية
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* 1. Recruitment & Jobs */}
          <div 
            onClick={() => setActiveTab('jobs')}
            className="p-5 rounded-3xl bg-linear-to-br from-blue-900 to-indigo-950 text-white shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between group border border-blue-800"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                💼
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider block">الأكثر ربحية وطلباً</span>
                <h3 className="text-base font-extrabold text-white">التوظيف والعمل بالشهادات</h3>
                <p className="text-xs text-blue-200/80 leading-relaxed">
                  عروض عمل كبرى الشركات، فرص العمل من المنزل (Télétravail)، وخريجو الجامعات بروابط LinkedIn DZ.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-blue-800/60 mt-4 flex items-center justify-between text-xs font-bold text-blue-300">
              <span>تصفح الوظائف والمرشحين</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 2. Real Estate & Krilo DZ */}
          <div 
            onClick={() => setActiveTab('realEstate')}
            className="p-5 rounded-3xl bg-linear-to-br from-amber-900 to-stone-900 text-white shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between group border border-amber-800"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                🏠
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">وساطة عقارية شاملة</span>
                <h3 className="text-base font-extrabold text-white">العقارات وكريلو (Krilo DZ)</h3>
                <p className="text-xs text-amber-200/80 leading-relaxed">
                  بيع وكراء شقق ومصايف وفيلات مجمعة من واد كنيس، فيسبوك ماركت بليس وجروبات العقار الولائية.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-amber-800/60 mt-4 flex items-center justify-between text-xs font-bold text-amber-300">
              <span>تصفح العروض العقارية</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 3. Fiverr Algerian Talents */}
          <div 
            onClick={() => setActiveTab('fiverr')}
            className="p-5 rounded-3xl bg-linear-to-br from-emerald-900 to-slate-900 text-white shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between group border border-emerald-800"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                ⚡
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block">توفير 20% عمولة</span>
                <h3 className="text-base font-extrabold text-white">نخبة فايفر الجزائر (Fiverr DZ)</h3>
                <p className="text-xs text-emerald-200/80 leading-relaxed">
                  أفضل المبرمجين والمصممين والمعلقين الصوتيين الجزائريين مع دفع محلي بـ BaridiMob / CCP.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-emerald-800/60 mt-4 flex items-center justify-between text-xs font-bold text-emerald-300">
              <span>اكتشف واستورد المستقلين</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 4. Online Formations */}
          <div 
            onClick={() => setActiveTab('formations')}
            className="p-5 rounded-3xl bg-linear-to-br from-teal-900 to-slate-900 text-white shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between group border border-teal-800"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-400/30 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                🎓
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-teal-300 uppercase tracking-wider block">شهادات تأهيلية</span>
                <h3 className="text-base font-extrabold text-white">التكوين والدورات أونلاين</h3>
                <p className="text-xs text-teal-200/80 leading-relaxed">
                  طاقة شمسية، سكانير سيارات، صيانة هواتف، وتجارة إلكترونية مجمعة من فيسبوك وتليغرام بالشهادة.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-teal-800/60 mt-4 flex items-center justify-between text-xs font-bold text-teal-300">
              <span>استكشف الدورات المتاحة</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

        {/* Secondary Row of Specialized Centers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          
          <button
            onClick={() => setActiveTab('wholesaleHubs')}
            className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-sm transition-all text-start cursor-pointer flex items-center gap-3"
          >
            <span className="text-2xl">🏬</span>
            <div>
              <div className="text-xs font-bold text-slate-900">أسواق الجملة الكبرى</div>
              <div className="text-[10px] text-slate-500">العلمة، الحميز وتاجنانت</div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('map')}
            className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-400 hover:shadow-sm transition-all text-start cursor-pointer flex items-center gap-3"
          >
            <span className="text-2xl">🗺️</span>
            <div>
              <div className="text-xs font-bold text-slate-900">الخريطة والـ 1541 بلدية</div>
              <div className="text-[10px] text-slate-500">رادار الأقارب والحرفيين</div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('social')}
            className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-sm transition-all text-start cursor-pointer flex items-center gap-3"
          >
            <span className="text-2xl">📱</span>
            <div>
              <div className="text-xs font-bold text-slate-900">رادار فايسبوك وتيك توك</div>
              <div className="text-[10px] text-slate-500">استقطاب المهام وصناع المحتوى</div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('advanced30')}
            className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:border-purple-400 hover:shadow-sm transition-all text-start cursor-pointer flex items-center gap-3"
          >
            <span className="text-2xl">⭐</span>
            <div>
              <div className="text-xs font-bold text-slate-900">أفضل 30 ميزة ذكية</div>
              <div className="text-[10px] text-slate-500">QR بريدي موب وحاسبة الوقود</div>
            </div>
          </button>

        </div>
      </section>

      {/* 4 Trust Pillars / Algerian Guarantees Strip */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">توثيق الهوية البيومترية</h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            فحص آلي لبطاقات التعريف وجوازات السفر ورخص السياقة مع كشف الحركة الحية Liveness لمنع الاحتيال.
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Building className="w-5 h-5 text-emerald-700" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">سوق الجملة والتجزئة (B2B / B2C)</h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            أسعار المصانع مع سلالم الخصم للكميات الكبرى (MOQ) والتوريد المباشر للورشات عبر 58 ولاية.
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Users className="w-5 h-5 text-amber-700" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">الحد الأدنى 1,000 دج للمهمة</h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            ضمان مالي صارم يحظر أي عمل يومي بأقل من 1,000 دج لضمان كرامة العمال وعدالة الأجور.
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Zap className="w-5 h-5 text-emerald-700" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">أدوات هندسية وذكاء اصطناعي</h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            مساعد الدارجة الصوتي، حاسبات الخرسانة ومكيفات الهواء، ومولد الفواتير وعقود العمل اليومي الرسمية.
          </p>
        </div>

      </section>

      {/* Featured Trade Craftsmen Preview */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">حرفيون متاحون فورياً في ولايتك</h2>
            <p className="text-xs text-slate-700">سباكون، كهربائيون، ومعلمو جبس BA13 موثقون رسمياً</p>
          </div>
          <button
            onClick={() => setActiveTab('trades')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            <span>عرض كل الحرفيين</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {craftsmen.slice(0, 3).map(worker => (
            <div
              key={worker.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow space-y-3"
            >
              <div className="flex items-start gap-3">
                <img
                  src={worker.avatarUrl}
                  alt={worker.workerName}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <h3 className="text-xs font-bold text-slate-900 truncate">{worker.workerName}</h3>
                    {worker.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>
                  <div className="text-[11px] text-amber-500 font-bold font-mono">
                    ★ {worker.rating} <span className="text-slate-400 font-normal">({worker.reviewCount} تقييم)</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    ولاية {worker.wilayaCode} · {worker.category}
                  </div>
                </div>
              </div>

              <h4 className="text-xs font-semibold text-slate-800 line-clamp-2">
                {currentLocale === 'ar' ? worker.titleAr : worker.titleFr}
              </h4>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="font-mono font-bold text-emerald-700">
                  {worker.baseRateDzd.toLocaleString()} دج
                </span>
                <button
                  onClick={() => setActiveTab('trades')}
                  className="py-1.5 px-3 rounded-lg text-[11px] font-bold bg-emerald-700 text-white hover:bg-emerald-800 transition-colors cursor-pointer"
                >
                  اتصال ومراسلة
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured B2B Materials Teaser */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">سوق الجملة لمواد البناء والتجهيز</h2>
            <p className="text-xs text-slate-700">إسمنت الشلف، ألواح كناوف BA13، وآجر المسيلة بأسعار المصنع</p>
          </div>
          <button
            onClick={() => setActiveTab('marketplace')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            <span>فتح السوق الوطني</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.slice(0, 3).map(product => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="aspect-16/9 bg-slate-100 overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.titleFr}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <span className="text-[10px] text-slate-700 font-medium">{product.merchantName}</span>
                  <h3 className="text-xs font-bold text-slate-900 line-clamp-1">
                    {currentLocale === 'ar' ? product.titleAr : product.titleFr}
                  </h3>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-700">سعر الجملة:</span>
                    <span className="font-mono font-bold text-emerald-700">
                      {product.bulkPricingTiers[1]?.priceDzd.toLocaleString()} دج
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button
                  onClick={() => setActiveTab('marketplace')}
                  className="w-full py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  عرض تفاصيل العتاد والتوريد
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Live Polivalente Tasks Teaser */}
      <section className="bg-amber-50/60 border border-amber-200 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              بث حي للمهام اليدوية
            </div>
            <h2 className="text-lg font-bold text-slate-900">مهام يومية عاجلة تبحث عن عمال أشداء</h2>
          </div>
          <button
            onClick={() => setActiveTab('polivalente')}
            className="text-xs font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
          >
            <span>دخول البث المباشر</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {polivalenteTasks.slice(0, 2).map(task => (
            <div key={task.id} className="bg-white p-4 rounded-2xl border border-amber-100 shadow-xs space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="text-xs font-bold text-slate-900 line-clamp-1">{task.titleAr}</h3>
                <span className="font-mono font-bold text-emerald-700 text-xs shrink-0">
                  {task.budgetDzd.toLocaleString()} دج
                </span>
              </div>
              <p className="text-[11px] text-slate-600 line-clamp-2">{task.description}</p>
              <div className="flex items-center justify-between pt-1 text-[10px] text-slate-500">
                <span>{task.address}</span>
                <span className="font-semibold text-amber-800">مطلوب {task.crewSlotsTotal} عمال</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
