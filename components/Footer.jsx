import Link from 'next/link';

export default function Footer({ profile }) {
  const p = profile || {};

  return (
    <footer className="w-full border-t border-[#4A4E69]/60 bg-[#22223B] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 font-mono text-xs text-[#9A8C98] text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[11px] sm:text-xs">
          <span className="w-2 h-2 rounded-full bg-[#C9ADA7] shrink-0"></span>
          <span className="text-[#F2E9E4]">// SYS_STATUS: OPERATIONAL</span>
          <span className="text-[#9A8C98]">•</span>
          <span className="text-[#9A8C98]">{p.location?.toUpperCase() || 'LAGOS, NIGERIA'}</span>
        </div>
        <div className="text-[#9A8C98] text-[10px] sm:text-[11px] flex flex-wrap items-center justify-center gap-2">
          <span>© {p.year || '2026'} {p.name || 'Ezea Chinonso Peter'}</span>
          <span className="hidden sm:inline">•</span>
          <Link href="/admin" className="text-[#4A4E69] hover:text-[#C9ADA7] transition-colors ml-1 font-mono" title="Admin Control Room" rel="nofollow">
            // ADMIN
          </Link>
        </div>
      </div>
    </footer>
  );
}
