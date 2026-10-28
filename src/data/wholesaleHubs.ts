import { OuedknissItem } from '../types';

export interface WholesaleMarketHub {
  id: string;
  nameAr: string;
  nameFr: string;
  wilayaCode: string;
  communeName: string;
  specialties: string[];
  famousStreets: string[];
  workerServices: {
    serviceNameAr: string;
    serviceNameFr: string;
    description: string;
    averageRateDzd: string;
    unit: string;
    equipmentRequired: string[];
  }[];
  activeWholesaleWorkersCount: number;
  dailyContainersCount: number;
  contactUnionPhone: string;
}

export const WHOLESALE_MARKET_HUBS: WholesaleMarketHub[] = [
  {
    id: 'hub-el-eulma',
    nameAr: 'سوق الجملة العلمة - سطيف (شارع دبي)',
    nameFr: 'Pôle Commercial de Gros El Eulma (Rue de Dubaï)',
    wilayaCode: '19',
    communeName: 'العلمة (El Eulma)',
    specialties: ['الكهرومنزلية', 'خردوات ومعدات البناء (Quincaillerie)', 'الأدوات الكهربائية', 'قطع الغيار والإلكترونيات'],
    famousStreets: ['شارع دبي (Rue de Dubaï)', 'حي صخراوي', 'المنطقة الحرفية والمستودعات', 'طريق قسنطينة'],
    workerServices: [
      {
        serviceNameAr: 'تفريغ حاويات 40 قدم (Dépotage Conteneur 40ft)',
        serviceNameFr: 'Dépotage Conteneur 40 pieds',
        description: 'فريق من 4 إلى 6 عمال متمرسين لتفريغ حاوية كاملة 40 قدم كهرومنزلية أو عتاد بناء، ترتيب الكراتين والعد وفق البوليصة.',
        averageRateDzd: '22,000 - 28,000 دج',
        unit: 'لكل حاوية',
        equipmentRequired: ['أحذية أمان', 'قفازات مضادة للانزلاق', 'عربات يدوية (Diable)']
      },
      {
        serviceNameAr: 'تفريغ حاويات 20 قدم (Dépotage Conteneur 20ft)',
        serviceNameFr: 'Dépotage Conteneur 20 pieds',
        description: 'تفريغ حاوية 20 قدم ونقل البضائع للمستودعات الأرضية أو الطوابق مع المراقبة.',
        averageRateDzd: '14,000 - 18,000 دج',
        unit: 'لكل حاوية',
        equipmentRequired: ['أحزمة ظهر داعمة', 'قفازات سميكة']
      },
      {
        serviceNameAr: 'سائق رافعة شوكية للمستودعات (Cariste Chariot Élévateur)',
        serviceNameFr: 'Cariste Chariot Élévateur & Gerbeur',
        description: 'سائق معتمد لقيادة الشاريو الهيدروليكي، رفع الباليتات في الرفوف العالية وتجهيز طلبيات تجار الولايات.',
        averageRateDzd: '4,500 - 6,000 دج',
        unit: 'لكل يوم عمل',
        equipmentRequired: ['شهادة كفاءة مهنية Cariste', 'خوذة أمان']
      },
      {
        serviceNameAr: 'شحن وموازنة حمولة الشاحنات للولايات (Chargement Semi-remorque)',
        serviceNameFr: 'Chargement & Arrimage Semi-remorque',
        description: 'ترتيب وتثبيت الشحنات الكبرى المتجهة لولايات الشرق والجنوب والغرب بأمان لمنع الكسر أثناء السير.',
        averageRateDzd: '8,000 - 12,000 دج',
        unit: 'لكل شاحنة نصف مقطورة',
        equipmentRequired: ['أحزمة شد هيدروليكية (Sangles à cliquet)', 'زوايا حماية الكراتين']
      },
      {
        serviceNameAr: 'كولياج وتحميل سريع للمتسوقين (Chargement Express Client)',
        serviceNameFr: 'Chargement Express Commerçants',
        description: 'تحميل كراتين ومشتريات التجار في سيارات النفعية (Master, Boxer, Harbin) مباشرة بعد الشراء.',
        averageRateDzd: '1,500 - 3,000 دج',
        unit: 'لكل مركبة نفعية',
        equipmentRequired: ['عربة يدوية Diable']
      }
    ],
    activeWholesaleWorkersCount: 1420,
    dailyContainersCount: 85,
    contactUnionPhone: '0560119922'
  },
  {
    id: 'hub-el-hamiz',
    nameAr: 'سوق الجملة الحميز - الجزائر العاصمة',
    nameFr: 'Zone Commerciale de Gros El Hamiz (Alger)',
    wilayaCode: '16',
    communeName: 'الدار البيضاء / الحميز',
    specialties: ['مواد البناء والعوازل', 'السباكة والأدوات الصحية', 'السيراميك والرخام', 'الكهرباء والتبريد والتكييف'],
    famousStreets: ['الشارع الرئيسي الحميز', 'طريق برج الكيفان', 'حي المصانع والمستودعات', 'طريق الأربعاء'],
    workerServices: [
      {
        serviceNameAr: 'تنزيل شاحنات الإسمنت والجبس (Déchargement Ciment & Plâtre)',
        serviceNameFr: 'Déchargement Sacs Ciment & Plâtre 50kg',
        description: 'فريق عمال أشداء لتفريغ 300 إلى 600 كيس إسمنت أو جبس كناوف وتكديسها في المستودع المظلل.',
        averageRateDzd: '12,000 - 18,000 دج',
        unit: 'لكل شاحنة حمولة 25 طن',
        equipmentRequired: ['كمامات غبار', 'قفازات متينة', 'أحذية عمل مقواة']
      },
      {
        serviceNameAr: 'مناولة ونقل السيراميك والبورسلان (Manutention Faïence & Carrelage)',
        serviceNameFr: 'Manutention Palette Carrelage & Dalles',
        description: 'تفريغ وتوزيع كراتين السيراميك الحساس للكسر بالرافعة اليدوية وتجهيز شحنات الورشات السكنية الكبرى.',
        averageRateDzd: '3,500 - 5,000 دج',
        unit: 'لكل يوم عمل للعامل',
        equipmentRequired: ['ترولي نقل سيراميك', 'قفازات مطاطية عالية التماسك']
      },
      {
        serviceNameAr: 'توصيل وتفريغ الورشات العاجل بالعاصمة والضواحي (Livraison Chantier Express)',
        serviceNameFr: 'Livraison Express Chantiers Alger & Mitidja',
        description: 'سائق مع شاحنة صغيرة بيك آب أو هاربين + عامل تنزيل لنقل السلعة من الحميز مباشرة إلى ورشة الزبون.',
        averageRateDzd: '4,000 - 7,500 دج',
        unit: 'للرحلة الواحدة',
        equipmentRequired: ['شاحنة نفعية', 'سير تثبيت']
      },
      {
        serviceNameAr: 'تخزين وتركيب خزانات المياه والمضخات الكبرى (Manutention Citernes)',
        serviceNameFr: 'Manutention Citernes & Pompes Industrielles',
        description: 'رفع ونقل خزانات المياه البولي إيثيلين من 1000 لتر إلى 5000 لتر وتثبيتها فوق أسطح ومستودعات الحميز.',
        averageRateDzd: '2,500 - 4,500 دج',
        unit: 'للخزان الواحد',
        equipmentRequired: ['حبال رفع سميكة', 'سلالم تسلق']
      }
    ],
    activeWholesaleWorkersCount: 1890,
    dailyContainersCount: 110,
    contactUnionPhone: '0555338811'
  },
  {
    id: 'hub-tadjenanet',
    nameAr: 'سوق الجملة الأسبوعي تاجنانت - ميلة',
    nameFr: 'Grand Marché de Gros Tadjenanet (Mila)',
    wilayaCode: '43',
    communeName: 'تاجنانت (Tadjenanet)',
    specialties: ['قطع غيار السيارات المستعملة والمستوردة', 'خردة المعادن ومواد البناء', 'الأجهزة والأثاث'],
    famousStreets: ['السوق الأسبوعي تاجنانت', 'طريق شلغوم العيد', 'المنطقة الحرفية'],
    workerServices: [
      {
        serviceNameAr: 'تفكيك وتحميل المحركات وقطع الغيار الثقيلة (Démontage & Manutention Moteurs)',
        serviceNameFr: 'Manutention Moteurs & Boîtes de Vitesse',
        description: 'عمال ورافعات يدوية لإنزال المحركات وعلب السرعات من الشاحنات وعرضها للتجار.',
        averageRateDzd: '3,500 - 5,500 دج',
        unit: 'يومية عمل',
        equipmentRequired: ['رافعة هيدروليكية صغيرة Chèvre', 'مفاتيح ميكانيك']
      },
      {
        serviceNameAr: 'تحميل الخردة وحديد الهدم (Chargement Ferraille & Métaux)',
        serviceNameFr: 'Chargement Ferraille & Découpe Chalumeau',
        description: 'تجميع وقص خردة الحديد والصلب بشعلة الأكسجين وشحنها لشاحنات مصانع الصهر بالحجار وبلارة.',
        averageRateDzd: '5,000 - 8,000 دج',
        unit: 'يومية مقطوعة',
        equipmentRequired: ['نظارات حماية التلحيم', 'قفازات جلد سميكة']
      }
    ],
    activeWholesaleWorkersCount: 920,
    dailyContainersCount: 45,
    contactUnionPhone: '0661224488'
  },
  {
    id: 'hub-boudouaou',
    nameAr: 'سوق الجملة بودواو - بومرداس',
    nameFr: 'Zone de Gros Boudouaou (Boumerdès)',
    wilayaCode: '35',
    communeName: 'بودواو (Boudouaou)',
    specialties: ['أنابيب الري البلاستيكية PVC / PEHD', 'الخشب والألواح والنجارة', 'مستلزمات البيوت البلاستيكية'],
    famousStreets: ['طريق قدارة', 'منطقة المستودعات المركزية', 'طريق الرغاية'],
    workerServices: [
      {
        serviceNameAr: 'تفريغ وتكديس لفات أنابيب الـ PEHD والري (Bobines Tuyaux PEHD)',
        serviceNameFr: 'Manutention Tuyaux Irrigation & Goutte-à-Goutte',
        description: 'مناولة وتفريغ شاحنات أنابيب الري الفلاحي وتجهيز طلبيات ولايات الهضاب والجنوب.',
        averageRateDzd: '3,000 - 4,500 دج',
        unit: 'يومية عامل',
        equipmentRequired: ['قفازات عمل', 'أحزمة سحب']
      },
      {
        serviceNameAr: 'تنزيل وترتيب ألواح الخشب والميلامين (Déchargement Panneaux MDF / Bois)',
        serviceNameFr: 'Déchargement Bois Blanc & MDF',
        description: 'تفريغ ألواح الخشب الكبيرة دون خدش أو كسر بالزوايا وتخزينها في عنابر جافة.',
        averageRateDzd: '3,500 - 5,000 دج',
        unit: 'يومية عامل',
        equipmentRequired: ['قفازات مضادة للانزلاق', 'رافعات يدوية']
      }
    ],
    activeWholesaleWorkersCount: 680,
    dailyContainersCount: 38,
    contactUnionPhone: '0770559933'
  },
  {
    id: 'hub-es-senia',
    nameAr: 'سوق ومستودعات الجملة السانية - وهران',
    nameFr: 'Zone Industrielle & de Gros Es Sénia (Oran)',
    wilayaCode: '31',
    communeName: 'السانية (Es Sénia)',
    specialties: ['المعدات الصناعية والبحرية', 'خردوات الغرب الجزائري', 'الألمنيوم والمقاطع المعدنية', 'الدهانات والمواد الكيميائية'],
    famousStreets: ['المنطقة الصناعية السانية', 'طريق الكرمة', 'طريق سيدي الشحمي'],
    workerServices: [
      {
        serviceNameAr: 'تفريغ الحاويات القادمة من ميناء وهران (Dépotage Port d’Oran)',
        serviceNameFr: 'Dépotage Conteneurs Port d’Oran',
        description: 'تفريغ سريع للحاويات فور وصولها من ميناء وهران لتفادي غرامات مكوث الحاويات (Surestaries).',
        averageRateDzd: '20,000 - 26,000 دج',
        unit: 'لكل حاوية',
        equipmentRequired: ['شاريو شوكي', 'أحذية أمان معتمدة']
      },
      {
        serviceNameAr: 'تحميل صفائح وبروفايلات الألمنيوم (Manutention Profilés Aluminium)',
        serviceNameFr: 'Chargement Profilés & Tôles Alu',
        description: 'مناولة مقاطع الألمنيوم الحساسة للخدش والتغليف بالبلاستيك الفقاعي للورشات.',
        averageRateDzd: '3,500 - 5,000 دج',
        unit: 'يومية عامل',
        equipmentRequired: ['قفازات قماش ناعمة لمنع الخدش']
      }
    ],
    activeWholesaleWorkersCount: 1150,
    dailyContainersCount: 62,
    contactUnionPhone: '0561993300'
  }
];

