import React, { useState } from 'react';
import { ProductItem, Locale, OuedknissItem } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { WILAYAS_58 } from '../../data/wilayas';
import { OUEDKNISS_MOCK_ITEMS } from '../../data/wholesaleHubs';
import { 
  Building, 
  MapPin, 
  Plus, 
  Tag, 
  Sparkles, 
  Search, 
  Filter, 
  Truck, 
  FileSpreadsheet,
  Check,
  Star,
  ExternalLink,
  Phone,
  Layers
} from 'lucide-react';

interface MarketplaceViewProps {
  products: ProductItem[];
  currentLocale: Locale;
  isWholesaleMode: boolean;
  setIsWholesaleMode: (val: boolean) => void;
  onAddToCart: (product: ProductItem, qty: number) => void;
  onOpenRfq: () => void;
  onOpenParcelTracker: () => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  products,
  currentLocale,
  isWholesaleMode,
  setIsWholesaleMode,
  onAddToCart,
  onOpenRfq,
  onOpenParcelTracker
}) => {
  const t = TRANSLATIONS[currentLocale];
  const [activePlatformFilter, setActivePlatformFilter] = useState<'all' | 'khedma' | 'ouedkniss'>('all');
  const [selectedWilaya, setSelectedWilaya] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const ouedknissItems: OuedknissItem[] = OUEDKNISS_MOCK_ITEMS;

  const categories = [
    { id: 'all', labelAr: 'كل المواد والعتاد', labelFr: 'Tous les Matériaux' },
    { id: 'construction', labelAr: 'مواد البناء والإسمنت', labelFr: 'Gros Œuvre & Ciment' },
    { id: 'plumbing', labelAr: 'السباكة والمضخات', labelFr: 'Plomberie & Pompes' },
    { id: 'electrical', labelAr: 'الكابلات والكهرباء', labelFr: 'Câbles & Électricité' },
    { id: 'finishing', labelAr: 'الجبس BA13 والتشطيب', labelFr: 'Plâtre BA13 & Finition' }
  ];

  const filteredProducts = products.filter(p => {
    const matchesWilaya = selectedWilaya === 'all' || p.merchantWilaya === selectedWilaya;
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = 
      p.titleAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.titleFr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.merchantName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesWilaya && matchesCategory && matchesSearch;
  });

  const handleAdd = (product: ProductItem) => {
    const qty = isWholesaleMode ? product.moq : 1;
    onAddToCart(product, qty);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1500);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner & Wholesale Switcher Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-800">
        <div className="max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-emerald-400">سوق ديزاد الوطني (58 ولاية)</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-300">مباشرة من المصانع والمستودعات</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {t.marketplace.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300">
            {isWholesaleMode ? t.marketplace.modeNoticeB2B : t.marketplace.modeNoticeB2C}
          </p>

          {/* Quick Action Buttons for RFQ & Freight Tracker */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenRfq}
              className="py-2 px-4 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>{t.marketplace.rfqButton}</span>
            </button>
            <button
              onClick={onOpenParcelTracker}
              className="py-2 px-4 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Truck className="w-4 h-4 text-emerald-400" />
              <span>{t.marketplace.parcelTracker}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Platform & Source Selector: Khedma DZ Official Depots vs Ouedkniss Classifieds */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs text-xs">
        <button
          onClick={() => setActivePlatformFilter('all')}
          className={`py-2 px-4 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activePlatformFilter === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>البحث الموحد الشامل (Khedma DZ + Ouedkniss)</span>
        </button>

        <button
          onClick={() => setActivePlatformFilter('khedma')}
          className={`py-2 px-4 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activePlatformFilter === 'khedma'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>مستودعات ومصانع خدمة ديزاد الرسمية (B2B/B2C)</span>
        </button>

        <button
          onClick={() => setActivePlatformFilter('ouedkniss')}
          className={`py-2 px-4 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activePlatformFilter === 'ouedkniss'
              ? 'bg-amber-500 text-slate-950 shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ExternalLink className="w-4 h-4" />
          <span>إعلانات واد كنيس Ouedkniss الحرة (عتاد، آلات، وشاحنات)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في واد كنيس ومستودعات ديزاد (إسمنت، سقالة، خلاطة، هيلتي، شاحنة)..."
              className="w-full ps-10 pe-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
            />
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
          </div>

          {/* Wilaya Filter */}
          <div className="w-full sm:w-64">
            <select
              value={selectedWilaya}
              onChange={(e) => setSelectedWilaya(e.target.value)}
              className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
            >
              <option value="all">{t.common.allWilayas}</option>
              {WILAYAS_58.map(w => (
                <option key={w.code} value={w.code}>
                  {w.code} - {w.nameAr} ({w.nameFr})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-700 text-white font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {currentLocale === 'ar' ? cat.labelAr : cat.labelFr}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Display: Mixing Khedma DZ Products & Ouedkniss Classifieds */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Khedma Official Products */}
        {(activePlatformFilter === 'all' || activePlatformFilter === 'khedma') &&
          filteredProducts.map(product => {
            const wilayaInfo = WILAYAS_58.find(w => w.code === product.merchantWilaya);

            return (
              <div 
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Image & Clearance Tag */}
                  <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.titleFr}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 start-3 px-2 py-0.5 rounded-md bg-emerald-700 text-white text-[10px] font-bold shadow-xs">
                      مستودع خدمة ديزاد الرسمي
                    </div>
                    {product.isClearance && (
                      <div className="absolute top-3 end-3 px-2 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-bold shadow-xs">
                        تصفية المخازن -{product.clearanceDiscountPercent}%
                      </div>
                    )}
                    <div className="absolute bottom-3 start-3 px-2 py-1 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-[10px] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      <span>{wilayaInfo ? wilayaInfo.nameAr : `ولاية ${product.merchantWilaya}`}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-700">
                      <span className="truncate max-w-[200px] font-medium">{product.merchantName}</span>
                      <span className="flex items-center gap-1 text-amber-500 font-bold font-mono">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        {product.merchantRating}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 line-clamp-2">
                      {currentLocale === 'ar' ? product.titleAr : product.titleFr}
                    </h3>

                    {/* Pricing Matrix */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                      <div className="flex items-baseline justify-between">
                        <span className="text-[11px] text-slate-700">
                          {isWholesaleMode ? 'سعر الجملة المخفض:' : 'سعر التجزئة للقطعة:'}
                        </span>
                        <span className="text-base font-extrabold font-mono text-emerald-700">
                          {isWholesaleMode 
                            ? product.bulkPricingTiers[1]?.priceDzd.toLocaleString() 
                            : product.unitRetailPriceDzd.toLocaleString()} {t.common.dzd}
                        </span>
                      </div>

                      {isWholesaleMode && (
                        <div className="pt-2 border-t border-slate-200 text-[10px] font-mono space-y-1">
                          <div className="text-slate-700 font-sans font-semibold">سلّم الخصم حسب الكميات:</div>
                          {product.bulkPricingTiers.map((tier, idx) => (
                            <div key={idx} className="flex justify-between text-slate-600">
                              <span>ابتداءً من {tier.minQty} وحدة:</span>
                              <span className="font-bold text-slate-900">{tier.priceDzd} دج/وحدة</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {isWholesaleMode && (
                      <div className="text-[11px] text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 flex items-center justify-between">
                        <span>الحد الأدنى للطلب (MOQ):</span>
                        <span className="font-bold font-mono">{product.moq} وحدة</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Add to Cart CTA */}
                <div className="p-5 pt-0">
                  <button
                    type="button"
                    onClick={() => handleAdd(product)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer ${
                      addedProductId === product.id
                        ? 'bg-emerald-800 text-white'
                        : 'bg-emerald-700 text-white hover:bg-emerald-800'
                    }`}
                  >
                    {addedProductId === product.id ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>تمت الإضافة للسلة بنجاح</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>
                          {isWholesaleMode 
                            ? `طلب بالجملة (${product.moq} وحدة)` 
                            : 'إضافة إلى السلة'}
                        </span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}

        {/* Ouedkniss Classified Items */}
        {(activePlatformFilter === 'all' || activePlatformFilter === 'ouedkniss') &&
          ouedknissItems
            .filter(item => {
              const matchesWilaya = selectedWilaya === 'all' || item.wilayaCode === selectedWilaya;
              const matchesSearch = 
                item.titleAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.titleFr.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.sellerName.toLowerCase().includes(searchQuery.toLowerCase());
              return matchesWilaya && matchesSearch;
            })
            .map(item => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border-2 border-amber-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.titleFr}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 start-3 px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 text-[10px] font-black shadow-xs flex items-center gap-1">
                      <span>إعلان واد كنيس Ouedkniss</span>
                    </div>

                    <div className="absolute top-3 end-3 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold">
                      {item.condition === 'neuf' ? 'جديد في الكرتون' :
                       item.condition === 'tres_bon_etat' ? 'حالة ممتازة' :
                       item.condition === 'destockage' ? 'تصفية مخازن' : 'مستعمل جيد'}
                    </div>

                    <div className="absolute bottom-3 start-3 px-2 py-1 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-[10px] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{item.communeName}</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-700">
                      <span className="font-semibold text-slate-900">{item.sellerName}</span>
                      <span className="font-mono text-[10px] text-slate-500">{item.postedDate}</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 line-clamp-2">
                      {currentLocale === 'ar' ? item.titleAr : item.titleFr}
                    </h3>

                    {/* Price & Price Comparison Note */}
                    <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 space-y-1">
                      <div className="flex items-baseline justify-between">
                        <span className="text-[11px] text-amber-900 font-semibold">سعر البائع:</span>
                        <span className="text-base font-black font-mono text-slate-900">
                          {item.priceDzd.toLocaleString()} {t.common.dzd}
                        </span>
                      </div>
                      {item.priceComparisonNote && (
                        <div className="text-[10px] text-emerald-800 font-bold">
                          ✓ {item.priceComparisonNote}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Direct Call & Open Ouedkniss Link */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${item.sellerPhone}`}
                    className="py-2.5 px-3 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>اتصال بالبائع</span>
                  </a>

                  <a
                    href={item.ouedknissUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>فتح الإعلان</span>
                  </a>
                </div>

              </div>
            ))}

      </div>

    </div>
  );
};
