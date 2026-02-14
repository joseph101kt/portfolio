"use client";
import React, { useState } from 'react';

const HeroSection = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handlePrimaryCTA = () => {
    setIsClicked(true);
    
    // Play coin sound
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACAAACAggKCBIQGhgiICooMjA6OEJASkxSVFpcYmRqbHJ0eoB+hH6MfpR+nH6kfqx+tH68fsR+zH7Uftx+5H7sfvR+/H8EfxB/GH8gfyh/MH84f0B/SH9Qf1h/YH9of3B/eH+Af4h/kH+Yf6B/qH+wf7h/wH/If9B/2H/gf+h/8H/4fACABIAIgAyAEIAUgBiAHIAggCSAKIAsgDCANIA4gDyAQIBEgEiATIBQgFSAWIBcgGCAZIBogGyAcIB0gHiAfICAgISAiICMgJCAlICYgJyAoICkgKiArICwgLSAuIC8gMCAxIDIgMyA0IDUgNiA3IDggOSA6IDsgPCA9ID4gPyBAIEEgQiBDIEQgRSBGIEcgSCBJIEogSyBMIE0gTiBPIFAgUSBSIFMgVCBVIFYgVyBYIFkgWiBbIFwgXSBeIF8gYCBhIGIgYyBkIGUgZiBnIGggaSBqIGsgbCBtIG4gbyBwIHEgciBzIHQgdSB2IHcgeCB5IHogeyB8IH0gfiB/IIAggSCCIIMghCCFIIYghyCIIIkgiiCLIIwgjSCOII8gkCCRIJIgkyCUIJUgliCXIJggmSCaIJsgnCCdIJ4gnyA=');
    audio.volume = 0.25;
    audio.play().catch(e => console.log('Audio play prevented'));
    
    setTimeout(() => setIsClicked(false), 800);
    
    // Scroll to demo
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-amber-50">
      {/* Continuous animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/40 via-green-100/30 to-amber-100/40 animate-gradient"></div>
      
      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-200/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-amber-200/20 via-transparent to-transparent"></div>
      
      {/* Soft blurred gradients */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-emerald-300/30 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-green-300/25 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[10%] left-[15%] w-[550px] h-[550px] bg-amber-300/20 rounded-full blur-[110px] animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-[30%] right-[-5%] w-[450px] h-[450px] bg-emerald-400/20 rounded-full blur-[90px] animate-blob animation-delay-6000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-20 items-center">
          {/* Left Column */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-100/80 backdrop-blur-sm border border-emerald-200/50 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-dot shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              <span className="text-sm font-semibold text-emerald-800 tracking-wide">
                For Local Service Businesses
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-['Outfit'] text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-slate-900">
              Turn Google Searches<br />
              Into{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
                Paying Customers
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed max-w-xl">
              When something breaks, people search Google. The question is—do they find you?
            </p>

            {/* Authority Block */}
            <div className="bg-white/80 backdrop-blur-md border border-emerald-200/50 rounded-2xl p-6 shadow-lg shadow-emerald-100/50">
              <p className="text-lg font-semibold text-slate-900 mb-4 leading-relaxed">
                Websites built specifically for plumbers, electricians, and local service businesses.
              </p>
              <div className="flex flex-wrap gap-5">
                {['SEO-ready', 'Mobile-first', 'WhatsApp leads'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                      ✓
                    </div>
                    <span className="text-sm font-medium text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handlePrimaryCTA}
                className={`
                  group relative px-8 py-4 rounded-xl font-bold text-lg text-white
                  bg-gradient-to-r from-emerald-500 to-green-600
                  shadow-lg shadow-emerald-500/40
                  hover:shadow-xl hover:shadow-emerald-500/50
                  hover:-translate-y-0.5
                  transition-all duration-300
                  overflow-hidden
                  ${isClicked ? 'animate-gold-burst' : ''}
                `}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center gap-2">
                  See How This Gets You Customers
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </button>

              <a
                href="#demo"
                className="
                  px-8 py-4 rounded-xl font-bold text-lg text-emerald-600
                  bg-white border-2 border-emerald-500
                  hover:bg-emerald-50
                  hover:-translate-y-0.5
                  shadow-md hover:shadow-lg
                  transition-all duration-300
                  text-center
                "
              >
                View a Real Example
              </a>
            </div>

            {/* Trust Signals */}
            <div className="space-y-3 pt-6">
              {[
                'Built for local businesses',
                'No ads. No retainers. Just results.',
                'Works even on slow phones'
              ].map((signal) => (
                <div key={signal} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
                  <span className="text-slate-500 font-medium">{signal}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Visual Proof */}
          <div className="animate-fade-in-scale animation-delay-400">
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-emerald-200/50 border border-white/80">
              {/* Gradient border effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-300/40 via-transparent to-amber-300/30 rounded-3xl blur-xl"></div>

              {/* Google Search Mockup */}
              <div className="space-y-6">
                {/* Search Bar */}
                <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-slate-100 to-slate-50 rounded-full shadow-inner border border-slate-200/80">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" strokeWidth="2"></circle>
                    <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round"></path>
                  </svg>
                  <span className="text-slate-700 font-medium">plumber near me</span>
                </div>

                {/* Search Results */}
                <div className="space-y-4">
                  {/* Old Result 1 */}
                  <div className="relative opacity-40 grayscale p-5 rounded-xl">
                    <div className="absolute -left-9 top-1/2 -translate-y-1/2 text-lg opacity-60">❌</div>
                    <div className="text-blue-600 font-semibold text-lg mb-1">Joe`s Plumbing Service</div>
                    <div className="text-slate-500 text-xs mb-2">oldsite.com</div>
                    <div className="text-slate-600 text-sm">Welcome to our website. We have been in business...</div>
                  </div>

                  {/* New Result - Highlighted */}
                  <div className="relative p-5 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-2 border-emerald-500 shadow-lg shadow-emerald-200/50 animate-result-pulse">
                    <div className="absolute -left-9 top-1/2 -translate-y-1/2 text-lg animate-bounce-subtle">✅</div>
                    <div className="text-blue-600 font-semibold text-lg mb-1">QuickFix Plumbing - Emergency Service 24/7</div>
                    <div className="text-slate-500 text-xs mb-2">quickfixplumbing.com</div>
                    <div className="text-slate-600 text-sm mb-3 leading-relaxed">
                      Emergency plumber in your area. Fast response, upfront pricing. Leaks, blockages, installations fixed today.
                    </div>
                    <div className="flex gap-2">
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-emerald-100 to-green-50 border border-emerald-200/50 rounded-full text-xs font-semibold text-slate-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
                        📞 Call Now
                      </span>
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-green-100 to-emerald-50 border border-emerald-200/50 rounded-full text-xs font-semibold text-slate-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
                        💬 WhatsApp
                      </span>
                    </div>
                  </div>

                  {/* Old Result 2 */}
                  <div className="relative opacity-40 grayscale p-5 rounded-xl">
                    <div className="absolute -left-9 top-1/2 -translate-y-1/2 text-lg opacity-60">❌</div>
                    <div className="text-blue-600 font-semibold text-lg mb-1">Smith Bros Plumbing</div>
                    <div className="text-slate-500 text-xs mb-2">smithplumbing.net</div>
                    <div className="text-slate-600 text-sm">Quality plumbing services. Contact us for more info...</div>
                  </div>
                </div>

                {/* Comparison Label */}
                <div className="relative pt-6 mt-6 border-t-2 border-dashed border-emerald-200">
                  <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full mx-auto mb-3"></div>
                  <div className="text-center text-sm font-bold text-slate-600 tracking-wide">
                    Invisible → Found, Clicked, Called
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }

        @keyframes shimmer {
          to { background-position: 200% center; }
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes result-pulse {
          0%, 100% {
            box-shadow: 0 10px 25px rgba(16, 185, 129, 0.15), 0 0 0 0 rgba(16, 185, 129, 0);
          }
          50% {
            box-shadow: 0 10px 25px rgba(16, 185, 129, 0.25), 0 0 0 6px rgba(16, 185, 129, 0.1);
          }
        }

        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(-50%); }
          50% { transform: translateY(calc(-50% - 4px)); }
        }

        @keyframes gold-burst {
          0% {
            box-shadow: 0 10px 25px rgba(16, 185, 129, 0.4);
          }
          40% {
            box-shadow: 0 0 80px 25px rgba(251, 191, 36, 0.8),
                        0 0 120px 50px rgba(251, 191, 36, 0.4),
                        0 0 0 8px rgba(251, 191, 36, 0.3);
            transform: scale(1.03);
          }
          100% {
            box-shadow: 0 10px 25px rgba(16, 185, 129, 0.4);
            transform: scale(1);
          }
        }

        .animate-gradient {
          animation: gradient 15s ease infinite;
          background-size: 200% 200%;
        }

        .animate-blob {
          animation: blob 20s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }

        .animate-pulse-dot {
          animation: pulse-dot 2s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-fade-in-scale {
          animation: fade-in-scale 1s ease-out;
        }

        .animate-result-pulse {
          animation: result-pulse 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        .animate-gold-burst {
          animation: gold-burst 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animation-delay-6000 {
          animation-delay: 6s;
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;