"use client";
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';

const HeroSection = () => {
  return (
    <section 
      className="min-h-screen flex items-center"
      style={{ backgroundColor: '#F5EFE7' }}
    >
      <div className="w-full max-w-6xl mx-auto px-5 pt-12 sm:px-8">

        {/* Hero Grid */}
        <div className="grid lg:grid-cols-[1.5fr_0.5fr] gap-16 lg:gap-24 items-center">
          
          {/* Left - The Message */}
          <div className="max-w-2xl">
            
            {/* Kicker */}
            <p 
              className="text-sm font-bold mb-6 tracking-wider"
              style={{ color: '#C65D3B' }}
            >
              FOR PLUMBERS · SPARKIES · TRADIES
            </p>

            {/* Headline - The Hook */}
            <h1 
            className="text-[2rem] sm:text-[3rem] md:text-[3.2rem] lg:text-[3.5rem] leading-[1] mb-6"
            style={{ 
                fontFamily: 'Georgia, serif',
                fontWeight: 700,
                color: '#2D3436',
                letterSpacing: '-0.03em'
            }}
            >
            Stop Losing Jobs to Competitors
            </h1>

            {/* The Agitation */}
            <p 
              className="text-2xl sm:text-[1.75rem] leading-[1.4] mb-12"
              style={{ color: '#636E72' }}
            >
              When someone searches "plumber near me"—your competitor shows up first.<br/>
              <strong style={{ color: '#2D3436' }}>You don't. I fix that.</strong>
            </p>

            {/* Single CTA */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <a
                href="#contact"
                className="inline-block px-12 py-3 text-xl font-semibold transition-colors duration-200 rounded"
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
                Get More Customers
                <ArrowRight className="inline-block ml-3 w-6 h-6" />
              </a>
            </div>

            {/* Friction Reducer */}
            <p 
              className="mt-3 text-base"
              style={{ color: '#636E72' }}
            >
              Free mockup in 24 hours · No payment needed · First 10 save $300
            </p>

          </div>

          {/* Right - Visual Proof */}
          <div>
            <div 
              className="bg-white pt-6 px-6 pb-3  rounded border lg:mr-5"
              style={{ 
                borderColor: '#E8DFD1',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
              }}
            >
              {/* Search Bar */}
              <div 
                className="flex items-center gap-2 p-2 mb-2 rounded border"
                style={{ 
                  backgroundColor: '#FAF7F2',
                  borderColor: '#E8DFD1'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#636E72" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
                <span className="text-sm" style={{ color: '#636E72' }}>
                  plumber near me
                </span>
              </div>

              {/* Competitor - Faded */}
              <div className="px-3 mb-2 rounded opacity-60" style={{ backgroundColor: '#FAF7F2' }}>
                <p className="text-sm font-semibold text-blue-600 line-through mb-0.5">
                  Joe's Plumbing
                </p>
                <p className="text-xs" style={{ color: '#636E72' }}>Not you</p>
              </div>

              {/* Your Site - Highlighted */}
              <div 
                className="p-5 rounded border-2 mb-2"
                style={{ 
                  backgroundColor: '#FFFEFB',
                  borderColor: '#C65D3B'
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-base font-bold text-blue-600 mb-1">
                      Your Business Here
                    </p>
                    <p className="text-xs mb-2" style={{ color: '#7A9B8E' }}>
                      yoursite.com.au
                    </p>
                  </div>
                </div>
                
                <p className="text-sm mb-2 leading-relaxed" style={{ color: '#2D3436' }}>
                  Emergency plumber. Same day service. All suburbs. Call now.
                </p>
                
                <div className="flex gap-2">
                  <button
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded"
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
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded"
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
              <div className="pt-3 pb-1 rounded opacity-60" style={{ backgroundColor: '#FAF7F2' }}>
                <p className="text-sm font-semibold text-blue-600 line-through mb-0.5">
                  Smith Plumbing
                </p>
                <p className="text-xs" style={{ color: '#636E72' }}>Not you</p>
              </div>

              {/* Bottom Line */}
              <div className="mt-1 pt-1 border-t text-center" style={{ borderColor: '#E8DFD1' }}>
                <p className="text-sm font-bold" style={{ color: '#2D3436' }}>
                  Top spot = more calls = more money
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;