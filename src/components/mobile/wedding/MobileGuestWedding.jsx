import React, { useEffect, useState } from "react";

import styled from "styled-components";

import { galleryWeddingImageState } from "../../../state/galleryWeddingImageState";
import { useRecoilState } from "recoil";
import { getGalleryWeddingImage } from "../../../services/weddingGallery/WeddingImgService";
import { getWeddingHall } from "../../../services/goods/GoodsMarriedService";
import Wedding from "../../../assets/Wedding.png";

export default function MobileWedding() {
  const [imgData, setImgData] = useRecoilState(galleryWeddingImageState);
  const [didMount, setDidMount] = useState(false);
  const [marriedData, setMarriedData] = useState({
    wife: "",
    husband: "",
    date: "",
    time: "",
    location: "",
    day: "",
  });

  async function getWeddingMarried() {
    const marriedDataList = await getWeddingHall();
    const convertDay = dayFindWeek(marriedDataList.data.weddingDate);
    const data = convertDate(marriedDataList.data.weddingDate);

    setMarriedData({
      husband: marriedDataList.data.account[0].name,
      wife: marriedDataList.data.account[1].name,
      date: data,
      time: marriedDataList.data.weddingTime,
      location: marriedDataList.data.location,
      day: convertDay,
    });
  }

  useEffect(() => {
    setDidMount(true);
  }, []);
  async function getImageDataRender() {
    const weddingImgData = await getGalleryWeddingImage();

    setImgData(weddingImgData.data);
  }

  useEffect(() => {
    if (didMount) {
      getImageDataRender();
      getWeddingMarried();
    }
  }, [didMount]);

  let randomNum = Math.floor(Math.random() * imgData.length);
  const radomImg = imgData.filter((img, index) => {
    if (index === randomNum) {
      return img.galleryImgUrl;
    }
  });

  const convertDate = (date) => {
    if (date !== "undefined" && date !== "") {
      const [year, month, day] = date.split("-");
      return `${year}. ${month}. ${day}`;
    } else {
      return;
    }
  };

  const dayFindWeek = (date) => {
    const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const dayOfWeek = week[new Date(date).getDay()];
    return dayOfWeek;
  };
  const marreidDataConvertMonthDay =
    marriedData.date?.slice(6, 8) +
    "月" +
    marriedData.date?.slice(9, 12) +
    "日";

  const marreidDataName = marriedData.husband + "&" + marriedData.wife;
  ("日");
  //폴링
  useEffect(() => {
    const intervalResult = setInterval(() => {
      getImageDataRender();
    }, 5000);
    return () => {
      clearInterval(intervalResult);
    };
  }, []);
  return (
    <Base>
      <Wapper>
        <MarriedTopTextDiv>
          <MarridTopText>
            {marriedData.date ? marreidDataConvertMonthDay : <></>}
          </MarridTopText>
        </MarriedTopTextDiv>
        <div>
          <MarridText>
            {marriedData.husband ? marreidDataName : <></>}
          </MarridText>
        </div>
        <MarriedImageDiv>
          {radomImg.length > 0 ? (
            radomImg.map((img) => (
              <div
                key={img.galleryImgId}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <img
                  src={img.galleryImgUrl}
                  style={{ width: "100%", height: "288px" }}
                />
              </div>
            ))
          ) : (
            <>
              <img src={Wedding} style={{ width: "100%", height: "288px" }} />
            </>
          )}
        </MarriedImageDiv>
        <div style={{ width: "100%" }}>
          <MarridBottomTopText>OUR WEDDING-DAY</MarridBottomTopText>
          <MarridBottomText>
            {marriedData.date && marriedData.date}{" "}
            {marriedData.day && marriedData.day}{" "}
            {marriedData.time && marriedData.time}
          </MarridBottomText>
          <MarridBottomText>
            {marriedData.location && marriedData.location}
          </MarridBottomText>
        </div>
      </Wapper>
    </Base>
  );
}
const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font: bold;
`;

const MarridText = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 25px;
  font-weight: 20px;
  border-bottom: 1px solid black;
  margin-bottom: 50px;
  font: bold;
`;

const MarriedTopTextDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 100px;
  font-size: 20px;
  margin-top: 20px;
  font: bold;
  font-weight: 300px;
  width: 100%;
`;
const MarridTopText = styled.p`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  font-weight: 20px;
  margin-top: 20px;
  width: 10px;
  font: bold;
  font-weight: 300px;
  padding-left: 10px;
`;

const MarridBottomTopText = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 20px;
  font-weight: 20px;
  margin-top: 20px;
  width: 100%;
  font: bold;
  font-weight: 300px;
`;
const MarridBottomText = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 20px;
  font-weight: 20px;
  margin-top: 20px;
  width: 100%;
  font: bold;
  font-weight: 300px;
`;

const MarriedImageDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;
