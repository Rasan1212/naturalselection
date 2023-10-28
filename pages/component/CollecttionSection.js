import { useEffect } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

const CollecttionSection = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="w-full bg-cover bg-center  bg-no-repeat h-[400px] collecttion mb-20 flex items-center justify-center">
      <div className="text-center">
        {/* <p className="  font-extralight text-2xl ">NEW TREND 2023</p> */}
        <h1
          data-aos="zoom-in"
          data-aos-easing="linear"
          data-aos-duration="1500"
          className="text-5xl mt-3  "
        >
          {" "}
          Thalia
        </h1>
        <div className="flex justify-center">
          <div className=" bg-slate-400 w-48 mt-6 h-[1px] rounded-xl "></div>
        </div>
        <div className="text-center    mt-5">Natural Beauty</div>

      </div>
    </div>
  );
};

export default CollecttionSection;
