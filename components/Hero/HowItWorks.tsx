"use client";

import GraphPaperGrid from "./GraphPaperGrid";

const steps = [
  {
    number: '1',
    title: 'You Tell Me Your Trade',
    timeframe: '2 minutes',
    lines: [
      'No tech knowledge needed',
      'Just your trade and service area',
      'One quick WhatsApp is enough',
    ],
  },
  {
    number: '2',
    title: 'I Build Your Mockup',
    timeframe: '24 hours',
    lines: [
      'See exactly what you get',
      'Your name, your services',
      'No payment to see it',
    ],
  },
  {
    number: '3',
    title: 'Your Site Goes Live',
    timeframe: 'Same week',
    lines: [
      'Visible on Google immediately',
      'Call and WhatsApp buttons ready',
      'Track every enquiry from day one',
    ],
  },
];

const HowItWorksSection = () => {
  return (
    <section
      className="
        relative overflow-hidden
        bg-[#F5EFE7]

        dark:bg-[#0F1115]
      "
    >
      {/* Background Grid */}
      <div className="absolute left-0 top-0 h-full w-full rotate-180">
        <GraphPaperGrid />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">

        {/* Header */}
        <div className="mb-16">
          <h2
            className="
              mb-4 text-[1.75rem] sm:text-[2.25rem]
              font-bold tracking-[-0.02em]
              text-[#2D3436]

              dark:text-[#F3F4F6]
            "
            style={{
              fontFamily: 'Georgia, serif',
            }}
          >
            How It Works
          </h2>

          <p
            className="
              text-lg
              text-[#636E72]

              dark:text-[#A1A1AA]
            "
          >
            No guesswork. No upfront design fees. Just results.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid gap-12 sm:grid-cols-3">

          {/* Connector Line */}
          <div
            className="
              absolute left-[52px] right-[52px] top-[26px]
              hidden h-[2px] border-t-2 border-dashed sm:block

              border-[#D8D0C5]

              dark:border-white/10
            "
            style={{ zIndex: 0 }}
          />

          {steps.map((step) => (
            <div key={step.number} className="relative z-10">

              {/* Number Box */}
              <div
                className="
                  mb-8 flex items-center justify-center
                  pb-2 font-bold shadow-lg

                  bg-[#C65D3B]
                  text-[#FAF7F2]

                  dark:bg-[#D97757]
                  dark:shadow-[0_10px_30px_rgba(217,119,87,0.22)]
                "
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  fontSize: '1.5rem',
                  fontFamily: 'Georgia, serif',
                  transform: 'rotate(-3deg)',
                }}
              >
                {step.number}
              </div>

              {/* Title */}
              <h3
                className="
                  mb-1 text-xl font-bold
                  text-[#2D3436]

                  dark:text-[#F3F4F6]
                "
                style={{
                  fontFamily: 'Georgia, serif',
                }}
              >
                {step.title}
              </h3>

              {/* Timeframe */}
              <p
                className="
                  mb-6 text-sm font-bold uppercase tracking-widest
                  text-[#C65D3B]

                  dark:text-[#E58B6B]
                "
              >
                {step.timeframe}
              </p>

              {/* Bullet List */}
              <div className="space-y-3">
                {step.lines.map((line, i) => (
                  <div key={i} className="flex items-start gap-2">

                    <span
                      className="
                        mt-2.5 h-1.5 w-1.5 rounded-full

                        bg-[#C65D3B]

                        dark:bg-[#D97757]
                      "
                    />

                    <p
                      className="
                        text-base leading-relaxed
                        text-[#636E72]

                        dark:text-[#A1A1AA]
                      "
                    >
                      {line}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;