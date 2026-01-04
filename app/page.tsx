import HeroSection from "@/components/Hero/HeroSection";
import { GameCardReveal } from "@/components/media/GameCardReveal";
import { SidewaysScrollGallery } from "@/components/media/SidewaysScrollGallery";
import { StackedCardGallery } from "@/components/media/StackedCardGallery";
import demoImages, { demoImage } from "@/lib/images";

export default function Home() {
  

  return (
    <div className="min-h-screen w-full flex flex-col">
     <HeroSection/>
     <SidewaysScrollGallery images={demoImages}/>
     <StackedCardGallery images={demoImages}/>
     <GameCardReveal image={demoImage}/>
    </div>
  );
}
