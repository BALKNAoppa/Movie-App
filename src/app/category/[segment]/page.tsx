"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import { getCategoryMovieData } from "@/utils/getCategoryMovies";

export default function Home() {
  const { segment } = useParams();

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
    if (typeof segment !== "string") return;

    getCategoryMovieData(segment).then((movieList) => {
      if (movieList?.results) setMovies(movieList.results);
    });
  }, [segment]);

  const formattedSegment =
      typeof segment === "string" ? segment.charAt(0).toUpperCase() + segment.slice(1) : "";

  return (
    <div className="w-full">
      <div className="max-w-[1440px] mx-auto px-[20px] mt-[52px] font-inter">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-foreground text-2xl font-semibold">
              {formattedSegment}
            </h3>
          </div>
          <div className="mt-8 px-4 flex flex-wrap gap-5 lg:gap-8">
            {movies?.map((movie) => (
              <div key={movie.id} className="flex flex-wrap rounded-md">
                <a
                  className="group w-[157.5px] overflow-hidden rounded-lg bg-secondary space-y-1 lg:w-[230px]"
                  href=""
                >
                  <div className="overflow-hidden relative w-[157.5px] h-[234px] lg:w-[230px] lg:h-[340px]">
                    <Image
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      alt={movie.title}
                      layout="fill"
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
    </div>
  );
}
