"use client";

import { useParams } from "next/navigation";
import { getMovieDetail } from "@/utils/getMovieDetail";
import { getTraillerData } from "@/utils/geTraillerData";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";


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
    runtime: number;
  };

  const [movies, setMovies] = useState<Movie>();
  const [trailerDetails, setTrailerDetails] = useState(null);
  const { id } = useParams();
  
  const dataFunction = async () => {
    const movieList = await getMovieDetail(Number(id));
    console.log("ALL RESPONSES FOR DETAILS", movieList.id);
    setMovies(movieList);
  };

  const TrailerDataFunction = async () => {
    const trailerDetails = await getTraillerData(Number(id));
    console.log("ALL RESPONSES FOR TRAILER", trailerDetails);
    setTrailerDetails(trailerDetails);
  };
  
  useEffect(() => {
    TrailerDataFunction();
    dataFunction();
  }, [id]);


  function formatRuntime(runtime: number): string {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  }

  return (
    <div className="max-w-[1080px] mx-auto px-[20px] mt-[52px] font-inter">
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
            <div className="overflow-hidden relative hidden lg:block w-[290px] h-[428px] rounded"></div>
            <div className="relative">
              <iframe
              width={500}
              height={250}
              ></iframe>
            </div>
          </div>
          <div></div>
        </div>
      )}
    </div>
  );
}
