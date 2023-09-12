import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const TheFooter = () => {
  const router = useRouter();
  const currentRoute = router.pathname;
  const langg = useSelector((state) => state.cart.language);

  return (
    <div className=" mt-10" dir={langg == "En" ? "ltr" : "rtl"}>
      <div className="md:flex items-center justify-between py-10 bg-[#f5f5f5] px-4 md:px-8 lg:px-32 xl:px-40 gap-20">
        <div
          className="text-lg md:text-xl lg:text-2xl mb-2   lg:mb-0
        "
        >
          {langg == "En" ? "FOLLOW US ON SOCIAL MEDIA" : langg == "Ar" ? "تابعنا على وسائل التواصل الإجتماعي" : "لە سۆشیال میدیا فۆڵۆومان بکەن"}
        </div>

        <div className="flex items-center justify-center lg:mb-0  gap-8 mb-2 ">
          <a href="https://www.facebook.com/profile.php?id=100078158117547"><i className="fa-brands fa-facebook-f hover:text-lime-600 transition-all duration-700 cursor-pointer"></i></a>
          <a href="https://www.instagram.com/thaliabeauty.iq/"><i className="fa-brands fa-instagram hover:text-lime-600 transition-all duration-700 cursor-pointer"></i></a>
          <a href="https://www.tiktok.com/@thalia_natural_beauty"><i className="fa-brands fa-tiktok hover:text-lime-600 transition-all duration-700 cursor-pointer"></i></a>
        </div>
      </div>

      {/* second part in footer */}

      <div className="px-4 md:px-8 lg:px-32 xl:px-40 py-20 border-b">
        <div className="sm:flex  items-center justify-between gap-20  text-xs font-">
          <div className="mb-10  lg:flex  gap-10 text-xl lg:mb-0">
            <Link
              href="/"
              className={currentRoute === "/" ? "mb-5 text-lime-600" : " mb-5"}
            >
              <p className="hover:text-lime-700 mb-5 transition-all duration-300 cursor-pointer  ">
                {langg == "En" ? "Home" : langg == "Ar" ? "رئيسي" : "سەرەکی"}
              </p>
            </Link>
            <Link
              href="/Shop"
              className={
                currentRoute === "/Shop" ? "mb-5 text-lime-600" : " mb-5"
              }
            >
              <p className="hover:text-lime-700 mb-5 transition-all duration-300 cursor-pointer  ">
                {langg == "En" ? "BRAND" : langg == "Ar" ? "ماركة" : "براند"}
              </p>
            </Link>
            <Link
              href="/Contact"
              className={
                currentRoute === "/Contact" ? "mb-5 text-lime-600" : " mb-5"
              }
            >
              <p className="hover:text-lime-700 mb-5 transition-all duration-300 cursor-pointer  ">
                {langg == "En" ? "Contact Us" : langg == "Ar" ? "اتصال" : "پەیوەندی"}
              </p>
            </Link>
            <Link
              href="/Login"
              className={
                currentRoute === "/Login" ? "mb-5 text-lime-600" : " mb-5"
              }
            >
              <p className="hover:text-lime-700 mb-5 transition-all duration-300 cursor-pointer   ">
                {langg == "En" ? "Login / Register" : langg == "Ar" ? "دخولتسجيل" : "چوونەژوورەوە / ناو تۆمارکردن"}
              </p>
            </Link>
            {/* Login */}
          </div>
          {/* <div className="mb-10 lg:mb-0">
            <p className="mb-5"> Term of service </p>
            <p className="mb-5"> Privacy Policy </p>
            <p className="mb-5"> Returns </p>
            <p className="mb-5"> FAQs </p>
          </div>{" "}
          <div className="mb-10 lg:mb-0">
            <p className="mb-5"> Your checkout </p>
            <p className="mb-5"> Your Cart </p>
            <p className="mb-5"> Wishlist items </p>
            <p className="mb-5"> Blog </p>
          </div> */}
          <div className=" mb-10 lg:mb-0">
            <Link href="/">
              <div className="flex items-center justify-center">
                <div className="logo h-[100px] w-[100px] bg-cover bg-center mr-2"></div>
                <div className="   text-xl lg:flex text-lime-700 -ml-5 ">
                  Natural Selection
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="h-20 flex items-center justify-center text-xs lg:text-sm">
        Natural Selection &copy;2023{" "}
        <div className="logo h-[30px] w-[30px] bg-cover bg-center mr-2"></div>
      </div>
    </div>
  );
};

export default TheFooter;
