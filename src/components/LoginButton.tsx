import Link from "next/link";

export default function LoginButton() {
  return (
    <Link className="bg-blue-500 hover:bg-blue-600 py-2 px-1" href="/api/login">
      Login
    </Link>
  );
}
