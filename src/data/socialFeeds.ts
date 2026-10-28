export interface FacebookGroupLead {
  id: string;
  groupName: string;
  wilayaCode: string;
  communeName: string;
  authorName: string;
  authorAvatar: string;
  postedTimeAgo: string;
  content: string;
  leadType: 'polivalente' | 'home_repair' | 'factory_labor' | 'urgent_night';
  budgetDzd?: number;
  phoneContact?: string;
  facebookPostUrl: string;
  urgency: 'high' | 'medium' | 'normal';
}

export interface TikTokArtisan {
  id: string;
  handle: string;
  artisanName: string;
  trade: string;
  wilayaCode: string;
  communeName: string;
  followersCount: string;
  likesCount: string;
  videoTitle: string;
  videoThumbnail: string;
  avatarUrl: string;
  phone: string;
  verifiedDz: boolean;
  hashtags: string[];
}

export const FACEBOOK_LEADS: FacebookGroupLead[] = [
  {
    id: 'fb-lead-1',
    groupName: 'حرفيي وعمال البناء - الجزائر العاصمة والضواحي (145K membre)',
    wilayaCode: '16',
    communeName: 'الرويبة (Rouïba)',
    authorName: 'كمال مقاول (Kamel Entreprise)',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    postedTimeAgo: 'منذ 18 دقيقة',
    content: 'السلام عليكم خاوتي، خصني 3 عمال بوليفالون Polivalente أشداء غدوة صباح مع 8h لتفريغ نصف شاحنة سيمي سيراميك وفايونس في مستودع المنطقة الصناعية رويبة. الخلاص 3500 دج للواحد كاش مع وجبة الغداء.',
    leadType: 'polivalente',
    budgetDzd: 3500,
    phoneContact: '0554112233',
    facebookPostUrl: 'https://facebook.com/groups/artisans.alger/permalink/9812401',
    urgency: 'high'
  },
  {
    id: 'fb-lead-2',
    groupName: 'سوق الخدمات وطلب الحرفيين - وهران الباهية (88K membre)',
    wilayaCode: '31',
    communeName: 'بئر الجير (Bir El Djir)',
    authorName: 'سارة ب. (Sara Belkacem)',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    postedTimeAgo: 'منذ 34 دقيقة',
    content: 'Urgent svp! Fuite d’eau sous l’évier de cuisine et chauffe-bain à gaz Junkers qui s’éteint tout seul. Cherche plombier sérieux et disponible aujourd’hui à Bir El Djir. Contactez-moi en message ou tél.',
    leadType: 'home_repair',
    budgetDzd: 3000,
    phoneContact: '0771889900',
    facebookPostUrl: 'https://facebook.com/groups/oran.services/permalink/4412093',
    urgency: 'high'
  },
  {
    id: 'fb-lead-3',
    groupName: 'أشغال وبناء وتشطيب - سطيف والعلمة (110K membre)',
    wilayaCode: '19',
    communeName: 'العلمة (El Eulma)',
    authorName: 'حاج مسعود (Hadj Messaoud)',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    postedTimeAgo: 'منذ ساعة',
    content: 'خاصني فني ديكور جبس BA13 مع السلعة أو خدمة يد لصالون 6م × 4م مع ليد كيسون مخفي. العمل يبدأ السبت إن شاء الله. لي عندو صور خدمتو يبعثلي في الخاص مع السعر للمتر المربع.',
    leadType: 'home_repair',
    budgetDzd: 35000,
    phoneContact: '0663445566',
    facebookPostUrl: 'https://facebook.com/groups/setif.chantiers/permalink/7710291',
    urgency: 'medium'
  },
  {
    id: 'fb-lead-4',
    groupName: 'فرص عمل وورشات يومية - البليدة وميتيدجة (65K membre)',
    wilayaCode: '09',
    communeName: 'بوفاريك (Boufarik)',
    authorName: 'مصنع الأغذية الزراعية ميتيدجة',
    authorAvatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=120&auto=format&fit=crop&q=80',
    postedTimeAgo: 'منذ ساعتين',
    content: 'مطلوب 4 عمال لمناوبة مسائية (Shift soir 16h-00h) في مصنع التغليف ببوفاريك. التوصيل متوفر في حدود البليدة وبوفاريك. الراتب اليومي 2800 دج.',
    leadType: 'factory_labor',
    budgetDzd: 2800,
    phoneContact: '0560991122',
    facebookPostUrl: 'https://facebook.com/groups/blida.jobs/permalink/3104928',
    urgency: 'normal'
  }
];

