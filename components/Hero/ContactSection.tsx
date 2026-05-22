import ContactForm from "./ContactFrom";

const reassuranceCards = [
  {
    stat: "24-hour turnaround",
    body: "You’ll get a real homepage mockup for your business by tomorrow.",
  },
  {
    stat: "No pressure",
    body: "Look through the design first. Decide later if you want to move forward.",
  },
  {
    stat: "Built around your business",
    body: "Your services, your area, and your branding — not a generic template.",
  },
];

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="
        w-full
        bg-[#FAF7F2]

        dark:bg-[#12161C]
      "
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-[0.6fr_0.4fr] lg:gap-10">

          {/* Left Column */}
          <div
            className="w-full lg:sticky"
            style={{ top: "6rem" }}
          >

            {/* Heading */}
            <h2
              className="
                mb-6 text-[2rem] sm:text-[2.7rem]
                font-bold leading-[1.05] tracking-[-0.03em]
                text-[#2D3436]

                dark:text-[#F3F4F6]
              "
              style={{
                fontFamily: "Georgia, serif",
              }}
            >
              See what your website
              <br />

              <span
                className="
                  text-[#C65D3B]

                  dark:text-[#E58B6B]
                "
              >
                could look like first
              </span>
            </h2>

            {/* Sub-heading */}
            <p
              className="
                mb-7 max-w-[31rem]
                text-[17px] leading-[1.8]
                text-[#636E72]

                dark:text-[#A1A1AA]
              "
            >
              Answer a few quick questions and I’ll put together a custom
              homepage concept for your business — free, with no commitment.
            </p>

            {/* Trust Pills */}
            <div className="mb-10 flex flex-wrap gap-2">
              {[
                "Free concept mockup",
                "No sales call",
                "Chat on WhatsApp",
              ].map((item) => (
                <span
                  key={item}
                  className="
                    rounded-full border
                    px-3 py-1.5 text-xs font-medium

                    border-[#E8DFD1]
                    bg-[#F0E9DF]
                    text-[#636E72]

                    dark:border-white/10
                    dark:bg-white/[0.04]
                    dark:text-[#A1A1AA]
                  "
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Reassurance Cards */}
            <div className="hidden flex-col gap-3 lg:flex">
              {reassuranceCards.map((card) => (
                <div
                  key={card.stat}
                  className="
                    flex items-start gap-4 rounded-2xl
                    border p-5
                    transition-all duration-200

                    border-[#E8DFD1]
                    bg-[#F8F5F1]

                    hover:-translate-y-[2px]

                    dark:border-white/10
                    dark:bg-[#181C22]
                    dark:hover:bg-[#1D232C]
                    dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]
                  "
                >
                  {/* Accent Bar */}
                  <div
                    className="
                      mt-[2px] shrink-0 rounded-full
                      bg-[#C65D3B]

                      dark:bg-[#D97757]
                    "
                    style={{
                      width: "3px",
                      minHeight: "38px",
                    }}
                  />

                  <div>
                    <p
                      className="
                        mb-1 text-sm font-bold
                        text-[#2D3436]

                        dark:text-[#F3F4F6]
                      "
                      style={{
                        fontFamily: "Georgia, serif",
                      }}
                    >
                      {card.stat}
                    </p>

                    <p
                      className="
                        text-sm leading-[1.7]
                        text-[#636E72]

                        dark:text-[#A1A1AA]
                      "
                    >
                      {card.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex w-full justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <ContactForm />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Divider */}
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

export default ContactSection;