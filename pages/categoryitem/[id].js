import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";
import ProductCart from '../component/ProductCart';
import Navbar from '../component/Navbar';


export async function getServerSideProps(context) {
    const { params } = context; // params contain route parameters, query contains query string parameters
    const res = await fetch("https://dashboardnaturalselection.com/api/item/itemcategory.php", {
        method: "POST",
        body: JSON.stringify({ category_id: params.id })
    });
    const data = await res.json();
    return {
        props: {
            cactigors: { data: data.category || [] },
            item: { item: data.data || [] },
            brand: { data: data.brand || [] },
            cat: { cat: data.cat }
        }
    };
}


const Categoryitem = ({ cactigors, item, brand, cat }) => {
    const { query } = useRouter();
    const langg = useSelector((state) => state.cart.language);

    return (
        <>
            <Navbar cactigors={cactigors} brand={brand} />
            <div className="pt-32" dir={langg == "En" ? "ltr" : "rtl"}>
                <div className="flex items-center justify-center text-xl md:text-2xl lg:text-4xl font-semibold h-[150px]   bg-cover bg-center bg-no-repeat">
                    <div className="border-b-2  border-lime-400 pb-5  px-10">
                        {" "}
                        {langg == "En" ? cat.cat[0].category_name : langg == "Ar" ? cat.cat[0].category_name_ar : cat.cat[0].category_name_ku}
                        {/* {JSON.stringify(cat)} */}
                    </div>
                </div>

                <div className=" grid lg:grid-cols-4  lg:gap-5   md:grid-cols-2 grid-cols-1  gap-x-5    w-full mt-10 items-center px-4 md:px-8 lg:px-32 xl:px-40 ">
                    {item?.item
                        // .filter((cat) => cat.category_id === query.id)
                        .map((product, index) => (
                            <>
                                <div key={index}>
                                    <ProductCart
                                        id={product.item_id}
                                        title={product.item_name}
                                        titlear={product.item_name_ar}
                                        titleku={product.item_name_ku}
                                        price={product.item_price}
                                        img={product.image}
                                        des={product.item_description}
                                        desar={product.item_description_ar}
                                        desku={product.item_description_ku}
                                        index={index}
                                        data={product.item_date}
                                    />
                                </div>
                            </>
                        ))}
                </div>
            </div>
        </>
    );
}

export default Categoryitem