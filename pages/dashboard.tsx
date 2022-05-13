import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Twemoji from "react-twemoji";
import genres from "../utils/genres";

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Movie Night - Choose a genre</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="mt-12 mb-4 text-center text-6xl font-extrabold">
        What genre are you looking for?
      </h1>
      <p className="mb-12 text-center">
        (Don't worry, you can change this later)
      </p>
      <div>
        <Twemoji
          options={{
            className: "twemoji",
            folder: "svg",
            ext: ".svg",
          }}
        >
          <div className="container mx-auto grid grid-cols-2 place-content-center gap-10 px-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {genres.map((genre, i) => (
              <Link href={`/movies?genre=${genre.id}`} key={i}>
                <a className="block rounded-xl bg-slate-800 no-underline shadow-xl ring-offset-slate-800 transition-all duration-300 ease-in-out hover:bg-slate-600 hover:shadow-sm  focus:ring-8 focus:ring-red-500 focus:ring-offset-4">
                  <div className="">
                    <>
                      <div className="mx-12 mt-8 mb-6">{genre.icon}</div>
                      <p className="mb-6 mt-6 text-center text-xl font-bold ">
                        {genre.name}
                      </p>
                    </>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </Twemoji>
      </div>
    </>
  );
};

export default Dashboard;
