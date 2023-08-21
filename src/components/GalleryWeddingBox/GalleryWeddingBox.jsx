import React, { useCallback, useRef } from "react";
import styled from "styled-components";

import Plus from "@/assets/icons/plus.png";
import { addGalleryWeddingImage } from "../../services/weddingGallery/WeddingImgService";
import { galleryWeddingImageState } from "../../state/galleryWeddingImageState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { uuidState } from "../../state/uuidState";

export default function GalleryWeddingBox({ url }) {
  const setImgData = useSetRecoilState(galleryWeddingImageState);
  const pathUrlData = useRecoilValue(uuidState);
  async function addGalleryWeddingImageRender(dataImage) {
    const postImgData = await addGalleryWeddingImage(dataImage);
    setImgData((prev) => [...prev, postImgData.data]);
  }
  const imageInput = useRef();

  const onUploadImage = useCallback((e) => {
    if (!e.target.files[0]) {
      return;
    }
    if (e.target.files[0]) {
      const formData = new FormData();
      formData.append("galleryImg", e.target.files[0]);
      addGalleryWeddingImageRender(formData);
    }
  }, []);

  const onClickImage = useCallback(() => {
    if (!imageInput.current) {
      return;
    }
    imageInput.current.click();
  }, []);
  return (
    <>
      <Base>
        <Imageinput>
          {!pathUrlData.uuidFirst ? (
            <input
              type="file"
              name="thumbnail"
              accept="image/jpg, image/png, image/jpeg"
              id="ex_file"
              ref={imageInput}
              onChange={onUploadImage}
            />
          ) : (
            <></>
          )}
        </Imageinput>
        {url ? (
          <Image src={url} />
        ) : (
          <PlusImage src={Plus} onClick={onClickImage} />
        )}
      </Base>
    </>
  );
}

const Base = styled.div`
  width: 500px;
  height: 500px;
  border: 1px solid #929292;
  display: flex;
  justify-content: center;
  background-color: #929292;
  position: relative;
  margin: 0 8px 0 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.div`
  background: ${(props) => `url(${props.src}) no-repeat center`};
  width: 100%;
  height: 100%;
  background-size: cover;
`;

const PlusImage = styled.div`
  background: ${(props) => `url(${props.src}) no-repeat center`};
  width: 5%;
  height: 5%;
  background-size: cover;
`;
const Imageinput = styled.div`
  margin: 0 8px 0 8px;
  label {
    display: inline-block;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;
  }
  input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
  img {
    width: 20px;
    height: 20px;
  }
`;
