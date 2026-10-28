import { OnlineCourse } from '../types';

export const INITIAL_ONLINE_COURSES: OnlineCourse[] = [
  {
    id: 'crs-001',
    titleAr: 'دورة تركيب وصيانة منظومات الطاقة الشمسية الكهروضوئية (Photovoltaïque) بالشهادة',
    titleFr: 'Formation en Ligne Installation Énergie Solaire & Pompage Solaire',
    category: 'trades_solar_cctv',
    categoryLabelAr: 'الطاقة الشمسية والكهرباء',
    instructorName: 'المهندس فاروق لعموري (خبير طاقات متجددة)',
    academyName: 'أكاديمية الجزائر للطاقات الشمسية (Solar Academy DZ)',
    rating: 4.96,
    studentsEnrolled: 840,
    durationHours: 35,
    lessonsCount: 28,
    format: 'live_zoom_telegram',
    certificateType: 'attestation_reconnue',
    priceDzd: 18000,
    isPromoDiscount: true,
    originalPriceDzd: 25000,
    sourceNetwork: 'telegram_academy',
    sourceUrl: 'https://t.me/solar_formation_dz',
    contactPhone: '0554321980',
    contactWhatsapp: '213554321980',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80',
    syllabusHighlights: [
      'حساب الاستطاعة وعدد الألواح للبيوت والمزارع الصحراوية',
      'توصيل محولات الهجين (Onduleurs Hybrides 3KVA / 5KVA)',
      'بطاريات الليثيوم LiFePO4 وضبط الـ BMS',
      'مضخات المياه الغاطسة الفلاحية بالطاقة الشمسية'
    ],
    descriptionAr: 'تكوين احترافي أونلاين مسجل ومباشر عبر زووم وتليغرام مع متابعة مستمرة. تسليم شهادة معتمدة معترف بها تسمح لك بفتح ورشة أو مقاولة لتركيب الألواح الشمسية عبر كافة ولايات الوطن.'
  },
  {
    id: 'crs-002',
    titleAr: 'دورة فحص السيارات بالسكانير وتشخيص الأعطال الإلكترونية وحذف لمبة المحرك (OBD-II)',
    titleFr: 'Formation Scanner Automobile, Diagnostic Calculateur & Électronique',
    category: 'auto_scanner_diag',
    categoryLabelAr: 'تشخيص وسكانير السيارات',
    instructorName: 'المعلم كمال ميكاترونيكس (سطيف)',
    academyName: 'معهد تكنولوجيا السيارات والتشخيص الإلكتروني',
    rating: 4.92,
    studentsEnrolled: 1200,
    durationHours: 40,
    lessonsCount: 32,
    format: '100_percent_online',
    certificateType: 'certified_diploma',
    priceDzd: 22000,
    isPromoDiscount: true,
    originalPriceDzd: 30000,
    sourceNetwork: 'facebook_page',
    sourceUrl: 'https://www.facebook.com/diag.auto.algerie',
    contactPhone: '0661889922',
    contactWhatsapp: '213661889922',
    imageUrl: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&auto=format&fit=crop&q=80',
    syllabusHighlights: [
      'استخدام أجهزة Launch X431 Pro و Autel MaxiSys',
      'قراءة المخططات الكهربائية واستخراج كودات الخطأ DTC',
      'إلغاء أخطاء الفلتر DPF وصمام EGR وحساسات الشكمان',
      'برمجة المفاتيح والبصمة وتهيئة علب السرعة الأوتوماتيكية'
    ],
    descriptionAr: 'الدورة الأولى في الجزائر لتعلم احتراف السكانير من الصفر حتى البرمجة المتقدمة. فيديوهات تطبيقية عالية الدقة 4K من داخل الورشة مع مكتبة كودات وفلاشات أصلية لجميع سيارات رونو، بيجو، فولكسفاغن وهيونداي.'
  },
  {
    id: 'crs-003',
    titleAr: 'ماستركلاس التجارة الإلكترونية الشاملة في الجزائر (E-Commerce DZ: من التوريد إلى التوصيل)',
    titleFr: 'Masterclass E-commerce DZ & TikTok Ads (Sourcing El Eulma & Hamiz)',
    category: 'ecommerce_marketing',
    categoryLabelAr: 'التجارة الإلكترونية والتسويق',
    instructorName: 'أمين دريدي (رائد أعمال ومسوق رقمي)',
    academyName: 'أكاديمية التجارة الرقمية الجزائرية',
    rating: 4.98,
    studentsEnrolled: 2450,
    durationHours: 25,
    lessonsCount: 22,
    format: '100_percent_online',
    certificateType: 'attestation_reconnue',
    priceDzd: 12000,
    isPromoDiscount: true,
    originalPriceDzd: 20000,
    sourceNetwork: 'tiktok_masterclass',
    sourceUrl: 'https://www.tiktok.com/@ecom_algeria_master',
    contactPhone: '0770554433',
    contactWhatsapp: '213770554433',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?w=600&auto=format&fit=crop&q=80',
    syllabusHighlights: [
      'أسرار التوريد بالجملة من شارع دبي بالعلمة وسوق الحميز',
      'إطلاق إعلانات TikTok Ads و Facebook Ads المربحة بأقل تكلفة',
      'إنشاء متجر شوبيفاي أو يوكان محترف متوافق مع الدفع عند الاستلام',
      'إدارة فريق تأكيد الطلبيات وتفادي المرتجعات (Retour) مع شركات التوصيل'
    ],
    descriptionAr: 'الدورة الأكثر طلباً للشباب الجزائري لبدء مشروع تجارة إلكترونية حقيقي برأس مال يبدأ من 3 ملايين سنتيم، مع قائمة بأفضل موردي الجملة الموثوقين بالعلمة والحميز واستراتيجيات تسويق مجربة.'
  },
  {
    id: 'crs-004',
    titleAr: 'دورة صيانة الهواتف الذكية الهاردوير والسوفتوير وتغيير الشاشات (Hardware & Software)',
    titleFr: 'Formation Réparation Smartphones iPhone & Android au Microscope',
    category: 'phone_repair_flash',
    categoryLabelAr: 'صيانة وتفليش الهواتف',
    instructorName: 'التقني رضوان تبسي',
    academyName: 'معهد فون كلينيك الجزائر (Phone Clinic DZ)',
    rating: 4.90,
    studentsEnrolled: 980,
    durationHours: 30,
    lessonsCount: 26,
    format: 'live_zoom_telegram',
    certificateType: 'qualification_cam',
    priceDzd: 16000,
    isPromoDiscount: false,
    sourceNetwork: 'telegram_academy',
    contactPhone: '0555771199',
    contactWhatsapp: '213555771199',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
    syllabusHighlights: [
      'قراءة مسارات البوردة بمخططات ZXW و Borneo Schematics',
      'تلحيم الآيسيات BGA والشحن السريع ومتحكمات الطاقة',
      'تغيير باغات وزجاجات الشاشات OLED بالكبس الحراري',
      'تخطي حسابات جوجل FRP وفلاش وتفليش أجهزة سامسونغ وشاومي'
    ],
    descriptionAr: 'تعلم مهنة تصليح الهواتف الأكثر ربحية، فيديوهات تفصيلية تحت المجهر الإلكتروني، توجيه خطوة بخطوة لشراء عتاد التلحين وقطع الغيار بالجملة من بلفور الحراش أو وهران.'
  },
  {
    id: 'crs-005',
    titleAr: 'دورة المحاسبة والجبائية والتصريح G50 وفق النظام المالي الجزائري (Système SCF)',
    titleFr: 'Formation Comptabilité Pratique, Fiscalité G50 & Logiciel PC Compta',
    category: 'accounting_scf',
    categoryLabelAr: 'المحاسبة والجبائية',
    instructorName: 'أ. مراد بن عيسى (محاسب معتمد ومحافظ حسابات)',
    academyName: 'المركز الجزائري للتدريب المالي والإداري',
    rating: 4.94,
    studentsEnrolled: 620,
    durationHours: 32,
    lessonsCount: 24,
    format: '100_percent_online',
    certificateType: 'certified_diploma',
    priceDzd: 14000,
    isPromoDiscount: true,
    originalPriceDzd: 18000,
    sourceNetwork: 'facebook_page',
    contactPhone: '0560123490',
    contactWhatsapp: '213560123490',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&auto=format&fit=crop&q=80',
    syllabusHighlights: [
      'التطبيق العملي الكامل على برنامج PC Compta و PC Paie',
      'ملء وحساب استمارة الضرائب الشهرية G50 (TAP, TVA, IRG)',
      'إعداد الميزانية الختامية وجدول حساب النتائج (Bilan Fiscal)',
      'التعامل مع مفتشيات الضرائب وصندوق الضمان الاجتماعي CNAS/CASNOS'
    ],
    descriptionAr: 'تكوين تطبيقي 100% موجه لطلبة المحاسبة والمالية وخريجي الجامعات للتمكن من العمل الفوري كمحاسب رئيسي في الشركات أو فتح مكتب استشارات جبائية خاص.'
  },
  {
    id: 'crs-006',
    titleAr: 'دورة تركيب وضبط كاميرات المراقبة وأنظمة الإنذار والسمارت هوم (CCTV & Domotique)',
    titleFr: 'Installation Caméras Vidéosurveillance IP/HD & Domotique',
    category: 'trades_solar_cctv',
    categoryLabelAr: 'أنظمة الأمان والإنذار',
    instructorName: 'المهندس عبد الرؤوف قرقاح',
    academyName: 'أكاديمية الحماية والأنظمة الذكية الجزائر',
    rating: 4.95,
    studentsEnrolled: 1100,
    durationHours: 28,
    lessonsCount: 20,
    format: '100_percent_online',
    certificateType: 'attestation_reconnue',
    priceDzd: 11000,
    isPromoDiscount: false,
    sourceNetwork: 'youtube_pro',
    contactPhone: '0771998844',
    contactWhatsapp: '213771998844',
    imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&auto=format&fit=crop&q=80',
    syllabusHighlights: [
      'توصيل وبرمجة مسجلات DVR و NVR Dahua & Hikvision',
      'إعداد الشبكات المحلية IP وتمرير كوابل UTP مع تغذية PoE',
      'ربط الكاميرات بالهاتف الذكي للمشاهدة الحية عبر تطبيق DMSS',
      'تركيب أجهزة الإنذار ضد السرقة وحساسات الحركة وأجهزة الاتصال'
    ],
    descriptionAr: 'مهنة مطلوبة جداً لدى المحلات والفيلات والمصانع. تدريب شامل يعلمك كيفية تسعير المشاريع وشراء الكاميرات بالجملة وتثبيتها باحترافية وتسليم ضمان للزبون.'
  }
];

