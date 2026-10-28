import React, { useState } from 'react';
import { RealEstateListing, Locale } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { parseAndImportRealEstateListing } from '../../data/realEstateData';
import { ALGERIA_WILAYAS } from '../../data/wilayas';
import { 
  Home, 
  Building, 
  MapPin, 
  Phone, 
  Search, 
  PlusCircle, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  Filter, 
  FileCheck, 
  Layers, 
  Compass, 
  Key, 
  MessageCircle,
  Eye,
  Maximize2
} from 'lucide-react';

interface RealEstateViewProps {
  listings: RealEstateListing[];
  currentLocale: Locale;
  onOpenChatWithBroker?: (brokerId: string, brokerName: string) => void;
  onAddNewListing: (newListing: RealEstateListing) => void;
}

export const RealEstateView: React.FC<RealEstateViewProps> = ({
  listings,
  currentLocale,
  onOpenChatWithBroker,
  onAddNewListing
}) => {
  const t = TRANSLATIONS[currentLocale];

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWilaya, setSelectedWilaya] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState<string>('all');
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>('all');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [onlyActeLivret, setOnlyActeLivret] = useState(false);

  // Import Modal
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importUrlOrTitle, setImportUrlOrTitle] = useState('');
  const [importPlatform, setImportPlatform] = useState<RealEstateListing['sourcePlatform']>('ouedkniss');
  const [importTransaction, setImportTransaction] = useState<RealEstateListing['transactionType']>('sale');
  const [importPropType, setImportPropType] = useState<RealEstateListing['propertyType']>('apartment_f3');
  const [importWilayaCode, setImportWilayaCode] = useState('16');
  const [importCommune, setImportCommune] = useState('الجزائر العاصمة');
  const [importPrice, setImportPrice] = useState(15000000);
  const [importArea, setImportArea] = useState(95);
  const [importPhone, setImportPhone] = useState('');
  const [importPaperwork, setImportPaperwork] = useState<RealEstateListing['paperworkStatus']>('acte_livret');
  const [importSuccess, setImportSuccess] = useState(false);

  // Selected Detail Modal
  const [viewDetailListing, setViewDetailListing] = useState<RealEstateListing | null>(null);

  const transactions = [
    { id: 'all', labelAr: 'كل العمليات', labelFr: 'Toutes les opérations' },
    { id: 'sale', labelAr: 'بيع وشراء (Vente)', labelFr: 'Vente' },
    { id: 'rent_yearly', labelAr: 'كراء سنوي (Location)', labelFr: 'Location' },
    { id: 'rent_krilo_vacation', labelAr: 'كراء عطلات ومفروش (Krilo DZ)', labelFr: 'Krilo Vacances' },
    { id: 'commercial', labelAr: 'محلات ومستودعات تجارية', labelFr: 'Commercial & Dépôts' }
  ];

  const propertyTypes = [
    { id: 'all', labelAr: 'كل أنواع العقارات' },
    { id: 'apartment_f3', labelAr: 'شقة F3' },
    { id: 'apartment_f4', labelAr: 'شقة F4' },
    { id: 'villa', labelAr: 'فيلا مستقلة' },
    { id: 'terrain_constructible', labelAr: 'أرض صالحة للبناء' },
    { id: 'hangar_depot', labelAr: 'هانغار ومستودع تخزين' }
  ];

  const sourceBadges = [
    { id: 'all', labelAr: 'كل المصادر' },
    { id: 'ouedkniss', labelAr: 'واد كنيس (Ouedkniss)' },
    { id: 'krilo_dz', labelAr: 'كريلو (Krilo DZ)' },
    { id: 'facebook_marketplace', labelAr: 'فيسبوك ماركت بليس' },
    { id: 'facebook_groups', labelAr: 'مجموعات فايسبوك' },
    { id: 'khedma_direct', labelAr: 'وساطة خدمة ديزاد المباشرة' }
  ];

  const filteredListings = listings.filter(item => {
    const matchesWilaya = selectedWilaya === 'all' || item.wilayaCode === selectedWilaya;
    const matchesTrans = selectedTransaction === 'all' || item.transactionType === selectedTransaction;
    const matchesType = selectedPropertyType === 'all' || item.propertyType === selectedPropertyType;
    const matchesSource = selectedSource === 'all' || item.sourcePlatform === selectedSource;
    const matchesPaperwork = !onlyActeLivret || item.paperworkStatus === 'acte_livret';
    const matchesSearch = 
      item.titleAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.communeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sourceGroupOrSellerName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesWilaya && matchesTrans && matchesType && matchesSource && matchesPaperwork && matchesSearch;
  });

  const handleExecuteImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importUrlOrTitle) return;

    const wilayaObj = ALGERIA_WILAYAS.find(w => w.code === importWilayaCode);
    const newListing = parseAndImportRealEstateListing({
      urlOrTitle: importUrlOrTitle,
      sourcePlatform: importPlatform,
      transactionType: importTransaction,
      propertyType: importPropType,
      wilayaCode: importWilayaCode,
      wilayaNameAr: wilayaObj ? wilayaObj.nameAr : 'الجزائر',
      communeName: importCommune,
      priceDzd: Number(importPrice),
      areaM2: Number(importArea),
      contactPhone: importPhone,
      paperworkStatus: importPaperwork
    });

    onAddNewListing(newListing);
    setImportSuccess(true);
    setTimeout(() => {
      setImportSuccess(false);
      setIsImportModalOpen(false);
      setImportUrlOrTitle('');
      setImportPhone('');
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-amber-950 via-slate-900 to-emerald-950 text-white p-6 sm:p-10 border border-amber-900/50 shadow-xl">
        <div className="absolute top-0 end-0 -mt-10 -me-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="bg-amber-600/30 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-amber-400" />
              <span>الوساطة العقارية الشاملة (عقارات ديزاد)</span>
            </span>
            <span className="bg-emerald-500 text-slate-950 px-2.5 py-0.5 rounded-full font-bold">
              تجميع ذكي (Ouedkniss + Krilo + Facebook)
            </span>
            <span className="text-slate-300">
              سياسة ملء الفراغ العقاري والضمان القانوني
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            سوق العقارات الجزائري: بيع، كراء، ومصايف عبر 58 ولاية
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            مجمع عروض العقار الموثقة من منصة واد كنيس (Ouedkniss)، منصة كريلو (Krilo DZ) للشقق المفروشة والمصايف، فيسبوك ماركت بليس، ومجموعات العقار الولائية. فحص دقيق للأوراق (عقد ملكية + دفتر عقاري) لمنع الاحتيال وضمان حقوق المشتري والمستأجر.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setIsImportModalOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm hover:bg-amber-400 transition-colors shadow-lg cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>استيراد عقار من واد كنيس / فايسبوك / كريلو</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بشقة F3، فيلا، حيدرة، عين الترك، العلمة، هانغار الحميز..."
              className="w-full ps-10 pe-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-slate-900"
            />
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={selectedWilaya}
              onChange={(e) => setSelectedWilaya(e.target.value)}
              aria-label="تصفية العقارات حسب الولاية"
              className="w-full md:w-44 text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden"
            >
              <option value="all">كل الـ 58 ولاية</option>
              {ALGERIA_WILAYAS.map(w => (
                <option key={w.code} value={w.code}>
                  {w.code} - {w.nameAr}
                </option>
              ))}
            </select>

            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              aria-label="تصفية حسب المنصة المصدر"
              className="w-full md:w-48 text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden"
            >
              {sourceBadges.map(s => (
                <option key={s.id} value={s.id}>
                  {s.labelAr}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Transaction Chips */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
            {transactions.map(tr => (
              <button
                key={tr.id}
                onClick={() => setSelectedTransaction(tr.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors cursor-pointer ${
                  selectedTransaction === tr.id
                    ? 'bg-amber-600 text-white font-bold shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tr.labelAr}
              </button>
            ))}
          </div>

          <button
            onClick={() => setOnlyActeLivret(!onlyActeLivret)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
              onlyActeLivret
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>عقد موثق + دفتر عقاري فقط 📜</span>
          </button>
        </div>
      </div>

      {/* Real Estate Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden group"
          >
            <div>
              {/* Image Preview with Source Platform Badge */}
              <div className="aspect-16/10 bg-slate-100 overflow-hidden relative">
                <img
                  src={item.imageUrl}
                  alt={item.titleAr}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute top-2 start-2 flex items-center gap-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md text-white shadow-xs ${
                    item.sourcePlatform === 'ouedkniss' 
                      ? 'bg-amber-600' 
                      : item.sourcePlatform === 'krilo_dz'
                      ? 'bg-purple-600'
                      : item.sourcePlatform === 'facebook_groups'
                      ? 'bg-blue-600'
                      : 'bg-slate-800'
                  }`}>
                    {item.sourcePlatform === 'ouedkniss' ? 'واد كنيس' : item.sourcePlatform === 'krilo_dz' ? 'كريلو Krilo' : item.sourcePlatform === 'facebook_groups' ? 'جروب فايسبوك' : 'ماركت بليس'}
                  </span>
                  {item.isInspectedByKhedma && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-600 text-white flex items-center gap-1 shadow-xs">
                      <ShieldCheck className="w-3 h-3" />
                      <span>معاينة موثوقة</span>
                    </span>
                  )}
                </div>

                <div className="absolute bottom-2 start-2 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-mono px-2.5 py-1 rounded-lg">
                  {item.areaM2} م²
                  {item.roomsCount ? ` · ${item.roomsCount} غرف` : ''}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3.5">
                
                {/* Location & Neighborhood */}
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="font-bold text-slate-800">{item.wilayaNameAr}</span>
                  <span>·</span>
                  <span>{item.communeName}</span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-extrabold text-slate-900 leading-snug line-clamp-2">
                  {item.titleAr}
                </h3>

                {/* Paperwork Status Badge */}
                <div className="flex items-center gap-1.5 text-[11px] bg-slate-50 p-2 rounded-xl border border-slate-100 text-slate-700">
                  <FileCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="font-semibold">{item.paperworkLabelAr}</span>
                </div>

                {/* Price Display */}
                <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-amber-900 block font-medium">السعر المطلوب:</span>
                    <span className="text-base font-extrabold font-mono text-amber-950">
                      {item.priceDzd.toLocaleString()} دج
                    </span>
                  </div>
                  {item.pricePeriodUnit !== 'total' && (
                    <span className="text-[10px] font-semibold bg-white px-2 py-1 rounded-md border border-amber-300 text-amber-900">
                      / {item.pricePeriodUnit === 'day' ? 'اليوم' : 'الشهر'}
                    </span>
                  )}
                </div>

                {/* Source or Group attribution */}
                <div className="text-[10px] text-slate-400 font-mono truncate">
                  المصدر: {item.sourceGroupOrSellerName}
                </div>

              </div>
            </div>

            {/* Action Buttons: Phone & WhatsApp */}
            <div className="p-5 pt-0 grid grid-cols-2 gap-2">
              <a
                href={`tel:${item.contactPhone}`}
                className="py-2.5 px-3 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>اتصال بالمالك</span>
              </a>

              {item.contactWhatsapp ? (
                <a
                  href={`https://wa.me/${item.contactWhatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>واتساب</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => alert(`رقم الهاتف المباشر: ${item.contactPhone}`)}
                  className="py-2.5 px-3 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Key className="w-3.5 h-3.5 text-slate-600" />
                  <span>معلومات المعاينة</span>
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* Modal: Import Real Estate Listing */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">استيراد عقار من واد كنيس / فايسبوك / كريلو</h3>
                  <p className="text-xs text-slate-500">أدخل رابط الإعلان أو تفاصيله للإدراج الفوري</p>
                </div>
              </div>
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {importSuccess ? (
              <div className="p-6 bg-amber-50 rounded-2xl border border-amber-200 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-slate-900">تم إدراج العقار بنجاح!</h4>
                <p className="text-xs text-slate-600">أصبح العقار متاحاً الآن في البورصة العقارية لخدمة ديزاد.</p>
              </div>
            ) : (
              <form onSubmit={handleExecuteImport} className="space-y-3.5">
                
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    رابط الإعلان أو عنوان العقار *
                  </label>
                  <input
                    type="text"
                    required
                    value={importUrlOrTitle}
                    onChange={(e) => setImportUrlOrTitle(e.target.value)}
                    placeholder="رابط واد كنيس، منشور جروب فايسبوك، أو كريلو Krilo..."
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      المنصة المصدر
                    </label>
                    <select
                      value={importPlatform}
                      onChange={(e) => setImportPlatform(e.target.value as any)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                    >
                      <option value="ouedkniss">واد كنيس (Ouedkniss)</option>
                      <option value="krilo_dz">منصة كريلو (Krilo DZ)</option>
                      <option value="facebook_groups">جروب عقارات فايسبوك</option>
                      <option value="facebook_marketplace">ماركت بليس فايسبوك</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      نوع العملية
                    </label>
                    <select
                      value={importTransaction}
                      onChange={(e) => setImportTransaction(e.target.value as any)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                    >
                      <option value="sale">بيع وشراء (Vente)</option>
                      <option value="rent_yearly">كراء سنوي (Location)</option>
                      <option value="rent_krilo_vacation">كراء مصايف وعطلات (Krilo)</option>
                      <option value="commercial">تجاري ومستودعات</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      نوع العقار
                    </label>
                    <select
                      value={importPropType}
                      onChange={(e) => setImportPropType(e.target.value as any)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                    >
                      <option value="apartment_f3">شقة F3</option>
                      <option value="apartment_f4">شقة F4</option>
                      <option value="apartment_f2">شقة F2</option>
                      <option value="villa">فيلا مستقلة</option>
                      <option value="terrain_constructible">أرض صالحة للبناء</option>
                      <option value="hangar_depot">هانغار أو مستودع</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      الوثائق القانونية
                    </label>
                    <select
                      value={importPaperwork}
                      onChange={(e) => setImportPaperwork(e.target.value as any)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                    >
                      <option value="acte_livret">عقد ملكية + دفتر عقاري</option>
                      <option value="decision_attrib">قرار استفادة ودمج</option>
                      <option value="promesse_vente">وعد بالبيع موثق</option>
                      <option value="en_cours">ملف التسوية قيد الإشهار</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      الولاية
                    </label>
                    <select
                      value={importWilayaCode}
                      onChange={(e) => setImportWilayaCode(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                    >
                      {ALGERIA_WILAYAS.map(w => (
                        <option key={w.code} value={w.code}>
                          {w.code} - {w.nameAr}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      البلدية والحي
                    </label>
                    <input
                      type="text"
                      value={importCommune}
                      onChange={(e) => setImportCommune(e.target.value)}
                      placeholder="الشراقة، بئر الجير، العلمة..."
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      السعر بالدينار (دج)
                    </label>
                    <input
                      type="number"
                      value={importPrice}
                      onChange={(e) => setImportPrice(Number(e.target.value))}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      المساحة (م²)
                    </label>
                    <input
                      type="number"
                      value={importArea}
                      onChange={(e) => setImportArea(Number(e.target.value))}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    هاتف المالك أو الوسيط
                  </label>
                  <input
                    type="text"
                    value={importPhone}
                    onChange={(e) => setImportPhone(e.target.value)}
                    placeholder="0550112233"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white font-mono"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsImportModalOpen(false)}
                    className="px-4 py-2 text-xs text-slate-600 font-bold hover:bg-slate-100 rounded-xl"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-amber-600 text-white text-xs font-bold rounded-xl hover:bg-amber-700 shadow-sm cursor-pointer"
                  >
                    تأكيد وإدراج العقار
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
