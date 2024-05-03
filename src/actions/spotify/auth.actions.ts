"use server";

import { cookies } from "next/headers";

export async function retriveAuthError() {
  const error = cookies().get("spotify_auth_error");

  if (error) {
    cookies().delete("spotify_auth_error");
  }

  return error;
}
