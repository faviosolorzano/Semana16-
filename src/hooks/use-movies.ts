import { useQuery } from "@tanstack/react-query";

import { tmdbService } from "@/services/tmdb.service";

export const movieKeys = {
  all: ["movies"] as const,
  popular: (page: number) => [...movieKeys.all, "popular", page] as const,
  nowPlaying: (page: number) => [...movieKeys.all, "now_playing", page] as const,
  topRated: (page: number) => [...movieKeys.all, "top_rated", page] as const,
  detail: (id: number) => [...movieKeys.all, "detail", id] as const,
  credits: (id: number) => [...movieKeys.all, "credits", id] as const,
  videos: (id: number) => [...movieKeys.all, "videos", id] as const,
  search: (query: string, page: number) => [...movieKeys.all, "search", query, page] as const,
  genres: () => [...movieKeys.all, "genres"] as const,
};

export function usePopularMovies(page = 1) {
  return useQuery({
    queryKey: movieKeys.popular(page),
    queryFn: () => tmdbService.getPopularMovies(page),
  });
}

export function useNowPlayingMovies(page = 1) {
  return useQuery({
    queryKey: movieKeys.nowPlaying(page),
    queryFn: () => tmdbService.getNowPlayingMovies(page),
  });
}

export function useTopRatedMovies(page = 1) {
  return useQuery({
    queryKey: movieKeys.topRated(page),
    queryFn: () => tmdbService.getTopRatedMovies(page),
  });
}

export function useMovieDetail(movieId: number) {
  return useQuery({
    queryKey: movieKeys.detail(movieId),
    queryFn: () => tmdbService.getMovieDetail(movieId),
    enabled: !!movieId,
  });
}

export function useMovieCredits(movieId: number) {
  return useQuery({
    queryKey: movieKeys.credits(movieId),
    queryFn: () => tmdbService.getMovieCredits(movieId),
    enabled: !!movieId,
  });
}

export function useMovieVideos(movieId: number) {
  return useQuery({
    queryKey: movieKeys.videos(movieId),
    queryFn: () => tmdbService.getMovieVideos(movieId),
    enabled: !!movieId,
  });
}

export function useSearchMovies(query: string, page = 1) {
  return useQuery({
    queryKey: movieKeys.search(query, page),
    queryFn: () => tmdbService.searchMovies(query, page),
    enabled: query.trim().length > 0,
  });
}

export function useGenres() {
  return useQuery({
    queryKey: movieKeys.genres(),
    queryFn: () => tmdbService.getGenres(),
    staleTime: Infinity,
  });
}
