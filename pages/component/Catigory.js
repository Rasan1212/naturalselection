import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

const Catigory = ({ cactigors }) => {
  const langg = useSelector((state) => state.cart.language);
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <div className=" lg:text-4xl mt-10 font-bold  text-2xl md:text-2xl flex justify-center">
        {" "}
        {langg == "En" ? "BRANDS" : langg == "Ar" ? "ماركة" : "براند"}
      </div>
      <div className="w-full flex items-center justify-center mt-5" >
        {" "}
        <div className="w-20 h-1 rounded-md bg-red-600"></div>
      </div>
      <div className="px-4 md:px-8 lg:px-32 xl:px-40 my-20   grid-cols-1 grid lg:grid-cols-3 gap-10 " dir={langg == "En" ? "ltr" : "rtl"}>
        <div
          style={{
            backgroundImage: `url(${`https://dashboardnaturalselection.com/api/uploads/${cactigors?.data[0]?.brand_image}`})`,
          }}
          data-aos="fade-right"
          data-aos-duration="1000"
          className="lg:h-[470px]  h-[235px] w-full bg-black     bg-center bg-no-repeat  flex items-center justify-center cursor-pointer bg-cover group hover:bg-black border relative "
        >
          <h1> </h1>
          <div className="absolute  top-0 right-0 bg-white bg-opacity-0  hover:bg-opacity-20 transition-all duration-700  h-full w-full flex items-center justify-center">
            <Link
              href={{
                pathname: "/CategoryPage",
                query: {
                  id: cactigors?.data[0]?.brand_id,
                  name: cactigors?.data[0]?.brand_name,
                  data: cactigors?.data[0],
                },
              }}
            >
              <button className="px-10 py-2 border text-sm hover:bg-lime-600 bg-white  hover:text-white transition-all duration-700  ">
                {" "}
                {langg == "En" ? cactigors?.data[0]?.brand_name : langg == "Ar" ? cactigors?.data[0]?.brand_name_ar : cactigors?.data[0]?.brand_name_ku}
                {/* {data.data[0].category_name} */}
                {/* Man */}
              </button>
            </Link>
          </div>
        </div>
        {/*  */}
        <div className="h-[470px] grid-rows-2 grid gap-10  w-full">
          <div
            style={{
              backgroundImage: `url(${`https://dashboardnaturalselection.com/api/uploads/${cactigors?.data[1]?.brand_image}`})`,
            }}
            data-aos="fade-down"
            data-aos-duration="1000"
            className="w-full h-full bg-black border kids-catigory relative hover:cursor-pointer  bg-center bg-no-repeat bg-cover flex items-center justify-center "
          >
            <div className="absolute  top-0 right-0 bg-white bg-opacity-0  hover:bg-opacity-20 transition-all duration-700  h-full w-full flex items-center justify-center">
              <Link
                href={{
                  pathname: "/CategoryPage",
                  query: {
                    id: cactigors?.data[1]?.brand_id,
                    name: cactigors?.data[1]?.brand_name,
                  },
                }}
              >
                <button className="px-10 py-2 border text-sm hover:bg-lime-600 bg-white  hover:text-white transition-all duration-700  ">
                  {" "}
                  {langg == "En" ? cactigors?.data[1]?.brand_name : langg == "Ar" ? cactigors?.data[1]?.brand_name_ar : cactigors?.data[1]?.brand_name_ku}
                </button>
              </Link>
            </div>
          </div>
          <div
            style={{
              backgroundImage: `url(${`https://dashboardnaturalselection.com/api/uploads/${cactigors?.data[2]?.brand_image}`})`,
            }}
            data-aos="fade-up"
            data-aos-duration="1000"
            className="w-full h-full bg-black border exs-catigory  relative hover:cursor-pointer bg-center bg-no-repeat bg-cover  flex items-center justify-center "
          >
            <div className="absolute  top-0 right-0 bg-white bg-opacity-0  hover:bg-opacity-20 transition-all duration-700  h-full w-full flex items-center justify-center">
              <Link
                href={{
                  pathname: "/CategoryPage",
                  query: {
                    id: cactigors?.data[2]?.brand_id,
                    name: cactigors?.data[2]?.brand_name,
                  },
                }}
              >
                <button className="px-10 py-2 border text-sm hover:bg-lime-600 bg-white   hover:text-white transition-all duration-700  ">
                  {" "}
                  {langg == "En" ? cactigors?.data[2]?.brand_name : langg == "Ar" ? cactigors?.data[2]?.brand_name_ar : cactigors?.data[2]?.brand_name_ku}
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/*  */}
        <div
          style={{
            backgroundImage: `url(${`https://dashboardnaturalselection.com/api/uploads/${cactigors?.data[3]?.brand_image}`})`,
          }}
          data-aos="fade-left"
          data-aos-duration="1000"
          className="lg:h-[470px] h-[235px]  w-full bg-black women-catigory  border  bg-no-repeat  bg-center flex items-center justify-center cursor-pointer bg-cover group hover:bg-black relative "
        >
          <div className="absolute  top-0 right-0 bg-white bg-opacity-0  hover:bg-opacity-20 transition-all duration-700  h-full w-full flex items-center justify-center">
            <Link
              href={{
                pathname: "/CategoryPage",
                query: {
                  id: cactigors?.data[3]?.brand_id,
                  name: cactigors?.data[3]?.brand_name,
                },
              }}
            >
              <button className="px-10 py-2 border  text-sm hover:bg-lime-600 bg-white  hover:text-white transition-all duration-700  ">
                {" "}
                {langg == "En" ? cactigors?.data[3]?.brand_name : langg == "Ar" ? cactigors?.data[3]?.brand_name_ar : cactigors?.data[3]?.brand_name_ku}
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center -mt-5 mb-20 text-sm">
        <Link
          href={{
            pathname: "/Shop",
          }}
        >
          {" "}
          <button className="px-20 border-b pb-10 hover:text-red-600 transition-all duration-700  flex justify-between items-center group  gap-5">
            {" "}
            <p>SEE ALL BRANDS</p>
            <i className="fa-solid fa-chevron-right   transition-all  duration-700  group-hover:translate-x-10 "></i>
          </button>
        </Link>
      </div>
    </>
  );
};

export default Catigory;

