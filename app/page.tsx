import GridWithGlow, { ExplosionButton } from "@/components/Hero/GridWithBgGlow";
import HeroText from "@/components/Hero/HeroText";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Hero Section */}
      <GridWithGlow>
        {/* Center content with flexbox */}
        <div className="flex flex-col w-full items-center justify-center min-h-screen gap-10 translate-z-0">
          <HeroText />
          <ExplosionButton />
        </div>
      </GridWithGlow>
    </div>
  );
}
