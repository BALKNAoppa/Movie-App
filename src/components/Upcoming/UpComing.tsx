import * as React from "react";
import { useEffect, useState } from "react";
import { getMovieData } from "@/utils/getMovies";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function UpComing() {
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
      const movieList = await getMovieData("upcoming");
      console.log("ALL RESPONCES FOR UPCOMING", movieList);
      setMovies(movieList.results);
    };
    dataFunction();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-foreground text-2xl font-semibold">Upcoming</h3>
        <a className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary underline-offset-4 hover:underline h-9 px-4 py-2">
          See more
          <ArrowRight />
        </a>
      </div>
      <div className="mt-8 px-4 flex flex-wrap">
        {movies.map((movie) => (
          <div key={movie.id} className="flex flex-wrap gap-5 lg:gap-8">
            <a className="group w-[157.5px] overflow-hidden rounded-lg bg-secondary space-y-1 lg:w-[230px]" href="">
              <div className="overflow-hidden relative w-[157.5px] h-[234px] lg:w-[230px] lg:h-[340px]">
                <Image
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.title}
                  layout="fill"
                  className="position:absolute;top:0;left:0;bottom:0;right:0;box-sizing:border-box;padding:0;border:none;margin:auto;display:block;width:0;height:0;min-width:100%;max-width:100%;min-height:100%;max-height:100%;object-fit:cover"
                />
              </div>
              <div></div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
