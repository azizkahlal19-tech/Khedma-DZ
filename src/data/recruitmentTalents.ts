import { RecruitmentProfile, CompanyJobOffer } from '../types';

export const INITIAL_RECRUITMENT_PROFILES: RecruitmentProfile[] = [
  {
    id: 'rec-grad-001',
    fullName: 'المهندس أنيس رحماني (Anis Rahmani)',
    gender: 'male',
    wilayaCode: '16',
    wilayaNameAr: 'الجزائر (باب الزوار)',
    communeName: 'باب الزوار',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    degreeLevel: 'ingenieur',
    degreeTitleAr: 'مهندس دولة في الهندسة المدنية (Génie Civil)',
    degreeTitleFr: "Ingénieur d'État en Génie Civil (Option Structures)",
    universityOrInstitute: 'المدرسة الوطنية العليا للأشغال العمومية (ENSTP) / USTHB',
    graduationYear: 2025,
    specialtyCategory: 'civil_engineering',
    pfeTitleAr: 'دراسة ومحاكاة زلزالية لبرج سكني ذكي R+12 بتقنية الخرسانة مسبقة الإجهاد وفق كود RPA 99 V2003',
    skills: ['Robot Structural Analysis', 'AutoCAD Civil 3D', 'Revit BIM', 'RPA 99 V2003', 'Métré & Suivi Chantier'],
    languages: [
      { name: 'العربية', level: 'native' },
      { name: 'الفرنسية', level: 'fluent' },
      { name: 'الإنجليزية', level: 'good' }
    ],
    linkedinUrl: 'https://www.linkedin.com/in/anis-rahmani-gc-dz',
    phone: '0550882194',
    email: 'anis.rahmani.ingenieur@gmail.com',
    militaryStatus: 'sursis',
    expectedSalaryDzd: 75000,
    contractTypeDesired: 'cdi',
    availability: 'immediate',
    isLinkedInVerified: true
  },
  {
    id: 'rec-grad-002',
    fullName: 'سارة بوجمعة (Sarah Boudjemaa)',
    gender: 'female',
    wilayaCode: '31',
    wilayaNameAr: 'وهران',
    communeName: 'بئر الجير',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    degreeLevel: 'master',
    degreeTitleAr: 'ماستر 2 في الذكاء الاصطناعي وهندسة البيانات (Data Science)',
    degreeTitleFr: 'Master 2 en Intelligence Artificielle & Big Data',
    universityOrInstitute: 'جامعة العلوم والتكنولوجيا محمد بوضياف وهران (USTO-MB)',
    graduationYear: 2025,
    specialtyCategory: 'computer_science_ai',
    pfeTitleAr: 'تطوير نموذج تعلم عميق للكشف المبكر عن أعطال شبكات الغاز الطبيعي باستخدام حساسات IoT',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'FastAPI', 'Docker', 'Power BI'],
    languages: [
      { name: 'العربية', level: 'native' },
      { name: 'الفرنسية', level: 'fluent' },
      { name: 'الإنجليزية', level: 'fluent' }
    ],
    linkedinUrl: 'https://www.linkedin.com/in/sarah-boudjemaa-ai-oran',
    phone: '0772349182',
    email: 'sarah.boudjemaa.data@gmail.com',
    militaryStatus: 'not_applicable',
    expectedSalaryDzd: 90000,
    contractTypeDesired: 'cdi',
    availability: 'immediate',
    isLinkedInVerified: true
  },
  {
    id: 'rec-grad-003',
    fullName: 'بلال زيتوني (Billel Zitouni)',
    gender: 'male',
    wilayaCode: '25',
    wilayaNameAr: 'قسنطينة',
    communeName: 'الخروب',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    degreeLevel: 'ingenieur',
    degreeTitleAr: 'مهندس دولة في الإلكتروميكانيك والصيانة الصناعية',
    degreeTitleFr: "Ingénieur d'État en Électromécanique & Maintenance Industrielle",
    universityOrInstitute: 'جامعة قسنطينة 1 الإخوة منتوري',
    graduationYear: 2024,
    specialtyCategory: 'mechanical_industrial',
    pfeTitleAr: 'تحسين الموثوقية الطاقوية وخفض استهلاك خطوط إنتاج الإسمنت عبر التشخيص بالاهتزازات',
    skills: ['GMAO (Coswin/SAP)', 'Automates Siemens S7', 'Analyse Vibratoire', 'Pneumatique & Hydraulique'],
    languages: [
      { name: 'العربية', level: 'native' },
      { name: 'الفرنسية', level: 'fluent' },
      { name: 'الإنجليزية', level: 'good' }
    ],
    linkedinUrl: 'https://www.linkedin.com/in/billel-zitouni-maint-dz',
    phone: '0663118940',
    email: 'billel.zitouni.pro@gmail.com',
    militaryStatus: 'exempt',
    expectedSalaryDzd: 80000,
    contractTypeDesired: 'cdi',
    availability: 'immediate',
    isLinkedInVerified: true
  },
  {
    id: 'rec-grad-004',
    fullName: 'مريم بن قادة (Meriem Benkada)',
    gender: 'female',
    wilayaCode: '16',
    wilayaNameAr: 'الجزائر (القبة)',
    communeName: 'القبة',
    avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=200&auto=format&fit=crop&q=80',
    degreeLevel: 'master',
    degreeTitleAr: 'ماستر 2 في المالية، المحاسبة والتدقيق (SCF الجزائري)',
    degreeTitleFr: 'Master 2 en Comptabilité, Contrôle & Audit (Système SCF)',
    universityOrInstitute: 'المدرسة العليا للتجارة (ESC Alger) / جامعة الجزائر 3',
    graduationYear: 2025,
    specialtyCategory: 'finance_accounting',
    pfeTitleAr: 'إجراءات التدقيق الجبائي والرقابة الداخلية للمؤسسات وفق النظام المحاسبي المالي الجزائري (SCF)',
    skills: ['PC Compta', 'PC Paie', 'Fiscalité Algérienne (G50)', 'Audit Financier', 'Excel Avancé'],
    languages: [
      { name: 'العربية', level: 'native' },
      { name: 'الفرنسية', level: 'fluent' },
      { name: 'الإنجليزية', level: 'good' }
    ],
    linkedinUrl: 'https://www.linkedin.com/in/meriem-benkada-audit-alger',
    phone: '0561993420',
    email: 'meriem.benkada.finance@gmail.com',
    militaryStatus: 'not_applicable',
    expectedSalaryDzd: 70000,
    contractTypeDesired: 'cdi',
    availability: 'immediate',
    isLinkedInVerified: true
  },
  {
    id: 'rec-grad-005',
    fullName: 'يوسف العايب (Youssef Laayeb)',
    gender: 'male',
    wilayaCode: '19',
    wilayaNameAr: 'سطيف (العلمة)',
    communeName: 'العلمة',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
    degreeLevel: 'technicien_superieur',
    degreeTitleAr: 'تقني سامي (TS) في الطوبوغرافيا ومسح الأراضي',
    degreeTitleFr: 'Technicien Supérieur (TS) en Topographie & Géodésie',
    universityOrInstitute: 'المعهد الوطني المتخصص في التكوين المهني (INSFP سطيف)',
    graduationYear: 2025,
    specialtyCategory: 'civil_engineering',
    pfeTitleAr: 'التخطيط الطوبوغرافي ورفع الإحداثيات لمشروع تهيئة منطقة النشاطات اللوجستية بالعلمة باستخدام GPS RTK',
    skills: ['Station Totale Leica', 'GPS RTK', 'Covadis', 'AutoCAD', 'Implantation & Bornage'],
    languages: [
      { name: 'العربية', level: 'native' },
      { name: 'الفرنسية', level: 'good' }
    ],
    linkedinUrl: 'https://www.linkedin.com/in/youssef-laayeb-topo-dz',
    phone: '0540127891',
    email: 'youssef.laayeb.topo@gmail.com',
    militaryStatus: 'completed',
    expectedSalaryDzd: 60000,
    contractTypeDesired: 'cdi',
    availability: 'immediate',
    isLinkedInVerified: true
  },
  {
    id: 'rec-grad-006',
    fullName: 'د. ليديا آيت علي (Dr. Lydia Ait Ali)',
    gender: 'female',
    wilayaCode: '15',
    wilayaNameAr: 'تيزي وزو',
    communeName: 'تيزي وزو',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813590-78945a22d3ca?w=200&auto=format&fit=crop&q=80',
    degreeLevel: 'doctorat',
    degreeTitleAr: 'دكتور في الصيدلة (Docteur en Pharmacie) ومراقبة الجودة',
    degreeTitleFr: 'Docteur en Pharmacie Industrielle & Contrôle Qualité',
    universityOrInstitute: 'جامعة الجزائر 1 - كلية الصيدلة زيغود يوسف',
    graduationYear: 2024,
    specialtyCategory: 'medical_pharma',
    pfeTitleAr: 'التحقق من جودة ومطابقة المستحضرات الصيدلانية الجنيسة وفق معايير وزارة الصناعة الصيدلانية',
    skills: ['Bonnes Pratiques de Fabrication (BPF)', 'HPLC / Spectrométrie', 'Affaires Réglementaires', 'Validation'],
    languages: [
      { name: 'العربية', level: 'native' },
      { name: 'الفرنسية', level: 'fluent' },
      { name: 'الإنجليزية', level: 'fluent' },
      { name: 'الأمازيغية', level: 'native' }
    ],
    linkedinUrl: 'https://www.linkedin.com/in/dr-lydia-aitali-pharma-dz',
    phone: '0655432190',
    email: 'dr.lydia.aitali@gmail.com',
    militaryStatus: 'not_applicable',
    expectedSalaryDzd: 110000,
    contractTypeDesired: 'cdi',
    availability: 'immediate',
    isLinkedInVerified: true
  }
];

