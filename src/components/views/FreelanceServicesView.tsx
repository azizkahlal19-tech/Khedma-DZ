import React, { useState } from 'react';
import { FreelanceService, Locale } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { 
  Laptop, 
  Palette, 
  Smartphone, 
  Languages, 
  FileText, 
  Video, 
  Mic, 
  Star, 
  GraduationCap, 
  Play, 
  Pause,
  ExternalLink,
  Search
} from 'lucide-react';

interface FreelanceServicesViewProps {
  services: FreelanceService[];
  currentLocale: Locale;
  onOpenChat: (freelancerId: string, freelancerName: string) => void;
}

export const FreelanceServicesView: React.FC<FreelanceServicesViewProps> = ({
  services,
  currentLocale,
  onOpenChat
}) => {
  const t = TRANSLATIONS[currentLocale];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState<string | null>(null);

  const categories = [
    { id: 'all', labelAr: 'كل الخدمات الرقمية', labelFr: 'Tous les Services' },
    { id: 'graphic_branding', labelAr: t.freelance.categories.graphic, labelFr: 'Design & Logo' },
    { id: 'ui_ux', labelAr: t.freelance.categories.uiux, labelFr: 'UI/UX Mobile' },
    { id: 'web_dev', labelAr: t.freelance.categories.web, labelFr: 'Développement Web' },
    { id: 'translation', labelAr: t.freelance.categories.translation, labelFr: 'Traduction' },
    { id: 'video_reels', labelAr: t.freelance.categories.video, labelFr: 'Montage Vidéo' },
    { id: 'voiceover', labelAr: t.freelance.categories.voiceover, labelFr: 'Voix-off Darija' }
  ];

  const filteredServices = services.filter(s => {
    const matchesCat = selectedCategory === 'all' || s.category === selectedCategory;
    const matchesSearch = 
      s.titleAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.titleFr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.freelancerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleAudio = (id: string) => {
    if (isPlayingAudio === id) {
      setIsPlayingAudio(null);
    } else {
      setIsPlayingAudio(id);
      // Simulate audio play
      setTimeout(() => setIsPlayingAudio(null), 6000);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-800">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-emerald-400">فضاء العمل الحر الجزائري (ريف DZ)</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-300">نخبة المهندسين والمصممين والمترجمين</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {t.freelance.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300">
            {t.freelance.subtitle}
          </p>
        </div>
      </div>

      {/* Filter and Categories Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن مصمم، مبرمج، معلق صوتي، مترجم..."
            className="w-full ps-10 pe-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
          />
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
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

      {/* Freelance Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map(service => (
          <div
            key={service.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              {/* Portfolio Showcase Preview if available */}
              {service.portfolioSamples.length > 0 ? (
                <div className="aspect-16/9 bg-slate-100 overflow-hidden">
                  <img
                    src={service.portfolioSamples[0]}
                    alt={service.titleFr}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : service.category === 'voiceover' ? (
                <div className="aspect-16/9 bg-gradient-to-r from-emerald-900 to-slate-900 flex flex-col items-center justify-center p-4 text-white">
                  <Mic className="w-10 h-10 text-emerald-400 mb-2" />
                  <div className="text-xs font-bold text-center">عينة صوتية بالدارجة الجزائرية</div>
                  <button
                    onClick={() => toggleAudio(service.id)}
                    className="mt-3 py-1.5 px-4 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-2 hover:bg-emerald-400 transition-colors cursor-pointer"
                  >
                    {isPlayingAudio === service.id ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        <span>جارٍ الاستماع...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-slate-950" />
                        <span>تشغيل العينة</span>
                      </>
                    )}
                  </button>
                </div>
              ) : null}

              <div className="p-5 space-y-3">
                {/* Profile Header */}
                <div className="flex items-center gap-3">
                  <img
                    src={service.avatarUrl}
                    alt={service.freelancerName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {service.freelancerName}
                      </h4>
                      {service.isVerifiedStudent && (
                        <span className="flex items-center gap-0.5 text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-sm border border-emerald-200 font-semibold" title="طالب جامعي موثق">
                          <GraduationCap className="w-3 h-3" />
                          <span>طالب مستقل</span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold font-mono">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{service.rating}</span>
                      <span className="text-slate-500 font-normal">({service.reviewsCount})</span>
                    </div>
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="text-xs font-bold text-slate-900 leading-snug">
                  {currentLocale === 'ar' ? service.titleAr : service.titleFr}
                </h3>

                {/* Starting Price & Delivery */}
                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">يبدأ من:</span>
                    <span className="font-extrabold font-mono text-emerald-700">
                      {service.startingPriceDzd.toLocaleString()} {t.common.dzd}
                    </span>
                  </div>
                  <div className="text-end">
                    <span className="text-[10px] text-slate-500 block">التسليم:</span>
                    <span className="font-semibold text-slate-800">
                      خلال {service.deliveryDays} أيام
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Action Button */}
            <div className="p-5 pt-0">
              <button
                type="button"
                onClick={() => onOpenChat(service.freelancerId, service.freelancerName)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>طلب الخدمة والمراسلة</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
