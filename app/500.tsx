import Image from 'next/image'

export default function Error500() {
  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="relative mx-auto flex max-w-6xl flex-1 flex-col justify-end lg:flex-row lg:justify-between">
        <div className="flex w-full flex-col justify-center p-12 lg:w-1/2">
          <h1 className="text-4xl font-bold uppercase lg:text-5xl">
            404 - Page Not Found
          </h1>
          <p className="text-lg text-balance text-gray-500">
            Check that you typed the address correctly, go back to your previous
            page or try using our site search to find something specific.
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-end lg:w-1/2">
          <Image
            src="/not-found.png"
            alt="Not Found"
            width={619}
            height={744}
            className="h-auto w-100 object-cover object-bottom lg:w-120"
          />
        </div>
      </div>
    </div>
  )
}