export const INITIAL_COMPANY_JOB_OFFERS: CompanyJobOffer[] = [
  {
    id: 'job-alg-001',
    companyName: 'كوسيدار للأشغال العمومية (Cosider TP)',
    companyLogoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?w=120&auto=format&fit=crop&q=80',
    wilayaCode: '16',
    communeName: 'الدار البيضاء',
    sector: 'btph_construction',
    jobTitleAr: 'مهندس دولة حديث التخرج في الهندسة المدنية (متابعة ورشات الجسور والطرق السريعة)',
    jobTitleFr: "Ingénieur d'État en Génie Civil (Suivi Chantiers Ouvrages d'Art)",
    degreeRequired: 'ingenieur',
    experienceYears: 0, // Fresh graduates welcomed!
    salaryMinDzd: 70000,
    salaryMaxDzd: 85000,
    contractType: 'cdi',
    descriptionAr: 'توظيف مهندسين حديثي التخرج للاندماج الفوري في مشاريع البنية التحتية بالجزائر الكبرى، مع إشراف ومرافقة من كبار الخبراء وإمكانية التثبيت السريع وامتيازات النقل والإطعام.',
    postedDate: 'منذ يومين',
    applicationsCount: 28,
    contactEmail: 'recrutement.tp@cosider-dz.com',
    contactPhone: '023849100'
  },
  {
    id: 'job-alg-002',
    companyName: 'مجمع سوناطراك للخدمات البترولية (Subcontractor)',
    companyLogoUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=120&auto=format&fit=crop&q=80',
    wilayaCode: '30',
    communeName: 'حاسي مسعود',
    sector: 'petroleum_energy',
    jobTitleAr: 'مهندس إلكتروميكانيك أو صيانة صناعية بنظام المناوبة (Rotation 4x4)',
    jobTitleFr: 'Ingénieur Maintenance Industrielle Base Vie & Pompage (Rotation 4x4)',
    degreeRequired: 'ingenieur',
    experienceYears: 0,
    salaryMinDzd: 130000,
    salaryMaxDzd: 160000,
    contractType: 'cdi',
    descriptionAr: 'فرصة ذهبية للمتخرجين الجدد في الإلكتروميكانيك والميكانيك للعمل بقواعد حاسي مسعود مع إقامة كاملة وتذاكر طيران ونظام تناوب 4 أسابيع عمل مقابل 4 أسابيع راحة.',
    postedDate: 'منذ يوم',
    applicationsCount: 45,
    contactEmail: 'hr.petro@algeria-energy.dz',
    contactPhone: '029731244'
  },
  {
    id: 'job-alg-003',
    companyName: 'مخبر صيدلاني وطني (Biopharm Partner)',
    companyLogoUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=120&auto=format&fit=crop&q=80',
    wilayaCode: '16',
    communeName: 'وادي السمار',
    sector: 'pharma_health',
    jobTitleAr: 'دكتور في الصيدلة أو بيولوجي لمراقبة الجودة والتوثيق الصيدلاني (CQ)',
    jobTitleFr: 'Pharmacien Contrôle Qualité & Libération de Lots (Zone Industrielle)',
    degreeRequired: 'master',
    experienceYears: 0,
    salaryMinDzd: 80000,
    salaryMaxDzd: 100000,
    contractType: 'cdi',
    descriptionAr: 'مطلوب صيادلة وبيولوجيون للعمل بمصنع المستحضرات الصيدلانية بوادي السمار في مخابر مراقبة الجودة والتحاليل الفيزيوكيميائية. تكوين مستمر على معايير GMP الدولية.',
    postedDate: 'منذ 3 أيام',
    applicationsCount: 19,
    contactEmail: 'recrutement@pharma-dz.com',
    contactPhone: '021516000'
  },
  {
    id: 'job-alg-004',
    companyName: 'شركة برمجيات سحابية وتكنولوجيا مالية (Fintech DZ)',
    companyLogoUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&auto=format&fit=crop&q=80',
    wilayaCode: '31',
    communeName: 'وهران',
    sector: 'tech_digital',
    jobTitleAr: 'مطور برمجيات Full-Stack حديث التخرج (React, Node.js, Python)',
    jobTitleFr: 'Développeur Full-Stack Junior (Possibilité Télétravail Partiel)',
    degreeRequired: 'master',
    experienceYears: 0,
    salaryMinDzd: 85000,
    salaryMaxDzd: 110000,
    contractType: 'cdi',
    descriptionAr: 'نبحث عن شغوفين بالبرمجة من خريجي كليات الإعلام الآلي، بيئة عمل مرنة، عتاد MacBook Pro، ومشاريع كبرى في الدفع الإلكتروني عبر بريدي موب والبطاقة الذهبية.',
    postedDate: 'اليوم',
    applicationsCount: 36,
    contactEmail: 'jobs@fintech-dz.io',
    contactPhone: '041809012'
  },
  {
    id: 'job-alg-005',
    companyName: 'متجر تجارة إلكترونية وطني (E-Commerce DZ Express)',
    companyLogoUrl: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?w=120&auto=format&fit=crop&q=80',
    wilayaCode: '16',
    communeName: 'العمل عن بعد (من المنزل عبر الوطن 58 ولاية)',
    sector: 'tech_digital',
    jobTitleAr: 'مؤكد طلبيات وخدمة زبائن عن بعد (Télétravail من المنزل - دوام كامل أو جزئي)',
    jobTitleFr: 'Agent de Confirmation & Service Client E-commerce à Domicile',
    degreeRequired: 'licence',
    experienceYears: 0,
    salaryMinDzd: 50000,
    salaryMaxDzd: 75000,
    contractType: 'cdi',
    descriptionAr: 'فرصة عمل مربحة من المنزل لجميع الولايات: الاتصال بالزبائن لتأكيد طلبيات السلع، إدخال العناوين في منصة التوصيل، الإجابة على استفسارات واتساب وفيسبوك. مكافآت وحوافز شهرية على كل طلبية مؤكدة.',
    postedDate: 'منذ ساعتين (عاجل)',
    applicationsCount: 84,
    contactEmail: 'recrutement.online@ecom-dz.com',
    contactPhone: '0550449911'
  },
  {
    id: 'job-alg-006',
    companyName: 'مجمع سيفيتال للصناعات الغذائية (Cevital Agro)',
    companyLogoUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=120&auto=format&fit=crop&q=80',
    wilayaCode: '06',
    communeName: 'بجاية',
    sector: 'agro_industry',
    jobTitleAr: 'مهندس جودة ومراقبة إنتاج غذائي وتغليف (Ingénieur Qualité Agro)',
    jobTitleFr: 'Ingénieur Contrôle Qualité Lignes de Conditionnement',
    degreeRequired: 'ingenieur',
    experienceYears: 0,
    salaryMinDzd: 80000,
    salaryMaxDzd: 95000,
    contractType: 'cdi',
    descriptionAr: 'توظيف مهندسين حديثي التخرج في البيولوجيا أو الصناعات الغذائية لمراقبة خطوط التكرير والتعبئة في مصانع بجاية، مع سكن وظيفي ونقل مؤمن.',
    postedDate: 'منذ 4 أيام',
    applicationsCount: 31,
    contactEmail: 'recrutement@cevital.com',
    contactPhone: '034211100'
  },
  {
    id: 'job-alg-007',
    companyName: 'شركة النقل السريع واللوجستيك (Logistique Maghreb DZ)',
    companyLogoUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=120&auto=format&fit=crop&q=80',
    wilayaCode: '19',
    communeName: 'العلمة / سطيف',
    sector: 'btph_construction',
    jobTitleAr: 'سائق شاحنة نصف مقطورة (Semi-Remorque) برخصة صنف C و E بين العلمة والعاصمة',
    jobTitleFr: 'Chauffeur Poids Lourd Semi-Remorque Corridors Commerciaux',
    degreeRequired: 'technicien_superieur',
    experienceYears: 1,
    salaryMinDzd: 90000,
    salaryMaxDzd: 120000,
    contractType: 'cdi',
    descriptionAr: 'نقل البضائع والمستوعبات بين ميناء الجزائر ومستودعات شارع دبي بالعلمة. راتب ثابت ممتاز + علاوة المسافات + التكفل بالإطعام والصيانة.',
    postedDate: 'منذ يوم',
    applicationsCount: 22,
    contactEmail: 'rh.transport@logistique-dz.com',
    contactPhone: '0561223344'
  }
];

