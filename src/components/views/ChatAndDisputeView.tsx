import React, { useState } from 'react';
import { Locale, ChatMessage, DisputeRecord, UserProfile } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { 
  MessageSquare, 
  Send, 
  MapPin, 
  Mic, 
  Image, 
  ShieldAlert, 
  FileText, 
  Play, 
  Pause, 
  Lock,
  CheckCheck,
  AlertTriangle,
  Upload
} from 'lucide-react';

interface ChatAndDisputeViewProps {
  currentLocale: Locale;
  currentUser: UserProfile | null;
  targetWorkerId?: string | null;
  targetWorkerName?: string | null;
}

export const ChatAndDisputeView: React.FC<ChatAndDisputeViewProps> = ({
  currentLocale,
  currentUser,
  targetWorkerId,
  targetWorkerName
}) => {
  const t = TRANSLATIONS[currentLocale];
  const [activeTab, setActiveTab] = useState<'chat' | 'disputes'>('chat');
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      senderId: 'worker-1',
      senderName: targetWorkerName || 'كمال بلقاسم (السباك)',
      text: 'السلام عليكم أخي الكريم. راني في الطريق لعنوانك، تقدر تبعثلي اللوكاليزاسيون الدقيقة عبر الـ GPS؟',
      timestamp: '11:20',
      isSender: false
    },
    {
      id: 'msg-2',
      senderId: 'me',
      senderName: currentUser?.name || 'أنا',
      text: 'وعليكم السلام. هاهو موقع الورشة بالتحديد، راني نستناك عند المدخل الرئيسي.',
      timestamp: '11:22',
      isSender: true,
      attachment: {
        type: 'gps_pin',
        payload: 'حي البساتين، حيدرة، الجزائر العاصمة',
        coordinates: { lat: 36.7538, lng: 3.0588, address: 'Hydra, Alger' }
      }
    }
  ]);

  // Dispute form state
  const [disputeTitle, setDisputeTitle] = useState('مشروع تركيب شبكة الغاز والتدفئة');
  const [disputeReason, setDisputeReason] = useState('');
  const [disputeEscrowDzd, setDisputeEscrowDzd] = useState(35000);
  const [disputeSubmitted, setDisputeSubmitted] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      senderId: 'me',
      senderName: currentUser?.name || 'أنا',
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSender: true
    };
    setMessages([...messages, newMsg]);
    setInputMessage('');
  };

  const handleShareGps = () => {
    const gpsMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      senderId: 'me',
      senderName: currentUser?.name || 'أنا',
      text: 'مشاركة إحداثيات موقعي الجغرافي المباشر:',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSender: true,
      attachment: {
        type: 'gps_pin',
        payload: 'الموقع المباشر (دقة 5 أمتار)',
        coordinates: { lat: 36.7525, lng: 3.042, address: 'Alger Centre' }
      }
    };
    setMessages([...messages, gpsMsg]);
  };

  const handleShareVoice = () => {
    const voiceMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      senderId: 'me',
      senderName: currentUser?.name || 'أنا',
      text: 'تسجيل صوتي (Voice Note)',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSender: true,
      attachment: {
        type: 'voice_note',
        payload: 'audio_stream_algeria.opus',
        durationSeconds: 12
      }
    };
    setMessages([...messages, voiceMsg]);
  };

  const handleSubmitDispute = (e: React.FormEvent) => {
    e.preventDefault();
    setDisputeSubmitted(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Tab Switcher: Chat vs Dispute Resolution Hub */}
      <div className="flex items-center justify-between bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'chat'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>المراسلة المشفرة (Encrypted Chat)</span>
          </button>

          <button
            onClick={() => setActiveTab('disputes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'disputes'
                ? 'bg-red-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>مركز فض النزاعات والتحكيم (Arbitration Hub)</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-700 px-3 font-mono">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>E2EE 256-bit Secure</span>
        </div>
      </div>

      {activeTab === 'chat' ? (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs flex flex-col h-[600px]">
          
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-sm">
                DZ
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  {targetWorkerName || 'كمال بلقاسم (سباك معتمد)'}
                </h3>
                <span className="text-[10px] text-emerald-800 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>
                  متصل الآن (En ligne)
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-700 flex items-center gap-2">
              <span className="font-mono text-emerald-700 font-bold">عقد مضمون (Escrow Protected)</span>
            </div>
          </div>

          {/* Messages Flow View */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.isSender ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3.5 text-xs space-y-1.5 ${
                    msg.isSender
                      ? 'bg-emerald-700 text-white rounded-br-xs shadow-xs'
                      : 'bg-white text-slate-900 border border-slate-200 rounded-bl-xs shadow-xs'
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>

                  {/* GPS Pin Attachment View */}
                  {msg.attachment?.type === 'gps_pin' && (
                    <div className="p-2.5 bg-emerald-800/40 rounded-xl border border-emerald-600/40 space-y-1 mt-1 text-white">
                      <div className="flex items-center gap-1.5 font-bold text-[11px]">
                        <MapPin className="w-3.5 h-3.5 text-amber-300" />
                        <span>موقع لقاء مثبت على الخريطة:</span>
                      </div>
                      <div className="text-[10px] text-emerald-100 font-mono">
                        {msg.attachment.payload}
                      </div>
                    </div>
                  )}

                  {/* Voice Note Attachment View */}
                  {msg.attachment?.type === 'voice_note' && (
                    <div className="p-2 bg-emerald-800/40 rounded-xl flex items-center gap-2 mt-1 text-white">
                      <Play className="w-4 h-4 text-emerald-300 cursor-pointer" />
                      <div className="flex-1 h-1.5 bg-emerald-600 rounded-full overflow-hidden">
                        <div className="w-1/2 h-full bg-white"></div>
                      </div>
                      <span className="text-[10px] font-mono">{msg.attachment.durationSeconds}s</span>
                    </div>
                  )}

                  <div className={`text-[10px] flex items-center justify-end gap-1 ${msg.isSender ? 'text-emerald-200' : 'text-slate-400'}`}>
                    <span>{msg.timestamp}</span>
                    {msg.isSender && <CheckCheck className="w-3 h-3 text-emerald-200" />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input Controls */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
            
            <button
              type="button"
              onClick={handleShareGps}
              className="p-2 rounded-xl text-slate-500 hover:text-emerald-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="مشاركة إحداثيات الـ GPS"
            >
              <MapPin className="w-5 h-5 text-emerald-700" />
            </button>

            <button
              type="button"
              onClick={handleShareVoice}
              className="p-2 rounded-xl text-slate-500 hover:text-emerald-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="تسجيل رسالة صوتية (Voice Note)"
            >
              <Mic className="w-5 h-5 text-emerald-700" />
            </button>

            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="اكتب رسالة مشفرة إلى الحرفي..."
              className="flex-1 px-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
            />

            <button
              type="submit"
              className="p-2.5 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 transition-colors shadow-xs cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      ) : (
        /* DISPUTE MEDIATION HUB */
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="max-w-2xl space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                مركز التحكيم وفض النزاعات وحماية أموال الضمان (Escrow Arbitration)
              </h2>
              <p className="text-xs text-slate-700">
                في حال وجود خلاف حول جودة الأشغال أو عدم الالتزام ببنود العقد، تظل أموال الضمان مجمدة في الخزينة المركزية حتى بتّ لجنة التحكيم.
              </p>
            </div>

            {disputeSubmitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                <h3 className="text-sm font-bold text-emerald-950">تم تسجيل ملف النزاع بنجاح</h3>
                <p className="text-xs text-emerald-900">
                  رقم الملف: <strong>ARB-2026-DZ-8910</strong>. تم تجميد مبلغ <strong>{disputeEscrowDzd.toLocaleString()} دج</strong> في حساب الضمان وسيقوم المشرف العام (Super Admin) بالتدقيق خلال 24 ساعة.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitDispute} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">عنوان العقد أو الخدمة:</label>
                  <input
                    type="text"
                    required
                    value={disputeTitle}
                    onChange={(e) => setDisputeTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">المبلغ المحتجز في الضمان (دج):</label>
                  <input
                    type="number"
                    required
                    value={disputeEscrowDzd}
                    onChange={(e) => setDisputeEscrowDzd(Number(e.target.value))}
                    className="w-full px-3 py-2 font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">سبب النزاع وتفاصيل الإخلال بالعقد:</label>
                  <textarea
                    rows={4}
                    required
                    value={disputeReason}
                    onChange={(e) => setDisputeReason(e.target.value)}
                    placeholder="اشرح الخلل بدقة، التسربات، التأخر، أو عدم مطابقة المواد المتفق عليها..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>

                {/* Evidence Upload Dropzone */}
                <div className="p-6 border-2 border-dashed border-slate-300 rounded-2xl text-center space-y-2 bg-slate-50/50">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto" />
                  <div className="font-semibold text-slate-700">إرفاق صور وفيديوهات إثبات الخلل</div>
                  <div className="text-[10px] text-slate-700">PNG, JPG, MP4 حتى 25 ميغابايت</div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl font-bold bg-red-600 text-white hover:bg-red-700 transition-colors shadow-xs cursor-pointer"
                >
                  رفع النزاع وتجميد أموال الضمان للمراجعة الإدارية
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
