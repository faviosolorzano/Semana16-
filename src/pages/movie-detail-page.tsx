import { ArrowLeft, Clock, ShoppingCart, Star, TrendingUp } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { useMovieCredits, useMovieDetail, useMovieVideos } from "@/hooks/use-movies";
import { tmdbImage } from "@/lib/tmdb-image";
import { useCartStore } from "@/store/cart.store";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const id = Number(movieId);

  const { data: movie, isLoading, isError } = useMovieDetail(id);
  const { data: credits } = useMovieCredits(id);
  const { data: videosData } = useMovieVideos(id);

  const addToCart = useCartStore((s) => s.addItem);
  const cartItems = useCartStore((s) => s.items);
  const isInCart = cartItems.some((item) => item.id === id);

  const backdropUrl = tmdbImage.backdrop(movie?.backdrop_path ?? null, "original");
  const posterUrl = tmdbImage.poster(movie?.poster_path ?? null, "w500");

  const trailer =
    videosData?.results.find((v) => v.type === "Trailer" && v.site === "YouTube" && v.official) ??
    videosData?.results.find((v) => v.type === "Trailer" && v.site === "YouTube");

  const director = credits?.crew.find((c) => c.job === "Director");
  const topCast = credits?.cast.slice(0, 6) ?? [];

  const formatRuntime = (minutes: number | null | undefined) => {
    if (!minutes) return null;
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  };

  if (isError) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold">Película no encontrada</h1>
        <p className="mt-2 text-muted-foreground">No pudimos cargar esta película.</p>
        <Button asChild className="mt-6">
          <Link to="/movies">Volver al catálogo</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* ── HERO ── backdrop + poster + info todo dentro, sin clipping */}
      <div className="relative w-full">

        {/* Imagen de fondo */}
        {isLoading ? (
          <Skeleton className="h-[55vh] min-h-[420px] w-full lg:h-[70vh]" />
        ) : (
          <div className="relative h-[55vh] min-h-[420px] lg:h-[70vh]">
            {backdropUrl && (
              <img
                src={backdropUrl}
                alt={movie?.title}
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            )}
            {/* gradiente izquierda → oscuro */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/10" />
            {/* gradiente abajo → fondo de página */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

            {/* Contenido sobre el backdrop */}
            <div className="absolute inset-0 flex flex-col justify-end">
              <div className="mx-auto w-full max-w-7xl px-6 pb-10">
                {/* Back link */}
                <Link
                  to="/movies"
                  className="mb-6 inline-flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Volver al catálogo
                </Link>

                <div className="flex items-end gap-6">
                  {/* Poster dentro del backdrop — nunca se corta */}
                  <div className="hidden shrink-0 md:block w-44 lg:w-56">
                    <img
                      src={posterUrl ?? ""}
                      alt={movie?.title}
                      className="w-full rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] ring-1 ring-white/20"
                    />
                  </div>

                  {/* Info */}
                  <div className="min-w-0">
                    {movie?.tagline && (
                      <p className="text-sm italic text-white/60">{movie.tagline}</p>
                    )}

                    <h1 className="mt-1 text-3xl font-bold text-white drop-shadow-md md:text-4xl lg:text-5xl">
                      {movie?.title}
                    </h1>

                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="h-4 w-4 fill-yellow-400" />
                        <span className="font-bold">{movie?.vote_average.toFixed(1)}</span>
                        <span className="text-xs text-white/60">
                          ({movie?.vote_count.toLocaleString()} votos)
                        </span>
                      </div>

                      {movie?.runtime && (
                        <div className="flex items-center gap-1 text-white/70">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">{formatRuntime(movie.runtime)}</span>
                        </div>
                      )}

                      {movie?.release_date && (
                        <span className="text-sm text-white/70">
                          {new Date(movie.release_date).getFullYear()}
                        </span>
                      )}

                      <div className="flex items-center gap-1 text-white/60">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-xs">{movie?.popularity.toFixed(0)}</span>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {movie?.genres.map((g) => (
                        <Badge
                          key={g.id}
                          variant="secondary"
                          className="border-white/20 bg-white/15 text-white backdrop-blur-sm"
                        >
                          {g.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── CONTENIDO DEBAJO DEL HERO ── */}
      <div className="mx-auto max-w-7xl px-6 pb-16">

        {/* Poster en móvil — visible solo en pantallas pequeñas */}
        <div className="mb-6 flex gap-5 md:hidden">
          {posterUrl && (
            <div className="-mt-16 w-28 shrink-0">
              <img
                src={posterUrl}
                alt={movie?.title}
                className="w-full rounded-xl shadow-2xl ring-1 ring-border"
              />
            </div>
          )}
          <div className="pt-2">
            {movie?.tagline && (
              <p className="text-xs italic text-muted-foreground">{movie.tagline}</p>
            )}
            <h1 className="text-2xl font-bold leading-tight">{movie?.title}</h1>
          </div>
        </div>

        {/* Sinopsis + CTA */}
        <div className="grid gap-10 md:grid-cols-[1fr_320px]">
          <div>
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            ) : (
              <>
                <h2 className="mb-3 text-lg font-semibold">Sinopsis</h2>
                <p className="leading-relaxed text-muted-foreground">{movie?.overview}</p>
                {director && (
                  <p className="mt-4 text-sm">
                    <span className="font-medium">Director:</span>{" "}
                    <span className="text-muted-foreground">{director.name}</span>
                  </p>
                )}
              </>
            )}
          </div>

          {/* CTA card */}
          <div className="h-fit rounded-2xl border bg-card p-6 shadow-sm">
            <p className="text-2xl font-bold">S/ 29.90</p>
            <p className="mt-1 text-sm text-muted-foreground">Entrada digital · acceso inmediato</p>

            <Button
              size="lg"
              onClick={() =>
                movie &&
                !isInCart &&
                addToCart({
                  id: movie.id,
                  title: movie.title,
                  poster_path: movie.poster_path,
                  price: 29.90,
                })
              }
              disabled={isInCart}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {isInCart ? "Ya está en tu carrito" : "Comprar entrada"}
            </Button>

            {isInCart && (
              <Button asChild variant="outline" size="sm" className="mt-2 w-full">
                <Link to="/cart">Ver carrito</Link>
              </Button>
            )}

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Pago 100% seguro · Sin comisiones
            </p>
          </div>
        </div>

        {/* Tráiler */}
        {trailer && (
          <>
            <Separator className="my-10" />
            <section>
              <h2 className="mb-4 text-2xl font-bold">Tráiler oficial</h2>
              <div className="aspect-video w-full overflow-hidden rounded-2xl shadow-lg">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={trailer.name}
                  className="h-full w-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            </section>
          </>
        )}

        {/* Reparto */}
        {topCast.length > 0 && (
          <>
            <Separator className="my-10" />
            <section>
              <h2 className="mb-6 text-2xl font-bold">Reparto principal</h2>
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                {topCast.map((actor) => {
                  const profileUrl = tmdbImage.profile(actor.profile_path, "w185");
                  return (
                    <div key={actor.id} className="text-center">
                      <div className="mx-auto h-20 w-20 overflow-hidden rounded-full bg-muted ring-2 ring-border">
                        {profileUrl ? (
                          <img
                            src={profileUrl}
                            alt={actor.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xl font-bold text-muted-foreground">
                            {actor.name[0]}
                          </div>
                        )}
                      </div>
                      <p className="mt-2 text-xs font-semibold leading-tight">{actor.name}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{actor.character}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
