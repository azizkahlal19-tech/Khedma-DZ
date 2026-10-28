import React, { useState } from 'react';
import { Locale, UserProfile } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { 
  ShieldCheck, 
  Camera, 
  FileText, 
  CheckCircle2, 
  X, 
  Scan, 
  Smile, 
  Eye, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface KYCModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocale: Locale;
  currentUser: UserProfile | null;
  onKycCompleted: (updatedUser: UserProfile) => void;
}

export const KYCModal: React.FC<KYCModalProps> = ({
  isOpen,
  onClose,
  currentLocale,
  currentUser,
  onKycCompleted
}) => {
  const t = TRANSLATIONS[currentLocale];
  const [docType, setDocType] = useState<'id_card' | 'passport' | 'student' | 'driving_b' | 'driving_c' | 'driving_d' | 'driving_e'>('id_card');
  const [scanStep, setScanStep] = useState<'select' | 'scanning_doc' | 'liveness' | 'completed'>('select');
  const [ocrData, setOcrData] = useState<{
    docNumber: string;
    fullName: string;
    birthDate: string;
    wilaya: string;
    mrzLine?: string;
  } | null>(null);
  const [livenessStage, setLivenessStage] = useState<'head_turn' | 'blink' | 'matched'>('head_turn');
  const [matchScore, setMatchScore] = useState(0);

  if (!isOpen) return null;

  const handleStartScan = () => {
    setScanStep('scanning_doc');
    // Simulate smart OCR parsing of biometric document
    setTimeout(() => {
      let docNumber = '109827364501928374';
      let fullName = currentUser?.name || 'محمد أمين بن عودة';
      let birthDate = '14/05/1992';
      let wilaya = '16 - الجزائر (Alger)';
      let mrzLine = undefined;

      if (docType === 'passport') {
        docNumber = '21948271';
        mrzLine = 'P<DZABEN<<AOUDA<<MOHAMED<<<<<<<<<<<<<<<<<<<\n21948271<8DZA9205141M2910287<<<<<<<<<<<<<<04';
      } else if (docType === 'student') {
        docNumber = 'USTHB-2024-88192';
        wilaya = '16 - جامعة باب الزوار (USTHB)';
      } else if (docType.startsWith('driving_')) {
        docNumber = 'PERMIS-DZ-8837190';
      }

      setOcrData({ docNumber, fullName, birthDate, wilaya, mrzLine });
      setScanStep('liveness');
    }, 1500);
  };

  const handlePerformLiveness = () => {
    // Stage 1: head turn
    setTimeout(() => {
      setLivenessStage('blink');
      // Stage 2: blink
      setTimeout(() => {
        setLivenessStage('matched');
        setMatchScore(96.4);
        setScanStep('completed');

        // Grant official verified badge
        if (currentUser) {
          const updated: UserProfile = {
            ...currentUser,
            kyc: {
              isVerified: true,
              documentType: docType,
              documentNumber: ocrData?.docNumber,
              fullName: ocrData?.fullName,
              birthDate: ocrData?.birthDate,
              wilayaCode: currentUser.wilayaCode,
              livenessConfidenceScore: 96.4,
              verifiedAt: new Date().toISOString()
            }
          };
          onKycCompleted(updated);
        }
      }, 1200);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">{t.kyc.title}</h2>
              <p className="text-xs text-slate-700">{t.kyc.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* STEP 1: Select Document Type */}
          {scanStep === 'select' && (
            <div className="space-y-4">
              <label className="block text-xs font-semibold text-slate-700">
                {t.kyc.selectDoc}
              </label>

              <div className="space-y-2 text-xs">
                <button
                  type="button"
                  onClick={() => setDocType('id_card')}
                  className={`w-full p-3 rounded-xl border text-start flex items-center justify-between cursor-pointer transition-all ${
                    docType === 'id_card'
                      ? 'border-emerald-600 bg-emerald-50 font-bold text-emerald-950 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-emerald-700" />
                    <span>{t.kyc.nationalId}</span>
                  </div>
                  <span className="text-[10px] text-slate-700 uppercase">NIN OCR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDocType('passport')}
                  className={`w-full p-3 rounded-xl border text-start flex items-center justify-between cursor-pointer transition-all ${
                    docType === 'passport'
                      ? 'border-emerald-600 bg-emerald-50 font-bold text-emerald-950 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Scan className="w-4 h-4 text-emerald-700" />
                    <span>{t.kyc.passport}</span>
                  </div>
                  <span className="text-[10px] text-slate-700 uppercase">MRZ Scanner</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDocType('student')}
                  className={`w-full p-3 rounded-xl border text-start flex items-center justify-between cursor-pointer transition-all ${
                    docType === 'student'
                      ? 'border-emerald-600 bg-emerald-50 font-bold text-emerald-950 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-emerald-700" />
                    <span>{t.kyc.studentCard}</span>
                  </div>
                  <span className="text-[10px] text-amber-700 font-semibold">شارة طالب مستقل</span>
                </button>

                {/* Driving License Group */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="text-[11px] font-semibold text-slate-700 mb-1.5">
                    رخص السياقة المهنية (Permis de Conduire):
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setDocType('driving_b')}
                      className={`p-2 rounded-lg border text-start cursor-pointer transition-all ${
                        docType === 'driving_b' ? 'border-emerald-600 bg-emerald-50 font-bold text-emerald-950' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {t.kyc.drivingB}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDocType('driving_c')}
                      className={`p-2 rounded-lg border text-start cursor-pointer transition-all ${
                        docType === 'driving_c' ? 'border-emerald-600 bg-emerald-50 font-bold text-emerald-950' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {t.kyc.drivingC}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDocType('driving_d')}
                      className={`p-2 rounded-lg border text-start cursor-pointer transition-all ${
                        docType === 'driving_d' ? 'border-emerald-600 bg-emerald-50 font-bold text-emerald-950' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {t.kyc.drivingD}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDocType('driving_e')}
                      className={`p-2 rounded-lg border text-start cursor-pointer transition-all ${
                        docType === 'driving_e' ? 'border-emerald-600 bg-emerald-50 font-bold text-emerald-950' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {t.kyc.drivingE}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleStartScan}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                <Camera className="w-4 h-4" />
                <span>{t.kyc.captureFront}</span>
              </button>
            </div>
          )}

          {/* STEP 2: Scanning Document */}
          {scanStep === 'scanning_doc' && (
            <div className="text-center py-8 space-y-4">
              <div className="relative w-48 h-32 mx-auto rounded-xl border-2 border-dashed border-emerald-500 bg-emerald-50/50 flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-x-0 h-1 bg-emerald-500 animate-bounce top-1/3"></div>
                <Scan className="w-8 h-8 text-emerald-700 mb-2" />
                <span className="text-[11px] font-mono font-bold text-emerald-900">
                  {currentLocale === 'ar' ? 'جارٍ فحص الـ OCR...' : 'Lecture OCR en cours...'}
                </span>
              </div>
              <p className="text-xs text-slate-700">
                {currentLocale === 'ar'
                  ? 'يتم استخراج الرقم الوطني وتاريخ الميلاد والاسم بدقة...'
                  : 'Extraction automatique des champs biométriques officiels...'}
              </p>
            </div>
          )}

          {/* STEP 3: Video Liveness Check & Motion Detection */}
          {scanStep === 'liveness' && (
            <div className="space-y-4">
              {/* Pre-extracted OCR data badge */}
              {ocrData && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs space-y-1">
                  <div className="flex justify-between font-semibold text-emerald-900">
                    <span>{ocrData.fullName}</span>
                    <span className="font-mono">{ocrData.docNumber}</span>
                  </div>
                  <div className="text-[11px] text-emerald-700">
                    {ocrData.birthDate} · {ocrData.wilaya}
                  </div>
                  {ocrData.mrzLine && (
                    <div className="text-[9px] font-mono text-emerald-800 bg-emerald-100/50 p-1 rounded-sm overflow-hidden whitespace-pre-wrap">
                      {ocrData.mrzLine}
                    </div>
                  )}
                </div>
              )}

              <div className="p-4 bg-slate-900 text-white rounded-2xl text-center space-y-3">
                <div className="w-24 h-24 rounded-full border-4 border-emerald-500 mx-auto flex items-center justify-center relative overflow-hidden bg-slate-800">
                  {livenessStage === 'head_turn' && <Smile className="w-12 h-12 text-emerald-400" />}
                  {livenessStage === 'blink' && <Eye className="w-12 h-12 text-amber-400 animate-pulse" />}
                  {livenessStage === 'matched' && <CheckCircle2 className="w-12 h-12 text-emerald-400" />}
                </div>

                <div className="text-sm font-bold text-emerald-400">
                  {livenessStage === 'head_turn' && 'الخطوة 1: الالتفات قليلاً لليمين'}
                  {livenessStage === 'blink' && 'الخطوة 2: الغمز بالعينين للكاميرا'}
                  {livenessStage === 'matched' && 'تم فحص الحركة الحية بنجاح!'}
                </div>

                <p className="text-xs text-slate-300">
                  {t.kyc.livenessPrompt}
                </p>

                <button
                  type="button"
                  onClick={handlePerformLiveness}
                  className="py-2 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  {currentLocale === 'ar' ? 'بدء فحص الحركة والمطابقة' : 'Démarrer le test de vivacité'}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Verification Approved */}
          {scanStep === 'completed' && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {currentLocale === 'ar' ? 'تهانينا! تم توثيق هويتك رسمياً' : 'Félicitations ! Identité Vérifiée'}
                </h3>
                <p className="text-xs text-slate-700 mt-1">
                  {t.kyc.matchScore} <strong className="font-mono text-emerald-700 text-sm">{matchScore}%</strong> (أعلى من عتبة الأمان 85%)
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>الشارة الخضراء مفعلة بحسابك</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                {t.common.close}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
