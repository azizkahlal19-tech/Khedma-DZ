import React, { useState, useMemo } from 'react';
import { Locale } from '../types';
import { WILAYAS_58 } from '../data/wilayas';
import { 
  executeComprehensiveAlgerianSearch, 
  UniversalSearchResult, 
  SearchSourceType, 
  SearchCategoryType 
} from '../services/algerianSearchEngine';
import { 
  Search, 
  Filter, 
  Phone, 
  Share2, 
  ExternalLink, 
  CheckCircle, 
  SlidersHorizontal, 
  Bookmark, 
  Bell, 
  RefreshCw, 
  Sparkles, 
  Layers, 
  Building2, 
  Briefcase, 
  HardHat, 
  Wrench, 
  Zap, 
  MapPin, 
  Check, 
  ChevronDown,
  X
} from 'lucide-react';

interface ComprehensiveAlgerianSearchProps {
  currentLocale: Locale;
  initialQuery?: string;
  isEmbedded?: boolean;
  onNavigateToAppTab?: (tab: string) => void;
}

export const ComprehensiveAlgerianSearch: React.FC<ComprehensiveAlgerianSearchProps> = ({
  currentLocale,
  initialQuery = '',
  isEmbedded = false,
  onNavigateToAppTab
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedWilaya, setSelectedWilaya] = useState<string>('all');
  const [selectedSource, setSelectedSource] = useState<SearchSourceType>('all');
  const [selectedCategory, setSelectedCategory] = useState<SearchCategoryType>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'newest' | 'price_asc' | 'price_desc'>('relevance');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [savedAlertQuery, setSavedAlertQuery] = useState<string | null>(null);
  const [copiedItemUrl, setCopiedItemUrl] = useState<string | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  // Popular search suggestions common in Algeria
  const quickSearchTags = [
    { label: '🔨 بناي وماصو حجر', query: 'بناي ماصو' },
    { label: '👷 عمال تفريغ 1000 دج', query: 'بوليفالون 1000' },
    { label: '🧱 إسمنت وحديد لافارج', query: 'إسمنت لافارج' },
    { label: '💼 مهندس مدني ومعماري', query: 'مهندس مدني' },
    { label: '🏠 كراء شقة F3 كريلو', query: 'كراء شقة F3' },
    { label: '🎨 دهان عصري وبلاكو', query: 'دهان بلاكو' },
    { label: '⚡ تقني كهرباء وترصيص', query: 'كهربائي ترصيص' },
    { label: '🏬 سلع جملة العلمة', query: 'جملة العلمة' }
  ];

  const searchResultsData = useMemo(() => {
    return executeComprehensiveAlgerianSearch({
      query,
      wilayaCode: selectedWilaya,
      source: selectedSource,
      category: selectedCategory,
      verifiedOnly,
      sortBy
    });
  }, [query, selectedWilaya, selectedSource, selectedCategory, verifiedOnly, sortBy]);

  const { results, totalMatches, sourcesBreakdown } = searchResultsData;

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCopyLink = (item: UniversalSearchResult) => {
    const textToCopy = `${item.title} - ${item.wilayaName}\nرابط: ${item.externalUrl}\nهاتف: ${item.contactPhone || 'متاح بالتطبيق'}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedItemUrl(item.id);
      setTimeout(() => setCopiedItemUrl(null), 2000);
    });
  };

  const handleSaveAlert = () => {
    const alertLabel = query ? `"${query}"` : 'كافة الإعلانات الجديدة';
    setSavedAlertQuery(alertLabel);
    setTimeout(() => setSavedAlertQuery(null), 4000);
  };

  return (
    <div className={`space-y-6 ${isEmbedded ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'}`}>
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-xl text-white">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>محرك البحث الشامل الجزائري المطور (Web & Social DZ Radar)</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            ابحث في كل الشبكة ومواقع التواصل الجزائرية من مكان واحد
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            محرك بحث ذكي يفحص ويكتشف فورياً إعلانات واد كنيس (Ouedkniss)، مجموعات فيسبوك الجزائرية (FB Groups)، منصة كريلو للعقارات، بروفايلات لينكد إن (LinkedIn DZ)، ترندات تيك توك، وسجل الحرفيين المعتمدين (CAM) عبر 58 ولاية.
          </p>
        </div>

        {/* Central Search Input Box */}
        <div className="mt-6 space-y-3">
          <div className="relative flex flex-col sm:flex-row items-center gap-2 bg-slate-950/80 p-2 rounded-2xl border border-slate-700 shadow-inner">
            
            <div className="relative flex-1 w-full flex items-center">
              <Search className="w-5 h-5 text-emerald-400 absolute right-3 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث بالاسم، المهنة (ماصو، بلومبي، مهندس)، أو المادة (إسمنت، سيراميك)، أو المنطقة..."
                className="w-full bg-transparent text-white placeholder-slate-400 pr-11 pl-8 py-3 text-sm sm:text-base focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute left-2 text-slate-400 hover:text-white p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Wilaya Dropdown */}
            <div className="w-full sm:w-56 shrink-0">
              <select
                value={selectedWilaya}
                onChange={(e) => setSelectedWilaya(e.target.value)}
                className="w-full bg-slate-900 text-slate-100 text-xs sm:text-sm rounded-xl py-3 px-3 border border-slate-700 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="all">📍 جميع الولايات (58 ولاية)</option>
                {WILAYAS_58.map(w => (
                  <option key={w.code} value={w.code}>
                    {w.code} - {w.nameAr} ({w.nameFr})
                  </option>
                ))}
              </select>
            </div>

            {/* Toggle Advanced Filters Button */}
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                showAdvancedFilters
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                  : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
              }`}
              title="تصفية متقدمة"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">فلاتر</span>
            </button>

          </div>

          {/* Quick Popular Keywords */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none text-xs">
            <span className="text-slate-400 shrink-0 font-medium">بحث شائع:</span>
            {quickSearchTags.map((tag, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(tag.query)}
                className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-emerald-600/30 text-slate-300 hover:text-emerald-200 border border-slate-700 transition-colors cursor-pointer"
              >
                {tag.label}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Advanced Filters Panel (Expandable) */}
      {showAdvancedFilters && (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-md space-y-5 animate-fade-in text-white">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
              <Filter className="w-4 h-4 text-emerald-400" />
              <span>فلاتر البحث الدقيقة</span>
            </h3>
            <button
              onClick={() => {
                setSelectedSource('all');
                setSelectedCategory('all');
                setSelectedWilaya('all');
                setVerifiedOnly(false);
                setSortBy('relevance');
              }}
              className="text-xs text-amber-400 hover:underline cursor-pointer flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>إعادة ضبط الفلاتر</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Filter by Platform Source */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400">المصدر والمنصة المستهدفة:</label>
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value as SearchSourceType)}
                className="w-full bg-slate-800 text-slate-200 text-xs rounded-xl p-2.5 border border-slate-700 focus:outline-none focus:border-emerald-500"
              >
                <option value="all">🌐 كل المصادر والشبكات</option>
                <option value="ouedkniss">🛒 واد كنيس (Ouedkniss)</option>
                <option value="facebook">📘 مجموعات فيسبوك الجزائرية (FB Groups)</option>
                <option value="linkedin">💼 لينكد إن الجزائر (LinkedIn DZ)</option>
                <option value="krilo">🏠 سوق كريلو للعقارات (Krilo DZ)</option>
                <option value="cam">🔨 سجل الحرفيين المعتمدين (CAM)</option>
                <option value="tiktok">📹 رادار تيك توك الجزائري (TikTok DZ)</option>
                <option value="anem">🏢 منصة وسيط (ANEM Wassit)</option>
                <option value="wholesale">🏬 أسواق الجملة (العلمة والحميز)</option>
                <option value="telegram">✈️ قنوات تيليغرام الصفقات</option>
              </select>
            </div>

            {/* Filter by Category */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400">التصنيف والمجال:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as SearchCategoryType)}
                className="w-full bg-slate-800 text-slate-200 text-xs rounded-xl p-2.5 border border-slate-700 focus:outline-none focus:border-emerald-500"
              >
                <option value="all">كل المجالات</option>
                <option value="trades">🔨 الحرفيون وأشغال الصيانة</option>
                <option value="polivalente">👷 عمال اليومية والورشات (1,000 دج)</option>
                <option value="building_materials">🧱 مواد البناء والعتاد بالجملة</option>
                <option value="jobs">💼 التوظيف والشهادات الجامعية</option>
                <option value="real_estate">🏠 العقارات والكراء (واد كنيس / كريلو)</option>
                <option value="freelance">⚡ الخدمات الرقمية وفايفر</option>
                <option value="courses">🎓 التكوين والشهادات</option>
              </select>
            </div>

            {/* Sort Order */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400">ترتيب النتائج حسب:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-slate-800 text-slate-200 text-xs rounded-xl p-2.5 border border-slate-700 focus:outline-none focus:border-emerald-500"
              >
                <option value="relevance">الأكثر تطابقاً وملاءمة</option>
                <option value="newest">الأحدث نشراً في الشبكة</option>
                <option value="price_asc">الأقل سعراً (دج)</option>
                <option value="price_desc">الأعلى سعراً (دج)</option>
              </select>
            </div>

          </div>

          {/* Checkboxes */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="rounded text-emerald-500 focus:ring-emerald-500 h-4 w-4 bg-slate-800 border-slate-700"
              />
              <span>إظهار الإعلانات الموثقة فقط (بطاقة حرفي CAM / سجل تجاري RC)</span>
            </label>
          </div>

        </div>
      )}

      {/* Real-time Source Radar Stats Pills */}
      <div className="flex items-center justify-between flex-wrap gap-3 text-xs bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        
        <div className="flex items-center gap-2">
          <span className="font-bold text-white">نتائج البحث المباشر:</span>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
            {totalMatches} نتيجة متوفرة
          </span>
          {query && (
            <span className="text-slate-400">
              لـ "{query}"
            </span>
          )}
        </div>

        {/* Source Pills quick switches */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1 scrollbar-none">
          <button
            onClick={() => setSelectedSource('all')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
              selectedSource === 'all'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            الكل ({totalMatches})
          </button>
          {sourcesBreakdown['facebook'] !== undefined && (
            <button
              onClick={() => setSelectedSource('facebook')}
              className={`px-2 py-1 rounded-lg text-[11px] font-semibold cursor-pointer transition-colors ${
                selectedSource === 'facebook'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              فيسبوك ({sourcesBreakdown['facebook']})
            </button>
          )}
          {sourcesBreakdown['ouedkniss'] !== undefined && (
            <button
              onClick={() => setSelectedSource('ouedkniss')}
              className={`px-2 py-1 rounded-lg text-[11px] font-semibold cursor-pointer transition-colors ${
                selectedSource === 'ouedkniss'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              واد كنيس ({sourcesBreakdown['ouedkniss']})
            </button>
          )}
          {sourcesBreakdown['linkedin'] !== undefined && (
            <button
              onClick={() => setSelectedSource('linkedin')}
              className={`px-2 py-1 rounded-lg text-[11px] font-semibold cursor-pointer transition-colors ${
                selectedSource === 'linkedin'
                  ? 'bg-blue-700 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              لينكد إن ({sourcesBreakdown['linkedin']})
            </button>
          )}
          {sourcesBreakdown['krilo'] !== undefined && (
            <button
              onClick={() => setSelectedSource('krilo')}
              className={`px-2 py-1 rounded-lg text-[11px] font-semibold cursor-pointer transition-colors ${
                selectedSource === 'krilo'
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              كريلو ({sourcesBreakdown['krilo']})
            </button>
          )}
          {sourcesBreakdown['cam'] !== undefined && (
            <button
              onClick={() => setSelectedSource('cam')}
              className={`px-2 py-1 rounded-lg text-[11px] font-semibold cursor-pointer transition-colors ${
                selectedSource === 'cam'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              سجل CAM ({sourcesBreakdown['cam']})
            </button>
          )}
        </div>

        {/* Search Alert Trigger */}
        <button
          onClick={handleSaveAlert}
          className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 cursor-pointer bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20"
        >
          <Bell className="w-3.5 h-3.5" />
          <span>تفعيل تنبيهات هذا البحث</span>
        </button>

      </div>

      {/* Alert Saved Feedback */}
      {savedAlertQuery && (
        <div className="p-3 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-200 text-xs flex items-center gap-2 animate-fade-in">
          <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>تم حفظ التنبيه بنجاح! سيتم إشعارك فور رصد إعلانات أو طلبات جديدة مطابقة لـ {savedAlertQuery} في ولايتك.</span>
        </div>
      )}

      {/* Results Grid */}
      {results.length === 0 ? (
        <div className="bg-slate-900 rounded-3xl p-12 text-center border border-slate-800 space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto text-2xl">
            🔎
          </div>
          <h3 className="text-lg font-bold text-white">لم نجد نتائج مطابقة لبحثك في الوقت الحالي</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            جرب كتابة كلمات أبسط (مثلاً: "ماصو"، "إسمنت"، "شقة") أو اختر ولاية أخرى أو أعد ضبط الفلاتر.
          </p>
          <button
            onClick={() => {
              setQuery('');
              setSelectedWilaya('all');
              setSelectedSource('all');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer"
          >
            عرض جميع العروض المتاحة
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map((item) => {
            const isBookmarked = bookmarkedIds.has(item.id);

            return (
              <div
                key={item.id}
                className="bg-slate-900 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between overflow-hidden group shadow-lg hover:shadow-xl"
              >
                {/* Item Top Card Header */}
                <div className="p-5 space-y-3">
                  
                  {/* Source and Location Line */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${item.sourceBadgeColor}`}>
                      {item.sourceNameAr}
                    </span>

                    <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate max-w-[130px]">{item.communeName || item.wilayaName}</span>
                    </div>
                  </div>

                  {/* Thumbnail / Image if available */}
                  {item.thumbnailUrl && (
                    <div className="w-full h-36 rounded-xl overflow-hidden bg-slate-800 relative">
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      {item.priceLabel && (
                        <div className="absolute bottom-2 right-2 bg-slate-950/90 text-amber-300 text-xs font-black px-2.5 py-1 rounded-lg border border-amber-500/30">
                          {item.priceLabel}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Title */}
                  <h4 className="font-bold text-white text-sm sm:text-base leading-snug group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h4>

                  {/* Description Snippet */}
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Author / Poster Info */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="font-semibold text-slate-200">{item.authorName}</span>
                      {item.verified && (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      )}
                    </div>
                    <span className="shrink-0 text-slate-500">{item.postedAt}</span>
                  </div>

                </div>

                {/* Bottom Action Footer */}
                <div className="p-4 bg-slate-950/70 border-t border-slate-800 flex items-center justify-between gap-2">
                  
                  {/* Phone Call Button */}
                  {item.contactPhone ? (
                    <a
                      href={`tel:${item.contactPhone}`}
                      className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>اتصال ({item.contactPhone})</span>
                    </a>
                  ) : (
                    <button
                      onClick={() => onNavigateToAppTab && onNavigateToAppTab(item.category === 'polivalente' ? 'polivalente' : 'trades')}
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>طلب عبر التطبيق</span>
                    </button>
                  )}

                  {/* External Source Link */}
                  {item.externalUrl && (
                    <a
                      href={item.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 cursor-pointer transition-colors"
                      title="فتح المصدر الأصلي للإعلان"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}

                  {/* Copy Link / Share */}
                  <button
                    onClick={() => handleCopyLink(item)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 cursor-pointer transition-colors"
                    title="نسخ ومشاركة"
                  >
                    {copiedItemUrl === item.id ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                  </button>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => handleToggleBookmark(item.id)}
                    className={`p-2 rounded-xl border cursor-pointer transition-colors ${
                      isBookmarked
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                    }`}
                    title={isBookmarked ? 'محفوظ في المفضلة' : 'حفظ في المفضلة'}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>

                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