export const TIKTOK_ARTISANS: TikTokArtisan[] = [
  {
    id: 'tt-1',
    handle: '@plombier_pro_dz',
    artisanName: 'المعلم إسلام السباك (Islam Plomberie)',
    trade: 'سباكة عصرية، كاميرا فحص حراري، تدفئة أرضية',
    wilayaCode: '16',
    communeName: 'الجزائر الوسطى',
    followersCount: '245.8K',
    likesCount: '1.8M',
    videoTitle: 'طريقة كشف تسرب ماء مخفي تحت السيراميك بدون تكسير بالحرارية 🔥 #بلومبي_الجزائر #حرفي_ديزاد',
    videoThumbnail: 'https://images.unsplash.com/photo-1542013936693-884638332954?w=400&auto=format&fit=crop&q=80',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    phone: '0550334455',
    verifiedDz: true,
    hashtags: ['#بلومبي_الجزائر', '#حرفي_ديزاد', '#khedma_dz', '#plomberie_algerie']
  },
  {
    id: 'tt-2',
    handle: '@decor_ba13_setif',
    artisanName: 'أسطورة الـ BA13 سطيف (Walid Décor)',
    trade: 'ديكورات جبس معلقة، أسقف مضيئة، شاشات TV بلاكو',
    wilayaCode: '19',
    communeName: 'سطيف',
    followersCount: '389.2K',
    likesCount: '3.4M',
    videoTitle: 'أحدث ديكور صالون 2026 مع ليزر 3D وبلازما مخفية 🇩🇿 احكم رايك في التعليقات #ba13_setif #ديكورات_جبس',
    videoThumbnail: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&auto=format&fit=crop&q=80',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    phone: '0772881199',
    verifiedDz: true,
    hashtags: ['#ba13_setif', '#ديكورات_جبس', '#artisan_algerien', '#el_eulma']
  },
  {
    id: 'tt-3',
    handle: '@mecanique_auto_oran',
    artisanName: 'دكتور المحركات وهران (Sofiane Mécanique)',
    trade: 'ميكانيك ديزل وبنزين، توربو، فحص سكانير إلكتروني',
    wilayaCode: '31',
    communeName: 'السانية (Es Sénia)',
    followersCount: '192.4K',
    likesCount: '1.2M',
    videoTitle: 'صوت غريب في محرك 1.6 HDI؟ هاوليك السبب قبل ما يروح التوربو ⚠️ #ميكانيك_سيارات #وهران',
    videoThumbnail: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=400&auto=format&fit=crop&q=80',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    phone: '0661778844',
    verifiedDz: true,
    hashtags: ['#ميكانيك_سيارات', '#وهران_الباهية', '#dépannage_oran', '#scanner_obd']
  },
  {
    id: 'tt-4',
    handle: '@freelance_dz_amine',
    artisanName: 'أمين مبرمج ومصمم (Amine Dev)',
    trade: 'متاجر إلكترونية، تطبيقات هواتف، بوابات دفع جزائرية',
    wilayaCode: '16',
    communeName: 'باب الزوار',
    followersCount: '115.6K',
    likesCount: '890K',
    videoTitle: 'كيفاش ربطت بوابة بريدي موب CIB و RedotPay مع متجر إلكتروني محلي 🚀 #برمجة_الجزائر #ريف_ديزاد',
    videoThumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    phone: '0559123890',
    verifiedDz: true,
    hashtags: ['#برمجة_الجزائر', '#ريف_ديزاد', '#ecommerce_dz', '#usthb']
  }
];
