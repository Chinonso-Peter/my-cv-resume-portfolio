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
    // Encode URI components cleanly while preserving slashes
    return cleanPath.split('/').map(segment => encodeURIComponent(segment)).join('/');
  };

  const isPdf = (url) => {
    if (!url) return false;
    return url.toLowerCase().includes('.pdf');
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20 border-b border-[#4A4E69]/60" id="certificates">
      {/* Section Header */}
      <div className="flex flex-col gap-2 mb-10">
        <span className="font-mono text-xs text-[#9A8C98] uppercase tracking-widest">// 05. VERIFIED CREDENTIALS</span>
        <h2 className="font-headline text-2xl md:text-3xl font-bold text-[#F2E9E4]">Certifications &amp; Accreditations</h2>
      </div>

      {/* Grid of Certificates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certs.map((cert, idx) => {
          const docUrl = getDocUrl(cert.file_url);

          return (
            <div
              key={idx}
              className="bg-[#4A4E69]/20 rounded-lg p-6 border border-[#4A4E69] flex flex-col justify-between gap-5 hover:border-[#C9ADA7]/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#4A4E69] mb-4">
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#C9ADA7]/15 text-[#C9ADA7] border border-[#C9ADA7]/30 uppercase font-semibold">
                    ACCREDITED
                  </span>
                  <span className="font-mono text-[11px] text-[#9A8C98]">{cert.date || 'VERIFIED'}</span>
                </div>
                <h3 className="font-headline text-lg font-bold text-[#F2E9E4] mb-1">{cert.name}</h3>
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
                    className="text-[#F2E9E4] hover:text-[#C9ADA7] flex items-center gap-1.5 transition-colors cursor-pointer group"
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

      {/* IN-BROWSER DOCUMENT VIEWER MODAL */}
      {selectedDoc && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#22223B]/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedDoc(null)}
        >
          <div 
            className="relative w-full max-w-5xl h-[85vh] bg-[#2A2A44] border border-[#4A4E69] rounded-xl shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#22223B] border-b border-[#4A4E69]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#C9ADA7]/20 text-[#C9ADA7] border border-[#C9ADA7]/30 uppercase font-semibold">
                  DOCUMENT VIEWER
                </span>
                <div>
                  <h3 className="font-headline text-base font-bold text-[#F2E9E4] leading-tight">
                    {selectedDoc.name}
                  </h3>
                  <p className="font-body text-xs text-[#9A8C98]">
                    {selectedDoc.issuer} • {selectedDoc.date}
                  </p>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-3">
                <a
                  href={selectedDoc.resolvedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded bg-[#4A4E69]/40 hover:bg-[#4A4E69] border border-[#4A4E69] hover:border-[#C9ADA7] text-xs font-mono text-[#F2E9E4] transition-colors flex items-center gap-1.5"
                  title="Open in Full Browser Tab"
                >
                  <span>Open Fullscreen</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedDoc(null)}
                  className="p-1.5 rounded bg-[#4A4E69]/40 hover:bg-red-900/40 border border-[#4A4E69] hover:border-red-500/50 text-[#C9ADA7] hover:text-red-300 transition-colors"
                  aria-label="Close Viewer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body / Viewer Frame */}
            <div className="relative flex-1 w-full bg-[#1b1b2f] flex items-center justify-center overflow-auto p-2">
              {isPdf(selectedDoc.file_url) ? (
                <iframe
                  src={`${selectedDoc.resolvedUrl}#toolbar=1&navpanes=0`}
                  className="w-full h-full rounded border-0"
                  title={selectedDoc.name}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-4">
                  <img
                    src={selectedDoc.resolvedUrl}
                    alt={selectedDoc.name}
                    className="max-w-full max-h-full object-contain rounded shadow-lg border border-[#4A4E69]"
                  />
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-2.5 bg-[#22223B] border-t border-[#4A4E69] flex items-center justify-between font-mono text-[11px] text-[#9A8C98]">
              <span>AUTHENTICATED ACCREDITATION RECORD</span>
              <span className="text-[#C9ADA7]">PRESS ESC TO CLOSE</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
