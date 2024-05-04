import { getCookies } from "@/app/utils/spotifyAuthCookies";

export async function me() {
  const { access_token } = (await getCookies()) || {};

  if (!access_token) {
    return null;
  }

  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return response.json();
}
