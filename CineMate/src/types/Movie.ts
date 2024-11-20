export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  [key: string]: string;
}

export interface MovieDetails extends Movie {
  Genre: string;
  Plot: string;
}

export interface MovieResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

export interface MovieDetailsResponse extends MovieDetails {
  Response: string;
}