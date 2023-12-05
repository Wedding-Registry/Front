import React, { useEffect, useState } from "react";

import styled from "styled-components";

import { galleryWeddingImageState } from "../../state/galleryWeddingImageState";
import { useRecoilState } from "recoil";
import {
  getGalleryWeddingImage,
  deleteGalleryWeddingImage,
} from "../../services/weddingGallery/WeddingImgService";
import ImageSilder from "../../components/imageSilder/ImageSilder";

function GalleryWeddingContainer() {
  const [imgData, setImgData] = useRecoilState(galleryWeddingImageState);
  const [didMount, setDidMount] = useState(false);
  const arrayLength = imgData ? imgData.length : 0;
  const FIX_SIZE = 7;

  async function getImageDataRender() {
    const weddingImgData = await getGalleryWeddingImage();
    setImgData(weddingImgData.data);
  }

  const handleDeleteImageButton = async (id) => {
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
      <ImageSilder
        imgData={imgData}
        FIX_SIZE={FIX_SIZE}
        arrayLength={arrayLength}
        handleDeleteImageButton={handleDeleteImageButton}
        setImgData={setImgData}
      />
    </Base>
  );
}

export default GalleryWeddingContainer;

const Base = styled.div`
  height: 90.5vh;
`;
