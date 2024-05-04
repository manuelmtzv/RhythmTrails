import axios from "axios";
import camelcaseKeys from "camelcase-keys";

export const spotifyApi = axios.create({
  baseURL: "https://api.spotify.com/v1",
});

spotifyApi.interceptors.response.use((response) => {
  const transformedData = camelcaseKeys(response.data, { deep: true });

  return {
    ...response,
    data: transformedData,
  };
});
