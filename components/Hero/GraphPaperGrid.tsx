const GraphPaperGrid = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Small Grid */}
          <pattern
            id="smallGrid"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              className="
                stroke-[#E8DFD1]
                dark:stroke-white/[0.04]
              "
              strokeWidth="0.5"
            />
          </pattern>

          {/* Medium Grid */}
          <pattern
            id="mediumGrid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <rect width="50" height="50" fill="url(#smallGrid)" />

            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              className="
                stroke-[#D8D0C5]
                dark:stroke-white/[0.06]
              "
              strokeWidth="1"
            />
          </pattern>

          {/* Major Grid */}
          <pattern
            id="grid"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <rect width="100" height="100" fill="url(#mediumGrid)" />

            <path
              d="M 100 0 L 0 0 0 100"
              fill="none"
              className="
                stroke-[#F6DCCD]
                dark:stroke-[#D97757]/[0.10]
              "
              strokeWidth="2"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Fade Overlay */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(to_bottom,transparent_70%,#F5EFE7_98%)]

          dark:bg-[linear-gradient(to_bottom,transparent_70%,#0F1115_98%)]
        "
      />
    </div>
  );
};

export default GraphPaperGrid;