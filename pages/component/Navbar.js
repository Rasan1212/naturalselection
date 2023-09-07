import Link from "next/link";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changelang } from "@/StoreRedux/Slice";
import { useRouter } from "next/router";
import { HiArrowSmDown } from "react-icons/hi";
// for active link and route

const Navbar = ({ cactigors, brand }) => {
  const [menu, setMenu] = useState(false);
  const [brandMenu, setBrand] = useState(false);
  const [catigory, setCatigory] = useState("1");
  const [filter, setFilter] = useState("1");
  const [branButton, setBrandButton] = useState(true);
  const [langtoggle, setlangtoggle] = useState(false);
  const [search, setsearch] = useState('');
  function handleCAtigory(e) {
    if (e === filter) {
      setFilter("1");
    } else {
      setFilter(e);
    }
    // setCatigory;
  }
  const dispatch = useDispatch();

  const router = useRouter();
  const currentRoute = router.pathname;
  const items = useSelector((state) => state.cart.value);
  const langg = useSelector((state) => state.cart.language);

  return (
    <div className="h-24 border-b bg-white fixed z-10 w-full" dir={langg == "En" ? "ltr" : "rtl"}>
      <div className="px-4 md:px-8 lg:px-32 xl:px-40 font-bold justify-between  flex items-center" >
        <Link href="/">
          <div className="flex items-center justify-center">
            <div className="logo h-[70px] w-[70px]  lg:h-[100px] lg:w-[100px] bg-cover bg-center"></div>
            <div className="hidden lg:flex text-lime-700 -ml-5 ">
              Natural Selection
            </div>
          </div>
        </Link>
        {/* pc nabar  */}
        <div className="flex h-full items-center justify-center gap-10">
          <div className=" items-center gap-10  font-normal  hidden lg:flex   ">
            <Link
              href="/"
              className={
                currentRoute === "/"
                  ? "flex   items-center justify-center gap-2 group text-lime-600"
                  : " flex   items-center justify-center gap-2 group"
              }
            >
              <p className="group-hover:text-lime-700  transition-all duration-300 cursor-pointer  ">
                {langg == 'En' ? "HOME" : langg == 'Ar' ? "رئيسي" : "سەرەکی"}
              </p>
            </Link>
            <div className="dropdown">
              <Link
                href="/Shop"
                className={
                  currentRoute === "/Shop"
                    ? "flex  dropbtn  items-center justify-center gap-2 group text-lime-600"
                    : " flex    items-center justify-center gap-2 group "
                }
              >
                <p className="  group-hover:text-lime-700  transition-all duration-300 cursor-pointer ">
                  {langg == 'En' ? "BRAND" : langg == 'Ar' ? "ماركة" : "براند"}
                </p>
              </Link>
              <div className="dropdown-content top-10 text-white text-xs ">
                <div
                  onClick={() => {
                    setBrand(true);
                  }}
                  className="  w-[550px]  grid grid-cols-3  gap-10  relative px-4  pb-10 bg-gray-700 rounded-md py-5 z-10"
                >
                  <i className="fa-solid fa-caret-up absolute -top-[24px] text-gray-700 left-5 text-5xl"></i>

                  {brand?.data.map((product, index) => (
                    <>
                      <div className="w-full">
                        <button
                          key={index}
                          className="  w-full py-4 -mt-2  hover:text-white  cursor-pointer transition-all duration-700 text-sm border-b  flex items-center justify-center  "
                        >
                          {" "}
                          {langg == "En" ? product.brand_name : langg == "Ar" ? product.brand_name_ar : product.brand_name_ku}{" "}
                        </button>
                        <div className="grid grid-cols-1 w-full ">
                          {" "}
                          {cactigors?.data
                            .filter((cat) => cat.brand_id === product.brand_id)
                            .map((product, index) => (
                              <>
                                <div className="w-full">
                                  <Link
                                    href={{
                                      pathname: `/categoryitem/${product.category_id}`,
                                    }}
                                  >
                                    <button
                                      key={index}
                                      className="  w-full py-4  hover:text-lime-500  cursor-pointer transition-all duration-700 text-xs   flex items-center justify-center  "
                                    >
                                      {langg == "En" ? product.category_name : langg == "Ar" ? product.category_name_ar : product.category_name_ku}
                                    </button>
                                  </Link>
                                </div>
                              </>
                            ))}
                        </div>
                        <div></div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
            <Link
              href="/Login"
              className={
                currentRoute === "/Login"
                  ? "flex   items-center justify-center gap-2 group text-lime-600"
                  : " flex   items-center justify-center gap-2 group"
              }
            >
              <p className="group-hover:text-lime-700   transition-all duration-300 cursor-pointer ">
                {langg == 'En' ? "LOGIN" : langg == 'Ar' ? "تسجيل الدخول" : "چونەژورەوە"}
              </p>
            </Link>
            <Link
              href="/Contact"
              className={
                currentRoute === "/Contact"
                  ? "flex   items-center justify-center gap-2 group text-lime-600"
                  : " flex   items-center justify-center gap-2 group"
              }
            >
              <p className="group-hover:text-lime-700  transition-all duration-300 cursor-pointer ">
                {langg == 'En' ? "CONTACT" : langg == 'Ar' ? "اتصال" : "پەیوەندی"}
              </p>
            </Link>
          </div>
          <div className=" flex items-center justify-center gap-5 text-xs">
            <Link href="/User">
              <div
                className={
                  currentRoute === "/User"
                    ? "flex justify-center items-center rounded-full w-10 h-10 bg-gray-100 text-lime-600 cursor-pointer transition-all duration-300 "
                    : " flex justify-center items-center rounded-full w-10 h-10 hover:bg-gray-100 hover:text-lime-600 cursor-pointer transition-all duration-300 "
                }
              >
                <i className="fa-solid fa-user  "></i>{" "}
              </div>
            </Link>
            <Link
              onClick={() => {
                setMenu(false);
              }}
              href="/Cart"
              className={
                currentRoute === "/Cart"
                  ? "flex   items-center justify-center gap-2 group  text-lime-600 rounded-full w-10 h-10 bg-gray-100 "
                  : " flex   items-center justify-center gap-2 group  w-10 h-10"
              }
            // flex justify-center items-center w-10 h-10  hover:text-lime-600 cursor-pointer  relative transition-all duration-300  "
            >
              <div
                onClick={() => {
                  setMenu(false);
                }}
                className={
                  items.length > 0
                    ? "flex justify-center items-center w-10 h-10  bg-gray-100 rounded-full hover:text-lime-600 cursor-pointer  relative transition-all duration-300  "
                    : "flex justify-center items-center  w-10 h-10 hover:text-lime-600 cursor-pointer  relative transition-all duration-300  "
                }
              >
                {items.length > 0 && (
                  <>
                    <div className="absolute -top-1 -right-1 bg-red-600 text-[10px]  text-white  w-5 rounded-full h-5 flex items-center justify-center  font-normal">
                      {" "}
                      <p>{items.length}</p>
                    </div>
                  </>
                )}

                <i className="fa-solid fa-cart-shopping"></i>
              </div>
            </Link>
          </div>{" "}
          <div className="hidden lg:block">
            <button
              onClick={() => setlangtoggle(!langtoggle)}
              type="button"
              className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {langg}
              <HiArrowSmDown size={18} />
            </button>
            <div className={langtoggle ? "fixed w-16 rounded-md bg-white flex-col items-center py-1" : "hidden w-16 rounded-md bg-white flex-col items-center py-1"}>
              <div className="w-full flex justify-center my-1 hover:bg-slate-300 cursor-pointer" onClick={() => { dispatch(changelang('En')); setlangtoggle(false); }}>En</div>
              <div className="w-full flex justify-center my-1 hover:bg-slate-300 cursor-pointer" onClick={() => { dispatch(changelang('Ar')); setlangtoggle(false); }}>Ar</div>
              <div className="w-full flex justify-center my-1 hover:bg-slate-300 cursor-pointer" onClick={() => { dispatch(changelang('Ku')); setlangtoggle(false); }}>Ku</div>
            </div>
          </div>
        </div>

        {/* menu in mobile  */}
        {menu == false && (
          <div
            className="lg:hidden"
            onClick={() => {
              setMenu(!menu);
            }}
          >
            <i className="fa-solid fa-bars"></i>
          </div>
        )}
        {menu && (
          <div
            className="lg:hidden"
            onClick={() => {
              setMenu(!menu);
              setBrand(false);
            }}
          >
            <i className="fa-solid fa-x"></i>
          </div>
        )}

        <div
          className={
            menu
              ? "absolute h-screen text-sm top-16 bg-slate-100 w-full md:w-1/2  p-4 z-10  -translate-x-[1px] right-0 duration-700  "
              : " -right-[2000px]  h-screen absolute top-24 bg-slate-100 w-full md:w-1/2 -translate-x-[1px] p-4 z-10 duration-700"
          }
        >
          <div className="mb-16">
            <button
              onClick={() => setlangtoggle(!langtoggle)}
              type="button"
              className="inline-flex items-center justify-between w-full rounded-md border border-gray-300 shadow-sm px-6 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {langg}
              <HiArrowSmDown size={18} />
            </button>
            <div className={langtoggle ? "fixed w-11/12 rounded-md bg-white flex-col items-center py-1" : "hidden w-16 rounded-md bg-white flex-col items-center py-1"}>
              <div className="w-full flex justify-center my-1 py-2 hover:bg-slate-300 cursor-pointer" onClick={() => { dispatch(changelang('En')); setlangtoggle(false); }}>En</div>
              <div className="w-full flex justify-center my-1 py-2 hover:bg-slate-300 cursor-pointer" onClick={() => { dispatch(changelang('Ar')); setlangtoggle(false); }}>Ar</div>
              <div className="w-full flex justify-center my-1 py-2 hover:bg-slate-300 cursor-pointer" onClick={() => { dispatch(changelang('Ku')); setlangtoggle(false); }}>Ku</div>
            </div>
          </div>
          <div className="grid grid-rows-4 border-b  ">
            <Link
              href="/"
              onClick={() => {
                setMenu(!menu);
              }}
              className="flex  items-center  justify-between h-16  px-20 gap-2 group  border-b  "
            >
              <button className="group-hover:text-lime-700  transition-all duration-300 cursor-pointer  ">
                {langg == 'En' ? "HOME" : langg == 'Ar' ? "رئيسي" : "سەرەکی"}
              </button>
              {langg == "En" ? <i className="fa-solid fa-chevron-right"></i> : <i className="fa-solid fa-chevron-left"></i>}
            </Link>
            <div className="flex  relative items-center  justify-between h-16  px-20 gap-2 group  border-b  ">
              <button
                onClick={() => {
                  setBrand(!brandMenu);
                }}
                className="group-hover:text-lime-700  w-full flex justify-start transition-all duration-300 cursor-pointer  "
              >
                {langg == 'En' ? "BRAND" : langg == 'Ar' ? "ماركة" : "براند"}
              </button>
              {brandMenu && <i className=" fa-solid fa-chevron-down" onClick={() => {
                setBrand(!brandMenu);
              }}></i>}
              {brandMenu == false && <i className={langg == "En" ? "fa-solid fa-chevron-right" : "fa-solid fa-chevron-left"} onClick={() => {
                setBrand(!brandMenu);
              }}></i>}
              {brandMenu && (
                <>
                  <div className="absolute top-16 right-0 w-full  bg-gray-50 shadow-md  border rounded-md py-5 z-10">
                    <div
                      onClick={() => {
                        setBrand(true);
                      }}
                      className="  w-full  grid grid-cols-1   relative   rounded-md py-1 z-10"
                    >
                      {brand?.data.map((product, index) => (
                        <>
                          <div className="w-full ">
                            <div className="flex  h-10 justify-between items-center px-20 border-b">
                              {" "}
                              <button
                                key={index}
                                onClick={() => {
                                  handleCAtigory(product.brand_id);
                                }}
                                className="  w-full py-1  h-10   items-center  cursor-pointer transition-all duration-700 text-sm  flex justify-between     "
                              >
                                {" "}
                                {langg == "En" ? product.brand_name : langg == "Ar" ? product.brand_name_ar : product.brand_name_ku}{" "}
                              </button>
                              <i onClick={() => {
                                handleCAtigory(product.brand_id);
                              }} className={filter == product.brand_id ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}></i>
                            </div>
                            {filter === product.brand_id && (
                              <div className="grid grid-cols-1 w-full">
                                {" "}
                                {cactigors?.data
                                  .filter((cat) => cat.brand_id === filter)
                                  .map((product, index) => (
                                    <>
                                      <div className="w-full">
                                        <Link
                                          href={{
                                            pathname: `/categoryitem/${product.category_id}`,
                                          }}
                                        >
                                          <button
                                            key={index}
                                            className="  w-full py-2 text-lime-600 hover:text-lime-800  cursor-pointer transition-all duration-700 text-xs   flex justify-start px-20  "
                                          >
                                            {langg == "En" ? product.category_name : langg == "Ar" ? product.category_name_ar : product.category_name_ku}
                                          </button>
                                        </Link>
                                      </div>
                                    </>
                                  ))}
                              </div>
                            )}

                            <div></div>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
            <Link
              href="/Contact"
              onClick={() => {
                setMenu(!menu);
              }}
              className="flex  items-center  justify-between h-16  px-20 gap-2 group  border-b  "
            >
              <button className="group-hover:text-lime-700  transition-all duration-300 cursor-pointer  ">
                {langg == 'En' ? "CONTACT" : langg == 'Ar' ? "اتصال" : "پەیوەندی"}
              </button>
              {langg == "En" ? <i className="fa-solid fa-chevron-right"></i> : <i className="fa-solid fa-chevron-left"></i>}
            </Link>{" "}
            <Link
              href="/SignUp"
              onClick={() => {
                setMenu(!menu);
              }}
              className="flex  items-center  justify-between h-16  px-20 gap-2 group  border-b  "
            >
              <button className="group-hover:text-lime-700  transition-all duration-300 cursor-pointer  ">
                {langg == 'En' ? "REGISTER" : langg == 'Ar' ? "يسجل" : "تۆمارکردن"}
              </button>
              {langg == "En" ? <i className="fa-solid fa-chevron-right"></i> : <i className="fa-solid fa-chevron-left"></i>}
            </Link>
          </div>
          <Link
            href="/Login"
            onClick={() => {
              setMenu(!menu);
            }}
            className="flex  items-center pt-10 justify-center gap-2 group "
          >
            <button className="w-full h-14 rounded-md bg-emerald-900 text-white  transition-all duration-300 cursor-pointer mb-10 ">
              {langg == 'En' ? "login" : langg == 'Ar' ? "تسجيل الدخول" : "چونه‌ ژووره‌وه‌"}
            </button>
          </Link>
        </div>
        {/* )} */}
      </div>
      <div className="w-full h-11 -mt-1 flex bg-white">
        <input
          name="password"
          type="text"
          placeholder={langg == "En" ? "Search" : langg == "Ar" ? "يبحث" : "گەڕان"}
          className="w-11/12 border rounded-sm h-full  bg-white p-1 "
          value={search}
          onChange={(val) => { setsearch(val.target.value) }}
        />
        <Link className="w-1/12 flex justify-center items-center cursor-pointer" href={{
          pathname: `/search/${search}`,
        }}>
          <i className="fa-solid fa-search text-xl text-lime-700"></i>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