// Helper to simulate importing an online course from Facebook, Telegram, YouTube or TikTok
export function parseAndImportOnlineCourse(input: {
  titleAr: string;
  sourceUrl: string;
  sourceNetwork: OnlineCourse['sourceNetwork'];
  category: OnlineCourse['category'];
  instructorName: string;
  academyName: string;
  priceDzd: number;
  contactPhone: string;
  durationHours?: number;
  descriptionAr?: string;
}): OnlineCourse {
  const categoryLabels: Record<OnlineCourse['category'], string> = {
    trades_solar_cctv: 'الطاقة الشمسية والأمان',
    auto_scanner_diag: 'سكانير وميكانيك السيارات',
    phone_repair_flash: 'صيانة وتفليش الهواتف',
    ecommerce_marketing: 'التجارة الإلكترونية والتسويق',
    coding_web_ai: 'البرمجة والذكاء الاصطناعي',
    accounting_scf: 'المحاسبة والجبائية SCF',
    languages_tcf_ielts: 'اللغات واختبارات الهجرة',
    graphic_video_editing: 'المونتاج والتصميم'
  };

  return {
    id: 'crs-imp-' + Date.now(),
    titleAr: input.titleAr,
    titleFr: input.titleAr,
    category: input.category,
    categoryLabelAr: categoryLabels[input.category] || 'تكوين احترافي أونلاين',
    instructorName: input.instructorName || 'مدرب معتمد',
    academyName: input.academyName || 'أكاديمية تكوين جزائرية',
    rating: 5.0,
    studentsEnrolled: 1,
    durationHours: Number(input.durationHours) || 20,
    lessonsCount: 15,
    format: '100_percent_online',
    certificateType: 'attestation_reconnue',
    priceDzd: Number(input.priceDzd) || 10000,
    isPromoDiscount: true,
    originalPriceDzd: Math.round((Number(input.priceDzd) || 10000) * 1.3),
    sourceNetwork: input.sourceNetwork,
    sourceUrl: input.sourceUrl,
    contactPhone: input.contactPhone || '0555000000',
    contactWhatsapp: input.contactPhone ? `213${input.contactPhone.replace(/^0/, '')}` : undefined,
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
    syllabusHighlights: ['محتوى تعليمي مسجل وتطبيقي', 'متابعة فردية عبر تليغرام', 'شهادة نجاح معتمدة'],
    descriptionAr: input.descriptionAr || 'تم استيراد هذا البرنامج التكويني من الشبكة الإلكترونية وتدقيقه لضمان محتوى موثوق وإمكانية الدفع بالدينار الجزائري عبر بريدي موب (BaridiMob).',
    isCustomImported: true
  };
}
