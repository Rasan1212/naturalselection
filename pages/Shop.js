import React from "react";
import Header from "./component/ShopComponent/Header";
import Product from "./component/ShopComponent/Product";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Navbar from "./component/Navbar";
import Logoo from '../styles/logo.png';
import Head from 'next/head';

export async function getServerSideProps() {
  const res = await fetch(
    "https://dashboardnaturalselection.com/api/navbar.php"
  );

  const data = await res.json();
  return {
    props: { cactigors: { data: data.category }, item: { item: data.item }, brand: { data: data.brand } },
    // revalidate: 10,
  };
}
const Shop = ({ cactigors, item, brand }) => {
  return (
    <div className="">
      <Head>
        <title>Natural Selection Brands</title>
        <meta name="description" content="Natural Selection An Easy Way For Shopping" />
        <meta property="og:title" content="Natural Selection Brands" />
        <meta property="og:description" content="Natural Selection An Easy Way For Shopping" />
        <meta property="og:image" content={Logoo} />
      </Head>
      <Navbar cactigors={cactigors} brand={brand} />
      <Header />
      `
      <Product cactigors={cactigors} item={item} brand={brand} />
    </div>
  );
};

export default Shop;
