import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { v4 as uuid } from "uuid";

export async function GET(request: NextRequest) {
  const state = uuid();
  const scope = "user-read-private user-read-email";

  const queryString = new URLSearchParams({
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID ?? "",
    scope,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI ?? "",
    state,
  });

  cookies().set("spotify_auth_state", state, {
    httpOnly: true,
  });

  return Response.redirect(
    `https://accounts.spotify.com/authorize?${queryString.toString()}`
  );
}
