"use client";

import Link from "next/link";
import { HeartIcon } from "./icons/heart";
import { useFavoriteCharacters } from "../contexts/FavoriteCharactersContext";

export function HeaderFavoriteButton() {
  const { ids } = useFavoriteCharacters();

  return (
    <Link
      href="/favorites"
      className="inline-flex gap-2 items-center p-2 text-white"
    >
      <HeartIcon className="w-6 h-6" />
      {ids.length}
    </Link>
  );
}
