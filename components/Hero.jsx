export default function Hero({ profile }) {
  const p = profile || {};
  const portraitSrc = p.portrait
    ? (p.portrait.startsWith('http') || p.portrait.startsWith('/') ? p.portrait : `/${p.portrait}`)
    : '/assets/images/ProfilePic.jpg';

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-24 border-b border-[#4A4E69]/60" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        
        {/* Left Column: Headline, Bio & Actions */}
        <div className="lg:col-span-8 flex flex-col gap-5 sm:gap-6">
          
          {/* Eyebrow Tag */}
          <div className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 self-start font-mono text-[10px] sm:text-xs tracking-wider bg-[#22223B] px-3 py-1.5 rounded border border-[#4A4E69]">
            <span className="text-[#F2E9E4] font-semibold">{p.eyebrow_role || 'SOFTWARE & GAME DEVELOPER'}</span>
            <span className="text-[#9A8C98]">•</span>
            <span className="text-[#C9ADA7] font-semibold">{p.eyebrow_sec || 'CYBERSECURITY PRACTITIONER'}</span>
          </div>

          {/* Headline */}
          <h1 className="font-headline text-2xl sm:text-4xl md:text-5xl lg:text-[44px] font-bold text-[#F2E9E4] tracking-tight leading-[1.2]">
            {p.headline || 'I build resilient software and games—and test web systems to make them harder to break.'}
          </h1>

          {/* About Me Copy */}
          <p className="font-body text-sm sm:text-base md:text-lg text-[#C9ADA7] leading-relaxed max-w-2xl">
            {p.bio || 'I’m Ezea Chinonso Peter, a software developer, game creator, and cybersecurity practitioner based in Nigeria.'}
          </p>

          {/* Action Row: Mobile Responsive */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
            <a 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#F2E9E4] text-[#22223B] font-mono text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#C9ADA7] transition-colors shadow-md w-full sm:w-auto" 
              href="#projects"
            >
              <span>View Projects</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>

            {/* Social Icon Links */}
            <div className="flex items-center justify-start gap-1 sm:gap-2 text-[#9A8C98] sm:border-l sm:border-[#4A4E69] sm:pl-4 overflow-x-auto py-1">
              {/* GitHub */}
              <a className="p-2 sm:p-2.5 rounded-lg hover:text-[#F2E9E4] hover:bg-[#4A4E69]/40 border border-transparent hover:border-[#4A4E69] transition-colors" href={p.social?.github || "https://github.com/Chinonso-Peter"} rel="noopener noreferrer" target="_blank" title="GitHub">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"></path></svg>
              </a>
              {/* LinkedIn */}
              <a className="p-2 sm:p-2.5 rounded-lg hover:text-[#C9ADA7] hover:bg-[#4A4E69]/40 border border-transparent hover:border-[#4A4E69] transition-colors" href={p.social?.linkedin || "https://www.linkedin.com/in/chinonso-peter-a02212299/"} rel="noopener noreferrer" target="_blank" title="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
              </a>
              {/* Medium */}
              <a className="p-2 sm:p-2.5 rounded-lg hover:text-[#C9ADA7] hover:bg-[#4A4E69]/40 border border-transparent hover:border-[#4A4E69] transition-colors" href={p.social?.medium || "https://medium.com/@chinonsopeter456"} rel="noopener noreferrer" target="_blank" title="Medium Write-Ups">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"></path></svg>
              </a>
              {/* X */}
              <a className="p-2 sm:p-2.5 rounded-lg hover:text-[#F2E9E4] hover:bg-[#4A4E69]/40 border border-transparent hover:border-[#4A4E69] transition-colors" href={p.social?.x || "https://x.com/m0n4rch0_0"} rel="noopener noreferrer" target="_blank" title="X: @m0n4rch0_0">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
              </a>
              {/* Itch.io */}
              <a className="p-2 sm:p-2.5 rounded-lg hover:text-[#F2E9E4] hover:bg-[#4A4E69]/40 border border-transparent hover:border-[#4A4E69] transition-colors" href={p.social?.itch_vecna || "https://vecna-games.itch.io"} rel="noopener noreferrer" target="_blank" title="itch.io (Cavern Studios)">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M2.5 4.5A1.5 1.5 0 001 6v1.2a4.8 4.8 0 002.5 4.2V20a2 2 0 002 2h13a2 2 0 002-2v-8.6a4.8 4.8 0 002.5-4.2V6a1.5 1.5 0 00-1.5-1.5H2.5zm6.5 5.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm6 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM7 16h3v1H7v-1zm7 0h3v1h-3v-1z"></path></svg>
              </a>
              {/* Direct Mail */}
              <a className="p-2 sm:p-2.5 rounded-lg hover:text-[#C9ADA7] hover:bg-[#4A4E69]/40 border border-transparent hover:border-[#4A4E69] transition-colors" href={`mailto:${p.email || 'chinonsopeter456@gmail.com'}`} title="Email Direct">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Centered Portrait Photo Frame */}
        <div className="lg:col-span-4 flex flex-col items-center">
          <div className="relative w-full max-w-[280px] sm:max-w-xs md:max-w-sm bg-[#4A4E69]/20 p-2.5 sm:p-3 rounded-lg border border-[#4A4E69] shadow-2xl">
            {/* Architectural Corner Tick Marks */}
            <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t border-l border-[#F2E9E4] pointer-events-none"></div>
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t border-r border-[#F2E9E4] pointer-events-none"></div>
            <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b border-l border-[#C9ADA7] pointer-events-none"></div>
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b border-r border-[#C9ADA7] pointer-events-none"></div>

            {/* 4:5 Aspect Ratio Photo Container */}
            <div className="aspect-[4/5] w-full overflow-hidden rounded bg-[#2A2A44] border border-[#4A4E69] relative">
              <img 
                alt={p.name || "Ezea Chinonso Peter"} 
                className="w-full h-full object-cover rounded-md block" 
                src={portraitSrc}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#22223B]/80 via-transparent to-transparent pointer-events-none"></div>
              
              {/* Monospaced Overlay Stamp */}
              <span className="absolute bottom-2 left-2.5 font-mono text-[9px] sm:text-[10px] text-[#F2E9E4] bg-[#22223B]/90 px-2 py-0.5 rounded border border-[#4A4E69] backdrop-blur-sm">
                ID // CHINONSO_DEV_SEC
              </span>
            </div>

            {/* Compact Monospaced Status Strip */}
            <div className="mt-2.5 pt-2 border-t border-[#4A4E69]/70 flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-[#C9ADA7] animate-pulse shrink-0"></span>
                <span className="font-mono text-[10px] sm:text-[11px] tracking-wide text-[#F2E9E4] truncate">{p.status || 'AVAILABLE FOR ROLES & CONTRACTS'}</span>
              </div>
              <span className="font-mono text-[10px] text-[#9A8C98] shrink-0 ml-2">{p.year || '2026'}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
