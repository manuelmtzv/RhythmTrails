"use client";

import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();

  return <pre>{JSON.stringify(Object.fromEntries(searchParams), null, 2)}</pre>;
}
