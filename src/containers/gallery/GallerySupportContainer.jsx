import React, { useEffect, useState } from "react";

import styled from "styled-components";

import { galleryWeddingImageState } from "../../state/galleryWeddingImageState";
import { useRecoilState } from "recoil";
import GalleryWeddingBox from "../../components/GalleryWeddingBox/GalleryWeddingBox";
import {
  getGallerySupportImage,
  getGallerySupportUUID,
} from "../../services/guestWedding/GuestWeddungImgSerivce";
import { useLocation } from "react-router";

// Import Swiper styles

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../style/styles.css";
import ImageSilder from "../../components/imageSilder/ImageSilder";

const Base = styled.div`
  height: 90vh;
`;

export default function GallerySupportContainer() {
  const [imgData, setImgData] = useRecoilState(galleryWeddingImageState);
  const [invitationStatus, setInvitationStatus] = useState(true);

  const [didMount, setDidMount] = useState(false);

  const location = useLocation();

  const arrayLength = imgData ? imgData.length : 0;
  const FIX_SIZE = 7;
  const [_, GallerySupport, uuid1, uuid2] = location.pathname.trim().split("/");
  console.log(_, GallerySupport);

  async function getImageDataRender() {
    const getImage = await getGallerySupportImage();
    if (getImage.success === false) {
      const postStatus = await getGallerySupportUUID(uuid1, uuid2);
      localStorage.setItem("Guest-Info", Object.values(postStatus.data));
      const getLocalGeustInfo = localStorage.getItem("Guest-Info");
      if (getLocalGeustInfo) {
        const guestImgData = await getGallerySupportImage(getLocalGeustInfo);
        setImgData(guestImgData.data);
      }
    } else {
      setImgData(getImage.data);
    }
  }
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
        GalleryWeddingBox={GalleryWeddingBox}
        invitationStatus={invitationStatus}
        setInvitationStatus={setInvitationStatus}
      />
    </Base>
  );
}
