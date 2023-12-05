import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper";
import GalleryWeddingBox from "../GalleryWeddingBox/GalleryWeddingBox";

// Import Swiper styles

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../style/styles.css";

function ImageSilder({
  imgData,
  FIX_SIZE,
  arrayLength,
  invitationStatus,
  setInvitationStatus,
  handleDeleteImageButton,
}) {
  const GallyElementList = () => {
    let element = [];
    for (let i = 0; i < FIX_SIZE - arrayLength; i++) {
      element.push(
        <SwiperSlide key={i}>
          <GalleryWeddingBox key={i} className="swiper-image" />
        </SwiperSlide>
      );
    }
    return element;
  };
  return (
    <Swiper
      effect={"coverflow"}
      slidesPerView={3} // 동시에 보여줄 슬라이드 갯수
      //spaceBetween={50}// 슬라이드간 간격
      //slidesPerGroup={2} //그룹으로 묶을 수
      //initialSlide={2} //보여줄 index
      loop={true}
      centeredSlides={true}
      pagination={{
        clickable: true,
        el: ".swiper-pagination",
      }}
      coverflowEffect={{
        rotate: 0,
        stretch: 100,
        depth: 200,
        modifier: 1.5,
        slideShadows: false,
      }}
      modules={[Navigation, EffectCoverflow]}
      className="swiper-container two"
      grabCursor={true}
      style={{ height: "85%" }}
    >
      {imgData &&
        imgData.map((data) => (
          <SwiperSlide key={data.galleryImgId}>
            <GalleryWeddingBox
              className="swiper-image"
              url={data.galleryImgUrl}
              id={data.galleryImgId}
              setInvitationStatus={setInvitationStatus}
              invitationStatus={invitationStatus}
              handleDeleteImageButton={handleDeleteImageButton}
            />
          </SwiperSlide>
        ))}
      {GallyElementList()}
    </Swiper>
  );
}

export default ImageSilder;
