import React, { useState, useEffect } from 'react';
import { 
  Locale, 
  UserRole, 
  UserProfile, 
  ProductItem, 
  ServiceListing, 
  PolivalenteTask, 
  FreelanceService,
  FiverrAlgerianSeller,
  RecruitmentProfile,
  CompanyJobOffer,
  RealEstateListing,
  OnlineCourse
} from './types';
import { TRANSLATIONS } from './i18n/translations';
import { INITIAL_PRODUCTS, INITIAL_CRAFTSMEN, INITIAL_POLIVALENTE_TASKS, INITIAL_FREELANCE_SERVICES } from './data/mockData';
import { INITIAL_FIVERR_ALGERIANS } from './data/fiverrAlgerians';
import { INITIAL_RECRUITMENT_PROFILES, INITIAL_COMPANY_JOB_OFFERS } from './data/recruitmentTalents';
import { INITIAL_REAL_ESTATE_LISTINGS } from './data/realEstateData';
import { INITIAL_ONLINE_COURSES } from './data/onlineCourses';

import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { KYCModal } from './components/KYCModal';
import { SubscriptionModal } from './components/SubscriptionModal';
import { EmergencySOSModal } from './components/EmergencySOSModal';
import { CartDrawer } from './components/CartDrawer';
import { RFQModal } from './components/RFQModal';
import { ParcelTrackerModal } from './components/ParcelTrackerModal';
import { InstallAppModal } from './components/InstallAppModal';
import { AppStorePublishModal } from './components/AppStorePublishModal';

import { HomeView } from './components/views/HomeView';
import { MarketplaceView } from './components/views/MarketplaceView';
import { TradesCraftsmenView } from './components/views/TradesCraftsmenView';
import { PolivalenteFeedView } from './components/views/PolivalenteFeedView';
import { FreelanceServicesView } from './components/views/FreelanceServicesView';
import { AIToolsSuiteView } from './components/views/AIToolsSuiteView';
import { ChatAndDisputeView } from './components/views/ChatAndDisputeView';
import { AdminMasterControlCenter } from './components/views/AdminMasterControlCenter';
import { FiverrTalentsView } from './components/views/FiverrTalentsView';
import { RecruitmentView } from './components/views/RecruitmentView';
import { RealEstateView } from './components/views/RealEstateView';
import { OnlineCoursesView } from './components/views/OnlineCoursesView';
import { WholesaleHubsView } from './components/views/WholesaleHubsView';
import { InteractiveMapView } from './components/views/InteractiveMapView';
import { SocialHubView } from './components/views/SocialHubView';
import { AdvancedFeaturesHub } from './components/views/AdvancedFeaturesHub';
import { WebsiteLandingView } from './components/views/WebsiteLandingView';
import { ComprehensiveAlgerianSearch } from './components/ComprehensiveAlgerianSearch';

