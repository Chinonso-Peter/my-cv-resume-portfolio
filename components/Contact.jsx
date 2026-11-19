'use client';

import { useState } from 'react';

export default function Contact({ profile }) {
  const p = profile || {};
  const email = p.email || 'chinonsopeter456@gmail.com';
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Copy error:', err);
    });
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-24" id="contact">
      <div className="bg-[#4A4E69]/20 rounded-lg p-5 sm:p-8 md:p-12 border border-[#4A4E69] shadow-2xl relative overflow-hidden">
        
        {/* Subtle Top Accents */}
        <div className="absolute top-0 left-0 w-24 h-[2px] bg-[#F2E9E4]"></div>
        <div className="absolute top-0 right-0 w-24 h-[2px] bg-[#C9ADA7]"></div>

        <div className="flex flex-col gap-3 sm:gap-4 max-w-2xl">
          <span className="font-mono text-[11px] sm:text-xs text-[#9A8C98] uppercase tracking-widest">// SECURE CONTACT TERMINAL</span>
          <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-[#F2E9E4] tracking-tight">
            Let’s build—or secure—something great.
          </h2>
          <p className="font-body text-sm sm:text-base text-[#C9ADA7] leading-relaxed">
            Open to software engineering, Unity game development, and cybersecurity / VAPT roles, contracts, or freelance collaborations.
          </p>
        </div>

        {/* Action Row - Mobile Optimized */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-6 sm:pt-8">
          
          {/* One-click Copy Email Button */}
          <button 
            className="relative inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#F2E9E4] text-[#22223B] font-mono text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#C9ADA7] active:scale-98 transition-all shadow-md min-h-[44px]"
            onClick={handleCopyEmail}
            type="button"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>{copied ? 'EMAIL COPIED!' : 'Copy Email Address'}</span>
            
            {/* Tooltip Toast */}
            {copied && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#22223B] text-[#F2E9E4] border border-[#4A4E69] text-[10px] font-mono px-2 py-0.5 rounded shadow-lg">
                COPIED!
              </span>
            )}
          </button>

          {/* Direct Send Email Link */}
          <a 
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#4A4E69]/40 border border-[#4A4E69] hover:border-[#C9ADA7] text-[#F2E9E4] font-mono text-xs font-medium uppercase tracking-wider rounded hover:bg-[#4A4E69] transition-colors min-h-[44px]" 
            href={`mailto:${email}`}
          >
            <svg className="w-4 h-4 text-[#9A8C98]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Send Email</span>
          </a>

          {/* Monospaced Email String Indicator */}
          <span className="font-mono text-xs text-[#9A8C98] text-center sm:text-left mt-1 sm:mt-0">
            {email}
          </span>
        </div>

        {/* Clean Social Links: 2-Column Grid on Mobile, Flex on Desktop */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3.5 sm:gap-6 pt-6 sm:pt-10 mt-6 sm:mt-8 border-t border-[#4A4E69]/60 font-mono text-xs text-[#9A8C98]">
          <a className="hover:text-[#F2E9E4] flex items-center gap-1.5 transition-colors p-1" href={p.social?.github || "https://github.com/Chinonso-Peter"} rel="noopener noreferrer" target="_blank">
            <span>GitHub</span>
            <svg className="w-3 h-3 text-[#C9ADA7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7m0 0H7m10 0v10" />
            </svg>
          </a>
          <a className="hover:text-[#C9ADA7] flex items-center gap-1.5 transition-colors p-1" href={p.social?.linkedin || "https://www.linkedin.com/in/chinonso-peter-a02212299/"} rel="noopener noreferrer" target="_blank">
            <span>LinkedIn</span>
            <svg className="w-3 h-3 text-[#C9ADA7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7m0 0H7m10 0v10" />
            </svg>
          </a>
          <a className="hover:text-[#C9ADA7] flex items-center gap-1.5 transition-colors p-1" href={p.social?.medium || "https://medium.com/@chinonsopeter456"} rel="noopener noreferrer" target="_blank">
            <span>Medium</span>
            <svg className="w-3 h-3 text-[#C9ADA7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7m0 0H7m10 0v10" />
            </svg>
          </a>
          <a className="hover:text-[#F2E9E4] flex items-center gap-1.5 transition-colors p-1" href={p.social?.x || "https://x.com/m0n4rch0_0"} rel="noopener noreferrer" target="_blank">
            <span>X (Twitter)</span>
            <svg className="w-3 h-3 text-[#C9ADA7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7m0 0H7m10 0v10" />
            </svg>
          </a>
          <a className="hover:text-[#F2E9E4] flex items-center gap-1.5 transition-colors p-1" href={p.social?.itch_vecna || "https://vecna-games.itch.io"} rel="noopener noreferrer" target="_blank">
            <span>itch.io (Cavern)</span>
            <svg className="w-3 h-3 text-[#C9ADA7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7m0 0H7m10 0v10" />
            </svg>
          </a>
          <a className="hover:text-[#C9ADA7] flex items-center gap-1.5 transition-colors p-1" href={p.social?.itch_personal || "https://peters-g.itch.io"} rel="noopener noreferrer" target="_blank">
            <span>itch.io (Personal)</span>
            <svg className="w-3 h-3 text-[#C9ADA7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7m0 0H7m10 0v10" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
