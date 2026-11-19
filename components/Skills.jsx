export default function Skills({ skills }) {
  const s = skills || {};
  const cyber = s.cybersecurity || [];
  const soft = s.software || [];
  const game = s.game_dev || [];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20 border-b border-[#4A4E69]/60" id="skills">
      {/* Section Header */}
      <div className="flex flex-col gap-2 mb-8 sm:mb-10">
        <span className="font-mono text-[11px] sm:text-xs text-[#9A8C98] uppercase tracking-widest">// 02. CAPABILITIES</span>
        <h2 className="font-headline text-2xl sm:text-3xl font-bold text-[#F2E9E4]">Technical Skills Matrix</h2>
      </div>

      {/* Clean 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        
        {/* Column 1: Cybersecurity & Pentesting */}
        <div className="bg-[#4A4E69]/20 rounded-lg p-5 sm:p-6 border border-[#4A4E69] flex flex-col justify-between hover:border-[#C9ADA7]/40 transition-colors shadow-sm">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-[#4A4E69] mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C9ADA7]"></span>
                <span className="font-mono text-xs uppercase tracking-wider text-[#C9ADA7] font-semibold">Cybersecurity &amp; Pentesting</span>
              </div>
              <span className="font-mono text-[11px] text-[#9A8C98]">SEC_01</span>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {cyber.map((skill, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded font-mono text-[11px] sm:text-xs bg-[#22223B] border border-[#4A4E69] text-[#F2E9E4]">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="pt-4 mt-5 border-t border-[#4A4E69]/60 flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-[#9A8C98]">
            <span>OFFENSIVE AUDITING</span>
            <span className="text-[#C9ADA7]">VAPT ACTIVE</span>
          </div>
        </div>

        {/* Column 2: Software Development */}
        <div className="bg-[#4A4E69]/20 rounded-lg p-5 sm:p-6 border border-[#4A4E69] flex flex-col justify-between hover:border-[#C9ADA7]/40 transition-colors shadow-sm">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-[#4A4E69] mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F2E9E4]"></span>
                <span className="font-mono text-xs uppercase tracking-wider text-[#F2E9E4] font-semibold">Software &amp; Web Dev</span>
              </div>
              <span className="font-mono text-[11px] text-[#9A8C98]">DEV_02</span>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {soft.map((skill, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded font-mono text-[11px] sm:text-xs bg-[#22223B] border border-[#4A4E69] text-[#F2E9E4]">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="pt-4 mt-5 border-t border-[#4A4E69]/60 flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-[#9A8C98]">
            <span>FULL-STACK &amp; WEB</span>
            <span className="text-[#F2E9E4]">MODERN STACK</span>
          </div>
        </div>

        {/* Column 3: Game Dev & Tools */}
        <div className="bg-[#4A4E69]/20 rounded-lg p-5 sm:p-6 border border-[#4A4E69] flex flex-col justify-between hover:border-[#C9ADA7]/40 transition-colors shadow-sm">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-[#4A4E69] mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C9ADA7]"></span>
                <span className="font-mono text-xs uppercase tracking-wider text-[#C9ADA7] font-semibold">Game Dev &amp; Tools</span>
              </div>
              <span className="font-mono text-[11px] text-[#9A8C98]">GAM_03</span>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {game.map((skill, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded font-mono text-[11px] sm:text-xs bg-[#22223B] border border-[#4A4E69] text-[#F2E9E4]">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="pt-4 mt-5 border-t border-[#4A4E69]/60 flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-[#9A8C98]">
            <span>ENGINEERING &amp; RUNTIME</span>
            <span className="text-[#F2E9E4]">UNITY / C#</span>
          </div>
        </div>

      </div>
    </section>
  );
}
