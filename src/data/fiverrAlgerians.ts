import { FiverrAlgerianSeller } from '../types';

export const INITIAL_FIVERR_ALGERIANS: FiverrAlgerianSeller[] = [
  {
    id: 'fvr-alg-001',
    fiverrUsername: 'karim_fullstack_dz',
    fullName: 'كريم بلحاج (Karim Belhadj)',
    wilayaCode: '16',
    wilayaNameAr: 'الجزائر (باب الزوار)',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    levelBadge: 'top_rated',
    rating: 5.0,
    reviewCount: 482,
    completedOrdersCount: 960,
    memberSinceYear: 2020,
    responseHours: 1,
    category: 'web_mobile_dev',
    categoryLabelAr: 'تطوير الويب وتطبيقات الهاتف',
    categoryLabelFr: 'Développement Web & Mobile',
    gigTitleAr: 'سأقوم ببرمجة موقع أو تطبيق متجاوب بتقنية React & Next.js مع لوحة تحكم ذكية',
    gigTitleEn: 'I will build a responsive React & Next.js web application with modern dashboard',
    gigDescriptionAr: 'مهندس برمجيات جزائري خريج USTHB، خبرة 5 سنوات على فايفر مع أكثر من 900 مشروع منجز لعملاء من كندا، فرنسا، ودول الخليج. برمجة كود نظيف وسريع.',
    startingPriceUsd: 80,
    startingPriceDzd: 19200, // 80 * 240
    deliveryDays: 3,
    languages: ['العربية (دارجة وفصحى)', 'الفرنسية', 'الإنجليزية'],
    skills: ['React', 'Next.js', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'Stripe/RedotPay'],
    portfolioThumbs: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=80'
    ],
    fiverrGigUrl: 'https://www.fiverr.com/karim_fullstack_dz/build-modern-react-nextjs-app',
    acceptsLocalPayment: true,
    fiverrFeeSavingsDzd: 4800, // Client & seller save 20% + 5.5% fees
    verifiedAlgerianIdentity: true,
    phone: '0554189021'
  },
  {
    id: 'fvr-alg-002',
    fiverrUsername: 'amina_visuals',
    fullName: 'أمينة بن خريف (Amina Benkhrif)',
    wilayaCode: '31',
    wilayaNameAr: 'وهران',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    levelBadge: 'level_2',
    rating: 4.9,
    reviewCount: 318,
    completedOrdersCount: 610,
    memberSinceYear: 2021,
    responseHours: 1,
    category: 'graphic_design',
    categoryLabelAr: 'الهوية البصرية وتصميم الشعارات',
    categoryLabelFr: 'Identité Visuelle & Logo Design',
    gigTitleAr: 'سأصمم شعاراً احترافياً وهوية بصرية كاملة لشركتك بلمسة عصرية مع خط عربي مميز',
    gigTitleEn: 'I will design a modern luxury logo and complete brand identity guide',
    gigDescriptionAr: 'مصممة جرافيك وهران، متخصصة في العلامات التجارية للمؤسسات والمحلات. تصاميم أصلية 100% متوافقة مع الطباعة والمنصات الرقمية مع تسليم ملفات المصدر (AI, SVG, PDF).',
    startingPriceUsd: 45,
    startingPriceDzd: 10800,
    deliveryDays: 2,
    languages: ['العربية', 'الفرنسية', 'الإنجليزية'],
    skills: ['Adobe Illustrator', 'Photoshop', 'Brand Guidelines', 'Arabic Typography', 'Vector'],
    portfolioThumbs: [
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=500&auto=format&fit=crop&q=80'
    ],
    fiverrGigUrl: 'https://www.fiverr.com/amina_visuals/design-modern-luxury-brand-logo',
    acceptsLocalPayment: true,
    fiverrFeeSavingsDzd: 2700,
    verifiedAlgerianIdentity: true,
    phone: '0770912384'
  },
  {
    id: 'fvr-alg-003',
    fiverrUsername: 'yacine_voice_dz',
    fullName: 'ياسين قدور (Yacine Kaddour)',
    wilayaCode: '25',
    wilayaNameAr: 'قسنطينة',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    levelBadge: 'fiverr_pro',
    rating: 5.0,
    reviewCount: 640,
    completedOrdersCount: 1400,
    memberSinceYear: 2018,
    responseHours: 2,
    category: 'voiceover_audio',
    categoryLabelAr: 'التعليق الصوتي الإذاعي (دارجة وفصحى)',
    categoryLabelFr: 'Voix-off Professionnelle (Darija & Arabe)',
    gigTitleAr: 'تسجيل تعليق صوتي احترافي بالدارجة الجزائرية الأصيلة أو الفصحى بإستوديو عازل للصوت',
    gigTitleEn: 'I will record a professional Algerian Darija or Modern Arabic voiceover',
    gigDescriptionAr: 'معلق صوتي إذاعي معتمد ورسمي، قمت بتسجيل مئات الإعلانات لشركات الاتصالات والسيارات والوثائقيات في الجزائر والعالم العربي. عتاد إستوديو احترافي Neumann U87.',
    startingPriceUsd: 50,
    startingPriceDzd: 12000,
    deliveryDays: 1,
    languages: ['الدارجة الجزائرية العاصمية والشرقية', 'العربية الفصحى الإخبارية', 'الفرنسية'],
    skills: ['Voice Acting', 'Audio Mastering', 'Commercial Ads', 'Documentary', 'Studio Quality'],
    portfolioThumbs: [
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&auto=format&fit=crop&q=80'
    ],
    fiverrGigUrl: 'https://www.fiverr.com/yacine_voice_dz/record-pro-algerian-voiceover',
    acceptsLocalPayment: true,
    fiverrFeeSavingsDzd: 3000,
    verifiedAlgerianIdentity: true,
    phone: '0661456789'
  },
  {
    id: 'fvr-alg-004',
    fiverrUsername: 'mehdi_reels_motion',
    fullName: 'مهدي بوقرة (Mehdi Bouguerra)',
    wilayaCode: '19',
    wilayaNameAr: 'سطيف',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    levelBadge: 'level_2',
    rating: 4.9,
    reviewCount: 224,
    completedOrdersCount: 520,
    memberSinceYear: 2021,
    responseHours: 1,
    category: 'video_animation',
    categoryLabelAr: 'مونتاج فيديوهات TikTok و Reels وموشن جرافيك',
    categoryLabelFr: 'Montage Vidéo & Motion Graphics',
    gigTitleAr: 'مونتاج احترافي لفيديوهات الريلز وتيك توك مع كابشنز ديناميكية ومؤثرات تريند هوليوود',
    gigTitleEn: 'I will edit engaging TikTok reels and YouTube shorts with dynamic captions',
    gigDescriptionAr: 'مونتير فيديو مقيم بسطيف، أعمل مع كبار صناع المحتوى ورواد التجارة الإلكترونية E-commerce في الجزائر وأوروبا لتحقيق انتشار واسع (Viral) ونسب مشاهدات مليونية.',
    startingPriceUsd: 35,
    startingPriceDzd: 8400,
    deliveryDays: 2,
    languages: ['العربية', 'الفرنسية', 'الإنجليزية'],
    skills: ['Premiere Pro', 'After Effects', 'CapCut Pro', 'Sound Design', 'Color Grading'],
    portfolioThumbs: [
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&auto=format&fit=crop&q=80'
    ],
    fiverrGigUrl: 'https://www.fiverr.com/mehdi_reels_motion/edit-viral-reels-and-tiktok',
    acceptsLocalPayment: true,
    fiverrFeeSavingsDzd: 2100,
    verifiedAlgerianIdentity: true,
    phone: '0556781290'
  },
  {
    id: 'fvr-alg-005',
    fiverrUsername: 'sofiane_ai_scraper',
    fullName: 'سفيان معوش (Sofiane Maouche)',
    wilayaCode: '05',
    wilayaNameAr: 'باتنة',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    levelBadge: 'rising_talent',
    rating: 5.0,
    reviewCount: 110,
    completedOrdersCount: 240,
    memberSinceYear: 2022,
    responseHours: 1,
    category: 'ai_python',
    categoryLabelAr: 'ذكاء اصطناعي وأتمتة بايثون وسحب البيانات',
    categoryLabelFr: 'Python Automation & IA Web Scraping',
    gigTitleAr: 'بناء بوتات أتمتة بايثون وسحب بيانات المتاجر والمنافسين مع ربط نماذج Gemini و ChatGPT',
    gigTitleEn: 'I will build custom Python web scrapers, bots and AI integrations',
    gigDescriptionAr: 'مهندس بيانات وذكاء اصطناعي خريج جامعة باتنة 2، خبرة في أتمتة المهام الشاقة وسحب قواعد البيانات الضخمة وبناء مساعدين أذكياء مخصصين للمؤسسات.',
    startingPriceUsd: 60,
    startingPriceDzd: 14400,
    deliveryDays: 2,
    languages: ['العربية', 'الإنجليزية', 'الفرنسية'],
    skills: ['Python', 'FastAPI', 'Playwright', 'Selenium', 'LangChain', 'Pandas', 'Gemini API'],
    portfolioThumbs: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=80'
    ],
    fiverrGigUrl: 'https://www.fiverr.com/sofiane_ai_scraper/build-custom-python-ai-bots',
    acceptsLocalPayment: true,
    fiverrFeeSavingsDzd: 3600,
    verifiedAlgerianIdentity: true,
    phone: '0658902341'
  },
  {
    id: 'fvr-alg-006',
    fiverrUsername: 'khaled_legal_trans',
    fullName: 'خالد سحنون (Khaled Sahnoun)',
    wilayaCode: '15',
    wilayaNameAr: 'تيزي وزو',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    levelBadge: 'level_2',
    rating: 5.0,
    reviewCount: 395,
    completedOrdersCount: 880,
    memberSinceYear: 2019,
    responseHours: 1,
    category: 'translation_writing',
    categoryLabelAr: 'ترجمة معتمدة فرنسية، عربية، إنجليزية وتدقيق لغوي',
    categoryLabelFr: 'Traduction Juridique & Technique',
    gigTitleAr: 'ترجمة احترافية دقيقة للعقود، الوثائق الرسمية والمواقع (عربي - فرنسي - إنجليزي)',
    gigTitleEn: 'I will translate certified documents and contracts French, Arabic, English',
    gigDescriptionAr: 'مترجم معتمد حاصل على ماستر ترجمة فورية. ترجمة بشرية 100% خالية من الأخطاء مع احترام المصطلحات القانونية والتقنية الجزائرية والدولية.',
    startingPriceUsd: 25,
    startingPriceDzd: 6000,
    deliveryDays: 1,
    languages: ['العربية (لغة أم)', 'الفرنسية (مستوى متقدم)', 'الإنجليزية (طلاقة)', 'الأمازيغية'],
    skills: ['Legal Translation', 'Proofreading', 'Technical Manuals', 'Academic Papers', 'Subtitling'],
    portfolioThumbs: [
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&auto=format&fit=crop&q=80'
    ],
    fiverrGigUrl: 'https://www.fiverr.com/khaled_legal_trans/translate-french-arabic-english',
    acceptsLocalPayment: true,
    fiverrFeeSavingsDzd: 1500,
    verifiedAlgerianIdentity: true,
    phone: '0791456712'
  }
];

