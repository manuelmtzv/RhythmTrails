import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <h1 className="text-4xl font-bold">Welcome to Rythm Trails!</h1>
      <Link href="/api/login">Log in with Spotify</Link>
    </main>
  );
}
