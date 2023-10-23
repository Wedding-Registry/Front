import React, { useEffect, useState } from "react";

import styled from "styled-components";

import { galleryWeddingImageState } from "../../../state/galleryWeddingImageState";
import { useRecoilState } from "recoil";
import { getGalleryWeddingImage } from "../../../services/weddingGallery/WeddingImgService";
import { getWeddingHall } from "../../../services/goods/GoodsMarriedService";

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

  async function getWeddingMarred() {
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
      getWeddingMarred();
    }
  }, [didMount]);

  let randomnum = Math.floor(Math.random() * imgData.length);
  const radomimg = imgData.filter((img, index) => {
    if (index === randomnum) {
      return img.galleryImgUrl;
    }
  });

  const convertDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${year}. ${month}. ${day}`;
  };

  const dayFindWeek = (date) => {
    const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const dayOfWeek = week[new Date(date).getDay()];
    return dayOfWeek;
  };

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
            {marriedData.date.slice(6, 8)}月{marriedData.date.slice(9, 12)}日
          </MarridTopText>
        </MarriedTopTextDiv>
        <div>
          <MarridText>
            {marriedData.husband} & {marriedData.wife}
          </MarridText>
        </div>
        {radomimg.map((img) => (
          <div key={img.galleryImgId}>
            <img
              src={img.galleryImgUrl}
              style={{ width: "359px", height: "288px" }}
            />
          </div>
        ))}
        <div style={{ width: "100%" }}>
          <MarridBottomText>OUR WEDDING-DAY</MarridBottomText>
          <MarridBottomText>
            {marriedData.date} {marriedData.day}. {marriedData.time}
          </MarridBottomText>
          <MarridBottomText>{marriedData.location}</MarridBottomText>
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
  border-left: 1px solid black;
  padding-left: 10px;
`;

const MarridBottomText = styled.p`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  font-size: 20px;
  font-weight: 20px;
  margin-top: 20px;
  width: 100%;
  font: bold;
  font-weight: 300px;
`;
