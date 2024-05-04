import { me } from "@/actions/spotify/user.actions";
import Image from "next/image";
import Link from "next/link";
import { getFlagEmoji } from "../app/utils/getFlagEmoji";

export default async function UserData() {
  const user = await me();

  return (
    user && (
      <div className="p-4 flex border-2 rounded-md items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2">
            <h1 className="text-2xl font-semibold">{user.displayName} </h1>

            <span className="text-sm font-base px-2 py-0.5 border rounded-md">
              {user.type}
            </span>
          </div>

          <p>Followers: {user.followers.total}</p>

          <p>Account type: {user.product}</p>
        </div>

        <div className="flex flex-col gap-2">
          <p>Country: {getFlagEmoji(user.country)}</p>
          <p>Email: {user.email}</p>
          <Link
            className="inline-link"
            href={user.externalUrls.spotify}
            target="_blank"
          >
            Visit user profile
          </Link>
        </div>

        <figure className="max-w-[5rem] max-h-[5rem] border-2 rounded-full">
          <Image
            className="w-full max-w-sm relative rounded-full aspect-square object-cover object-center"
            src={user.images[1].url}
            alt={user.displayName}
            width={300}
            height={300}
            quality={100}
          />
        </figure>
      </div>
    )
  );
}
