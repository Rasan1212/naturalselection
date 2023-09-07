import React, { useState } from "react";
import ProductCart from "./ProductCart";

const BestSale = ({ brand, item }) => {
  const [fi, setFilter] = useState("1");

  const firstEightElements = item?.item?.slice(0, 8);

  return (
    <>
      <div className=" px-4 md:px-8 lg:px-32 xl:px-40 my-20">
        <div className="flex items-center justify-center ">
          <h1 className="text-4xl">Best Sale</h1>
        </div>
        <div className="flex justify-center  mt-3">
          {" "}
          <div className="h-[1px] w-24 bg-red-600"></div>
        </div>
        {/* catigory */}
        <div className="flex items-center justify-center mt-10">
          <div className="grid grid-cols-2   md:grid-cols-3 lg:grid-cols-5  ">
            {brand?.data?.map((product, index) => (
              <>
                <button
                  key={index}
                  onClick={() => {
                    setFilter(product?.brand_id);
                  }}
                  className=" hover:bg-red-600 w-28 py-4 border hover:text-white  cursor-pointer transition-all duration-700 text-sm  flex items-center justify-center "
                >
                  {" "}
                  {product?.brand_name}{" "}
                </button>
              </>
            ))}
          </div>
        </div>
        <div className="grid lg:grid-cols-4  lg:gap-5   md:grid-cols-2 grid-cols-1   gap-x-5    w-full mt-10 items-center">
          {firstEightElements?.filter((cat) => cat.brand_id === fi)
            .map((product, index) => (
              <>
                <div key={index}>
                  <ProductCart
                    id={product?.item_id}
                    title={product?.item_name}
                    price={product?.item_price}
                    img={product?.image}
                    index={index}
                    data={product?.item_date}
                  />
                </div>
              </>
            ))}
        </div>{" "}
      </div>
    </>
  );
};

export default BestSale;



