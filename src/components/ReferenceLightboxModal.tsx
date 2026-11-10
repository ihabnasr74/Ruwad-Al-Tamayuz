import React, { useState } from 'react';
import { X, Send, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { ROWAD_CONTENT } from '../data/rowadContent';

interface ReferenceLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'quote' | 'references';
}

export const ReferenceLightboxModal: React.FC<ReferenceLightboxModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'quote',
}) => {
  const [activeTab, setActiveTab] = useState<'quote' | 'references'>(initialTab);
  const [selectedRefImage, setSelectedRefImage] = useState<'page1' | 'workflow6' | 'page2' | 'logo'>('workflow6');
  const [clientName, setClientName] = useState('');
  const [serviceType, setServiceType] = useState('Legal Translation / الترجمة القانونية');
  const [sourceLang, setSourceLang] = useState('English ↔ Arabic');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) {
      setErrorMsg('Please enter your name or company name / يرجى إدخال الاسم');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-heading"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-3xl rounded-2xl bg-white text-slate-900 shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#07191e] text-white border-b border-[#198c96]/30">
          <div className="flex items-center gap-3">
            <h3 id="modal-heading" className="text-base sm:text-lg font-bold">
              Rowad Al Tamayuz — <span className="font-arabic" dir="rtl">رواد التميُّز لخدمات الترجمة</span>
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex items-center gap-2 px-6 py-3 bg-slate-100 border-b border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('quote')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'quote'
                ? 'bg-[#0b3c43] text-white shadow-sm'
                : 'text-slate-700 hover:bg-white'
            }`}
          >
            Request Translation Quote · طلب عرض سعر
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('references')}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'references'
                ? 'bg-[#0b3c43] text-white shadow-sm'
                : 'text-slate-700 hover:bg-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Official Portfolio Sheets · المرفقات الرسمية</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'quote' ? (
            submitted ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">
                  Request Ready for Dispatch · طلبك جاهز للإرسال
                </h4>
                <p className="text-sm text-slate-600 max-w-lg mx-auto">
                  Your translation summary for <strong>{clientName}</strong> ({serviceType}) has been prepared. Connect directly via our official WhatsApp or Email below:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/966563728173?text=${encodeURIComponent(
                      `Hello Rowad Al Tamayuz, I am ${clientName}. Service: ${serviceType} (${sourceLang}). ${notes}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-lg text-xs font-bold bg-[#257d1c] text-white hover:opacity-95 transition-opacity whitespace-nowrap"
                  >
                    Send Documents on WhatsApp (+966563728173)
                  </a>
                  <a
                    href={`mailto:Sami.legal@outlook.com?subject=${encodeURIComponent(
                      `Translation Request - ${clientName}`
                    )}&body=${encodeURIComponent(
                      `Client: ${clientName}\nService: ${serviceType}\nLanguages: ${sourceLang}\nNotes: ${notes}`
                    )}`}
                    className="px-5 py-2.5 rounded-lg text-xs font-bold bg-[#0b3c43] text-white hover:bg-[#198c96] transition-colors whitespace-nowrap"
                  >
                    Email Sami.legal@outlook.com
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Edit Details
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRequestSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="client-name" className="block text-xs font-bold text-slate-700 mb-1.5">
                      Full Name or Organization · الاسم أو الشركة *
                    </label>
                    <input
                      id="client-name"
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Al Tamayuz Legal Group"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#198c96]"
                    />
                  </div>
                  <div>
                    <label htmlFor="service-select" className="block text-xs font-bold text-slate-700 mb-1.5">
                      Specialized Service · نوع الخدمة
                    </label>
                    <select
                      id="service-select"
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:outline-none focus:border-[#198c96]"
                    >
                      <option value="Legal Translation / الترجمة القانونية">Legal Translation · الترجمة القانونية</option>
                      <option value="Commercial Translation / الترجمة التجارية">Commercial Translation · الترجمة التجارية</option>
                      <option value="Technical Translation / الترجمة التقنية">Technical Translation · الترجمة التقنية</option>
                      <option value="Academic & Media Translation / الترجمة المتخصصة">Specialized Academic & Media · الترجمة المتخصصة</option>
                      <option value="Business Setup & MoU Drafting / تأسيس الشركات وصياغة العقود">Business Setup & Contracts · تأسيس الأعمال والعقود</option>
                      <option value="Notary & Dubai Courts Services / الكاتب العدل ومحاكم دبي">Notary & Dubai Courts · خدمات الكاتب العدل ومحاكم دبي</option>
                      <option value="Degree Recognition & Attestation / اعتماد الشهادات والتصديق">Degree Recognition & Attestation · اعتماد الشهادات والتصديق</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="lang-pair" className="block text-xs font-bold text-slate-700 mb-1.5">
                    Language Pair · اللغات المطلوبة
                  </label>
                  <input
                    id="lang-pair"
                    type="text"
                    value={sourceLang}
                    onChange={(e) => setSourceLang(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#198c96]"
                  />
                </div>

                <div>
                  <label htmlFor="doc-notes" className="block text-xs font-bold text-slate-700 mb-1.5">
                    Document Details & Deadline · تفاصيل المستندات وموعد التسليم
                  </label>
                  <textarea
                    id="doc-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Number of pages, attestation needs, or target delivery date..."
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#198c96]"
                  />
                </div>

                {errorMsg && (
                  <p role="alert" className="text-xs font-semibold text-red-600">
                    {errorMsg}
                  </p>
                )}

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-500">
                    Direct WhatsApp: +966563728173 · Hotline: +971 50 509 5759
                  </span>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-[#198c96] hover:bg-[#0b3c43] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Prepare Request · تجهيز الطلب</span>
                  </button>
                </div>
              </form>
            )
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRefImage('workflow6')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold cursor-pointer ${
                    selectedRefImage === 'workflow6'
                      ? 'bg-[#198c96] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  1. Translation Request Process (Steps 1–6)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRefImage('page1')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold cursor-pointer ${
                    selectedRefImage === 'page1'
                      ? 'bg-[#198c96] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  2. Profile, Values & Services Sheet
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRefImage('page2')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold cursor-pointer ${
                    selectedRefImage === 'page2'
                      ? 'bg-[#198c96] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  3. Contacts & Transactions Sheet
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRefImage('logo')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold cursor-pointer ${
                    selectedRefImage === 'logo'
                      ? 'bg-[#198c96] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  4. Official RT Brand Logo
                </button>
              </div>
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 flex items-center justify-center p-2">
                <img
                  src={ROWAD_CONTENT.brand.references[selectedRefImage]}
                  alt={`Official Rowad Al Tamayuz Reference - ${selectedRefImage}`}
                  referrerPolicy="no-referrer"
                  className="max-h-[60vh] w-auto object-contain rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
