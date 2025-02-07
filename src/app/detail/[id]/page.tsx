"use client";

import { useParams } from "next/navigation";
import { getMovieDetail } from "@/utils/getMovieDetail";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import Image from "next/image";

export default function Page() {
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

  const [movies, setMovies] = useState<Movie>();
  const { id } = useParams();
  useEffect(() => {
    const dataFunction = async () => {
      const movieList = await getMovieDetail(Number(id));
      console.log("ALL RESPONSES FOR DETAILS", movieList);
      console.log("ALL RESPONSES FOR DETAILS", movieList.id);
      setMovies(movieList);
    };
    dataFunction();
  }, [id]);

  return (
    <div className="max-w-[1440px] mx-auto px-[20px] mt-[52px] font-inter">
      <div className="space-y-8">
        <div className="mt-8 px-4 flex flex-wrap gap-5 lg:gap-8">
          {movies?.id && (
            <div>
              <div className="mt-8 mb-4 px-5 flex justify-between lg:mt-[52px] lg:mb-6 lg:px-0">
                <div className="space-y-1">
                  <h1 className="break-words text-2xl font-bold w-52 lg:w-fit lg:text-4xl">
                    {movies.title}
                  </h1>
                  <h4 className="text-sm lg:text-lg">
                    {movies.release_date}
                    {movies.adult && (
                      <span className="text-red-600 text-sm font-semibold">PG</span>
                    )}
                  </h4>
                </div>
                <div className="text-xs"></div>
              </div>
              <div></div>
              <div></div>
            </div>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
}
