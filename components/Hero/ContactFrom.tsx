"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Briefcase,
  ChevronLeft,
  MapPin,
  Wrench,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

type Step = 1 | 2 | 3 | 4;

type FormData = {
  trade: string;
  otherTrade: string;
  businessName: string;
  area: string;
};

const TRADES = [
  "Plumber",
  "Electrician",
  "Roofer",
  "Builder",
  "Painter",
  "Other",
];

const WHATSAPP_NUMBER = "9397082746";

const ContactForm = () => {
  const [step, setStep] = useState<Step>(1);
  const [visible, setVisible] = useState(true);

  const [formData, setFormData] = useState<FormData>({
    trade: "",
    otherTrade: "",
    businessName: "",
    area: "",
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const soundPlayed = useRef(false);

  // ─────────────────────────────────────────────────────────────
  // Helpers
  // ─────────────────────────────────────────────────────────────

  const selectedTrade =
    formData.trade === "Other"
      ? formData.otherTrade
      : formData.trade;

  const progress = useMemo(() => {
    return (step / 4) * 100;
  }, [step]);

  const transition = (to: Step) => {
    setVisible(false);

    setTimeout(() => {
      setStep(to);
      setVisible(true);
    }, 180);
  };

  useEffect(() => {
    if (step > 1 && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 220);
    }
  }, [step]);

  const playConfirmationSound = () => {
    if (soundPlayed.current) return;

    try {
      const ctx = new (
        window.AudioContext ||
        (window as typeof window & {
          webkitAudioContext?: typeof AudioContext;
        }).webkitAudioContext!
      )();

      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.connect(gain);
      gain.connect(ctx.destination);

      oscillator.frequency.setValueAtTime(820, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        620,
        ctx.currentTime + 0.1
      );

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + 0.14
      );

      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.14);

      soundPlayed.current = true;
    } catch {
      // silent fail
    }
  };

  const handleTradeSelect = (trade: string) => {
    playConfirmationSound();

    setFormData((prev) => ({
      ...prev,
      trade,
    }));

    if (trade !== "Other") {
      setTimeout(() => transition(2), 120);
    }
  };

  const whatsappLink = useMemo(() => {
    const message = `Hey, I'm interested in a website mockup.

Business: ${formData.businessName}
Trade: ${selectedTrade}
Area: ${formData.area}`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;
  }, [formData, selectedTrade]);

  // ─────────────────────────────────────────────────────────────
  // Shared styles
  // ─────────────────────────────────────────────────────────────

  const inputClass = `
    w-full rounded-2xl border
    border-[#E7DED1]
    bg-[#F7F3EE]
    px-5 py-5
    text-[16px] text-[#1F2933]
    outline-none
    transition-all duration-200

    placeholder:text-[#9AA5B1]

    focus:border-[#C65D3B]
    focus:bg-white

    dark:border-white/10
    dark:bg-[#181C22]
    dark:text-[#F3F4F6]
    dark:placeholder:text-[#71717A]

    dark:focus:border-[#D97757]
    dark:focus:bg-[#1D232C]
  `;

  const primaryButtonClass = `
    inline-flex items-center justify-center gap-2
    rounded-2xl
    bg-[#C65D3B]
    px-6 py-4
    text-[15px] font-semibold text-white
    transition-all duration-200

    hover:bg-[#A94E31]

    dark:bg-[#D97757]
    dark:hover:bg-[#C96A4B]
  `;

  // ─────────────────────────────────────────────────────────────
  // UI
  // ─────────────────────────────────────────────────────────────

  return (
    <div
      className="
        overflow-hidden rounded-[28px]
        border border-[#E7DED1]
        bg-white
        shadow-[0_8px_40px_rgba(0,0,0,0.06)]

        dark:border-white/10
        dark:bg-[#12161C]
        dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)]
      "
    >
      {/* Progress */}
      <div
        className="
          h-[5px] w-full
          bg-[#EFE6DA]

          dark:bg-white/5
        "
      >
        <div
          className="
            h-full
            bg-[#C65D3B]
            transition-all duration-500 ease-out

            dark:bg-[#D97757]
          "
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <div className="px-6 py-4 sm:px-8 sm:py-4">
        {/* Top Meta */}
        <div className="mb-4 flex items-center justify-between">
          {step > 1 && (
            <button
              onClick={() => transition((step - 1) as Step)}
              className="
                mr-3 flex h-8 w-6 items-center justify-center
                rounded-full border

                border-[#E7DED1]
                bg-[#F7F3EE]
                text-[#52606D]

                transition-all duration-200

                hover:border-[#D6C7B5]
                hover:bg-[#EEE4D8]

                dark:border-white/10
                dark:bg-[#181C22]
                dark:text-[#D4D4D8]

                dark:hover:border-white/20
                dark:hover:bg-[#1D232C]
              "
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}

          <div>
            <p
              className="
                mb-1 text-sm font-medium
                text-[#C65D3B]

                dark:text-[#E58B6B]
              "
            >
              Takes about 20 seconds
            </p>

            <p
              className="
                text-sm
                text-[#7B8794]

                dark:text-[#A1A1AA]
              "
            >
              Free homepage mockup for local trades businesses
            </p>
          </div>

          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  item <= step
                    ? "bg-[#C65D3B] dark:bg-[#D97757]"
                    : "bg-[#D8CCBC] dark:bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Animated Content */}
        <div
          className={`transition-all duration-200 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-2 opacity-0"
          }`}
        >
          {/* ───────────────── STEP 1 ───────────────── */}
          {step === 1 && (
            <div>
              <h2
                className="
                  mb-3 text-3xl font-bold tracking-tight
                  text-[#1F2933]
                  sm:text-4xl

                  dark:text-[#F3F4F6]
                "
              >
                What do you do?
              </h2>

              <p
                className="
                  mb-7 max-w-md
                  text-[17px] leading-8
                  text-[#52606D]

                  dark:text-[#A1A1AA]
                "
              >
                Pick your trade below — one tap and you’re underway.
              </p>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {TRADES.map((trade) => {
                  const active = formData.trade === trade;

                  return (
                    <button
                      key={trade}
                      onClick={() => handleTradeSelect(trade)}
                      className={`group rounded-3xl border px-5 py-4 text-left transition-all duration-200 ${
                        active
                          ? "border-[#C65D3B] bg-[#C65D3B] text-white dark:border-[#D97757] dark:bg-[#D97757]"
                          : `
                            border-[#E7DED1]
                            bg-[#F7F3EE]
                            text-[#1F2933]

                            hover:border-[#C65D3B]
                            hover:bg-[#F1E7DB]

                            dark:border-white/10
                            dark:bg-[#181C22]
                            dark:text-[#F3F4F6]

                            dark:hover:border-[#D97757]
                            dark:hover:bg-[#1D232C]
                          `
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[16px] font-semibold">
                          {trade}
                        </span>

                        <ArrowRight
                          className={`h-5 w-5 transition-transform duration-200 ${
                            active
                              ? "translate-x-0"
                              : "group-hover:translate-x-1"
                          }`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

              {formData.trade === "Other" && (
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="e.g. Landscaper"
                    value={formData.otherTrade}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        otherTrade: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" &&
                        formData.otherTrade.trim()
                      ) {
                        transition(2);
                      }
                    }}
                    className={inputClass}
                  />

                  {formData.otherTrade.trim() && (
                    <button
                      onClick={() => transition(2)}
                      className={`${primaryButtonClass} mt-4 w-full`}
                    >
                      Continue
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ───────────────── STEP 2 ───────────────── */}
          {step === 2 && (
            <div>
              <div className="mb-7">
                <h2
                  className="
                    flex items-center gap-3
                    text-3xl font-bold tracking-tight
                    text-[#1F2933]
                    sm:text-4xl

                    dark:text-[#F3F4F6]
                  "
                >
                  <span
                    className="
                      inline-flex rounded-2xl
                      bg-[#F7F3EE]
                      p-2.5
                      text-[#C65D3B]

                      dark:bg-[#181C22]
                      dark:text-[#D97757]
                    "
                  >
                    <Briefcase className="h-5 w-5" />
                  </span>

                  What should customers call you?
                </h2>

                <p
                  className="
                    mt-4 max-w-md
                    text-[17px] leading-8
                    text-[#52606D]

                    dark:text-[#A1A1AA]
                  "
                >
                  This helps me personalise your homepage mockup.
                </p>
              </div>

              <input
                ref={inputRef}
                type="text"
                placeholder={`QuickFix ${
                  selectedTrade || "Plumbing"
                }`}
                value={formData.businessName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    businessName: e.target.value,
                  }))
                }
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    formData.businessName.trim()
                  ) {
                    transition(3);
                  }
                }}
                className={inputClass}
              />

              <button
                onClick={() => transition(3)}
                disabled={!formData.businessName.trim()}
                className={`${primaryButtonClass} mt-5 w-full disabled:cursor-not-allowed disabled:bg-[#D9CDBE] dark:disabled:bg-white/10`}
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* ───────────────── STEP 3 ───────────────── */}
          {step === 3 && (
            <div>
              <div className="mb-7">
                <h2
                  className="
                    flex items-center gap-3
                    text-3xl font-bold tracking-tight
                    text-[#1F2933]
                    sm:text-4xl

                    dark:text-[#F3F4F6]
                  "
                >
                  <span
                    className="
                      inline-flex rounded-2xl
                      bg-[#F7F3EE]
                      p-2.5
                      text-[#C65D3B]

                      dark:bg-[#181C22]
                      dark:text-[#D97757]
                    "
                  >
                    <MapPin className="h-5 w-5" />
                  </span>

                  Which areas do you serve?
                </h2>

                <p
                  className="
                    mt-4 max-w-md
                    text-[17px] leading-8
                    text-[#52606D]

                    dark:text-[#A1A1AA]
                  "
                >
                  City, suburb, or region — however customers know it.
                </p>
              </div>

              <input
                ref={inputRef}
                type="text"
                placeholder="Chiswick"
                value={formData.area}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    area: e.target.value,
                  }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" && formData.area.trim()) {
                    transition(4);
                  }
                }}
                className={inputClass}
              />

              <button
                onClick={() => transition(4)}
                disabled={!formData.area.trim()}
                className={`${primaryButtonClass} mt-5 w-full disabled:cursor-not-allowed disabled:bg-[#D9CDBE] dark:disabled:bg-white/10`}
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* ───────────────── STEP 4 ───────────────── */}
          {step === 4 && (
            <div>
              <div className="mb-7">
                <h2
                  className="
                    flex items-center gap-3
                    text-3xl font-bold tracking-tight
                    text-[#1F2933]
                    sm:text-4xl

                    dark:text-[#F3F4F6]
                  "
                >
                  <span
                    className="
                      inline-flex rounded-2xl
                      bg-[#DCFCE7]
                      p-2.5
                      text-[#16A34A]

                      dark:bg-[#14532D]
                      dark:text-[#4ADE80]
                    "
                  >
                    <Wrench className="h-5 w-5" />
                  </span>

                  Your mockup is ready to start.
                </h2>

                <p
                  className="
                    mt-4 max-w-lg
                    text-[17px] leading-8
                    text-[#52606D]

                    dark:text-[#A1A1AA]
                  "
                >
                  I’ll message you on WhatsApp and start putting together ideas
                  for your website.
                </p>
              </div>

              {/* Summary Card */}
              <div
                className="
                  mb-4 rounded-3xl border
                  border-[#E7DED1]
                  bg-[#F8F5F1]
                  p-5

                  dark:border-white/10
                  dark:bg-[#181C22]
                "
              >
                <div className="space-y-4">
                  {[
                    {
                      label: "Business",
                      value: formData.businessName,
                    },
                    {
                      label: "Trade",
                      value: selectedTrade,
                    },
                    {
                      label: "Area",
                      value: formData.area,
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start gap-3"
                    >
                      <div
                        className="
                          mt-1 h-2.5 w-2.5 rounded-full
                          bg-[#C65D3B]

                          dark:bg-[#D97757]
                        "
                      />

                      <div>
                        <p
                          className="
                            text-sm
                            text-[#7B8794]

                            dark:text-[#A1A1AA]
                          "
                        >
                          {item.label}:{" "}
                          <span
                            className="
                              text-[16px] font-semibold
                              text-[#1F2933]

                              dark:text-[#F3F4F6]
                            "
                          >
                            {item.value}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group flex w-full items-center justify-center gap-3
                  rounded-3xl
                  bg-[#25D366]
                  px-6 py-4
                  text-[17px] font-semibold text-white
                  transition-all duration-200

                  hover:scale-[1.01]
                  hover:bg-[#1FB85A]
                "
              >
                <FaWhatsapp className="h-8 w-8" />

                Continue on WhatsApp

                <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <p
                className="
                  mt-4 text-center text-sm leading-7
                  text-[#7B8794]

                  dark:text-[#A1A1AA]
                "
              >
                Usually replies within an hour. No pressure — just ideas for
                your website.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;