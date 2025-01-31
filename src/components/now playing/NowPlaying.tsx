import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getMovieData } from "@/utils/getMovies";
import { Button } from "../ui/button";

export function NowPlaying() {
  const dataFunction = async () => {
    const movies = await getMovieData("now_playing");
    console.log("Now playing dotorh ts", movies);
  };
  

  useEffect(() => {
    dataFunction();
  }, []);

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  return (
    <div className="flex justify-center">
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-xs"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="">
                  <CardContent className="flex w-full aspect-square items-center justify-center p-6">
                    <div className="flex w-[375px] flex-col items-center gap-0 flex-shrink-0 self-stretch">
                      <div></div>
                      <div className="flex p-5 flex-col items-start gap-4 self-stretch">
                        <div className="flex items-start gap-0 self-stretch">
                          <div className="flex flex-col items-start flex-1">
                            <p className="text-sm font-inter font-normal leading-5">
                              Now Playing:
                            </p>
                            <p className="text-sm font-inter font-normal leading-5">
                              Wicked
                            </p>
                          </div>
                          <div className="w-[83px] h-[48px]">
                            <div className="flex w-[83px] h-[48px] items-center gap-1 flex-shrink-0">
                              <div className="flex pt-2 items-start gap-2.5 self-stretch">
                                <Star className="w-[28px] h-[28px] text-[rgba(253,_224,_71,_1)]" />
                              </div>
                              <div className="flex flex-col items-start">
                                <p className="text-lg font-inter font-semibold leading-7"></p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p>
                          Elphaba, a misunderstood young woman because of her
                          green skin, and Glinda, a popular girl, become friends
                          at Shiz University in the Land of Oz. After an
                          encounter with the Wonderful Wizard of Oz, their
                          friendship reaches a crossroads.{" "}
                        </p>
                        <Button className="flex h-[40px] p-2 px-4 justify-center items-center gap-2 rounded-md">
                          <Play />
                          <p className="text-sm font-inter font-medium leading-5">
                            Watch Trailer
                          </p>
                        </Button>
                      </div>
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
    </div>
  );
}
