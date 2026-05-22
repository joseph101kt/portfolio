"use client";

import { ArrowRight, Phone, MessageCircle } from 'lucide-react';
import GraphPaperGrid from './GraphPaperGrid';

const HeroSection = () => {
  return (
    <section
      className="
        relative flex items-center overflow-hidden
        bg-[#F5EFE7]
        dark:bg-[#0F1115]
      "
      style={{
        minHeight: 'calc(100vh - 2rem)',
        paddingTop: '2rem',
      }}
    >
      <GraphPaperGrid />

      <div className="relative z-20 w-full max-w-6xl mx-auto px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">

          {/* Left Column */}
          <div>

            <p
              className="
                mb-6 text-sm font-bold tracking-wider
                text-[#C65D3B]
                dark:text-[#E58B6B]
              "
            >
              FOR PLUMBERS · ELECTRICIANS · BUILDERS ACROSS THE UK
            </p>

            <h1
              className="
                mb-6 leading-[1.05]
                text-[2rem] sm:text-[2.75rem] lg:text-[3rem]
                font-bold tracking-[-0.03em]
                text-[#2D3436]
                dark:text-[#F3F4F6]
              "
              style={{
                fontFamily: 'Georgia, serif',
              }}
            >
              Losing £2,000/Week to Competitors on Google?
            </h1>

            <p
              className="
                mb-8 text-lg leading-normal sm:text-xl
                text-[#636E72]
                dark:text-[#A1A1AA]
              "
            >
              When someone searches &quot;plumber near me&quot;&mdash;your competitor shows up first.
              His phone&apos;s ringing. Yours isn&apos;t.
            </p>

            <p
              className="
                mb-10 text-lg font-semibold sm:text-xl
                text-[#2D3436]
                dark:text-[#F3F4F6]
              "
            >
              I fix that.
            </p>

            {/* CTA */}
            <div className="mb-6">
              <a
                href="#contact"
                className="
                  inline-flex items-center rounded
                  px-10 py-4 text-lg font-semibold
                  text-[#FAF7F2]
                  transition-all duration-200

                  bg-[#C65D3B]
                  hover:bg-[#9D4A2E]

                  dark:bg-[#D97757]
                  dark:hover:bg-[#B85F42]
                  dark:shadow-[0_0_30px_rgba(217,119,87,0.18)]
                "
                style={{
                  textDecoration: 'none',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                Get Your Free Mockup
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>

            <p
              className="
                mb-8 text-sm
                text-[#636E72]
                dark:text-[#A1A1AA]
              "
            >
              Free mockup in 24 hours · No payment to see it
            </p>

            {/* Payment Model */}
            <div
              className="
                mb-6 max-w-[32rem]
                border-l-4 p-5

                border-[#C65D3B]
                bg-white/60

                dark:border-[#D97757]
                dark:bg-white/[0.04]
                dark:backdrop-blur-sm
              "
            >
              <p
                className="
                  mb-3 text-base leading-relaxed
                  text-[#2D3436]
                  dark:text-[#E5E7EB]
                "
              >
                <strong>Pay £200 today</strong> — covers domain + hosting setup
              </p>

              <p
                className="
                  text-base leading-relaxed
                  text-[#2D3436]
                  dark:text-[#E5E7EB]
                "
              >
                <strong>Pay £300 later — only after it works.</strong> Once your site gets 10 click-to-calls.*
              </p>

              <p
                className="
                  mt-4 border-t pt-4 text-sm
                  border-[#E8DFD1]
                  text-[#636E72]

                  dark:border-white/10
                  dark:text-[#A1A1AA]
                "
              >
                *Click-to-call = someone clicked your phone or WhatsApp button.
                Tracked via Microsoft Clarity, installed on your site at no cost.
                No 20 clicks in 60 days? You owe nothing more.
              </p>
            </div>

            {/* Honest Launch Message */}
            <div
              className="
                max-w-[32rem] rounded p-4

                border border-[#E8DFD1]
                bg-white/40

                dark:border-white/10
                dark:bg-white/[0.03]
                dark:backdrop-blur-sm
              "
            >
              <p
                className="
                  text-sm leading-relaxed
                  text-[#636E72]
                  dark:text-[#A1A1AA]
                "
              >
                <strong
                  className="
                    text-[#2D3436]
                    dark:text-[#F3F4F6]
                  "
                >
                  Just launching in the UK.
                </strong>{' '}
                First 10 customers get this deal.
                Why performance-based pricing? I need real examples.
                You need customers. Fair trade.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div
            className="lg:sticky"
            style={{
              top: '6rem',
              alignSelf: 'start',
            }}
          >
            <div
              className="
                rounded-xl border p-6 shadow-sm

                border-[#E8DFD1]
                bg-white

                dark:border-white/10
                dark:bg-[#181C22]
                dark:shadow-2xl
              "
            >
              {/* Search Bar */}
              <div
                className="
                  mb-3 flex items-center gap-2 rounded border px-3 py-2

                  border-[#E8DFD1]
                  bg-[#FAF7F2]

                  dark:border-white/10
                  dark:bg-white/[0.03]
                "
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="shrink-0"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="8"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-[#636E72] dark:text-[#A1A1AA]"
                  />
                  <path
                    d="m21 21-4.35-4.35"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-[#636E72] dark:text-[#A1A1AA]"
                  />
                </svg>

                <span
                  className="
                    text-sm
                    text-[#636E72]
                    dark:text-[#A1A1AA]
                  "
                >
                  plumber near me
                </span>
              </div>

              {/* Competitor 1 */}
              <div
                className="
                  mb-2 rounded px-3 py-2 opacity-40

                  bg-[#FAF7F2]

                  dark:bg-white/[0.03]
                "
              >
                <p className="mb-0.5 text-sm font-semibold text-blue-600 line-through">
                  Joe&apos;s Plumbing
                </p>

                <p
                  className="
                    text-xs
                    text-[#636E72]
                    dark:text-[#A1A1AA]
                  "
                >
                  His phone&apos;s ringing
                </p>
              </div>

              {/* Your Site */}
              <div
                className="
                  mb-2 rounded border-2 p-4

                  border-[#C65D3B]
                  bg-[#FFFEFB]

                  dark:border-[#D97757]
                  dark:bg-[#20252D]
                "
              >
                <p className="mb-1 text-base font-bold text-blue-500">
                  Your Business Here
                </p>

                <p className="mb-3 text-xs text-[#7A9B8E] dark:text-[#8FB3A5]">
                  yourname.co.uk
                </p>

                <p
                  className="
                    mb-3 text-sm leading-relaxed
                    text-[#2D3436]
                    dark:text-[#E5E7EB]
                  "
                >
                  Emergency plumber. Same day service. All postcodes. Call now.
                </p>

                <div className="flex gap-2">
                  <button
                    className="
                      flex-1 inline-flex items-center justify-center gap-1.5
                      rounded px-3 py-2 text-sm font-semibold
                      transition-colors

                      border-2 border-[#C65D3B]
                      bg-[#FAF7F2]
                      text-[#2D3436]

                      dark:border-[#D97757]
                      dark:bg-[#181C22]
                      dark:text-[#F3F4F6]
                      dark:hover:bg-[#232933]
                    "
                  >
                    <Phone className="h-4 w-4" />
                    Call
                  </button>

                  <button
                    className="
                      flex-1 inline-flex items-center justify-center gap-1.5
                      rounded px-3 py-2 text-sm font-semibold
                      transition-colors

                      border-2 border-[#C65D3B]
                      bg-[#FAF7F2]
                      text-[#2D3436]

                      dark:border-[#D97757]
                      dark:bg-[#181C22]
                      dark:text-[#F3F4F6]
                      dark:hover:bg-[#232933]
                    "
                  >
                    <MessageCircle className="h-4 w-4" />
                    Message
                  </button>
                </div>
              </div>

              {/* Competitor 2 */}
              <div
                className="
                  rounded px-3 py-2 opacity-40

                  bg-[#FAF7F2]

                  dark:bg-white/[0.03]
                "
              >
                <p className="mb-0.5 text-sm font-semibold text-blue-600 line-through">
                  Smith Plumbing
                </p>

                <p
                  className="
                    text-xs
                    text-[#636E72]
                    dark:text-[#A1A1AA]
                  "
                >
                  Yours isn&apos;t
                </p>
              </div>

              <div
                className="
                  mt-4 border-t pt-4 text-center

                  border-[#E8DFD1]

                  dark:border-white/10
                "
              >
                <p
                  className="
                    text-sm font-semibold
                    text-[#2D3436]
                    dark:text-[#F3F4F6]
                  "
                >
                  Top spot = more calls = more money
                </p>
              </div>
            </div>

            <div className="mt-4 hidden lg:block">
              <p
                className="
                  text-center text-xs
                  text-[#636E72]
                  dark:text-[#A1A1AA]
                "
              >
                Works on any phone · Loads fast · Easy to call
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        * {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
      `}</style>
    </section>
  );
};

export default HeroSection;