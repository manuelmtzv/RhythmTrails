"use server";

import { cookies } from "next/headers";

export async function retriveAuthError() {
  const error = cookies().get("spotify_auth_error");

  return error;
}
