import { fetchApi } from "./api";
import { BaseResponse } from "./types";

type CharacterApiResponse = {
  id: number;
  name: string;
  image: {
    small_url: string;
  }
}

type CharactersResponse = BaseResponse & {
  characters: {
    id: number;
    name: string;
    imageUrl: string;
  }[];
}

export async function fetchCharacters(): Promise<CharactersResponse> {
  const response = await fetchApi('characters', { limit: '50' });

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