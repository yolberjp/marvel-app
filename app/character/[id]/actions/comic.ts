import { fetchApi } from "../../../actions/api";
import { BaseResponse } from "../../../actions/types";

const ISSUE_PREFIX = '4000';

type ComicApiResponse = {
  id: number;
  name: string;
  cover_date: string;
  image: {
    small_url: string;
  }
}

type ComicResponse = BaseResponse & {
  comic: {
    id: number;
    name: string;
    cover_date: string;
    imageUrl: string;
  };
}

export async function fetchComic(id: number): Promise<ComicResponse>{
  const response = await fetchApi(`issue/${ISSUE_PREFIX}-${id}`);

  const comicData: ComicApiResponse = response.results;

  return {
    comic: {
        id: comicData.id,
        name: comicData.name,
        cover_date: comicData.cover_date,
        imageUrl: comicData.image.small_url,
    },
    status_code: response.status_code,
    error: response.error,
  };
}