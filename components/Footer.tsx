export default function Footer() {
  return (
    <>
      <footer className="mt-12 w-full bg-slate-800">
        <div className="container mx-auto w-full divide-y divide-slate-600 divide-dashed">
          <div className="container mx-auto flex space-x-8 px-5  py-10">
            <div>
              <h2 className="mb-2 font-bold uppercase text-slate-300">
                Powered by
              </h2>
              <a href="https://www.themoviedb.org">
                <img src={"/tmdb_logo.svg"} className="w-28" />
              </a>
            </div>
            <div>
              <h2 className="mb-2 font-bold uppercase text-slate-300">
                Created by
              </h2>
              <h2 className=" text-slate-300">
                <a href="https://acardosi.dev">Alexander Cardosi</a>
              </h2>
            </div>
          </div>
          <div className="py-5 px-5">
            <p>© 2022 Alexander Cardosi</p>
          </div>
        </div>
      </footer>
    </>
  );
}
