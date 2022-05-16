import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 left-0 z-10 h-20 w-full bg-black/40 backdrop-blur-lg">
      <div className="container mx-auto flex h-full items-center px-5">
        <Link href="/dashboard">
          <a>
            <img
              className="h-4"
              src="/movie_night.svg"
              alt="Movie Night logo"
            />
          </a>
        </Link>
      </div>
    </nav>
  );
}
