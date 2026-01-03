"use client";

import { HeartIcon } from "./icons/heart";
import { useFavoriteCharacters } from "../contexts/FavoriteCharactersContext";
import LinkWithLoader from "./LinkLoader";

export function HeaderFavoriteButton() {
  const { ids } = useFavoriteCharacters();

  return (
    <LinkWithLoader
      href="/favorites"
      className="inline-flex gap-2 items-center p-2 text-white"
    >
      <HeartIcon className="w-6 h-6" />
      {ids.length}
    </LinkWithLoader>
  );
}
