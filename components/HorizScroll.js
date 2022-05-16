import { useState, useContext } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import MovieCard from "./MovieCard";

const getItems = () =>
  Array(20)
    .fill(0)
    .map((_, ind) => ({ id: `element-${ind}` }));

function HorizScroll(props) {
  const [items, setItems] = useState(props.items);
  const [selected, setSelected] = useState([]);
  const [position, setPosition] = useState(0);

  const isItemSelected = (id) => !!selected.find((el) => el === id);

  const handleClick =
    (id) =>
    ({ getItemById, scrollToItem }) => {
      const itemSelected = isItemSelected(id);

      setSelected((currentSelected) =>
        itemSelected
          ? currentSelected.filter((el) => el !== id)
          : currentSelected.concat(id)
      );
    };

  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {items.map((movie) => (
        <MovieCard movie={movie} itemId={movie.id} key={movie.id} />
        // <Card
        //   itemId={id} // NOTE: itemId is required for track items
        //   title={id}
        //   key={id}
        //   onClick={handleClick(id)}
        //   selected={isItemSelected(id)}
        // />
      ))}
    </ScrollMenu>
  );
}

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

  return (
    <div
      className="absolute top-0 left-0 z-50 flex h-[176px] items-center bg-gradient-to-r from-slate-900 to-transparent transition-all duration-300 ease-in-out"
      style={{
        opacity: isFirstItemVisible ? 0 : 1,
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
      className="absolute top-0 right-0 z-50 flex h-[176px] items-center bg-gradient-to-l from-slate-900 to-transparent transition-all duration-300 ease-in-out"
      style={{
        opacity: isLastItemVisible ? 0 : 1,
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
