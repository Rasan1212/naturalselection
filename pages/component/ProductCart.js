import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import { Autoplay } from "swiper";

const ProductCart = (props) => {
  const langg = useSelector((state) => state.cart.language);
  return (
    <div>
      {" "}
      <div className=" lg:mb-0 mb-10 hover:scale-105 bg-white w-full  group border-x border-gray-300 h-fit  hover:shadow-xl transition-all duration-700  cursor-pointer  ">
        {" "}
        <div className="flex justify-between items-center px-4  ">
          {" "}
          <div className="border  bg-gray-500 text-white px-2 py-1 text-xs">
            {props?.data}
          </div>{" "}
        </div>{" "}
        {/*  */}
        <div className="flex items-center  justify-center w-full ">
          <Swiper
            className="w-full h-full"
            effect="fade"
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            spaceBetween={50}
            modules={[Autoplay]}
          >
            {props.img?.map((product, index) => (
              <SwiperSlide key={index}>
                <div className="flex items-center  h-[300px] mb-2 overflow-hidden">
                  <div
                    style={{
                      backgroundImage: `url(${`https://dashboardnaturalselection.com/api/uploads/${product.item_image_name}`})`,
                    }}
                    className="w-full h-full   bg-cover bg-center bg-no-repeat "
                  ></div>
                </div>
              </SwiperSlide>
            ))}

            { }
          </Swiper>
        </div>
        { }
        {/*  */}
        <div className="text-center">
          {" "}
          <h1 className="px-5">{langg == "En" ? props?.title : langg == "Ar" ? props?.titlear : props?.titleku}</h1>
          <div className="text-red-600 mt-1 font-bold">${props?.price}</div>
        </div>
        <Link
          href={{
            pathname: `/product_detail/${props?.id}`,
          }}
        >
          {/* <Link
          href={{
            pathname: `/ProductDetail`,
            query: {
              id: props?.id,
              img: props?.img,
              catygory: props?.catygory,
              title: props?.title,
              titlear: props?.titlear,
              titleku: props?.titleku,
              price: props?.price,
              index: props?.index,
              quantity: props?.quantity,
              des: props?.des,
              desar: props?.desar,
              desku: props?.desku,
              brand: props?.brand,
            },
          }}
        > */}
          <button className="group-hover:bg-lime-600 h-10 translate-y-10 group-hover:-translate-y-0 text-sm text-white mt-10 group-hover:shadow-2xl w-full flex items-center justify-center transition-all duration-700 ">
            {langg == "En" ? "Detail" : langg == "Ar" ? "التفاصيل" : "ووردەکاری"}{" "}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCart;