// Helper to simulate importing an Algerian Fiverr profile/gig link
export function parseAndImportFiverrProfile(input: {
  urlOrUsername: string;
  category: FiverrAlgerianSeller['category'];
  wilayaCode: string;
  wilayaNameAr: string;
  name?: string;
  priceUsd?: number;
  skillsText?: string;
}): FiverrAlgerianSeller {
  const cleanInput = input.urlOrUsername.replace('https://www.fiverr.com/', '').replace('@', '').split('/')[0] || 'dz_talent';
  const cleanUsername = cleanInput.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
  const usdPrice = input.priceUsd && input.priceUsd > 5 ? input.priceUsd : 40;
  const dzdRate = 240; // Parallel market Square rate
  const dzdPrice = usdPrice * dzdRate;
  const savings = Math.round(dzdPrice * 0.25); // 20% seller + 5.5% buyer fee savings

  const categoryLabels: Record<FiverrAlgerianSeller['category'], { ar: string; fr: string }> = {
    web_mobile_dev: { ar: 'تطوير الويب وتطبيقات الهاتف', fr: 'Développement Web & Mobile' },
    graphic_design: { ar: 'الهوية البصرية وتصميم الشعارات', fr: 'Identité Visuelle & Logo Design' },
    voiceover_audio: { ar: 'التعليق الصوتي الإذاعي', fr: 'Voix-off Professionnelle' },
    video_animation: { ar: 'المونتاج والموشن جرافيك', fr: 'Montage Vidéo & Animation' },
    translation_writing: { ar: 'الترجمة والتدقيق اللغوي', fr: 'Traduction & Rédaction' },
    ai_python: { ar: 'الذكاء الاصطناعي وبايثون', fr: 'IA & Python Automation' },
    digital_marketing: { ar: 'التسويق الرقمي وإعلانات السوشيال', fr: 'Marketing Digital & E-commerce' }
  };

  const skillsList = input.skillsText 
    ? input.skillsText.split(',').map(s => s.trim()).filter(Boolean)
    : ['Fiverr Top Seller', 'Professional Work', 'DZ Verified'];

  return {
    id: 'fvr-imp-' + Date.now(),
    fiverrUsername: cleanUsername,
    fullName: input.name || `مستقل جزائري موثق (${cleanUsername})`,
    wilayaCode: input.wilayaCode || '16',
    wilayaNameAr: input.wilayaNameAr || 'الجزائر',
    avatarUrl: `https://images.unsplash.com/photo-${1535713875002 + (Math.floor(Math.random() * 100))}?w=200&auto=format&fit=crop&q=80`,
    levelBadge: 'level_2',
    rating: 4.9,
    reviewCount: Math.floor(Math.random() * 200) + 40,
    completedOrdersCount: Math.floor(Math.random() * 400) + 90,
    memberSinceYear: 2021,
    responseHours: 1,
    category: input.category,
    categoryLabelAr: categoryLabels[input.category]?.ar || 'خدمات رقمية',
    categoryLabelFr: categoryLabels[input.category]?.fr || 'Services Numériques',
    gigTitleAr: `خدمات احترافية معتمدة على فايفر بجودة عالمية وتسليم سريع بالدينار الجزائري`,
    gigTitleEn: `Professional verified services on Fiverr with instant delivery and DZ payment`,
    gigDescriptionAr: `تم استيراد هذا الملف الشخصي الجزائري من منصة فايفر العالمية. يمكنك الآن الطلب والدفع بالدينار الجزائري عبر بريدي موب (BaridiMob) أو CCP أو RedotPay دون اقتطاعات البنوك أو رسوم فايفر 20%.`,
    startingPriceUsd: usdPrice,
    startingPriceDzd: dzdPrice,
    deliveryDays: 2,
    languages: ['العربية', 'الفرنسية', 'الإنجليزية'],
    skills: skillsList,
    portfolioThumbs: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=80'
    ],
    fiverrGigUrl: input.urlOrUsername.startsWith('http') ? input.urlOrUsername : `https://www.fiverr.com/${cleanUsername}`,
    acceptsLocalPayment: true,
    fiverrFeeSavingsDzd: savings,
    verifiedAlgerianIdentity: true,
    isCustomImported: true
  };
}
