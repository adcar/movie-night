import { Html, Head, Main, NextScript } from "next/document";
import Navbar from "../components/Navbar";

const Document = () => {
  return (
    <Html>
      <Head />
      <body>
        <Navbar />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
