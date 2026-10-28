import React, { useState } from 'react';
import { Locale } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { WHOLESALE_MARKET_HUBS, WholesaleMarketHub } from '../../data/wholesaleHubs';
import { 
  Building2, 
  Truck, 
  Users, 
  MapPin, 
  Phone, 
  Layers, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Wrench, 
  Plus, 
  Search,
  Package,
  Award
} from 'lucide-react';

interface WholesaleHubsViewProps {
  currentLocale: Locale;
  onOpenBookingModal: (hubName: string, serviceName: string) => void;
}

export const WholesaleHubsView: React.FC<WholesaleHubsViewProps> = ({
  currentLocale,
  onOpenBookingModal
}) => {
  const t = TRANSLATIONS[currentLocale];
  const [selectedHubId, setSelectedHubId] = useState<string>('hub-el-eulma');
  const [activeSpecialtyFilter, setActiveSpecialtyFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const currentHub = WHOLESALE_MARKET_HUBS.find(h => h.id === selectedHubId) || WHOLESALE_MARKET_HUBS[0];

  const filteredServices = currentHub.workerServices.filter(service => {
    return (
      service.serviceNameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.serviceNameFr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-800">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-semibold">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>شبكة عمال ومستودعات أسواق الجملة الوطنية الكبرى</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            خدمات عمال الجملة: العلمة (سطيف)، الحميز (العاصمة)، والسانية وبودواو
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            منظومة متكاملة لربط التجار وأصحاب المستودعات بفرق عمال الجملة المحترفين: تفريغ الحاويات 40 قدم و20 قدم، سواق الرافعات الشوكية (الشاريو Caristes)، شحن الشاحنات المتجهة للـ 58 ولاية، وتفريغ شاحنات الإسمنت والحديد والسيراميك بأعلى درجات الانضباط والسرعة.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300 font-mono">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>+6,000 عامل جملة متمرس ومسجل</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-400" />
              <span>تفريغ أكثر من 340 حاوية يومياً</span>
            </div>
          </div>
        </div>
      </div>

      {/* Major Wholesale Hubs Selection Bar */}
      <div className="bg-white rounded-2xl p-2.5 border border-slate-200 shadow-xs flex items-center gap-2 overflow-x-auto text-xs">
        {WHOLESALE_MARKET_HUBS.map(hub => (
          <button
            key={hub.id}
            onClick={() => {
              setSelectedHubId(hub.id);
              setSearchQuery('');
            }}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all font-bold cursor-pointer flex items-center gap-2 ${
              selectedHubId === hub.id
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>{hub.nameAr}</span>
          </button>
        ))}
      </div>

      {/* Hub Detailed Information Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-bold text-slate-900">{currentHub.nameAr}</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold font-mono">
                ولاية {currentHub.wilayaCode}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              البلدية والمنطقة: {currentHub.communeName} · {currentHub.nameFr}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-start md:text-end text-xs">
              <span className="text-[10px] text-slate-500 block">عمال الجملة المسجلون بالقطب:</span>
              <span className="font-mono font-bold text-emerald-700 text-base">
                {currentHub.activeWholesaleWorkersCount.toLocaleString()} عامل
              </span>
            </div>
            <a
              href={`tel:${currentHub.contactUnionPhone}`}
              className="py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>مكتب التنسيق ({currentHub.contactUnionPhone})</span>
            </a>
          </div>
        </div>

        {/* Famous Streets & Hub Specialties */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>أشهر الشوارع والمجمعات التجارية في {currentHub.nameAr.split('-')[0]}:</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {currentHub.famousStreets.map((street, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 font-medium text-[11px]">
                  {street}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <Package className="w-4 h-4 text-emerald-600" />
              <span>التخصصات والسلع المتداولة بالقطب:</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {currentHub.specialties.map((spec, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-semibold text-[11px]">
                  {spec}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Services Catalogue for Wholesale Workers in this Hub */}
      <div className="space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              قائمة خدمات وأسعار عمال الجملة المعتمدة في {currentHub.nameAr.split('-')[0]}
            </h3>
            <p className="text-xs text-slate-600">
              أسعار قياسية عادلة متفق عليها مع التجار لحماية حقوق العمال وضمان السرعة والأمان
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن خدمة (حاوية، شاريو، شاحنة)..."
              className="w-full ps-9 pe-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:bg-white text-slate-900"
            />
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 text-slate-400">
              <Search className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredServices.map((service, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{service.serviceNameAr}</h4>
                    <span className="text-[11px] text-slate-500 font-medium">{service.serviceNameFr}</span>
                  </div>
                  <div className="text-end shrink-0">
                    <span className="text-base font-black font-mono text-emerald-700 block">
                      {service.averageRateDzd}
                    </span>
                    <span className="text-[10px] text-slate-400">{service.unit}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  {service.description}
                </p>

                {/* Equipment & Safety requirements */}
                <div className="flex flex-wrap items-center gap-1.5 text-[11px] pt-1">
                  <span className="text-slate-500 font-semibold">تجهيزات الأمان:</span>
                  {service.equipmentRequired.map((eq, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {eq}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onOpenBookingModal(currentHub.nameAr, service.serviceNameAr)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>طلب وحجز فوج عمال لهذه المهمة فورياً</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
