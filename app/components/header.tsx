import Image from 'next/image'
import LinkWithLoader from './LinkLoader'
import TopLoader from './TopLoader'
import { Suspense } from 'react'
import { HeaderFavoriteButton } from './header-favorite-button/header-favorite-button'

export function Header() {
  return (
    <header className="sticky top-0 z-50">
      <div className="border-b-header flex h-fit w-full flex-row items-center justify-between border-b bg-black px-12 py-4 text-white">
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
  )
}
