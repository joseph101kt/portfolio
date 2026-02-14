import HeroSection from "@/components/DevHero/HeroSection";
import { GameCardRevealSequence } from "@/components/media/GameCardReveal";
import { SidewaysScrollGallery } from "@/components/media/SidewaysScrollGallery";
import { StackedCardGallery } from "@/components/media/StackedCardGallery";
import demoImages, { demoImage } from "@/lib/images";

export default function Home() {
  

  return (
    <div className="min-h-screen w-full flex flex-col">
     <HeroSection/>
     <SidewaysScrollGallery images={demoImages} />
     <StackedCardGallery images={demoImages}/>
     <GameCardRevealSequence images={demoImages} finalImage={demoImage}/> 
    </div>
  );
}
