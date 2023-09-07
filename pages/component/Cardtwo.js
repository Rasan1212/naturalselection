import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

const Cardtwo = (props) => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div
      className="h-[600px] md:h-[500px] lg:h-[700px] bg-black  px-4  lg:px-32 xl:px-40   bg-center bg-no-repeat bg-cover  flex justify-center  xl:justify-end   items-center "
      style={{
        backgroundImage: `url(${props.img})`,
      }}
    >
      <div> </div>
      <div className=" flex items-center justify-center mt-32 scale-150 lg:pr-20">
        <div>
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            className="  text-center flex items-center justify-center   gap-10 text-xl"
          >
            {" "}
            <div className="w-10 h-[1px] bg-black"></div>
            <div>Summer Fation</div>
            <div className="w-10 h-[1px] bg-black"></div>
          </div>
          <div className="w-full  text-center">
            <p className="lg:text-5xl  font-bold  text-2xl md:text-2xl  mt-3     ">
              {props.title}
            </p>
            <p className=" lg:text-4xl md:text-2xl text-lg   mt-2  font-thin">
              {props.description}
            </p>
          </div>
          <Link href="/Shop">
            <div className="w-full flex justify-center items-end mt-3">
              <button className="w-32 h-10  text-white  bg-lime-600 hover:bg-gray-700 duration-500 transition-all  text-xs font-bold mt-3 flex items-center justify-center ">
                {" "}
                SHOP NOW
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cardtwo;
