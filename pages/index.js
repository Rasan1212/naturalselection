import Head from "next/head";

import { Inter } from "@next/font/google";

import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useSelector, useDispatch } from "react-redux";
import { changelang } from "@/StoreRedux/Slice";

import HomeHeader from "./component/HomeHeader";
import Catigory from "./component/Catigory";
import NewProduct from "./component/NewProduct";
import CollecttionSection from "./component/CollecttionSection";
import NewLatest from "./component/NewLatest";
import Navbar from "./component/Navbar";
import { useEffect } from "react";
const inter = Inter({ subsets: ["latin"] });

// bo henanaway data la Api
export async function getServerSideProps() {
  const res = await fetch(
    "https://dashboardnaturalselection.com/api/navbar.php"
  );
  // const coverRes = await fetch(
  //   "https://dashboardnaturalselection.com/api/cover/read.php"
  // );
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = await res.json();
  return {
    props: { cactigors: { data: data.category || [] }, item: { item: data.item || [] }, brand: { data: data.brand || [] }, cover: { data: data.cover || [] }, offer: { data: data.offer } }
    // revalidate: 10,
  };
}

export default function Home({ cactigors, item, brand, cover, offer }) {
  var languae = useSelector((state) => state.cart.language);
  var dispatch = useDispatch();
  useEffect(() => {
    var storelagu = localStorage.getItem('naturalselectionlanguage');
    if (!storelagu || storelagu == null || storelagu == 'null') {
      dispatch(changelang('En'))
      localStorage.setItem('naturalselectionlanguage', 'En');
    } else {
      dispatch(changelang(storelagu))
    }
  })
  return (
    <>
      <Head>
        <title>Natural Selection </title>
        <meta
          name="description"
          content="Natural Selection An Easy Way For Shopping"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main>
        {/*  nav bar boy la hamw page bang krawatawa labar away abet data bo bneryn w la _app.js natwanret functiony getStaticProps bakar bhenret   */}
        <Navbar cactigors={cactigors} brand={brand} />
        {/* Home page  */}
        <>
          <div className="overflow-hidden pt-20">
            <HomeHeader cover={cover} />
            <Catigory cactigors={brand} />
            <NewProduct item={item} />
            <CollecttionSection />
            <NewLatest offer={offer} />
          </div>
        </>
      </main>
    </>
  );
}
