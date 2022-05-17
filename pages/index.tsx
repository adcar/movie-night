import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Movie Night</title>
      </Head>
      <div
        className="flex items-center justify-center bg-slate-700 bg-cover"
        style={{
          backgroundImage: "url('/waves.svg')",
          height: "calc(100vh - 80px)",
        }}
      >
        <div className="container flex flex-row items-center p-12 ">
          <img
            alt="Movie Night!"
            src="/home_cinema.svg"
            className="hidden h-1/3 lg:block lg:h-auto lg:w-1/2"
          />
          <div className="lg:ml-12 lg:mt-0 lg:w-1/2">
            <h1 className="mb-4 text-6xl font-extrabold ">
              Don't know what to watch?
            </h1>
            <p className="mb-8">
              Whether it's a romantic comedy or a nail-biting thriller, find a
              movie that's right for you with Movie Night!
            </p>
            <Link href="/dashboard">
              <a className="rounded-full bg-red-500 px-5 py-3 font-bold uppercase text-white shadow-2xl outline-none ring-offset-slate-800 transition-all duration-300 ease-in-out hover:bg-red-800 hover:shadow-sm focus:ring-4 focus:ring-red-500 focus:ring-offset-4">
                Get started
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
