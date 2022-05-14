import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import genres from "../utils/genres";
import { useState } from "react";

const Dashboard: NextPage = () => {
  const [isVisible, setVisible] = useState(false);
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
        <div className="container mx-auto grid grid-cols-2 place-content-center gap-10 px-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {genres.map((genre, i) => (
            <Link href={`/movies?genre=${genre.id}`} key={i}>
              <a>
                <div
                  className="relative rounded-md"
                  onMouseOver={() => {
                    setVisible(true);
                  }}
                  onMouseLeave={() => setVisible(false)}
                >
                  <Image
                    width={300}
                    height={169}
                    layout="responsive"
                    src={`/thumbnails/${genre.name.toLowerCase()}.jpg`}
                    className="absolute top-0 left-0 h-full w-full rounded-md"
                  />
                  <div
                    className="absolute top-0 left-0 h-full w-full rounded-md backdrop-blur-lg transition-all duration-300 ease-in-out"
                    style={{
                      opacity: isVisible ? 1 : 0,
                    }}
                  />
                  <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-md bg-gradient-to-b from-slate-800/60 via-slate-800/80 to-slate-800/60 shadow-md transition-all duration-300 ease-in-out hover:shadow-xl">
                    <h1 className="text-2xl font-bold">{genre.name}</h1>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
