import { ArrowRight } from 'lucide-react';

const FinalCtaSection = () => {
  return (
    <section style={{ backgroundColor: '#FAF7F2' }}>
      <div className="w-full max-w-6xl mx-auto px-5 py-24 sm:px-8">

        <div
          className="rounded-2xl px-8 py-16 sm:px-16 sm:py-20 relative overflow-hidden"
          style={{ backgroundColor: '#2D3436' }}
        >

          {/* Subtle background texture — two faint terracotta circles */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-60px',
              right: '-60px',
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              backgroundColor: '#C65D3B',
              opacity: 0.07,
              pointerEvents: 'none',
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: '-80px',
              left: '-40px',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              backgroundColor: '#C65D3B',
              opacity: 0.05,
              pointerEvents: 'none',
            }}
          />

          {/* Content */}
          <div
            className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10"
          >

            {/* Left */}
            <div className="max-w-xl">
              <p
                className="text-sm font-bold mb-5 tracking-wider"
                style={{ color: '#C65D3B' }}
              >
                STILL ON THE FENCE?
              </p>

              <h2
                className="text-[1.75rem] sm:text-[2.5rem] mb-5"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontWeight: 700,
                  color: '#FAF7F2',
                  letterSpacing: '-0.02em',
                  lineHeight: '1.15',
                }}
              >
                Your competitor&apos;s phone
                <br />
                is ringing right now.
              </h2>

              <p
                className="text-base"
                style={{
                  color: '#A09890',
                  lineHeight: '1.8',
                  maxWidth: '30rem',
                }}
              >
                The mockup is free. It takes two minutes to request.
                The worst that happens is you see what your site could look
                like and decide it&apos;s not for you. No charge. No pressure.
              </p>
            </div>

            {/* Right — CTA block */}
            <div className="flex flex-col items-start lg:items-end gap-4 flex-shrink-0">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold transition-colors duration-200"
                style={{
                  backgroundColor: '#C65D3B',
                  color: '#FAF7F2',
                  textDecoration: 'none',
                  boxShadow: '0 2px 16px rgba(198,93,59,0.35)',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = '#9D4A2E')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = '#C65D3B')
                }
              >
                Get Your Free Mockup
                <ArrowRight className="w-5 h-5" />
              </a>

              <p
                className="text-sm"
                style={{ color: '#636E72' }}
              >
                Free preview in 24 hours · No payment needed
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default FinalCtaSection;