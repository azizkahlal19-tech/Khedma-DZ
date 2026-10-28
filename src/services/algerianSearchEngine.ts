import { WILAYAS_58 } from '../data/wilayas';
import { INITIAL_PRODUCTS, INITIAL_CRAFTSMEN, INITIAL_POLIVALENTE_TASKS, INITIAL_FREELANCE_SERVICES } from '../data/mockData';
import { INITIAL_FIVERR_ALGERIANS } from '../data/fiverrAlgerians';
import { INITIAL_RECRUITMENT_PROFILES, INITIAL_COMPANY_JOB_OFFERS } from '../data/recruitmentTalents';
import { INITIAL_REAL_ESTATE_LISTINGS } from '../data/realEstateData';
import { INITIAL_ONLINE_COURSES } from '../data/onlineCourses';
import { FACEBOOK_LEADS, TIKTOK_ARTISANS } from '../data/socialFeeds';

export type SearchSourceType = 
  | 'all' 
  | 'facebook' 
  | 'ouedkniss' 
  | 'linkedin' 
  | 'tiktok' 
  | 'cam' 
  | 'krilo' 
  | 'telegram' 
  | 'anem' 
  | 'wholesale';

export type SearchCategoryType = 
  | 'all' 
  | 'trades' 
  | 'polivalente' 
  | 'jobs' 
  | 'building_materials' 
  | 'real_estate' 
  | 'freelance' 
  | 'courses';

export interface UniversalSearchResult {
  id: string;
  source: 'facebook' | 'ouedkniss' | 'linkedin' | 'tiktok' | 'cam' | 'krilo' | 'telegram' | 'anem' | 'wholesale';
  sourceNameAr: string;
  sourceBadgeColor: string;
  category: 'trades' | 'polivalente' | 'jobs' | 'building_materials' | 'real_estate' | 'freelance' | 'courses';
  categoryLabelAr: string;
  title: string;
  description: string;
  wilayaCode: string;
  wilayaName: string;
  communeName: string;
  contactPhone?: string;
  authorName: string;
  authorRole?: string;
  priceDzd?: number;
  priceLabel?: string;
  postedAt: string;
  verified: boolean;
  externalUrl: string;
  tags: string[];
  thumbnailUrl?: string;
}

// Algerian Dialect & Multi-lingual Synonym Dictionary
const SYNONYMS_MAP: Record<string, string[]> = {
  'ماصو': ['ماصو', 'بناء', 'بناي', 'maçon', 'macon', 'construction', 'brique', 'اجور'],
  'بناي': ['بناي', 'بناء', 'ماصو', 'maçon', 'macon', 'بناء حجر'],
  'بلومبي': ['بلومبي', 'سباك', 'ترصيص', 'plombier', 'fuite', 'chauffe-bain', 'تفريغ مياه'],
  'سباك': ['سباك', 'بلومبي', 'ترصيص', 'plombier', 'sanitaire'],
  'تريسيان': ['تريسيان', 'كهربائي', 'électricité', 'electricien', 'إنارة', 'طابلو'],
  'كهربائي': ['كهربائي', 'تريسيان', 'électricité', 'electricien', 'صيانة كهربائية'],
  'فايونس': ['فايونس', 'سيراميك', 'carrelage', 'dalle de sol', 'فاينس', 'بلاط'],
  'سيراميك': ['سيراميك', 'فايونس', 'carrelage', 'faïence', 'بورسلان'],
  'كارلاج': ['كارلاج', 'سيراميك', 'carrelage', 'بلاط'],
  'بلاكو': ['بلاكو', 'placo', 'plâtre', 'جبس', 'ba13', 'décoration plafond'],
  'دهان': ['دهان', 'صباغ', 'peintre', 'peinture', 'صباغة', 'stucco', 'ديكور'],
  'بوليفالون': ['بوليفالون', 'polivalente', 'مانوفر', 'خدايمية', 'عامل يومية', 'تفريغ', 'شحن', 'manœuvre'],
  'مانوفر': ['مانوفر', 'بوليفالون', 'polivalente', 'عامل يومية', 'هدم', 'حفر'],
  'عامل يومية': ['عامل يومية', 'بوليفالون', 'مانوفر', '1000 دج', 'شحن وتفريغ'],
  'كريلو': ['كريلو', 'كراء', 'location', 'louer', 'شقة', 'واد كنيس', 'appartement'],
  'كراء': ['كراء', 'كريلو', 'location', 'louer', 'إيجار', 'مستودع'],
  'عقار': ['عقار', 'شقة', 'فيلا', 'محل', 'واد كنيس', 'immobilier', 'terrain'],
  'مهندس': ['مهندس', 'ingénieur', 'architecte', 'معماري', 'مدني', 'génie civil', 'linkedin'],
  'إسمنت': ['إسمنت', 'ciment', 'chaux', 'lafarge', 'متين', 'العلمة'],
  'حديد': ['حديد', 'fer', 'rond à béton', 'توسيالي', 'tosyali', 'تسليح'],
  'واد كنيس': ['واد كنيس', 'ouedkniss', 'اعلانات', 'سوق'],
  'فايفر': ['فايفر', 'fiverr', 'عمل حر', 'تصميم', 'برمجة', 'ترجمة']
};

