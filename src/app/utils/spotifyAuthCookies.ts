import { cookies } from "next/headers";

type SetCookies = (
  access_token: string,
  refresh_token: string,
  expires_in: string
) => void;

export const setCookies: SetCookies = function (
  access_token,
  refresh_token,
  expires_in
) {
  cookies().set("spotify_access_token", access_token, {
    httpOnly: true,
  });

  cookies().set("spotify_refresh_token", refresh_token, {
    httpOnly: true,
  });

  cookies().set("spotify_token_expires", String(expires_in), {
    httpOnly: true,
  });
};

export function clearCookies() {
  cookies().delete("spotify_access_token");
  cookies().delete("spotify_refresh_token");
  cookies().delete("spotify_token_expires");
}
