
import GridWithGlow, { ExplosionButton } from "@/components/Hero/GridWithBgGlow";
import ResponsiveGrid from "@/components/Hero/heroGrid/ResponsiveGrid";
import { HeroSection2 } from "@/components/Hero/HeroSection2";
import HeroText from "@/components/Hero/HeroText";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <GridWithGlow>
      <div className="absolute top-3/8 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2">
        <HeroText/>
      </div>
      
      <div className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <ExplosionButton />
      </div>
      </GridWithGlow>
      <div className="h-20"></div>
      <HeroSection2></HeroSection2>
    </div>

  );
}
