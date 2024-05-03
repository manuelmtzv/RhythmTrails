import { retriveAuthError } from "@/actions/spotify/auth.actions";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SpotifyAuthErrorPage() {
  const error = (await retriveAuthError())?.value;

  if (!error) {
    redirect("/");
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">
        There was an error while trying to login with your Spotify Account
      </h1>
      <p className="text-lg">
        Please try again. If the problem persists, please contact us.
      </p>

      <Link href="/">Return to home</Link>

      <span>Server error: {error}</span>
    </main>
  );
}
