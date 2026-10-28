import { ProductItem, ServiceListing, PolivalenteTask, FreelanceService, PaymentProof, ChatMessage, DisputeRecord } from '../types';

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    merchantId: 'merch-101',
    merchantName: 'Ets Benali Matériaux & Quincaillerie',
    merchantWilaya: '02', // Chlef
    merchantRating: 4.9,
    titleAr: 'إسمنت بورتلاندي مركب CPA 42.5 (كيس 50 كغ)',
    titleFr: 'Ciment Portland Composé CPA 42.5 (Sac 50kg)',
    titleEn: 'Portland Composite Cement CPA 42.5 (50kg Bag)',
    category: 'construction',
    unitRetailPriceDzd: 650,
    moq: 50,
    bulkPricingTiers: [
      { minQty: 1, priceDzd: 650 },
      { minQty: 50, priceDzd: 580 },
      { minQty: 200, priceDzd: 540 }
    ],
    stockQuantity: 1400,
    depotGps: { lat: 36.165, lng: 1.334, address: 'Zone Industrielle Oued Sly, Chlef' },
    isClearance: false,
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80',
    specifications: {
      'Norme': 'NA 442 / EN 197-1',
      'Résistance à 28 jours': '42.5 MPa',
      'Origine': 'Cimenterie ECDE Chlef'
    }
  },
  {
    id: 'prod-2',
    merchantId: 'merch-102',
    merchantName: 'Sétif Gros Bâtiment & Plâtre',
    merchantWilaya: '19', // Sétif
    merchantRating: 4.8,
    titleAr: 'ألواح الجبس العازلة BA13 مائية (2.5م × 1.2م)',
    titleFr: 'Plaque de Plâtre Hydrofuge BA13 (2.5m x 1.2m)',
    titleEn: 'Moisture Resistant BA13 Plasterboard (2.5m x 1.2m)',
    category: 'finishing',
    unitRetailPriceDzd: 1250,
    moq: 30,
    bulkPricingTiers: [
      { minQty: 1, priceDzd: 1250 },
      { minQty: 30, priceDzd: 1080 },
      { minQty: 100, priceDzd: 990 }
    ],
    stockQuantity: 620,
    depotGps: { lat: 36.189, lng: 5.411, address: 'Comptoir de Gros El Eulma, Sétif' },
    isClearance: false,
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80',
    specifications: {
      'Épaisseur': '12.5 mm',
      'Usage': 'Cuisine, Salle de bain & Faux-plafonds',
      'Marque': 'Knauf Algérie'
    }
  },
  {
    id: 'prod-3',
    merchantId: 'merch-103',
    merchantName: 'Briquetterie du Hodna & Matériaux',
    merchantWilaya: '28', // M'Sila
    merchantRating: 4.7,
    titleAr: 'آجر أحمر طيني 8 ثقوب عازل (Palette 420 pcs)',
    titleFr: 'Brique Rouge Terre Cuite 8 Trous (Palette 420 pcs)',
    titleEn: 'Clay Red Brick 8 Holes (Palette 420 pcs)',
    category: 'construction',
    unitRetailPriceDzd: 38,
    moq: 500,
    bulkPricingTiers: [
      { minQty: 1, priceDzd: 38 },
      { minQty: 500, priceDzd: 32 },
      { minQty: 2500, priceDzd: 28 }
    ],
    stockQuantity: 18000,
    depotGps: { lat: 35.705, lng: 4.542, address: 'Route Nationale 45, M’Sila' },
    isClearance: true,
    clearanceDiscountPercent: 20,
    imageUrl: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=600&auto=format&fit=crop&q=80',
    specifications: {
      'Dimensions': '10 x 20 x 20 cm',
      'Poids unitaire': '2.4 kg',
      'Résistance thermique': 'Conforme DTR Algérien'
    }
  },
  {
    id: 'prod-4',
    merchantId: 'merch-104',
    merchantName: 'Mitidja Sanitaire & Hydraulique',
    merchantWilaya: '09', // Blida
    merchantRating: 4.9,
    titleAr: 'أنابيب النحاس الصحي 14 مم سمك 1 مم (لفة 25 متر)',
    titleFr: 'Tube Cuivre Écroui Sanitaire 14mm (Couronne 25m)',
    titleEn: 'Sanitary Copper Pipe 14mm (25m Coil)',
    category: 'plumbing',
    unitRetailPriceDzd: 16500,
    moq: 5,
    bulkPricingTiers: [
      { minQty: 1, priceDzd: 16500 },
      { minQty: 5, priceDzd: 14800 },
      { minQty: 20, priceDzd: 13900 }
    ],
    stockQuantity: 85,
    depotGps: { lat: 36.471, lng: 2.828, address: 'Zone Industrielle Ben Boulaid, Blida' },
    isClearance: false,
    imageUrl: 'https://images.unsplash.com/photo-1542013936693-884638332954?w=600&auto=format&fit=crop&q=80',
    specifications: {
      'Diamètre': '14 mm',
      'Épaisseur': '1.0 mm',
      'Pression de service': 'Jusqu’à 45 bar'
    }
  },
  {
    id: 'prod-5',
    merchantId: 'merch-105',
    merchantName: 'Oran Électro-Câbles & Outillage',
    merchantWilaya: '31', // Oran
    merchantRating: 4.8,
    titleAr: 'كابل نحاسي معزول U1000 R2V (3x2.5 مم² - بكرة 100م)',
    titleFr: 'Câble Rigide Cuivre U1000 R2V 3G2.5mm² (Touret 100m)',
    titleEn: 'Rigid Copper Cable 3G2.5mm² (100m Reel)',
    category: 'electrical',
    unitRetailPriceDzd: 18200,
    moq: 3,
    bulkPricingTiers: [
      { minQty: 1, priceDzd: 18200 },
      { minQty: 3, priceDzd: 16900 },
      { minQty: 10, priceDzd: 15800 }
    ],
    stockQuantity: 110,
    depotGps: { lat: 35.651, lng: -0.633, address: 'Zone Industrielle Es Sénia, Oran' },
    isClearance: false,
    imageUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=600&auto=format&fit=crop&q=80',
    specifications: {
      'Section': '3 x 2.5 mm²',
      'Tension nominale': '600 / 1000V',
      'Fabricant': 'ENICAB Algérie'
    }
  },
  {
    id: 'prod-6',
    merchantId: 'merch-106',
    merchantName: 'Sahara Pompes & Énergie Solaire',
    merchantWilaya: '39', // El Oued
    merchantRating: 5.0,
    titleAr: 'مضخة غاطسة للآبار العميقة 5.5 حصان 380V تدفق عالي',
    titleFr: 'Pompe Immergée de Forage 5.5 CV Triphasé 380V',
    titleEn: 'Submersible Deep Well Borehole Pump 5.5 HP 380V',
    category: 'plumbing',
    unitRetailPriceDzd: 145000,
    moq: 2,
    bulkPricingTiers: [
      { minQty: 1, priceDzd: 145000 },
      { minQty: 2, priceDzd: 135000 },
      { minQty: 5, priceDzd: 128000 }
    ],
    stockQuantity: 28,
    depotGps: { lat: 33.368, lng: 6.867, address: 'Avenue de la République, El Oued' },
    isClearance: false,
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
    specifications: {
      'Puissance': '4 kW (5.5 HP)',
      'Immersion Max': '180 mètres',
      'Corps': 'Inox 304 résistant au sable saharien'
    }
  }
];

