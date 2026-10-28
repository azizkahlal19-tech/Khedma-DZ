import React from 'react';
import { Locale, UserRole, UserProfile } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { 
  ShieldCheck, 
  Globe, 
  AlertTriangle, 
  ShoppingCart, 
  User, 
  ArrowLeftRight,
  ShieldAlert,
  Download,
  RefreshCw
} from 'lucide-react';

interface NavbarProps {
  currentLocale: Locale;
  setLocale: (locale: Locale) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: UserProfile | null;
  onOpenAuth: () => void;
  onOpenKyc: () => void;
  onOpenSubscription: () => void;
  onOpenSos: () => void;
  onOpenCart: () => void;
  cartCount: number;
  isWholesaleMode: boolean;
  setIsWholesaleMode: (val: boolean) => void;
  onSwitchRole: (role: UserRole) => void;
  onOpenInstallApp?: () => void;
  onOpenStorePublish?: () => void;
  onForceRefresh?: () => void;
  isLiteMode?: boolean;
  onToggleLiteMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLocale,
  setLocale,
  activeTab,
  setActiveTab,
  user,
  onOpenAuth,
  onOpenKyc,
  onOpenSubscription,
  onOpenSos,
  onOpenCart,
  cartCount,
  isWholesaleMode,
  setIsWholesaleMode,
  onSwitchRole,
  onOpenInstallApp,
  onOpenStorePublish,
  onForceRefresh,
  isLiteMode = false,
  onToggleLiteMode
}) => {
  const t = TRANSLATIONS[currentLocale];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner: Trial or Grace Period Notification */}
      {user && user.subscription.status === 'trial' && (
        <div className="bg-emerald-900 text-white text-xs py-1.5 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-emerald-200">{t.common.trialBadge}:</span>
            <span>{user.subscription.remainingDays} {t.common.daysRemaining}</span>
            <span className="hidden md:inline text-emerald-300/80">({t.admin.phoneBypassActive.split(':')[0]})</span>
          </div>
          <button 
            onClick={onOpenSubscription}
            className="text-xs font-semibold underline hover:text-emerald-200 transition-colors cursor-pointer"
          >
            {currentLocale === 'ar' ? 'ترقية / دفع 1$ (250 دج)' : currentLocale === 'fr' ? 'Prolonger / Payer 1$ (250 DZD)' : 'Extend / Pay $1 (250 DZD)'}
          </button>
        </div>
      )}

      {/* Main Top Bar Contract: Zone 1 (Brand) - Zone 2 (Nav Links) - Zone 3 (Primary Actions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 text-start group cursor-pointer focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-extrabold text-xl shadow-sm border border-emerald-800 group-hover:scale-105 transition-transform">
              DZ
            </div>
            <div>
              <div className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight leading-none">
                {currentLocale === 'ar' ? 'منصة عبد العزيز' : 'Plateforme Abdelaziz'}
              </div>
              <div className="text-[10px] text-emerald-800 font-bold tracking-wide">
                خدمة ديزاد · 58 WILAYAS
              </div>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (single line, horizontal scroll with clean typography) */}
        <nav className="hidden lg:flex items-center gap-3 text-xs font-semibold text-slate-600 overflow-x-auto max-w-[55%] py-2 scrollbar-none">
          <button
            onClick={() => setActiveTab('website')}
            className={`whitespace-nowrap transition-all cursor-pointer px-3 py-1.5 rounded-lg flex items-center gap-1.5 border ${
              activeTab === 'website' 
                ? 'bg-emerald-600 text-white font-extrabold shadow-sm border-emerald-700 animate-pulse' 
                : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            <span>🌐</span>
            <span>موقع التعريف & تحميل APK</span>
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`whitespace-nowrap transition-all cursor-pointer px-3 py-1.5 rounded-lg flex items-center gap-1.5 border ${
              activeTab === 'search' 
                ? 'bg-slate-900 text-white font-extrabold shadow-sm border-slate-900' 
                : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
            }`}
          >
            <span>🔎</span>
            <span>البحث الشامل DZ</span>
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`whitespace-nowrap transition-colors cursor-pointer px-2.5 py-1 rounded-lg flex items-center gap-1 ${
              activeTab === 'jobs' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'hover:text-blue-700 hover:bg-slate-100'
            }`}
          >
            <span>💼 التوظيف والعمل</span>
          </button>

          <button
            onClick={() => setActiveTab('realEstate')}
            className={`whitespace-nowrap transition-colors cursor-pointer px-2.5 py-1 rounded-lg flex items-center gap-1 ${
              activeTab === 'realEstate' ? 'bg-amber-600 text-white font-bold shadow-xs' : 'hover:text-amber-700 hover:bg-slate-100'
            }`}
          >
            <span>🏠 العقارات وكريلو</span>
          </button>
          <button
            onClick={() => setActiveTab('fiverr')}
            className={`whitespace-nowrap transition-colors cursor-pointer px-2.5 py-1 rounded-lg flex items-center gap-1 ${
              activeTab === 'fiverr' ? 'bg-emerald-700 text-white font-bold shadow-xs' : 'hover:text-emerald-700 hover:bg-slate-100'
            }`}
          >
            <span>⚡ فايفر الجزائر</span>
          </button>
          <button
            onClick={() => setActiveTab('formations')}
            className={`whitespace-nowrap transition-colors cursor-pointer px-2.5 py-1 rounded-lg flex items-center gap-1 ${
              activeTab === 'formations' ? 'bg-teal-700 text-white font-bold shadow-xs' : 'hover:text-teal-700 hover:bg-slate-100'
            }`}
          >
            <span>🎓 التكوين أونلاين</span>
          </button>
          <button
            onClick={() => setActiveTab('trades')}
            className={`whitespace-nowrap transition-colors cursor-pointer px-2.5 py-1 rounded-lg flex items-center gap-1 ${
              activeTab === 'trades' ? 'bg-slate-900 text-white font-bold shadow-xs' : 'hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>🔨 الحرفيون (CAM)</span>
          </button>
          <button
            onClick={() => setActiveTab('polivalente')}
            className={`whitespace-nowrap transition-colors cursor-pointer px-2.5 py-1 rounded-lg flex items-center gap-1 ${
              activeTab === 'polivalente' ? 'bg-emerald-700 text-white font-bold shadow-xs' : 'hover:text-emerald-700 hover:bg-slate-100'
            }`}
          >
            <span>👷 بوليفالون (1,000 دج)</span>
          </button>
          <button
            onClick={() => setActiveTab('wholesaleHubs')}
            className={`whitespace-nowrap transition-colors cursor-pointer px-2.5 py-1 rounded-lg flex items-center gap-1 ${
              activeTab === 'wholesaleHubs' ? 'bg-amber-700 text-white font-bold shadow-xs' : 'hover:text-amber-800 hover:bg-slate-100'
            }`}
          >
            <span>🏬 العلمة والحميز</span>
          </button>
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`whitespace-nowrap transition-colors cursor-pointer px-2.5 py-1 rounded-lg flex items-center gap-1 ${
              activeTab === 'marketplace' ? 'bg-slate-900 text-white font-bold shadow-xs' : 'hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>🛒 سوق واد كنيس</span>
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`whitespace-nowrap transition-colors cursor-pointer px-2.5 py-1 rounded-lg flex items-center gap-1 ${
              activeTab === 'map' ? 'bg-emerald-800 text-white font-bold shadow-xs' : 'hover:text-emerald-800 hover:bg-slate-100'
            }`}
          >
            <span>🗺️ الخريطة والبلديات</span>
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`whitespace-nowrap transition-colors cursor-pointer px-2.5 py-1 rounded-lg flex items-center gap-1 ${
              activeTab === 'social' ? 'bg-blue-700 text-white font-bold shadow-xs' : 'hover:text-blue-700 hover:bg-slate-100'
            }`}
          >
            <span>📱 فايسبوك وتيك توك</span>
          </button>
          <button
            onClick={() => setActiveTab('aiTools')}
            className={`whitespace-nowrap transition-colors cursor-pointer px-2.5 py-1 rounded-lg flex items-center gap-1 ${
              activeTab === 'aiTools' ? 'bg-purple-700 text-white font-bold shadow-xs' : 'hover:text-purple-700 hover:bg-slate-100'
            }`}
          >
            <span>🤖 الأدوات الذكية</span>
          </button>
          <button
            onClick={() => setActiveTab('advanced30')}
            className={`whitespace-nowrap transition-colors cursor-pointer px-2.5 py-1 rounded-lg flex items-center gap-1 ${
              activeTab === 'advanced30' ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'hover:text-amber-600 hover:bg-slate-100'
            }`}
          >
            <span>⭐ أفضل 30 ميزة</span>
          </button>
          {user && (user.role === 'admin' || user.phone === '0562788510') && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`whitespace-nowrap transition-colors cursor-pointer px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 ${
                activeTab === 'admin' ? 'bg-red-700 text-white shadow-xs' : 'text-red-600 hover:bg-red-50'
              }`}
            >
              <span>🔒 الإدارة (0562788510)</span>
            </button>
          )}
        </nav>

        {/* Zone 3: Interactive Affordances (Market Mode Switcher, Language, SOS, Cart, Profile) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Animated B2B Wholesale / B2C Retail Mode Switcher */}
          <button
            onClick={() => setIsWholesaleMode(!isWholesaleMode)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              isWholesaleMode
                ? 'bg-amber-100 text-amber-950 border-amber-300 shadow-xs'
                : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
            }`}
            title="Toggle between Wholesale bulk pricing (B2B) and Retail consumer pricing (B2C)"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-amber-800" />
            <span className="hidden sm:inline">
              {isWholesaleMode ? t.common.wholesale : t.common.retail}
            </span>
            <span className="sm:hidden font-mono font-bold">
              {isWholesaleMode ? 'B2B' : 'B2C'}
            </span>
          </button>

          {/* Language Selector */}
          <div className="relative flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200 text-xs font-medium">
            <button
              onClick={() => setLocale('ar')}
              className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
                currentLocale === 'ar' ? 'bg-white font-bold text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              عربي
            </button>
            <button
              onClick={() => setLocale('fr')}
              className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
                currentLocale === 'fr' ? 'bg-white font-bold text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              FR
            </button>
            <button
              onClick={() => setLocale('en')}
              className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
                currentLocale === 'en' ? 'bg-white font-bold text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
          </div>

          {/* Client Emergency SOS Panic Button */}
          <button
            onClick={onOpenSos}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-red-600 text-white hover:bg-red-700 transition-colors shadow-xs cursor-pointer"
            title="Civil Protection & Emergency Geolocation Broadcast"
          >
            <AlertTriangle className="w-3.5 h-3.5 animate-pulse" />
            <span className="hidden sm:inline">{t.common.emergencySos}</span>
            <span className="sm:hidden">SOS</span>
          </button>

          {/* Direct Download APK Link Button */}
          <a
            href="/khedma-dz-v2.6.4-algeria.apk"
            download="khedma-dz-v2.6.4-algeria.apk"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-black bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-all cursor-pointer border border-emerald-500"
            title="رابط مباشر لتحميل تطبيق أندرويد APK فوراً"
          >
            <Download className="w-3.5 h-3.5 animate-bounce text-white" />
            <span className="hidden sm:inline">تحميل APK مباشر</span>
            <span className="sm:hidden">APK</span>
          </a>

          {/* Lite Mode Toggle for Low-end phones (Infinix, Tecno, Older iPhones) */}
          {onToggleLiteMode && (
            <button
              onClick={onToggleLiteMode}
              className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                isLiteMode
                  ? 'bg-amber-100 text-amber-950 border-amber-300 shadow-xs'
                  : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
              }`}
              title="وضع السرعة القصوى وتوفير الرام لهواتف Infinix و iPhone القديمة"
            >
              <span>⚡</span>
              <span className="hidden xl:inline">{isLiteMode ? 'وضع فائق الخفة (مفعل)' : 'وضع Infinix الخفيف'}</span>
            </button>
          )}

          {/* Instant App Refresh / Reload Button */}
          {onForceRefresh && (
            <button
              onClick={onForceRefresh}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs transition-all cursor-pointer border border-amber-400"
              title="تحديث التطبيق ومسح الكاش فوراً (Refreche)"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">تحديث</span>
            </button>
          )}

          {/* Install on Phone PWA Button */}
          {onOpenInstallApp && (
            <button
              onClick={onOpenInstallApp}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-extrabold bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs transition-all cursor-pointer border border-emerald-600"
              title="تنزيل وتثبيت التطبيق على هاتفك المحمول (Android & iOS)"
            >
              <span className="text-xs">📲</span>
              <span className="hidden sm:inline">تثبيت التطبيق</span>
              <span className="sm:hidden">تثبيت</span>
            </button>
          )}

          {/* Google Play & App Store Hub Button */}
          {onOpenStorePublish && (
            <button
              onClick={onOpenStorePublish}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-extrabold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 shadow-xs transition-all cursor-pointer border border-amber-400"
              title="دليل وحزم النشر في Google Play و Apple App Store"
            >
              <span className="text-xs">🚀</span>
              <span>Google Play & App Store</span>
            </button>
          )}

          {/* Unified Multi-Vendor Shopping Cart */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors border border-slate-200 cursor-pointer"
            aria-label="Shopping Bag"
          >
            <ShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-emerald-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Account / Role Switcher / Login */}
          {user ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={onOpenKyc}
                className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
                title="Identity KYC Verification Status"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                {user.kyc.isVerified ? (
                  <span>{t.common.verified}</span>
                ) : (
                  <span className="text-amber-800 font-semibold">توثيق الهوية KYC</span>
                )}
              </button>

              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-medium transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden md:inline truncate max-w-[100px]">{user.name.split(' ')[0]}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-slate-800 text-slate-300 font-mono uppercase">
                  {user.role}
                </span>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>{t.common.login}</span>
            </button>
          )}

        </div>
      </div>

      {/* Mobile Secondary Navigation Row (Horizontally Scrollable) */}
      <div className="lg:hidden border-t border-slate-100 bg-slate-50/90 px-3 py-2 flex items-center text-xs font-semibold overflow-x-auto gap-1.5 scrollbar-none">
        <button
          onClick={() => setActiveTab('website')}
          className={`whitespace-nowrap px-3 py-1 rounded-lg transition-all shrink-0 border ${
            activeTab === 'website' 
              ? 'bg-emerald-600 text-white font-extrabold shadow-xs border-emerald-700' 
              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
          }`}
        >
          🌐 موقع التعريف & APK
        </button>
        <button
          onClick={() => setActiveTab('search')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-lg transition-all shrink-0 border ${
            activeTab === 'search' 
              ? 'bg-slate-900 text-white font-extrabold shadow-xs border-slate-900' 
              : 'bg-white text-slate-800 border-slate-300'
          }`}
        >
          🔎 البحث الشامل DZ
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-lg transition-colors shrink-0 ${
            activeTab === 'jobs' ? 'bg-blue-600 text-white font-bold' : 'text-slate-700 bg-white border border-slate-200'
          }`}
        >
          💼 التوظيف والعمل
        </button>

        <button
          onClick={() => setActiveTab('realEstate')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-lg transition-colors shrink-0 ${
            activeTab === 'realEstate' ? 'bg-amber-600 text-white font-bold' : 'text-slate-700 bg-white border border-slate-200'
          }`}
        >
          🏠 العقارات وكريلو
        </button>
        <button
          onClick={() => setActiveTab('fiverr')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-lg transition-colors shrink-0 ${
            activeTab === 'fiverr' ? 'bg-emerald-700 text-white font-bold' : 'text-slate-700 bg-white border border-slate-200'
          }`}
        >
          ⚡ فايفر الجزائر
        </button>
        <button
          onClick={() => setActiveTab('formations')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-lg transition-colors shrink-0 ${
            activeTab === 'formations' ? 'bg-teal-700 text-white font-bold' : 'text-slate-700 bg-white border border-slate-200'
          }`}
        >
          🎓 التكوين أونلاين
        </button>
        <button
          onClick={() => setActiveTab('trades')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-lg transition-colors shrink-0 ${
            activeTab === 'trades' ? 'bg-slate-900 text-white font-bold' : 'text-slate-700 bg-white border border-slate-200'
          }`}
        >
          🔨 الحرفيون (CAM)
        </button>
        <button
          onClick={() => setActiveTab('polivalente')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-lg transition-colors shrink-0 ${
            activeTab === 'polivalente' ? 'bg-emerald-700 text-white font-bold' : 'text-slate-700 bg-white border border-slate-200'
          }`}
        >
          👷 بوليفالون
        </button>
        <button
          onClick={() => setActiveTab('wholesaleHubs')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-lg transition-colors shrink-0 ${
            activeTab === 'wholesaleHubs' ? 'bg-amber-700 text-white font-bold' : 'text-slate-700 bg-white border border-slate-200'
          }`}
        >
          🏬 العلمة والحميز
        </button>
        <button
          onClick={() => setActiveTab('marketplace')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-lg transition-colors shrink-0 ${
            activeTab === 'marketplace' ? 'bg-slate-900 text-white font-bold' : 'text-slate-700 bg-white border border-slate-200'
          }`}
        >
          🛒 سوق المواد
        </button>
        <button
          onClick={() => setActiveTab('map')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-lg transition-colors shrink-0 ${
            activeTab === 'map' ? 'bg-emerald-800 text-white font-bold' : 'text-slate-700 bg-white border border-slate-200'
          }`}
        >
          🗺️ الخريطة
        </button>
        <button
          onClick={() => setActiveTab('social')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-lg transition-colors shrink-0 ${
            activeTab === 'social' ? 'bg-blue-700 text-white font-bold' : 'text-slate-700 bg-white border border-slate-200'
          }`}
        >
          📱 فايسبوك وتيك توك
        </button>
        <button
          onClick={() => setActiveTab('aiTools')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-lg transition-colors shrink-0 ${
            activeTab === 'aiTools' ? 'bg-purple-700 text-white font-bold' : 'text-slate-700 bg-white border border-slate-200'
          }`}
        >
          🤖 الأدوات الذكية
        </button>
        <button
          onClick={() => setActiveTab('advanced30')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-lg transition-colors shrink-0 ${
            activeTab === 'advanced30' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-700 bg-white border border-slate-200'
          }`}
        >
          ⭐ أفضل 30 ميزة
        </button>
        {user && (user.role === 'admin' || user.phone === '0562788510') && (
          <button
            onClick={() => setActiveTab('admin')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-lg text-red-700 font-bold transition-colors shrink-0 ${
              activeTab === 'admin' ? 'bg-red-700 text-white' : 'bg-red-50 border border-red-200'
            }`}
          >
            🔒 الإدارة
          </button>
        )}
      </div>
    </header>
  );
};
