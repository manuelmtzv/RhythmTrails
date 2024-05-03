import Link from "next/link";
import { cn } from "@/app/utils/cn";

type LoginButtonProps = {
  className?: string;
};

export default function LoginButton({ className }: LoginButtonProps) {
  return (
    <Link
      className={cn("bg-blue-500 hover:bg-blue-600 py-2 px-1", className)}
      href="/api/login"
    >
      Login
    </Link>
  );
}
