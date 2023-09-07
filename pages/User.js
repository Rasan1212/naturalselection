import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Head from 'next/head';
import { check } from "@/StoreRedux/Slice";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper";
import Navbar from "./component/Navbar";
import Orderdetailmodal from "./component/orderdetailmodal";

export async function getServerSideProps(context) {
  const cookies = context.req.headers.cookie;
  const myCookieValue = cookies
    .split(';')
    .map(cookie => cookie.trim())
    .find(cookie => cookie.startsWith('myCookie='));

  const value = myCookieValue ? myCookieValue.split('=')[1] : null;

  const res = await fetch(
    "https://dashboardnaturalselection.com/api/user/read.php",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: value,
      }),
    }
  );

  const data = await res.json();
  return {
    props: { cactigors: { data: data.category }, item: { item: data.item }, brand: { data: data.brand }, user: { data: data.data } },
    // revalidate: 10,
  };
}

const User = ({ cactigors, item, brand, user }) => {
  const items = useSelector((state) => state.cart.count);
  const Swal = require("sweetalert2");
  const router = useRouter();
  const [data, setDta] = useState(user);
  const langg = useSelector((state) => state.cart.language);


  const [see, setSee] = useState(false);
  const [login, setLogin] = useState(false);
  const [showmodal, setshowModal] = useState(false);
  const [invoice_detail, setinvoice_detail] = useState([]);

  const dispatch = useDispatch();
  function logout() {
    Cookies.set("myCookie", 0);
    Swal.fire("User Logout");
    setLogin(true);

    router.reload();

  }

  useEffect(() => {

    setSee(Cookies.get("myCookie"));
    // console.log(JSON.stringify(user.data));
    //   const handleSubmit = async () => {
    //     const id = Cookies.get("myCookie");

    //     try {
    //       const response = await fetch(
    //         "https://dashboard.natureselection.shop/api/user/read.php",
    //         {
    //           method: "POST",
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //           body: JSON.stringify({
    //             user_id: id,
    //           }),
    //         }
    //       );

    //       if (response.ok) {
    //       } else {
    //         alert("Login failed. Please try again.");
    //       }
    //       const jsonData = await response.json();
    //       // console.log(jsonData);
    //       // setDta(jsonData);


    //     } catch (error) {
    //       console.error("Error logging in:", error);
    //     }
    //   };
    //   handleSubmit();
  }, []);
  function loginHandel() {
    ;

    dispatch(check(Cookies.get("myCookie")));
  }


  return (
    <>
      <Orderdetailmodal showModal={showmodal} setShowModal={setshowModal} invoice_detail={invoice_detail} />
      <Navbar cactigors={cactigors} brand={brand} />
      <div className="pt-20 px-4 md:px-8 lg:px-32 xl:px-40  flex justify-center" dir={langg == "En" ? "ltr" : "rtl"}>
        <div className="w-full  border rounded-md my-20 lg:p-20 p-4 flex items-center justify-center">
          <div className="w-full">
            {" "}
            <div className=" w-full font-bold text-lg lg:text-xl mb-5 text-center">
              {" "}
              {langg == "En" ? "Welcom to Natural Selection" : langg == "Ar" ? "" : ""}
            </div>
            {(see == 0 || see == undefined) && (
              <Link href="/Login">
                <button
                  onClick={loginHandel}
                  className="h-10 w-full border-b      mr-5 hover:bg-emerald-900 hover:text-white transition-all duration-700  text-xs sm:text-sm lg:text-base
         "
                >
                  {langg == "En" ? "Login" : langg == "Ar" ? "تسجيل الدخول" : "چونه‌ ژووره‌وه‌"}
                </button>
              </Link>
            )}
            <div className="flex items-center justify-center gap-10 mt-10">
              {see > 0 && (
                <button
                  id="reload-button"
                  onClick={logout}
                  className="h-10 px-10 border-b   mr-5 hover:bg-emerald-900 hover:text-white transition-all duration-700  text-xs sm:text-sm lg:text-base
         "
                >
                  {langg == "En" ? "Log Out" : langg == "Ar" ? "تسجيل خروج" : "چوونە دەرەوە"}
                </button>
              )}

              {see > 0 && (
                <Link
                  href={{
                    pathname: "/Update",
                  }}
                >
                  <button
                    className="h-10 px-4 border-b   mr-5 hover:bg-emerald-900 hover:text-white transition-all duration-700  text-xs sm:text-sm lg:text-base
         "
                  >
                    {langg == "En" ? "UPDATE" : langg == "Ar" ? "تحديث : " : "نوێکردنەوە : "}
                  </button>
                </Link>
              )}
            </div>
            <div className="mt-10 font-bold lg:text-lg w-full  text-sm ">
              {see > 0 && (
                <>
                  <div className="grid grid-cols-2 w-full py-2">
                    {" "}
                    <div className="lg:mr-20 flex items-center gap-2">
                      {" "}
                      <i className="fa-solid fa-user text-sm text-lime-700"></i>{" "}
                      <p>{langg == "En" ? "User Name:" : langg == "Ar" ? "اسم المستخدم : " : "ناوی بەکارهێنەر : "}</p>
                    </div>{" "}
                    <div className="text-right">{data.data[0].username}</div>
                  </div>
                  <div className="grid grid-cols-2 w-full py-2">
                    {" "}
                    <div className="lg:mr-20 flex items-center gap-2">
                      <i className="fa-solid fa-phone text-sm text-lime-700"></i>
                      <p>{langg == "En" ? "User Phone :" : langg == "Ar" ? "هاتف المستخدم : " : "مۆبایلی بەکارهێنەر : "}</p>
                    </div>{" "}
                    <div className="text-right">{data.data[0].user_phone}</div>
                  </div>
                  <div className="grid grid-cols-2 w-full py-2">
                    {" "}
                    <div className="lg:mr-20 flex items-center gap-2">
                      <i className="fa-solid fa-envelope text-sm text-lime-700"></i>
                      <p>{langg == "En" ? "User Email :" : langg == "Ar" ? "البريد الالكتروني للمستخدم : " : "ئیمەیڵی بەکارهێنەر : "}</p>
                    </div>{" "}
                    <div className="text-right">{data.data[0].user_email}</div>
                  </div>
                  <div className="grid grid-cols-2 w-full py-2">
                    {" "}
                    <div className="lg:mr-20  flex items-center gap-2">
                      {" "}
                      <i className="fa-sharp fa-solid fa-location-dot text-sm text-lime-700"></i>
                      <p>{langg == "En" ? "User Addres :" : langg == "Ar" ? "عنوان المستخدم : " : "ناونیشانی بەکارهێنەر : "}</p>
                    </div>{" "}
                    <div className="text-right">
                      {data.data[0].user_address}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full py-2">
                    {" "}
                    <div className="lg:mr-20  flex items-center gap-2">
                      {" "}
                      <i className="fa-solid fa-calendar-days text-sm text-lime-700"></i>
                      <p>{langg == "En" ? "User Age :" : langg == "Ar" ? "عمر المستخدم : " : "تەمەنی بەکارهێنەر : "}</p>
                    </div>{" "}
                    <div className="text-right">{data.data[0].user_age}</div>
                  </div>

                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {see > 0 && (
        <div className="w-full flex justify-center" dir={langg == "En" ? "ltr" : "rtl"}>
          <div className="relative w-3/4 overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <caption className={langg == "En" ? "p-5 text-lg font-semibold text-left text-gray-900 bg-white" : "p-5 text-lg font-semibold text-right text-gray-900 bg-white"}>
                {langg == "En" ? "Previous Order :" : langg == "Ar" ? "طلب سابق : " : "داواکاری پێشوو : "}
                {/* <p className="mt-1 text-sm font-normal text-gray-500">Browse a list of Flowbite products designed to help you work and play, stay organized, get answers, keep in touch, grow your business, and more.</p> */}
              </caption>
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    {langg == "En" ? "Total Quantity" : langg == "Ar" ? "الكمية الإجمالية" : "کۆی کاڵا"}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {langg == "En" ? "Total Price" : langg == "Ar" ? "السعر الكلي" : "نرخی گشتی"}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {langg == "En" ? "Order Date" : langg == "Ar" ? "تاريخ الطلب" : "ڕۆژی داواکردن"}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {langg == "En" ? "Order State" : langg == "Ar" ? "حالة الطلب" : "دۆخ"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.data[0].invoice.map((invoice, index) => (
                  <tr key={index} className="bg-white border-b cursor-pointer" onClick={() => { setinvoice_detail(invoice.item_invoice); setshowModal(true) }}>
                    <td className="px-6 py-4">{invoice.total_qty}</td>
                    <td className="px-6 py-4">{invoice.total_price}</td>
                    <td className="px-6 py-4">{invoice.invoice_date}</td>
                    <td className="px-6 py-4">{invoice.invoice_state}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
