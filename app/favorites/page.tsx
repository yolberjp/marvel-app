import { Suspense } from "react";
import SearchInput from "../components/search-input";
import { FavoriteCharacters } from "./components/favorite-characters";

export default function FavoritesPage() {
  return (
    <div className="flex flex-col py-12 gap-6">
      <h1 className="px-12 text-4xl font-bold uppercase">Favorites</h1>
      <div className="w-full px-4 md:px-12">
        <SearchInput />
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <FavoriteCharacters />
      </Suspense>
    </div>
  );
}
