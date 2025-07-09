import { MediaType, Results } from '~/interfaces/apiResults';

const header = process.env.EXPO_PUBLIC_HEADER_KEY;

export const getList = async (): Promise<Results> => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/changes?page=1`, {
      headers: { accept: 'application/json', Authorization: `Bearer ${header}` },
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Failed to fetch list:', error);
    throw error;
  }
};

export const discoverMoviesList = async (): Promise<Results> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
      {
        headers: { accept: 'application/json', Authorization: `Bearer ${header}` },
      }
    );
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const discoverTVList = async (): Promise<Results> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc`,
      {
        headers: { accept: 'application/json', Authorization: `Bearer ${header}` },
      }
    );
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const searchList = async (query: string) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&page=1`,
      {
        headers: { accept: 'application/json', Authorization: `Bearer ${header}` },
      }
    );
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMovieDetails = async (id: number, mediaType: MediaType): Promise<any> => {
  // console.log('🚀 ~ getMovieDetails ~ mediaType:', mediaType);
  // console.log('🚀 ~ getMovieDetails ~ id:', id);
  try {
    const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}?language=en-US`, {
      headers: { accept: 'application/json', Authorization: `Bearer ${header}` },
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
