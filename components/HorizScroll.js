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
    <div className="flex h-[176px] items-center ">
      <ArrowLeftIcon
        className="mr-10 h-14 w-14 cursor-pointer rounded-full p-2 transition-all duration-300 ease-in-out hover:bg-red-500"
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
    <div className="flex h-[176px] items-center ">
      <ArrowRightIcon
        className="ml-10 h-14 w-14 cursor-pointer rounded-full p-2 transition-all duration-300 ease-in-out hover:bg-red-500"
        disabled={isLastItemVisible}
        onClick={() => scrollNext()}
      >
        Right
      </ArrowRightIcon>
    </div>
  );
}

function Card({ onClick, selected, title, itemId }) {
  const visibility = useContext(VisibilityContext);

  return (
    <div
      onClick={() => onClick(visibility)}
      style={{
        width: "160px",
      }}
      tabIndex={0}
    >
      <div className="card">
        <div>{title}</div>
        <div>visible: {JSON.stringify(!!visibility.isItemVisible(itemId))}</div>
        <div>selected: {JSON.stringify(!!selected)}</div>
      </div>
      <div
        style={{
          height: "200px",
        }}
      />
    </div>
  );
}

export default HorizScroll;
