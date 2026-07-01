import { Star } from "lucide-react";
import { Link } from "react-router-dom";

import { tmdbImage } from "@/lib/tmdb-image";
import type { TMDBMovie } from "@/types/tmdb";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  movie: TMDBMovie;
  genreMap?: Record<number, string>;
}

const MovieCard = ({ movie, genreMap = {} }: Props) => {
  const posterUrl = tmdbImage.poster(movie.poster_path, "w342");
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : null;
  const primaryGenre = movie.genre_ids[0] ? genreMap[movie.genre_ids[0]] : null;

  return (
    <article>
      <Link to={`/movies/${movie.id}`} className="group block">
        <Card className="overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
          <div className="relative aspect-[2/3] w-full overflow-hidden bg-muted">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={movie.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                Sin imagen
              </div>
            )}

            <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs font-semibold text-yellow-400">
              <Star className="h-3 w-3 fill-yellow-400" />
              {movie.vote_average.toFixed(1)}
            </div>
          </div>

          <CardHeader className="gap-2 pb-2">
            {primaryGenre && (
              <Badge variant="secondary" className="w-fit text-xs">
                {primaryGenre}
              </Badge>
            )}
            <CardTitle className="line-clamp-2 text-base leading-snug">
              {movie.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-0">
            <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
              {movie.overview}
            </p>
            {year && (
              <span className="text-xs text-muted-foreground">{year}</span>
            )}
          </CardContent>
        </Card>
      </Link>
    </article>
  );
};

export default MovieCard;
