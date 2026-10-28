export type Locale = 'ar' | 'fr' | 'en';

export type UserRole = 'client' | 'worker' | 'merchant' | 'freelancer' | 'admin';

export type Carrier = 'Mobilis' | 'Djezzy' | 'Ooredoo' | 'Unknown';

export interface Wilaya {
  code: string; // "01" to "58"
  nameAr: string;
  nameFr: string;
  nameEn: string;
  zone: 'North' | 'Highlands' | 'South' | 'Sahara';
  hub: string;
  logisticsCorridor: string;
  tradePriority: string;
  activeUsers: number;
  activeJobs: number;
  densityScore: number;
}

export interface UserSubscription {
  status: 'trial' | 'active' | 'grace' | 'expired';
  trialStartDate: string;
  trialExpiresAt: string;
  remainingDays: number;
  paymentMethod?: 'redotpay' | 'ccp' | 'baridimob' | 'bank_wire';
  amountDzd: number;
  amountUsd: number;
  gracePeriodEndsAt?: string;
}

export interface KycVerification {
  isVerified: boolean;
  documentType?: 'id_card' | 'passport' | 'student' | 'driving_b' | 'driving_c' | 'driving_d' | 'driving_e';
  documentNumber?: string;
  fullName?: string;
  birthDate?: string;
  wilayaCode?: string;
  livenessConfidenceScore?: number; // e.g. 94%
  submittedAt?: string;
  verifiedAt?: string;
}

export interface UserProfile {
  id: string;
  phone: string;
  carrier: Carrier;
  hardwareFingerprint: string;
  name: string;
  role: UserRole;
  availableRoles: UserRole[];
  wilayaCode: string;
  rating: number;
  reviewCount: number;
  subscription: UserSubscription;
  kyc: KycVerification;
  isSuspended: boolean;
  walletBalanceDzd: number;
  avatarUrl?: string;
  toolsEquipped?: string[];
  vehicleType?: string;
}

export interface ProductItem {
  id: string;
  merchantId: string;
  merchantName: string;
  merchantWilaya: string;
  merchantRating: number;
  titleAr: string;
  titleFr: string;
  titleEn: string;
  category: 'construction' | 'plumbing' | 'electrical' | 'finishing' | 'hardware' | 'tools';
  unitRetailPriceDzd: number;
  moq: number; // Minimum Order Quantity for Wholesale
  bulkPricingTiers: { minQty: number; priceDzd: number }[];
  stockQuantity: number;
  depotGps: { lat: number; lng: number; address: string };
  isClearance: boolean;
  clearanceDiscountPercent?: number;
  imageUrl: string;
  specifications: Record<string, string>;
}

export interface ServiceListing {
  id: string;
  workerId: string;
  workerName: string;
  phone: string;
  wilayaCode: string;
  category: 
    | 'plumbing' 
    | 'electrical' 
    | 'masonry' 
    | 'tile_setting' 
    | 'drywall_ba13' 
    | 'painting' 
    | 'epoxy' 
    | 'auto_mechanic' 
    | 'obd2_diagnostics' 
    | 'hvac_ac';
  titleAr: string;
  titleFr: string;
  descriptionAr: string;
  descriptionFr: string;
  baseRateDzd: number; // >= 1000 DZD floor
  rateUnit: 'hour' | 'job' | 'm2' | 'day';
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  isEmergencyAvailable: boolean;
  badges: string[];
  toolsProvided: string[];
  avatarUrl: string;
  isOfficialCamArtisan?: boolean; // حامل بطاقة حرفي رسمية من غرفة الصناعة التقليدية والحرف
  artisanCardNumber?: string; // e.g. "16/00-14892/A/22"
  artisanCamWilaya?: string; // e.g. "غرفة الحرف والصناعة التقليدية لولاية الجزائر"
  artisanCardExpiry?: string;
  taxRegistrationNif?: string;
}

export interface PolivalenteTask {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  wilayaCode: string;
  address: string;
  titleAr: string;
  titleFr: string;
  description: string;
  budgetDzd: number; // STRICT >= 1,000 DZD
  category: 'moving' | 'unloading' | 'site_cleanup' | 'demolition' | 'gardening' | 'general_labor';
  requiredEquipment: string[];
  crewSlotsTotal: number;
  crewSlotsFilled: number;
  postedAt: string;
  distanceKm: number;
  urgent: boolean;
  status: 'open' | 'in_progress' | 'completed';
  bidsCount: number;
  counterOffers: {
    workerId: string;
    workerName: string;
    offeredPriceDzd: number;
    notes: string;
    timestamp: string;
    status: 'pending' | 'accepted' | 'rejected';
  }[];
}

