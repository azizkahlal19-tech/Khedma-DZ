import React, { useState } from 'react';
import { ServiceListing, Locale } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { WILAYAS_58 } from '../../data/wilayas';
import { 
  Wrench, 
  MapPin, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Star, 
  Search, 
  Zap, 
  CheckCircle2,
  Clock,
  Briefcase,
  Award,
  PlusCircle,
  FileCheck2
} from 'lucide-react';

interface TradesCraftsmenViewProps {
  craftsmen: ServiceListing[];
  currentLocale: Locale;
  onOpenChatWithWorker: (workerId: string, workerName: string) => void;
  onAddNewArtisan?: (newArtisan: ServiceListing) => void;
}

export const TradesCraftsmenView: React.FC<TradesCraftsmenViewProps> = ({
  craftsmen,
  currentLocale,
  onOpenChatWithWorker,
  onAddNewArtisan
}) => {
  const t = TRANSLATIONS[currentLocale];
  const [selectedWilaya, setSelectedWilaya] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [onlyEmergency, setOnlyEmergency] = useState(false);
  const [onlyCamArtisans, setOnlyCamArtisans] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [callingWorkerId, setCallingWorkerId] = useState<string | null>(null);

  // CAM Artisan Card Registration Modal
  const [isRegisterCamModalOpen, setIsRegisterCamModalOpen] = useState(false);
  const [camName, setCamName] = useState('');
  const [camCardNumber, setCamCardNumber] = useState('');
  const [camWilaya, setCamWilaya] = useState('16');
  const [camCategory, setCamCategory] = useState<ServiceListing['category']>('plumbing');
  const [camPhone, setCamPhone] = useState('');
  const [camRate, setCamRate] = useState(2500);
  const [camSuccess, setCamSuccess] = useState(false);

  const categories = [
    { id: 'all', labelAr: 'كل التخصصات والحرف', labelFr: 'Tous les Métiers' },
    { id: 'plumbing', labelAr: t.trades.plumbing, labelFr: 'Plomberie & Fuites' },
    { id: 'electrical', labelAr: t.trades.electrical, labelFr: 'Électricité' },
    { id: 'drywall_ba13', labelAr: t.trades.ba13, labelFr: 'Plâtre BA13' },
    { id: 'auto_mechanic', labelAr: t.trades.mechanic, labelFr: 'Mécanique Mobile' },
    { id: 'obd2_diagnostics', labelAr: t.trades.obd2, labelFr: 'Scanner OBD-II' },
    { id: 'hvac_ac', labelAr: t.trades.hvac, labelFr: 'Climatisation & Froid' }
  ];

  const filteredCraftsmen = craftsmen.filter(c => {
    const matchesWilaya = selectedWilaya === 'all' || c.wilayaCode === selectedWilaya;
    const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
    const matchesVerified = !onlyVerified || c.isVerified;
    const matchesEmergency = !onlyEmergency || c.isEmergencyAvailable;
    const matchesCam = !onlyCamArtisans || Boolean(c.isOfficialCamArtisan);
    const matchesSearch = 
      c.workerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.titleAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.titleFr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.artisanCardNumber && c.artisanCardNumber.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesWilaya && matchesCategory && matchesVerified && matchesEmergency && matchesCam && matchesSearch;
  });

  const handleRegisterCamArtisan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!camName || !camCardNumber || !camPhone) return;

    const wilayaObj = WILAYAS_58.find(w => w.code === camWilaya);
    const newArtisan: ServiceListing = {
      id: 'artisan-' + Date.now(),
      workerId: 'w-cam-' + Date.now(),
      workerName: camName,
      phone: camPhone,
      wilayaCode: camWilaya,
      category: camCategory,
      titleAr: `حرفي معتمد رسمي ببطاقة حرفي (غرفة ${wilayaObj?.nameAr || 'الجزائر'})`,
      titleFr: `Artisan Qualifié Certifié CAM - Wilaya de ${wilayaObj?.nameFr || 'Alger'}`,
      descriptionAr: `حرفي مؤهل رسمياً ومسجل بغرفة الصناعة التقليدية والحرف رقم القيد (${camCardNumber}). عمل معتمد ومضمون بالفاتورة والضمان القانوني.`,
      descriptionFr: `Artisan immatriculé à la Chambre de l'Artisanat et des Métiers sous le N° ${camCardNumber}. Prestations garanties.`,
      baseRateDzd: Number(camRate) || 2500,
      rateUnit: 'job',
      rating: 5.0,
      reviewCount: 1,
      isVerified: true,
      isEmergencyAvailable: true,
      isOfficialCamArtisan: true,
      artisanCardNumber: camCardNumber,
      artisanCamWilaya: `غرفة الصناعة التقليدية والحرف لولاية ${wilayaObj?.nameAr || 'الجزائر'} (CAM)`,
      artisanCardExpiry: '2028-12-31',
      badges: ['بطاقة حرفي رسمية (CAM)', 'موثق رسمياً', 'حرفي معتمد'],
      toolsProvided: ['عتاد مهني معتمد بالكامل'],
      avatarUrl: `https://images.unsplash.com/photo-${1540569014015 + Math.floor(Math.random() * 5000)}?w=400&auto=format&fit=crop&q=80`
    };

    if (onAddNewArtisan) {
      onAddNewArtisan(newArtisan);
    }
    setCamSuccess(true);
    setTimeout(() => {
      setCamSuccess(false);
      setIsRegisterCamModalOpen(false);
      setCamName('');
      setCamCardNumber('');
      setCamPhone('');
    }, 1500);
  };

  const handleCall = (worker: ServiceListing) => {
    setCallingWorkerId(worker.id);
    setTimeout(() => {
      window.location.href = `tel:${worker.phone}`;
      setCallingWorkerId(null);
    }, 500);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-800">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-emerald-400">شبكة الحرفيين المعتمدين الوطنية</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-300">تحقق بيومتري رسمي وهويات موثقة</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {t.trades.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300">
            {t.trades.subtitle}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم، الحرفة (بلومبي، تريسيا، با13، سكانير)..."
              className="w-full ps-10 pe-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
            />
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
          </div>

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

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-100">
          
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
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

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setOnlyCamArtisans(!onlyCamArtisans)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer flex items-center gap-1 ${
                onlyCamArtisans 
                  ? 'bg-amber-100 text-amber-950 border-amber-400 font-bold' 
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>بطاقة حرفي معتمدة (CAM) 🏛️</span>
            </button>

            <button
              onClick={() => setOnlyVerified(!onlyVerified)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                onlyVerified 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              ✓ الحرفيون الموثقون فقط
            </button>

            <button
              onClick={() => setOnlyEmergency(!onlyEmergency)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                onlyEmergency 
                  ? 'bg-red-50 text-red-700 border-red-300' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              ⚡ طوارئ 24/7
            </button>

            <button
              onClick={() => setIsRegisterCamModalOpen(true)}
              className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>تسجيل بطاقة حرفي (CAM)</span>
            </button>
          </div>

        </div>
      </div>

      {/* Craftsmen Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCraftsmen.map(worker => {
          const wilayaInfo = WILAYAS_58.find(w => w.code === worker.wilayaCode);

          return (
            <div
              key={worker.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="p-5 space-y-4">
                
                {/* Header: Avatar, Name, Verified Badge, Rating */}
                <div className="flex items-start gap-3">
                  <img
                    src={worker.avatarUrl}
                    alt={worker.workerName}
                    className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="text-sm font-bold text-slate-900 truncate">
                        {worker.workerName}
                      </h3>
                      {worker.isVerified && (
                        <span title="موثق رسمياً بالبطاقة البيومترية">
                          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span className="flex items-center gap-1 text-amber-500 font-bold font-mono">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        {worker.rating}
                      </span>
                      <span>·</span>
                      <span>{worker.reviewCount} {t.common.reviews}</span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                      <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>{wilayaInfo ? wilayaInfo.nameAr : `ولاية ${worker.wilayaCode}`}</span>
                      {worker.isEmergencyAvailable && (
                        <span className="text-red-600 font-bold text-[10px] ml-1">⚡ متاح للطوارئ</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Official CAM Artisan Card Badge */}
                {worker.isOfficialCamArtisan && worker.artisanCardNumber && (
                  <div 
                    className="flex items-center gap-1.5 p-2 bg-amber-50 text-amber-950 rounded-xl border border-amber-300 text-[11px] font-semibold"
                    title={worker.artisanCamWilaya || 'غرفة الصناعة التقليدية والحرف'}
                  >
                    <Award className="w-4 h-4 text-amber-700 shrink-0" />
                    <div className="truncate">
                      <span className="font-bold">بطاقة حرفي CAM: </span>
                      <span className="font-mono text-amber-900">{worker.artisanCardNumber}</span>
                    </div>
                  </div>
                )}

                {/* Job Title & Description */}
                <div>
                  <h4 className="text-xs font-bold text-slate-800 mb-1">
                    {currentLocale === 'ar' ? worker.titleAr : worker.titleFr}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {currentLocale === 'ar' ? worker.descriptionAr : worker.descriptionFr}
                  </p>
                </div>

                {/* Pricing Banner */}
                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-center justify-between">
                  <span className="text-xs text-emerald-900 font-medium">سعر البدء التقديري:</span>
                  <span className="text-sm font-extrabold font-mono text-emerald-700">
                    {worker.baseRateDzd.toLocaleString()} {t.common.dzd}
                    <span className="text-[10px] text-emerald-800/80 font-normal ml-1">
                      / {worker.rateUnit === 'job' ? 'خدمة' : worker.rateUnit === 'hour' ? 'ساعة' : 'م²'}
                    </span>
                  </span>
                </div>

                {/* Tools & Badges */}
                <div className="flex flex-wrap gap-1 text-[10px]">
                  {worker.badges.map((b, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                      {b}
                    </span>
                  ))}
                </div>

              </div>

              {/* Action Buttons: Call & Chat */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleCall(worker)}
                  className="py-2.5 px-3 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{callingWorkerId === worker.id ? 'جارٍ الاتصال...' : t.common.contact}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenChatWithWorker(worker.workerId, worker.workerName)}
                  className="py-2.5 px-3 rounded-xl text-xs font-bold bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-slate-600" />
                  <span>{t.common.chat}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Modal: Register Official CAM Artisan Card */}
      {isRegisterCamModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">توثيق وتسجيل بطاقة حرفي رسمية</h3>
                  <p className="text-xs text-slate-500">غرفة الصناعة التقليدية والحرف (CAM) عبر 58 ولاية</p>
                </div>
              </div>
              <button
                onClick={() => setIsRegisterCamModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {camSuccess ? (
              <div className="p-6 bg-amber-50 rounded-2xl border border-amber-200 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-slate-900">تم توثيق بطاقة الحرفي بنجاح!</h4>
                <p className="text-xs text-slate-600">تم منحك شارة "حرفي معتمد CAM" الذهبية في دليل الحرفيين الوطني.</p>
              </div>
            ) : (
              <form onSubmit={handleRegisterCamArtisan} className="space-y-3.5">
                
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    الاسم واللقب كما في بطاقة الحرفي *
                  </label>
                  <input
                    type="text"
                    required
                    value={camName}
                    onChange={(e) => setCamName(e.target.value)}
                    placeholder="مثال: كمال بلقاسم"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    رقم القيد في بطاقة الحرفي (N° d'Immatriculation CAM) *
                  </label>
                  <input
                    type="text"
                    required
                    value={camCardNumber}
                    onChange={(e) => setCamCardNumber(e.target.value)}
                    placeholder="مثال: 16/00-14892/A/21"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      الغرفة الولائية (CAM)
                    </label>
                    <select
                      value={camWilaya}
                      onChange={(e) => setCamWilaya(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                    >
                      {WILAYAS_58.map(w => (
                        <option key={w.code} value={w.code}>
                          {w.code} - غرفة {w.nameAr}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      الحرفة أو المهنة
                    </label>
                    <select
                      value={camCategory}
                      onChange={(e) => setCamCategory(e.target.value as any)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                    >
                      <option value="plumbing">سباكة صحية وغاز</option>
                      <option value="electrical">كهرباء وتأريض</option>
                      <option value="drywall_ba13">جبس وديكور BA13</option>
                      <option value="auto_mechanic">ميكانيك سيارات</option>
                      <option value="obd2_diagnostics">سكانير وبرمجة عقول</option>
                      <option value="hvac_ac">تبريد وتكييف</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      رقم الهاتف المهني *
                    </label>
                    <input
                      type="text"
                      required
                      value={camPhone}
                      onChange={(e) => setCamPhone(e.target.value)}
                      placeholder="0550123456"
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      السعر المبدئي بالدينار (دج)
                    </label>
                    <input
                      type="number"
                      value={camRate}
                      onChange={(e) => setCamRate(Number(e.target.value))}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsRegisterCamModalOpen(false)}
                    className="px-4 py-2 text-xs text-slate-600 font-bold hover:bg-slate-100 rounded-xl"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-amber-600 text-white text-xs font-bold rounded-xl hover:bg-amber-700 shadow-sm cursor-pointer"
                  >
                    تأكيد وتوثيق البطاقة
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

