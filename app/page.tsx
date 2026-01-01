import LayeredGrid2 from "@/components/Hero/best_hero_grid";
import HeroGridStage from "@/components/Hero/HeroGridStage";
import LayeredGrid from "@/components/Hero/TEMPoptimised_hero_Grid";
import Image from "next/image";

export default function Home() {
  return (
    <div>
       <HeroGridStage></HeroGridStage>
       <LayeredGrid></LayeredGrid>
       <LayeredGrid2></LayeredGrid2>
    </div>

  );
}
