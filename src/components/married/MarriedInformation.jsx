import React, { useEffect, useState } from "react";
//공유 이미지 가져오기
import styled from "styled-components";

import { getInforMationList } from "../../services/gustGoods/GuestMarriedService";

import RadioButtonGroup from "../radiobutton/RadioButtonGroup";
import { useRecoilState, useSetRecoilState } from "recoil";
import { marriedInformationState } from "../../state/marriedInformationState";
import DateTimePeicker from "../datetimePicker/DateTimePeicker";
import { datePickerSate } from "../../state/datePickerState";
import { media } from "../../style/media";

export default function MarriedInforMation({ guestToken }) {
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
        <WapperCenterTextdiv>
          <RadioButtonGroup guestToken={guestToken} />
          {merriedHusbandNameData && merriedWifeNameData && (
            <div key={merriedWifeNameData}>
              <CenterTextdiv>
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
              </CenterTextdiv>
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
        </WapperCenterTextdiv>
      </>
    </>
  );
}

const GoodsWeddingText = styled.input`
  outline: none;
  border: none;
  background-color: #ebebeb;
  width: 80px;
  border-radius: 10px 0 0 10px;
  height: 33px;
  text-align: center;
  ${media.mobile`
    outline: none;
    border: none;
    background-color: #ebebeb;
    width: 57px;
    border-radius: 10px 0 0 10px;
    height: 22px;
    text-align: center;
  `}
`;

const GoodsWeddingbank = styled.input`
  outline: none;
  border: none;
  background-color: #ebebeb;
  width: 80px;
  height: 33px;
  text-align: center;
  margin-left: 5px;
  ${media.mobile`
    outline: none;
    border: none;
    background-color: #ebebeb;
    width: 57px;
    border-radius: 10px 0 0 10px;
    height: 22px;
    text-align: center;
`}
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
  ${media.mobile`
    justify-content:flex-end;
    outline: none;
    border: none;
    background-color: #ebebeb;
    width: 109px;
    border-top-right:10px;
    height: 22px;
    text-align: center;
  `}
`;

const WapperCenterTextdiv = styled.div`
  margin-bottom: 1%;
  ${media.mobile`
    justify-content:flex-end;
    display:flex;
    width:100%
    
`}
`;

const CenterTextdiv = styled.div`
  ${media.mobile`
    justify-content:flex-end;
    display:flex;
    width:100%
  `}
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
  ${media.mobile`
      font-size:1rem;
  `}
`;

const GoodsWeddingdiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  margin-right: 8%;
  ${media.mobile`
    display:none;
  `}
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
  ${media.mobile`
    display:none;
  `}
`;

const GoodsInformationAddressandDateTimeDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
`;
