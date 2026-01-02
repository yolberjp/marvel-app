import Link from "next/link";
import { HeartIcon } from "./icons/heart";

export function HeaderFavoriteButton() {
  const favoriteCount = 0; // TODO: Replace with actual favorite from local storage

    return (
        <Link href="/favorites" className="inline-flex gap-2 items-center p-2 text-white">
            <HeartIcon className="w-6 h-6" />
            {favoriteCount > 0 && favoriteCount}
        </Link>
    )
}