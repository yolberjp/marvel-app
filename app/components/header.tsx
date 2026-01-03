import Image from "next/image";
import { HeaderFavoriteButton } from "./header-favorite-button";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50">
      <div className="flex flex-row justify-between items-center px-12 py-4 w-full h-fit bg-black border-b border-b-header text-white">
        <Link href="/">
          <Image src="/marvel.svg" alt="Marvel Logo" width={130} height={52} />
        </Link>
        <HeaderFavoriteButton />
      </div>
    </header>
  );
}
