import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteorder, deletesend, inc, dec } from "@/StoreRedux/Slice";
import { useRouter } from "next/router";
import Head from 'next/head';
import Cookies from "js-cookie";
import { format } from "date-fns";
import Navbar from "./component/Navbar";

//  bo henanawa data la api
export async function getServerSideProps() {
  const res = await fetch(
    "https://dashboardnaturalselection.com/api/navbar.php"
  );

  const data = await res.json();
  return {
    props: { cactigors: { data: data.category }, item: { item: data.item }, brand: { data: data.brand } },
    // revalidate: 10,
  };
}

//

const Card = ({ cactigors, item1, brand }) => {
  //  am page naw Basket ka la regayawa order akayt

  const Swal = require("sweetalert2");
  const items = useSelector((state) => state.cart.value);
  const send = useSelector((state) => state.cart.user);
  const router = useRouter();
  const [item, setitem] = useState(false);
  const length = items.length;
  const langg = useSelector((state) => state.cart.language);
  //  bo srynaway item la naw cart
  function deleteItem(index) {
    dispatch(deleteorder(index));
    dispatch(deletesend(index));
  }
  // bo dyary krdny total price bakar hatwa am function w value xwarawa

  const totalPric = [];
  let tottal = 0;
  let x;
  totalPric.push(tottal);
  items.map((product) => {
    x = parseInt(product.price * product.quntity);
    totalPric.push(x);
  });

  totalPric.map((product) => {
    tottal += product;
  });

  // /////////////
  const dispatch = useDispatch();

  //  bo war grtny date amro
  const today = new Date();
  const formattedDate = format(today, "yyyy-MM-dd");

  //bo nardny order
  const handleSubmit = async () => {
    const id = Cookies.get("myCookie");
    console.log(id);
    try {
      const response = await fetch(
        "https://dashboardnaturalselection.com/api/invoice/create.php",
        {
          method: "POST",
          headers: {
            Authorization: id,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            total_qty: length,
            total_price: tottal,
            invoice_date: formattedDate,
            invoice_note: "",
            items: send,
          }),
        }
      );

      if (response.ok) {
        Swal.fire(langg == "En" ? "Order Was Successful" : langg == "Ar" ? "كان الطلب ناجحا" : "داواکاریەکان بە سەرکەوتویی نێردرا");

        router.reload();
        setitem(true);
      } else {
        Swal.fire(langg == "En" ? "Login to order" : langg == "Ar" ? "تسجيل الدخول للطلب" : "چوونەژوورەوە بۆ داواکردن");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  // ////////////////////////

  return (
    <>
      <Navbar cactigors={cactigors} brand={brand} />
      <div className="pt-24   font-semibold px-4 md:px-8 lg:px-32 xl:px-40 flex justify-center" dir={langg == "En" ? "ltr" : "rtl"}>
        <div className="mt-10 w-full md:w-3/4  p-4 md:p-10  border shadow-2xl">
          <div className="border-b pb-5 font-semibold md:text-lg lg:text-xl ">
            {" "}
            {langg == "En" ? "Shopping Cart" : langg == "Ar" ? "عربة التسوق" : "سەبەتەی کڕین"}{" "}
          </div>

          {items.map((value, index) => {
            return (
              <>
                <div
                  className="py-5 border-b  flex items-center justify-between"
                  key={index}
                >
                  {/*  */}
                  <div
                    className=" bg-contain bg-no-repeat bg-center w-20 h-10"
                    style={{
                      backgroundImage: `url(${value.img})`,
                    }}
                  ></div>
                  {/*  */}
                  <div>
                    <div className="text-gray-400 text-xs">
                      {value.catygory}
                    </div>
                    <div>{value.title}</div>
                  </div>
                  {/*  */}
                  <div className="flex gap-2 items-center justify-center  text-sm">
                    <button onClick={() => dispatch(inc(value.id))}>
                      <i className="fa-solid fa-plus text-xs"></i>
                    </button>
                    <div className="px-1 border">{value.quntity}</div>
                    <button onClick={() => dispatch(dec(value.id))}>
                      <i className="fa-solid fa-minus text-xs"></i>
                    </button>
                  </div>
                  {/*  */}
                  <div className="font-bold">{value.price}$</div>
                  <button
                    onClick={() => localStorage.setItem("items", items)}
                  ></button>
                  {/*  */}
                  <button onClick={() => deleteItem(index)}>
                    <i className="fa-solid fa-x"></i>
                  </button>
                </div>
              </>
            );
          })}

          <div className="md:flex items-center justify-between mt-10 w-full">
            <div>
              {item === false && length > 0 && (
                <>
                  <button
                    onClick={handleSubmit}
                    className="h-10 w-32 lg:w-48 bg-lime-600 transition-all duration-500 hover:bg-gray-500 text-white"
                  >
                    {" "}
                    {langg == "En" ? "Submit" : langg == "Ar" ? "يُقدِّم" : "پێشکەشکردن"}
                  </button>
                </>
              )}

              {item === false && length == 0 && (
                <>
                  <div className="text-center text-xl text-lime-600 w-full">
                    {langg == "En" ? "NO ITEM IN CART" : langg == "Ar" ? "لا يوجد عنصر في عربة التسوق" : "هیچ شتێک لە سەبەتەدا نییە"}
                  </div>
                </>
              )}
            </div>{" "}
            <div className="text-lg font-bold mt-10 md:mt-0 ">
              {" "}
              {langg == "En" ? "Total price" : langg == "Ar" ? "السعر الكلي" : "نرخی گشتی"} : {tottal}$
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
