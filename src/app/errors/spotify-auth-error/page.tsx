import { retriveAuthError } from "@/actions/spotify/auth.actions";
import { redirect } from "next/navigation";

export default async function SpotifyAuthErrorPage() {
  const error = (await retriveAuthError())?.value;

  if (!error) {
    redirect("/");
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Error</h1>
      <p>{error}</p>
    </main>
  );
}
