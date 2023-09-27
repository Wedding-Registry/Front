import React, { useEffect, useRef, useState } from "react";
//공유 이미지 가져오기
import styled from "styled-components";
import Box from "@/components/box/Box";
import { RiArrowDropLeftLine } from "@react-icons/all-files/ri/RiArrowDropLeftLine";
import { RiArrowDropRightLine } from "@react-icons/all-files/ri/RiArrowDropRightLine";

import GoodsSupportModal from "../../components/goodssupportmodal/GoodsSupportModal";
import { getInforMationList } from "../../services/gustGoods/GuestMarriedService";
import { getGoodsSupportItemsList } from "../../services/gustGoods/GuestGoodsProductSerivce";
import RadioButtonGroup from "../../components/radiobutton/RadioButtonGroup";
import { useRecoilState, useSetRecoilState } from "recoil";
import { marriedInformationState } from "../../state/marriedInformationState";
import DateTimePeicker from "../../components/datetimePicker/DateTimePeicker";
import { datePickerSate } from "../../state/datePickerState";
import GoodsElementList from "../../components/goodsElementList/GoodsElementList";

function MarriedInforMation({ guestToken }) {
  //신랑 신부 statae
  const [merriedHusbandNameData, setMerriedHusbandNameData] = useState([]);
  const [merriedWifeNameData, setMerriedWifeNameData] = useRecoilState(
    marriedInformationState
  );
  const dateTimeReadOnlyState = useSetRecoilState(datePickerSate);
  //도로명주소
  const [addressData, setAdressData] = useState([]);
  const [dateTimeData, setDateTimeData] = useState("");

  //신랑 신부 내용 조회
  async function getInforMationListRender(guestToken) {
    const getMerriedInfoMationData = await getInforMationList(guestToken);

    const getMrriedInforMationDataHusBand =
      getMerriedInfoMationData.data?.account[0];
    setMerriedHusbandNameData(getMrriedInforMationDataHusBand);
    const getMrriedInforMationDataHusWife =
      getMerriedInfoMationData.data?.account[1];
    setMerriedWifeNameData(getMrriedInforMationDataHusWife);

    setAdressData(getMerriedInfoMationData.data?.location);
    const weddingDate = getMerriedInfoMationData.data?.weddingDate;
    const weddingTime = getMerriedInfoMationData.data?.weddingTime;
    const toStringDate = originalDate(weddingDate, weddingTime);
    setDateTimeData(toStringDate);
  }
  //원래 날짜 데이터로 변환
  function originalDate(date, time) {
    if (date === "" || time === "") {
      return;
    }
    if (date !== undefined) {
      const originalDate = new Date(date + " " + time);
      return originalDate;
    }
  }
  useEffect(() => {
    getInforMationListRender(guestToken);
  }, []);

  useEffect(() => {
    dateTimeReadOnlyState(true);
  }, []);

  return (
    <>
      <>
        <TitleDiv>
          {merriedHusbandNameData && merriedHusbandNameData.name ? (
            <>
              <TitleText>
                {merriedHusbandNameData.name}님과 {merriedWifeNameData.name}
                님의 결혼을 축하합니다.
              </TitleText>
            </>
          ) : (
            <>
              <TitleText>부부의 이름이 아직 등록되지 않았습니다.</TitleText>
            </>
          )}
        </TitleDiv>
        <GoodsWeddingdiv>
          <GoodsInformationAddressandDateTimeDiv key={addressData}>
            <GoodsWeddingadress
              style={{
                marginBottom: "20px",
              }}
              disabled={true}
              value={addressData || ""}
              placeholder="예식장 주소"
            />
            <DateTimePeicker dateTimeData={dateTimeData} />
          </GoodsInformationAddressandDateTimeDiv>
        </GoodsWeddingdiv>
        <CenterTextdiv>
          <RadioButtonGroup guestToken={guestToken} />
          {merriedHusbandNameData && merriedWifeNameData && (
            <div key={merriedWifeNameData}>
              <div
                style={{
                  marginTop: "30px",
                }}
              >
                <GoodsWeddingText
                  disabled={true}
                  value={merriedHusbandNameData.name || ""}
                  placeholder="신랑 이름"
                />
                <GoodsWeddingbank
                  disabled={true}
                  value={merriedHusbandNameData.bank || ""}
                  placeholder="신랑 은행"
                />
                <GoodsWeddingaccountnumber
                  disabled={true}
                  value={merriedHusbandNameData.account || ""}
                  placeholder="신랑 계좌번호"
                />
              </div>
              <br />
              <div>
                <GoodsWeddingText
                  disabled={true}
                  value={merriedWifeNameData.name || ""}
                  placeholder="신부 이름"
                />
                <GoodsWeddingbank
                  disabled={true}
                  value={merriedWifeNameData.bank || ""}
                  placeholder="신부 은행"
                />
                <GoodsWeddingaccountnumber
                  disabled={true}
                  value={merriedWifeNameData.account || ""}
                  placeholder="신랑 계좌번호"
                />
              </div>
            </div>
          )}
        </CenterTextdiv>
      </>
    </>
  );
}

