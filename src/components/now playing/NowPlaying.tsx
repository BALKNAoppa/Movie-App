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
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getMovieData } from "@/utils/getMovies";
import { Button } from "../ui/button";
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";
import { getTraillerData } from "@/utils/geTraillerData";

export function NowPlaying() {
  const { push } = useRouter();
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
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const movieList = await getMovieData("now_playing");
      setMovies(movieList.results);
    };
    fetchMovies();
  }, []);

  const fetchTrailer = async (movieId: number) => {
    const trailerDetails = await getTraillerData(movieId);
    if (trailerDetails && trailerDetails.results.length > 0) {
      setTrailerKey(trailerDetails.results[0  ].key);
    }
  };
  console.log("test", getTraillerData);
  

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  return (
    <div className="flex justify-center">
      <Dialog>
        <Carousel
          plugins={[plugin.current]}
          className="w-full relative"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {movies.map((movie) => (
              <CarouselItem key={movie.id}>
                <div className="relative mt-6 cursor-pointer">
                  <div
                    className="relative overflow-hidden h-[280px] lg:h-[600px]"
                    onClick={() => push(`detail/${movie.id}`)}
                  >
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
                            {movie.vote_average.toFixed(1)}
                            {""}
                            <span className="text-[#71717A] font-inter text-base font-normal leading-[24px]">
                              /10
                            </span>
                          </p>
                        </div>
                      </div>
                      <p className="w-full lg:w-[400px] line-clamp-5 text-justify">
                        {movie.overview}
                      </p>
                      <DialogTrigger asChild>
                        <Button
                          className="inline-flex items-center bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 justify-center gap-2 h-9 px-4 py-2 mt-4"
                          onClick={() => fetchTrailer(movie.id)}
                        >
                          <Play />
                          Watch Trailer
                        </Button>
                      </DialogTrigger>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute max-lg:hidden left-[44px] top-[330px]" />
          <CarouselNext className="absolute max-lg:hidden right-[44px] top-[330px]" />
        </Carousel>
        <DialogTitle></DialogTitle>
        <DialogContent className="bg-black bg-opacity-75 min-w-[1000000px] h-full flex justify-center items-center z-50 border-none rounded-none">
        {trailerKey && (
         <div className="relative p-5 w-full max-w-[1000px]">
           <div className="relative w-full aspect-video">
             <iframe
               className="w-full h-full rounded-lg"
               src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
               title="Movie Trailer"
               frameBorder="0"
               allow="autoplay; encrypted-media; fullscreen"
               allowFullScreen
             ></iframe>
           </div>
         </div>
        )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
