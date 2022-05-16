import { NextPageContext } from "next";
import Head from "next/head";
import Link from "next/link";
import genres from "../utils/genres";
import fetch from "isomorphic-fetch";
import { stringify } from "query-string";
import MovieCard from "../components/MovieCard";
import Selector from "../components/Selector";
import { Menu } from "@headlessui/react";
import { useRouter } from "next/router";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const sorts = [
  { name: "Popularity", value: "popularity.desc" },
  { name: "Rating", value: "vote_average.desc" },
  { name: "Release Date", value: "release_date.desc" },
  { name: "Revenue", value: "revenue.desc" },
];

export default function Movies({ genre, tmdbResults }: Props) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Movie Night - Choose a genre</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto">
        <h1 className="mt-12 mb-12 text-center text-5xl font-extrabold">
          Here's some{" "}
          <span className="text-red-500">
            {genre.id !== 0 ? genre.name.toLowerCase() : ""}
          </span>{" "}
          movies you should check out
        </h1>
        <div className="container mx-auto mb-12 flex justify-center space-x-4 px-5">
          <Selector title={genre.name} direction="left">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={`${router.pathname}?${stringify({
                    ...router.query,
                    genre: 0,
                  })}`}
                >
                  <a
                    className={classNames(
                      active ? "bg-slate-600 " : "text-slate-300",
                      "block px-4 py-2 text-sm font-bold"
                    )}
                  >
                    Anything
                  </a>
                </Link>
              )}
            </Menu.Item>
            <div className="divide-y" />
            {genres
              .slice(1, genres.length)
              .sort((a, b) => a.name.localeCompare(b.name))
              .filter((a) => a.id !== genre.id)
              .map((genre) => (
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={`${router.pathname}?${stringify({
                        ...router.query,
                        genre: genre.id,
                      })}`}
                    >
                      <a
                        className={classNames(
                          "block px-4 py-2 text-sm text-slate-300 hover:bg-slate-600"
                        )}
                      >
                        {genre.name}
                      </a>
                    </Link>
                  )}
                </Menu.Item>
              ))}
          </Selector>
          <Selector title={"Sort By"} direction="right">
            {sorts.map((sort) => (
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={`${router.pathname}?${stringify({
                      ...router.query,
                      sort_by: sort.value,
                    })}`}
                  >
                    <a
                      className={classNames(
                        "block px-4 py-2 text-sm text-slate-300 hover:bg-slate-600"
                      )}
                    >
                      {sort.name}
                    </a>
                  </Link>
                )}
              </Menu.Item>
            ))}
          </Selector>
        </div>
        <div className="grid grid-cols-1 place-content-center justify-items-center gap-10 px-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {tmdbResults.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ query }: NextPageContext) {
  let genreId: number;
  if (!query.genre) {
    genreId = 0;
  } else {
    genreId = parseInt(query.genre as string);
  }

  const genre = genres.find((genre) => genre.id === genreId);

  const withGenre = genreId !== 0 ? stringify({ with_genres: genreId }) : "";

  const res = await fetch(
    "https://api.themoviedb.org/3/discover/movie?" +
      stringify({
        api_key: process.env.TMDB_API_KEY,
        language: "en-US",
        sort_by: "popularity.desc",
        include_adult: false,
        include_video: false,
        page: 1,
      }) +
      "&" +
      withGenre
  );

  const json = await res.json();

  return { props: { genre, tmdbResults: json.results } };
}

interface Props {
  genre: { name: string; id: number; icon: string };
  tmdbResults: Movie[];
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
