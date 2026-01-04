"use client";

import { fetchCharacters } from "@/app/actions/characters";
import CharacterCard from "@/app/components/character-card";
import SearchCharacter from "@/app/components/search-character";
import { useFavoriteCharacters } from "@/app/contexts/FavoriteCharactersContext";
import { useEffect, useState } from "react";

type CharacterItem = {
  id: number;
  name: string;
  imageUrl: string;
};

export function FavoriteCharacters({ search }: { search?: string }) {
  const { ids } = useFavoriteCharacters();
  const [characters, setCharacters] = useState<CharacterItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let charactersData: CharacterItem[] = [];
      if (ids.length) {
        const data = await fetchCharacters({
          filters: {
            ids: ids.map(String),
            search,
          },
        });
        charactersData = data.characters;
      }
      setCharacters(charactersData);
      setIsLoading(false);
    })();
  }, [ids, search]);

  return (
    <>
      <SearchCharacter
        totalResults={isLoading ? undefined : characters.length}
      />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(188px,188px))] justify-center gap-x-2 gap-y-8 md:gap-4 px-4 md:px-12">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={{ ...character, isFavorite: false }}
          />
        ))}
      </div>
    </>
  );
}