export function parseAndImportJobOffer(input: {
  companyName: string;
  jobTitleAr: string;
  wilayaCode: string;
  communeName: string;
  salaryMinDzd: number;
  salaryMaxDzd: number;
  degreeRequired: CompanyJobOffer['degreeRequired'];
  sector: CompanyJobOffer['sector'];
  contactPhone: string;
  contactEmail: string;
  descriptionAr?: string;
}): CompanyJobOffer {
  return {
    id: 'job-imp-' + Date.now(),
    companyName: input.companyName,
    companyLogoUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&auto=format&fit=crop&q=80',
    wilayaCode: input.wilayaCode,
    communeName: input.communeName,
    sector: input.sector,
    jobTitleAr: input.jobTitleAr,
    jobTitleFr: input.jobTitleAr,
    degreeRequired: input.degreeRequired,
    experienceYears: 0,
    salaryMinDzd: Number(input.salaryMinDzd) || 60000,
    salaryMaxDzd: Number(input.salaryMaxDzd) || 90000,
    contractType: 'cdi',
    descriptionAr: input.descriptionAr || 'عرض عمل معتمد مستورد عبر خدمة ديزاد مع إمكانية التقديم الفوري المباشر عبر الهاتف والبريد.',
    postedDate: 'الآن',
    applicationsCount: 1,
    contactEmail: input.contactEmail || 'job.recrutement.dz@gmail.com',
    contactPhone: input.contactPhone || '0555000000'
  };
}


