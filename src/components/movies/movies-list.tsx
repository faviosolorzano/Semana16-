import type { TMDBMovie } from "@/types/tmdb";

import { Skeleton } from "@/components/ui/skeleton";

import MovieCard from "./movie-card";

interface Props {
  movies: TMDBMovie[];
  genreMap?: Record<number, string>;
  isLoading?: boolean;
}

const MovieCard_Skeleton = () => (
  <div className="space-y-3">
    <Skeleton className="aspect-[2/3] w-full rounded-xl" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-3 w-1/2" />
  </div>
);

const MoviesList = ({ movies, genreMap = {}, isLoading = false }: Props) => {
  if (isLoading) {
    return (
      <section className="grid gap-6 pb-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <MovieCard_Skeleton key={i} />
        ))}
      </section>
    );
  }

  if (movies.length === 0) {
    return (
      <section className="rounded-lg border border-dashed py-16 text-center">
        <h2 className="text-xl font-semibold">No se encontraron películas</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Intenta con otro título o género.
        </p>
      </section>
    );
  }

  return (
    <section
      aria-label="Lista de películas"
      className="grid gap-6 pb-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} genreMap={genreMap} />
      ))}
    </section>
  );
};

export default MoviesList;
