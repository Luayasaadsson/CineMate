import type {
  Movie,
  MovieDetails,
  TMDBMovie,
  TMDBMovieResponse,
  TMDBMovieDetails,
} from '../types/Movie'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL

export const fetchMovies = async (
  query: string | null,
  page: number = 1,
): Promise<{ movies: Movie[]; totalPages: number }> => {
  const searchParam = query?.trim() || ''
  const endpoint = query
    ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchParam)}&page=${page}`
    : `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`

  const response = await fetch(endpoint)
  const data: TMDBMovieResponse = await response.json()

  if (data.results && Array.isArray(data.results)) {
    return {
      movies: data.results.map((movie: TMDBMovie) => ({
        imdbID: movie.id,
        Title: movie.title,
        Year: movie.release_date?.split('-')[0] || 'N/A',
        Poster: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : 'https://via.placeholder.com/500x750?text=No+Image',
      })),
      totalPages: data.total_pages,
    }
  } else {
    throw new Error(query ? 'No movies found!' : 'No movies available!')
  }
}

export const fetchMovieDetails = async (id: string): Promise<MovieDetails> => {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
  const data: TMDBMovieDetails = await response.json()

  if (data && data.title) {
    return {
      imdbID: data.id,
      Title: data.title,
      Year: data.release_date?.split('-')[0] || 'N/A',
      Poster: data.poster_path
        ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image',
      Genre: data.genres.map((genre) => genre.name).join(', '),
      Plot: data.overview || 'No plot available',
    }
  } else {
    throw new Error('Movie not found!')
  }
}
