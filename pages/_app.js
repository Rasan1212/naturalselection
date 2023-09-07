// import Navbar from "./component/Navbar";
import "@/styles/globals.css";
import TheFooter from "./component/TheFooter";
import { Provider } from "react-redux";
import store from "@/StoreRedux/Store";
import { useEffect, useState } from "react";

import Router from "next/router";
import Head from "next/head";


// loading function 
export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("finished");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/logo.png" />
      </Head>
      {loading ? (
        <>
          <div className="loader ">
            <div className="outer"></div>
            <div className="middle"></div>
            <div className="inner"></div>
          </div>
        </>
      ) : (
        <Provider store={store}>
          <Component {...pageProps} />
          <TheFooter />
        </Provider>
      )}
    </>
  );
}

