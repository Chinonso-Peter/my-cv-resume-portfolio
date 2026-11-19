import { getPortfolioData } from '@/lib/portfolio';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Certificates from '@/components/Certificates';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export const revalidate = 0; // Ensures fresh data when admin saves changes

export default function HomePage() {
  const data = getPortfolioData() || {};

  return (
    <>
      <Header profile={data.profile} />
      <main className="w-full pt-16">
        <Hero profile={data.profile} />
        <Skills skills={data.skills} />
        <Projects projects={data.projects} researchLinks={data.research_links} />
        {data.certificates && data.certificates.length > 0 && (
          <Certificates certificates={data.certificates} />
        )}
        <Experience experience={data.experience} />
        <Contact profile={data.profile} />
      </main>
      <Footer profile={data.profile} />
    </>
  );
}
