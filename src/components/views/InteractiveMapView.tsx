import React, { useState, useMemo } from 'react';
import { Locale, ServiceListing, ProductItem, PolivalenteTask, RealEstateListing, CompanyJobOffer } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { WILAYAS_58 } from '../../data/wilayas';
import { ALGERIAN_COMMUNES, getCommunesByWilaya } from '../../data/communes';
import { 
  MapPin, 
  Navigation, 
  Users, 
  Wrench, 
  Building, 
  Phone, 
  ShieldCheck, 
  Search, 
  Crosshair, 
  Layers, 
  Share2, 
  Clock,
  Compass,
  Briefcase,
  Home,
  CheckCircle2,
  Filter,
  Eye,
  ArrowRight,
  TrendingUp,
  X,
  PhoneCall,
  MessageSquare
} from 'lucide-react';

// Geographic center coordinates for each of the 58 Wilayas in Algeria
export const WILAYA_COORDINATES: Record<string, { lat: number; lng: number; region: 'Centre' | 'Est' | 'Ouest' | 'Sud' }> = {
  '01': { lat: 27.87, lng: -0.29, region: 'Sud' }, // Adrar
  '02': { lat: 36.16, lng: 1.33, region: 'Centre' }, // Chlef
  '03': { lat: 33.80, lng: 2.87, region: 'Sud' }, // Laghouat
  '04': { lat: 35.87, lng: 7.11, region: 'Est' }, // Oum El Bouaghi
  '05': { lat: 35.55, lng: 6.17, region: 'Est' }, // Batna
  '06': { lat: 36.75, lng: 5.06, region: 'Centre' }, // Béjaïa
  '07': { lat: 34.85, lng: 5.73, region: 'Sud' }, // Biskra
  '08': { lat: 31.62, lng: -2.22, region: 'Sud' }, // Béchar
  '09': { lat: 36.47, lng: 2.83, region: 'Centre' }, // Blida
  '10': { lat: 36.37, lng: 3.90, region: 'Centre' }, // Bouira
  '11': { lat: 22.78, lng: 5.52, region: 'Sud' }, // Tamanrasset
  '12': { lat: 35.40, lng: 8.12, region: 'Est' }, // Tébessa
  '13': { lat: 34.88, lng: -1.31, region: 'Ouest' }, // Tlemcen
  '14': { lat: 35.37, lng: 1.32, region: 'Ouest' }, // Tiaret
  '15': { lat: 36.71, lng: 4.05, region: 'Centre' }, // Tizi Ouzou
  '16': { lat: 36.75, lng: 3.05, region: 'Centre' }, // Alger
  '17': { lat: 34.67, lng: 3.25, region: 'Centre' }, // Djelfa
  '18': { lat: 36.82, lng: 5.76, region: 'Est' }, // Jijel
  '19': { lat: 36.19, lng: 5.41, region: 'Est' }, // Sétif
  '20': { lat: 34.83, lng: 0.15, region: 'Ouest' }, // Saïda
  '21': { lat: 36.88, lng: 6.90, region: 'Est' }, // Skikda
  '22': { lat: 35.20, lng: -0.63, region: 'Ouest' }, // Sidi Bel Abbès
  '23': { lat: 36.90, lng: 7.76, region: 'Est' }, // Annaba
  '24': { lat: 36.46, lng: 7.43, region: 'Est' }, // Guelma
  '25': { lat: 36.36, lng: 6.61, region: 'Est' }, // Constantine
  '26': { lat: 36.26, lng: 2.75, region: 'Centre' }, // Médéa
  '27': { lat: 35.93, lng: 0.09, region: 'Ouest' }, // Mostaganem
  '28': { lat: 35.70, lng: 4.54, region: 'Centre' }, // M'Sila
  '29': { lat: 35.40, lng: 0.14, region: 'Ouest' }, // Mascara
  '30': { lat: 31.95, lng: 5.32, region: 'Sud' }, // Ouargla
  '31': { lat: 35.69, lng: -0.63, region: 'Ouest' }, // Oran
  '32': { lat: 33.68, lng: 1.02, region: 'Ouest' }, // El Bayadh
  '33': { lat: 26.48, lng: 8.48, region: 'Sud' }, // Illizi
  '34': { lat: 36.07, lng: 4.76, region: 'Est' }, // Bordj Bou Arréridj
  '35': { lat: 36.76, lng: 3.47, region: 'Centre' }, // Boumerdès
  '36': { lat: 36.76, lng: 8.31, region: 'Est' }, // El Tarf
  '37': { lat: 27.67, lng: -8.14, region: 'Sud' }, // Tindouf
  '38': { lat: 35.60, lng: 1.81, region: 'Ouest' }, // Tissemsilt
  '39': { lat: 33.36, lng: 6.86, region: 'Sud' }, // El Oued
  '40': { lat: 35.43, lng: 7.14, region: 'Est' }, // Khenchela
  '41': { lat: 36.28, lng: 7.95, region: 'Est' }, // Souk Ahras
  '42': { lat: 36.59, lng: 2.44, region: 'Centre' }, // Tipaza
  '43': { lat: 36.45, lng: 6.26, region: 'Est' }, // Mila
  '44': { lat: 36.26, lng: 1.96, region: 'Centre' }, // Aïn Defla
  '45': { lat: 33.26, lng: -0.31, region: 'Ouest' }, // Naâma
  '46': { lat: 35.30, lng: -1.14, region: 'Ouest' }, // Aïn Témouchent
  '47': { lat: 32.49, lng: 3.67, region: 'Sud' }, // Ghardaïa
  '48': { lat: 35.74, lng: 0.55, region: 'Ouest' }, // Relizane
  '49': { lat: 29.26, lng: 0.23, region: 'Sud' }, // Timimoun
  '50': { lat: 21.33, lng: 0.95, region: 'Sud' }, // Bordj Badji Mokhtar
  '51': { lat: 34.42, lng: 5.06, region: 'Sud' }, // Ouled Djellal
  '52': { lat: 30.13, lng: -2.16, region: 'Sud' }, // Béni Abbès
  '53': { lat: 27.20, lng: 2.47, region: 'Sud' }, // In Salah
  '54': { lat: 19.57, lng: 5.77, region: 'Sud' }, // In Guezzam
  '55': { lat: 33.10, lng: 6.06, region: 'Sud' }, // Touggourt
  '56': { lat: 24.55, lng: 9.48, region: 'Sud' }, // Djanet
  '57': { lat: 33.95, lng: 5.92, region: 'Sud' }, // El M'Ghair
  '58': { lat: 30.58, lng: 2.87, region: 'Sud' } // El Meniaa
};

