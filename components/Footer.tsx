export default function Footer() {
  return (
    <footer className="mt-12 flex w-full bg-slate-800">
      <div className="container mx-auto px-5 py-10">
        <h2 className="font-bold uppercase text-slate-300 mb-2">Powered by</h2>
        <img src={"/tmdb_logo.svg"} className="w-28" />
      </div>
    </footer>
  );
}