export const INITIAL_CRAFTSMEN: ServiceListing[] = [
  {
    id: 'craft-1',
    workerId: 'w-201',
    workerName: 'كمال بلقاسم (Kamal Belkacem)',
    phone: '0550123456',
    wilayaCode: '16', // Alger
    category: 'plumbing',
    titleAr: 'سباك صحي وكشف إلكتروني لتسربات المياه المخفية',
    titleFr: 'Plombier Sanitaire & Détection Fuites par Caméra Thermique',
    descriptionAr: 'خبرة 14 سنة في السباكة المنزلية، تركيب السخانات، شبكات الغاز، وإصلاح التسربات بالموجات الصوتية دون تكسير الجدران.',
    descriptionFr: '14 ans d’expérience en plomberie résidentielle, chaudières à gaz, et détection ultrasonore sans démolition.',
    baseRateDzd: 2500,
    rateUnit: 'job',
    rating: 4.95,
    reviewCount: 168,
    isVerified: true,
    isEmergencyAvailable: true,
    isOfficialCamArtisan: true,
    artisanCardNumber: '16/00-14892/A/21',
    artisanCamWilaya: 'غرفة الصناعة التقليدية والحرف - ولاية الجزائر (CAM Alger)',
    artisanCardExpiry: '2028-12-31',
    taxRegistrationNif: '198716001284910',
    badges: ['بطاقة حرفي رسمية (CAM)', 'موثق رسمياً (CNI)', 'كاميرا حرارية', 'سخان الماء'],
    toolsProvided: ['Appareil détection ultrason', 'Filière électrique', 'Poste soudure cuivre oxyacétylène'],
    avatarUrl: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'craft-2',
    workerId: 'w-202',
    workerName: 'عبد القادر معوش (Abdelkader Maouche)',
    phone: '0661987654',
    wilayaCode: '09', // Blida
    category: 'electrical',
    titleAr: 'كهربائي معتمد للمنازل والورشات وتركيب لوحات التوزيع',
    titleFr: 'Électricien Bâtiment Qualifié & Tableaux de Protection',
    descriptionAr: 'تجديد الأسلاك المنزلية، تأريض المآخذ (Prise de Terre)، توازن الأطوار 380V، وتأمين المنشآت ضد الصعق.',
    descriptionFr: 'Mise en conformité électrique, équilibrage des phases triphasé, prise de terre certifiée.',
    baseRateDzd: 1800,
    rateUnit: 'hour',
    rating: 4.88,
    reviewCount: 112,
    isVerified: true,
    isEmergencyAvailable: true,
    isOfficialCamArtisan: true,
    artisanCardNumber: '09/00-08912/A/22',
    artisanCamWilaya: 'غرفة الصناعة التقليدية والحرف - ولاية البليدة (CAM Blida)',
    artisanCardExpiry: '2027-06-30',
    taxRegistrationNif: '198209000891244',
    badges: ['بطاقة حرفي رسمية (CAM)', 'شهادة كفاءة مهنية', 'فحص التأريض', 'تريسيا موثق'],
    toolsProvided: ['Testeur de terre Megger', 'Pince ampèremétrique', 'Rainureuse à béton laser'],
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'craft-3',
    workerId: 'w-203',
    workerName: 'ياسين حمروني (Yassine Hamrouni)',
    phone: '0772345678',
    wilayaCode: '19', // Sétif
    category: 'drywall_ba13',
    titleAr: 'فني ديكور جبس وأسقف معلقة BA13 وإضاءة مخفية LED',
    titleFr: 'Artisan Plaquiste BA13 & Faux Plafonds Décoratifs',
    descriptionAr: 'تنفيذ أحدث ديكورات الصالونات، العوازل الصوتية، فواصل الجدران العصرية، وتثبيت البروفايل والأضواء المخفية بدقة ميليمترية.',
    descriptionFr: 'Réalisation de plafonds modernes, isolation phonique, caissons lumineux LED et cloisons.',
    baseRateDzd: 1600,
    rateUnit: 'm2',
    rating: 4.92,
    reviewCount: 94,
    isVerified: true,
    isEmergencyAvailable: false,
    isOfficialCamArtisan: true,
    artisanCardNumber: '19/00-21045/A/20',
    artisanCamWilaya: 'غرفة الصناعة التقليدية والحرف - ولاية سطيف (CAM Sétif)',
    artisanCardExpiry: '2028-04-15',
    badges: ['بطاقة حرفي رسمية (CAM)', 'معلم BA13', 'ليزر 360°', 'موثق رسمياً'],
    toolsProvided: ['Niveau laser 3D', 'Lève-plaque', 'Visseuse à bande automatique'],
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'craft-4',
    workerId: 'w-204',
    workerName: 'مراد دحماني (Mourad Dahmani)',
    phone: '0560889900',
    wilayaCode: '31', // Oran
    category: 'auto_mechanic',
    titleAr: 'ميكانيكي سيارات متنقل وخدمة نجدة الطريق 24/7',
    titleFr: 'Mécanicien Automobile Mobile & Dépannage 24/7',
    descriptionAr: 'إصلاح أعطال المحركات على الطريق، تغيير مضخات الماء، السيور (Courroie)، ومساعدات الفرامل في عين المكان.',
    descriptionFr: 'Réparation moteur sur site, courroie de distribution, freinage et assistance remorquage rapide.',
    baseRateDzd: 3000,
    rateUnit: 'job',
    rating: 4.91,
    reviewCount: 205,
    isVerified: true,
    isEmergencyAvailable: true,
    isOfficialCamArtisan: true,
    artisanCardNumber: '31/00-33129/A/19',
    artisanCamWilaya: 'غرفة الصناعة التقليدية والحرف - ولاية وهران (CAM Oran)',
    artisanCardExpiry: '2029-01-10',
    badges: ['بطاقة حرفي رسمية (CAM)', 'سيارة ورشة متنقلة', 'نجدة 24 ساعة', 'سكانير فوري'],
    toolsProvided: ['Chariot atelier complet', 'Cric hydraulique 3T', 'Valise diagnostic multimarque'],
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'craft-5',
    workerId: 'w-205',
    workerName: 'سمير بوزيد (Samir Bouzid)',
    phone: '0658771122',
    wilayaCode: '25', // Constantine
    category: 'obd2_diagnostics',
    titleAr: 'فحص إلكتروني وبرمجة عقول السيارات (Scan OBD-II)',
    titleFr: 'Diagnostic Électronique Embarqué & Scanner OBD-II',
    descriptionAr: 'قراءة كودات الأعطال، حذف لمبة المحرك (Check Engine)، إعادة ضبط حساسات الهواء والأكسجين، وبرمجة المفاتيح.',
    descriptionFr: 'Lecture calculateurs, diagnostic voyant moteur, réinitialisation capteurs DPF et codage.',
    baseRateDzd: 2000,
    rateUnit: 'job',
    rating: 4.87,
    reviewCount: 88,
    isVerified: true,
    isEmergencyAvailable: true,
    isOfficialCamArtisan: true,
    artisanCardNumber: '25/00-11208/A/23',
    artisanCamWilaya: 'غرفة الصناعة التقليدية والحرف - ولاية قسنطينة (CAM Constantine)',
    artisanCardExpiry: '2028-09-20',
    badges: ['بطاقة حرفي رسمية (CAM)', 'جهاز سكانير Launch Pro', 'حذف أخطاء DPF/EGR', 'موثق'],
    toolsProvided: ['Scanner Launch X431 Pro', 'Oscilloscope automobile', 'Testeur de batterie'],
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'craft-6',
    workerId: 'w-206',
    workerName: 'فاروق شريف (Farouk Cherif)',
    phone: '0770445566',
    wilayaCode: '07', // Biskra
    category: 'hvac_ac',
    titleAr: 'شحن غاز المكيفات وصيانة غرف التبريد الصحراوية',
    titleFr: 'Frigoriste & Climatisation Résidentielle et Industrielle',
    descriptionAr: 'شحن غاز R410A و R32 و R134A بمقاييس دقيقة، تنظيف المبخرات، إصلاح تسربات الكمبروسر ومكيفات درجات الحرارة العالية.',
    descriptionFr: 'Recharge fluide frigorigène R410a/R32, dépannage compresseur et entretien chambres froides.',
    baseRateDzd: 3500,
    rateUnit: 'job',
    rating: 4.96,
    reviewCount: 143,
    isVerified: true,
    isEmergencyAvailable: true,
    isOfficialCamArtisan: true,
    artisanCardNumber: '07/00-09431/A/22',
    artisanCamWilaya: 'غرفة الصناعة التقليدية والحرف - ولاية بسكرة (CAM Biskra)',
    artisanCardExpiry: '2027-11-15',
    badges: ['بطاقة حرفي رسمية (CAM)', 'غاز أصلي R410a', 'مضخة تفريغ فراغية', 'تكييف صحراوي'],
    toolsProvided: ['Manifold digital', 'Pompe à vide double étage', 'Balance électronique de charge'],
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_POLIVALENTE_TASKS: PolivalenteTask[] = [
  {
    id: 'poli-1',
    clientId: 'cli-301',
    clientName: 'أمين طهراوي (Amine Tahraoui)',
    clientPhone: '0555881122',
    wilayaCode: '16', // Alger
    address: 'حي البساتين، حيدرة، الجزائر العاصمة',
    titleAr: 'نقل أثاث منزلي كامل (طابق 3 بدون مصعد) إلى حيدرة',
    titleFr: 'Déménagement Appartement F4 (3ème Étage sans Ascenseur)',
    description: 'نحتاج عاملين أشداء للمساعدة في إنزال خزائن خشبية، ثلاجة، غسالة وأفرشة وتحميلها في الشاحنة. الوجبة والماء متوفران.',
    budgetDzd: 6500, // Enforced >= 1000 DZD
    category: 'moving',
    requiredEquipment: ['سير إنزال الأثاث (Sangles)', 'قفازات حماية'],
    crewSlotsTotal: 2,
    crewSlotsFilled: 1,
    postedAt: 'منذ 25 دقيقة',
    distanceKm: 4.2,
    urgent: true,
    status: 'open',
    bidsCount: 4,
    counterOffers: [
      {
        workerId: 'w-401',
        workerName: 'رضا سطايفي (Rédha)',
        offeredPriceDzd: 7500,
        notes: 'عندي حبال تثبيت وقفازات مهنية وجاهز في خلال 30 دقيقة.',
        timestamp: 'منذ 15 دقيقة',
        status: 'pending'
      }
    ]
  },
  {
    id: 'poli-2',
    clientId: 'cli-302',
    clientName: 'شركة النور للمقاولات (SARL En-Nour)',
    clientPhone: '0662334455',
    wilayaCode: '19', // Sétif
    address: 'المنطقة الحرفية، العلمة، سطيف',
    titleAr: 'تفريغ نصف شاحنة أكياس إسمنت 50 كغ وترتيبها بالمستودع',
    titleFr: 'Déchargement Semi-remorque Ciment (300 Sacs 50kg)',
    description: 'تفريغ 300 كيس إسمنت من الشاحنة إلى داخل المستودع المغطى. نبحث عن فريق من 3 عمال للانتهاء بسرعة.',
    budgetDzd: 12000, // Enforced >= 1000 DZD
    category: 'unloading',
    requiredEquipment: ['عربة يدوية (Brouette)', 'أحذية أمان'],
    crewSlotsTotal: 3,
    crewSlotsFilled: 2,
    postedAt: 'منذ 45 دقيقة',
    distanceKm: 6.8,
    urgent: true,
    status: 'open',
    bidsCount: 7,
    counterOffers: []
  },
  {
    id: 'poli-3',
    clientId: 'cli-303',
    clientName: 'يوسف مزياني (Youcef Meziani)',
    clientPhone: '0770998877',
    wilayaCode: '31', // Oran
    address: 'حي العقيد لطفي، وهران',
    titleAr: 'تنظيف ركام وتربة ورشة بناء بعد أعمال الهدم والترميم',
    titleFr: 'Nettoyage Décombres et Gravats après Démolition',
    description: 'تجميع بقايا الآجر والخرسانة في أكياس قمامة متينة وإنزالها إلى الحاوية في الشارع. العمل نصف يوم.',
    budgetDzd: 4500, // Enforced >= 1000 DZD
    category: 'site_cleanup',
    requiredEquipment: ['مجرفة (Pelle)', 'مكانس خشنة', 'أكياس ركام'],
    crewSlotsTotal: 1,
    crewSlotsFilled: 0,
    postedAt: 'منذ ساعتين',
    distanceKm: 3.1,
    urgent: false,
    status: 'open',
    bidsCount: 3,
    counterOffers: [
      {
        workerId: 'w-402',
        workerName: 'طارق بوعلام (Tarek)',
        offeredPriceDzd: 5000,
        notes: 'أملك شاحنة صغيرة لنقل الركام مباشرة إن رغبت.',
        timestamp: 'منذ ساعة',
        status: 'pending'
      }
    ]
  },
  {
    id: 'poli-4',
    clientId: 'cli-304',
    clientName: 'حسين لعموري (Hocine Laamouri)',
    clientPhone: '0551223344',
    wilayaCode: '09', // Blida
    address: 'بوفاريك، البليدة',
    titleAr: 'تقليم أشجار حديقة وتجميع الأغصان وتجهيز أرضية عشبية',
    titleFr: 'Élagage Arbres & Nettoyage Jardin Villa',
    description: 'قص الأغصان الجافة وتنظيف الحديقة وتكديس المخلفات. الأدوات متوفرة في المكان ولكن يفضل إحضار مقص شجر خاص.',
    budgetDzd: 3500, // Enforced >= 1000 DZD
    category: 'gardening',
    requiredEquipment: ['مقص أشجار كبير (Sécateur)', 'قفازات سميكة'],
    crewSlotsTotal: 1,
    crewSlotsFilled: 0,
    postedAt: 'منذ 3 ساعات',
    distanceKm: 8.5,
    urgent: false,
    status: 'open',
    bidsCount: 2,
    counterOffers: []
  }
];

export const INITIAL_FREELANCE_SERVICES: FreelanceService[] = [
  {
    id: 'free-1',
    freelancerId: 'fl-1',
    freelancerName: 'مهدي قروي (Mehdi Keroui)',
    titleAr: 'تصميم هوية بصرية كاملة وشعارات تجارية احترافية',
    titleFr: 'Création d’Identité Visuelle de Marque & Logo Professionnel',
    category: 'graphic_branding',
    rating: 4.96,
    reviewsCount: 84,
    startingPriceDzd: 18000,
    deliveryDays: 4,
    isVerifiedStudent: false,
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
    portfolioSamples: [
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=600&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'free-2',
    freelancerId: 'fl-2',
    freelancerName: 'سارة بوجمعة (Sara Boudjemaa)',
    titleAr: 'تصميم واجهات تطبيقات الهواتف الذكية Figma (UI/UX)',
    titleFr: 'Design UI/UX d’Applications Mobiles & Web sur Figma',
    category: 'ui_ux',
    rating: 4.98,
    reviewsCount: 62,
    startingPriceDzd: 25000,
    deliveryDays: 5,
    isVerifiedStudent: true, // University Student Badge
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
    portfolioSamples: [
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'free-3',
    freelancerId: 'fl-3',
    freelancerName: 'بلال عياشي (Billel Ayachi)',
    titleAr: 'تطوير متاجر إلكترونية متوافقة مع بوابات الدفع الجزائرية',
    titleFr: 'Développement Boutiques E-Commerce avec Paiement Algérien',
    category: 'web_dev',
    rating: 4.92,
    reviewsCount: 47,
    startingPriceDzd: 45000,
    deliveryDays: 7,
    isVerifiedStudent: false,
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&auto=format&fit=crop&q=80',
    portfolioSamples: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'free-4',
    freelancerId: 'fl-4',
    freelancerName: 'أنس زروقي (Anes Zerrouki)',
    titleAr: 'تعليق صوتي إعلاني بالدارجة الجزائرية واللغة العربية الفصحى',
    titleFr: 'Voix-off Publicitaire en Darija Algérienne & Arabe Littéraire',
    category: 'voiceover',
    rating: 5.0,
    reviewsCount: 39,
    startingPriceDzd: 9500,
    deliveryDays: 2,
    isVerifiedStudent: false,
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
    audioSampleUrl: 'https://example.com/audio/sample_darija_vo.mp3',
    portfolioSamples: []
  }
];

export const INITIAL_PAYMENT_PROOFS: PaymentProof[] = [
  {
    id: 'pay-001',
    userId: 'usr-901',
    userName: 'سفيان بن عيسى',
    userPhone: '0551009988',
    type: 'baridimob',
    transactionReference: 'BM-20261027-882190',
    amountDzd: 250, // Local DZD equivalent of $1/month
    date: '2026-10-27 18:42',
    receiptImageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&auto=format&fit=crop&q=80',
    extractedOcr: {
      referenceNo: 'BM-20261027-882190',
      accountTarget: '0025937263 / 71',
      amount: 250,
      timestamp: '2026-10-27 18:42:10'
    },
    status: 'pending'
  },
  {
    id: 'pay-002',
    userId: 'usr-902',
    userName: 'رشيد بودماغ',
    userPhone: '0662113344',
    type: 'ccp',
    transactionReference: 'CCP-REC-449102',
    amountDzd: 250,
    date: '2026-10-27 14:15',
    receiptImageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&auto=format&fit=crop&q=80',
    extractedOcr: {
      referenceNo: 'CCP-REC-449102',
      accountTarget: '0025937263 71',
      amount: 250,
      timestamp: '2026-10-27 14:15:33'
    },
    status: 'pending'
  },
  {
    id: 'pay-003',
    userId: 'usr-903',
    userName: 'كريم بلعربي',
    userPhone: '0770554433',
    type: 'redotpay',
    transactionReference: 'RP-TX-99182376',
    amountDzd: 250,
    date: '2026-10-27 11:05',
    receiptImageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&auto=format&fit=crop&q=80',
    extractedOcr: {
      referenceNo: 'RP-TX-99182376',
      accountTarget: '1392637804',
      amount: 250,
      timestamp: '2026-10-27 11:05:00'
    },
    status: 'approved'
  }
];

export const INITIAL_DISPUTES: DisputeRecord[] = [
  {
    id: 'disp-001',
    contractId: 'cnt-881',
    contractTitle: 'تركيب شبكة التدفئة المركزية لشقة F4 بالبويرة',
    clientName: 'توفيق زناتي (Tewfik Zenati)',
    workerName: 'عثمان حداد (Othman Haddad)',
    amountInEscrowDzd: 45000,
    filedAt: '2026-10-26 16:30',
    reason: 'تسرب في أحد مفاصل الأنابيب بعد الاختبار الأولي، ورفض الحرفي العودة لإصلاح الضغط.',
    status: 'investigating',
    evidencePhotos: [
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&auto=format&fit=crop&q=80'
    ]
  }
];

export const OBD2_CODES_DATABASE = [
  {
    code: 'P0300',
    system: 'Ignition / Cylinder Misfire',
    titleAr: 'خلل في احتراق أسطوانات المحرك عشوائي (Raté d’allumage multiple)',
    titleFr: 'Raté d’allumage détecté dans plusieurs cylindres',
    causesAr: 'شمعات احتراق بالية (Bougies)، كويل الإشعال (Bobines)، أو انسداد في بخاخات البنزين (Injecteurs).',
    causesFr: 'Bougies usées, bobines d’allumage défaillantes, injecteurs bouchés ou mauvaise pression de carburant.',
    algerianSolution: 'تغيير شمعات البوجي الأصلية من نوع Bosch/Denso وتنظيف البخاخات بالموجات الصوتية عند ميكانيكي معتمد.',
    costEstimateDzd: '3,500 - 9,000 دج'
  },
  {
    code: 'P0420',
    system: 'Catalyst System Efficiency',
    titleAr: 'انخفاض كفاءة المحول الحفاز (دبة التلوث / Catalyseur)',
    titleFr: 'Rendement du système catalytique inférieur au seuil (Ligne 1)',
    causesAr: 'انسداد الكاتاليزور برواسب الكربون أو تلف حساس الأكسجين السفلي (Sonde Lambda).',
    causesFr: 'Catalyseur colmaté, fuite à l’échappement ou sonde lambda aval défectueuse.',
    algerianSolution: 'فحص الحساس بالأومتر أو تنظيف المحول بمحلول فك الكربون، أو استبدال الحساس السفلي.',
    costEstimateDzd: '6,000 - 28,000 دج'
  },
  {
    code: 'P0171',
    system: 'Fuel System Too Lean (Bank 1)',
    titleAr: 'مزيج الوقود والهواء فقير جداً (Mélange trop pauvre)',
    titleFr: 'Mélange trop pauvre (Ligne 1)',
    causesAr: 'تسريب هواء في مشعب السحب (Prise d’air admission) أو عطل حساس تدفق الهواء (Débitmètre d’air MAF).',
    causesFr: 'Prise d’air après débitmètre, filtre à carburant colmaté ou pompe à essence faible.',
    algerianSolution: 'فحص أنابيب الهواء بجهاز الدخان وتغيير مصفاة البنزين أو فحص حساس الماف.',
    costEstimateDzd: '2,500 - 8,000 دج'
  },
  {
    code: 'P0113',
    system: 'Intake Air Temperature Sensor Circuit High',
    titleAr: 'عطل في دارة حساس حرارة الهواء المسحوب (Sonde IAT)',
    titleFr: 'Circuit du capteur de température d’air d’admission - signal trop haut',
    causesAr: 'انقطاع في أسلاك الفيشة أو تلف مجس حرارة الهواء داخل الدبيتمتر.',
    causesFr: 'Câblage coupé, connecteur oxydé ou capteur IAT HS.',
    algerianSolution: 'تنظيف فيشة الحساس ببخاخ Contact Cleaner وفحص استمرارية الأسلاك.',
    costEstimateDzd: '1,500 - 4,000 دج'
  },
  {
    code: 'P0700',
    system: 'Transmission Control System Malfunction',
    titleAr: 'طلب تشغيل لمبة الأعطال من علبة السرعات الأوتوماتيكية (BVA)',
    titleFr: 'Système de commande de boîte de vitesses - demande témoin allumé',
    causesAr: 'انخفاض مستوى زيت الفتيس، احتراق كلاتشات، أو عطل سيلونويد التحكم بالضغط.',
    causesFr: 'Niveau d’huile BVA insuffisant, électrovanne de pression bloquée ou calculateur BVA.',
    algerianSolution: 'فحص عقل القير بجهاز سكانير متخصص للعلبة وإجراء صيانة الفلتر وزيت ATF الأصلي.',
    costEstimateDzd: '8,000 - 35,000 دج'
  }
];

export const REGIONAL_TERMINOLOGY_DICTIONARY = [
  {
    standardArabic: 'الكهربائي',
    algiersTerm: 'تريسيا (Trissia)',
    oranTerm: 'كهربائي / الكريسيان (L\'kricien)',
    constantineTerm: 'التريسيا / الكهرباجي',
    saharaTerm: 'معلم التريسيتي',
    meaningFr: 'Électricien en bâtiment ou industriel'
  },
  {
    standardArabic: 'السباك',
    algiersTerm: 'بلومبي (Plombier)',
    oranTerm: 'بلومبي الصحي',
    constantineTerm: 'السباك / بلومبيي',
    saharaTerm: 'معلم القنوات والماء',
    meaningFr: 'Plombier installateur sanitaire et thermique'
  },
  {
    standardArabic: 'شاحنة صغيرة لنقل الحرف',
    algiersTerm: 'الهاربين / الباشي (Bâché)',
    oranTerm: 'الكروسة / شاحنة صغيورة',
    constantineTerm: 'الكميونيت / الباشي',
    saharaTerm: 'الهيليكس 4x4 أو الباشي',
    meaningFr: 'Camionnette plateau bâchée pour transport artisanal'
  },
  {
    standardArabic: 'عربة البناء اليدوية',
    algiersTerm: 'البويطة (Brouette)',
    oranTerm: 'البرويطة / الشاريو',
    constantineTerm: 'البوريطة',
    saharaTerm: 'البرويطة الصحراوية',
    meaningFr: 'Brouette de chantier de construction'
  },
  {
    standardArabic: 'الرافعة اليدوية للخرسانة',
    algiersTerm: 'البالانك (Palan)',
    oranTerm: 'الرافعة / البالانك',
    constantineTerm: 'البالانغو',
    saharaTerm: 'الرافعة بالسلك',
    meaningFr: 'Palan mécanique ou treuil de levage de mortier'
  },
  {
    standardArabic: 'الجبس والأسقف المعلقة',
    algiersTerm: 'البا 13 (BA13 / Plâtre)',
    oranTerm: 'الفوبلافون والجبس',
    constantineTerm: 'سقف مستعار BA13',
    saharaTerm: 'جبس عازل للحرارة',
    meaningFr: 'Plaques de plâtre BA13 et faux-plafonds suspendus'
  }
];
