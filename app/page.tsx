// app/page.tsx
import HeroSection from "@/components/DevHero/HeroSection";
import WorkSection     from '@/components/WorkSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection  from '@/components/ContactSection';


import { GameCardRevealSequence } from "@/components/media/GameCardReveal";
import { SidewaysScrollGallery } from "@/components/media/SidewaysScrollGallery";
import { StackedCardGallery } from "@/components/media/StackedCardGallery";
import demoImages, { demoImage } from "@/lib/images";

export default function Home() {
  

  return (
          <main>
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
        <AboutPlaceholder />

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
function AboutPlaceholder() {
  return (
    <section
      id="about"
      style={{
        padding: '80px 24px',
        maxWidth: 800,
        margin: '0 auto',
        minHeight: 320,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '0.5px dashed var(--border-subtle)',
        borderRadius: 16,
      }}
    >
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--txt-tertiary)' }}>
        / about — building this yourself
      </p>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────── */





      
 