// Convert Lat/Lng to SVG Map Percentage (bounds: Lat 18.5 - 37.5, Lng -9.0 - 10.0)
function getMapPercentage(lat: number, lng: number): { x: number; y: number } {
  const minLat = 18.5;
  const maxLat = 37.5;
  const minLng = -9.0;
  const maxLng = 10.0;
  
  // Clamping
  const clampedLat = Math.min(Math.max(lat, minLat), maxLat);
  const clampedLng = Math.min(Math.max(lng, minLng), maxLng);

  const x = ((clampedLng - minLng) / (maxLng - minLng)) * 100;
  const y = ((maxLat - clampedLat) / (maxLat - minLat)) * 100;
  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
}

export type MapListingCategory = 'all' | 'craftsmen' | 'depots' | 'polivalente' | 'real_estate' | 'jobs' | 'relatives';
export type RegionFilter = 'ALL' | 'Centre' | 'Est' | 'Ouest' | 'Sud';

export interface InteractiveMapViewProps {
  currentLocale: Locale;
  craftsmen: ServiceListing[];
  products: ProductItem[];
  tasks: PolivalenteTask[];
  jobOffers?: CompanyJobOffer[];
  realEstateListings?: RealEstateListing[];
  onOpenChat: (workerId: string, workerName: string) => void;
  onNavigateToTab?: (tab: string) => void;
}

