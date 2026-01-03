import { Suspense } from "react";
import Characters from "./components/characters";
import CharactersSkeleton from "./components/skeletons/characters-skeleton";
import SearchInput from "./components/search-input";

export default async function Home({searchParams}: {searchParams: Promise<{search: string}>}) {
const queryParams = await searchParams
const search = queryParams.search

  return (
    <div className="flex flex-col gap-6 py-4">
      <div className="w-full pt-8 px-4 md:px-12">
        <SearchInput />
      </div>
      <Suspense fallback={<CharactersSkeleton />}>
        <Characters search={search} />
      </Suspense>
    </div>
  );
}
