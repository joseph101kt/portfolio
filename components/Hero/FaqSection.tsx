"use client";

import { useState } from 'react';

const faqs = [
  {
    q: 'How long does it actually take?',
    a: "You'll see a mockup of your site within 24 hours of filling out the form — no payment needed to see it. Once you're happy and the deposit is paid, your site is live within 5 to 7 working days. Not weeks. Not months.",
  },
  {
    q: "What if I don't like the mockup?",
    a: "Walk away — no charge, no awkward conversation. The mockup is free because I want you to see exactly what you're getting before you decide anything. If it's not right for you, no hard feelings.",
  },
  {
    q: 'How does the payment work?',
    a: "£150 today covers your domain and hosting setup. The remaining £300 only becomes due after your site receives 20 click-to-calls — someone tapping your phone or WhatsApp button. That's tracked automatically via Microsoft Clarity, which I install on your site for free. No 20 clicks in 60 days? You owe nothing more.",
  },
  {
    q: 'Do I need to know anything technical?',
    a: "Nothing at all. You send me your photos, your list of services, and your phone number over WhatsApp. I handle everything else — domain, hosting, build, launch. After handover, you don't touch any of it unless you want to.",
  },
  {
    q: 'What do I need to provide?',
    a: "A few photos of your work, your list of services, your phone number, and your business name. That's it. It takes about 10 minutes over WhatsApp. If you don't have photos yet, we can work with what you have.",
  },
  {
    q: 'Do I need a Google account?',
    a: "A Google Business Profile helps people find you in local search results — it's what puts you on Google Maps when someone searches your trade nearby. I'll walk you through setting one up for free. It takes 15 minutes and makes a significant difference to how quickly your site starts generating calls.",
  },
  {
    q: 'What if I already have a website?',
    a: "We can replace it entirely or build something new alongside it — your choice. If your current site is on Wix or Squarespace, I'll rebuild it properly so you own everything and stop paying monthly platform fees.",
  },
  {
    q: 'Can I make changes after it goes live?',
    a: "The first two updates are free — adding a new service, swapping a photo, updating your number. After that, changes are £40 per round. If you want someone to handle everything on an ongoing basis, I offer a monthly maintenance plan for £35/month.",
  },
  {
    q: 'Who hosts the site? What if something breaks?',
    a: "Your site runs on Cloudflare — one of the most reliable hosting networks in the world. Downtime is extremely rare. If anything ever goes wrong, WhatsApp me and I'll have it sorted the same day.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section
      className="
        bg-[#F5EFE7]

        dark:bg-[#0F1115]
      "
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">

        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">

          {/* Left */}
          <div
            className="lg:sticky"
            style={{ top: '6rem' }}
          >
            <p
              className="
                mb-5 text-sm font-bold tracking-wider
                text-[#C65D3B]

                dark:text-[#E58B6B]
              "
            >
              FAQ
            </p>

            <h2
              className="
                mb-5 text-[1.75rem] sm:text-[2.25rem]
                font-bold leading-[1.2] tracking-[-0.02em]
                text-[#2D3436]

                dark:text-[#F3F4F6]
              "
              style={{
                fontFamily: 'Georgia, serif',
              }}
            >
              Every question
              <br />
              you probably have.
            </h2>

            <p
              className="
                max-w-[22rem] text-base leading-[1.75]
                text-[#636E72]

                dark:text-[#A1A1AA]
              "
            >
              If something isn&apos;t answered here,{' '}

              <a
                href="https://wa.me/9397082746"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  font-medium underline underline-offset-[3px]

                  text-[#C65D3B]

                  dark:text-[#E58B6B]
                "
              >
                WhatsApp me directly
              </a>
              . I reply within a few hours.
            </p>
          </div>

          {/* Accordion */}
          <div>
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;

              return (
                <div
                  key={i}
                  className="
                    border-b

                    border-[#E8DFD1]

                    dark:border-white/10
                  "
                >
                  <button
                    onClick={() => toggle(i)}
                    className="
                      flex w-full items-start justify-between gap-4
                      py-5 text-left
                    "
                    aria-expanded={isOpen}
                  >
                    <span
                      className="
                        text-base font-semibold leading-[1.4]
                        transition-colors duration-200

                        text-[#2D3436]

                        dark:text-[#F3F4F6]
                      "
                      style={{
                        fontFamily: 'Georgia, serif',
                        color: isOpen
                          ? '#C65D3B'
                          : undefined,
                      }}
                    >
                      {faq.q}
                    </span>

                    {/* Plus Icon */}
                    <span
                      className="
                        mt-[2px] flex h-5 w-5 shrink-0
                        items-center justify-center
                        transition-all duration-300

                        text-[#A09890]

                        dark:text-[#6B7280]
                      "
                      style={{
                        transform: isOpen
                          ? 'rotate(45deg)'
                          : 'rotate(0deg)',
                        color: isOpen
                          ? '#C65D3B'
                          : undefined,
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                      >
                        <line x1="7" y1="1" x2="7" y2="13" />
                        <line x1="1" y1="7" x2="13" y2="7" />
                      </svg>
                    </span>
                  </button>

                  {/* Answer */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                      transition:
                        'grid-template-rows 0.28s cubic-bezier(0.4,0,0.2,1)',
                    }}
                  >
                    <div className="overflow-hidden">
                      <p
                        className="
                          max-w-[36rem] pb-5
                          text-[0.9375rem] leading-[1.8]

                          text-[#636E72]

                          dark:text-[#A1A1AA]
                        "
                      >
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Bottom Border */}
      <div
        className="
          mx-auto w-full max-w-6xl border-t
          px-5 sm:px-8

          border-[#E8DFD1]

          dark:border-white/10
        "
      />
    </section>
  );
};

export default FaqSection;