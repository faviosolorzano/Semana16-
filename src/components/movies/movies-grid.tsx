import { useGenres, usePopularMovies } from "@/hooks/use-movies";

import { Skeleton } from "@/components/ui/skeleton";

import MovieCard from "./movie-card";

const MovieCard_Skeleton = () => (
  <div className="space-y-3">
    <Skeleton className="aspect-[2/3] w-full rounded-xl" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-3 w-1/2" />
  </div>
);

const MoviesGrid = () => {
  const { data: moviesData, isLoading, isError } = usePopularMovies();
  const { data: genresData } = useGenres();

  const genreMap: Record<number, string> = {};
  genresData?.genres.forEach((g) => {
    genreMap[g.id] = g.name;
  });

  if (isError) {
    return (
      <section className="py-4">
        <div className="rounded-lg border border-dashed py-16 text-center">
          <p className="text-muted-foreground">
            No se pudo cargar las películas. Verifica tu API key de TMDB.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4">
      <header className="mb-8">
        <h2 className="text-3xl font-bold">Películas Populares</h2>
        <p className="mt-2 text-muted-foreground">
          Los estrenos más populares del momento.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <MovieCard_Skeleton key={i} />)
          : moviesData?.results.slice(0, 8).map((movie) => (
              <MovieCard key={movie.id} movie={movie} genreMap={genreMap} />
            ))}
      </div>
    </section>
  );
};

export default MoviesGrid;
