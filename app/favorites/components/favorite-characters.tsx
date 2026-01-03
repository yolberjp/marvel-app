"use client";

import { fetchCharacters } from "@/app/actions/characters";
import CharacterCard from "@/app/components/character-card";
import CharactersSkeleton from "@/app/components/skeletons/characters-skeleton";
import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "favorite-ids";

type CharacterItem = {
  id: number;
  name: string;
  imageUrl: string;
};

export function FavoriteCharacters() {
  const [characters, setCharacters] = useState<CharacterItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const ids = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    ) as string[];

    (async () => {
      setIsLoading(true);
      const data = await fetchCharacters({ filters: { ids } });
      setCharacters(data.characters);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <CharactersSkeleton count={4} />;
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(188px,188px))] justify-center gap-x-2 gap-y-8 md:gap-4 px-4 md:px-12">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={{ ...character, isFavorite: false }}
        />
      ))}
    </div>
  );
}