// Helper to simulate importing an Algerian Graduate or Professional via LinkedIn link
export function parseAndImportLinkedInProfile(input: {
  linkedinUrl: string;
  fullName: string;
  degreeLevel: RecruitmentProfile['degreeLevel'];
  degreeTitleAr: string;
  universityOrInstitute: string;
  graduationYear: number;
  specialtyCategory: RecruitmentProfile['specialtyCategory'];
  wilayaCode: string;
  wilayaNameAr: string;
  phone: string;
  email: string;
  pfeTitleAr?: string;
  skillsText?: string;
  militaryStatus?: RecruitmentProfile['militaryStatus'];
  expectedSalaryDzd?: number;
}): RecruitmentProfile {
  const skillsList = input.skillsText 
    ? input.skillsText.split(',').map(s => s.trim()).filter(Boolean)
    : ['LinkedIn Verified DZ', 'Excellence Académique', 'Diplômé Universitaire'];

  return {
    id: 'rec-imp-' + Date.now(),
    fullName: input.fullName,
    gender: 'male',
    wilayaCode: input.wilayaCode,
    wilayaNameAr: input.wilayaNameAr,
    communeName: input.wilayaNameAr,
    avatarUrl: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 50000000)}?w=200&auto=format&fit=crop&q=80`,
    degreeLevel: input.degreeLevel,
    degreeTitleAr: input.degreeTitleAr,
    degreeTitleFr: input.degreeTitleAr,
    universityOrInstitute: input.universityOrInstitute,
    graduationYear: input.graduationYear || 2025,
    specialtyCategory: input.specialtyCategory,
    pfeTitleAr: input.pfeTitleAr || 'مشروع تخرج جامعي تطبيقي متميز',
    skills: skillsList,
    languages: [
      { name: 'العربية', level: 'native' },
      { name: 'الفرنسية', level: 'fluent' },
      { name: 'الإنجليزية', level: 'good' }
    ],
    linkedinUrl: input.linkedinUrl.startsWith('http') ? input.linkedinUrl : `https://www.linkedin.com/in/${input.linkedinUrl.replace(/[^a-zA-Z0-9-]/g, '')}`,
    phone: input.phone || '0555000000',
    email: input.email || 'graduate.dz@gmail.com',
    militaryStatus: input.militaryStatus || 'sursis',
    expectedSalaryDzd: input.expectedSalaryDzd || 70000,
    contractTypeDesired: 'cdi',
    availability: 'immediate',
    isLinkedInVerified: true,
    isCustomImported: true
  };
}
