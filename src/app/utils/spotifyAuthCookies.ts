import { cookies } from "next/headers";
import moment from "moment";

type SetCookies = (
  access_token: string,
  refresh_token: string,
  expires_at: string
) => void;

export const setCookies: SetCookies = function (
  access_token,
  refresh_token,
  expires_at
) {
  cookies().set("spotify_access_token", access_token, {
    httpOnly: true,
  });

  cookies().set("spotify_refresh_token", refresh_token, {
    httpOnly: true,
  });

  cookies().set("spotify_token_expires", String(expires_at), {
    httpOnly: true,
  });
};

export async function getCookies() {
  const refreshToken = cookies().get("spotify_refresh_token")?.value;

  let result: {
    access_token: string | undefined;
    refresh_token: string | undefined;
    expires_at: string | undefined;
  } = {
    access_token: undefined,
    refresh_token: undefined,
    expires_at: undefined,
  };

  if (!refreshToken) {
    return result;
  }

  if (moment().isAfter(cookies().get("spotify_token_expires")?.value)) {
    const result = await fetch("http://localhost:3000/api/login/refresh");
  }

  result = {
    access_token: cookies().get("spotify_access_token")?.value,
    refresh_token: cookies().get("spotify_refresh_token")?.value,
    expires_at: cookies().get("spotify_token_expires")?.value,
  };

  return result;
}

export function clearCookies() {
  cookies().delete("spotify_access_token");
  cookies().delete("spotify_refresh_token");
  cookies().delete("spotify_token_expires");
}
