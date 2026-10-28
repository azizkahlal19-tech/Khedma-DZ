import React, { useState } from 'react';
import { FiverrAlgerianSeller, Locale } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { parseAndImportFiverrProfile } from '../../data/fiverrAlgerians';
import { ALGERIA_WILAYAS } from '../../data/wilayas';
import { 
  Star, 
  Search, 
  ExternalLink, 
  DollarSign, 
  ShieldCheck, 
  Sparkles, 
  PlusCircle, 
  CheckCircle2, 
  Calculator, 
  MessageSquare, 
  Filter,
  Layers,
  ArrowRight,
  TrendingDown,
  Globe2,
  Clock,
  Briefcase
} from 'lucide-react';

interface FiverrTalentsViewProps {
  sellers: FiverrAlgerianSeller[];
  currentLocale: Locale;
  onOpenChatWithSeller: (sellerId: string, sellerName: string) => void;
  onAddNewSeller: (newSeller: FiverrAlgerianSeller) => void;
}

export const FiverrTalentsView: React.FC<FiverrTalentsViewProps> = ({
  sellers,
  currentLocale,
  onOpenChatWithSeller,
  onAddNewSeller
}) => {
  const t = TRANSLATIONS[currentLocale];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedWilaya, setSelectedWilaya] = useState<string>('all');
  const [selectedBadge, setSelectedBadge] = useState<string>('all');

  // Import Modal State
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importUrl, setImportUrl] = useState('');
  const [importName, setImportName] = useState('');
  const [importCategory, setImportCategory] = useState<FiverrAlgerianSeller['category']>('web_mobile_dev');
  const [importWilayaCode, setImportWilayaCode] = useState('16');
  const [importPriceUsd, setImportPriceUsd] = useState(50);
  const [importSkills, setImportSkills] = useState('React, Next.js, Node.js');
  const [importSuccessMsg, setImportSuccessMsg] = useState(false);

  // Commission Savings Calculator State
  const [calcBudgetUsd, setCalcBudgetUsd] = useState(150);

  const categories = [
    { id: 'all', labelAr: 'كل التخصصات', labelFr: 'Tous les domaines' },
    { id: 'web_mobile_dev', labelAr: 'البرمجة وتطبيقات الهاتف', labelFr: 'Web & Mobile' },
    { id: 'graphic_design', labelAr: 'الهوية البصرية والشعارات', labelFr: 'Design & Logo' },
    { id: 'voiceover_audio', labelAr: 'التعليق الصوتي (دارجة وفصحى)', labelFr: 'Voix-off' },
    { id: 'video_animation', labelAr: 'المونتاج والريلز والتيك توك', labelFr: 'Montage Vidéo' },
    { id: 'ai_python', labelAr: 'الذكاء الاصطناعي وبايثون', labelFr: 'IA & Python' },
    { id: 'translation_writing', labelAr: 'الترجمة والتدقيق', labelFr: 'Traduction' }
  ];

  const badges = [
    { id: 'all', labelAr: 'كل المستويات', labelFr: 'Tous les niveaux' },
    { id: 'fiverr_pro', labelAr: 'Fiverr Pro Verified', labelFr: 'Pro' },
    { id: 'top_rated', labelAr: 'Top Rated Seller ⭐', labelFr: 'Top Rated' },
    { id: 'level_2', labelAr: 'Level 2 Seller', labelFr: 'Niveau 2' },
    { id: 'rising_talent', labelAr: 'Rising Talent', labelFr: 'Émergent' }
  ];

  const filteredSellers = sellers.filter(seller => {
    const matchesCat = selectedCategory === 'all' || seller.category === selectedCategory;
    const matchesWilaya = selectedWilaya === 'all' || seller.wilayaCode === selectedWilaya;
    const matchesBadge = selectedBadge === 'all' || seller.levelBadge === selectedBadge;
    const matchesSearch = 
      seller.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.fiverrUsername.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.gigTitleAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.gigTitleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.skills.some(sk => sk.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCat && matchesWilaya && matchesBadge && matchesSearch;
  });

  const handleExecuteImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importUrl) return;

    const wilayaObj = ALGERIA_WILAYAS.find(w => w.code === importWilayaCode);
    const importedSeller = parseAndImportFiverrProfile({
      urlOrUsername: importUrl,
      category: importCategory,
      wilayaCode: importWilayaCode,
      wilayaNameAr: wilayaObj ? wilayaObj.nameAr : 'الجزائر',
      name: importName || undefined,
      priceUsd: Number(importPriceUsd),
      skillsText: importSkills
    });

    onAddNewSeller(importedSeller);
    setImportSuccessMsg(true);
    setTimeout(() => {
      setImportSuccessMsg(false);
      setIsImportModalOpen(false);
      setImportUrl('');
      setImportName('');
    }, 1500);
  };

  // Savings Math
  const parallelRate = 240; // 240 DZD per USD
  const fiverrCutUsd = Math.round(calcBudgetUsd * 0.20);
  const fiverrBuyerFeeUsd = Math.round(calcBudgetUsd * 0.055);
  const totalFiverrLossUsd = fiverrCutUsd + fiverrBuyerFeeUsd;
  const totalFiverrLossDzd = totalFiverrLossUsd * parallelRate;
  const netSavedByPayingDzd = (calcBudgetUsd * parallelRate);

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-emerald-950 via-slate-900 to-teal-950 text-white p-6 sm:p-10 border border-emerald-800 shadow-xl">
        <div className="absolute top-0 end-0 -mt-10 -me-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5" />
              <span>مستقلون جزائريون على فايفر (Fiverr DZ)</span>
            </span>
            <span className="bg-emerald-500 text-slate-950 px-2.5 py-0.5 rounded-full font-bold">
              58 ولاية
            </span>
            <span className="text-slate-300">
              الدفع بالدينار عبر بريدي موب / CCP / RedotPay
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            نخبة المستقلين الجزائريين على منصة Fiverr العالمية
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            اكتشف أفضل المبرمجين، المصممين، المعلقين الصوتيين والمترجمين الجزائريين المصنفين ضمن Top Rated و Level 2 على فايفر. استعن بخدماتهم مباشرة بدون رسوم فايفر 20% وبدون الحاجة لبطاقات بنكية دولية مثل Visa أو Mastercard!
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setIsImportModalOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs sm:text-sm hover:bg-emerald-400 transition-colors shadow-lg cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>استيراد بروفايل أو خدمة من فايفر (Fiverr URL)</span>
            </button>

            <a
              href="#calculator-section"
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm border border-slate-700 transition-colors"
            >
              <Calculator className="w-4 h-4 text-emerald-400" />
              <span>حاسبة توفير العمولة 20%</span>
            </a>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم المستقل، اليوزر نيم @username، التقنية (React, Voiceover, Logo)..."
              className="w-full ps-10 pe-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
            />
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
          </div>

          {/* Wilaya Filter */}
          <div className="w-full md:w-auto flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">الولاية:</span>
            <select
              value={selectedWilaya}
              onChange={(e) => setSelectedWilaya(e.target.value)}
              aria-label="تصفية حسب الولاية الجزائرية"
              className="w-full md:w-48 text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">كل الـ 58 ولاية</option>
              {ALGERIA_WILAYAS.map(w => (
                <option key={w.code} value={w.code}>
                  {w.code} - {w.nameAr}
                </option>
              ))}
            </select>
          </div>

          {/* Badge Level Filter */}
          <div className="w-full md:w-auto flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">مستوى فايفر:</span>
            <select
              value={selectedBadge}
              onChange={(e) => setSelectedBadge(e.target.value)}
              aria-label="تصفية حسب مستوى فايفر"
              className="w-full md:w-44 text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              {badges.map(b => (
                <option key={b.id} value={b.id}>
                  {b.labelAr}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Categories Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-700 text-white font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {currentLocale === 'ar' ? cat.labelAr : cat.labelFr}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Algerian Fiverr Talents */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSellers.map(seller => (
          <div 
            key={seller.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden group"
          >
            <div>
              {/* Portfolio Thumbnail preview */}
              {seller.portfolioThumbs && seller.portfolioThumbs.length > 0 && (
                <div className="aspect-16/9 bg-slate-100 overflow-hidden relative">
                  <img
                    src={seller.portfolioThumbs[0]}
                    alt={seller.gigTitleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 start-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Globe2 className="w-3 h-3 text-emerald-400" />
                    <span>@{seller.fiverrUsername}</span>
                  </div>
                  {seller.isCustomImported && (
                    <div className="absolute top-2 end-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                      مستورد جديد ⚡
                    </div>
                  )}
                </div>
              )}

              <div className="p-5 space-y-4">
                
                {/* Header: Avatar, Name, Wilaya & Level Badge */}
                <div className="flex items-start gap-3">
                  <img
                    src={seller.avatarUrl}
                    alt={seller.fullName}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-emerald-500 shadow-xs shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="text-sm font-extrabold text-slate-900 truncate">
                        {seller.fullName}
                      </h3>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold" title="موثق جزائرياً">
                        🇩🇿 {seller.wilayaNameAr}
                      </span>
                    </div>

                    {/* Fiverr Level Badge & Rating */}
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        seller.levelBadge === 'fiverr_pro' 
                          ? 'bg-purple-100 text-purple-900 border border-purple-200' 
                          : seller.levelBadge === 'top_rated'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                      }`}>
                        {seller.levelBadge === 'fiverr_pro' ? 'Fiverr Pro' : seller.levelBadge === 'top_rated' ? 'Top Rated ⭐' : seller.levelBadge === 'level_2' ? 'Level 2 Seller' : 'Rising Talent'}
                      </span>

                      <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{seller.rating}</span>
                        <span className="text-slate-500 font-normal text-[11px]">({seller.reviewCount})</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gig Title */}
                <div>
                  <h4 className="text-xs font-bold text-slate-800 leading-snug line-clamp-2">
                    {seller.gigTitleAr}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5 line-clamp-1">
                    {seller.gigTitleEn}
                  </p>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1">
                  {seller.skills.slice(0, 4).map((sk, idx) => (
                    <span 
                      key={idx}
                      className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-mono"
                    >
                      {sk}
                    </span>
                  ))}
                  {seller.skills.length > 4 && (
                    <span className="text-[10px] text-slate-500 px-1 py-0.5">
                      +{seller.skills.length - 4}
                    </span>
                  )}
                </div>

                {/* Delivery & Orders Completed */}
                <div className="flex items-center justify-between text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-600" />
                    <span>التسليم: {seller.deliveryDays} أيام</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{seller.completedOrdersCount} طلب منجز</span>
                  </div>
                </div>

                {/* Dual Pricing & Commission Savings Box */}
                <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-200/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-emerald-800 block">السعر المحلي بالدينار (بريدي موب):</span>
                      <span className="text-base font-extrabold font-mono text-emerald-900">
                        {seller.startingPriceDzd.toLocaleString()} دج
                      </span>
                    </div>
                    <div className="text-end">
                      <span className="text-[10px] text-slate-700 block">على فايفر بالدولار:</span>
                      <span className="text-xs font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded-md border border-slate-300">
                        ${seller.startingPriceUsd} USD
                      </span>
                    </div>
                  </div>

                  {/* Savings Pill */}
                  <div className="flex items-center gap-1 text-[10px] text-emerald-800 font-bold">
                    <TrendingDown className="w-3.5 h-3.5 text-emerald-700" />
                    <span>توفير عمولة فايفر 20%: {seller.fiverrFeeSavingsDzd.toLocaleString()} دج</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Actions: Direct Chat / Payment in DZD + Official Fiverr Gig Link */}
            <div className="p-5 pt-0 space-y-2">
              <button
                type="button"
                onClick={() => onOpenChatWithSeller(seller.id, seller.fullName)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>طلب الخدمة مباشرة والدفع بـ BaridiMob / CCP</span>
              </button>

              <a
                href={seller.fiverrGigUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl text-[11px] font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors flex items-center justify-center gap-1.5 text-center"
              >
                <span>مشاهدة معرض الأعمال والتقييمات على Fiverr</span>
                <ExternalLink className="w-3 h-3 text-slate-600" />
              </a>
            </div>

          </div>
        ))}
      </div>

      {filteredSellers.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
          <Globe2 className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">لم يتم العثور على نتائج مطابقة للبحث</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            جرب تغيير كلمات البحث أو اختر ولاية أخرى، أو يمكنك استيراد أي مستقل جزائري مباشرة برابط حسابه على فايفر!
          </p>
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800"
          >
            <PlusCircle className="w-4 h-4" />
            <span>استيراد بروفايل فايفر جديد</span>
          </button>
        </div>
      )}

      {/* Commission Savings Interactive Calculator */}
      <section id="calculator-section" className="bg-linear-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-md">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
            <Calculator className="w-4 h-4" />
            <span>حاسبة توفير العمولات والتحويل (Fiverr vs Khedma DZ)</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                لماذا التوظيف المباشر عبر خدمة ديزاد أفضل للمستقل والزبون؟
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                تقتطع منصة فايفر <span className="text-amber-400 font-bold">20%</span> من أرباح المستقل الجزائري، وتضيف رسوم مشتري <span className="text-amber-400 font-bold">5.5%</span> على الزبون، بالإضافة إلى قيود البنوك الجزائرية وصعوبة شحن بطاقات Visa وMastercard الدولية بالسوق الموازي.
              </p>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  حدد ميزانية المشروع بالدولار ($): <span className="text-emerald-400 font-mono font-bold">${calcBudgetUsd} USD</span>
                </label>
                <input
                  type="range"
                  min="20"
                  max="1000"
                  step="10"
                  value={calcBudgetUsd}
                  onChange={(e) => setCalcBudgetUsd(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>$20</span>
                  <span>$250</span>
                  <span>$500</span>
                  <span>$1000</span>
                </div>
              </div>
            </div>

            {/* Comparison Cards */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* If on Fiverr */}
              <div className="bg-slate-800/80 rounded-2xl p-4 border border-red-500/30 space-y-3">
                <div className="text-xs font-bold text-red-400 flex items-center gap-1">
                  <span>على فايفر (Fiverr)</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>مقتطع من المستقل (20%):</span>
                    <span className="font-mono text-red-300">-${fiverrCutUsd}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>رسوم المشتري (5.5%):</span>
                    <span className="font-mono text-red-300">+${fiverrBuyerFeeUsd}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-700 flex justify-between font-bold text-red-400">
                    <span>مجموع الخسارة:</span>
                    <span className="font-mono">{totalFiverrLossDzd.toLocaleString()} دج</span>
                  </div>
                </div>
              </div>

              {/* If on Khedma DZ */}
              <div className="bg-emerald-950/60 rounded-2xl p-4 border border-emerald-500/50 space-y-3">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>عبر خدمة ديزاد (DZ)</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-emerald-200">
                    <span>عمولة المنصة:</span>
                    <span className="font-mono font-bold text-emerald-400">0% (مجاناً)</span>
                  </div>
                  <div className="flex justify-between text-emerald-200">
                    <span>طريقة الدفع:</span>
                    <span className="font-bold">بريدي موب / CCP</span>
                  </div>
                  <div className="pt-2 border-t border-emerald-800/80 flex justify-between font-bold text-emerald-300">
                    <span>يستلم المستقل:</span>
                    <span className="font-mono">100% كاملة</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Live Import Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">استيراد مستقل جزائري من Fiverr</h3>
                  <p className="text-xs text-slate-500">أدخل رابط الخدمة أو اسم المستخدم لإدراجه فورياً</p>
                </div>
              </div>
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {importSuccessMsg ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-900">تم استيراد وإدراج المستقل بنجاح!</h4>
                <p className="text-xs text-emerald-700">أصبح الملف متاحاً الآن في الدليل الوطني بالدينار الجزائري.</p>
              </div>
            ) : (
              <form onSubmit={handleExecuteImport} className="space-y-4">
                
                {/* Fiverr URL / Username */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    رابط البروفايل أو الخدمة على فايفر (Fiverr URL / Username) *
                  </label>
                  <input
                    type="text"
                    required
                    value={importUrl}
                    onChange={(e) => setImportUrl(e.target.value)}
                    placeholder="https://www.fiverr.com/username أو @username"
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Name */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    الاسم الكامل للمستقل (اختياري)
                  </label>
                  <input
                    type="text"
                    value={importName}
                    onChange={(e) => setImportName(e.target.value)}
                    placeholder="مثال: عبد الرحيم دراجي (Abderrahim)"
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Category & Wilaya */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      التخصص
                    </label>
                    <select
                      value={importCategory}
                      onChange={(e) => setImportCategory(e.target.value as any)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden"
                    >
                      <option value="web_mobile_dev">تطوير الويب والتطبيقات</option>
                      <option value="graphic_design">تصميم وهوية بصرية</option>
                      <option value="voiceover_audio">تعليق صوتي</option>
                      <option value="video_animation">مونتاج وريلز</option>
                      <option value="ai_python">ذكاء اصطناعي وبايثون</option>
                      <option value="translation_writing">ترجمة وتدقيق</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      الولاية الجزائرية
                    </label>
                    <select
                      value={importWilayaCode}
                      onChange={(e) => setImportWilayaCode(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden"
                    >
                      {ALGERIA_WILAYAS.map(w => (
                        <option key={w.code} value={w.code}>
                          {w.code} - {w.nameAr}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Starting Price USD & Skills */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      السعر على فايفر ($ USD)
                    </label>
                    <input
                      type="number"
                      min="5"
                      value={importPriceUsd}
                      onChange={(e) => setImportPriceUsd(Number(e.target.value))}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white font-mono"
                    />
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      = {(importPriceUsd * 240).toLocaleString()} دج محلياً
                    </span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      المهارات (مفصولة بفاصلة)
                    </label>
                    <input
                      type="text"
                      value={importSkills}
                      onChange={(e) => setImportSkills(e.target.value)}
                      placeholder="React, Figma, Arabic"
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsImportModalOpen(false)}
                    className="px-4 py-2.5 text-xs text-slate-600 font-bold hover:bg-slate-100 rounded-xl"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-emerald-700 text-white text-xs font-bold rounded-xl hover:bg-emerald-800 shadow-sm cursor-pointer"
                  >
                    تأكيد واستيراد الحساب
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
