import { NextRequest, NextResponse } from "next/server";
import { me } from "./actions/spotify/user.actions";
import { cookies } from "next/headers";
import { getCookies } from "./app/utils/spotifyAuthCookies";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const absolute = process.env.APP_ABSOLUTE_URL;

  if (!request.url.includes("/spotify-auth-error")) {
    response.cookies.delete("spotify_auth_error");
  }

  const { access_token, refresh_token } = await getCookies();

  if (request.url.includes("/app")) {
    if (!access_token) {
      return NextResponse.redirect(`${absolute}/api/login`);
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
