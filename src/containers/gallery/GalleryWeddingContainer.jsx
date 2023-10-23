import React, { useEffect, useState } from "react";

import styled from "styled-components";

import { galleryWeddingImageState } from "../../state/galleryWeddingImageState";
import { useRecoilState } from "recoil";
import {
  getGalleryWeddingImage,
  deleteGalleryWeddingImage,
} from "../../services/weddingGallery/WeddingImgService";
import ImageSilder from "../../components/imageSilder/ImageSilder";
import {
  Galaxy21Mobile,
  PC,
  Galaxy21UltraMobile,
  Iphone14ProMobile,
  Iphone14PlusMobile,
  Iphone14Mobile,
  Galaxy21PlusMobile,
} from "../../components/media/gallery/Wedding";
import MobileWedding from "../../components/mobile/wedding/MobileWedding";

export default function GalleryWeddingContainer() {
  const [imgData, setImgData] = useRecoilState(galleryWeddingImageState);
  const [didMount, setDidMount] = useState(false);
  const arrayLength = imgData ? imgData.length : 0;
  const FIX_SIZE = 7;

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
      <PC>
        <ImageSilder
          imgData={imgData}
          FIX_SIZE={FIX_SIZE}
          arrayLength={arrayLength}
          deleteImageOnClick={deleteImageOnClick}
          setImgData={setImgData}
        />
      </PC>
      <Galaxy21Mobile>
        <MobileWedding />
      </Galaxy21Mobile>
      <Galaxy21UltraMobile>
        <MobileWedding />
      </Galaxy21UltraMobile>
      <Iphone14ProMobile>
        <MobileWedding />
      </Iphone14ProMobile>
      <Iphone14Mobile>
        <MobileWedding />
      </Iphone14Mobile>
      <Iphone14PlusMobile>
        <MobileWedding />
      </Iphone14PlusMobile>
      <Galaxy21PlusMobile>
        <MobileWedding />
      </Galaxy21PlusMobile>
    </Base>
  );
}

const Base = styled.div`
  height: 90.5vh;
`;
