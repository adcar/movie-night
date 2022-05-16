import "../styles/globals.css";
import "animate.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress color="#ef4444" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
