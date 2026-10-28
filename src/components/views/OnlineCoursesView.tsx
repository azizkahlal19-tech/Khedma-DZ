import React, { useState } from 'react';
import { OnlineCourse, Locale } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { parseAndImportOnlineCourse } from '../../data/onlineCourses';
import { 
  GraduationCap, 
  Search, 
  Star, 
  Clock, 
  Users, 
  Video, 
  Award, 
  Phone, 
  PlusCircle, 
  CheckCircle2, 
  ExternalLink, 
  Zap, 
  Filter, 
  Send, 
  Play,
  BookOpen,
  MessageCircle,
  TrendingUp,
  Globe2
} from 'lucide-react';

interface OnlineCoursesViewProps {
  courses: OnlineCourse[];
  currentLocale: Locale;
  onAddNewCourse: (newCourse: OnlineCourse) => void;
}

export const OnlineCoursesView: React.FC<OnlineCoursesViewProps> = ({
  courses,
  currentLocale,
  onAddNewCourse
}) => {
  const t = TRANSLATIONS[currentLocale];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  
  // Registration / Application state
  const [registeredSuccessCourseId, setRegisteredSuccessCourseId] = useState<string | null>(null);

  // Import Modal
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importTitle, setImportTitle] = useState('');
  const [importUrl, setImportUrl] = useState('');
  const [importNetwork, setImportNetwork] = useState<OnlineCourse['sourceNetwork']>('facebook_page');
  const [importCategory, setImportCategory] = useState<OnlineCourse['category']>('trades_solar_cctv');
  const [importInstructor, setImportInstructor] = useState('');
  const [importAcademy, setImportAcademy] = useState('');
  const [importPrice, setImportPrice] = useState(15000);
  const [importPhone, setImportPhone] = useState('');
  const [importDuration, setImportDuration] = useState(30);
  const [importDesc, setImportDesc] = useState('');
  const [importSuccess, setImportSuccess] = useState(false);

  const categories = [
    { id: 'all', labelAr: 'كل التكوينات والدورات' },
    { id: 'trades_solar_cctv', labelAr: 'طاقة شمسية وكاميرات مراقبة' },
    { id: 'auto_scanner_diag', labelAr: 'سكانير وتشخيص السيارات' },
    { id: 'ecommerce_marketing', labelAr: 'تجارة إلكترونية E-commerce' },
    { id: 'phone_repair_flash', labelAr: 'صيانة وتفليش الهواتف' },
    { id: 'accounting_scf', labelAr: 'محاسبة وجبائية G50' }
  ];

  const filteredCourses = courses.filter(crs => {
    const matchesCat = selectedCategory === 'all' || crs.category === selectedCategory;
    const matchesFormat = selectedFormat === 'all' || crs.format === selectedFormat;
    const matchesSearch = 
      crs.titleAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crs.instructorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crs.academyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crs.syllabusHighlights.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCat && matchesFormat && matchesSearch;
  });

  const handleExecuteImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importTitle || !importPhone) return;

    const newCrs = parseAndImportOnlineCourse({
      titleAr: importTitle,
      sourceUrl: importUrl,
      sourceNetwork: importNetwork,
      category: importCategory,
      instructorName: importInstructor,
      academyName: importAcademy,
      priceDzd: Number(importPrice),
      contactPhone: importPhone,
      durationHours: Number(importDuration),
      descriptionAr: importDesc
    });

    onAddNewCourse(newCrs);
    setImportSuccess(true);
    setTimeout(() => {
      setImportSuccess(false);
      setIsImportModalOpen(false);
      setImportTitle('');
      setImportPhone('');
    }, 1500);
  };

  const handleRegisterInstant = (courseId: string) => {
    setRegisteredSuccessCourseId(courseId);
    setTimeout(() => {
      setRegisteredSuccessCourseId(null);
    }, 4000);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-emerald-950 via-teal-950 to-slate-900 text-white p-6 sm:p-10 border border-emerald-800 shadow-xl">
        <div className="absolute top-0 end-0 -mt-10 -me-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
              <span>فضاء التكوين والدورات أونلاين (Formations en Ligne DZ)</span>
            </span>
            <span className="bg-emerald-500 text-slate-950 px-2.5 py-0.5 rounded-full font-bold">
              تجميع من كافة المنصات
            </span>
            <span className="text-slate-300">
              شهادات معتمدة + دفع محلي بـ BaridiMob
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            أقوى الدورات التكوينية عبر الإنترنت لتأهيل الحرفيين ورواد الأعمال
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            دورات تخصصية مجمعة من فيسبوك وتليغرام وتيك توك وأكاديميات التكوين المعتمدة في الجزائر: طاقة شمسية، سكانير سيارات، صيانة هواتف، تجارة إلكترونية، ومحاسبة SCF. مع إمكانية متابعة المحتوى عن بعد والحصول على شهادة كفاءة مهنية.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setIsImportModalOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs sm:text-sm hover:bg-emerald-400 transition-colors shadow-lg cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>استيراد دورة تكوينية من الشبكة الإلكترونية</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بدورة طاقة شمسية، سكانير، تجارة إلكترونية، بايثون..."
              className="w-full ps-10 pe-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
            />
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              aria-label="تصفية حسب نمط التكوين"
              className="w-full md:w-48 text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden"
            >
              <option value="all">كل الأنماط</option>
              <option value="100_percent_online">100% مسجل أونلاين</option>
              <option value="live_zoom_telegram">مباشر عبر زووم وتليغرام</option>
              <option value="blended_hybrid">تكوين هجين (حضوري + أونلاين)</option>
            </select>
          </div>

        </div>

        {/* Categories Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 pt-2 border-t border-slate-100">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-700 text-white font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.labelAr}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <div
            key={course.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden group"
          >
            <div>
              {/* Image Preview with Source Platform Badge */}
              <div className="aspect-16/9 bg-slate-100 overflow-hidden relative">
                <img
                  src={course.imageUrl}
                  alt={course.titleAr}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute top-2 start-2 flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs text-white">
                    {course.categoryLabelAr}
                  </span>
                  {course.isPromoDiscount && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-red-600 text-white shadow-xs">
                      عرض ترويجي 🔥
                    </span>
                  )}
                </div>

                <div className="absolute bottom-2 start-2 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-mono px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-400" />
                  <span>{course.durationHours} ساعة تدريبية</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3.5">
                
                {/* Academy & Rating */}
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-slate-700 truncate max-w-[200px]">
                    {course.academyName}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 font-bold font-mono">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{course.rating}</span>
                    <span className="text-slate-400 font-normal">({course.studentsEnrolled})</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-sm font-extrabold text-slate-900 leading-snug line-clamp-2">
                  {course.titleAr}
                </h3>

                {/* Instructor */}
                <div className="text-xs text-slate-600">
                  <span className="text-slate-400 font-normal">المؤطر: </span>
                  <span className="font-bold text-slate-800">{course.instructorName}</span>
                </div>

                {/* Syllabus Highlights */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1 text-[11px] text-slate-700">
                  <span className="text-[10px] font-bold text-emerald-800 block">أبرز محاور الدورة:</span>
                  {course.syllabusHighlights.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-1">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Price Display */}
                <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-emerald-800 block font-medium">سعر الدورة (بريدي موب):</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-extrabold font-mono text-emerald-950">
                        {course.priceDzd.toLocaleString()} دج
                      </span>
                      {course.originalPriceDzd && (
                        <span className="text-xs font-mono text-slate-400 line-through">
                          {course.originalPriceDzd.toLocaleString()} دج
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="text-[10px] font-bold bg-white px-2 py-1 rounded-md border border-emerald-300 text-emerald-900">
                    شهادة معتمدة 📜
                  </span>
                </div>

              </div>
            </div>

            {/* Actions: Direct WhatsApp & Register */}
            <div className="p-5 pt-0 space-y-2">
              <button
                type="button"
                onClick={() => handleRegisterInstant(course.id)}
                className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer ${
                  registeredSuccessCourseId === course.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                }`}
              >
                {registeredSuccessCourseId === course.id ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>تم حجز مقعدك بنجاح! سيتم الاتصال بك لتأكيد بريدي موب</span>
                  </>
                ) : (
                  <>
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>حجز مقعد والتسجيل الفوري بالدورة</span>
                  </>
                )}
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${course.contactPhone}`}
                  className="py-2 px-2 text-center rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors flex items-center justify-center gap-1"
                >
                  <Phone className="w-3 h-3 text-slate-600" />
                  <span>اتصال بالمركز</span>
                </a>

                {course.contactWhatsapp ? (
                  <a
                    href={`https://wa.me/${course.contactWhatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-2 text-center rounded-xl text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors flex items-center justify-center gap-1"
                  >
                    <MessageCircle className="w-3 h-3 text-emerald-600" />
                    <span>واتساب وتليغرام</span>
                  </a>
                ) : (
                  <a
                    href={course.sourceUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-2 text-center rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors flex items-center justify-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3 text-slate-600" />
                    <span>رابط الدورة</span>
                  </a>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Modal: Import Online Course */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">استيراد دورة تكوينية أونلاين</h3>
                  <p className="text-xs text-slate-500">من فيسبوك، تليغرام، تيك توك، أو يوتيوب</p>
                </div>
              </div>
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {importSuccess ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-900">تم إدراج الدورة التكوينية بنجاح!</h4>
                <p className="text-xs text-emerald-700">أصبحت الدورة متاحة الآن للتسجيل المباشر بالدينار الجزائري.</p>
              </div>
            ) : (
              <form onSubmit={handleExecuteImport} className="space-y-3.5">
                
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    عنوان الدورة التكوينية *
                  </label>
                  <input
                    type="text"
                    required
                    value={importTitle}
                    onChange={(e) => setImportTitle(e.target.value)}
                    placeholder="مثال: دورة تركيب الألواح الشمسية ومضخات السقي الفلاحي"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      الشبكة المصدر
                    </label>
                    <select
                      value={importNetwork}
                      onChange={(e) => setImportNetwork(e.target.value as any)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                    >
                      <option value="facebook_page">صفحة فيسبوك</option>
                      <option value="telegram_academy">قناة تليغرام</option>
                      <option value="tiktok_masterclass">تيك توك ماستركلاس</option>
                      <option value="youtube_pro">يوتيوب تدريبي</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      مجال التكوين
                    </label>
                    <select
                      value={importCategory}
                      onChange={(e) => setImportCategory(e.target.value as any)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                    >
                      <option value="trades_solar_cctv">طاقة شمسية وكاميرات</option>
                      <option value="auto_scanner_diag">تشخيص وسكانير سيارات</option>
                      <option value="ecommerce_marketing">تجارة إلكترونية وتسويق</option>
                      <option value="phone_repair_flash">صيانة هواتف وتفليش</option>
                      <option value="accounting_scf">محاسبة وجبائية SCF</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      اسم المدرب أو الخبير
                    </label>
                    <input
                      type="text"
                      value={importInstructor}
                      onChange={(e) => setImportInstructor(e.target.value)}
                      placeholder="المهندس أو الأستاذ..."
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      الأكاديمية أو المركز
                    </label>
                    <input
                      type="text"
                      value={importAcademy}
                      onChange={(e) => setImportAcademy(e.target.value)}
                      placeholder="أكاديمية التدريب..."
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      السعر بالدينار (دج)
                    </label>
                    <input
                      type="number"
                      value={importPrice}
                      onChange={(e) => setImportPrice(Number(e.target.value))}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      رقم الهاتف / واتساب *
                    </label>
                    <input
                      type="text"
                      required
                      value={importPhone}
                      onChange={(e) => setImportPhone(e.target.value)}
                      placeholder="0550123456"
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    رابط المنشور أو القناة (URL)
                  </label>
                  <input
                    type="text"
                    value={importUrl}
                    onChange={(e) => setImportUrl(e.target.value)}
                    placeholder="https://t.me/formation_dz أو منشور فيسبوك"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsImportModalOpen(false)}
                    className="px-4 py-2 text-xs text-slate-600 font-bold hover:bg-slate-100 rounded-xl"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-emerald-700 text-white text-xs font-bold rounded-xl hover:bg-emerald-800 shadow-sm cursor-pointer"
                  >
                    تأكيد وإدراج الدورة
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
