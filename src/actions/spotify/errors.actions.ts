import { retriveAuthError } from "./auth.actions";

export async function getAuthError() {
  "use server";

  const error = (await retriveAuthError())?.value;

  return { error };
}
