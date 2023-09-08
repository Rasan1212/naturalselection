import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Head from 'next/head';
import { Swiper, SwiperSlide } from "swiper/react";
import Navbar from '../component/Navbar';
import { FreeMode, Navigation, Thumbs } from "swiper";
import { addInCart, send } from "@/StoreRedux/Slice";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";



export async function getServerSideProps(context) {
    const { params } = context; // params contain route parameters, query contains query string parameters
    const res = await fetch("https://dashboardnaturalselection.com/api/item/readone.php", {
        method: "POST",
        body: JSON.stringify({ item_id: params.id })
    });
    const data = await res.json();
    return {
        props: {
            cactigors: { data: data.category || [] },
            item: { item: data.data || [] },
            brand: { data: data.brand || [] }
        }
    };
}
const Item_Detail = ({ cactigors, item, brand }) => {
    const { query } = useRouter();
    const [image, setImage] = useState();
    const [items, setitems] = useState(item.item);
    const langg = useSelector((state) => state.cart.language);


    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        {
            setImage(items[0].image[0].item_image_name);
        }
    }, []);

    const handleAdd = (item_data) => {
        dispatch(send({ amount: 1, item_id: item_data.item_id, item_price: item_data.item_price }));
        dispatch(
            addInCart({
                id: item_data.item_id,
                img: `https://dashboardnaturalselection.com/api/uploads/${image}`,
                catygory: item_data.category_name,
                catygoryar: item_data.category_name_ar,
                catygoryku: item_data.category_name_ku,
                title: item_data.item_name,
                titlear: item_data.item_name_ar,
                titleku: item_data.item_name_ku,
                price: item_data.item_price,
                index: item_data.item_id,
                quntity: 1,
                des: item_data.item_description,
                desar: item_data.item_description_ar,
                desku: item_data.item_description_ku,
            })
        );
    };
    return (
        <>
            <Head>
                <title>{items[0].item_name}</title>
                <meta name="description" content={items[0].item_description} />
                <meta property="og:title" content={items[0].item_name} />
                <meta property="og:description" content={items[0].item_description} />
                <meta property="og:image" content={`https://dashboardnaturalselection.com/api/uploads/${items[0].image[0].item_image_name}`} />
            </Head>
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
                                    {items
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
                                {items
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
                        <div className='w-full flex justify-center items-center text-center text-xl text-lime-600'>
                            {langg == "En" ? items[0].item_offer : langg == "Ar" ? items[0].item_offer_ar : items[0].item_offer_ku}
                        </div>
                        <div className="w-full">
                            <div className="flex items-center justify-between mb-10 mt-16">
                                <div className="font-bold">{langg == "En" ? " Name : " : langg == "Ar" ? "أسم : " : "ناو : "}</div>
                                <div>{langg == "En" ? items[0].item_name : langg == "Ar" ? items[0].item_name_ar : items[0].item_name_ku}</div>
                            </div>

                            <div className="flex items-center justify-between mb-10">
                                <div className="font-bold">{langg == "En" ? "Price : " : langg == "Ar" ? "سعر : " : "نرخ : "}</div>
                                <div>{items[0].item_price}</div>
                            </div>
                            <div className="flex items-center justify-between mb-20">
                                <div className="font-bold">{langg == "En" ? "Description : " : langg == "Ar" ? "وصف : " : "وەسف : "}</div>
                                <div>{langg == "En" ? items[0].item_description : langg == "Ar" ? items[0].item_description_ar : items[0].item_description_ku}</div>
                            </div>

                            <button
                                onClick={() => { handleAdd(items[0]) }}
                                className="bg-gray-900 h-10  text-sm text-white mt-10 shadow-2xl w-full flex items-center justify-center transition-all duration-700 "
                            >
                                {langg == "En" ? "Order" : langg == "Ar" ? "طلب" : "داواکردن"}{" "}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Item_Detail