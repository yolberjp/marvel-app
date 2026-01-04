import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import { fetchCharacters } from './characters'
import { redirect } from 'next/navigation'
import { fetchApi } from '../api/api'

vi.mock('../api/api', () => ({
  fetchApi: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}))

describe('fetchCharacters', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch characters with no filters and default limit', async () => {
    const mockApiResponse = {
      status_code: 1,
      error: 'OK',
      results: [{ id: 1, name: 'Spider Man', image: { small_url: 'url1' } }],
    }
    ;(fetchApi as Mock).mockResolvedValue(mockApiResponse)

    const result = await fetchCharacters({ filters: {} })

    expect(fetchApi).toHaveBeenCalledWith('characters', {
      limit: '50',
      filter: '',
    })
    expect(result?.characters[0].name).toBe('Spider Man')
  })

  it('should apply search filter correctly', async () => {
    ;(fetchApi as Mock).mockResolvedValue({
      status_code: 1,
      error: 'OK',
      results: [],
    })
    await fetchCharacters({ filters: { search: 'Hulk' } })
    expect(fetchApi).toHaveBeenCalledWith('characters', {
      limit: '50',
      filter: 'name:Hulk',
    })
  })

  it('should apply IDs filter correctly', async () => {
    ;(fetchApi as Mock).mockResolvedValue({
      status_code: 1,
      error: 'OK',
      results: [],
    })
    await fetchCharacters({ filters: { ids: ['1', '2'] } })
    expect(fetchApi).toHaveBeenCalledWith('characters', {
      limit: '50',
      filter: 'id:1|2',
    })
  })

  it('should apply both search and IDs filters', async () => {
    ;(fetchApi as Mock).mockResolvedValue({
      status_code: 1,
      error: 'OK',
      results: [],
    })
    await fetchCharacters({ filters: { search: 'Iron', ids: ['3'] } })
    expect(fetchApi).toHaveBeenCalledWith('characters', {
      limit: '50',
      filter: 'name:Iron,id:3',
    })
  })

  it('should use custom limit parameter', async () => {
    ;(fetchApi as Mock).mockResolvedValue({
      status_code: 1,
      error: 'OK',
      results: [],
    })
    await fetchCharacters({ limit: 10, filters: {} })
    expect(fetchApi).toHaveBeenCalledWith('characters', {
      limit: '10',
      filter: '',
    })
  })

  it('should transform API response to app format', async () => {
    const mockApiResponse = {
      status_code: 1,
      error: 'OK',
      results: [{ id: 101, name: 'Thor', image: { small_url: 'thor.jpg' } }],
    }
    ;(fetchApi as Mock).mockResolvedValue(mockApiResponse)

    const result = await fetchCharacters({ filters: {} })

    expect(result).toEqual({
      characters: [{ id: 101, name: 'Thor', imageUrl: 'thor.jpg' }],
      status_code: 1,
      error: 'OK',
    })
  })

  it('should handle API errors by redirecting to error page', async () => {
    const mockApiResponse = {
      status_code: 101,
      error: 'Invalid API Key',
    }
    ;(fetchApi as Mock).mockResolvedValue(mockApiResponse)

    await fetchCharacters({ filters: {} })

    expect(redirect).toHaveBeenCalledWith(
      expect.stringContaining('/error?status=500&message=api_error_code: 101')
    )
  })

  it('should handle fetch exceptions by redirecting to error page', async () => {
    ;(fetchApi as Mock).mockRejectedValue(new Error('Network Failure'))

    await fetchCharacters({ filters: {} })

    expect(redirect).toHaveBeenCalledWith(
      '/error?status=500&message=Network Failure'
    )
  })
})
