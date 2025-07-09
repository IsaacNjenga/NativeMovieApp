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

export const discoverList = async () //   mediaType: MediaType.Movie,
//   page: number = 1
: Promise<Results> => {
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

    const json = response.json();
    return json;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
