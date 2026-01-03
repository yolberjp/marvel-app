import SearchInput from "../components/search-input";
import { FavoriteCharacters } from "./components/favorite-characters";

export default async function FavoritesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await searchParams;

  return (
    <div className="flex flex-col py-12 gap-6">
      <h1 className="px-12 text-4xl font-bold uppercase">Favorites</h1>
      <div className="w-full px-4 md:px-12">
        <SearchInput />
      </div>

      <FavoriteCharacters search={search} />
    </div>
  );
}
