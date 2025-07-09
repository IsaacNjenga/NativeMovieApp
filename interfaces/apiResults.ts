export interface Results {
  results: Result[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface Result {
  id: number;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  media_type: string;
  first_air_date: string;
  name: string;
}

export enum MediaType {
  Movie = 'movie',
  Tv = 'tv',
}
