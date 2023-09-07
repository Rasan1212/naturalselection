import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from 'next/head';
import Cookies from "js-cookie";
import Navbar from "./component/Navbar";
import { useSelector } from "react-redux";

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
    props: { cactigors: { data: data.category }, brand: { data: data.brand }, user: { data: data.data } },
    // revalidate: 10,
  };
}
const Update = ({ cactigors, brand, user }) => {
  const Swal = require("sweetalert2");
  const router = useRouter();
  const { query } = useRouter();
  const ddata = user.data[0] || [];
  const [username, setusername] = useState(ddata.username);
  const [email, setEmail] = useState(ddata.user_email);
  const [password, setpassword] = useState(ddata.user_password);
  const [phone, setPhone] = useState(ddata.user_phone);
  const [address, setAdress] = useState(ddata.user_address);
  const [age, setage] = useState(ddata.user_age);
  const [gender, setgender] = useState(ddata.user_gender);
  const [submited, setsubmited] = useState(false);
  const [isuser, setisuser] = useState();
  const [error, seterror] = useState({});
  const langg = useSelector((state) => state.cart.language);

  const form = {
    name: username,
    pass: password,
    email: email,

    phone: phone,
    address: address,
    age: age,
  };

  const handleUsername = (event) => {
    setusername(event.target.value);
  };
  const handlemail = (event) => {
    setEmail(event.target.value);
  };

  const handlPassword = (event) => {
    setpassword(event.target.value);
  };
  const handlPhone = (event) => {
    setPhone(event.target.value);
  };
  const handlAddress = (event) => {
    setAdress(event.target.value);
  };
  const handlAge = (event) => {
    setage(event.target.value);
  };
  //   handlAge

  const submite = (e) => {
    e.preventDefault();
    seterror(validate(form));
    setsubmited(true);
  };

  useEffect(() => {
    if (Object.keys(error).length === 0 && submited) {
      handleSubmit();
    }
  }, [error]);

  const validate = (values) => {
    const errors = {};
    // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.username = langg == "En" ? "Username is required!" : langg == "Ar" ? "اسم المستخدم مطلوب" : "ناوی بەکارهێنەر پێویستە";
    }
    if (!values.pass) {
      errors.password = langg == "En" ? "Password is required!" : langg == "Ar" ? "كلمة المرور مطلوبة" : "وشەی نهێنی پێویستە";
    }
    if (!values.email) {
      errors.email = langg == "En" ? "Email is required!" : langg == "Ar" ? "البريد الالكتروني مطلوب" : "ئیمەیڵ پێویستە";
    }

    // if (!values.phone) {
    //   errors.phone = "phone number is required!";
    // }

    if (!values.phone) {
      errors.phone = langg == "En" ? "phone number is required!" : langg == "Ar" ? "رقم الهاتف مطلوب" : "ژمارەی تەلەفۆن پێویستە";
    } else if (!values.phone?.startsWith(0)) {
      errors.phone = "not correct format 07XX XXX XX XX";
    } else if (values.phone?.length < 11 || values.phone?.length > 11) {
      errors.phone = "not correct format 07XX XXX XX XX";
    }

    if (!values.address) {
      errors.address = langg == "En" ? "Address is required!" : langg == "Ar" ? "العنوان مطلوب" : "ناونیشان پێویستە";
    }
    if (!values.age) {
      errors.age = langg == "En" ? "age is required!" : langg == "Ar" ? "السن مطلوب" : "تەمەن پێویستە";
    }

    return errors;
  };
  const handleSubmit = async () => {
    const id = Cookies.get("myCookie");
    try {
      const response = await fetch(
        "https://dashboardnaturalselection.com/api/user/update.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // user_name: username,
            username: username,
            user_password: password,
            user_phone: phone,
            user_email: email,
            user_address: address,
            user_age: age,
            user_gender: gender,
            user_id: id,
          }),
        }
      );

      if (response.ok) {
        Swal.fire(langg == "En" ? "Update Was Successful" : langg == "Ar" ? "التحديث كان ناجحا" : "نوێکردنەوە سەرکەوتوو بوو");
        router.push("/User");
      } else {
        router.push("/Login");
        Swal.fire(langg == "En" ? "Login after that update" : langg == "Ar" ? "تسجيل الدخول بعد هذا التحديث" : "دوای ئەو نوێکارییە بچۆرە ژوورەوە");
      }
      const jsonData = await response.json();

      localStorage.setItem("user", jsonData.detail.user_id);
    } catch (error) {
      // Swal.fire("update was not sussecfull ");
      console.error("Error logging in:", error);
    }
  };
  return (
    <>
      <Navbar cactigors={cactigors} brand={brand} />

      <div className="pt-24 mb-32" dir={langg == "En" ? "ltr" : "rtl"}>
        <div className="text-xl md:text-2xl lg:text-4xl font-bold text-black   flex items-center justify-center my-10 mt-32 ">
          {langg == "En" ? "UPDATE" : langg == "Ar" ? "تحديث" : "نوێکردنەوە"}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-4 md:px-8 lg:px-32 xl:px-40">
          <div>
            <input
              onChange={handleUsername}
              value={username}
              className="w-full border-b placeholder:text-sm h-10 px-2 placeholder:text-black"
              placeholder={langg == "En" ? "Username" : langg == "Ar" ? "اسم المستخدم" : "ناوی بەکارهێنەر"}
              type="text"
            />
            <div className="text-sm text-red-600  ">{error.username}</div>
          </div>
          <div>
            <input
              onChange={handlemail}
              value={email}
              className="w-full border-b placeholder:text-sm h-10 px-2 placeholder:text-black"
              placeholder={langg == "En" ? "Email" : langg == "Ar" ? "بريد إلكتروني" : "ئیمەیڵ"}
              type="email"
            />

            <div className="text-sm text-red-600  ">{error.email}</div>
          </div>
          <div>
            <input
              onChange={handlPassword}
              value={password}
              className="w-full border-b placeholder:text-sm h-10 px-2 placeholder:text-black"
              placeholder={langg == "En" ? "Password" : langg == "Ar" ? "كلمة المرور" : "نهێنوشە"}
              type="password"
            />
            <div className="text-sm text-red-600  ">{error.password}</div>
          </div>

          <div>
            <input
              onChange={handlPhone}
              value={phone}
              className="w-full border-b placeholder:text-sm h-10 px-2 placeholder:text-black"
              placeholder={langg == "En" ? "Phone Number" : langg == "Ar" ? "رقم التليفون" : "ژمارەی تەلەفۆن"}
              type="number"
            />
            <div className="text-sm text-red-600  ">{error.phone}</div>
          </div>
          <div>
            <input
              onChange={handlAddress}
              value={address}
              className="w-full border-b placeholder:text-sm h-10 px-2 placeholder:text-black"
              placeholder={langg == "En" ? "Address" : langg == "Ar" ? "عنوان" : "ناونیشان"}
              type="text"
            />
            <div className="text-sm text-red-600  ">{error.address}</div>
          </div>
          <div>
            <input
              onChange={handlAge}
              value={age}
              className="w-full border-b placeholder:text-sm h-10 px-2 placeholder:text-black"
              placeholder={langg == "En" ? "Age" : langg == "Ar" ? "عمر" : "تەمەن"}
              type="number"
            />
            <div className="text-sm text-red-600  ">{error.age}</div>
          </div>
          <div className="md:col-span-2">
            <div id="shouldbefull">
              <div>
                <select
                  id="countries"
                  value={gender}
                  onChange={(val) => {
                    setgender(val.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option selected value="male">
                    {langg == "En" ? "Male" : langg == "Ar" ? "ذكر" : "نێرینە"}
                  </option>
                  <option value="female">
                    {langg == "En" ? "Fe-Male" : langg == "Ar" ? "أنثى" : "مێینە"}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="text-sm text-red-600 md:mx-16 mx-10 lg:mx-28">
          {isuser}{" "}
        </div>
        <div className="flex justify-center">
          <button
            onClick={submite}
            className=" mt-10 border h-10 w-20 lg:w-32 text-sm  font-bold bg-red-500 text-white  rounded-md  hover:bg-gray-300 hover:text-[#212121] duration-500 transition-all"
          >
            {langg == "En" ? "UPDATE" : langg == "Ar" ? "تحديث" : "نوێکردنەوە"}
          </button>
        </div>
        {/* <div className="signup-bg h-[200px]  w-full bg-cover bg-center mt-10"></div> */}
      </div>
    </>
  );
};

export default Update;
