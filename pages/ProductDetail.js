import React, { useEffect, useRef, useState } from "react";

// import { addInCart, send } from "@/Redux/Slice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Head from 'next/head';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper";

import { addInCart, send } from "@/StoreRedux/Slice";
import Navbar from "./component/Navbar";
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

const ProductDetail = ({ cactigors, item, brand }) => {
  const { query } = useRouter();
  const [image, setImage] = useState();
  const items = useSelector((state) => state.cart.value);
  const langg = useSelector((state) => state.cart.language);


  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(send({ amount: 1, item_id: query.id, item_price: query.price }));
    dispatch(
      addInCart({
        id: query.id,
        img: `https://dashboardnaturalselection.com/api/uploads/${image}`,
        catygory: query.catygory,
        title: query.title,
        titlear: query.titlear,
        titleku: query.titleku,
        price: query.price,
        index: query.index,
        quntity: 1,
        des: query.des,
        desar: query.desar,
        desku: query.desku,
      })
    );
  };

  useEffect(() => {
    {
      item.item
        .filter((cat) => cat.item_id === query.id)
        .map((product, index) =>
          product.image.map((product) => setImage(product.item_image_name))
        );
    }
  }, []);

  return (
    //  am page detaly productakany tyaya
    <>
      <Navbar cactigors={cactigors} brand={brand} />
      <div className="px-4 md:px-8 lg:px-32 xl:px-40 pt-44 mb-40" dir={langg == "En" ? "ltr" : "rtl"}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className=" w-full ">
            <div>
              <div className="flex items-center justify-center w-full">
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                  }}
                  className="flex items-center justify-center w-full"
                  spaceBetween={10}
                  navigation={true}
                  thumbs={{
                    swiper:
                      thumbsSwiper && !thumbsSwiper.destroyed
                        ? thumbsSwiper
                        : null,
                  }}
                  modules={[FreeMode, Navigation, Thumbs]}
                >
                  {item.item
                    .filter((cat) => cat.item_id === query.id)
                    .map((product, index) =>
                      product.image.map((product) => (
                        <>
                          <SwiperSlide>
                            <div
                              style={{
                                backgroundImage: `url(${`https://dashboardnaturalselection.com/api/uploads/${product.item_image_name}`})`,
                              }}
                              className=" w-full  h-[400px] border    hover:scale-105 bg-contain bg-center bg-no-repeat transition-all duration-700 cursor-pointer "
                            ></div>
                          </SwiperSlide>
                        </>
                      ))
                    )}
                </Swiper>
              </div>
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
              >
                {item.item
                  .filter((cat) => cat.item_id === query.id)
                  .map((product, index) =>
                    product.image.map((product) => (
                      <>
                        <SwiperSlide>
                          <div
                            style={{
                              backgroundImage: `url(${`https://dashboardnaturalselection.com/api/uploads/${product.item_image_name}`})`,
                            }}
                            className=" md:w-[100px] w-[70px] border h-[70px] mt-10 md:h-[100px] hover:scale-105 bg-contain bg-center bg-no-repeat transition-all duration-700 cursor-pointer "
                          ></div>
                        </SwiperSlide>
                      </>
                    ))
                  )}
              </Swiper>
            </div>
          </div>
          <div className="mt-10   text-lg  ">
            <div className="w-full">
              <div className="flex items-center justify-between mb-10">
                <div className="font-bold">{langg == "En" ? " Name : " : langg == "Ar" ? "أسم : " : "ناو : "}</div>
                <div>{langg == "En" ? query.title : langg == "Ar" ? query.titlear : query.titleku}</div>
              </div>

              <div className="flex items-center justify-between mb-10">
                <div className="font-bold">{langg == "En" ? "Price : " : langg == "Ar" ? "سعر : " : "نرخ : "}</div>
                <div>{query.price}</div>
              </div>
              <div className="flex items-center justify-between mb-20">
                <div className="font-bold">{langg == "En" ? "Description : " : langg == "Ar" ? "وصف : " : "وەسف : "}</div>
                <div>{langg == "En" ? query.des : langg == "Ar" ? query.desar : query.desku}</div>
              </div>

              <button
                onClick={handleAdd}
                className="bg-gray-900 h-10  text-sm text-white mt-10 shadow-2xl w-full flex items-center justify-center transition-all duration-700 "
              >
                {langg == "En" ? "Order" : langg == "Ar" ? "طلب" : "داواکردن"}{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