export const InteractiveMapView: React.FC<InteractiveMapViewProps> = ({
  currentLocale,
  craftsmen = [],
  products = [],
  tasks = [],
  jobOffers = [],
  realEstateListings = [],
  onOpenChat,
  onNavigateToTab
}) => {
  const t = TRANSLATIONS[currentLocale] || TRANSLATIONS.ar;
  const isAr = currentLocale === 'ar';

  // Geographic filtering state
  const [selectedWilaya, setSelectedWilaya] = useState<string>('16'); // Default Algiers '16', or 'all'
  const [selectedRegion, setSelectedRegion] = useState<RegionFilter>('ALL');
  const [wilayaSearchQuery, setWilayaSearchQuery] = useState<string>('');
  const [selectedCommune, setSelectedCommune] = useState<string>('1604'); // Hydra
  const [filterLayer, setFilterLayer] = useState<MapListingCategory>('all');
  
  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Active Pin inspection state
  const [activePin, setActivePin] = useState<{
    id: string;
    type: 'worker' | 'depot' | 'task' | 'real_estate' | 'job' | 'relative';
    title: string;
    subtitle: string;
    phone: string;
    wilayaCode: string;
    communeName?: string;
    priceOrRate?: string;
    lat: number;
    lng: number;
    extra?: string;
  } | null>({
    id: 'craft-1',
    type: 'worker',
    title: 'كمال بلقاسم (سباك معتمد CAM)',
    subtitle: 'سباكة وكشف تسربات بالموجات الصوتية · متواجد بحيدرة',
    phone: '0550123456',
    wilayaCode: '16',
    communeName: 'حيدرة',
    priceOrRate: '2,500 دج / مهمة',
    lat: 36.7431,
    lng: 3.0425,
    extra: 'مسافة 1.2 كم من المركز'
  });

  // Relative / Trusted Safety Circle state
  const [relatives] = useState([
    {
      id: 'rel-1',
      name: 'فاطمة بن سالم (الوالدة / المنزل)',
      relation: 'المنزل العائلي',
      commune: 'القبة، الجزائر العاصمة',
      wilayaCode: '16',
      phone: '0551009988',
      status: 'في المنزل بأمان',
      lat: 36.7300,
      lng: 3.0800
    },
    {
      id: 'rel-2',
      name: 'ياسين بن سالم (الأخ / ورشة بوفاريك)',
      relation: 'أخ شقيق',
      commune: 'بوفاريك، البليدة',
      wilayaCode: '09',
      phone: '0662112233',
      status: 'في ورشة البناء حالياً',
      lat: 36.5750,
      lng: 2.9125
    }
  ]);

  // Derived Wilaya Object
  const currentWilayaObj = useMemo(() => {
    return WILAYAS_58.find(w => w.code === selectedWilaya);
  }, [selectedWilaya]);

  // Available Communes for Selected Wilaya
  const communes = useMemo(() => {
    return getCommunesByWilaya(selectedWilaya);
  }, [selectedWilaya]);

  const currentCommuneObj = useMemo(() => {
    return ALGERIAN_COMMUNES.find(c => c.code === selectedCommune);
  }, [selectedCommune]);

  // Handle Wilaya change
  const handleWilayaChange = (code: string) => {
    setSelectedWilaya(code);
    const comms = getCommunesByWilaya(code);
    if (comms.length > 0) {
      setSelectedCommune(comms[0].code);
    } else {
      setSelectedCommune('');
    }

    // Auto set an active pin in this wilaya
    const coords = WILAYA_COORDINATES[code] || { lat: 36.75, lng: 3.05 };
    const wilayaMeta = WILAYAS_58.find(w => w.code === code);
    setActivePin({
      id: `hub-${code}`,
      type: 'worker',
      title: `مركز خدمات ${wilayaMeta?.nameAr || 'الولاية'} (${code})`,
      subtitle: `${wilayaMeta?.hub || 'المنصة اللوجستية المركزية'} · ${wilayaMeta?.tradePriority || 'خدمات وحرف معتمدة'}`,
      phone: '0555000000',
      wilayaCode: code,
      communeName: wilayaMeta?.nameAr,
      priceOrRate: 'تغطية فورية',
      lat: coords.lat,
      lng: coords.lng,
      extra: `معدل الكثافة: ${wilayaMeta?.densityScore || 85}%`
    });
  };

  // Filtered Wilayas for Fast Selector
  const filteredWilayas = useMemo(() => {
    return WILAYAS_58.filter(w => {
      const coord = WILAYA_COORDINATES[w.code];
      const matchesRegion = selectedRegion === 'ALL' || (coord && coord.region === selectedRegion);
      const query = wilayaSearchQuery.trim().toLowerCase();
      const matchesSearch = !query || 
        w.code.includes(query) || 
        w.nameAr.toLowerCase().includes(query) || 
        w.nameFr.toLowerCase().includes(query);
      return matchesRegion && matchesSearch;
    });
  }, [selectedRegion, wilayaSearchQuery]);

  // Count active listings per Wilaya for the 58 Wilaya badge indicator
  const listingCountsByWilaya = useMemo(() => {
    const counts: Record<string, number> = {};
    // Init all 58
    WILAYAS_58.forEach(w => { counts[w.code] = 0; });

    craftsmen.forEach(c => {
      if (counts[c.wilayaCode] !== undefined) counts[c.wilayaCode]++;
    });
    products.forEach(p => {
      if (counts[p.merchantWilaya] !== undefined) counts[p.merchantWilaya]++;
    });
    tasks.forEach(t => {
      if (counts[t.wilayaCode] !== undefined) counts[t.wilayaCode]++;
    });
    jobOffers.forEach(j => {
      if (counts[j.wilayaCode] !== undefined) counts[j.wilayaCode]++;
    });
    realEstateListings.forEach(r => {
      if (counts[r.wilayaCode] !== undefined) counts[r.wilayaCode]++;
    });

    return counts;
  }, [craftsmen, products, tasks, jobOffers, realEstateListings]);

  // Unified Listings for the current Wilaya / Filters
  const currentListings = useMemo(() => {
    interface UnifiedListing {
      id: string;
      type: 'craftsmen' | 'depots' | 'polivalente' | 'real_estate' | 'jobs' | 'relatives';
      typeLabelAr: string;
      title: string;
      subtitle: string;
      phone: string;
      price: string;
      wilayaCode: string;
      communeName?: string;
      lat: number;
      lng: number;
      badge?: string;
      isOfficial?: boolean;
    }

    const results: UnifiedListing[] = [];

    // Filter Craftsmen
    if (filterLayer === 'all' || filterLayer === 'craftsmen') {
      craftsmen
        .filter(c => selectedWilaya === 'all' || c.wilayaCode === selectedWilaya)
        .forEach(c => {
          const coords = WILAYA_COORDINATES[c.wilayaCode] || { lat: 36.75, lng: 3.05 };
          results.push({
            id: c.id,
            type: 'craftsmen',
            typeLabelAr: 'حرفي معتمد (CAM)',
            title: `${c.workerName} - ${c.titleAr}`,
            subtitle: c.descriptionAr,
            phone: c.phone,
            price: `${c.baseRateDzd.toLocaleString()} دج / ${c.rateUnit === 'job' ? 'مهمة' : c.rateUnit === 'hour' ? 'ساعة' : 'م²'}`,
            wilayaCode: c.wilayaCode,
            communeName: WILAYAS_58.find(w => w.code === c.wilayaCode)?.nameAr,
            lat: coords.lat + (Math.random() * 0.04 - 0.02),
            lng: coords.lng + (Math.random() * 0.04 - 0.02),
            badge: c.badges[0] || 'معتمد',
            isOfficial: c.isOfficialCamArtisan
          });
        });
    }

    // Filter Depots / Materials
    if (filterLayer === 'all' || filterLayer === 'depots') {
      products
        .filter(p => selectedWilaya === 'all' || p.merchantWilaya === selectedWilaya)
        .forEach(p => {
          results.push({
            id: p.id,
            type: 'depots',
            typeLabelAr: 'مستودع مواد بناء',
            title: `${p.merchantName} - ${p.titleAr}`,
            subtitle: p.depotGps.address || 'مستودع جملة وتجزئة',
            phone: '0551998877',
            price: `${p.unitRetailPriceDzd.toLocaleString()} دج (أدنى كمية ${p.moq})`,
            wilayaCode: p.merchantWilaya,
            communeName: WILAYAS_58.find(w => w.code === p.merchantWilaya)?.nameAr,
            lat: p.depotGps.lat,
            lng: p.depotGps.lng,
            badge: `مخزون: ${p.stockQuantity}`,
            isOfficial: true
          });
        });
    }

    // Filter Tasks (Polivalente)
    if (filterLayer === 'all' || filterLayer === 'polivalente') {
      tasks
        .filter(t => selectedWilaya === 'all' || t.wilayaCode === selectedWilaya)
        .forEach(t => {
          const coords = WILAYA_COORDINATES[t.wilayaCode] || { lat: 36.75, lng: 3.05 };
          results.push({
            id: t.id,
            type: 'polivalente',
            typeLabelAr: 'مهمة يومية (1000+ دج)',
            title: `${t.titleAr} (${t.clientName})`,
            subtitle: `${t.address} · ${t.description}`,
            phone: t.clientPhone,
            price: `${t.budgetDzd.toLocaleString()} دج`,
            wilayaCode: t.wilayaCode,
            communeName: t.address,
            lat: coords.lat + (Math.random() * 0.03 - 0.015),
            lng: coords.lng + (Math.random() * 0.03 - 0.015),
            badge: t.urgent ? 'عاجل' : 'مفتوح للتقديم',
            isOfficial: false
          });
        });
    }

    // Filter Real Estate
    if (filterLayer === 'all' || filterLayer === 'real_estate') {
      realEstateListings
        .filter(r => selectedWilaya === 'all' || r.wilayaCode === selectedWilaya)
        .forEach(r => {
          const coords = WILAYA_COORDINATES[r.wilayaCode] || { lat: 36.75, lng: 3.05 };
          results.push({
            id: r.id,
            type: 'real_estate',
            typeLabelAr: r.transactionType === 'sale' ? 'بيع عقاري' : 'كراء كريلو Krilo',
            title: r.titleAr,
            subtitle: `${r.neighborhood} - ${r.communeName} (${r.areaM2} م²)`,
            phone: r.contactPhone,
            price: `${r.priceDzd.toLocaleString()} دج`,
            wilayaCode: r.wilayaCode,
            communeName: r.communeName,
            lat: coords.lat + (Math.random() * 0.03 - 0.015),
            lng: coords.lng + (Math.random() * 0.03 - 0.015),
            badge: r.paperworkLabelAr || 'موثق',
            isOfficial: r.isInspectedByKhedma
          });
        });
    }

    // Filter Jobs
    if (filterLayer === 'all' || filterLayer === 'jobs') {
      jobOffers
        .filter(j => selectedWilaya === 'all' || j.wilayaCode === selectedWilaya)
        .forEach(j => {
          const coords = WILAYA_COORDINATES[j.wilayaCode] || { lat: 36.75, lng: 3.05 };
          results.push({
            id: j.id,
            type: 'jobs',
            typeLabelAr: 'عرض عمل وتوظيف',
            title: `${j.companyName} - ${j.jobTitleAr}`,
            subtitle: `${j.communeName} · ${j.descriptionAr}`,
            phone: j.contactPhone || '021000000',
            price: `${j.salaryMinDzd.toLocaleString()} - ${j.salaryMaxDzd.toLocaleString()} دج`,
            wilayaCode: j.wilayaCode,
            communeName: j.communeName,
            lat: coords.lat + (Math.random() * 0.03 - 0.015),
            lng: coords.lng + (Math.random() * 0.03 - 0.015),
            badge: j.contractType.toUpperCase(),
            isOfficial: true
          });
        });
    }

    // Filter Relatives
    if (filterLayer === 'all' || filterLayer === 'relatives') {
      relatives
        .filter(r => selectedWilaya === 'all' || r.wilayaCode === selectedWilaya)
        .forEach(r => {
          results.push({
            id: r.id,
            type: 'relatives',
            typeLabelAr: 'دائرة الثقة والأقارب',
            title: r.name,
            subtitle: `${r.relation} · ${r.commune}`,
            phone: r.phone,
            price: r.status,
            wilayaCode: r.wilayaCode,
            communeName: r.commune,
            lat: r.lat,
            lng: r.lng,
            badge: 'أمان وتتبع',
            isOfficial: true
          });
        });
    }

    return results;
  }, [craftsmen, products, tasks, jobOffers, realEstateListings, relatives, selectedWilaya, filterLayer]);

  // Handle GPS Auto Locate simulation
  const handleSimulateGPS = () => {
    const defaultCoords = currentCommuneObj || { lat: 36.75, lng: 3.05, nameAr: 'الجزائر العاصمة' };
    showToast(`✓ تم تحديث إحداثيات GPS بنجاح: ${defaultCoords.lat.toFixed(4)}°, ${defaultCoords.lng.toFixed(4)}° (${currentWilayaObj?.nameAr || 'الجزائر'})`);
  };

  // Handle Share Location With Relatives
  const handleShareWithRelatives = () => {
    showToast('✓ تم إرسال موقع التدخل الجغرافي المشفر إلى دائرة الأقارب الموثوقة لتأمين الزيارة المنزلية.');
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-4 left-4 sm:left-auto sm:right-6 z-50 bg-emerald-900/95 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-3 backdrop-blur-md animate-fade-in text-xs sm:text-sm font-semibold max-w-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="flex-1">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-emerald-300 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Hero Header Banner */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 animate-spin" />
              <span>الرادار الجغرافي الوطني الموحد</span>
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-emerald-400 font-semibold">تغطية شاملة لـ 58 ولاية و1,541 بلدية</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-300 font-mono text-[11px]">GPS DZ High Precision</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            خريطة الحرفيين، الورشات ومستودعات التوريد عبر 58 ولاية
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            نظام الفلترة الجغرافية الذكي لربط الطلبات المحلية بالحرفيين المعتمدين من غرفة الحرف (CAM)، عمال اليومية للورشات، ومستودعات مواد البناء، مع تتبع آمن عبر الأقمار الصناعية ودائرة الأقارب.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-lg sm:text-xl font-black text-emerald-400 font-mono">58 / 58</div>
              <div className="text-[11px] text-slate-400 font-medium">ولاية مغطاة بالرادار</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-lg sm:text-xl font-black text-white font-mono">{craftsmen.length}+</div>
              <div className="text-[11px] text-slate-400 font-medium">حرفي معتمد (CAM)</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-lg sm:text-xl font-black text-blue-400 font-mono">{products.length}+</div>
              <div className="text-[11px] text-slate-400 font-medium">مستودع مواد بناء</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-lg sm:text-xl font-black text-amber-400 font-mono">{tasks.length + realEstateListings.length}+</div>
              <div className="text-[11px] text-slate-400 font-medium">ورشة وعقار نشط</div>
            </div>
          </div>
        </div>
      </div>

      {/* 58-Wilaya Geographic Filtering & Segmentation Toolbar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
        
        {/* Region Segmentation Tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-slate-900">تقسيم النطاق الجغرافي:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {(['ALL', 'Centre', 'Est', 'Ouest', 'Sud'] as RegionFilter[]).map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  selectedRegion === reg
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {reg === 'ALL' ? 'كل الولايات (58)' :
                 reg === 'Centre' ? 'الوسط (Centre)' :
                 reg === 'Est' ? 'الشرق (Est)' :
                 reg === 'Ouest' ? 'الغرب (Ouest)' : 'الجنوب الكبير (Sud)'}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Select Row */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          
          {/* Fast Search Wilaya by Code or Name */}
          <div className="sm:col-span-4 relative">
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              البحث برقم الولاية أو الاسم:
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
              <input
                type="text"
                placeholder="مثال: 16 أو الجزائر أو وهران 31 أو 58..."
                value={wilayaSearchQuery}
                onChange={(e) => setWilayaSearchQuery(e.target.value)}
                className="w-full pr-9 pl-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium text-slate-900"
              />
              {wilayaSearchQuery && (
                <button
                  onClick={() => setWilayaSearchQuery('')}
                  className="absolute left-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* 58 Wilaya Dropdown Selector */}
          <div className="sm:col-span-4">
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              الولاية المختارة (58 Wilayas):
            </label>
            <select
              value={selectedWilaya}
              onChange={(e) => handleWilayaChange(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900 font-bold"
            >
              <option value="all">🌍 كل ولايات الوطن الـ 58 (عرض شامل)</option>
              {filteredWilayas.map(w => {
                const count = listingCountsByWilaya[w.code] || 0;
                return (
                  <option key={w.code} value={w.code}>
                    {w.code} - ولاية {w.nameAr} ({w.nameFr}) {count > 0 ? `· [${count} إعلان نشط]` : ''}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Commune Selector */}
          <div className="sm:col-span-4">
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              البلدية والرمز البريدي (Commune):
            </label>
            <select
              value={selectedCommune}
              onChange={(e) => setSelectedCommune(e.target.value)}
              disabled={selectedWilaya === 'all'}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900 font-medium disabled:opacity-50"
            >
              {selectedWilaya === 'all' ? (
                <option value="">كل البلديات (نطاق وطني شامل)</option>
              ) : communes.length > 0 ? (
                communes.map(c => (
                  <option key={c.code} value={c.code}>
                    {c.nameAr} ({c.nameFr}) - {c.postalCode} [دائرة {c.dairaAr}]
                  </option>
                ))
              ) : (
                <option value="">مركز ولاية {currentWilayaObj?.nameAr} العام (البلدية المركزية)</option>
              )}
            </select>
          </div>

        </div>

        {/* 58-Wilaya Quick Pills Carousel */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-slate-600">
              الانتقال السريع للولاية ({filteredWilayas.length} ولاية متوفرة):
            </span>
            {selectedWilaya !== 'all' && (
              <button
                onClick={() => handleWilayaChange('all')}
                className="text-[11px] text-emerald-700 hover:text-emerald-800 font-bold cursor-pointer"
              >
                إلغاء التحديد وعرض كل الولايات
              </button>
            )}
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
            <button
              onClick={() => handleWilayaChange('all')}
              className={`shrink-0 px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                selectedWilaya === 'all'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>الكل</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20">58</span>
            </button>

            {filteredWilayas.map(w => {
              const isSelected = selectedWilaya === w.code;
              const count = listingCountsByWilaya[w.code] || 0;
              return (
                <button
                  key={w.code}
                  onClick={() => handleWilayaChange(w.code)}
                  className={`shrink-0 px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-slate-900 text-white ring-2 ring-emerald-500 shadow-xs'
                      : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className={`text-[10px] font-mono px-1 py-0.2 rounded ${
                    isSelected ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-slate-200 text-slate-800'
                  }`}>
                    {w.code}
                  </span>
                  <span>{w.nameAr}</span>
                  {count > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Wilaya Hub Header Info Card */}
        {currentWilayaObj && selectedWilaya !== 'all' && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-emerald-700 text-white font-mono font-bold">
                  ولاية {currentWilayaObj.code}
                </span>
                <span className="font-extrabold text-slate-900 text-sm">
                  {currentWilayaObj.nameAr} ({currentWilayaObj.nameFr})
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-600 font-semibold">{currentWilayaObj.hub}</span>
              </div>
              <div className="text-slate-500 flex flex-wrap gap-x-3 gap-y-1">
                <span>المحور اللوجستي: <strong className="text-slate-700">{currentWilayaObj.logisticsCorridor}</strong></span>
                <span>·</span>
                <span>الأولوية المهنية: <strong className="text-emerald-800">{currentWilayaObj.tradePriority}</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <div className="text-[10px] text-slate-500">حرفيون ومستخدمون نشطون</div>
                <div className="font-mono font-bold text-slate-900">{currentWilayaObj.activeUsers.toLocaleString()} مستخدم</div>
              </div>
              <div className="h-8 w-px bg-slate-200"></div>
              <div className="text-right">
                <div className="text-[10px] text-slate-500">كثافة الطلب</div>
                <div className="font-mono font-bold text-emerald-700">{currentWilayaObj.densityScore}% مرتفع</div>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter Layer Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1">
          <span className="text-[11px] font-bold text-slate-500 shrink-0">نوع النشاط:</span>
          
          <button
            onClick={() => setFilterLayer('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              filterLayer === 'all' ? 'bg-emerald-700 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            الكل ({currentListings.length})
          </button>

          <button
            onClick={() => setFilterLayer('craftsmen')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              filterLayer === 'craftsmen' ? 'bg-emerald-700 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>الحرفيون (CAM)</span>
          </button>

          <button
            onClick={() => setFilterLayer('polivalente')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              filterLayer === 'polivalente' ? 'bg-amber-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>عمال اليومية 1000 دج</span>
          </button>

          <button
            onClick={() => setFilterLayer('depots')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              filterLayer === 'depots' ? 'bg-blue-700 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>المستودعات ومواد البناء</span>
          </button>

          <button
            onClick={() => setFilterLayer('real_estate')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              filterLayer === 'real_estate' ? 'bg-purple-700 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>عقارات وورشات Krilo</span>
          </button>

          <button
            onClick={() => setFilterLayer('jobs')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              filterLayer === 'jobs' ? 'bg-indigo-700 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>عروض التوظيف</span>
          </button>

          <button
            onClick={() => setFilterLayer('relatives')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              filterLayer === 'relatives' ? 'bg-rose-700 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>دائرة الأقارب</span>
          </button>
        </div>

      </div>

      {/* Main Map Canvas & Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Interactive Map Viewport */}
        <div className="lg:col-span-7 bg-slate-950 rounded-3xl p-5 border border-slate-800 shadow-2xl relative min-h-[500px] flex flex-col justify-between overflow-hidden">
          
          {/* Radar Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0,transparent_70%)] pointer-events-none"></div>

          {/* Top Bar with GPS Coordinates and Region Overlay */}
          <div className="flex flex-wrap items-center justify-between gap-2 z-10">
            <div className="bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-xs flex items-center gap-2 border border-slate-800 shadow-sm">
              <Compass className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
              <span>
                {selectedWilaya === 'all' 
                  ? 'رادار كامل التراب الوطني (58 ولاية)'
                  : `المركز الجغرافي: ولاية ${currentWilayaObj?.nameAr} (${currentWilayaObj?.code})`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="bg-emerald-950/80 text-emerald-400 text-[11px] font-mono px-2.5 py-1 rounded-full border border-emerald-800">
                GPS DZ: ±2.5m
              </span>
              <button
                onClick={handleSimulateGPS}
                className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors cursor-pointer"
                title="تحديث موقعي GPS"
              >
                <Crosshair className="w-4 h-4 text-emerald-400" />
              </button>
            </div>
          </div>

          {/* Interactive Visual Map of Algeria (Canvas with plotted Wilaya Nodes) */}
          <div className="relative w-full h-[360px] my-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 overflow-hidden select-none">
            
            {/* Concentric Radar Grid Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <div className="w-[420px] h-[420px] rounded-full border border-emerald-500/50"></div>
              <div className="w-[280px] h-[280px] rounded-full border border-emerald-500/60 absolute"></div>
              <div className="w-[140px] h-[140px] rounded-full border border-emerald-500/80 absolute"></div>
              <div className="w-full h-px bg-emerald-500/30 absolute"></div>
              <div className="h-full w-px bg-emerald-500/30 absolute"></div>
            </div>

            {/* Simulated Algeria Coastline & Boundary Contour Indicator */}
            <div className="absolute top-2 right-4 left-4 flex justify-between text-[10px] text-slate-600 font-mono pointer-events-none">
              <span>البحر الأبيض المتوسط (الساحل الجزائري)</span>
              <span>خط العرض 37.0°N</span>
            </div>
            <div className="absolute bottom-2 right-4 left-4 flex justify-between text-[10px] text-slate-600 font-mono pointer-events-none">
              <span>الحدود الجنوبية الكبرى (عين قزام / تمنراست)</span>
              <span>خط العرض 19.5°N</span>
            </div>

            {/* Plotted Wilaya Interactive Nodes (all 58 Wilayas or region filtered) */}
            {filteredWilayas.map((w) => {
              const coords = WILAYA_COORDINATES[w.code];
              if (!coords) return null;
              const pos = getMapPercentage(coords.lat, coords.lng);
              const isSelected = selectedWilaya === w.code;
              const count = listingCountsByWilaya[w.code] || 0;

              return (
                <div
                  key={w.code}
                  style={{ top: `${pos.y}%`, left: `${pos.x}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                >
                  <button
                    onClick={() => handleWilayaChange(w.code)}
                    className={`w-4 h-4 rounded-full flex items-center justify-center transition-all cursor-pointer focus:outline-hidden ${
                      isSelected
                        ? 'w-7 h-7 bg-emerald-500 text-slate-950 font-black ring-4 ring-emerald-400/50 shadow-lg scale-125 z-30'
                        : count > 0
                        ? 'bg-amber-400 text-slate-950 hover:scale-150 ring-2 ring-white/50'
                        : 'bg-slate-700 hover:bg-emerald-400 text-white hover:scale-125'
                    }`}
                  >
                    <span className="text-[8px] font-bold font-mono">
                      {w.code}
                    </span>
                  </button>

                  {/* Popover Hover Label */}
                  <div className={`hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow-lg border border-slate-700 whitespace-nowrap z-40 pointer-events-none`}>
                    <span className="font-bold">{w.code} - {w.nameAr}</span>
                    {count > 0 && <span className="text-emerald-400 font-mono mr-1">({count})</span>}
                  </div>
                </div>
              );
            })}

            {/* Selected Wilaya Target Marker Ring */}
            {selectedWilaya !== 'all' && WILAYA_COORDINATES[selectedWilaya] && (
              (() => {
                const c = WILAYA_COORDINATES[selectedWilaya];
                const pos = getMapPercentage(c.lat, c.lng);
                return (
                  <div
                    style={{ top: `${pos.y}%`, left: `${pos.x}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
                  >
                    <div className="w-16 h-16 rounded-full border-2 border-emerald-400 animate-ping opacity-75"></div>
                    <div className="w-24 h-24 rounded-full border border-emerald-500/40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                  </div>
                );
              })()
            )}

          </div>

          {/* Map Footer Legend & Action */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 z-10 pt-2 border-t border-slate-800">
            <div className="flex flex-wrap items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>الولاية المحددة</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span>إعلانات نشطة</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span>
                <span>مراكز ولايات الـ 58</span>
              </span>
            </div>

            <div className="text-[11px] font-mono text-emerald-400">
              {currentListings.length} نقطة استجابة جغرافية
            </div>
          </div>

        </div>

        {/* Selected Pin / Details & Direct Contact Panel */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Active Pin Inspection Card */}
          {activePin ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                  activePin.type === 'worker' ? 'bg-emerald-100 text-emerald-800' :
                  activePin.type === 'depot' ? 'bg-blue-100 text-blue-800' :
                  activePin.type === 'task' ? 'bg-amber-100 text-amber-800' :
                  activePin.type === 'real_estate' ? 'bg-purple-100 text-purple-800' :
                  activePin.type === 'job' ? 'bg-indigo-100 text-indigo-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {activePin.type === 'worker' ? 'حرفي معتمد (CAM)' :
                   activePin.type === 'depot' ? 'مستودع مواد بناء' :
                   activePin.type === 'task' ? 'مهمة يومية 1000 دج' :
                   activePin.type === 'real_estate' ? 'عقار / ورشة Krilo' :
                   activePin.type === 'job' ? 'عرض توظيف' : 'دائرة الأقارب'}
                </span>
                
                <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                  ولاية {activePin.wilayaCode}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">{activePin.title}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{activePin.subtitle}</p>
              </div>

              {activePin.priceOrRate && (
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">التسعيرة / الميزانية:</span>
                    <span className="font-bold text-emerald-700 font-mono">{activePin.priceOrRate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">الهاتف المباشر:</span>
                    <span className="font-mono font-bold text-slate-900">{activePin.phone}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">إحداثيات الرادار:</span>
                    <span className="font-mono text-slate-600 text-[11px]">{activePin.lat.toFixed(4)}°, {activePin.lng.toFixed(4)}°</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={`tel:${activePin.phone}`}
                  className="py-2.5 px-3 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>اتصال هاتفي</span>
                </a>

                <button
                  onClick={() => onOpenChat(activePin.id, activePin.title)}
                  className="py-2.5 px-3 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>طلب وتحديد موعد</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 bg-white border border-slate-200 rounded-3xl text-center text-xs text-slate-500">
              اختر أي نقطة من الخريطة أو قائمة الإعلانات لعرض تفاصيل الحرفي أو المستودع.
            </div>
          )}

          {/* Trusted Family & Relatives Circle Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">دائرة الأقارب وجهات الثقة المعتمدة</h4>
                  <p className="text-[10px] text-slate-500">تأمين الزيارات والتدخلات المنزلية</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              {relatives.map(rel => (
                <div key={rel.id} className="p-2.5 bg-purple-50/50 border border-purple-100 rounded-xl space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">{rel.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 font-semibold font-mono">
                      {rel.relation}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 flex justify-between">
                    <span>{rel.commune}</span>
                    <span className="text-emerald-700 font-semibold">✓ {rel.status}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleShareWithRelatives}
              className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-purple-700 hover:bg-purple-800 text-white transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>مشاركة موقع التدخل المنزلي مع العائلة</span>
            </button>
          </div>

        </div>

      </div>

      {/* Filtered Listings Directory for Selected Wilaya */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              قائمة الخدمات والإعلانات المتوفرة
              {selectedWilaya === 'all' ? ' (على مستوى كل ولايات الوطن الـ 58)' : ` في ولاية ${currentWilayaObj?.nameAr} (${selectedWilaya})`}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              تم العثور على {currentListings.length} خدمة وورشة معتمدة قابلة للاتصال الفوري
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">الفلتر النشط:</span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800">
              {filterLayer === 'all' ? 'جميع التصنيفات' :
               filterLayer === 'craftsmen' ? 'حرفيون معتمدون (CAM)' :
               filterLayer === 'polivalente' ? 'عمال اليومية' :
               filterLayer === 'depots' ? 'مستودعات مواد' :
               filterLayer === 'real_estate' ? 'عقارات وورشات' :
               filterLayer === 'jobs' ? 'عروض توظيف' : 'أقارب'}
            </span>
          </div>
        </div>

        {/* Listings Feed Grid */}
        {currentListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentListings.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setActivePin({
                    id: item.id,
                    type: item.type === 'craftsmen' ? 'worker' :
                          item.type === 'depots' ? 'depot' :
                          item.type === 'polivalente' ? 'task' :
                          item.type === 'real_estate' ? 'real_estate' :
                          item.type === 'jobs' ? 'job' : 'relative',
                    title: item.title,
                    subtitle: item.subtitle,
                    phone: item.phone,
                    wilayaCode: item.wilayaCode,
                    communeName: item.communeName,
                    priceOrRate: item.price,
                    lat: item.lat,
                    lng: item.lng
                  });
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  activePin?.id === item.id
                    ? 'border-emerald-500 bg-emerald-50/30 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.type === 'craftsmen' ? 'bg-emerald-100 text-emerald-800' :
                      item.type === 'depots' ? 'bg-blue-100 text-blue-800' :
                      item.type === 'polivalente' ? 'bg-amber-100 text-amber-800' :
                      item.type === 'real_estate' ? 'bg-purple-100 text-purple-800' :
                      item.type === 'jobs' ? 'bg-indigo-100 text-indigo-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {item.typeLabelAr}
                    </span>

                    <span className="text-[11px] font-mono font-bold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      [{item.wilayaCode} - {WILAYAS_58.find(w => w.code === item.wilayaCode)?.nameAr}]
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-emerald-700">
                    {item.price}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <a
                      href={`tel:${item.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 transition-colors"
                      title="اتصال هاتفي"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenChat(item.id, item.title);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      طلب موعد
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Empty State With Wilaya Trade Hub Recommendation */
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <MapPin className="w-6 h-6" />
            </div>

            <div className="max-w-md mx-auto space-y-1">
              <h3 className="text-sm font-bold text-slate-900">
                مركز خدمات وتوريد ولاية {currentWilayaObj?.nameAr} ({selectedWilaya})
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                يتم حالياً ربط ورشات إضافية في هذا التصنيف. يمكنك طلب حرفي معتمد فورياً من خلال غرفة الصناعة التقليدية والحرف (CAM) التابعة لولاية {currentWilayaObj?.nameAr} أو نشر طلب ورشة بـ 1000 دج.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => onNavigateToTab?.('trades')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 transition-colors cursor-pointer"
              >
                تسجيل كحرفي معتمد في {currentWilayaObj?.nameAr}
              </button>

              <button
                onClick={() => onNavigateToTab?.('polivalente')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                نشر طلب مهمة فورية (1000+ دج)
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
