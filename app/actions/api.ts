"use server";

const API_BASE_URL = "https://comicvine.gamespot.com/api/";
const API_KEY = process.env.COMICVINE_API_KEY;

/* TODO: Discuss with the backend team
 * This filter does not work. The api does not support filter by publisher.id
 * const MARVEL_PUBLISHER_ID = "4010-31";
 * ...&filter=publisher.id:${MARVEL_PUBLISHER_ID}
 */

export async function fetchApi(
  endpoint: string,
  params: Record<string, string> = {}
) {
  const url =
    `${API_BASE_URL}${endpoint}/?api_key=${API_KEY}&format=json&` +
    new URLSearchParams(params).toString();

  return fetch(url).then((res) => res.json());
}
