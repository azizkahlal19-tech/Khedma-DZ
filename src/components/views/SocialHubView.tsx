import React, { useState } from 'react';
import { Locale } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { FACEBOOK_LEADS, TIKTOK_ARTISANS, FacebookGroupLead, TikTokArtisan } from '../../data/socialFeeds';
import { WILAYAS_58 } from '../../data/wilayas';
import { 
  Share2, 
  Video, 
  Phone, 
  ExternalLink, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  Users, 
  Clock, 
  CheckCircle2, 
  Play, 
  Building,
  Wrench,
  Flame
} from 'lucide-react';

interface SocialHubViewProps {
  currentLocale: Locale;
  onOpenChatWithWorker: (workerId: string, workerName: string) => void;
}

export const SocialHubView: React.FC<SocialHubViewProps> = ({
  currentLocale,
  onOpenChatWithWorker
}) => {
  const t = TRANSLATIONS[currentLocale];
  const [activePlatform, setActivePlatform] = useState<'facebook' | 'tiktok'>('facebook');
  const [selectedWilaya, setSelectedWilaya] = useState('all');
  const [leadCategory, setLeadCategory] = useState<'all' | 'polivalente' | 'home_repair' | 'factory_labor'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFbLeads = FACEBOOK_LEADS.filter(lead => {
    const matchesWilaya = selectedWilaya === 'all' || lead.wilayaCode === selectedWilaya;
    const matchesCategory = leadCategory === 'all' || lead.leadType === leadCategory;
    const matchesSearch = 
      lead.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.communeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.groupName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesWilaya && matchesCategory && matchesSearch;
  });

  const filteredTiktokArtisans = TIKTOK_ARTISANS.filter(artisan => {
    const matchesWilaya = selectedWilaya === 'all' || artisan.wilayaCode === selectedWilaya;
    const matchesSearch = 
      artisan.artisanName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artisan.trade.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artisan.videoTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesWilaya && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-800">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-emerald-400">رادار الفرص والحرفيين من منصات التواصل</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-300">مجموعات فايسبوك المحلية + ترند تيك توك الجزائري</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            ملتقط عروض فايسبوك ورادار حرفيي تيك توك (Social Lead Radar DZ)
          </h1>

          <p className="text-xs sm:text-sm text-slate-300">
            يلتقط النظام تلقائياً طلبات الزبائن الباحثين عن عمال بوليفالون Polivalente وأشغال الصيانة في مجموعات الفايسبوك لولايتك، ويكتشف نخبة الحرفيين والمستقلين الأكثر مهارة على تيك توك لعرض أعمالهم بالفيديو والتواصل معهم فورياً.
          </p>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => setActivePlatform('facebook')}
              className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activePlatform === 'facebook'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Share2 className="w-4 h-4" />
              <span>مجموعات فايسبوك المحلية (طلبات صيانة وبوليفالون)</span>
            </button>

            <button
              onClick={() => setActivePlatform('tiktok')}
              className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activePlatform === 'tiktok'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>رادار تيك توك (حرفيون ومستقلون بالفيديو)</span>
            </button>
          </div>
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
              placeholder="ابحث بكلمات دالة: (بوليفالون، تفريغ، سباك، جبس، مصنع، تيكتوك)..."
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
              className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900 font-medium"
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

        {activePlatform === 'facebook' && (
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs pt-1 border-t border-slate-100">
            <button
              onClick={() => setLeadCategory('all')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                leadCategory === 'all' ? 'bg-slate-900 text-white font-bold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              كل منشورات المجموعات
            </button>
            <button
              onClick={() => setLeadCategory('polivalente')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                leadCategory === 'polivalente' ? 'bg-emerald-700 text-white font-bold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              عمال بوليفالون وتفريغ (Polivalente)
            </button>
            <button
              onClick={() => setLeadCategory('home_repair')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                leadCategory === 'home_repair' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              صيانة منزلية مستعجلة
            </button>
            <button
              onClick={() => setLeadCategory('factory_labor')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                leadCategory === 'factory_labor' ? 'bg-amber-600 text-white font-bold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              مناوبات المصانع والمناطق الصناعية
            </button>
          </div>
        )}
      </div>

      {/* PLATFORM 1: FACEBOOK GROUP LEADS STREAM */}
      {activePlatform === 'facebook' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>تم التقاط {filteredFbLeads.length} عرض وطلب من مجموعات فايسبوك النشطة</span>
            <span className="font-mono text-emerald-700 font-bold">تحديث آلي مباشر كل 5 دقائق</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFbLeads.map(lead => (
              <div
                key={lead.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Group Lockup */}
                  <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                        f
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">{lead.groupName}</h4>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1.5">
                          <span>{lead.communeName}</span>
                          <span>·</span>
                          <span className="font-mono">{lead.postedTimeAgo}</span>
                        </div>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      lead.leadType === 'polivalente' ? 'bg-emerald-100 text-emerald-800' :
                      lead.leadType === 'home_repair' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {lead.leadType === 'polivalente' ? 'بوليفالون' :
                       lead.leadType === 'home_repair' ? 'صيانة منزلية' : 'عمال مصنع'}
                    </span>
                  </div>

                  {/* Post Content */}
                  <p className="text-xs text-slate-800 leading-relaxed bg-slate-50/60 p-3 rounded-xl border border-slate-100">
                    "{lead.content}"
                  </p>

                  {/* Author & Budget Info */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <div className="flex items-center gap-2">
                      <img
                        src={lead.authorAvatar}
                        alt={lead.authorName}
                        className="w-7 h-7 rounded-full object-cover border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-[11px] font-semibold text-slate-700">{lead.authorName}</span>
                    </div>

                    {lead.budgetDzd && (
                      <span className="font-mono font-black text-emerald-700 text-sm">
                        {lead.budgetDzd.toLocaleString()} دج
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions: Call & Open FB Post */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  {lead.phoneContact ? (
                    <a
                      href={`tel:${lead.phoneContact}`}
                      className="py-2 px-3 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>اتصال فوري ({lead.phoneContact})</span>
                    </a>
                  ) : (
                    <button
                      onClick={() => alert('تم التواصل مع صاحب المنشور في مجموعة الفايسبوك')}
                      className="py-2 px-3 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>رد على الطلب</span>
                    </button>
                  )}

                  <a
                    href={lead.facebookPostUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2 px-3 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>فتح في فيسبوك</span>
                  </a>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* PLATFORM 2: TIKTOK ALGERIAN ARTISANS & FREELANCE RADAR */}
      {activePlatform === 'tiktok' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-rose-500" />
              <span>أشهر الحرفيين والمستقلين الجزائريين على ترند TikTok</span>
            </div>
            <span className="text-[11px] text-rose-600 font-bold">#حرفي_ديزاد #بلومبي_الجزائر</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTiktokArtisans.map(artisan => (
              <div
                key={artisan.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Video Thumbnail with Play Button */}
                  <div className="relative aspect-9/16 bg-slate-900 overflow-hidden group cursor-pointer">
                    <img
                      src={artisan.videoThumbnail}
                      alt={artisan.videoTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>

                    {/* Play Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center border border-white/60 group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                      </div>
                    </div>

                    {/* Top Handle & Likes */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between text-white text-[11px]">
                      <span className="font-mono font-bold">{artisan.handle}</span>
                      <span className="flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded-full font-mono">
                        <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                        {artisan.likesCount}
                      </span>
                    </div>

                    {/* Bottom Video Title & Hashtags */}
                    <div className="absolute bottom-3 inset-x-3 text-white space-y-1">
                      <p className="text-xs font-bold line-clamp-2 leading-snug">
                        {artisan.videoTitle}
                      </p>
                      <div className="text-[10px] text-emerald-300 font-mono">
                        {artisan.hashtags.join(' ')}
                      </div>
                    </div>
                  </div>

                  {/* Artisan Meta Card */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={artisan.avatarUrl}
                        alt={artisan.artisanName}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {artisan.artisanName}
                          </h4>
                          {artisan.verifiedDz && (
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500 block truncate">
                          {artisan.communeName} · {artisan.followersCount} متابع
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-600 line-clamp-1">
                      {artisan.trade}
                    </p>
                  </div>
                </div>

                {/* Direct Action Call / Chat */}
                <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${artisan.phone}`}
                    className="py-2 px-2.5 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 transition-colors flex items-center justify-center gap-1 shadow-xs"
                  >
                    <Phone className="w-3 h-3" />
                    <span>اتصال</span>
                  </a>

                  <button
                    onClick={() => onOpenChatWithWorker(artisan.id, artisan.artisanName)}
                    className="py-2 px-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>طلب عمل</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
