import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import queryString from "query-string";

type AuthCallbackQuery = {
  code: string;
  state: string;
  error?: string;
};

export async function GET(request: NextRequest) {
  const { query } = queryString.parseUrl(request.url);
  const { code, state, error } = query as AuthCallbackQuery;

  if (error) {
    return Response.json({
      status: 400,
      body: {
        error,
      },
    });
  }

  const stateCookie = cookies().get("spotify_auth_state");

  if (state !== stateCookie?.value) {
    return Response.json({
      status: 400,
      body: {
        error: "Invalid state",
      },
    });
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
    return Response.json({
      status: 400,
      body: {
        error: tokenError,
        error_description,
      },
    });
  }

  cookies().set("spotify_access_token", access_token, {
    httpOnly: true,
  });

  cookies().set("spotify_refresh_token", refresh_token, {
    httpOnly: true,
  });

  cookies().set("spotify_token_expires", String(expires_in), {
    httpOnly: true,
  });

  return Response.json({
    status: 200,
    body: {
      access_token,
      refresh_token,
    },
  });
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
