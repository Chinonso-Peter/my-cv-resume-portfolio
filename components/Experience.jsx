export default function Experience({ experience }) {
  const expList = experience || [];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20 border-b border-[#4A4E69]/60" id="experience">
      <div className="flex flex-col gap-2 mb-8 sm:mb-10">
        <span className="font-mono text-[11px] sm:text-xs text-[#9A8C98] uppercase tracking-widest">// 04. TRAJECTORY</span>
        <h2 className="font-headline text-2xl sm:text-3xl font-bold text-[#F2E9E4]">Experience &amp; Background</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {expList.map((item, idx) => (
          <div key={idx} className="bg-[#4A4E69]/20 rounded-lg p-5 sm:p-6 border border-[#4A4E69] flex flex-col justify-between gap-4 shadow-sm hover:border-[#C9ADA7]/40 transition-colors">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#4A4E69] mb-4">
                <span className="font-mono text-xs text-[#C9ADA7] font-semibold uppercase tracking-wider">{item.role}</span>
                <span className="font-mono text-[11px] text-[#9A8C98]">{item.company}</span>
              </div>
              <h3 className="font-headline text-base sm:text-lg font-bold text-[#F2E9E4] mb-2">{item.title}</h3>
              <p className="font-body text-xs sm:text-sm text-[#C9ADA7] leading-relaxed">{item.description}</p>
            </div>
            <div className="font-mono text-[10px] sm:text-[11px] text-[#9A8C98] pt-3 border-t border-[#4A4E69]/60 flex items-center justify-between">
              <span>{item.role_tag || 'ROLE // ENGINEERING'}</span>
              <span className="text-[#F2E9E4]">{item.tech_tag || 'DEV / SEC'}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
