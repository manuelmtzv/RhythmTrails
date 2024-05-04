import { spotifyApi } from "@/api/spotify.api";
import { getCookies } from "@/app/utils/spotifyAuthCookies";
import { MeResponse } from "@/types/spotify/user";

export async function me() {
  const { access_token } = (await getCookies()) || {};

  if (!access_token) {
    return null;
  }

  const response = await spotifyApi.get<MeResponse>("/me", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return response.data;
}