export interface FreelanceService {
  id: string;
  freelancerId: string;
  freelancerName: string;
  titleAr: string;
  titleFr: string;
  category: 'graphic_branding' | 'ui_ux' | 'web_dev' | 'mobile_dev' | 'translation' | 'seo_copy' | 'contracts' | 'video_reels' | 'voiceover';
  rating: number;
  reviewsCount: number;
  startingPriceDzd: number;
  deliveryDays: number;
  isVerifiedStudent?: boolean;
  avatarUrl: string;
  audioSampleUrl?: string;
  portfolioSamples: string[];
}

export interface PaymentProof {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  type: 'ccp' | 'baridimob' | 'redotpay';
  transactionReference: string;
  amountDzd: number;
  date: string;
  receiptImageUrl: string;
  extractedOcr: {
    referenceNo: string;
    accountTarget: string;
    amount: number;
    timestamp: string;
  };
  status: 'pending' | 'approved' | 'rejected';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isSender: boolean;
  attachment?: {
    type: 'gps_pin' | 'voice_note' | 'image';
    payload: string;
    coordinates?: { lat: number; lng: number; address: string };
    durationSeconds?: number;
  };
}

export interface DisputeRecord {
  id: string;
  contractId: string;
  contractTitle: string;
  clientName: string;
  workerName: string;
  amountInEscrowDzd: number;
  filedAt: string;
  reason: string;
  status: 'investigating' | 'resolved_client' | 'resolved_worker' | 'manual_override';
  evidencePhotos: string[];
}

export interface OuedknissItem {
  id: string;
  titleAr: string;
  titleFr: string;
  priceDzd: number;
  wilayaCode: string;
  communeName: string;
  condition: 'neuf' | 'tres_bon_etat' | 'bon_etat' | 'destockage';
  sellerName: string;
  sellerPhone: string;
  postedDate: string;
  viewsCount: number;
  imageUrl: string;
  category: 'materials' | 'tools' | 'machinery' | 'vehicles' | 'real_estate';
  ouedknissUrl: string;
  isKhedmaVerifiedPartner: boolean;
  priceComparisonNote?: string;
}

export interface FiverrAlgerianSeller {
  id: string;
  fiverrUsername: string; // e.g. "karim_fullstack", "amina_ux"
  fullName: string;
  wilayaCode: string;
  wilayaNameAr: string;
  avatarUrl: string;
  levelBadge: 'top_rated' | 'level_2' | 'level_1' | 'fiverr_pro' | 'rising_talent';
  rating: number; // e.g. 5.0, 4.9
  reviewCount: number;
  completedOrdersCount: number;
  memberSinceYear: number;
  responseHours: number;
  category: 
    | 'web_mobile_dev' 
    | 'graphic_design' 
    | 'voiceover_audio' 
    | 'video_animation' 
    | 'translation_writing' 
    | 'ai_python' 
    | 'digital_marketing';
  categoryLabelAr: string;
  categoryLabelFr: string;
  gigTitleAr: string;
  gigTitleEn: string;
  gigDescriptionAr: string;
  startingPriceUsd: number;
  startingPriceDzd: number; // Converted at parallel market ~240 DZD/$
  deliveryDays: number;
  languages: string[];
  skills: string[];
  portfolioThumbs: string[];
  fiverrGigUrl: string;
  acceptsLocalPayment: boolean; // BaridiMob, CCP, RedotPay
  fiverrFeeSavingsDzd: number; // 20% saved in DZD
  verifiedAlgerianIdentity: boolean;
  phone?: string;
  isCustomImported?: boolean;
}

export interface RecruitmentProfile {
  id: string;
  fullName: string;
  gender: 'male' | 'female';
  wilayaCode: string;
  wilayaNameAr: string;
  communeName: string;
  avatarUrl: string;
  degreeLevel: 'doctorat' | 'master' | 'ingenieur' | 'licence' | 'technicien_superieur' | 'cap_cmtc';
  degreeTitleAr: string;
  degreeTitleFr: string;
  universityOrInstitute: string; // e.g. "جامعة العلوم والتكنولوجيا هواري بومدين (USTHB)", "المدرسة الوطنية المتعددة التقنيات (ENP)"
  graduationYear: number; // e.g. 2024, 2025, 2026
  specialtyCategory: 
    | 'civil_engineering' 
    | 'computer_science_ai' 
    | 'electrical_electronics' 
    | 'mechanical_industrial' 
    | 'finance_accounting' 
    | 'medical_pharma' 
    | 'architecture_urbanism' 
    | 'agronomy_food' 
    | 'law_management';
  pfeTitleAr?: string; // Projet de Fin d'Études / مذكرة التخرج
  skills: string[];
  languages: { name: string; level: 'native' | 'fluent' | 'good' | 'intermediate' }[];
  linkedinUrl: string; // LinkedIn Algerian Profile link
  phone: string;
  email: string;
  militaryStatus?: 'exempt' | 'completed' | 'sursis' | 'not_applicable'; // وضعية الخدمة الوطنية للشباب الجزائري
  expectedSalaryDzd: number; // e.g. 65,000 DZD / month
  contractTypeDesired: 'cdi' | 'cdd' | 'anem_cta' | 'stage_pfe' | 'freelance_consulting';
  availability: 'immediate' | 'within_month' | 'notice_period';
  resumePdfUrl?: string;
  isLinkedInVerified: boolean;
  isCustomImported?: boolean;
}

