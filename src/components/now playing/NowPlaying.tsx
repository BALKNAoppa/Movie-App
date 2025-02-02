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
import Image from "next/image";

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
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="">
          {movies.map((movie) => (
            <CarouselItem key={movie.id}>
              <div className="p-1">
                <div className="flex w-full flex-col items-center gap-0 flex-shrink-0 self-stretch">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    alt={movie.title}
                    className="w-full h-[600px] object-cover rounded-lg"
                    width={500}
                    height={200}
                  />
                  <div className="flex flex-col items-start gap-[16px] self-stretch p-[var(--spacing-5, 20px)]">
                    <div className="flex items-start gap-[var(--spacing-0, 0px)] flex-col sm:flex-row">
                      <div className="flex flex-col items-start flex-1">
                        <p className="self-stretch font-inter text-sm font-normal leading-[20px]">
                          Now Playing:
                        </p>
                        <p className="font-inter text-[24px] font-semibold leading-[32px] tracking-[-0.6px]">
                          {movie.title}
                        </p>
                      </div>
                      <div className="w-full sm:w-[83px] h-[48px] sm:h-[48px]">
                        <div className="flex w-full sm:w-[83px] h-[48px] items-center gap-[4px] flex-shrink-0">
                          <div className="flex pt-[var(--spacing-2, 8px)] items-start gap-[10px]">
                            <Star />
                          </div>
                          <div className="flex flex-col items-start">
                            <p className="font-inter text-lg font-semibold leading-[28px]">
                              {movie.vote_average}
                              <span className="text-[#71717A] font-inter text-base font-normal leading-[24px]">
                                /10
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base">{movie.overview}</p>
                    <Button className="w-full sm:w-auto">
                      <Play />
                      Watch Trailer
                    </Button>
                  </div>
                </div>
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
