const API_BASE_URL = 'https://comicvine.gamespot.com/api/';
const API_KEY = process.env.COMICVINE_API_KEY;
const MARVEL_PUBLISHER_ID = '4010-31';


export async function fetchApi(endpoint: string, params: Record<string, string> = {}) {
  const url = `${API_BASE_URL}${endpoint}/?api_key=${API_KEY}&format=json&filter=publisher.id:${MARVEL_PUBLISHER_ID}&` +
    new URLSearchParams(params).toString();

  return fetch(url).then((res) => res.json());
}