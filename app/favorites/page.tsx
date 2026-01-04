import { FavoriteCharacters } from './components/favorite-characters'

export default async function FavoritesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>
}) {
  const { search } = await searchParams

  return (
    <div className="flex flex-col gap-2 py-8">
      <h1 className="px-12 text-4xl font-bold uppercase">Favorites</h1>
      <FavoriteCharacters search={search} />
    </div>
  )
}
