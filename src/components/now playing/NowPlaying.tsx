import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
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
import Image from "next/legacy/image";

export function NowPlaying() {
  type Movie = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  };

  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    const dataFunction = async () => {
      const movieList = await getMovieData("now_playing");
      console.log("ALL RESPONCES", movieList);
      setMovies(movieList.results);
    };
    dataFunction();
  }, []);
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  return (
    <div className="flex justify-center">
      <Carousel
        plugins={[plugin.current]}
        className="w-full relative"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {movies.map((movie) => (
            <CarouselItem key={movie.id}>
              <div className="relative mt-6">
                <a>
                  <div className="relative overflow-hidden h-[280px] lg:h-[600px]">
                    <span className="box-sizing: border-box; display: block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: absolute; inset: 0px;">
                      <Image
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt={movie.title}
                        objectFit="cover"
                        layout="fill"
                      />
                    </span>
                    <div className="absolute inset-0 z-10 transition-all duration-300 group-hover:bg-primary/30"></div>
                  </div>
                </a>
                <div className="static text-foreground lg:absolute lg:top-1/2 lg:left-[140px] lg:-translate-y-1/2 lg:text-white z-10">
                  <div className="p-5 space-y-4 lg:p-0">
                    <div className="flex justify-between lg:flex-col lg:space-y-1">
                      <div>
                        <p>Now Playing:</p>
                        <p className="font-inter text-[24px] font-semibold leading-[32px] tracking-[-0.6px]">
                          {movie.title}
                        </p>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <Star className="fill-[#fde047] stroke-[#fde047]" />
                        <p className="font-medium">
                          {movie.vote_average.toFixed(1)}{""}
                          <span className="text-[#71717A] font-inter text-base font-normal leading-[24px]">
                            /10
                          </span>
                        </p>
                      </div>
                    </div>
                    <p className="w-full lg:w-[400px] line-clamp-5 text-justify">
                      {movie.overview}
                    </p>
                    <Button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 mt-4">
                      <Play />
                      Watch Trailer
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute max-lg:hidden left-[44px] top-[330px]" />
        <CarouselNext className="absolute max-lg:hidden right-[44px] top-[330px]" />
      </Carousel>
    </div>
  );
}
