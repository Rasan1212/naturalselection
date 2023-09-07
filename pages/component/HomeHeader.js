import React from "react";
import { Autoplay, EffectFade } from "swiper";
import SwiperCard from "./SwiperCard";
import { useSelector } from "react-redux";


import { Swiper, SwiperSlide } from "swiper/react";
const HomeHeader = ({ cover }) => {
  const langg = useSelector((state) => state.cart.language);

  return (
    <div>
      {" "}
      <Swiper
        effect="fade"
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        spaceBetween={50}

        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, EffectFade]}
      >
        {cover?.data?.map((lis, index) => (
          <SwiperSlide key={index}>
            <SwiperCard
              img={'https://dashboardnaturalselection.com/api/uploads/' + lis.cover_image}
              title1={langg == "En" ? lis.cover_txt1_en : langg == "Ar" ? lis.cover_txt1_ar : lis.cover_txt1_ku}
              title={langg == "En" ? lis.cover_txt2_en : langg == "Ar" ? lis.cover_txt2_ar : lis.cover_txt2_ku}
              description={langg == "En" ? lis.cover_txt3_en : langg == "Ar" ? lis.cover_txt3_ar : lis.cover_txt3_ku}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeHeader;
