import ProductCart from "./component/ProductCart";
import { useRouter } from "next/router";
import Head from 'next/head';
import { useState } from "react";
import Navbar from "./component/Navbar";
import { useSelector } from "react-redux";

//  Api Data
export async function getServerSideProps() {
  const res = await fetch(
    "https://dashboardnaturalselection.com/api/navbar.php"
  );

  const data = await res.json();
  return {
    props: { cactigors: { data: data.category }, item: { item: data.item }, brand: { data: data.brand } },
    //  revalidate: 10, boya danrawa bo 10 chrka jarek data refresh bkatawa
    // revalidate: 10,
  };
}

const CategoryPage = ({ cactigors, item, brand }) => {
  const { query } = useRouter();
  const [filter, setFilter] = useState();
  const langg = useSelector((state) => state.cart.language);
  function handleCAtigory(e) {
    setFilter(e);
  }

  return (

    //  
    <>
      <Navbar cactigors={cactigors} brand={brand} />
      <div className="pt-24" dir={langg == "En" ? "ltr" : "rtl"}>
        <div className="flex items-center justify-center text-xl md:text-2xl lg:text-4xl font-semibold h-[150px]  shop-header bg-cover bg-center bg-no-repeat">
          {query.name}
        </div>
        <div className="flex justify-center items-center my-10">
          {cactigors?.data
            .filter((cat) => cat.brand_id === query.id)
            .map((product, index) => (
              <>
                <button
                  key={index}
                  onClick={() => {
                    handleCAtigory(product.category_id);
                  }}
                  className="w-24 border-b  h-10 mt-5 flex justify-center items-center hover:bg-red-600  py-4  hover:text-white  cursor-pointer transition-all duration-700 text-sm "
                >
                  {langg == "En" ? product.category_name : langg == "Ar" ? product.category_name_ar : product.category_name_ku}
                </button>
              </>
            ))}
        </div>
        <div className=" grid lg:grid-cols-4  lg:gap-5   md:grid-cols-2 grid-cols-1  gap-x-5    w-full mt-10 items-center px-4 md:px-8 lg:px-32 xl:px-40 ">
          {item?.item
            .filter((cat) => cat.category_id === filter)
            .map((product, index) => (
              <>
                <div key={index}>
                  <ProductCart
                    id={product.item_id}
                    title={product.item_name}
                    titlear={product.item_name_ar}
                    titleku={product.item_name_ku}
                    price={product.item_price}
                    des={product.item_description}
                    desar={product.item_description_ar}
                    desku={product.item_description_ku}
                    img={product.image}
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
};

export default CategoryPage;
