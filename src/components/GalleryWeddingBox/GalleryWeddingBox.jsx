import React, { useCallback, useRef } from "react";
import styled from "styled-components";

import Plus from "@/assets/icons/plus.png";
import { addGalleryWeddingImage } from "../../services/weddingGallery/WeddingImgService";
import { galleryWeddingImageState } from "../../state/galleryWeddingImageState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { uuidState } from "../../state/uuidState";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import imageCompression from "browser-image-compression";

export default function GalleryWeddingBox({ url, id, deleteImageOnClick }) {
  const setImgData = useSetRecoilState(galleryWeddingImageState);
  const pathUrlData = useRecoilValue(uuidState);
  async function addGalleryWeddingImageRender(dataImage) {
    const postImgData = await addGalleryWeddingImage(dataImage);
    setImgData((prev) => [...prev, postImgData.data]);
  }
  const imageInput = useRef();

  const onUploadImage = useCallback(async (e) => {
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };
    if (!e.target.files[0]) {
      return;
    }
    if (e.target.files[0]) {
      let targetFile = e.target.files[0];
      try {
        const compressedFile = await imageCompression(targetFile, options);

        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onloadend = () => {
          const base64data = reader.result;
          handlingDataForm(base64data);
        };
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  //formdata로 변환
  const handlingDataForm = async (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ia], {
      type: "image/jpeg",
    });
    const file = new File([blob], "image.jpg");

    const formData = new FormData();
    formData.append("galleryImg", file);
    addGalleryWeddingImageRender(formData);
  };

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
          <>
            <Image src={url}>
              {!pathUrlData.uuidFirst ? (
                <AiOutlineClose
                  style={{ marginRight: "10px", marginTop: "5px" }}
                  onClick={() => deleteImageOnClick(id)}
                />
              ) : (
                <></>
              )}
            </Image>
          </>
        ) : (
          <div>
            <button
              onClick={onClickImage}
              style={{
                width: "300px",
                height: "300px",
                backgroundColor: "transparent",
                border: "0",
              }}
            >
              <img src={Plus} style={{ width: "5%", height: "5%" }} />
            </button>
          </div>
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
  display: flex;
  justify-content: flex-end;
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
