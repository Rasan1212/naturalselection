import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from 'next/head';
import { format } from "date-fns";
import Navbar from "./component/Navbar";
import { useSelector, useDispatch } from "react-redux";
import Logoo from '../styles/logo.png';

export async function getServerSideProps() {
  const res = await fetch(
    "https://dashboardnaturalselection.com/api/navbar.php"
  );

  const data = await res.json();
  return {
    props: { cactigors: { data: data.category }, item: { item: data.item }, brand: { data: data.brand } },
    // revalidate: 10,
  };
};


const SignUp = ({ cactigors, item, brand }) => {
  const Swal = require("sweetalert2");
  const [username, setusername] = useState();
  const [double, setdoble] = useState();
  const [email, setEmail] = useState();
  const [repassword, setrepassword] = useState();
  const [password, setpassword] = useState();
  const [submited, setsubmited] = useState(false);
  const [isuser, setisuser] = useState();
  const [error, seterror] = useState({});
  const [phone, setPhone] = useState();
  const [address, setAdress] = useState();
  const [age, setage] = useState();
  const [gender, setgender] = useState('male');
  const langg = useSelector((state) => state.cart.language);

  const errors = {};

  const dispatch = useDispatch();
  const form = {
    name: username,
    pass: password,
    email: email,
    repassword: repassword,
    phone: phone,
    address: address,
    age: age,
  };
  const router = useRouter();

  const handleUsername = (event) => {
    setusername(event.target.value);
  };
  const handlemail = (event) => {
    setEmail(event.target.value);
  };
  const handlRePassword = (event) => {
    setrepassword(event.target.value);
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

    checkPassword();
  };

  useEffect(() => {
    console.log(error);
    if (
      Object.keys(error).length === 0 &&
      submited &&
      form.repassword === form.pass
    ) {
      handleSubmit();
    }
  }, [error]);

  const checkPassword = () => {
    if (form.pass !== form.repassword) {
      setisuser(langg == "En" ? "the passowrd dont match the re-password" : langg == "Ar" ? "كلمة المرور لا تتطابق مع إعادة كلمة المرور" : "وشەی نهێنی لەگەڵ دووبارە وشەی نهێنیدا ناگونجێت");
    } else {
    }
  };

  const today = new Date();
  const formattedDate = format(today, "yyyy-MM-dd");
  const handleSubmit = async () => {
    // event.preventDefault()
    try {
      const response = await fetch(
        "https://dashboardnaturalselection.com/api/user/create.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            user_password: password,
            user_phone: phone,
            user_email: email,
            user_address: address,
            user_age: age,
            user_gender: gender,
            user_date: formattedDate,
          }),
        }
      );
      // console.log(JSON.stringify(response));

      const jsonData = await response.json();
      if (response.ok && jsonData.status === "ok") {
        Swal.fire(langg == "En" ? "User created , Please wait until admin check and answare the request" : langg == "Ar" ? "تم إنشاء المستخدم، يرجى الانتظار حتى يقوم المسؤول بالتحقق من الطلب والإجابة عليه" : " تکایە چاوەڕێ بکە تا ئەدمین پشکنین و وەڵامدانەوەی داواکارییەکە");
        setdoble("");
        setAdress('');
        setEmail('');
        setpassword('');
        setrepassword('');
        setPhone('');
        setusername('');
        setage('');
        setgender('male');
      } else {
        Swal.fire(langg == "En" ? "This number used before" : langg == "Ar" ? "هذا الرقم استخدم من قبل" : "ئەم ژمارەیە پێشتر بەکارهاتووە");
        setdoble("");
        // setdoble("this phone number is used before");
      }
    } catch (error) {
      Swal.fire(langg == "En" ? "This number used before" : langg == "Ar" ? "هذا الرقم استخدم من قبل" : "ئەم ژمارەیە پێشتر بەکارهاتووە");
      setdoble("");
    }
  };

  const validate = (values) => {

    if (!values.name) {
      errors.username = langg == "En" ? "Username is required!" : langg == "Ar" ? "اسم المستخدم مطلوب" : "ناوی بەکارهێنەر پێویستە";
    }
    if (!values.pass) {
      errors.password = langg == "En" ? "Password is required!" : langg == "Ar" ? "كلمة المرور مطلوبة" : "وشەی نهێنی پێویستە";
    }
    if (!values.email) {
      errors.email = langg == "En" ? "Email is required!" : langg == "Ar" ? "البريد الالكتروني مطلوب" : "ئیمەیڵ پێویستە";
    }
    if (!values.repassword) {
      errors.repassword = langg == "En" ? "Re-password is required!" : langg == "Ar" ? "مطلوب إعادة كلمة المرور" : "دووبارە وشەی نهێنی پێویستە";
    }
    if (!values.phone) {
      errors.phone = langg == "En" ? "phone number is required!" : langg == "Ar" ? "رقم الهاتف مطلوب" : "ژمارەی تەلەفۆن پێویستە";
    } else if (!values.phone?.startsWith(0)) {
      errors.phone = "not correct format 077X XXX XX XX";
    } else if (values.phone?.length < 11 || values.phone?.length > 11) {
      errors.phone = "not correct format 077X XXX XX XX";
    }

    if (!values.address) {
      errors.address = langg == "En" ? "Address is required!" : langg == "Ar" ? "العنوان مطلوب" : "ناونیشان پێویستە";
    }
    if (!values.age) {
      errors.age = langg == "En" ? "age is required!" : langg == "Ar" ? "السن مطلوب" : "تەمەن پێویستە";
    }

    return errors;
  };

  return (
    <>
      <Head>
        <title>Natural Selection Sign up</title>
        <meta name="description" content="Natural Selection An Easy Way For Shopping" />
        <meta property="og:title" content="Natural Selection Sign up" />
        <meta property="og:description" content="Natural Selection An Easy Way For Shopping" />
        <meta property="og:image" content={`https://dashboardnaturalselection.com/api/uploads/logo.png`} />
      </Head>
      <Navbar cactigors={cactigors} brand={brand} className="" />
      <div className=" pt-24 mb-32  ">
        <div className="text-xl md:text-2xl lg:text-4xl font-bold text-black   flex items-center justify-center my-10 mt-32 ">
          {langg == "En" ? "REGISTER" : langg == "Ar" ? "التخصيب" : "تۆمارکردن"}
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
              placeholder={langg == "En" ? "Password" : langg == "Ar" ? "كلمة المرور" : "وشەی نهێنی"}
              type="password"
            />
            <div className="text-sm text-red-600  ">{error.password}</div>
          </div>
          <div>
            <input
              onChange={handlRePassword}
              value={repassword}
              className="w-full border-b placeholder:text-sm h-10 px-2 placeholder:text-black"
              placeholder={langg == "En" ? "Re-Password" : langg == "Ar" ? "إعادة كلمة المرور" : "دووبارە وشەی نهێنی"}
              type="password"
            />
            <div className="text-sm text-red-600  ">{error.repassword}</div>
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
          <div>
            <select id="countries" value={gender} onChange={(val) => { setgender(val.target.value); }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              <option selected value="male">{langg == "En" ? "Male" : langg == "Ar" ? "ذكر" : "نێرینە"}</option>
              <option value="female">{langg == "En" ? "Fe-Male" : langg == "Ar" ? "أنثى" : "مێینە"}</option>
            </select>
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
            {langg == "En" ? "SEND" : langg == "Ar" ? "إرسال" : "ناردن"}
          </button>
        </div>
        <div className="text-sm text-red-600 md:mx-16 mx-10 lg:mx-28">
          {double}{" "}
        </div>
      </div>
    </>
  );
};

export default SignUp;
//https://dashboard.natureselection.shop/api/user/create.php
