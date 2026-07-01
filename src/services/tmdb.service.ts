import { httpClient } from "./http-client";
import type {
  TMDBCredits,
  TMDBGenresResponse,
  TMDBMovie,
  TMDBMovieDetail,
  TMDBPagedResponse,
  TMDBVideosResponse,
} from "@/types/tmdb";

export const tmdbService = {
  getPopularMovies: (page = 1) =>
    httpClient
      .get<TMDBPagedResponse<TMDBMovie>>("/movie/popular", { params: { page } })
      .then((r) => r.data),

  getNowPlayingMovies: (page = 1) =>
    httpClient
      .get<TMDBPagedResponse<TMDBMovie>>("/movie/now_playing", { params: { page } })
      .then((r) => r.data),

  getTopRatedMovies: (page = 1) =>
    httpClient
      .get<TMDBPagedResponse<TMDBMovie>>("/movie/top_rated", { params: { page } })
      .then((r) => r.data),

  getMovieDetail: (movieId: number) =>
    httpClient
      .get<TMDBMovieDetail>(`/movie/${movieId}`)
      .then((r) => r.data),

  getMovieCredits: (movieId: number) =>
    httpClient
      .get<TMDBCredits>(`/movie/${movieId}/credits`)
      .then((r) => r.data),

  getMovieVideos: (movieId: number) =>
    httpClient
      .get<TMDBVideosResponse>(`/movie/${movieId}/videos`)
      .then((r) => r.data),

  searchMovies: (query: string, page = 1) =>
    httpClient
      .get<TMDBPagedResponse<TMDBMovie>>("/search/movie", {
        params: { query, page },
      })
      .then((r) => r.data),

  getGenres: () =>
    httpClient
      .get<TMDBGenresResponse>("/genre/movie/list")
      .then((r) => r.data),
};
