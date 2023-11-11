import React from "react";

import { BsFillEnvelopeFill } from "@react-icons/all-files/bs/BsFillEnvelopeFill";
import { FaMoneyBill } from "@react-icons/all-files/fa/FaMoneyBill";
import styled from "styled-components";

export default function NotificationItem({ data }) {
  if (data === null || data === undefined) {
    return <></>;
  }
  const NAME = data.name;
  const ATTEND = data.attend;
  switch (data.type) {
    case "attend":
      return (
        <AlarmDiv>
          <BsFillEnvelopeFill style={{ width: "21px", height: "21px" }} />
          <AlarmAttendText>
            {ATTEND === "UNKNOWN" ? (
              <span>{NAME}님이 미정에 체크하셨습니다.</span>
            ) : (
              <span>
                {NAME}님이
                {ATTEND === "NO" ? <span> 불참석</span> : <span> 참석</span>}에
                체크하셨습니다.
              </span>
            )}
          </AlarmAttendText>
        </AlarmDiv>
      );
    case "donation":
      return (
        <AlarmDiv>
          <FaMoneyBill style={{ width: "50px", height: "21px" }} />
          <AlarmDonationText>
            {NAME}님이 {data.goods}에 {data.donation}원을 후원하셨습니다.
          </AlarmDonationText>
        </AlarmDiv>
      );
  }
}

const AlarmDiv = styled.div`
  width: 95%;
  font-weight: 400;
  font-size: 15px;
  line-height: 27px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  height: 140px;
  margin-left: 5px;
`;
const AlarmAttendText = styled.p`
  margin-left: 5px;
  :after {
    content: "";
    opacity: 0.3;
    width: 20px;
    border: 1px solid #000000;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    margin-top: 13px;
  }
`;

const AlarmDonationText = styled.p`
  margin-left: 5px;
  :after {
    content: "";
    opacity: 0.3;
    width: 20px;
    border: 1px solid #000000;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    margin-top: 13px;
  }
`;
