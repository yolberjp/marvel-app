import { Suspense } from "react";
import Characters from "./components/characters";
import CharactersSkeleton from "./components/skeletons/characters-skeleton";

export default async function Home() {


  return (
    <div className="flex flex-col py-4">
      <Suspense fallback={<CharactersSkeleton />}>
        <Characters />
      </Suspense>
    </div>
  );
}
