'use client';

import { useState } from 'react';

export default function Header({ profile }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#22223B]/90 backdrop-blur-md border-b border-[#4A4E69]">
      <div className="h-16 max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        
        {/* Left: Logo & Brand */}
        <a className="font-mono text-sm tracking-widest text-[#F2E9E4] hover:text-[#C9ADA7] transition-colors flex items-center gap-2.5 font-semibold" href="#about">
          <div className="w-8 h-8 rounded bg-[#4A4E69]/40 border border-[#4A4E69] flex items-center justify-center text-[#F2E9E4] shadow-sm">
            <svg className="w-4 h-4 text-[#C9ADA7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="4 17 10 11 4 5"></polyline>
              <line x1="12" y1="19" x2="20" y2="19"></line>
            </svg>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#9A8C98]">//</span>
            <span>{profile?.brand_name || 'EZEA.DEV'}</span>
            <span className="text-[10px] text-[#9A8C98] hidden sm:inline-block font-normal border-l border-[#4A4E69] pl-2 ml-1">
              {profile?.brand_sub || 'DEV.SEC'}
            </span>
          </div>
        </a>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-mono tracking-wider uppercase">
          <a className="text-[#C9ADA7] hover:text-[#F2E9E4] transition-colors" href="#about">About</a>
          <a className="text-[#C9ADA7] hover:text-[#F2E9E4] transition-colors" href="#skills">Skills</a>
          <a className="text-[#C9ADA7] hover:text-[#F2E9E4] transition-colors" href="#projects">Projects</a>
          <a className="text-[#C9ADA7] hover:text-[#F2E9E4] transition-colors" href="#certificates">Certificates</a>
          <a className="text-[#C9ADA7] hover:text-[#F2E9E4] transition-colors" href="#experience">Experience</a>
          <a className="text-[#C9ADA7] hover:text-[#F2E9E4] transition-colors" href="#contact">Contact</a>
        </nav>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Download CV Dropdown */}
          <div className="relative group">
            <button className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#4A4E69]/50 border border-[#4A4E69] hover:border-[#C9ADA7] hover:bg-[#4A4E69] text-xs font-mono uppercase tracking-wider text-[#F2E9E4] transition-colors" type="button">
              <span>Get CV</span>
              <svg className="w-3.5 h-3.5 text-[#9A8C98] group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute right-0 top-full pt-2 hidden group-hover:block z-50">
              <div className="w-60 bg-[#22223B] border border-[#4A4E69] rounded p-1.5 shadow-2xl backdrop-blur-lg">
                <a 
                  className="flex items-center gap-2.5 px-3 py-2 rounded text-[#C9ADA7] hover:text-[#F2E9E4] hover:bg-[#4A4E69]/60 font-mono text-xs transition-colors" 
                  href={profile?.cv?.dev || "/assets/cv/Ezea_Chinonso_Peter_Software_Game_Dev_CV.pdf"}
                  download="Ezea_Chinonso_Peter_Software_Game_Dev_CV.pdf"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F2E9E4]"></span>
                  <span>Software &amp; Game Dev CV</span>
                </a>
                <a 
                  className="flex items-center gap-2.5 px-3 py-2 rounded text-[#C9ADA7] hover:text-[#F2E9E4] hover:bg-[#4A4E69]/60 font-mono text-xs transition-colors" 
                  href={profile?.cv?.sec || "/assets/cv/Ezea_Chinonso_Peter_AppSec_Cybersecurity_CV.pdf"}
                  download="Ezea_Chinonso_Peter_AppSec_Cybersecurity_CV.pdf"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9ADA7]"></span>
                  <span>AppSec &amp; Cybersecurity CV</span>
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="md:hidden p-1.5 rounded bg-[#4A4E69]/40 border border-[#4A4E69] text-[#F2E9E4] hover:text-[#C9ADA7] transition-colors" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            aria-label="Toggle Navigation"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#22223B] border-b border-[#4A4E69] px-6 py-4 flex flex-col gap-3 font-mono text-xs uppercase tracking-wider">
          <a className="text-[#C9ADA7] hover:text-[#F2E9E4] py-1 transition-colors" href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a className="text-[#C9ADA7] hover:text-[#F2E9E4] py-1 transition-colors" href="#skills" onClick={() => setMobileMenuOpen(false)}>Skills</a>
          <a className="text-[#C9ADA7] hover:text-[#F2E9E4] py-1 transition-colors" href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</a>
          <a className="text-[#C9ADA7] hover:text-[#F2E9E4] py-1 transition-colors" href="#certificates" onClick={() => setMobileMenuOpen(false)}>Certificates</a>
          <a className="text-[#C9ADA7] hover:text-[#F2E9E4] py-1 transition-colors" href="#experience" onClick={() => setMobileMenuOpen(false)}>Experience</a>
          <a className="text-[#C9ADA7] hover:text-[#F2E9E4] py-1 transition-colors" href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
        </div>
      )}
    </header>
  );
}
