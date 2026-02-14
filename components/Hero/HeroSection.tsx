"use client";
import React, { useState } from 'react';
import { Search, CheckCircle2, Phone, MessageCircle, ArrowRight } from 'lucide-react';

// ============================================================================
// EXTRACTED COMPONENTS FOR BETTER ARCHITECTURE
// ============================================================================

interface EyebrowProps {
  text: string;
}

const Eyebrow: React.FC<EyebrowProps> = ({ text }) => (
  <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-emerald-100/90 backdrop-blur-sm border border-emerald-200/60 shadow-sm">
    <div className="relative">
      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
    </div>
    <span className="text-sm font-semibold text-emerald-900 tracking-wide">
      {text}
    </span>
  </div>
);

interface TrustSignalsProps {
  signals: string[];
}

const TrustSignals: React.FC<TrustSignalsProps> = ({ signals }) => (
  <div className="space-y-2.5 pt-5">
    {signals.map((signal, index) => (
      <div
        key={signal}
        className="flex items-center gap-3 group"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] group-hover:scale-125 transition-transform"></div>
        <span className="text-slate-600 font-medium text-[15px]">{signal}</span>
      </div>
    ))}
  </div>
);

interface AuthorityBlockProps {
  title: string;
  proofPoints: string[];
}

const AuthorityBlock: React.FC<AuthorityBlockProps> = ({ title, proofPoints }) => (
  <div className="group bg-white/90 backdrop-blur-md border border-emerald-200/60 rounded-2xl p-5 shadow-lg shadow-emerald-100/50 hover:shadow-xl hover:shadow-emerald-100/60 hover:-translate-y-1 transition-all duration-300">
    <p className="text-base font-semibold text-slate-900 mb-3 leading-relaxed">
      {title}
    </p>
    <div className="flex flex-wrap gap-4">
      {proofPoints.map((item) => (
        <div key={item} className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-sm">
            <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />
          </div>
          <span className="text-[15px] font-medium text-slate-700">{item}</span>
        </div>
      ))}
    </div>
  </div>
);

interface CTAButtonsProps {
  onPrimaryClick: () => void;
  isClicked: boolean;
}

const CTAButtons: React.FC<CTAButtonsProps> = ({ onPrimaryClick, isClicked }) => (
  <div className="flex flex-col sm:flex-row gap-4">
    <button
      onClick={onPrimaryClick}
      className="
        group relative px-8 py-3.5 rounded-xl font-bold text-[17px] text-white
        bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-600
        shadow-lg shadow-emerald-500/40
        hover:shadow-2xl hover:shadow-emerald-500/50
        hover:-translate-y-1
        focus:outline-none focus:ring-4 focus:ring-emerald-500/50
        transition-all duration-300
        overflow-hidden
      "
      aria-label="See how this gets you customers"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <span className="relative flex items-center justify-center gap-2.5">
        Get More Customers
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </span>
    </button>

    <a
      href="#demo"
      className="
        group px-8 py-3.5 rounded-xl font-bold text-[17px] text-emerald-700
        bg-white border-2 border-emerald-600
        hover:bg-emerald-50 hover:border-emerald-700
        hover:-translate-y-1
        focus:outline-none focus:ring-4 focus:ring-emerald-500/30
        shadow-md hover:shadow-xl
        transition-all duration-300
        text-center
      "
      aria-label="View a real example"
    >
      See It In Action
    </a>
  </div>
);

interface GoogleSearchMockupProps {
  searchQuery: string;
}

const GoogleSearchMockup: React.FC<GoogleSearchMockupProps> = ({ searchQuery }) => (
  <div className="space-y-4">
    {/* Search Bar */}
    <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-full shadow-inner border border-slate-200">
      <Search className="w-5 h-5 text-slate-500" strokeWidth={2} />
      <span className="text-slate-800 font-medium">{searchQuery}</span>
    </div>

    {/* Search Results */}
    <div className="space-y-3">
      {/* Old Result 1 */}
      <div className="relative opacity-30 p-5 rounded-xl transition-opacity hover:opacity-40">
        <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-red-600 text-xs font-bold">✕</span>
          </div>
        </div>
        <div className="text-blue-600 font-semibold text-lg mb-1 line-through decoration-red-500/50">
          Joe's Plumbing Service
        </div>
        <div className="text-slate-500 text-xs mb-2">oldsite.com</div>
        <div className="text-slate-600 text-sm opacity-70">
          Welcome to our website. We have been in business...
        </div>
      </div>

      {/* New Result - Highlighted */}
      <div className="relative p-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-green-50/50 to-emerald-50 border-2 border-emerald-500 shadow-xl shadow-emerald-200/60 hover:scale-[1.02] transition-transform duration-300">
        <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/50">
            <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={3} />
          </div>
        </div>
        <div className="text-blue-600 font-bold text-lg mb-1.5">
          QuickFix Plumbing - Emergency Service 24/7
        </div>
        <div className="text-emerald-700 text-xs font-semibold mb-2.5 flex items-center gap-1">
          <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
          quickfixplumbing.com
        </div>
        <div className="text-slate-700 text-[15px] mb-4 leading-relaxed font-medium">
          Emergency plumber in your area. Fast response, upfront pricing. Leaks, blockages, installations fixed today.
        </div>
        <div className="flex gap-2.5">
          <button
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-emerald-100 to-green-50 border border-emerald-300/60 rounded-full text-sm font-bold text-slate-800 shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer min-h-[44px]"
            aria-label="Call now"
          >
            <Phone className="w-4 h-4" strokeWidth={2.5} />
            Call Now
          </button>
          <button
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-green-100 to-emerald-50 border border-emerald-300/60 rounded-full text-sm font-bold text-slate-800 shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer min-h-[44px]"
            aria-label="Message on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" strokeWidth={2.5} />
            WhatsApp
          </button>
        </div>
      </div>

      {/* Old Result 2 */}
      <div className="relative opacity-30 p-5 rounded-xl transition-opacity hover:opacity-40">
        <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-red-600 text-xs font-bold">✕</span>
          </div>
        </div>
        <div className="text-blue-600 font-semibold text-lg mb-1 line-through decoration-red-500/50">
          Smith Bros Plumbing
        </div>
        <div className="text-slate-500 text-xs mb-2">smithplumbing.net</div>
        <div className="text-slate-600 text-sm opacity-70">
          Quality plumbing services. Contact us for more info...
        </div>
      </div>
    </div>

    {/* Comparison Label */}
    <div className="relative pt-6 mt-6 border-t-2 border-dashed border-emerald-300/60">
      <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 via-green-500 to-amber-500 rounded-full mx-auto mb-3 shadow-sm"></div>
      <div className="text-center text-[15px] font-bold text-slate-700 tracking-wide">
        Invisible → Found → Called
      </div>
    </div>
  </div>
);

