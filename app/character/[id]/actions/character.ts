'use server'

import { redirect } from 'next/navigation'
import { fetchApi } from '../../../actions/api/api'
import { BaseResponse } from '../../../actions/types'

const CHARACTER_PREFIX = '4005'

type CharacterApiResponse = {
  id: number
  name: string
  deck: string
  issue_credits: {
    id: number
    name: string
  }[]
  image: {
    super_url: string
  }
}

type CharacterResponse = BaseResponse & {
  character: {
    id: number
    name: string
    description: string
    comics: {
      id: number
      name: string
    }[]
    imageUrl: string
  }
}

export async function fetchCharacter(id: string): Promise<CharacterResponse> {
  try {
    const response = await fetchApi(`character/${CHARACTER_PREFIX}-${id}`)

    if (response.status_code !== 1) {
      throw new Error(
        `api_error_code: ${response.status_code}, api_error_message: ${response.error}`
      )
    }

    const characterData: CharacterApiResponse = response.results

    const comics = characterData.issue_credits
      .filter((comic) => comic.name !== null && comic.name !== '')
      .slice(-20)

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
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unknown error occurred'
    redirect('/error?status=500&message=' + message)
  }
}
