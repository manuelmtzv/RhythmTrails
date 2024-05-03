import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import queryString from "query-string";
import { AuthCallbackQuery } from "@/types/spotify/auth";
import { clearCookies, setCookies } from "@/app/utils/spotifyAuthCookies";

export async function GET(request: NextRequest) {
  const { query } = queryString.parseUrl(request.url);
  const { code, state, error } = query as AuthCallbackQuery;
  const errorPageUrl = new URL("/errors/spotify-auth-error", request.url);

  if (!error) {
    setSpotifyAuthError(
      "An error occurred during the authentication process. We recommend you to try again."
    );

    return NextResponse.redirect(errorPageUrl);
  }

  const stateCookie = cookies().get("spotify_auth_state");

  if (state !== stateCookie?.value) {
    setSpotifyAuthError(
      "There was a mismatch in the state parameter. We recommend you to try again."
    );

    return NextResponse.redirect(errorPageUrl);
  }

  cookies().delete("spotify_auth_state");

  const {
    access_token,
    refresh_token,
    expires_in,
    error: tokenError,
    error_description,
  } = await getAccessToken(code);

  if (tokenError) {
    setSpotifyAuthError(error_description);

    return NextResponse.redirect(errorPageUrl);
  }

  setCookies(access_token, refresh_token, expires_in);

  return NextResponse.redirect(new URL("/app", request.url));
}

async function getAccessToken(code: string) {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: queryString.stringify({
      code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
      grant_type: "authorization_code",
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(client_id + ":" + client_secret),
    },
  });

  return res.json();
}

function setSpotifyAuthError(errorMessage: string) {
  clearCookies();

  cookies().set("spotify_auth_error", errorMessage, {
    httpOnly: true,
  });
}