export default function GoodsSupportContainer({ guestToken }) {
  const [goodsSupportData, setGoodsSupportData] = useState([]);
  const [didMount, setDidMount] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [usersGoodsId, setUsersGoodsId] = useState("");
  const slideRef = useRef(null);
  const TOTAL_SLIDES = 1;
  const arrayLength = goodsSupportData ? goodsSupportData.length : 0;
  const FIX_SIZE = 10;
  // 상품 조회
  async function getGoodsListRender(guestToken) {
    const goodsSupportData = await getGoodsSupportItemsList(guestToken);
    setGoodsSupportData(goodsSupportData.data);
  }
  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  //Api 2번 호출 막기
  useEffect(() => {
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      getGoodsListRender(guestToken);
    }
  }, [didMount]);

  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  return (
    <>
      <GoodsContainer>
        <MarriedInforMation guestToken={guestToken} />
        <BoxContainer>
          <RiArrowDropLeftLine onClick={prevSlide} size="40" />
          <BoxSlider>
            <BoxWapper ref={slideRef}>
              {goodsSupportData &&
                goodsSupportData.map((value) => (
                  <BoxItem
                    key={value.id}
                    onClick={() => {
                      setIsOpen(true);
                      setUsersGoodsId(value.usersGoodsId);
                    }}
                  >
                    <Box url={value.usersGoodsImgUrl} />
                    <ItemDiv>
                      <StyledTrack>
                        <StyledRange width={value?.usersGoodsPercent} />
                      </StyledTrack>
                      <ValueItem>
                        <p>{value?.usersGoodsName}</p>
                        <p>{value?.usersGoodsPrice}원</p>
                        <p>{value?.usersGoodsTotalDonation}원 후원</p>
                      </ValueItem>
                    </ItemDiv>
                  </BoxItem>
                ))}
              <GoodsElementList FIX_SIZE={FIX_SIZE} arrayLength={arrayLength} />
            </BoxWapper>
          </BoxSlider>
          {isOpen && (
            <GoodsSupportModal
              setIsOpen={setIsOpen}
              goodsSupportData={goodsSupportData}
              usersGoodsId={usersGoodsId}
              guestToken={guestToken}
              setGoodsSupportData={setGoodsSupportData}
              getGoodsListRender={getGoodsListRender}
            />
          )}
          <RiArrowDropRightLine onClick={nextSlide} size="40" />
        </BoxContainer>
      </GoodsContainer>
    </>
  );
}

const GoodsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GoodsWeddingText = styled.input`
  outline: none;
  border: none;
  background-color: #ebebeb;
  width: 80px;
  border-radius: 10px 0 0 10px;
  height: 33px;
  text-align: center;
`;

const GoodsWeddingbank = styled.input`
  outline: none;
  border: none;
  background-color: #ebebeb;
  width: 80px;
  height: 33px;
  text-align: center;
  margin-left: 5px;
`;

const GoodsWeddingaccountnumber = styled.input`
  outline: none;
  border: none;
  background-color: #ebebeb;
  width: 200px;
  border-radius: 0 10px 10px 0;
  margin-left: 5px;
  height: 33px;
  text-align: center;
`;

const BoxWapper = styled.div`
  display: flex;
  height: 50vh;
  margin-top: 20px;
  width: 100%;
`;

const BoxContainer = styled.div`
  display: flex;
  margin-top: 20px;
  width: 100%;
`;

const BoxItem = styled.div`
  display: flex;
  &:nth-child(odd) {
    margin-top: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &:nth-child(even) {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 150px;
  }
`;

const ItemDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const StyledTrack = styled.div`
  width: 5px;
  height: 100px;
  background-color: #ebebeb;
  border-radius: 15px;
  transform: rotate(180deg);
  margin-right: 10px;
`;

const StyledRange = styled.div`
  display: flex;
  width: 100%;
  height: ${({ width }) => (width > 100 ? "100%" : `${width}%`)};
  background: linear-gradient(to right, blue, blue);
`;

const ValueItem = styled.div`
  width: 116.5px;
  display: inline-block;
  font-style: normal;
  font-weight: 400px;
  font-size: 14px;
  line-height: 17px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const BoxSlider = styled.div`
  width: 100%;
  height: 50%;
  overflow-x: hidden;
  margin-bottom: 10%;
`;

const CenterTextdiv = styled.div`
  margin-bottom: 1%;
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3%;
  margin-bottom: 3%;
`;
const TitleText = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
`;

const GoodsWeddingdiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  margin-right: 8%;
`;
const GoodsWeddingadress = styled.input`
  outline: none;
  border: none;
  background-color: #ebebeb;
  width: 320px;
  border-radius: 10px;
  margin-left: 5px;
  height: 33px;
  text-align: center;
`;

const GoodsInformationAddressandDateTimeDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
`;
