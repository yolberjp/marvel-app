"use server";

import { fetchApi } from "./api";
import { BaseResponse } from "./types";

type CharacterApiResponse = {
  id: number;
  name: string;
  image: {
    small_url: string;
  };
};

type CharactersResponse = BaseResponse & {
  characters: {
    id: number;
    name: string;
    imageUrl: string;
  }[];
};

type FetchCharactersProps = {
  limit?: number;
  filters: {
    search?: string;
    ids?: string[];
  };
};

export async function fetchCharacters({
  limit = 50,
  filters,
}: FetchCharactersProps): Promise<CharactersResponse> {
  const formattedFilters = [
    filters.search ? `name:${filters.search}` : null,
    filters.ids && filters.ids.length ? `id:${filters.ids.join("|")}` : null,
  ]
    .filter(Boolean)
    .join(",");

  const response = await fetchApi("characters", {
    limit: limit.toString(),
    filter: formattedFilters,
  });
  return {
    characters: response.results.map((character: CharacterApiResponse) => ({
      id: character.id,
      name: character.name,
      imageUrl: character.image.small_url,
    })),
    status_code: response.status_code,
    error: response.error,
  };
}
