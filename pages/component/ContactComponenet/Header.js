import React from "react";

const Header = () => {
  return (
    <div className="pt-20">
      <div className="h-[250px] bg-no-repeat bg-center bg-cover flex items-center justify-center  shop-header  ">
        <div>
          {" "}
          <div className="text-xl md:text-2xl lg:text-5xl font-semibold text-center">
            CONTACT
          </div>
          <div className="flex justify-center ">
            {" "}
            <div className="flex items-center gap-5 mt-5 text-xs justify-between text-gray-500">
              <p className="hover:text-red-700 transition-all duration-700 cursor-pointer font-semibold">Home</p>
              <p><i className="fa-solid fa-chevron-right"></i></p>
              <p className="hover:text-red-700 transition-all duration-700 cursor-pointer font-semibold" >Contact</p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
