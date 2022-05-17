import Head from "next/head";
import genres from "../utils/genres";
import fetch from "isomorphic-fetch";
import { stringify } from "query-string";
import MovieCard from "../components/MovieCard";
import Selector from "../components/Selector";
import { Menu } from "@headlessui/react";
import { useRouter } from "next/router";
import { mutate } from "swr";
import useSWRInfinite from "swr/infinite";
import Twemoji from "react-twemoji";

import { useEffect, useRef } from "react";
//@ts-ignore
import { useIsVisible } from "react-is-visible";

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
  const myRef = useRef<HTMLInputElement>(null);

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

  function getKey(pageIndex: any) {
    return "/api/discover?" + stringify({ ...router.query, page: pageIndex });
  }
  const { data, size, setSize, error, isValidating } = useSWRInfinite(
    getKey,
    fetcher
  );
  const isVisible = useIsVisible(myRef);
  const movies = data ? [].concat(...data) : [];

  router.events?.on("routeChangeComplete", () => {
    mutate("/api/discover");
    localStorage.setItem("homeRoute", router.asPath);
  });
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");

  const isRefreshing = isValidating && data && data.length === size;

  useEffect(() => {
    if (isVisible && !isRefreshing) {
      setSize(size + 1);
    }
  }, [isVisible, isRefreshing]);

  return (
    <>
      <Head>
        <title>Movie Night - Choose a genre</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto px-5">
        <h1 className="mt-12 mb-12 text-center text-5xl font-extrabold">
          Here's some{" "}
          <span className="text-red-500">
            {genre.id !== 0 ? genre.name.toLowerCase() : ""}
          </span>{" "}
          movies you should check out
        </h1>
        <div className="container sticky left-0 top-20 z-50 mx-auto mb-12 flex flex-col justify-center space-x-4 bg-slate-800 py-3 px-5 md:top-5 md:flex-row  md:bg-transparent md:py-0 ">
          <Selector title={genre.name} direction="left" isGenre>
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
                      "block px-4 py-2 text-sm text-slate-300"
                    )}
                  >
                    <Twemoji
                      options={{
                        className:
                          "w-4 inline-flex justify-center items-center",
                      }}
                    >
                      <span className="mr-2">{genres[0].icon}</span>{" "}
                      {genres[0].name}
                    </Twemoji>
                  </a>
                </button>
              )}
            </Menu.Item>
            {genres
              .slice(1, genres.length)
              .sort((a, b) => a.name.localeCompare(b.name))
              .filter((a) => a.id !== genre?.id)
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
                    >
                      <a
                        className={classNames(
                          active ? "bg-slate-600" : "",
                          "block px-4 py-2 text-sm text-slate-300"
                        )}
                      >
                        <Twemoji
                          options={{
                            className:
                              "w-4 inline-flex justify-center items-center",
                          }}
                        >
                          <span className="mr-2">{genre.icon}</span>{" "}
                          {genre.name}
                        </Twemoji>
                      </a>
                    </button>
                  )}
                </Menu.Item>
              ))}
          </Selector>
          <Selector title={"Sort By " + sortBy.name} direction="right">
            {sorts
              .filter((sort) => sort.value !== sortBy?.value)
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
        <div>
          {data ? (
            <>
              <div
                className="grid grid-cols-1 place-content-center justify-items-center gap-10 px-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 " //This is important field to render the next data
              >
                {movies.map((movie: Movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 place-content-center justify-items-center gap-10 px-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 ">
              {Array.from(Array(20).keys()).map((num) => (
                <div
                  key={num}
                  className="relative h-[169px] w-[300px] shrink-0 animate-skeleton rounded-md bg-slate-800"
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div ref={myRef} className="mt-12 text-center">
        {isLoadingMore ? "Loading..." : "Loading..."}
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
