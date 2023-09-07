import React, { useState } from "react";
import Link from "next/link";
import ProductCart from "../ProductCart";
import { useSelector } from "react-redux";

const Product = ({ cactigors, item, brand }) => {
  const [catigory, setCatigory] = useState("1");
  const [filter, setFilter] = useState("1");
  const [branButton, setBrandButton] = useState(true);
  const langg = useSelector((state) => state.cart.language);
  function handleCAtigory(e) {
    setFilter(e);
  }

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/todos").then((response) =>
  //     response.json().then((data) => {
  //       setCart(data);
  //     })
  //   );
  // });
  //   function PaginatedItems({ itemsPerPage }) {

  //     const [itemOffset, setItemOffset] = useState(0);

  //     const endOffset = itemOffset + itemsPerPage;
  //     console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  //     const currentItems = items.slice(itemOffset, endOffset);
  //     const pageCount = Math.ceil(items.length / itemsPerPage);

  //     function  handlePageClick  (event)  {
  //       const newOffset = (event.selected * itemsPerPage) % items.length;
  //       console.log(
  //         `User requested page number ${event.selected}, which is offset ${newOffset}`
  //       );
  //       setItemOffset(newOffset);
  //     };
  // }

  return (
    <div dir={langg == "En" ? "ltr" : "rtl"}>
      <div>
        {" "}
        <div className="flex items-center justify-center  mt-10">
          <h1 className="text-4xl font-bold">{langg == "En" ? "Product" : langg == "Ar" ? "منتج" : "بەرهەم"}</h1>
        </div>
        <div className="flex justify-center  mt-3">
          {" "}
          <div className="h-[1px] w-24 bg-lime-600"></div>
        </div>
        {/* brand filter */}
        <div className="flex items-center justify-center mt-10">
          <div className="grid grid-cols-2   md:grid-cols-3 lg:grid-cols-5  ">
            {brand?.data.map((product, index) => (
              <button
                onClick={() => {
                  setCatigory(product.brand_id);
                  setFilter(0);
                }}
                key={index}
                className={
                  branButton === true
                    ? "hover:bg-lime-600 w-28 py-4 border hover:text-white   cursor-pointer transition-all duration-700 text-sm  flex items-center justify-center "
                    : "hover:bg-lime-600 w-28 py-4 border hover:text-white  cursor-pointer transition-all duration-700 text-sm  flex items-center justify-center  "
                }
              >
                {" "}
                {langg == "En" ? product.brand_name : langg == "Ar" ? product.brand_name_ar : product.brand_name_ku}{" "}
              </button>
            ))}
          </div>
        </div>
        {/* catigory filter */}
        <div className="flex items-center justify-center  mt-10">
          <h1 className="text-3xl font-bold">{langg == "En" ? "Category" : langg == "Ar" ? "فئة" : "جۆر"}</h1>
        </div>
        <div className="flex justify-center  mt-3">
          {" "}
          <div className="h-[1px] w-24 bg-lime-600"></div>
        </div>
        <div className="flex justify-center  items-center m-5">
          {" "}
          <div className="grid grid-cols-2 w-fit  gap-5 md:grid-cols-3 lg:grid-cols-5  ">
            {cactigors?.data
              .filter((cat) => cat.brand_id === catigory)
              .map((product, index) => (
                <>
                  <button
                    key={index}
                    onClick={() => {
                      handleCAtigory(product.category_id);
                    }}
                    className="w-24 border  h-10 mt-5 flex justify-center items-center hover:bg-lime-600  py-4  hover:text-white  cursor-pointer transition-all duration-700 text-sm "
                  >
                    {langg == "En" ? product.category_name : langg == "Ar" ? product.category_name_ar : product.category_name_ku}
                  </button>
                </>
              ))}
          </div>
        </div>
      </div>

      {/* the card list */}
      <div className="pt-32 px-4 md:px-8 lg:px-32 xl:px-40 ">
        <div className="grid lg:grid-cols-4  lg:gap-5   md:grid-cols-2 grid-cols-1  gap-x-5    w-full  items-center">
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
                    img={product.image}
                    index={index}
                    data={product.item_date}
                  />
                </div>
              </>
            ))}
        </div>
      </div>
      {item?.item.filter((cat) => cat.category_id === filter).length > 0 ? <Link href={{
        pathname: `/categoryitem/${filter}`,
      }} className="my-12 flex justify-center text-2xl cursor-pointer font-bold text-lime-700">
        {langg == "En" ? "MORE" : langg == "Ar" ? "أكثر" : "زیاتر"}
      </Link> : <div />}
    </div>
  );
};

export default Product;
