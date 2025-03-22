import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN;

const headers = {
  Authorization: "Bearer " + TMDB_TOKEN,
};

interface Params {
  [key: string]: string | number | boolean;
}

interface ApiResponse {
  [key: string]: any;
}

export const fetchDataFromApi = async (
  url: string,
  params: Params
): Promise<ApiResponse> => {
  try {
    const { data } = await axios.get(BASE_URL + url, { headers, params });
    return data;
  } catch (error) {
    console.log(error);
    return { error: (error as any).message };
  }
};
