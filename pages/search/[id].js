import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../component/Navbar';
import ProductCart from '../component/ProductCart';

export async function getServerSideProps(context) {
    const { params } = context; // params contain route parameters, query contains query string parameters
    const res = await fetch("https://dashboardnaturalselection.com/api/item/search.php", {
        method: "POST",
        body: JSON.stringify({ text: params.id })
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

const Search = ({ cactigors, item, brand }) => {
    const router = useRouter();
    const { id } = router.query;

    const [iitems, setiitems] = useState(item.item);
    const [tess, settess] = useState(item.item);

    const sortitem = (val) => {
        if (val === "newest") {
            setiitems(item.item);
        } else if (val === "high") {
            const tt = iitems;
            const itemhighsort = tt.slice(0).sort((a, b) => {
                const priceA = parseFloat(a.item_price);
                const priceB = parseFloat(b.item_price);
                return priceB - priceA;
            });
            setiitems(itemhighsort);
        } else if (val === "low") {
            const tt = iitems;
            const itemhighsort = tt.slice(0).sort((a, b) => {
                const priceA = parseFloat(a.item_price);
                const priceB = parseFloat(b.item_price);
                return priceA - priceB;
            });
            setiitems(itemhighsort);
        } else if (val === "old") {
            const mapReverse1 = item.item
                .slice(0)
                .reverse()
                .map(element => {
                    return element;
                });
            setiitems(mapReverse1);
        }
    }

    return (
        <div className='min-h-[100vh]'>
            <Head>
                <title>Results of : {id}</title>
                <meta name="description" content={`Results of :` + id} />
                <meta property="og:title" content={`Results of :` + id} />
                <meta property="og:description" content={`Results of :` + id} />
                <meta property="og:image" content={`https://dashboardnaturalselection.com/api/uploads/${items[0].image[0].item_image_name}`} />
            </Head>
            <Navbar cactigors={cactigors} brand={brand} />
            <div className='pt-48'>
                <div className="text-xl md:text-2xl lg:text-5xl font-semibold text-center">
                    {id}
                </div>
            </div>
            <div>
                <div className="px-10 flex justify-between">
                    <div className='text-lg md:text-lg lg:text-lg font-semibold'>
                        Total Found Items : {iitems.length}
                    </div>
                    <div >
                        <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " onChange={(val) => { sortitem(val.target.value) }}>
                            <option value="newest">Newest</option>
                            <option value="high">High Price</option>
                            <option value="low">Low Price</option>
                            <option value="old">Oldest</option>
                        </select>
                    </div>
                </div>
            </div>
            <div>
                <div className="pt-32 px-4 md:px-8 lg:px-32 xl:px-40 ">
                    <div className="grid lg:grid-cols-4  lg:gap-5   md:grid-cols-2 grid-cols-1  gap-x-5    w-full  items-center">
                        {iitems
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
                                            index={index}
                                            des={product.item_description}
                                            desar={product.item_description_ar}
                                            desku={product.item_description_ku}
                                            data={product.item_date}
                                        />
                                    </div>
                                </>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
