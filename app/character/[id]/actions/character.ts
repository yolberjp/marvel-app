import { fetchApi } from "../../../actions/api";
import { BaseResponse } from "../../../actions/types";

const CHARACTER_PREFIX = '4005';

type CharacterApiResponse = {
  id: number;
  name: string;
  deck: string;
  issue_credits: {
    id: number;
    name: string;
  }[]
  image: {
    super_url: string;
  }
}

type CharacterResponse = BaseResponse & {
  character: {
    id: number;
    name: string;
    description: string;
    comics: {
      id: number;
      name: string;
    }[];
    imageUrl: string;
  };
}

export async function fetchCharacter(id: string): Promise<CharacterResponse>{
  const response = await fetchApi(`character/${CHARACTER_PREFIX}-${id}`);

  const characterData: CharacterApiResponse = response.results;

  const comics = characterData.issue_credits.filter(comic => comic.name !== null && comic.name !== "").slice(-20);

  return {
    character: {
      id: characterData.id,
      name: characterData.name,
      description: characterData.deck,
      comics: comics,
      imageUrl: characterData.image.super_url,
    },
    status_code: response.status_code,
    error: response.error,
  };
}