import type { NextPage } from "next";
import Head from "next/head";
import genres from "../utils/genres";
import GenreCard from "../components/GenreCard";

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
        <div className="container mx-auto grid grid-cols-2 place-content-center gap-10 px-5 lg:grid-cols-3 2xl:grid-cols-4">
          {genres.map((genre, i) => (
            <GenreCard key={genre.id} genre={genre} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
