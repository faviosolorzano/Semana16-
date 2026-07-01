import { Play } from "lucide-react";
import { Link } from "react-router-dom";

import { useNowPlayingMovies } from "@/hooks/use-movies";
import { tmdbImage } from "@/lib/tmdb-image";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const HeroSection = () => {
  const { data, isLoading } = useNowPlayingMovies();
  const featured = data?.results[0];
  const backdropUrl = tmdbImage.backdrop(featured?.backdrop_path ?? null, "original");

  return (
    <section className="relative -mx-6 overflow-hidden rounded-2xl">
      <div className="relative min-h-[520px] w-full">
        {isLoading ? (
          <Skeleton className="absolute inset-0 h-full w-full rounded-2xl" />
        ) : (
          <>
            {backdropUrl && (
              <img
                src={backdropUrl}
                alt={featured?.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </>
        )}

        <div className="relative z-10 flex h-full min-h-[520px] flex-col justify-end p-8 md:p-12">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-6 w-32 bg-white/20" />
              <Skeleton className="h-12 w-3/4 bg-white/20" />
              <Skeleton className="h-4 w-2/4 bg-white/20" />
            </div>
          ) : (
            <div className="max-w-xl">
              <span className="inline-block rounded-full bg-blue-600/90 px-3 py-1 text-xs font-semibold text-white">
                En cartelera ahora
              </span>

              <h1 className="mt-4 text-4xl font-bold text-white drop-shadow-md md:text-5xl">
                {featured?.title}
              </h1>

              <p className="mt-3 line-clamp-2 text-base text-white/80">
                {featured?.overview}
              </p>

              <div className="mt-6 flex items-center gap-3">
                {featured && (
                  <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                    <Link to={`/movies/${featured.id}`}>
                      <Play className="mr-2 h-4 w-4 fill-white" />
                      Ver detalles
                    </Link>
                  </Button>
                )}
                <Button asChild variant="outline" size="lg" className="border-white/40 bg-white/10 text-white hover:bg-white/20">
                  <Link to="/movies">Explorar todo</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
