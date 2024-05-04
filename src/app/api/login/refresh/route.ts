import { setCookies } from "@/app/utils/spotifyAuthCookies";
import moment from "moment";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const refresh_token = request.cookies.get("spotify_refresh_token")?.value;

  if (!refresh_token) {
    return Response.json({
      status: 401,
      body: "Unauthorized",
    });
  }

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      )}`,
    },
  });

  const {
    access_token,
    refresh_token: new_refresh_token,
    expires_in,
  } = await res.json();

  const expires_at = moment().add(expires_in, "seconds").toISOString();

  setCookies(access_token, new_refresh_token, expires_at);

  return Response.json({
    status: 200,
    body: "OK",
  });
}