export const OUEDKNISS_MOCK_ITEMS: OuedknissItem[] = [
  {
    id: 'ok-1',
    titleAr: 'سقالة بناء معدنية 150م² كاملة مع الألواح والسلاليم',
    titleFr: 'Échafaudage Métallique Occasion 150m² Complet avec Plateaux',
    priceDzd: 185000,
    wilayaCode: '16',
    communeName: 'الرويبة (Rouïba)',
    condition: 'tres_bon_etat',
    sellerName: 'كمال مقاولات بوعلام',
    sellerPhone: '0550112233',
    postedDate: 'منذ ساعتين',
    viewsCount: 342,
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?w=600&auto=format&fit=crop&q=80',
    category: 'tools',
    ouedknissUrl: 'https://www.ouedkniss.com/echafaudage-metallique-150m2-rouiba-alger-d482910',
    isKhedmaVerifiedPartner: true,
    priceComparisonNote: 'أرخص بـ 25% من سعر الجديد في مستودعات الحميز'
  },
  {
    id: 'ok-2',
    titleAr: 'خلاطة إسمنت 350 لتر أصلية بمحرك بنزين هوندا 6.5 حصان',
    titleFr: 'Bétonnière Altrad 350L Moteur Honda GX160 Pro',
    priceDzd: 128000,
    wilayaCode: '19',
    communeName: 'العلمة (El Eulma)',
    condition: 'neuf',
    sellerName: 'سوق الجملة العلمة - قاعة العرض',
    sellerPhone: '0771445566',
    postedDate: 'منذ 3 ساعات',
    viewsCount: 512,
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
    category: 'machinery',
    ouedknissUrl: 'https://www.ouedkniss.com/betonniere-altrad-350l-el-eulma-setif-d991823',
    isKhedmaVerifiedPartner: true,
    priceComparisonNote: 'سعر الجملة المباشر مع فاتورة وضمان سنة'
  },
  {
    id: 'ok-3',
    titleAr: 'شاحنة هيونداي H100 بلاتوه باشي 2018 نقية لحرفيي البناء',
    titleFr: 'Hyundai H100 Plateau Bâché Année 2018 Parfait État',
    priceDzd: 2650000,
    wilayaCode: '09',
    communeName: 'بوفاريك (Boufarik)',
    condition: 'tres_bon_etat',
    sellerName: 'حسين للنقل الحرفي',
    sellerPhone: '0662778899',
    postedDate: 'منذ 4 ساعات',
    viewsCount: 1240,
    imageUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=600&auto=format&fit=crop&q=80',
    category: 'vehicles',
    ouedknissUrl: 'https://www.ouedkniss.com/hyundai-h100-plateau-bache-boufarik-blida-d771029',
    isKhedmaVerifiedPartner: false,
    priceComparisonNote: 'شاحنة جاهزة لنقل عتاد البناء والسلعة'
  },
  {
    id: 'ok-4',
    titleAr: 'تصفية مخازن: 300 متر مربع فايونس 60×60 إسباني نوعية أولى',
    titleFr: 'Déstockage Faïence 60x60 Grès Cérame Émaillé 300m²',
    priceDzd: 1650,
    wilayaCode: '16',
    communeName: 'الحميز (El Hamiz)',
    condition: 'destockage',
    sellerName: 'مستودع الأمانة الحميز',
    sellerPhone: '0555882244',
    postedDate: 'منذ 5 ساعات',
    viewsCount: 890,
    imageUrl: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=600&auto=format&fit=crop&q=80',
    category: 'materials',
    ouedknissUrl: 'https://www.ouedkniss.com/destockage-faience-60x60-el-hamiz-alger-d339102',
    isKhedmaVerifiedPartner: true,
    priceComparisonNote: 'تخفيض 35% مقارنة بسعر التجزئة العام'
  },
  {
    id: 'ok-5',
    titleAr: 'مارطو بيكور هيلتي TE 1000-AVR أصلي في الحقيبة',
    titleFr: 'Marteau Piqueur Hilti TE 1000-AVR Original dans la Mallette',
    priceDzd: 165000,
    wilayaCode: '31',
    communeName: 'السانية (Es Sénia)',
    condition: 'bon_etat',
    sellerName: 'مؤسسة الغرب للمعدات',
    sellerPhone: '0560334411',
    postedDate: 'منذ يوم واحد',
    viewsCount: 420,
    imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=600&auto=format&fit=crop&q=80',
    category: 'tools',
    ouedknissUrl: 'https://www.ouedkniss.com/hilti-te1000-avr-es-senia-oran-d118290',
    isKhedmaVerifiedPartner: true,
    priceComparisonNote: 'أصلي سويسري مفحوص ومضمون'
  }
];
