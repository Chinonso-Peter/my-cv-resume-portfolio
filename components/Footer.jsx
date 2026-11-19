import Link from 'next/link';

export default function Footer({ profile }) {
  const p = profile || {};

  return (
    <footer className="w-full border-t border-[#4A4E69]/60 bg-[#22223B] py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#9A8C98]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C9ADA7]"></span>
          <span className="text-[#F2E9E4]">// SYS_STATUS: OPERATIONAL</span>
          <span className="text-[#9A8C98]">•</span>
          <span className="text-[#9A8C98]">{p.location?.toUpperCase() || 'LAGOS, NIGERIA'}</span>
        </div>
        <div className="text-[#9A8C98] text-[11px] flex items-center gap-2">
          <span>© {p.year || '2026'} {p.name || 'Ezea Chinonso Peter'} • SW_ARCH &amp; OFFENSIVE_SEC</span>
          <Link href="/admin" className="text-[#4A4E69] hover:text-[#C9ADA7] transition-colors ml-1 font-mono" title="Admin Control Room" rel="nofollow">
            // ADMIN
          </Link>
        </div>
      </div>
    </footer>
  );
}
