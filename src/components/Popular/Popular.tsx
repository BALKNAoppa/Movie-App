import * as React from "react";
import { useEffect, useState } from "react";
import { getMovieData } from "@/utils/getMovies";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

export function Popular() {
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
      const movieList = await getMovieData("popular");
      console.log("ALL RESPONCES FOR UPCOMING", movieList);
      setMovies(movieList.results);
    };
    dataFunction();
  }, []);
  const { push } = useRouter();

  return (
    <div className="max-w-[1440px] mx-auto px-[20px] mt-[52px] font-inter">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-foreground text-2xl font-semibold">Popular</h3>
          <a className="inline-flex items-center justify-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline h-9 px-4 py-2" href="/category/popular">
            See more
            <ArrowRight />
          </a>
        </div>
        <div className="mt-8 px-4 flex flex-wrap gap-5 lg:gap-8">
          {movies.slice(0, 10).map((movie) => (
            <div key={movie.id} className="flex flex-wrap rounded-md">
              <a
                className="group w-[157.5px] overflow-hidden rounded-lg bg-secondary space-y-1 lg:w-[230px]"
              >
                <div className="overflow-hidden relative w-[157.5px] h-[234px] lg:w-[230px] lg:h-[340px]">
                  <Image
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={movie.title}
                    layout="fill"
                    onClick={() => push("detail/${id}")}
                    className="absolute inset-0 box-border p-0 border-none m-auto block w-0 h-0 min-w-full max-w-full min-h-full max-h-full object-cover"
                  />
                </div>
                <div className="p-2">
                  <div className="flex flex-col items-start p-[8px] self-stretch mt-0">
                    <div className="flex items-center gap-x-1">
                      <Star className="fill-[#fde047] w-[16px] h-[16px] stroke-[#fde047]" />
                      <p className="font-inter text-[14px] font-medium leading-[20px]">
                        {movie.vote_average.toFixed(1)}
                        <span className="text-[#71717A] text-[14px] font-medium leading-[20px]">
                          /10
                        </span>
                      </p>
                    </div>
                    <p className="h-14 overflow-hidden text-ellipsis line-clamp-2 text-lg text-foreground">
                      {movie.title}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
