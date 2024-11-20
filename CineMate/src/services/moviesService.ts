import type { Movie, MovieResponse, MovieDetails, MovieDetailsResponse } from '../types/Movie'

const API_KEY = import.meta.env.VITE_OMDB_API_KEY
const BASE_URL = import.meta.env.VITE_OMDB_BASE_URL


export const fetchMovies = async (query: string | null): Promise<Movie[]> => {
  const searchParam = query?.trim() || 'popular'

  const response = await fetch(`${BASE_URL}?s=${searchParam}&apikey=${API_KEY}`)
  const data: MovieResponse = await response.json()

  if (data.Search && Array.isArray(data.Search)) {
    return data.Search
  } else {
    throw new Error(query ? 'No movies found!' : 'No movies available!')
  }
}


export const fetchMovieDetails = async (id: string): Promise<MovieDetails> => {
  const response = await fetch(`${BASE_URL}?i=${id}&apikey=${API_KEY}`)
  const data: MovieDetailsResponse = await response.json()

  if (data && data.Title) {
    return data
  } else {
    throw new Error('Movie not found!')
  }
}