export function App() {
  const [currentLocale, setCurrentLocale] = useState<Locale>('ar');
  const [activeTab, setActiveTab] = useState<string>('website');

  const [isWholesaleMode, setIsWholesaleMode] = useState<boolean>(false);

  // User State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Entities Data
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [craftsmen, setCraftsmen] = useState<ServiceListing[]>(INITIAL_CRAFTSMEN);
  const [polivalenteTasks, setPolivalenteTasks] = useState<PolivalenteTask[]>(INITIAL_POLIVALENTE_TASKS);
  const [freelanceServices, setFreelanceServices] = useState<FreelanceService[]>(INITIAL_FREELANCE_SERVICES);
  const [fiverrSellers, setFiverrSellers] = useState<FiverrAlgerianSeller[]>(INITIAL_FIVERR_ALGERIANS);
  const [recruitmentCandidates, setRecruitmentCandidates] = useState<RecruitmentProfile[]>(INITIAL_RECRUITMENT_PROFILES);
  const [jobOffers, setJobOffers] = useState<CompanyJobOffer[]>(INITIAL_COMPANY_JOB_OFFERS);
  const [realEstateListings, setRealEstateListings] = useState<RealEstateListing[]>(INITIAL_REAL_ESTATE_LISTINGS);
  const [onlineCourses, setOnlineCourses] = useState<OnlineCourse[]>(INITIAL_ONLINE_COURSES);

  // Cart State
  const [cart, setCart] = useState<{ product: ProductItem; quantity: number }[]>([]);

  // Modals Visibility
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isKycModalOpen, setIsKycModalOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isSosModalOpen, setIsSosModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isRfqOpen, setIsRfqOpen] = useState(false);
  const [isParcelTrackerOpen, setIsParcelTrackerOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(true);
  const [isStorePublishOpen, setIsStorePublishOpen] = useState(false);

  // Chat Target Worker State
  const [chatTarget, setChatTarget] = useState<{ id: string; name: string } | null>(null);

  // Dynamic Language & Direction Mirroring Engine
  useEffect(() => {
    document.documentElement.lang = currentLocale;
    document.documentElement.dir = currentLocale === 'ar' ? 'rtl' : 'ltr';
  }, [currentLocale]);

  // Initial Free Trial Simulation Profile for first-time visitors
  useEffect(() => {
    // Provide a default active user to let user explore right away
    const defaultTrialUser: UserProfile = {
      id: 'usr-trial-001',
      phone: '0550123456',
      carrier: 'Ooredoo',
      hardwareFingerprint: 'ALG-DEV-77192801-IMEI',
      name: 'عبد النور بن سالم (Abdennour)',
      role: 'client',
      availableRoles: ['client', 'worker', 'merchant'],
      wilayaCode: '16',
      rating: 5.0,
      reviewCount: 3,
      subscription: {
        status: 'trial',
        trialStartDate: new Date().toISOString(),
        trialExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        remainingDays: 30,
        amountDzd: 0,
        amountUsd: 0
      },
      kyc: {
        isVerified: true,
        documentType: 'id_card',
        documentNumber: '109827364501928374',
        fullName: 'عبد النور بن سالم',
        livenessConfidenceScore: 94.8
      },
      isSuspended: false,
      walletBalanceDzd: 18500
    };
    setCurrentUser(defaultTrialUser);
  }, []);

  // Super Admin Direct Login Hook
  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    // Automatic operational dashboard redirection if Super Admin 0562788510
    if (user.phone === '0562788510' || user.role === 'admin') {
      setActiveTab('admin');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleSwitchRole = (role: UserRole) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        role
      });
    }
  };

  // Cart Operations
  const handleAddToCart = (product: ProductItem, qty: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
  };

  const handleUpdateQty = (productId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { product: ProductItem; quantity: number }[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Polivalente Task Operations
  const handlePostNewTask = (taskData: Partial<PolivalenteTask>) => {
    const newTask: PolivalenteTask = {
      id: 'poli-' + Date.now(),
      clientId: currentUser?.id || 'cli-guest',
      clientName: currentUser?.name || 'مستخدم المنصة',
      clientPhone: currentUser?.phone || '0555000000',
      wilayaCode: taskData.wilayaCode || '16',
      address: taskData.address || 'الجزائر',
      titleAr: taskData.titleAr || '',
      titleFr: taskData.titleFr || '',
      description: taskData.description || '',
      budgetDzd: Math.max(1000, taskData.budgetDzd || 1000), // Enforced floor
      category: taskData.category || 'general_labor',
      requiredEquipment: taskData.requiredEquipment || [],
      crewSlotsTotal: taskData.crewSlotsTotal || 1,
      crewSlotsFilled: 0,
      postedAt: 'الآن',
      distanceKm: 1.8,
      urgent: true,
      status: 'open',
      bidsCount: 0,
      counterOffers: []
    };
    setPolivalenteTasks([newTask, ...polivalenteTasks]);
  };

  const handleSubmitCounterOffer = (taskId: string, price: number, notes: string) => {
    setPolivalenteTasks(prev =>
      prev.map(task => {
        if (task.id === taskId) {
          const newOffer = {
            workerId: currentUser?.id || 'w-me',
            workerName: currentUser?.name || 'حرفي متطوع',
            offeredPriceDzd: Math.max(1000, price),
            notes,
            timestamp: 'الآن',
            status: 'pending' as const
          };
          return {
            ...task,
            bidsCount: task.bidsCount + 1,
            counterOffers: [newOffer, ...task.counterOffers]
          };
        }
        return task;
      })
    );
  };

  const handleAcceptTask = (taskId: string) => {
    const target = polivalenteTasks.find(t => t.id === taskId);
    if (target) {
      window.location.href = `tel:${target.clientPhone}`;
    }
  };

  const handleOpenChatWithWorker = (workerId: string, workerName: string) => {
    setChatTarget({ id: workerId, name: workerName });
    setActiveTab('chat');
  };

  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Lite Mode State for Low-RAM phones (Infinix, Tecno, Older iPhones)
  const [isLiteMode, setIsLiteMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('dz_litemode') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (isLiteMode) {
        document.documentElement.classList.add('lite-mode');
      } else {
        document.documentElement.classList.remove('lite-mode');
      }
      localStorage.setItem('dz_litemode', isLiteMode ? 'true' : 'false');
    } catch {
      // ignore
    }
  }, [isLiteMode]);

  const toggleLiteMode = () => {
    setIsLiteMode(prev => !prev);
  };

  // Immediate app refresh / cache purge
  const handleForceRefresh = async () => {
    try {
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
          await registration.update();
        }
      }
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map(k => caches.delete(k)));
      }
    } catch {
      // ignore
    }
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Top Bar Navigation */}
      <Navbar
        currentLocale={currentLocale}
        setLocale={setCurrentLocale}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenKyc={() => setIsKycModalOpen(true)}
        onOpenSubscription={() => setIsSubscriptionModalOpen(true)}
        onOpenSos={() => setIsSosModalOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartTotalItems}
        isWholesaleMode={isWholesaleMode}
        setIsWholesaleMode={setIsWholesaleMode}
        onSwitchRole={handleSwitchRole}
        onOpenInstallApp={() => setIsInstallModalOpen(true)}
        onOpenStorePublish={() => setIsStorePublishOpen(true)}
        onForceRefresh={handleForceRefresh}
        isLiteMode={isLiteMode}
        onToggleLiteMode={toggleLiteMode}
      />

      {/* Quick Direct Download & Refresh Bar */}
      <div className="bg-emerald-950 text-white text-xs py-1.5 px-4 border-b border-emerald-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-extrabold text-emerald-300">منصة عبد العزيز (Khedma DZ)</span>
            <span className="hidden sm:inline text-slate-300">· يدعم هواتف Infinix و iPhone الضعيفة</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Direct APK Link */}
            <a
              href="/khedma-dz-v2.6.4-algeria.apk"
              download="khedma-dz-v2.6.4-algeria.apk"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-2.5 py-0.5 rounded-md font-black text-[11px] flex items-center gap-1 transition-all cursor-pointer shadow-xs"
              title="رابط مباشر لتحميل تطبيق أندرويد APK"
            >
              <span>📥 رابط تحميل مباشر (APK)</span>
            </a>

            {/* Quick Infinix Lite Mode Toggle */}
            <button
              onClick={toggleLiteMode}
              className={`px-2 py-0.5 rounded-md font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer border ${
                isLiteMode
                  ? 'bg-amber-400 text-slate-950 border-amber-300 font-black'
                  : 'bg-emerald-900 hover:bg-emerald-800 text-emerald-200 border-emerald-700'
              }`}
              title="تفعيل وضع السرعة الفائقة وتوفير الرام لهواتف Infinix و Tecno و iPhone القديمة"
            >
              <span>⚡</span>
              <span>{isLiteMode ? 'وضع Infinix الخفيف: مفعل ✓' : 'وضع السرعة والخفة'}</span>
            </button>

            {/* Quick Refreche button */}
            <button
              onClick={handleForceRefresh}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-2 py-0.5 rounded-md font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
              title="تحديث التطبيق الفوري ومسح الكاش"
            >
              <span>🔄 تحديث (Refreche)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {activeTab === 'website' && (
          <WebsiteLandingView
            currentLocale={currentLocale}
            onNavigateToApp={(tab) => setActiveTab(tab || 'home')}
            onOpenStorePublish={() => setIsStorePublishOpen(true)}
          />
        )}

        {activeTab === 'search' && (
          <ComprehensiveAlgerianSearch
            currentLocale={currentLocale}
            onNavigateToAppTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'home' && (
          <HomeView

            currentLocale={currentLocale}
            setActiveTab={setActiveTab}
            products={products}
            craftsmen={craftsmen}
            polivalenteTasks={polivalenteTasks}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        )}

        {activeTab === 'marketplace' && (
          <MarketplaceView
            products={products}
            currentLocale={currentLocale}
            isWholesaleMode={isWholesaleMode}
            setIsWholesaleMode={setIsWholesaleMode}
            onAddToCart={handleAddToCart}
            onOpenRfq={() => setIsRfqOpen(true)}
            onOpenParcelTracker={() => setIsParcelTrackerOpen(true)}
          />
        )}

        {activeTab === 'jobs' && (
          <RecruitmentView
            candidates={recruitmentCandidates}
            jobOffers={jobOffers}
            currentLocale={currentLocale}
            onOpenChatWithCandidate={(id, name) => handleOpenChatWithWorker(id, name)}
            onAddNewCandidate={(newCand) => setRecruitmentCandidates(prev => [newCand, ...prev])}
            onAddNewJobOffer={(newOffer) => setJobOffers(prev => [newOffer, ...prev])}
          />
        )}

        {activeTab === 'realEstate' && (
          <RealEstateView
            listings={realEstateListings}
            currentLocale={currentLocale}
            onOpenChatWithBroker={(id, name) => handleOpenChatWithWorker(id, name)}
            onAddNewListing={(newListing) => setRealEstateListings(prev => [newListing, ...prev])}
          />
        )}

        {activeTab === 'fiverr' && (
          <FiverrTalentsView
            sellers={fiverrSellers}
            currentLocale={currentLocale}
            onOpenChatWithSeller={(id, name) => handleOpenChatWithWorker(id, name)}
            onAddNewSeller={(newSeller) => setFiverrSellers(prev => [newSeller, ...prev])}
          />
        )}

        {activeTab === 'formations' && (
          <OnlineCoursesView
            courses={onlineCourses}
            currentLocale={currentLocale}
            onAddNewCourse={(newCourse) => setOnlineCourses(prev => [newCourse, ...prev])}
          />
        )}

        {activeTab === 'wholesaleHubs' && (
          <WholesaleHubsView
            currentLocale={currentLocale}
            onOpenBookingModal={(hubName: string, serviceName: string) => {
              alert(`تم تسجيل طلب حجز (${serviceName}) بسوق الجملة (${hubName}) بنجاح! سيتم توجيه الفريق لمستودعك.`);
            }}
          />
        )}

        {activeTab === 'trades' && (
          <TradesCraftsmenView
            craftsmen={craftsmen}
            currentLocale={currentLocale}
            onOpenChatWithWorker={handleOpenChatWithWorker}
            onAddNewArtisan={(newArtisan) => setCraftsmen(prev => [newArtisan, ...prev])}
          />
        )}

        {activeTab === 'polivalente' && (
          <PolivalenteFeedView
            tasks={polivalenteTasks}
            currentLocale={currentLocale}
            currentUser={currentUser}
            onPostNewTask={handlePostNewTask}
            onSubmitCounterOffer={handleSubmitCounterOffer}
            onAcceptTask={handleAcceptTask}
          />
        )}

        {activeTab === 'map' && (
          <InteractiveMapView
            currentLocale={currentLocale}
            craftsmen={craftsmen}
            products={products}
            tasks={polivalenteTasks}
            jobOffers={jobOffers}
            realEstateListings={realEstateListings}
            onOpenChat={(workerId: string, workerName: string) => handleOpenChatWithWorker(workerId, workerName)}
            onNavigateToTab={setActiveTab}
          />
        )}

        {activeTab === 'social' && (
          <SocialHubView
            currentLocale={currentLocale}
            onOpenChatWithWorker={(workerId: string, workerName: string) => handleOpenChatWithWorker(workerId, workerName)}
          />
        )}

        {activeTab === 'advanced30' && (
          <AdvancedFeaturesHub
            currentLocale={currentLocale}
            currentUser={currentUser}
            onNavigateToTab={setActiveTab}
          />
        )}

        {activeTab === 'freelance' && (
          <FreelanceServicesView
            services={freelanceServices}
            currentLocale={currentLocale}
            onOpenChat={(id, name) => handleOpenChatWithWorker(id, name)}
          />
        )}

        {activeTab === 'aiTools' && (
          <AIToolsSuiteView
            currentLocale={currentLocale}
          />
        )}

        {activeTab === 'chat' && (
          <ChatAndDisputeView
            currentLocale={currentLocale}
            currentUser={currentUser}
            targetWorkerId={chatTarget?.id}
            targetWorkerName={chatTarget?.name}
          />
        )}

        {activeTab === 'admin' && (
          <AdminMasterControlCenter
            currentLocale={currentLocale}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 px-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald-700 text-white font-bold flex items-center justify-center text-xs">
              DZ
            </div>
            <span className="font-bold text-slate-900">منصة عبد العزيز - Khedma DZ</span>
            <span>·</span>
            <span>منصة عبد العزيز الشاملة عبر 58 ولاية</span>
          </div>

          <div className="flex items-center gap-6 font-medium text-slate-600 flex-wrap">
            <button onClick={() => setActiveTab('website')} className="text-emerald-700 hover:text-emerald-900 font-bold cursor-pointer">
              🌐 موقع التعريف & تحميل APK
            </button>
            <button onClick={() => setActiveTab('search')} className="text-slate-900 hover:text-emerald-700 font-bold cursor-pointer">
              🔎 البحث الشامل DZ
            </button>
            <button onClick={() => setActiveTab('marketplace')} className="hover:text-slate-900 cursor-pointer">
              سوق المواد
            </button>
            <button onClick={() => setActiveTab('trades')} className="hover:text-slate-900 cursor-pointer">
              الحرفيون
            </button>

            <button onClick={() => setActiveTab('polivalente')} className="hover:text-slate-900 cursor-pointer">
              بوليفالون (1,000 دج)
            </button>
            <button onClick={() => setActiveTab('aiTools')} className="hover:text-slate-900 cursor-pointer">
              الأدوات الذكية
            </button>
            <button 
              onClick={() => setIsStorePublishOpen(true)}
              className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>🚀 النشر في Google Play & App Store</span>
            </button>
            <a 
              href="/privacy-policy.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-slate-800 underline cursor-pointer"
            >
              سياسة الخصوصية
            </a>
            <button 
              onClick={() => {
                setIsAuthModalOpen(true);
              }} 
              className="text-red-600 hover:text-red-700 font-semibold cursor-pointer"
            >
              دخول الإدارة (0562788510)
            </button>
          </div>

          <div className="text-[11px] text-slate-400 font-mono">
            Algeria Sovereign Platform © 2026
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentLocale={currentLocale}
        currentUser={currentUser}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
      />

      <KYCModal
        isOpen={isKycModalOpen}
        onClose={() => setIsKycModalOpen(false)}
        currentLocale={currentLocale}
        currentUser={currentUser}
        onKycCompleted={(updated) => setCurrentUser(updated)}
      />

      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        currentLocale={currentLocale}
        currentUser={currentUser}
        onPaymentSubmitted={(ref, type) => {
          if (currentUser) {
            setCurrentUser({
              ...currentUser,
              subscription: {
                ...currentUser.subscription,
                status: 'active',
                remainingDays: 365,
                paymentMethod: type
              }
            });
          }
        }}
      />

      <EmergencySOSModal
        isOpen={isSosModalOpen}
        onClose={() => setIsSosModalOpen(false)}
        currentLocale={currentLocale}
        currentUser={currentUser}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        currentLocale={currentLocale}
        isWholesaleMode={isWholesaleMode}
        onCheckoutSuccess={() => {
          alert('تم تسجيل طلبك بنجاح! سيتم التواصل معك من طرف الموردين لتأكيد موعد التسليم.');
        }}
      />

      <RFQModal
        isOpen={isRfqOpen}
        onClose={() => setIsRfqOpen(false)}
        currentLocale={currentLocale}
      />

      <ParcelTrackerModal
        isOpen={isParcelTrackerOpen}
        onClose={() => setIsParcelTrackerOpen(false)}
        currentLocale={currentLocale}
      />

      <InstallAppModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        currentLocale={currentLocale}
        onOpenStorePublish={() => setIsStorePublishOpen(true)}
        isLiteMode={isLiteMode}
        onToggleLiteMode={toggleLiteMode}
      />

      <AppStorePublishModal
        isOpen={isStorePublishOpen}
        onClose={() => setIsStorePublishOpen(false)}
        currentLocale={currentLocale}
      />

    </div>
  );
}

export default App;
