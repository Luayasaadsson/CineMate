export interface Movie {
  imdbID: string
  title: string
  year: string
  genre: string
  plot: string
  poster: string
}

export interface MovieDetails extends Movie {
  genre: string
  plot: string
}

export interface TMDBMovie {
  id: string
  title: string
  genre: string
  plot: string
  release_date: string
  poster_path: string | null
}

export interface TMDBMovieResponse {
  results: TMDBMovie[]
  total_pages: number
  total_results: number
}

export interface TMDBMovieDetails {
  id: string
  title: string
  release_date: string
  poster_path: string | null
  genres: { name: string }[]
  overview: string
}
