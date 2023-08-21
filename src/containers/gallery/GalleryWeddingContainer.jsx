import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper";
import styled from "styled-components";

import { galleryWeddingImageState } from "../../state/galleryWeddingImageState";
import { useRecoilState } from "recoil";
import GalleryWeddingBox from "../../components/GalleryWeddingBox/GalleryWeddingBox";
import {
  getGalleryWeddingImage,
  deleteGalleryWeddingImage,
} from "../../services/weddingGallery/WeddingImgService";

// Import Swiper styles

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../style/styles.css";
import { AiOutlineClose } from "react-icons/ai";

export default function GalleryWeddingContainer() {
  const [imgData, setImgData] = useRecoilState(galleryWeddingImageState);
  const [didMount, setDidMount] = useState(false);
  const arrayLength = imgData ? imgData.length : 0;
  const FIX_SIZE = 8;

  const GallyElementList = () => {
    let element = [];
    for (let i = 0; i < FIX_SIZE - arrayLength; i++) {
      element.push(
        <SwiperSlide key={i}>
          <GalleryWeddingBox key={i} className="swiper-image" />
          <AiOutlineClose
            style={{
              zIndex: "1",
              position: "absolute",
              top: "200",
              right: "80",
            }}
          />
        </SwiperSlide>
      );
    }
    return element;
  };

  async function getImageDataRender() {
    const weddingImgData = await getGalleryWeddingImage();
    setImgData(weddingImgData.data);
  }

  const deleteImageOnClick = async (id) => {
    await deleteGalleryWeddingImage(id);
    setImgData((prev) => prev.filter((img) => img.galleryImgId !== id));
  };

  useEffect(() => {
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      getImageDataRender();
    }
  }, [didMount]);
  return (
    <Base>
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
      >
        {imgData &&
          imgData.map((v) => (
            <SwiperSlide key={v.galleryImgId}>
              <GalleryWeddingBox
                className="swiper-image"
                url={v.galleryImgUrl}
              />
              <div style={{ backgroundColor: "red" }}>
                <AiOutlineClose
                  key={v.galleryImgId}
                  style={{
                    zIndex: "1",
                    position: "absolute",
                    top: "200",
                    right: "80",
                  }}
                  onClick={() => {
                    deleteImageOnClick(v.galleryImgId);
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        {GallyElementList()}
      </Swiper>
    </Base>
  );
}

const Base = styled.div`
  height: 90vh;
`;
