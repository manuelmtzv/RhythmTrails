import { retriveAuthError } from "@/actions/spotify/auth.actions";
import { getAuthError } from "@/actions/spotify/errors.actions";
import Container from "@/components/base/Container";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SpotifyAuthErrorPage() {
  const { error } = await getAuthError();

  if (!error) {
    redirect("/");
  }

  return (
    <Container>
      <div className="flex flex-col gap-6 mt-6 md:mt-8 max-w-2xl p-8 mx-auto bg-slate-500 text-center">
        <h1 className="text-3xl font-bold">
          There was an error while trying to login with your{" "}
          <span className="underline">Spotify Account</span>
        </h1>
        <p className="text-lg">
          Please try again. If the problem persists, please contact us.
        </p>

        <Link
          className="text-center mx-auto px-3 py-2 bg-slate-200 text-black hover:bg-slate-300 transition-colors duration-300 ease-in-out"
          href="/"
        >
          Return to home
        </Link>

        <p className="font-bold">
          Server error:{" "}
          <span className="font-normal underline underline-offset-4">
            {error}
          </span>
        </p>
      </div>
    </Container>
  );
}