export interface CompanyJobOffer {
  id: string;
  companyName: string;
  companyLogoUrl: string;
  wilayaCode: string;
  communeName: string;
  sector: 'petroleum_energy' | 'btph_construction' | 'pharma_health' | 'tech_digital' | 'agro_industry' | 'finance_banking';
  jobTitleAr: string;
  jobTitleFr: string;
  degreeRequired: 'doctorat' | 'master' | 'ingenieur' | 'licence' | 'technicien_superieur';
  experienceYears: number; // 0 for fresh graduates!
  salaryMinDzd: number;
  salaryMaxDzd: number;
  contractType: 'cdi' | 'cdd' | 'anem_cta';
  descriptionAr: string;
  postedDate: string;
  applicationsCount: number;
  contactEmail: string;
  contactPhone: string;
}

export interface RealEstateListing {
  id: string;
  titleAr: string;
  titleFr: string;
  transactionType: 'sale' | 'rent_yearly' | 'rent_krilo_vacation' | 'exchange' | 'commercial';
  propertyType: 'apartment_f2' | 'apartment_f3' | 'apartment_f4' | 'villa' | 'carcasse' | 'terrain_constructible' | 'terrain_agricole' | 'hangar_depot' | 'local_commercial';
  wilayaCode: string;
  wilayaNameAr: string;
  communeName: string;
  neighborhood: string; // e.g. "حي الياسمين", "سعيد حمدين", "حيدرة"
  areaM2: number;
  priceDzd: number;
  pricePeriodUnit?: 'month' | 'day' | 'total' | 'm2'; // For krilo/rent vs sale
  paperworkStatus: 'acte_livret' | 'decision_attrib' | 'promesse_vente' | 'papier_timbre' | 'en_cours';
  paperworkLabelAr: string;
  roomsCount?: number;
  floorNumber?: number;
  hasElevator?: boolean;
  hasParking?: boolean;
  hasWater24h?: boolean;
  hasGasHeating?: boolean;
  hasSeaView?: boolean;
  sourcePlatform: 'ouedkniss' | 'krilo_dz' | 'facebook_groups' | 'facebook_marketplace' | 'khedma_direct';
  sourceUrl?: string;
  sourceGroupOrSellerName: string;
  contactPhone: string;
  contactWhatsapp?: string;
  imageUrl: string;
  additionalImages?: string[];
  descriptionAr: string;
  postedDate: string;
  isInspectedByKhedma: boolean; // معاينة موثوقة من طرف وسيط خدمة ديزاد
  isCustomImported?: boolean;
}

export interface OnlineCourse {
  id: string;
  titleAr: string;
  titleFr: string;
  category: 
    | 'trades_solar_cctv' 
    | 'auto_scanner_diag' 
    | 'phone_repair_flash' 
    | 'ecommerce_marketing' 
    | 'coding_web_ai' 
    | 'accounting_scf' 
    | 'languages_tcf_ielts' 
    | 'graphic_video_editing';
  categoryLabelAr: string;
  instructorName: string;
  academyName: string;
  rating: number;
  studentsEnrolled: number;
  durationHours: number;
  lessonsCount: number;
  format: '100_percent_online' | 'live_zoom_telegram' | 'blended_hybrid';
  certificateType: 'certified_diploma' | 'attestation_reconnue' | 'qualification_cam';
  priceDzd: number;
  isPromoDiscount?: boolean;
  originalPriceDzd?: number;
  sourceNetwork: 'facebook_page' | 'telegram_academy' | 'tiktok_masterclass' | 'youtube_pro' | 'khedma_academy';
  sourceUrl?: string;
  contactPhone: string;
  contactWhatsapp?: string;
  imageUrl: string;
  syllabusHighlights: string[];
  descriptionAr: string;
  isCustomImported?: boolean;
}