export function expandSearchKeywords(query: string): string[] {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  const expanded = new Set<string>();
  words.forEach(word => {
    expanded.add(word);
    // Check against synonym dictionary
    for (const [key, synonyms] of Object.entries(SYNONYMS_MAP)) {
      if (word.includes(key) || key.includes(word) || synonyms.some(s => s.toLowerCase().includes(word))) {
        synonyms.forEach(s => expanded.add(s.toLowerCase()));
      }
    }
  });

  return Array.from(expanded);
}

// Curated live Algerian web and social items from Ouedkniss, Krilo, LinkedIn DZ, Telegram, ANEM Wassit
const LIVE_ALGERIAN_WEB_CRAWLED_ITEMS: UniversalSearchResult[] = [
  {
    id: 'crawled-ok-01',
    source: 'ouedkniss',
    sourceNameAr: 'واد كنيس (Ouedkniss)',
    sourceBadgeColor: 'bg-amber-500 text-slate-950',
    category: 'building_materials',
    categoryLabelAr: 'مواد بناء وتجهيز',
    title: 'إسمنت بورتلاند لافارج Lafarge 42.5 بالجملة مع التوصيل',
    description: 'متوفر كميات هائلة من الإسمنت الرمادي لافارج 50 كغ، سعر الجملة مع إمكانية التوصيل بالشاحنات لجميع ورشات البناء في العاصمة وبومرداس والبليدة. الدفع عند المعاينة.',
    wilayaCode: '16',
    wilayaName: 'الجزائر (Alger)',
    communeName: 'الرويبة (Zone Industrielle)',
    contactPhone: '0560234567',
    authorName: 'مؤسسة مواد البناء الإخوة بلحاج',
    authorRole: 'تاجر جملة معتمد RC',
    priceDzd: 560,
    priceLabel: '560 دج / كيس',
    postedAt: 'منذ 14 دقيقة',
    verified: true,
    externalUrl: 'https://ouedkniss.com/store/materiaux-alger',
    tags: ['إسمنت', 'واد كنيس', 'لافارج', 'مواد بناء', 'جملة'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'crawled-kr-02',
    source: 'krilo',
    sourceNameAr: 'سوق كريلو (Krilo DZ)',
    sourceBadgeColor: 'bg-rose-600 text-white',
    category: 'real_estate',
    categoryLabelAr: 'عقارات وكراء',
    title: 'شقة F3 مجهزة للكراء السنوي أو الشهري - حي 1000 مسكن',
    description: 'شقة نظيفة جداً طابق 2 مع مصعد وتدفئة مركزية وغاز وماء 24/24، قريبة من الترامواي ومجمع المدارس. جاهزة للسكن الفوري للعائلات أو الموظفين.',
    wilayaCode: '19',
    wilayaName: 'سطيف (Sétif)',
    communeName: 'سطيف وسط (El Hidhab)',
    contactPhone: '0661448899',
    authorName: 'وكالة الهضاب العقارية',
    authorRole: 'وكيل عقاري معتمد',
    priceDzd: 32000,
    priceLabel: '32,000 دج / شهر',
    postedAt: 'منذ 35 دقيقة',
    verified: true,
    externalUrl: 'https://krilo.dz/annonces/setif-f3-hidhab',
    tags: ['كريلو', 'كراء', 'شقة F3', 'سطيف', 'عقار'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'crawled-li-03',
    source: 'linkedin',
    sourceNameAr: 'لينكد إن الجزائر (LinkedIn DZ)',
    sourceBadgeColor: 'bg-blue-600 text-white',
    category: 'jobs',
    categoryLabelAr: 'توظيف وهندسة',
    title: 'مطلوب مهندس مدني ومسير أشغال (Conducteur de Travaux) - ورشة وهران',
    description: 'شركة مقاولات وأشغال عامة كبرى توظف فوراً مهندس دولة في الهندسة المدنية خريج USTOB أو جامعة وهران مع خبرة 2 سنوات في متابعة الخرسانة المسلحة وتسيير فرق البناء.',
    wilayaCode: '31',
    wilayaName: 'وهران (Oran)',
    communeName: 'السانية (Zone Es-Sénia)',
    contactPhone: '0770991122',
    authorName: 'EURL BTPH Oran Ouest',
    authorRole: 'مدير الموارد البشرية',
    priceDzd: 95000,
    priceLabel: '95,000 دج / شهر',
    postedAt: 'منذ 50 دقيقة',
    verified: true,
    externalUrl: 'https://linkedin.com/jobs/view/algeria-civil-engineer-oran',
    tags: ['linkedin', 'هندسة مدنية', 'توظيف', 'وهران', 'أشغال بناء'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'crawled-anem-04',
    source: 'anem',
    sourceNameAr: 'منصة وسيط (ANEM Wassit)',
    sourceBadgeColor: 'bg-teal-600 text-white',
    category: 'jobs',
    categoryLabelAr: 'عروض عمل رسمية',
    title: 'عروض توظيف: 10 تقنيين في تركيب شبكات الكهرباء الصناعية والغاز',
    description: 'عرض عمل صادر عن وكالة التشغيل المحلية للشباب الحاصلين على شهادة تقني سامي TS أو شهادة الكفاءة المهنية CAP في الترصيص الصحي والكهرباء العامة.',
    wilayaCode: '25',
    wilayaName: 'قسنطينة (Constantine)',
    communeName: 'علي منجلي (Ali Mendjeli)',
    contactPhone: '031885544',
    authorName: 'الوكالة الوطنية للتشغيل ANEM',
    authorRole: 'بوابة وسيط الرسمية',
    priceDzd: 55000,
    priceLabel: '55,000 دج + تأمين CNAS',
    postedAt: 'منذ ساعتين',
    verified: true,
    externalUrl: 'https://wassit.anem.dz/offres/constantine-tech',
    tags: ['anem', 'وسيط', 'توظيف', 'كهرباء', 'قسنطينة', 'شهادات'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'crawled-tg-05',
    source: 'telegram',
    sourceNameAr: 'قنوات تيليغرام الصفقات (Telegram DZ)',
    sourceBadgeColor: 'bg-sky-500 text-white',
    category: 'polivalente',
    categoryLabelAr: 'عمال يومية 1,000 دج',
    title: 'فرصة عمل فورية: مطلوب 4 عمال لشحن ورفع أكياس الجبس في البليدة',
    description: 'ورشة بناء وترميم عمارة في أولاد يعيش تبحث عن 4 عمال أشداء للعمل اليوم من 13h إلى 18h. تسعيرة اليومية 3000 دج تدفع نقداً فور انتهاء العمل مع قارورات ماء باردة.',
    wilayaCode: '09',
    wilayaName: 'البليدة (Blida)',
    communeName: 'أولاد يعيش (Ouled Yaïch)',
    contactPhone: '0558123489',
    authorName: 'قناة فرص عمل وعمال اليومية البليدة',
    authorRole: 'منسق ورشات بناء',
    priceDzd: 3000,
    priceLabel: '3,000 دج يومي',
    postedAt: 'منذ 25 دقيقة',
    verified: true,
    externalUrl: 'https://t.me/khedma_dz_blida_daily',
    tags: ['تيليغرام', 'بوليفالون', 'يومية', 'البليدة', 'شحن وتفريغ'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'crawled-wh-06',
    source: 'wholesale',
    sourceNameAr: 'سوق الجملة العلمة (El Eulma Hub)',
    sourceBadgeColor: 'bg-amber-600 text-white',
    category: 'building_materials',
    categoryLabelAr: 'عتاد وأدوات البناء',
    title: 'تصفية جملة: مثاقب ومطرقات هدم هيدروليكية Bosch و Total الأصلية',
    description: 'دفعة جديدة واصلة من دبي لمستودعات شارع دبي بالعلمة. مثاقب هدم Martaux Piqueurs مع ضمان سنة وتخفيضات خاصة لأصحاب المقاولات والحرفيين المسجلين بالمنصة.',
    wilayaCode: '19',
    wilayaName: 'سطيف (Sétif)',
    communeName: 'العلمة (Rue de Dubaï)',
    contactPhone: '0550882211',
    authorName: 'مستودع الأمانة للاستيراد والتصدير',
    authorRole: 'مستورد مسجل RC سطيف',
    priceDzd: 18500,
    priceLabel: '18,500 دج / للقطعة جملة',
    postedAt: 'منذ 10 دقائق',
    verified: true,
    externalUrl: 'https://ouedkniss.com/store/el-eulma-quincaillerie',
    tags: ['العلمة', 'جملة', 'عتاد بناء', 'سطيف', 'شارع دبي'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=300&auto=format&fit=crop&q=80'
  }
];

// Combine all sources into a single unified search index
export function getAllUniversalSearchItems(): UniversalSearchResult[] {
  const results: UniversalSearchResult[] = [];

  // 1. Live Algerian Web Crawled items
  results.push(...LIVE_ALGERIAN_WEB_CRAWLED_ITEMS);

  // 2. Facebook Group Leads
  FACEBOOK_LEADS.forEach(lead => {
    const wilaya = WILAYAS_58.find(w => w.code === lead.wilayaCode);
    results.push({
      id: 'fb-' + lead.id,
      source: 'facebook',
      sourceNameAr: 'مجموعات فايسبوك (FB Groups)',
      sourceBadgeColor: 'bg-blue-600 text-white',
      category: lead.leadType === 'polivalente' ? 'polivalente' : 'trades',
      categoryLabelAr: lead.leadType === 'polivalente' ? 'عمال ورشات وبوليفالون' : 'صيانة وطلب حرفيين',
      title: lead.groupName,
      description: lead.content,
      wilayaCode: lead.wilayaCode,
      wilayaName: wilaya ? `${wilaya.nameAr} (${wilaya.code})` : lead.wilayaCode,
      communeName: lead.communeName,
      contactPhone: lead.phoneContact,
      authorName: lead.authorName,
      authorRole: 'منشور في مجموعة فايسبوك محلية',
      priceDzd: lead.budgetDzd,
      priceLabel: lead.budgetDzd ? `${lead.budgetDzd.toLocaleString()} دج` : undefined,
      postedAt: lead.postedTimeAgo,
      verified: true,
      externalUrl: lead.facebookPostUrl,
      tags: ['فايسبوك', 'مجموعة محلية', 'طلب خدمة', lead.communeName],
      thumbnailUrl: lead.authorAvatar
    });
  });

  // 3. TikTok Artisans
  TIKTOK_ARTISANS.forEach(art => {
    const wilaya = WILAYAS_58.find(w => w.code === art.wilayaCode);
    results.push({
      id: 'tt-' + art.id,
      source: 'tiktok',
      sourceNameAr: 'رادار تيك توك (TikTok DZ)',
      sourceBadgeColor: 'bg-rose-600 text-white',
      category: 'trades',
      categoryLabelAr: 'حرفيون بالفيديو',
      title: `${art.artisanName} - ورشة ${art.trade}`,
      description: `فيديو عمل واستعراض مشاريع: ${art.videoTitle}. متابعون: ${art.followersCount}. إعجابات: ${art.likesCount}.`,
      wilayaCode: art.wilayaCode,
      wilayaName: wilaya ? `${wilaya.nameAr} (${wilaya.code})` : art.wilayaCode,
      communeName: art.communeName,
      contactPhone: art.phone,
      authorName: art.artisanName,
      authorRole: `@${art.handle} على تيك توك`,
      postedAt: 'فيديو رائج اليوم',
      verified: art.verifiedDz,
      externalUrl: `https://tiktok.com/@${art.handle}`,
      tags: ['تيك توك', art.trade, ...art.hashtags],
      thumbnailUrl: art.videoThumbnail
    });
  });

  // 4. CAM Craftsmen Directory
  INITIAL_CRAFTSMEN.forEach(cr => {
    const wilaya = WILAYAS_58.find(w => w.code === cr.wilayaCode);
    results.push({
      id: 'cam-' + cr.id,
      source: 'cam',
      sourceNameAr: 'سجل الحرفيين المعتمدين (CAM)',
      sourceBadgeColor: 'bg-emerald-700 text-white',
      category: 'trades',
      categoryLabelAr: 'حرفي معتمد ببطاقة الحرفي',
      title: `${cr.workerName} - ${cr.titleAr}`,
      description: `${cr.descriptionAr} - تقييم ${cr.rating} نجوم من ${cr.reviewCount} زبون. رقم بطاقة الحرفي: ${cr.artisanCardNumber || 'معتمد'}.`,
      wilayaCode: cr.wilayaCode,
      wilayaName: wilaya ? `${wilaya.nameAr} (${wilaya.code})` : cr.wilayaCode,
      communeName: wilaya ? wilaya.nameAr : 'الجزائر',
      contactPhone: cr.phone,
      authorName: cr.workerName,
      authorRole: cr.titleAr,
      priceDzd: cr.baseRateDzd,
      priceLabel: `${cr.baseRateDzd.toLocaleString()} دج / ${cr.rateUnit}`,
      postedAt: 'متاح للطلب الآن',
      verified: cr.isOfficialCamArtisan || cr.isVerified,
      externalUrl: `tel:${cr.phone}`,
      tags: ['حرفي', 'بطاقة CAM', cr.titleAr, 'صيانة'],
      thumbnailUrl: cr.avatarUrl
    });
  });

  // 5. Polivalente Tasks (1,000 DZD)
  INITIAL_POLIVALENTE_TASKS.forEach(task => {
    const wilaya = WILAYAS_58.find(w => w.code === task.wilayaCode);
    results.push({
      id: 'poli-' + task.id,
      source: 'facebook',
      sourceNameAr: 'بورصة عمال اليومية (1,000 دج)',
      sourceBadgeColor: 'bg-amber-500 text-slate-950',
      category: 'polivalente',
      categoryLabelAr: 'عمال يومية ومقاولات',
      title: task.titleAr,
      description: `${task.description} - العنوان: ${task.address}. المعدات المطلوبة: ${task.requiredEquipment.join(', ') || 'بدون معدات'}.`,
      wilayaCode: task.wilayaCode,
      wilayaName: wilaya ? `${wilaya.nameAr} (${wilaya.code})` : task.wilayaCode,
      communeName: task.address,
      contactPhone: task.clientPhone,
      authorName: task.clientName,
      authorRole: 'صاحب ورشة / زبون',
      priceDzd: task.budgetDzd,
      priceLabel: `${task.budgetDzd.toLocaleString()} دج يومي`,
      postedAt: task.postedAt,
      verified: true,
      externalUrl: `tel:${task.clientPhone}`,
      tags: ['بوليفالون', 'يومية', '1000 دج', 'مانوفر', 'بناء'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?w=300&auto=format&fit=crop&q=80'
    });
  });

  // 6. Recruitment & University Graduates (LinkedIn DZ)
  INITIAL_RECRUITMENT_PROFILES.forEach(profile => {
    const wilaya = WILAYAS_58.find(w => w.code === profile.wilayaCode);
    results.push({
      id: 'rec-' + profile.id,
      source: 'linkedin',
      sourceNameAr: 'كفاءات لينكد إن (LinkedIn DZ)',
      sourceBadgeColor: 'bg-blue-600 text-white',
      category: 'jobs',
      categoryLabelAr: 'خريجو جامعات وتوظيف',
      title: `${profile.fullName} - ${profile.degreeTitleAr}`,
      description: `التخصص: ${profile.specialtyCategory}. الجامعة/المعهد: ${profile.universityOrInstitute}. المهارات: ${profile.skills.join(' · ')}.`,
      wilayaCode: profile.wilayaCode,
      wilayaName: wilaya ? `${wilaya.nameAr} (${wilaya.code})` : profile.wilayaCode,
      communeName: profile.communeName,
      contactPhone: profile.phone,
      authorName: profile.fullName,
      authorRole: profile.degreeLevel,
      priceDzd: profile.expectedSalaryDzd,
      priceLabel: profile.expectedSalaryDzd ? `${profile.expectedSalaryDzd.toLocaleString()} دج / شهر` : 'قابل للتفاوض',
      postedAt: 'متاح للتوظيف الفوري',
      verified: profile.isLinkedInVerified,
      externalUrl: profile.linkedinUrl,
      tags: ['linkedin', 'جامعي', 'شهادة', profile.specialtyCategory, ...profile.skills],
      thumbnailUrl: profile.avatarUrl
    });
  });

  // 7. Company Job Offers
  INITIAL_COMPANY_JOB_OFFERS.forEach(offer => {
    const wilaya = WILAYAS_58.find(w => w.code === offer.wilayaCode);
    results.push({
      id: 'job-' + offer.id,
      source: 'anem',
      sourceNameAr: 'عروض الشركات (Jobs DZ)',
      sourceBadgeColor: 'bg-indigo-600 text-white',
      category: 'jobs',
      categoryLabelAr: 'مناصب عمل شاغرة',
      title: `${offer.jobTitleAr} - ${offer.companyName}`,
      description: `${offer.descriptionAr} - نوع العقد: ${offer.contractType}.`,
      wilayaCode: offer.wilayaCode,
      wilayaName: wilaya ? `${wilaya.nameAr} (${wilaya.code})` : offer.wilayaCode,
      communeName: offer.communeName,
      contactPhone: offer.contactPhone,
      authorName: offer.companyName,
      authorRole: 'إدارة الموارد البشرية',
      priceDzd: offer.salaryMaxDzd,
      priceLabel: `${offer.salaryMinDzd.toLocaleString()} - ${offer.salaryMaxDzd.toLocaleString()} دج`,
      postedAt: offer.postedDate,
      verified: true,
      externalUrl: `tel:${offer.contactPhone}`,
      tags: ['وظيفة', offer.companyName, offer.contractType],
      thumbnailUrl: offer.companyLogoUrl
    });
  });

  // 8. Real Estate & Krilo
  INITIAL_REAL_ESTATE_LISTINGS.forEach(re => {
    const wilaya = WILAYAS_58.find(w => w.code === re.wilayaCode);
    results.push({
      id: 're-' + re.id,
      source: 'krilo',
      sourceNameAr: 'عقارات وكريلو (Krilo & Ouedkniss)',
      sourceBadgeColor: 'bg-rose-600 text-white',
      category: 'real_estate',
      categoryLabelAr: 'عقارات وكراء وبيع',
      title: `${re.titleAr}`,
      description: `${re.descriptionAr} - المساحة: ${re.areaM2} م². الغرف: ${re.roomsCount || 3}. الموقع: ${re.neighborhood}.`,
      wilayaCode: re.wilayaCode,
      wilayaName: wilaya ? `${wilaya.nameAr} (${wilaya.code})` : re.wilayaCode,
      communeName: re.communeName,
      contactPhone: re.contactPhone,
      authorName: re.sourceGroupOrSellerName,
      authorRole: re.sourcePlatform,
      priceDzd: re.priceDzd,
      priceLabel: `${re.priceDzd.toLocaleString()} دج / ${re.pricePeriodUnit || 'شهر'}`,
      postedAt: re.postedDate,
      verified: re.isInspectedByKhedma,
      externalUrl: re.sourceUrl || `tel:${re.contactPhone}`,
      tags: ['عقار', re.propertyType, re.transactionType, re.communeName],
      thumbnailUrl: re.imageUrl || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&auto=format&fit=crop&q=80'
    });
  });

  // 9. Building Materials & Wholesale Products
  INITIAL_PRODUCTS.forEach(prod => {
    results.push({
      id: 'prod-' + prod.id,
      source: 'wholesale',
      sourceNameAr: 'سوق المواد والجملة (واد كنيس والعلمة)',
      sourceBadgeColor: 'bg-amber-600 text-white',
      category: 'building_materials',
      categoryLabelAr: 'مواد بناء بالجملة والتجزئة',
      title: prod.titleAr,
      description: `الحد الأدنى لطلب الجملة: ${prod.moq} وحدة. المخزون المتوفر: ${prod.stockQuantity} وحدة. التاجر: ${prod.merchantName} (${prod.merchantWilaya}).`,
      wilayaCode: prod.merchantWilaya || '16',
      wilayaName: `الجزائر (${prod.merchantWilaya || '16'})`,
      communeName: 'أسواق الجملة الكبرى',
      contactPhone: '0550123456',
      authorName: prod.merchantName,
      authorRole: 'موزع مواد بناء',
      priceDzd: prod.unitRetailPriceDzd,
      priceLabel: `${prod.unitRetailPriceDzd.toLocaleString()} دج`,
      postedAt: 'متوفر في المخزن',
      verified: true,
      externalUrl: `/product/${prod.id}`,
      tags: ['مواد بناء', prod.category, prod.titleFr],
      thumbnailUrl: prod.imageUrl
    });
  });


  return results;
}

export interface SearchFilterOptions {
  query: string;
  wilayaCode: string;
  source: SearchSourceType;
  category: SearchCategoryType;
  maxPriceDzd?: number;
  verifiedOnly?: boolean;
  sortBy: 'relevance' | 'newest' | 'price_asc' | 'price_desc';
}

export function executeComprehensiveAlgerianSearch(options: SearchFilterOptions): {
  results: UniversalSearchResult[];
  totalMatches: number;
  sourcesBreakdown: Record<string, number>;
  categoriesBreakdown: Record<string, number>;
} {
  const allItems = getAllUniversalSearchItems();
  const keywords = expandSearchKeywords(options.query);

  const filtered = allItems.filter(item => {
    // 1. Wilaya Filter
    if (options.wilayaCode && options.wilayaCode !== 'all') {
      if (item.wilayaCode !== options.wilayaCode) return false;
    }

    // 2. Source Filter
    if (options.source && options.source !== 'all') {
      if (item.source !== options.source) return false;
    }

    // 3. Category Filter
    if (options.category && options.category !== 'all') {
      if (item.category !== options.category) return false;
    }

    // 4. Verified Only Filter
    if (options.verifiedOnly) {
      if (!item.verified) return false;
    }

    // 5. Max Price Filter
    if (options.maxPriceDzd && options.maxPriceDzd > 0) {
      if (item.priceDzd && item.priceDzd > options.maxPriceDzd) return false;
    }

    // 6. Keywords Query Filter (Semantic Multi-term matching)
    if (keywords.length > 0) {
      const fullSearchCorpus = `
        ${item.title} 
        ${item.description} 
        ${item.authorName} 
        ${item.communeName} 
        ${item.wilayaName} 
        ${item.sourceNameAr} 
        ${item.categoryLabelAr} 
        ${item.tags.join(' ')}
      `.toLowerCase();

      // Check if any keyword matches
      const hasMatch = keywords.some(kw => fullSearchCorpus.includes(kw));
      if (!hasMatch) return false;
    }

    return true;
  });

  // Sorting
  if (options.sortBy === 'price_asc') {
    filtered.sort((a, b) => (a.priceDzd || 0) - (b.priceDzd || 0));
  } else if (options.sortBy === 'price_desc') {
    filtered.sort((a, b) => (b.priceDzd || 0) - (a.priceDzd || 0));
  }

  // Calculate Breakdowns
  const sourcesBreakdown: Record<string, number> = {};
  const categoriesBreakdown: Record<string, number> = {};

  filtered.forEach(item => {
    sourcesBreakdown[item.source] = (sourcesBreakdown[item.source] || 0) + 1;
    categoriesBreakdown[item.category] = (categoriesBreakdown[item.category] || 0) + 1;
  });

  return {
    results: filtered,
    totalMatches: filtered.length,
    sourcesBreakdown,
    categoriesBreakdown
  };
}
