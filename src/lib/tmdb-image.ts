const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

export const tmdbImage = {
  poster: (path: string | null, size: "w185" | "w342" | "w500" | "w780" | "original" = "w500") =>
    path ? `${IMAGE_BASE_URL}/${size}${path}` : null,

  backdrop: (path: string | null, size: "w300" | "w780" | "w1280" | "original" = "w1280") =>
    path ? `${IMAGE_BASE_URL}/${size}${path}` : null,

  profile: (path: string | null, size: "w45" | "w185" | "h632" | "original" = "w185") =>
    path ? `${IMAGE_BASE_URL}/${size}${path}` : null,
};
