import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col flex-1 h-full">
      <div className="relative flex flex-col lg:flex-row justify-end lg:justify-between flex-1 max-w-6xl mx-auto">
        <div className="flex flex-col w-full lg:w-1/2 p-12 justify-center">
          <h1 className="text-4xl lg:text-5xl font-bold uppercase">
            404 - Page Not Found
          </h1>
          <p className="text-gray-500 text-lg text-balance">
            Check that you typed the address correctly, go back to your previous
            page or try using our site search to find something specific.
          </p>
        </div>
        <div className="flex flex-col w-full lg:w-1/2 justify-end items-center">
          <Image
            src="/error.png"
            alt="Not Found"
            width={619}
            height={744}
            className="w-80 md:w-100 lg:w-120 h-auto object-cover object-bottom"
          />
        </div>
      </div>
    </div>
  );
}
