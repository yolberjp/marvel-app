'use server'

import { redirect } from 'next/navigation'
import { BaseResponse } from '../types'
import { fetchApi } from '../api/api'

type CharacterApiResponse = {
  id: number
  name: string
  image: {
    small_url: string
  }
}

type CharactersResponse = BaseResponse & {
  characters: {
    id: number
    name: string
    imageUrl: string
  }[]
}

type FetchCharactersProps = {
  limit?: number
  filters: {
    search?: string
    ids?: string[]
  }
}

export async function fetchCharacters({
  limit = 50,
  filters,
}: FetchCharactersProps): Promise<CharactersResponse> {
  try {
    const formattedFilters = [
      filters.search ? `name:${filters.search}` : null,
      filters.ids && filters.ids.length ? `id:${filters.ids.join('|')}` : null,
    ]
      .filter(Boolean)
      .join(',')

    const response = await fetchApi('characters', {
      limit: limit.toString(),
      filter: formattedFilters,
    })

    if (response.status_code !== 1) {
      throw new Error(
        `api_error_code: ${response.status_code}, api_error_message: ${response.error}`
      )
    }

    return {
      characters: response.results.map((character: CharacterApiResponse) => ({
        id: character.id,
        name: character.name,
        imageUrl: character.image.small_url,
      })),
      status_code: response.status_code,
      error: response.error,
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : 'An unknown error occurred'
    redirect('/error?status=500&message=' + message)
  }
}
