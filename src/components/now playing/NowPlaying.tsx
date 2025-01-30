import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getMovieData } from "@/app/utils/getMovies";

export function NowPlaying() {
  const dataFunction = async()=>{
    const data =  await getMovieData();
    console.log(data);
  }
  
  useEffect( () => {
    dataFunction()
    
  }, []);

  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex w-full aspect-square items-center justify-center p-6">
                  <div>
                    TEST
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
