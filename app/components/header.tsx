import Image from "next/image";
import { HeaderFavoriteButton } from "./header-favorite-button";
import LinkWithLoader from "./LinkLoader";
import TopLoader from "./TopLoader";
import { Suspense } from "react";

export function Header() {
  return (
    <header className="sticky top-0 z-50">
      <div className="flex flex-row justify-between items-center px-12 py-4 w-full h-fit bg-black border-b border-b-header text-white">
        <LinkWithLoader href="/">
          <Image
            src="/marvel.svg"
            alt="Marvel Logo"
            loading="eager"
            width={130}
            height={52}
          />
        </LinkWithLoader>
        <HeaderFavoriteButton />
      </div>
      <Suspense>
        <TopLoader />
      </Suspense>
    </header>
  );
}
