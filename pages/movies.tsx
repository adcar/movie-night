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
import useSWR, { mutate } from "swr";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
//@ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const sorts = [
  { name: "Popularity", value: "popularity.desc" },
  { name: "Rating", value: "vote_average.desc" },
  { name: "Release Date", value: "release_date.desc" },
  { name: "Revenue", value: "revenue.desc" },
];

export default function Movies() {
  const router = useRouter();
  let genre = genres.find(
    (genre) => genre.id === parseInt(router.query.genre as string)
  );

  if (!genre) {
    genre = genres[0]; // Anything
  }

  let sortBy = sorts.find((sort) => sort.value === router.query.sort_by);

  if (!sortBy) {
    sortBy = sorts[0]; // Popularity
  }

  router.events?.on("routeChangeComplete", () => {
    mutate("/api/discover");
  });
  const { data, error } = useSWR(
    "/api/discover?" + stringify(router.query),
    fetcher
  );

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
            <Menu.Item key={genre.id}>
              {({ active }) => (
                <button
                  className="w-full text-left"
                  onClick={() =>
                    router.push(
                      `${router.pathname}?${stringify({
                        ...router.query,
                        genre: 0,
                      })}`
                    )
                  }
                >
                  <a
                    className={classNames(
                      active ? "bg-slate-600" : "",
                      "block px-4 py-2 text-sm font-bold text-slate-300"
                    )}
                  >
                    Anything
                  </a>
                </button>
              )}
            </Menu.Item>
            <div className="divide-y" />
            {genres
              .slice(1, genres.length)
              .sort((a, b) => a.name.localeCompare(b.name))
              .filter((a) => a.id !== genre.id)
              .map((genre) => (
                <Menu.Item key={genre.id}>
                  {({ active }) => (
                    <button
                      className="w-full text-left"
                      onClick={() =>
                        router.push(
                          `${router.pathname}?${stringify({
                            ...router.query,
                            genre: genre.id,
                          })}`
                        )
                      }
                      // href={`${router.pathname}?${stringify({
                      //   ...router.query,
                      //   genre: genre.id,
                      // })}`}
                    >
                      <a
                        className={classNames(
                          active ? "bg-slate-600" : "",
                          "block px-4 py-2 text-sm text-slate-300"
                        )}
                      >
                        {genre.name}
                      </a>
                    </button>
                  )}
                </Menu.Item>
              ))}
          </Selector>
          <Selector title={"Sort By " + sortBy.name} direction="right">
            {sorts
              .filter((sort) => sort.value !== sortBy.value)
              .map((sort) => (
                <Menu.Item key={sort.value}>
                  {({ active }) => (
                    <button
                      className="w-full text-left"
                      onClick={() =>
                        router.push(
                          `${router.pathname}?${stringify({
                            ...router.query,
                            sort_by: sort.value,
                          })}`
                        )
                      }
                    >
                      <a
                        className={classNames(
                          active ? "bg-slate-600" : "",
                          "block px-4 py-2 text-sm text-slate-300"
                        )}
                      >
                        {sort.name}
                      </a>
                    </button>
                  )}
                </Menu.Item>
              ))}
          </Selector>
        </div>
        <div className="grid grid-cols-1 place-content-center justify-items-center gap-10 px-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 ">
          {data
            ? data.results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))
            : Array.from(Array(20).keys()).map((num) => (
                <div
                  key={num}
                  className="relative h-[169px] w-[300px] shrink-0 animate-skeleton rounded-md bg-slate-800"
                />
              ))}
        </div>
      </div>
    </>
  );
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
