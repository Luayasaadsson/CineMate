export interface Movie {
  imdbID: string
  Title: string
  Year: string
  Poster: string
}

export interface MovieDetails extends Movie {
  Genre: string
  Plot: string
}

export interface TMDBMovie {
  id: string
  title: string
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
