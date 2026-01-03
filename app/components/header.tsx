import Image from "next/image";
import { HeaderFavoriteButton } from "./header-favorite-button";
import LinkWithLoader from "./LinkLoader";
import TopLoader from "./TopLoader";

export function Header() {
  return (
    <header className="relative sticky top-0 z-50">
      <div className="flex flex-row justify-between items-center px-12 py-4 w-full h-fit bg-black border-b border-b-header text-white">
        <LinkWithLoader href="/">
          <Image src="/marvel.svg" alt="Marvel Logo" width={130} height={52} />
        </LinkWithLoader>
        <HeaderFavoriteButton />
      </div>
      <TopLoader />
    </header>
  );
}
