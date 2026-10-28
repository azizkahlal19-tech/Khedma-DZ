import React, { useState } from 'react';
import { RecruitmentProfile, CompanyJobOffer, Locale } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { parseAndImportLinkedInProfile, parseAndImportJobOffer } from '../../data/recruitmentTalents';
import { ALGERIA_WILAYAS } from '../../data/wilayas';
import { 
  Briefcase, 
  GraduationCap, 
  Linkedin, 
  Search, 
  MapPin, 
  Phone, 
  Mail, 
  FileText, 
  ExternalLink, 
  CheckCircle2, 
  Building2, 
  Clock, 
  DollarSign, 
  PlusCircle, 
  Download, 
  Sparkles, 
  Filter,
  ShieldCheck,
  Laptop,
  Truck,
  Send
} from 'lucide-react';

interface RecruitmentViewProps {
  candidates: RecruitmentProfile[];
  jobOffers: CompanyJobOffer[];
  currentLocale: Locale;
  onOpenChatWithCandidate: (id: string, name: string) => void;
  onAddNewCandidate: (newCandidate: RecruitmentProfile) => void;
  onAddNewJobOffer: (newOffer: CompanyJobOffer) => void;
}

export const RecruitmentView: React.FC<RecruitmentViewProps> = ({
  candidates,
  jobOffers,
  currentLocale,
  onOpenChatWithCandidate,
  onAddNewCandidate,
  onAddNewJobOffer
}) => {
  const t = TRANSLATIONS[currentLocale];
  
  // Navigation tabs within recruitment
  const [subTab, setSubTab] = useState<'jobs' | 'graduates' | 'cvGenerator'>('jobs');
  
  // Filters for Jobs
  const [jobSearch, setJobSearch] = useState('');
  const [jobWilaya, setJobWilaya] = useState('all');
  const [jobSector, setJobSector] = useState<string>('all');
  const [onlyRemoteWork, setOnlyRemoteWork] = useState(false);

  // Filters for Graduates
  const [gradSearch, setGradSearch] = useState('');
  const [gradWilaya, setGradWilaya] = useState('all');
  const [gradDegree, setGradDegree] = useState('all');
  const [gradSpecialty, setGradSpecialty] = useState('all');

  // Modals
  const [isImportLinkedInOpen, setIsImportLinkedInOpen] = useState(false);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [appliedJobSuccess, setAppliedJobSuccess] = useState<string | null>(null);

  // Form states for Import LinkedIn
  const [importLinkedinUrl, setImportLinkedinUrl] = useState('');
  const [importGradName, setImportGradName] = useState('');
  const [importGradDegree, setImportGradDegree] = useState<RecruitmentProfile['degreeLevel']>('ingenieur');
  const [importGradDegreeTitle, setImportGradDegreeTitle] = useState('مهندس دولة في الإعلام الآلي');
  const [importGradUniv, setImportGradUniv] = useState('جامعة العلوم والتكنولوجيا هواري بومدين (USTHB)');
  const [importGradYear, setImportGradYear] = useState(2025);
  const [importGradSpecialty, setImportGradSpecialty] = useState<RecruitmentProfile['specialtyCategory']>('computer_science_ai');
  const [importGradWilayaCode, setImportGradWilayaCode] = useState('16');
  const [importGradPhone, setImportGradPhone] = useState('');
  const [importGradEmail, setImportGradEmail] = useState('');
  const [importGradPfe, setImportGradPfe] = useState('');
  const [importGradSuccess, setImportGradSuccess] = useState(false);

  // Form states for Post Job
  const [newJobCompany, setNewJobCompany] = useState('');
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobWilaya, setNewJobWilaya] = useState('16');
  const [newJobCommune, setNewJobCommune] = useState('الجزائر العاصمة');
  const [newJobSector, setNewJobSector] = useState<CompanyJobOffer['sector']>('tech_digital');
  const [newJobDegree, setNewJobDegree] = useState<CompanyJobOffer['degreeRequired']>('master');
  const [newJobSalaryMin, setNewJobSalaryMin] = useState(60000);
  const [newJobSalaryMax, setNewJobSalaryMax] = useState(90000);
  const [newJobPhone, setNewJobPhone] = useState('0550123456');
  const [newJobEmail, setNewJobEmail] = useState('contact.recrutement@entreprise-dz.com');
  const [newJobDesc, setNewJobDesc] = useState('');
  const [newJobSuccess, setNewJobSuccess] = useState(false);

  // Filtered Job Offers
  const filteredJobs = jobOffers.filter(job => {
    const matchesWilaya = jobWilaya === 'all' || job.wilayaCode === jobWilaya;
    const matchesSector = jobSector === 'all' || job.sector === jobSector;
    const matchesRemote = !onlyRemoteWork || job.communeName.includes('عن بعد') || job.jobTitleAr.includes('عن بعد') || job.jobTitleAr.includes('المنزل');
    const matchesSearch = 
      job.jobTitleAr.toLowerCase().includes(jobSearch.toLowerCase()) ||
      job.companyName.toLowerCase().includes(jobSearch.toLowerCase()) ||
      job.descriptionAr.toLowerCase().includes(jobSearch.toLowerCase());

    return matchesWilaya && matchesSector && matchesRemote && matchesSearch;
  });

  // Filtered Candidates
  const filteredGraduates = candidates.filter(cand => {
    const matchesWilaya = gradWilaya === 'all' || cand.wilayaCode === gradWilaya;
    const matchesDegree = gradDegree === 'all' || cand.degreeLevel === gradDegree;
    const matchesSpecialty = gradSpecialty === 'all' || cand.specialtyCategory === gradSpecialty;
    const matchesSearch = 
      cand.fullName.toLowerCase().includes(gradSearch.toLowerCase()) ||
      cand.degreeTitleAr.toLowerCase().includes(gradSearch.toLowerCase()) ||
      cand.universityOrInstitute.toLowerCase().includes(gradSearch.toLowerCase()) ||
      cand.skills.some(s => s.toLowerCase().includes(gradSearch.toLowerCase()));

    return matchesWilaya && matchesDegree && matchesSpecialty && matchesSearch;
  });

  const handleExecuteImportLinkedIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importLinkedinUrl || !importGradName) return;

    const wilayaObj = ALGERIA_WILAYAS.find(w => w.code === importGradWilayaCode);
    const newCand = parseAndImportLinkedInProfile({
      linkedinUrl: importLinkedinUrl,
      fullName: importGradName,
      degreeLevel: importGradDegree,
      degreeTitleAr: importGradDegreeTitle,
      universityOrInstitute: importGradUniv,
      graduationYear: Number(importGradYear),
      specialtyCategory: importGradSpecialty,
      wilayaCode: importGradWilayaCode,
      wilayaNameAr: wilayaObj ? wilayaObj.nameAr : 'الجزائر',
      phone: importGradPhone,
      email: importGradEmail,
      pfeTitleAr: importGradPfe
    });

    onAddNewCandidate(newCand);
    setImportGradSuccess(true);
    setTimeout(() => {
      setImportGradSuccess(false);
      setIsImportLinkedInOpen(false);
      setImportLinkedinUrl('');
      setImportGradName('');
      setSubTab('graduates');
    }, 1500);
  };

  const handleExecutePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobCompany || !newJobTitle) return;

    const newOffer = parseAndImportJobOffer({
      companyName: newJobCompany,
      jobTitleAr: newJobTitle,
      wilayaCode: newJobWilaya,
      communeName: newJobCommune,
      salaryMinDzd: Number(newJobSalaryMin),
      salaryMaxDzd: Number(newJobSalaryMax),
      degreeRequired: newJobDegree,
      sector: newJobSector,
      contactPhone: newJobPhone,
      contactEmail: newJobEmail,
      descriptionAr: newJobDesc
    });

    onAddNewJobOffer(newOffer);
    setNewJobSuccess(true);
    setTimeout(() => {
      setNewJobSuccess(false);
      setIsPostJobModalOpen(false);
      setNewJobCompany('');
      setNewJobTitle('');
      setSubTab('jobs');
    }, 1500);
  };

  const handleApplyInstant = (jobId: string) => {
    setAppliedJobSuccess(jobId);
    setTimeout(() => {
      setAppliedJobSuccess(null);
    }, 4000);
  };

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-10 border border-blue-900 shadow-xl">
        <div className="absolute top-0 end-0 -mt-10 -me-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="bg-blue-600/30 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-blue-400" />
              <span>البورصة الوطنية للتوظيف والعمل (Le Recrutement DZ)</span>
            </span>
            <span className="bg-emerald-500 text-slate-950 px-2.5 py-0.5 rounded-full font-bold">
              المجال الأكثر ربحية وطلباً
            </span>
            <span className="text-slate-300">
              شهادات جامعية + عمل عن بعد + عقود CDI
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            سوق التوظيف الشامل: خريجو الجامعات، عروض العمل والربط بـ LinkedIn
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            منصة مركزية تجمع الشركات الباحثة عن أصحاب الشهادات، والطلبة المتخرجين (مهندسين، ماستر، تقنيين سامين)، وفرص العمل المربحة من المنزل (Télétravail)، مع إمكانية ربط كل مرشح بحسابه الموثق على LinkedIn واستخراج سيرة ذاتية جزائرية معتمدة.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setIsPostJobModalOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-500 text-white font-bold text-xs sm:text-sm hover:bg-blue-400 transition-colors shadow-lg cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>نشر عرض توظيف جديد (شركات ومؤسسات)</span>
            </button>

            <button
              onClick={() => setIsImportLinkedInOpen(true)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm border border-slate-700 transition-colors cursor-pointer"
            >
              <Linkedin className="w-4 h-4 text-blue-400" />
              <span>إدراج متخرج أو بروفايل LinkedIn</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs sm:text-sm">
        <button
          onClick={() => setSubTab('jobs')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
            subTab === 'jobs'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>عروض العمل والوظائف الشاغرة ({filteredJobs.length})</span>
        </button>

        <button
          onClick={() => setSubTab('graduates')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
            subTab === 'graduates'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>خريجو الجامعات والشهادات (LinkedIn DZ) ({filteredGraduates.length})</span>
        </button>

        <button
          onClick={() => setSubTab('cvGenerator')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
            subTab === 'cvGenerator'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>منشئ السيرة الذاتية المهنية (CV ATS)</span>
        </button>
      </div>

      {/* SUB-TAB 1: Job Offers */}
      {subTab === 'jobs' && (
        <div className="space-y-6">
          {/* Job Filter Bar */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
              
              <div className="relative w-full md:w-1/2">
                <input
                  type="text"
                  value={jobSearch}
                  onChange={(e) => setJobSearch(e.target.value)}
                  placeholder="ابحث عن مهندس، سائق، خدمة عملاء، إلكتروميكانيك، شركة..."
                  className="w-full ps-10 pe-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-900"
                />
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-slate-400">
                  <Search className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <select
                  value={jobWilaya}
                  onChange={(e) => setJobWilaya(e.target.value)}
                  aria-label="تصفية عروض العمل حسب الولاية"
                  className="w-full md:w-44 text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden"
                >
                  <option value="all">كل الولايات (58)</option>
                  {ALGERIA_WILAYAS.map(w => (
                    <option key={w.code} value={w.code}>
                      {w.code} - {w.nameAr}
                    </option>
                  ))}
                </select>

                <select
                  value={jobSector}
                  onChange={(e) => setJobSector(e.target.value)}
                  aria-label="تصفية عروض العمل حسب القطاع"
                  className="w-full md:w-44 text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden"
                >
                  <option value="all">كل القطاعات</option>
                  <option value="tech_digital">تكنولوجيا ومعلوماتية</option>
                  <option value="btph_construction">بناء وأشغال عمومية BTPH</option>
                  <option value="petroleum_energy">محروقات وطاقة</option>
                  <option value="pharma_health">صيدلة وصحة</option>
                  <option value="agro_industry">صناعات غذائية</option>
                </select>
              </div>

            </div>

            {/* Quick Toggle: Remote Work from home */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setOnlyRemoteWork(!onlyRemoteWork)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-colors cursor-pointer ${
                    onlyRemoteWork
                      ? 'bg-blue-50 text-blue-800 border-blue-300'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Laptop className="w-3.5 h-3.5 text-blue-600" />
                  <span>عروض العمل من المنزل والإنترنت (Télétravail) فقط 💻</span>
                </button>
              </div>

              <span className="text-slate-500 font-mono text-[11px]">
                {filteredJobs.length} فرصة عمل متوفرة حالياً
              </span>
            </div>
          </div>

          {/* Jobs Listing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredJobs.map(job => (
              <div
                key={job.id}
                className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Company & Posted Date */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={job.companyLogoUrl}
                        alt={job.companyName}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-xs"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">
                          {job.companyName}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                          <MapPin className="w-3 h-3 text-blue-600 shrink-0" />
                          <span>{job.communeName}</span>
                          <span>·</span>
                          <span className="font-mono">{job.postedDate}</span>
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-bold border border-blue-200 whitespace-nowrap">
                      عقد {job.contractType.toUpperCase()}
                    </span>
                  </div>

                  {/* Job Title */}
                  <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                    {job.jobTitleAr}
                  </h3>

                  {/* Job Description */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {job.descriptionAr}
                  </p>

                  {/* Requirements & Salary */}
                  <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block">المؤهل المطلوب:</span>
                      <span className="font-bold text-slate-800">
                        {job.degreeRequired === 'ingenieur' ? 'مهندس دولة' : job.degreeRequired === 'master' ? 'ماستر 2' : job.degreeRequired === 'technicien_superieur' ? 'تقني سامي (TS)' : 'ليسانس'}
                      </span>
                    </div>

                    <div className="text-end">
                      <span className="text-[10px] text-slate-500 block">الراتب المقترح:</span>
                      <span className="font-extrabold font-mono text-emerald-700">
                        {job.salaryMinDzd.toLocaleString()} - {job.salaryMaxDzd.toLocaleString()} دج
                      </span>
                    </div>
                  </div>
                </div>

                {/* Application Actions */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="text-[11px] text-slate-500">
                    تقدم للمنصب <span className="font-bold font-mono text-slate-800">{job.applicationsCount}</span> مرشح
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${job.contactPhone}`}
                      className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>اتصال</span>
                    </a>

                    <button
                      onClick={() => handleApplyInstant(job.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ${
                        appliedJobSuccess === job.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {appliedJobSuccess === job.id ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>تم إرسال طلبك!</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>تقديم فوري</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: Degreed Graduates & LinkedIn DZ */}
      {subTab === 'graduates' && (
        <div className="space-y-6">
          {/* Graduate Filter Bar */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
              
              <div className="relative w-full md:w-1/2">
                <input
                  type="text"
                  value={gradSearch}
                  onChange={(e) => setGradSearch(e.target.value)}
                  placeholder="ابحث باسم المتخرج، التخصص (هندسة مدنية، بايثون، محاسبة SCF، صيدلة)..."
                  className="w-full ps-10 pe-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-900"
                />
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-slate-400">
                  <Search className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <select
                  value={gradWilaya}
                  onChange={(e) => setGradWilaya(e.target.value)}
                  aria-label="تصفية المرشحين حسب الولاية"
                  className="w-full md:w-44 text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden"
                >
                  <option value="all">كل الولايات (58)</option>
                  {ALGERIA_WILAYAS.map(w => (
                    <option key={w.code} value={w.code}>
                      {w.code} - {w.nameAr}
                    </option>
                  ))}
                </select>

                <select
                  value={gradDegree}
                  onChange={(e) => setGradDegree(e.target.value)}
                  aria-label="تصفية المرشحين حسب الشهادة"
                  className="w-full md:w-44 text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden"
                >
                  <option value="all">كل الشهادات</option>
                  <option value="ingenieur">مهندس دولة</option>
                  <option value="master">ماستر 2</option>
                  <option value="doctorat">دكتوراه / صيدلة</option>
                  <option value="technicien_superieur">تقني سامي (TS)</option>
                  <option value="licence">ليسانس</option>
                </select>
              </div>

            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
              <span className="text-slate-600 font-semibold">
                جميع المرشحين يحملون بروفايلات LinkedIn موثقة 🇩🇿
              </span>
              <button
                onClick={() => setIsImportLinkedInOpen(true)}
                className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>إضافة خريج جديد</span>
              </button>
            </div>
          </div>

          {/* Graduates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGraduates.map(candidate => (
              <div
                key={candidate.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden"
              >
                <div className="p-5 space-y-4">
                  {/* Avatar, Name, LinkedIn Badge */}
                  <div className="flex items-start gap-3">
                    <img
                      src={candidate.avatarUrl}
                      alt={candidate.fullName}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-blue-500 shadow-xs shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="text-sm font-extrabold text-slate-900 truncate">
                          {candidate.fullName}
                        </h3>
                        {candidate.isLinkedInVerified && (
                          <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded-md font-semibold flex items-center gap-1 border border-blue-200" title="بروفايل لينكدإن موثق">
                            <Linkedin className="w-3 h-3 text-blue-600" />
                            <span>LinkedIn DZ</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                        <MapPin className="w-3 h-3 text-blue-600 shrink-0" />
                        <span>{candidate.wilayaNameAr}</span>
                        <span>·</span>
                        <span className="font-bold text-slate-700">{candidate.graduationYear}</span>
                      </div>
                    </div>
                  </div>

                  {/* Degree Title & University */}
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-blue-900 bg-blue-50/70 p-2 rounded-xl border border-blue-100">
                      🎓 {candidate.degreeTitleAr}
                    </div>
                    <div className="text-[11px] text-slate-600 font-medium ps-1">
                      🏛️ {candidate.universityOrInstitute}
                    </div>
                  </div>

                  {/* PFE Project Subject if available */}
                  {candidate.pfeTitleAr && (
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-600 space-y-0.5">
                      <span className="text-[10px] font-bold text-slate-500 block">مذكرة التخرج (PFE):</span>
                      <p className="line-clamp-2 leading-relaxed font-serif text-slate-800">
                        "{candidate.pfeTitleAr}"
                      </p>
                    </div>
                  )}

                  {/* Military Status & Expected Salary */}
                  <div className="flex items-center justify-between text-xs bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100">
                    <div>
                      <span className="text-[10px] text-emerald-800 block">الخدمة الوطنية:</span>
                      <span className="font-semibold text-emerald-900">
                        {candidate.militaryStatus === 'exempt' ? 'معفى رسمي' : candidate.militaryStatus === 'completed' ? 'أدى الواجب' : candidate.militaryStatus === 'sursis' ? 'تأجيل دراسي (Sursis)' : 'غير معني'}
                      </span>
                    </div>

                    <div className="text-end">
                      <span className="text-[10px] text-emerald-800 block">الراتب المتوقع:</span>
                      <span className="font-extrabold font-mono text-emerald-800">
                        {candidate.expectedSalaryDzd.toLocaleString()} دج
                      </span>
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.slice(0, 4).map((sk, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-mono"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Candidate Action Buttons */}
                <div className="p-5 pt-0 space-y-2">
                  <a
                    href={candidate.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white transition-colors shadow-xs flex items-center justify-center gap-2"
                  >
                    <Linkedin className="w-3.5 h-3.5 fill-white" />
                    <span>عرض البروفايل الكامل على LinkedIn</span>
                    <ExternalLink className="w-3 h-3 text-blue-200" />
                  </a>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`tel:${candidate.phone}`}
                      className="py-2 px-2 text-center rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors flex items-center justify-center gap-1"
                    >
                      <Phone className="w-3 h-3 text-slate-600" />
                      <span>اتصال هاتفي</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => onOpenChatWithCandidate(candidate.id, candidate.fullName)}
                      className="py-2 px-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Mail className="w-3 h-3 text-slate-600" />
                      <span>مراسلة فورية</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: Professional Algerian ATS CV Generator */}
      {subTab === 'cvGenerator' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8 max-w-4xl mx-auto">
          <div className="space-y-2 text-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-2 font-bold">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              مولد السيرة الذاتية الجزائرية المعتمدة (Format ATS & ANEM)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
              أنشئ سيرة ذاتية احترافية متوافقة مع أنظمة الفرز الآلي للشركات (ATS) ولمطابقة عروض وكالة التشغيل الوطنية (ANEM).
            </p>
          </div>

          {/* Realistic Algerian CV Preview Card */}
          <div className="border border-slate-300 rounded-2xl p-6 sm:p-8 bg-slate-50/50 shadow-inner space-y-6 text-slate-800">
            {/* CV Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 text-center sm:text-start">
                  المهندس أنيس رحماني (Anis Rahmani)
                </h3>
                <div className="text-xs text-blue-700 font-semibold text-center sm:text-start mt-0.5">
                  مهندس دولة في الهندسة المدنية · خريج USTHB (2025)
                </div>
                <div className="text-[11px] text-slate-500 flex flex-wrap gap-3 mt-2 justify-center sm:justify-start">
                  <span>📍 باب الزوار، الجزائر العاصمة</span>
                  <span>📱 0550882194</span>
                  <span>✉️ anis.rahmani.ingenieur@gmail.com</span>
                  <span>🔗 linkedin.com/in/anis-rahmani-gc-dz</span>
                </div>
              </div>

              <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-slate-300 shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80"
                  alt="Candidate CV"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* CV Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              
              {/* Education */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-blue-900 border-b border-blue-200 pb-1">
                  1. المسار الجامعي والشهادات (Formation)
                </h4>
                <div className="space-y-2">
                  <div>
                    <span className="font-bold block text-slate-900">شهادة مهندس دولة في الهندسة المدنية (2025)</span>
                    <span className="text-[11px] text-slate-500">جامعة العلوم والتكنولوجيا هواري بومدين (USTHB باب الزوار)</span>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      مذكرة تخرج: دراسة زلزالية لبرج سكني ذكي R+12 وفق كود RPA 99 بملاحظة ممتاز.
                    </p>
                  </div>
                  <div>
                    <span className="font-bold block text-slate-900">شهادة البكالوريا تقني رياضي (2020)</span>
                    <span className="text-[11px] text-slate-500">ثانوية الشيخ بوعمامة، بمعدل 16.42/20</span>
                  </div>
                </div>
              </div>

              {/* Skills & Software */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-blue-900 border-b border-blue-200 pb-1">
                  2. البرمجيات والمهارات التقنية (Compétences)
                </h4>
                <div className="space-y-1.5 text-[11px]">
                  <div><span className="font-bold">برامج التصميم:</span> Robot Structural Analysis, AutoCAD Civil 3D, Revit BIM</div>
                  <div><span className="font-bold">القوانين والمراجع:</span> كود الزلازل الجزائري RPA 99 V2003, CBA 93, DTR</div>
                  <div><span className="font-bold">المتابعة الميدانية:</span> إعداد الكشوف الكمية والتقديرية (Métré) ومراقبة الخرسانة</div>
                  <div><span className="font-bold">اللغات:</span> العربية (اللغة الأم)، الفرنسية (ممتاز C1)، الإنجليزية (جيد B2)</div>
                  <div><span className="font-bold">الوضعية العسكرية:</span> تأجيل دراسي ساري المفعول (Sursis) مع بطاقة تسجيل ANEM</div>
                </div>
              </div>

            </div>

            {/* Print/Download Button */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                قالب متوافق مع كافة وكالات التشغيل ANEM ومصالح الموارد البشرية بالشركات
              </span>

              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>تحميل / طباعة السيرة الذاتية (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Import LinkedIn Profile */}
      {isImportLinkedInOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">إدراج خريج جامعي عبر LinkedIn</h3>
                  <p className="text-xs text-slate-500">أدخل رابط الحساب والشهادة لتثبيته في البورصة</p>
                </div>
              </div>
              <button
                onClick={() => setIsImportLinkedInOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {importGradSuccess ? (
              <div className="p-6 bg-blue-50 rounded-2xl border border-blue-200 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-blue-600 mx-auto" />
                <h4 className="text-sm font-bold text-blue-900">تم تسجيل الخريج بنجاح!</h4>
                <p className="text-xs text-blue-700">تم ربط حسابه على LinkedIn وأصبح مرئياً لجميع الشركات والمؤسسات.</p>
              </div>
            ) : (
              <form onSubmit={handleExecuteImportLinkedIn} className="space-y-3.5">
                
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    رابط الحساب على LinkedIn *
                  </label>
                  <input
                    type="text"
                    required
                    value={importLinkedinUrl}
                    onChange={(e) => setImportLinkedinUrl(e.target.value)}
                    placeholder="https://www.linkedin.com/in/username"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    الاسم الكامل للمتخرج *
                  </label>
                  <input
                    type="text"
                    required
                    value={importGradName}
                    onChange={(e) => setImportGradName(e.target.value)}
                    placeholder="مثال: المهندس وسيم بوعلي (Wassim Bouali)"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      المستوى
                    </label>
                    <select
                      value={importGradDegree}
                      onChange={(e) => setImportGradDegree(e.target.value as any)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                    >
                      <option value="ingenieur">مهندس دولة</option>
                      <option value="master">ماستر 2</option>
                      <option value="doctorat">دكتوراه / صيدلة</option>
                      <option value="technicien_superieur">تقني سامي TS</option>
                      <option value="licence">ليسانس</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      سنة التخرج
                    </label>
                    <input
                      type="number"
                      value={importGradYear}
                      onChange={(e) => setImportGradYear(Number(e.target.value))}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    عنوان الشهادة والتخصص
                  </label>
                  <input
                    type="text"
                    value={importGradDegreeTitle}
                    onChange={(e) => setImportGradDegreeTitle(e.target.value)}
                    placeholder="مثال: مهندس دولة في الإعلام الآلي والذكاء الاصطناعي"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    الجامعة أو المعهد الجزائري
                  </label>
                  <input
                    type="text"
                    value={importGradUniv}
                    onChange={(e) => setImportGradUniv(e.target.value)}
                    placeholder="USTHB، المدرسة المتعددة التقنيات ENP، جامعة قسنطينة..."
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      الولاية
                    </label>
                    <select
                      value={importGradWilayaCode}
                      onChange={(e) => setImportGradWilayaCode(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                    >
                      {ALGERIA_WILAYAS.map(w => (
                        <option key={w.code} value={w.code}>
                          {w.code} - {w.nameAr}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      رقم الهاتف
                    </label>
                    <input
                      type="text"
                      value={importGradPhone}
                      onChange={(e) => setImportGradPhone(e.target.value)}
                      placeholder="0550123456"
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    موضوع مذكرة التخرج (PFE)
                  </label>
                  <input
                    type="text"
                    value={importGradPfe}
                    onChange={(e) => setImportGradPfe(e.target.value)}
                    placeholder="موضوع المشروع التطبيقي..."
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsImportLinkedInOpen(false)}
                    className="px-4 py-2 text-xs text-slate-600 font-bold hover:bg-slate-100 rounded-xl"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-700 text-white text-xs font-bold rounded-xl hover:bg-blue-800 shadow-sm cursor-pointer"
                  >
                    حفظ وإدراج
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

      {/* Modal: Post New Job Offer */}
      {isPostJobModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">نشر عرض عمل جديد</h3>
                  <p className="text-xs text-slate-500">للشركات والمصانع والمؤسسات عبر 58 ولاية</p>
                </div>
              </div>
              <button
                onClick={() => setIsPostJobModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {newJobSuccess ? (
              <div className="p-6 bg-blue-50 rounded-2xl border border-blue-200 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-blue-600 mx-auto" />
                <h4 className="text-sm font-bold text-blue-900">تم نشر عرض العمل بنجاح!</h4>
                <p className="text-xs text-blue-700">سيتمكن آلاف الباحثين عن عمل والمهندسين من التقديم الفوري.</p>
              </div>
            ) : (
              <form onSubmit={handleExecutePostJob} className="space-y-3.5">
                
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    اسم الشركة أو المؤسسة المشغلة *
                  </label>
                  <input
                    type="text"
                    required
                    value={newJobCompany}
                    onChange={(e) => setNewJobCompany(e.target.value)}
                    placeholder="مثال: مجمع البناء الحديث SARL"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    المسمى الوظيفي *
                  </label>
                  <input
                    type="text"
                    required
                    value={newJobTitle}
                    onChange={(e) => setNewJobTitle(e.target.value)}
                    placeholder="مثال: مهندس موقع متابعة أشغال خرسانة"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      القطاع
                    </label>
                    <select
                      value={newJobSector}
                      onChange={(e) => setNewJobSector(e.target.value as any)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                    >
                      <option value="tech_digital">تكنولوجيا ومعلوماتية</option>
                      <option value="btph_construction">بناء وأشغال عمومية BTPH</option>
                      <option value="petroleum_energy">محروقات وطاقة</option>
                      <option value="pharma_health">صيدلة وصحة</option>
                      <option value="agro_industry">صناعات غذائية</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      الشهادة المطلوبة
                    </label>
                    <select
                      value={newJobDegree}
                      onChange={(e) => setNewJobDegree(e.target.value as any)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                    >
                      <option value="ingenieur">مهندس دولة</option>
                      <option value="master">ماستر</option>
                      <option value="technicien_superieur">تقني سامي TS</option>
                      <option value="licence">ليسانس</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      الولاية
                    </label>
                    <select
                      value={newJobWilaya}
                      onChange={(e) => setNewJobWilaya(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                    >
                      {ALGERIA_WILAYAS.map(w => (
                        <option key={w.code} value={w.code}>
                          {w.code} - {w.nameAr}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      البلدية أو (عمل عن بعد)
                    </label>
                    <input
                      type="text"
                      value={newJobCommune}
                      onChange={(e) => setNewJobCommune(e.target.value)}
                      placeholder="الدار البيضاء / عمل من المنزل"
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      الراتب الأدنى (دج)
                    </label>
                    <input
                      type="number"
                      value={newJobSalaryMin}
                      onChange={(e) => setNewJobSalaryMin(Number(e.target.value))}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      الراتب الأقصى (دج)
                    </label>
                    <input
                      type="number"
                      value={newJobSalaryMax}
                      onChange={(e) => setNewJobSalaryMax(Number(e.target.value))}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      هاتف التوظيف
                    </label>
                    <input
                      type="text"
                      value={newJobPhone}
                      onChange={(e) => setNewJobPhone(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      value={newJobEmail}
                      onChange={(e) => setNewJobEmail(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    تفاصيل المهام والمسؤوليات
                  </label>
                  <textarea
                    rows={2}
                    value={newJobDesc}
                    onChange={(e) => setNewJobDesc(e.target.value)}
                    placeholder="شرح طبيعة العمل، امتيازات النقل والإطعام..."
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPostJobModalOpen(false)}
                    className="px-4 py-2 text-xs text-slate-600 font-bold hover:bg-slate-100 rounded-xl"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-700 text-white text-xs font-bold rounded-xl hover:bg-blue-800 shadow-sm cursor-pointer"
                  >
                    نشر العرض فورياً
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
