import { useState, useContext, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import MovieCard from "./MovieCard";

function HorizScroll({ items }) {
  const router = useRouter();
  const apiRef = useRef({});

  // Reset scroll position
  // function resetScroll() {
  //   if (items.length >= 1) {
  //     apiRef.current?.scrollToItem?.(
  //       apiRef.current?.getItemElementById(items[0].id)
  //     );
  //   }
  // }

  // router.events?.on("routeChangeComplete", () => {
  //   resetScroll();
  // });

  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} apiRef={apiRef}>
      {items.map((movie) => (
        <MovieCard
          forceRefresh
          movie={movie}
          itemId={movie.id}
          key={movie.id}
        />
      ))}
    </ScrollMenu>
  );
}

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

  return (
    <div
      className="absolute top-0 left-0 z-50 flex h-[176px] items-center bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent transition-all duration-300 ease-in-out"
      style={{
        opacity: isFirstItemVisible ? 0 : 1,
        visibility: isFirstItemVisible ? "hidden" : "visible",
      }}
    >
      <ArrowLeftIcon
        className="ml-2 mr-10 h-14 w-14 cursor-pointer rounded-full p-2 transition-all duration-300 ease-in-out hover:bg-red-500"
        disabled={isFirstItemVisible}
        onClick={() => scrollPrev()}
      >
        Left
      </ArrowLeftIcon>
    </div>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

  return (
    <div
      className="absolute  top-0 right-0 z-50 flex h-[176px] items-center bg-gradient-to-l from-slate-900 via-slate-900/80 to-transparent transition-all duration-300 ease-in-out"
      style={{
        opacity: isLastItemVisible ? 0 : 1,
        visibility: isLastItemVisible ? "hidden" : "visible",
      }}
    >
      <ArrowRightIcon
        className="mr-2 ml-10 h-14 w-14 cursor-pointer rounded-full p-2 transition-all duration-300 ease-in-out hover:bg-red-500"
        disabled={isLastItemVisible}
        onClick={() => scrollNext()}
      >
        Right
      </ArrowRightIcon>
    </div>
  );
}

export default HorizScroll;
