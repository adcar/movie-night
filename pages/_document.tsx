import { Html, Head, Main, NextScript } from "next/document";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Document = () => {
  return (
    <Html>
      <Head />
      <body>
        <Navbar />
        <Main />
        <Footer />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
