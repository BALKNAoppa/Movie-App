import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Card } from "../ui/card";
import { getMovieData } from "@/utils/getMovies";
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
      const movieList = await getMovieData("up_coming");
      console.log("ALL RESPONCES", movieList);
      setMovies(movieList.results);
    };
    dataFunction();
  }, []);
  return (
    <div className="flex justify-center">
      <Card/>
    </div>
  );
}
