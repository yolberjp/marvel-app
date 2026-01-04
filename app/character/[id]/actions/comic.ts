'use server'

import { redirect } from 'next/navigation'
import { fetchApi } from '../../../actions/api/api'
import { BaseResponse } from '../../../actions/types'

const ISSUE_PREFIX = '4000'

type ComicApiResponse = {
  id: number
  name: string
  cover_date: string
  image: {
    small_url?: string
  }
}

type ComicResponse = BaseResponse & {
  comic: {
    id: number
    name: string
    cover_date: string | null
    imageUrl?: string
  }
}

export async function fetchComic(id: number): Promise<ComicResponse> {
  try {
    const response = await fetchApi(`issue/${ISSUE_PREFIX}-${id}`)

    if (response.status_code !== 1) {
      throw new Error(
        `api_error_code: ${response.status_code}, api_error_message: ${response.error}`
      )
    }

    const comicData: ComicApiResponse = response.results

    if (comicData.image?.small_url === undefined) {
      console.log('id de comic sin imagen', id)
    }

    return {
      comic: {
        id: comicData.id,
        name: comicData.name,
        cover_date: comicData.cover_date,
        imageUrl: comicData.image?.small_url,
      },
      status_code: response.status_code,
      error: response.error,
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : 'An unknown error occurred'
    redirect('/error?status=500&message=' + message)
  }
}
