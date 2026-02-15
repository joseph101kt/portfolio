"use client";
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';

const HeroSection = () => {
  return (
    <section 
      className="min-h-screen flex items-center"
      style={{ backgroundColor: '#F5EFE7' }}
    >
      <div className="w-full max-w-6xl mx-auto px-5 py-5 sm:px-8">

        {/* Hero Grid */}
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-start">
          
          {/* Left Column - The Message */}
          <div className="max-w-2xl">
            
            {/* Kicker */}
            <p 
              className="text-sm font-bold mb-6 tracking-wider"
              style={{ color: '#C65D3B' }}
            >
              FOR PLUMBERS · SPARKIES · TRADIES IN AUSTRALIA
            </p>

            {/* Headline */}
            <h1 
              className="text-[2rem] sm:text-[2.75rem] lg:text-[3rem] leading-[1.05] mb-6"
              style={{ 
                fontFamily: 'Georgia, serif',
                fontWeight: 700,
                color: '#2D3436',
                letterSpacing: '-0.03em'
              }}
            >
              Losing $2,000/Week to Competitors on Google?
            </h1>

            {/* The Agitation */}
            <p 
              className="text-lg sm:text-xl leading-normal mb-8"
              style={{ color: '#636E72' }}
            >
                When someone searches &quot;plumber near me&quot;&mdash;your competitor shows up first.
                His phone&apos;s ringing. Yours isn&apos;t.
            </p>
            
            <p 
              className="text-lg sm:text-xl font-semibold mb-10"
              style={{ color: '#2D3436' }}
            >
              I fix that.
            </p>

            {/* Single CTA */}
            <div className="mb-6">
              <a
                href="#contact"
                className="inline-block px-10 py-4 text-lg font-semibold transition-colors duration-200 rounded"
                style={{
                  backgroundColor: '#C65D3B',
                  color: '#FAF7F2',
                  textDecoration: 'none',
                  fontWeight: 600,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#9D4A2E'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#C65D3B'}
              >
                Get Your First Customer This Week
                <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </a>
            </div>

            {/* Friction Reducer - Right Under CTA */}
            <p 
              className="text-sm mb-8"
              style={{ color: '#636E72' }}
            >
              Free mockup in 24 hours · No payment to see it
            </p>

            {/* Payment Model - Clear Box */}
            <div 
              className="p-5 mb-6 border-l-4 bg-white/60"
              style={{ borderColor: '#C65D3B' }}
            >
              <p 
                className="text-base leading-relaxed mb-2"
                style={{ color: '#2D3436' }}
              >
                <strong>Pay $200 today</strong> (covers domain + hosting setup)
              </p>
              <p 
                className="text-base leading-relaxed mb-2"
                style={{ color: '#2D3436' }}
              >
                <strong>Pay $700 later</strong> after your site gets 20 click-to-calls*
              </p>
              <p 
                className="text-sm mt-3 pt-3 border-t"
                style={{ 
                  color: '#636E72',
                  borderColor: '#E8DFD1'
                }}
              >
                *Click-to-call = someone clicked your phone or WhatsApp button. 
                If you don&apos;t get 20 clicks in 60 days, you owe nothing more.
              </p>
            </div>

            {/* Honest Launch Message */}
            <div 
              className="p-4 bg-white/40 rounded"
              style={{ border: '1px solid #E8DFD1' }}
            >
              <p 
                className="text-sm leading-relaxed"
                style={{ color: '#636E72' }}
              >
                <strong style={{ color: '#2D3436' }}>Just launching in Australia.</strong> First 10 customers get this deal. 
                Why the performance-based pricing? I need real examples. You need customers. Fair trade.
              </p>
            </div>

          </div>

          {/* Right Column - Visual Proof (Aligned to Top) */}
<div className="lg:sticky lg:top-0 self-start">
    <div className="bg-white p-6 rounded-lg border border-[#E8DFD1] shadow-sm">
              {/* Search Bar */}
              <div 
                className="flex items-center gap-2 px-3 py-2 mb-3 rounded border"
                style={{ 
                  backgroundColor: '#FAF7F2',
                  borderColor: '#E8DFD1'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#636E72" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
                <span className="text-sm" style={{ color: '#636E72' }}>
                  plumber near me
                </span>
              </div>

              {/* Competitor 1 - Faded */}
              <div className="px-3 py-2 mb-2 rounded opacity-50" style={{ backgroundColor: '#FAF7F2' }}>
                <p className="text-sm font-semibold text-blue-600 line-through mb-0.5">
                  Joe&apos;s Plumbing
                </p>
                <p className="text-xs" style={{ color: '#636E72' }}>
                  His phone&apos;s ringing
                </p>
              </div>

              {/* Your Site - Highlighted */}
              <div 
                className="p-4 rounded border-2 mb-2"
                style={{ 
                  backgroundColor: '#FFFEFB',
                  borderColor: '#C65D3B'
                }}
              >
                <p className="text-base font-bold text-blue-600 mb-1">
                  Your Business Here
                </p>
                <p className="text-xs mb-3" style={{ color: '#7A9B8E' }}>
                  yoursite.com.au
                </p>
                
                <p className="text-sm mb-3 leading-relaxed" style={{ color: '#2D3436' }}>
                  Emergency plumber. Same day service. All suburbs. Call now.
                </p>
                
                <div className="flex gap-2">
                  <button
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-semibold rounded"
                    style={{
                      backgroundColor: '#FAF7F2',
                      border: '2px solid #C65D3B',
                      color: '#2D3436'
                    }}
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </button>
                  <button
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-semibold rounded"
                    style={{
                      backgroundColor: '#FAF7F2',
                      border: '2px solid #C65D3B',
                      color: '#2D3436'
                    }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Message
                  </button>
                </div>
              </div>

              {/* Competitor 2 - Faded */}
              <div className="px-3 py-2 rounded opacity-50" style={{ backgroundColor: '#FAF7F2' }}>
                <p className="text-sm font-semibold text-blue-600 line-through mb-0.5">
                  Smith Plumbing
                </p>
                <p className="text-xs" style={{ color: '#636E72' }}>
                  Yours isn&apos;t
                </p>
              </div>

              {/* Bottom Line */}
              <div className="mt-4 pt-4 border-t text-center" style={{ borderColor: '#E8DFD1' }}>
                <p className="text-sm font-semibold" style={{ color: '#2D3436' }}>
                  Top spot = more calls = more money
                </p>
              </div>
            </div>

            {/* Small Trust Signal Below Mockup (Desktop Only) */}
            <div className="hidden lg:block mt-4">
              <p className="text-xs text-center" style={{ color: '#636E72' }}>
                Works on any phone · Loads fast · Easy to call
              </p>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        * {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        h1, h2, h3 {
          font-family: Georgia, 'Times New Roman', serif;
        }

        *:focus-visible {
          outline: 3px solid #C65D3B;
          outline-offset: 2px;
        }

        html {
          scroll-behavior: smooth;
        }

        @media (prefers-reduced-motion: reduce) {
          *, html {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }

        @media (max-width: 640px) {
          button, a {
            min-height: 44px;
          }
        }

        /* Ensure right column doesn't get too tall and create awkward spacing */
        @media (min-width: 1024px) {
          .lg\\:sticky {
            position: sticky;
            top: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;