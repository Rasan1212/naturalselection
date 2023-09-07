import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

const SwiperCard = (props) => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div
      className="h-[600px] md:h-[500px] lg:h-[700px] bg-black  px-4  lg:px-32 xl:px-40     bg-center bg-no-repeat bg-cover  flex    items-center "
      style={{
        backgroundImage: `url(${props.img})`,
      }}
    >
      <div className="w-full mt- lg:mt-32 lg:scale-110 lg:pl-20 ">
        <div
          data-aos="fade-up"
          data-aos-duration="800"
          className=" text-white   text-2xl"
        >
          {" "}
          {props.title1}
        </div>
        <div className="w-full ">
          <p
            data-aos="fade-up"
            data-aos-duration="1200"
            className="lg:text-4xl   font-bold  text-2xl md:text-2xl  mt-3  text-white   "
          >
            {props.title}
          </p>
          <p
            data-aos="fade-up"
            data-aos-duration="1200"
            className="text-white lg:text-xl text-lg   mt-2  font-thin"
          >
            {props.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SwiperCard;
