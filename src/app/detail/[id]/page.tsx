"use client";

import { useParams } from "next/navigation";
import { getMovieDetail } from "@/utils/getMovieDetail";
import { getTraillerData } from "@/utils/geTraillerData";
import { getDirectorDetails } from "@/utils/getDirectorDetails";
import { useEffect, useState } from "react";
import { Star, Play } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  runtime: number;
  crew: { 
    name: string 
    }[];
};

export default function Page() {
  const { push } = useRouter();
  const { id } = useParams();
  const [movies, setMovies] = useState<Movie>();
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [directorDetail, setDirectorDetail] = useState<Movie>();

  const dataFunction = async () => {
    const movieList = await getMovieDetail(Number(id));
    console.log("ALL RESPONSES FOR DETAILS", movieList);
    setMovies(movieList);
  };

  const fetchTrailer = async (movieId: number) => {
    const trailerDetails = await getTraillerData(movieId);
    if (trailerDetails && trailerDetails.results.length > 0) {
      setTrailerKey(trailerDetails.results[0].key);
    }
  };
  
  const fetchDirector = async () => {
    const directorDetail = await getDirectorDetails(Number(id));
    console.log("ALL RESPONSES FOR DIRECTORS", directorDetail);
    setDirectorDetail(directorDetail);
  };

  useEffect(() => {
    dataFunction();
    fetchTrailer(Number(id));
    fetchDirector();
  }, []);

  function formatRuntime(runtime: number): string {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  }

  return (
    <div className="max-w-[1080px] mx-auto px-[20px] mt-[52px] font-inter">
      <Dialog>
        {movies?.id && (
          <div>
            <div className="mt-8 mb-4 px-5 flex justify-between lg:mt-[52px] lg:mb-6 lg:px-0">
              <div className="space-y-1">
                <h1 className="break-words text-2xl font-bold w-52 lg:w-fit lg:text-4xl">
                  {movies.title}
                </h1>
                <h4 className="text-sm lg:text-lg">
                  {movies.release_date}
                  &nbsp;
                  {movies.adult && (
                    <span className="font-medium lg:text-lg">· PG ·</span>
                  )}
                  &nbsp;{formatRuntime(movies.runtime)}
                </h4>
              </div>
              <div className="text-xs">
                <h5 className="hidden lg:block">Rating</h5>
                <div className="flex items-center gap-x-1">
                  <Star className="fill-[#fde047] w-[28px] h-[28px] stroke-[#fde047]" />
                  <div>
                    <p className="font-inter text-foreground text-sm">
                      {movies?.vote_average.toFixed(1)}
                      <span className="text-[#71717A] text-muted-foreground text-xs">
                        /10
                      </span>
                    </p>
                    <span>{movies.vote_count}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-x-8 mb-8">
              <div className="overflow-hidden relative hidden lg:block w-[290px] h-[428px] rounded">
                <span className="box-border block overflow-hidden w-auto h-auto border-0 m-0 p-0 absolute inset-0">
                  <Image
                    src={`https://image.tmdb.org/t/p/original${movies.poster_path}`}
                    alt={movies.title}
                    layout="fill"
                    onClick={() => push(`/detail/${movies.id}`)}
                    className="absolute inset-0 box-border p-0 border-none m-auto block w-0 h-0 min-w-full max-w-full min-h-full max-h-full object-cover"
                  />
                </span>
              </div>
              <div className="relative ">
                <div className="absolute inset-0 z-10 bg-black/40 w-[375px] lg:w-[760px] h-[211px] lg:h-[428px] lg:rounded "></div>
                <div className="relative overflow-hidden w-[375px] lg:w-[760px] h-[211px] lg:h-[428px] lg:rounded z-0">
                  <span className="box-border block overflow-hidden w-auto h-auto border-0 m-0 p-0 absolute inset-0">
                    <Image
                      src={`https://image.tmdb.org/t/p/original${movies.backdrop_path}`}
                      alt={movies.title}
                      layout="fill"
                      onClick={() => push(`/detail/${movies.id}`)}
                      className="absolute inset-0 z-10 transition-all duration-300 group-hover:bg-primary/30"
                    />
                  </span>
                </div>
                <DialogTrigger asChild>
                  <Button
                    className="absolute left-6 bottom-6 z-20 inline-flex items-center bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 justify-center gap-2 h-9 px-4 py-2 mt-4"
                    onClick={() => fetchTrailer(movies.id)}
                  >
                    <Play />
                    Watch Trailer
                  </Button>
                </DialogTrigger>
              </div>
            </div>
          </div>
        )}
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
      <div className="px-5 lg:px-0">
          <div className="flex gap-x-[34px] lg:block" >
            <div className="flex flex-wrap gap-3">
              <div>Genres here</div>
              <p>
              {directorDetail?.crew[5].name}
              </p>
            </div>
            <div className="text-base">

            </div>
          </div>
          <div className="space-y-5 text-foreground mb-8" ></div>
          <div className="pb-8 lg:pb-[112.62px]" ></div>
      </div>
    </div>
  );
}
