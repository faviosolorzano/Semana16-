import { useMemo, useState } from "react";

import { useGenres, usePopularMovies, useSearchMovies } from "@/hooks/use-movies";

import PageContainer from "@/components/layout/page-container";
import MoviesList from "@/components/movies/movies-list";
import MoviesPageHeader from "@/components/movies/movies-page-header";
import MoviesSearch from "@/components/movies/movies-search";

const MoviesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);

  const isSearching = searchTerm.trim().length > 0;

  const { data: popularData, isLoading: isLoadingPopular } = usePopularMovies();
  const { data: searchData, isLoading: isLoadingSearch } = useSearchMovies(searchTerm);
  const { data: genresData } = useGenres();

  const isLoading = isSearching ? isLoadingSearch : isLoadingPopular;

  const genreMap: Record<number, string> = {};
  genresData?.genres.forEach((g) => {
    genreMap[g.id] = g.name;
  });

  const allMovies = useMemo(() => {
    const source = isSearching
      ? (searchData?.results ?? [])
      : (popularData?.results ?? []);

    if (!selectedGenreId) return source;

    return source.filter((movie) => movie.genre_ids.includes(selectedGenreId));
  }, [isSearching, searchData, popularData, selectedGenreId]);

  return (
    <PageContainer>
      <MoviesPageHeader />

      <MoviesSearch
        genres={genresData?.genres ?? []}
        resultsCount={allMovies.length}
        searchTerm={searchTerm}
        selectedGenreId={selectedGenreId}
        onGenreChange={setSelectedGenreId}
        onSearchTermChange={setSearchTerm}
      />

      <MoviesList movies={allMovies} genreMap={genreMap} isLoading={isLoading} />
    </PageContainer>
  );
};

export default MoviesPage;
