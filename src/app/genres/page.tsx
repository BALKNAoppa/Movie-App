"use client";

import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMovieGenres } from "@/utils/getMovieGenres";
import { Badge } from "@/components/ui/badge";
import { getMovieGenreDetails } from "@/utils/getMovieGenreDetails";

type GenresType = {
  id: number;
  name: string;
};
type Movie = {
  original_title: string;
};

const Genres = () => {
  const [genres, setGenres] = useState<GenresType[]>([]);
  const [selectedGenreIds, setSelectedGenreIds] = useState<string[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const { push } = useRouter();

  const fetchGenres = async () => {
    const genreList = await getMovieGenres();
    setGenres(genreList.genres);
  };

  const fetchMoviesByGenres = async () => {
    if (selectedGenreIds.length === 0) return;
    const genreId = Number(selectedGenreIds[0]);
    const moviesByGenres = await getMovieGenreDetails(genreId, 1);
    setMovies(moviesByGenres.results);
  };
  useEffect(() => {
    fetchGenres();
    fetchMoviesByGenres();
  }, []);

  const handleGenresSelection = (genresId: string) => () => {
    const updatedGenres: string[] = selectedGenreIds.includes(genresId)
      ? selectedGenreIds.filter((item: string) => item !== genresId)
      : [...selectedGenreIds, genresId];

    setSelectedGenreIds(updatedGenres);

    const queryParams = new URLSearchParams();
    queryParams.set("genreId", updatedGenres.join(","));
    const newPath = queryParams.toString();
    push(`/genres?${newPath}`);
  };

  return (
    <div className="w-full grid grid-cols-3 gap-2 h-screen">
      <div className="col-span-1 space-x-2">
        {genres?.length > 0 &&
          genres.map((item) => {
            const genreId = item.id.toString();
            const isSelected = selectedGenreIds.includes(genreId);
            return (
              <Badge
                onClick={handleGenresSelection(genreId)}
                variant="outline"
                key={item.id}
                className={`${
                  isSelected
                    ? "bg-black text-white focus:outline-2 focus:outline-offset-2 dark:bg-white dark:text-black"
                    : ""
                } rounded-full cursor-pointer`}
              >
                {item.name}
              </Badge>
            );
          })}
      </div>
      <Separator orientation="vertical" />
      <div className="col-span-2">
        Movies:
        {movies.map((m, i) => (
          <p key={i}>{m.original_title}</p>
        ))}
      </div>
    </div>
  );
};

export default Genres;
