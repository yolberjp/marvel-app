import Image from 'next/image'

export default function ErrorPage({
  status,
  title,
  message,
}: {
  status: string
  title: string
  message: string
}) {
  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="relative mx-auto flex flex-1 flex-col justify-end md:max-w-2xl lg:max-w-6xl lg:flex-row lg:justify-between">
        <div className="flex w-full flex-col justify-center p-12 lg:w-1/2">
          <h1 className="text-4xl font-bold uppercase lg:text-5xl">
            {status} - {title}
          </h1>
          <p className="text-lg text-balance text-gray-500">{message}</p>
        </div>
        <div className="flex w-full flex-col items-center justify-end lg:w-1/2">
          <Image
            src="/error.png"
            alt={`Error - ${title}`}
            width={619}
            height={744}
            className="h-auto w-80 object-cover object-bottom md:w-100 lg:w-120"
          />
        </div>
      </div>
    </div>
  )
}
