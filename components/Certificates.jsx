'use client';

import { useState, useEffect } from 'react';

export default function Certificates({ certificates }) {
  const certs = certificates || [];
  const [selectedDoc, setSelectedDoc] = useState(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedDoc(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getDocUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    const cleanPath = url.startsWith('/') ? url : `/${url}`;
    return cleanPath.split('/').map(segment => encodeURIComponent(segment)).join('/');
  };

  const isPdf = (url) => {
    if (!url) return false;
    return url.toLowerCase().includes('.pdf');
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20 border-b border-[#4A4E69]/60" id="certificates">
      {/* Section Header */}
      <div className="flex flex-col gap-2 mb-8 sm:mb-10">
        <span className="font-mono text-[11px] sm:text-xs text-[#9A8C98] uppercase tracking-widest">// 05. VERIFIED CREDENTIALS</span>
        <h2 className="font-headline text-2xl sm:text-3xl font-bold text-[#F2E9E4]">Certifications &amp; Accreditations</h2>
      </div>

      {/* Grid of Certificates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {certs.map((cert, idx) => {
          const docUrl = getDocUrl(cert.file_url);

          return (
            <div
              key={idx}
              className="bg-[#4A4E69]/20 rounded-lg p-5 sm:p-6 border border-[#4A4E69] flex flex-col justify-between gap-5 hover:border-[#C9ADA7]/40 transition-colors shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#4A4E69] mb-4">
                  <span className="font-mono text-[10px] sm:text-[11px] px-2 py-0.5 rounded bg-[#C9ADA7]/15 text-[#C9ADA7] border border-[#C9ADA7]/30 uppercase font-semibold">
                    ACCREDITED
                  </span>
                  <span className="font-mono text-[10px] sm:text-[11px] text-[#9A8C98]">{cert.date || 'VERIFIED'}</span>
                </div>
                <h3 className="font-headline text-base sm:text-lg font-bold text-[#F2E9E4] mb-1.5 leading-snug">{cert.name}</h3>
                <p className="font-body text-xs text-[#C9ADA7]">{cert.issuer}</p>

                {cert.credential_id && (
                  <div className="mt-3 font-mono text-[10px] text-[#9A8C98] bg-[#22223B] px-2.5 py-1 rounded border border-[#4A4E69] inline-block">
                    ID: {cert.credential_id}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#4A4E69]/60 flex items-center justify-between font-mono text-xs">
                <span className="text-[10px] text-[#9A8C98]">STATUS: CONFIRMED</span>
                {cert.file_url ? (
                  <button
                    type="button"
                    onClick={() => setSelectedDoc({ ...cert, resolvedUrl: docUrl })}
                    className="text-[#F2E9E4] hover:text-[#C9ADA7] bg-[#4A4E69]/40 hover:bg-[#4A4E69] border border-[#4A4E69] px-2.5 py-1.5 rounded flex items-center gap-1.5 transition-colors cursor-pointer group text-[11px] sm:text-xs"
                  >
                    <svg className="w-3.5 h-3.5 text-[#C9ADA7] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>View Document</span>
                  </button>
                ) : (
                  <span className="text-[10px] text-[#C9ADA7] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9ADA7]"></span>
                    ACTIVE RECORD
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* MOBILE-OPTIMIZED IN-BROWSER DOCUMENT VIEWER MODAL */}
      {selectedDoc && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-8 bg-[#22223B]/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedDoc(null)}
        >
          <div 
            className="relative w-full max-w-5xl h-[92vh] sm:h-[88vh] md:h-[85vh] bg-[#2A2A44] border border-[#4A4E69] rounded-xl shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header: Responsive, Always Keeps Close Button Visible */}
            <div className="flex items-center justify-between px-3.5 sm:px-6 py-3 sm:py-3.5 bg-[#22223B] border-b border-[#4A4E69] gap-2 shrink-0">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <span className="hidden sm:inline-block font-mono text-[10px] px-2 py-0.5 rounded bg-[#C9ADA7]/20 text-[#C9ADA7] border border-[#C9ADA7]/30 uppercase font-semibold shrink-0">
                  DOC VIEWER
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-headline text-xs sm:text-base font-bold text-[#F2E9E4] truncate leading-tight">
                    {selectedDoc.name}
                  </h3>
                  <p className="font-body text-[10px] sm:text-xs text-[#9A8C98] truncate">
                    {selectedDoc.issuer} • {selectedDoc.date}
                  </p>
                </div>
              </div>

              {/* Header Action Buttons (Fullscreen + Highly Visible Close X) */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <a
                  href={selectedDoc.resolvedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded bg-[#4A4E69]/40 hover:bg-[#4A4E69] border border-[#4A4E69] hover:border-[#C9ADA7] text-xs font-mono text-[#F2E9E4] transition-colors flex items-center gap-1"
                  title="Open Fullscreen in New Tab"
                >
                  <span className="hidden sm:inline">Fullscreen</span>
                  <svg className="w-3.5 h-3.5 text-[#C9ADA7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>

                {/* PROMINENT CLOSE (X) BUTTON */}
                <button
                  type="button"
                  onClick={() => setSelectedDoc(null)}
                  className="w-8 h-8 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-500/60 text-rose-200 hover:text-white transition-all shadow-md active:scale-95"
                  aria-label="Close Document Viewer"
                  title="Close (Esc)"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body / Viewer Frame */}
            <div className="relative flex-1 w-full bg-[#1b1b2f] flex items-center justify-center overflow-auto p-1 sm:p-2">
              {isPdf(selectedDoc.file_url) ? (
                <iframe
                  src={`${selectedDoc.resolvedUrl}#toolbar=1&navpanes=0`}
                  className="w-full h-full rounded border-0"
                  title={selectedDoc.name}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-2 sm:p-4">
                  <img
                    src={selectedDoc.resolvedUrl}
                    alt={selectedDoc.name}
                    className="max-w-full max-h-full object-contain rounded shadow-lg border border-[#4A4E69]"
                  />
                </div>
              )}
            </div>

            {/* Modal Footer with Dedicated Touch-to-Close Button on Mobile */}
            <div className="px-3.5 sm:px-6 py-2 bg-[#22223B] border-t border-[#4A4E69] flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-[#9A8C98] shrink-0">
              <span className="truncate mr-2">AUTHENTICATED ACCREDITATION RECORD</span>
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="text-[#F2E9E4] hover:text-rose-300 font-semibold uppercase tracking-wider flex items-center gap-1 shrink-0 py-0.5 px-2 rounded bg-[#4A4E69]/40 border border-[#4A4E69]"
              >
                <span>✕ CLOSE</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
