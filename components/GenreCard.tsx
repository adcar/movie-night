import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function GenreCard({ genre }: Props) {
  const [isVisible, setVisible] = useState(false);

  return (
    <Link href={`/movies?genre=${genre.id}`}>
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
            src={`/thumbnails/${genre.name
              .toLowerCase()
              .replace(/\s/g, "-")}.jpg`}
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
  );
}

interface Props {
  genre: { name: string; id: number };
}
