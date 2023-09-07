import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
import { useSelector } from "react-redux";

const NewLatest = ({ offer }) => {
  const langg = useSelector((state) => state.cart.language);
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <div className=" px-4 md:px-8 lg:px-32 xl:px-40 my-20" dir={langg == "En" ? "ltr" : "rtl"}>
        <div className="flex items-center justify-center ">
          <h1 className="text-4xl">{langg == "En" ? "Special Offer" : langg == "Ar" ? "عرض خاص" : "ئۆفەری تایبەت"} </h1>
        </div>
        <div className="flex justify-center  mt-3">
          {" "}
          <div className="h-[1px] w-24 bg-red-600"></div>
        </div>

        {/*  */}
        <div className="w-full flex flex-wrap justify-between mt-10">
          {/*  */}
          {offer?.data?.map((lis, index) => (
            <div
              key={index}
              data-aos="fade-down"
              data-aos-easing="linear"
              data-aos-duration="1500"
              className="min-h-[50vh] w-full md:w-1/3 lg:w-1/4 m-2 relative group transition-all duration-700 "
            >
              <img src={`https://dashboardnaturalselection.com/api/uploads/${lis.offer_image}`} className="w-full h-full absolute top-0 bottom-0 right-0 left-0" />
              <div className="w-full h-full bg-black bg-opacity-50 absolute top-0 right-0 group-hover:flex hidden transition-all duration-700 cursor-pointer   ">
                <div className="h-full text-white w-full flex items-center justify-center transition-all duration-700">
                  <div className="w-full">
                    <h1 className="text-lg font-bold text-center ">
                      {langg == "En" ? lis.offer_name : langg == "Ar" ? lis.offer_name_ar : lis.offer_name_ku}
                    </h1>
                    <div className="flex items-center justify-center ">
                      <div className=" text-xs  mt-4">{lis.offer_start} | By Admin </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="mt-3 w-1/2 text-center text-sm ">
                        {langg == "En" ? lis.offer_description : langg == "Ar" ? lis.offer_description_ar : lis.offer_description_ku}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NewLatest;
