import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

interface Props {
  genres: { id: number; name: string }[];
  resultsCount: number;
  searchTerm: string;
  selectedGenreId: number | null;
  onGenreChange: (genreId: number | null) => void;
  onSearchTermChange: (searchTerm: string) => void;
}

const MoviesSearch = ({
  genres,
  resultsCount,
  searchTerm,
  selectedGenreId,
  onGenreChange,
  onSearchTermChange,
}: Props) => {
  return (
    <section aria-label="Filtros de películas" className="mb-8">
      <div className="grid gap-4 rounded-lg border bg-card p-4 md:grid-cols-[1fr_220px_auto] md:items-end">
        <div>
          <label htmlFor="movie-search" className="text-sm font-medium">
            Buscar por título
          </label>
          <div className="relative mt-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="movie-search"
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              placeholder="Buscar películas..."
              className="pl-9"
            />
          </div>
        </div>

        <div>
          <label htmlFor="movie-genre" className="text-sm font-medium">
            Género
          </label>
          <select
            id="movie-genre"
            value={selectedGenreId ?? "all"}
            onChange={(e) =>
              onGenreChange(e.target.value === "all" ? null : Number(e.target.value))
            }
            className="mt-2 h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <option value="all">Todos los géneros</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <p className="text-sm text-muted-foreground md:pb-2">
          {resultsCount} {resultsCount === 1 ? "película" : "películas"}
        </p>
      </div>
    </section>
  );
};

export default MoviesSearch;
