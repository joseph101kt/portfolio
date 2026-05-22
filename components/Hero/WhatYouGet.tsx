import {
  Search,
  Smartphone,
  MousePointerClick,
  UserCheck,
  Zap,
  Eye,
  BarChart3,
  Globe,
} from 'lucide-react';

const features = [
  {
    title: 'Shows up when people search',
    detail:
      'When someone nearby types "plumber near me" or "electrician in [your town]" — your business appears.',
    icon: Search,
  },
  {
    title: 'Works perfectly on any phone',
    detail:
      'Over 70% of your customers will find you on their phone. Sharp on every screen, old or new.',
    icon: Smartphone,
  },
  {
    title: 'One tap to call or WhatsApp',
    detail:
      'A bold, unmissable button on every page. Visitors go from finding you to ringing you in seconds.',
    icon: MousePointerClick,
  },
  {
    title: 'You own it. Completely.',
    detail:
      'Your domain, your hosting, your code. No monthly platform fees, no lock-in. Everything is yours.',
    icon: UserCheck,
  },
  {
    title: 'Live in 5 to 7 days',
    detail:
      'From first WhatsApp to a live website in less than a week. No long back-and-forths.',
    icon: Zap,
  },
  {
    title: 'See it before you pay a penny',
    detail:
      "We send you a full mockup within 24 hours. Don't like it? Walk away — no charge.",
    icon: Eye,
  },
  {
    title: 'Track every enquiry',
    detail:
      'See how many people visited, clicked to call, or messaged you every month. Real numbers.',
    icon: BarChart3,
  },
  {
    title: 'Domain and hosting sorted',
    detail:
      "We register yourname.co.uk and set up fast UK hosting. You don't touch any of it.",
    icon: Globe,
  },
];

const WhatYouGetSection = () => {
  return (
    <section
      className="
        relative overflow-hidden py-24
        bg-[#F5EFE7]

        dark:bg-[#0F1115]
      "
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">

        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <h2
            className="
              mb-6 text-[2rem] leading-[1.1] sm:text-[2.5rem]
              font-bold tracking-[-0.02em]
              text-[#2D3436]

              dark:text-[#F3F4F6]
            "
            style={{
              fontFamily: 'Georgia, serif',
            }}
          >
            Everything You Need. <br />

            <span
              className="
                text-[#C65D3B]

                dark:text-[#E58B6B]
              "
            >
              Nothing You Don`t.
            </span>
          </h2>

          <p
            className="
              text-lg
              text-[#636E72]

              dark:text-[#A1A1AA]
            "
          >
            No bloated agency packages. Just a fast, professional site built to
            get your phone ringing.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <div
              key={i}
              className="
                group rounded-xl border p-8
                transition-all duration-300

                border-[#E8DFD1]
                bg-white
                hover:-translate-y-1
                hover:border-[#C65D3B]
                hover:shadow-xl

                dark:border-white/10
                dark:bg-[#181C22]
                dark:hover:border-[#D97757]
                dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]
              "
            >
              {/* Icon */}
              <div className="mb-6">
                <feature.icon
                  className="
                    mb-4 h-8 w-8
                    text-[#C65D3B]
                    transition-colors duration-300

                    group-hover:text-[#9D4A2E]

                    dark:text-[#D97757]
                    dark:group-hover:text-[#F29B7A]
                  "
                />

                <div
                  className="
                    h-[2px] w-8
                    bg-[#E8DFD1]
                    transition-all duration-500

                    group-hover:w-full
                    group-hover:bg-[#C65D3B]

                    dark:bg-white/10
                    dark:group-hover:bg-[#D97757]
                  "
                />
              </div>

              <h3
                className="
                  mb-3 text-lg
                  font-bold leading-[1.3]
                  text-[#2D3436]

                  dark:text-[#F3F4F6]
                "
                style={{
                  fontFamily: 'Georgia, serif',
                }}
              >
                {feature.title}
              </h3>

              <p
                className="
                  text-sm leading-relaxed
                  text-[#636E72]

                  dark:text-[#A1A1AA]
                "
              >
                {feature.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="
              inline-block text-lg font-semibold
              underline underline-offset-4
              transition-opacity hover:opacity-80

              text-[#C65D3B]

              dark:text-[#E58B6B]
            "
          >
            See your free mockup first →
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhatYouGetSection;