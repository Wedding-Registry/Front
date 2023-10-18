import React, { useEffect, useState } from "react";

import styled from "styled-components";

import { galleryWeddingImageState } from "../../state/galleryWeddingImageState";
import { useRecoilState } from "recoil";
import {
  getGalleryWeddingImage,
  deleteGalleryWeddingImage,
} from "../../services/weddingGallery/WeddingImgService";
import ImageSilder from "../../components/imageSilder/ImageSilder";
import { Mobile, PC } from "../../components/media/gallery/Wedding";
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
      <Mobile>
        <MobileWedding />
      </Mobile>
    </Base>
  );
}

const Base = styled.div`
  height: 90.5vh;
`;
