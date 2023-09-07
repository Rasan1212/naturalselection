import React from "react";
import ProductCart from "./ProductCart";
import { useSelector } from "react-redux";

const NewProduct = ({ item }) => {
  const langg = useSelector((state) => state.cart.language);

  const firstEightElements = item?.item?.slice(Math.max(item.item?.length - 4, 0));
  return (
    <>
      <div className=" px-4  lg:px-32 xl:px-40 mb-40" dir={langg == "En" ? "ltr" : "rtl"}>
        <div className=" lg:text-4xl  font-bold  text-2xl md:text-2xl flex justify-center">
          {" "}
          {langg == "En" ? "NEW PRODUCT" : langg == "Ar" ? "منتج جديد" : "بەرهەمی نوێ"}{" "}
        </div>
        <div className="w-full flex items-center justify-center mt-5">
          {" "}
          <div className="w-20 h-1 rounded-md bg-red-600"></div>
        </div>

        <div className="grid lg:grid-cols-4  lg:gap-5  sm:grid-cols-2   md:grid-cols-3 grid-cols-1   gap-x-5    w-full mt-10 items-center">
          {/* one */}
          {firstEightElements?.map((data, index) => (
            <div key={index}>
              <div >
                <ProductCart
                  title={data.item_name}
                  titlear={data.item_name_ar}
                  titleku={data.item_name_ku}
                  id={data.item_id}
                  price={data.item_price}
                  catygory={data.catygory}
                  des={data.item_description}
                  desar={data.item_description_ar}
                  desku={data.item_description_ku}
                  img={data.image}
                  index={index}
                  quantity={data.quantity}
                  data={data.item_date}
                />
              </div>
            </div>
          ))}
          {/*  */}
        </div>
      </div>
    </>
  );
};

export default NewProduct;
