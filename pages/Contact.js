import Header from "./component/ContactComponenet/Header";
import React from "react";
import Head from 'next/head';
import Navbar from "./component/Navbar";
import { useSelector } from "react-redux";
import Logoo from '../styles/logo.png';


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
const Contact = ({ cactigors, item, brand }) => {
  const langg = useSelector((state) => state.cart.language);
  return (
    <div dir={langg == "En" ? "ltr" : "rtl"}>
      <Head>
        <title>Natural Selection Contact Us</title>
        <meta name="description" content="Natural Selection An Easy Way For Shopping" />
        <meta property="og:title" content="Natural Selection Contact Us" />
        <meta property="og:description" content="Natural Selection An Easy Way For Shopping" />
        <meta property="og:image" content={`https://dashboardnaturalselection.com/api/uploads/logo.png`} />
      </Head>
      <Navbar cactigors={cactigors} brand={brand} />
      <Header />
      <div className="flex justify-center text-lg md:text-2xl lg:text-3xl mt-10  font-semibold">
        {langg == "En" ? "Get In Touch" : langg == "Ar" ? "ابقى على تواصل" : "بە دەستی بێنە"}
      </div>
      <div className="flex justify-center ">
        <div className="h-[2px] w-16 mt-5 bg-lime-600"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 px-4 md:px-8 lg:px-32 xl:px-40 my-20 border-b pb-20">
        <div className="text-center">
          <div className="flex justify-center">
            <i class="fa-solid fa-phone text-lime-600 lg:text-3xl mb-10"></i>
          </div>
          <div>
            {langg == "En" ? "+964 750 491 6034 / +964 783 483 7363" : langg == "Ar" ? "+964 750 491 6034 / +964 783 483 7363" : "+964 750 491 6034 / +964 783 483 7363"}
          </div>
        </div>{" "}
        <div className="text-center">
          <div className="flex justify-center">
            <i class="fa-solid fa-envelope  text-lime-600 lg:text-3xl mb-10"></i>
          </div>
          <div>
            {langg == "En" ? "thaliabeauty0@gmail.com" : langg == "Ar" ? "thaliabeauty0@gmail.com" : "thaliabeauty0@gmail.com"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
