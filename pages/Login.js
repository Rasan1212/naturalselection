import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Link from "next/link";
import Navbar from "./component/Navbar";
import { useSelector } from "react-redux";
import Head from 'next/head';

// 
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

// 
const Login = ({ cactigors, item, brand }) => {
  const Swal = require("sweetalert2");
  const user = { username: "chra", passowrd: "123" };
  const [username, setusername] = useState();
  const [password, setpassword] = useState();
  const [submited, setsubmited] = useState(false);
  const [isuser, setisuser] = useState();
  const [error, seterror] = useState({});
  const form = { name: username, pass: password };
  const router = useRouter();
  const langg = useSelector((state) => state.cart.language);

  const handleUsername = (event) => {
    setusername(event.target.value);
  };
  const handlPassword = (event) => {
    setpassword(event.target.value);
  };
  const submite = (e) => {
    e.preventDefault();
    seterror(validate(form));
    setsubmited(true);
    handleSubmit();
  };
  useEffect(() => {
    const cok = Cookies.get("myCookie");
    if (cok && cok != 0) {
      router.push('/User')
    }
    if (
      Object.keys(error).length === 0 &&
      submited &&
      form.name === user.username &&
      form.pass === user.passowrd
    ) {
      setisuser("");
    }
  }, [error]);
  const validate = (values) => {
    const errors = {};


    if (!values.name) {
      errors.username = langg == "En" ? "Phone  number is required!" : langg == "Ar" ? "رقم الهاتف مطلوب" : "ژمارەی تەلەفۆن پێویستە";
      setisuser("");
    } else if (!values.name?.startsWith(0)) {
      errors.username = "Not correct format 077X XXX XX XX";
      setisuser("");
    } else if (values.name?.length < 11 || values.name?.length > 11) {
      errors.username = "Not correct format 077X XXX XX XX";
      setisuser("");
    }

    if (!values.pass) {
      errors.password = "Password is required!";
      setisuser("");
    }

    return errors;
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://dashboardnaturalselection.com/api/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );
      const jsonData = await response.json();

      Cookies.set("myCookie", jsonData.detail.user_id, { expires: 7 });

      if (response.ok) {
        router.push("/User");
      } else {
        Swal.fire("Create Account ");
      }
    } catch (error) {
      setisuser(langg == "En" ? "Username or Password not correct" : langg == "Ar" ? "اسم المستخدم أو كلمة المرور غير صحيحة" : "ناوی بەکارهێنەر یان وشەی نهێنی دروست نییە");

      console.error("Error logging in:", error);
    }
  };
  return (
    <>
      <Head>
        <title>My Page Title</title>
        <meta name="description" content="This is the description of my page" />
        <meta property="og:title" content="My Page Title for Social Sharing" />
        <meta property="og:description" content="Description for social sharing" />
        <meta property="og:image" content="https://example.com/image.jpg" />
      </Head>
      <Navbar cactigors={cactigors} brand={brand} />
      <div className="pt-24 px-4 md:px-8 lg:px-32 xl:px-40">
        <div className="flex w-full h-screen justify-center mt-20">
          <div className="w-full ">
            <div className="flex items-center justify-center">
              <p className="w-40 text-center border-lime-600  text-lg lg:text-3xl h-20 flex  font-bold items-center md:text-2xl mb-10  text-[#212121]  justify-center border-b-2">
                {langg == "En" ? "LOGIN" : langg == "Ar" ? "تسجيل الدخول" : "چونه‌ ژووره‌وه‌"}
              </p>
            </div>
            <div className="w-full flex justify-center mt-8 ">
              <input
                onChange={handleUsername}
                name="Phone Number"
                value={username}
                type="number"
                placeholder={langg == "En" ? "Phone Number" : langg == "Ar" ? "رقم هاتف" : "ژمارەی تەلەفۆن"}
                className="w-4/5 border rounded-md h-10  bg-white p-1   "
              />
            </div>{" "}
            <div className="text-sm text-lime-600 md:mx-16 mx-10 lg:mx-28">
              {error.username}
            </div>
            <div className="w-full flex justify-center mt-8">
              <input
                name="password"
                onChange={handlPassword}
                value={password}
                type="password"
                placeholder={langg == "En" ? "Password" : langg == "Ar" ? "الرقم السري" : "ژمارەی نهێنی"}
                className="w-4/5 border rounded-md h-10  bg-white p-1  "
              />
            </div>
            <div className="text-sm text-lime-600 md:mx-16 mx-10 lg:mx-28 ">
              {error.password}
            </div>
            <div className="  w-full  ">
              <div className="text-sm text-lime-600 md:mx-16 mx-10 lg:mx-28 mt-10">
                {isuser}{" "}
              </div>
              <div className="w-full flex justify-center">
                <button
                  onClick={submite}
                  className="border h-14 w-32 text-lg  font-bold  bg-lime-600  text-white  rounded-md  hover:bg-gray-300 hover:text-[#212121] duration-500 transition-all "
                >
                  {langg == "En" ? "Login" : langg == "Ar" ? "تسجيل الدخول" : "چوونە ژورەوە"}
                </button>{" "}
              </div>

              <div className="flex items-center justify-center gap-10 mt-10">
                <div className="w-24 h-[2px] bg-lime-600  text-center"></div>
                <div className="text-center">{langg == "En" ? "Or Create Account" : langg == "Ar" ? "إنشاء حساب" : "هەژمار دروستبکە"}</div>
                <div className="w-24 h-[2px] bg-lime-600 "></div>
              </div>
              <div className="flex justify-center w-full mt-10">
                <Link href="/SignUp">
                  <button className="   w-28 h-10 border-b">{langg == "En" ? "REGISTER" : langg == "Ar" ? "التخصيب" : "تۆمارکردن"}</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
