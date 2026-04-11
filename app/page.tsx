// app/page.tsx
import HeroSection from "@/components/DevHero/HeroSection";
import WorkSection     from '@/components/WorkSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection  from '@/components/ContactSection';

import Image from "next/image";


import { GameCardRevealSequence } from "@/components/media/GameCardReveal";
import { SidewaysScrollGallery } from "@/components/media/SidewaysScrollGallery";
import { StackedCardGallery } from "@/components/media/StackedCardGallery";
import demoImages, { demoImage } from "@/lib/images";
import CertificatesSection from "@/components/CertificatesSection";

export default function Home() {
  

  return (
        <main className="bg-[#050812]">
        {/* 1. Hero — replace with your existing component */}
        <HeroSection />

        {/* Subtle gradient fade from hero into content */}
        <div style={{
          height: 120,
          marginTop: -120,
          background: 'linear-gradient(to bottom, transparent, var(--bg-base))',
          pointerEvents: 'none',
          position: 'relative', zIndex: 1,
        }} />

        {/* 2. Work — client case studies */}
        <WorkSection />

        {/* Divider */}
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ height: '0.5px', background: 'var(--border-subtle)' }} />
        </div>

        {/* 3. Projects — personal builds */}
        <ProjectsSection />

        {/* Divider */}
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ height: '0.5px', background: 'var(--border-subtle)' }} />
        </div>

        {/* 4. About — you're building this */}
        <AboutSection />

        <CertificatesSection />

        {/* 5. Contact + Footer */}
        <ContactSection />
      </main>
  );
}



export function cards(){
    return (
    <div className="min-h-screen w-full flex flex-col">      
      <SidewaysScrollGallery images={demoImages} />
      <StackedCardGallery images={demoImages}/>
      <GameCardRevealSequence images={demoImages} finalImage={demoImage}/> 
    </div>
  );
}


// ── About placeholder — you're building this yourself ───────────────────────
function AboutSection() {
  return (
    <section
      id="about"
      className="max-w-5xl bg-[#050812] mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center"
    >
{/* LEFT: Visual */}
<div className="flex flex-col items-center md:items-start gap-4">
    <Image
      src="/avatar.jpg"
      width={100}
      height={50}
      alt="Avatar"
      className="h-full rounded-2xl w-full object-cover"
    />
</div>
      {/* RIGHT: Content */}
      <div className="space-y-6">
        <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
          Full-stack developer building production-grade applications
        </h2>

        <p className="text-neutral-400 leading-relaxed">
          I build real-world web and cross-platform apps using Next.js, React Native,
          and Supabase. My work spans backend systems, real-time features, and
          performance-focused frontend experiences.
        </p>

        <p className="text-neutral-400 leading-relaxed">
          Beyond engineering, I focus on building products that actually grow—
          applying SEO and acquisition strategies so what I build reaches users.
        </p>

        {/* Proof */}
        <ul className="text-sm text-neutral-300 space-y-2">
          <li>• Shipped production apps for real clients</li>
          <li>• Built real-time chat + video systems</li>
          <li>• Designed AI-powered resume parsing pipelines</li>
          <li>• SEO-first architecture for scalable products</li>
        </ul>

        {/* Tech */}
        <div className="flex flex-wrap gap-2 text-xs text-neutral-400">
          {[
            "Next.js",
            "React Native",
            "Supabase",
            "PostgreSQL",
            "TypeScript",
            "Tailwind",
            "LiveKit",
            "Gemini API",
          ].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 border border-neutral-700 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
/* ─── Page ───────────────────────────────────────────── */





      
 