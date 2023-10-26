import React from "react";

const ServSection = () => {
  return (
    <div className=" px-4 md:px-8 lg:px-32 xl:px-40 my-20  py-10  bg-[#f5f5f5]">
      <div className="grid md:grid-cols-2 lg:grid-cols-4   h-full">
        {/*  */}
        <div className="  flex items-center justify-center w-full  h-40    ">
          <div>
            <div className="flex items-center justify-center">
              {" "}
              <i className="fa-solid fa-truck text-red-600   "></i>
            </div>
            <div className="mt-2 text-center  text-lg">Free Shipping</div>
            <p className="text-center text-sm">
              Free Shipping on order over 99 IQD
            </p>
          </div>
        </div>
        {/*  */}
        <div className="  flex items-center justify-center w-full  h-40    ">
          <div>
            <div className="flex items-center justify-center">
              {" "}
              <i className="fa-solid fa-money-bill  text-red-600 "></i>

            </div>
            <div className="mt-2 text-center  text-lg">Cash On Delivery</div>
            <p className="text-center text-sm">
              The Internet Trend To Repeaty
            </p>
          </div>
        </div>
        {/*  */}
        <div className="  flex items-center justify-center w-full  h-40    ">
          <div>
            <div className="flex items-center justify-center">
              {" "}
              <i className="fa-solid fa-gift text-red-600 "></i>

            </div>
            <div className="mt-2 text-center  text-lg">Gift For All</div>
            <p className="text-center text-sm">
              Receive Gift When Subscribe
            </p>
          </div>
        </div>{" "}
        {/*  */}
        <div className="  flex items-center justify-center w-full  h-40    ">
          <div>
            <div className="flex items-center justify-center">
              {" "}
              <i className="fa-regular fa-clock text-red-600  font-bold"></i>

            </div>
            <div className="mt-2 text-center  text-lg">Opening All Week</div>
            <p className="text-center text-sm">
              6.00 am - 17.00pm
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServSection;