// ============================================================================
// MAIN HERO SECTION COMPONENT
// ============================================================================

const HeroSection: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handlePrimaryCTA = () => {
    setIsClicked(true);
    
    // Play premium coin sound
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACAAACAggKCBIQGhgiICooMjA6OEJASkxSVFpcYmRqbHJ0eoB+hH6MfpR+nH6kfqx+tH68fsR+zH7Uftx+5H7sfvR+/H8EfxB/GH8gfyh/MH84f0B/SH9Qf1h/YH9of3B/eH+Af4h/kH+Yf6B/qH+wf7h/wH/If9B/2H/gf+h/8H/4fACABIAIgAyAEIAUgBiAHIAggCSAKIAsgDCANIA4gDyAQIBEgEiATIBQgFSAWIBcgGCAZIBogGyAcIB0gHiAfICAgISAiICMgJCAlICYgJyAoICkgKiArICwgLSAuIC8gMCAxIDIgMyA0IDUgNiA3IDggOSA6IDsgPCA9ID4gPyBAIEEgQiBDIEQgRSBGIEcgSCBJIEogSyBMIE0gTiBPIFAgUSBSIFMgVCBVIFYgVyBYIFkgWiBbIFwgXSBeIF8gYCBhIGIgYyBkIGUgZiBnIGggaSBqIGsgbCBtIG4gbyBwIHEgciBzIHQgdSB2IHcgeCB5IHogeyB8IH0gfiB/IIAggSCCIIMghCCFIIYghyCIIIkgiiCLIIwgjSCOII8gkCCRIJIgkyCUIJUgliCXIJggmSCaIJsgnCCdIJ4gnyA=');
    audio.volume = 0.2;
    audio.play().catch(() => {});
    
    setTimeout(() => setIsClicked(false), 800);
    
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-amber-50"
      role="region"
      aria-label="Hero section"
    >
      {/* Noise texture overlay for warmth */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      ></div>

      {/* Continuous gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/40 via-green-100/30 to-amber-100/40"></div>
      
      {/* Layered radial overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-200/25 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-amber-200/20 via-transparent to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-5">
            <Eyebrow text="For Local Service Businesses" />

            {/* Headline with improved hierarchy */}
            <h1 className="font-['Space_Grotesk'] text-[clamp(2.25rem,7vw,3.75rem)] font-black leading-[1.05] tracking-[-0.04em] text-slate-900">
              Turn Google Searches<br />
              Into{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-emerald-600 via-green-500 to-amber-500 bg-clip-text text-transparent">
                  Paying Customers
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-green-500 to-amber-500 rounded-full"></div>
              </span>
            </h1>

            {/* Subheadline with better spacing */}
            <p className="text-[clamp(1rem,2.5vw,1.25rem)] text-slate-600 font-medium leading-relaxed max-w-xl">
              When something breaks, people search Google. The question is—do they find you?
            </p>

            <AuthorityBlock
              title="Websites built specifically for plumbers, electricians, and local service businesses."
              proofPoints={['SEO-ready', 'Mobile-first', 'WhatsApp leads']}
            />

            <CTAButtons onPrimaryClick={handlePrimaryCTA} isClicked={isClicked} />

            <TrustSignals
              signals={[
                'Built for local businesses',
                'No ads. No retainers. Just results.',
                'Works even on slow phones'
              ]}
            />
          </div>

          {/* Right Column - Visual Proof */}
          <div>
            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl shadow-emerald-200/60 border border-white/90 hover:shadow-emerald-300/70 transition-shadow duration-500">
              {/* Refined gradient border effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-400/30 via-green-300/20 to-amber-400/25 rounded-3xl blur-2xl"></div>

              <GoogleSearchMockup searchQuery="plumber near me" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cal+Sans:wght@400;600;700&family=Space+Grotesk:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');

        /* Accessibility: Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Improved focus visibility */
        *:focus-visible {
          outline: 2px solid #10b981;
          outline-offset: 2px;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;