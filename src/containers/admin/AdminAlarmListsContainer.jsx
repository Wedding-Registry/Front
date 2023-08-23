import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const StyledDiv = styled.div`
  display: flex;
  height: 80vh;
  width: 1250px;
  margin: 80px auto auto;
  align-items: flex-start;
  justify-content: space-between;

  div {
    width: 550px;
    div.item {
      margin-bottom: 50px;
    }
    h3 {
      margin-bottom: 20px;
      font-size: 14px;
    }
    p {
      border-bottom: 1px solid #aaa;
      padding-bottom: 5px;
    }
    span {
      display: block;
      text-align: right;
      margin-top: 3px;
      font-size: 13px;
    }
  }
`;

// 참석 = 파란색 / 불참석 = 빨간색

function AdminAlarmListsContainer() {
  // const tempToken = import.meta.env.VITE_TEMPTOKEN;
  const token = localStorage.getItem("accessToken") || "needSignIn";

  const fetchAlarmData = async () => {
    const { data } = await axios.get(
      "http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/admin/alarm",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return data.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["alarmData"],
    queryFn: fetchAlarmData,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <StyledDiv>
      <div>
        <h3>참석여부 알림</h3>
        {data.attendance?.map((i) => (
          <div key={i.userId} className="item">
            <p>
              {i.name}님이 결혼식 {i.attend}에 체크하셨습니다.
            </p>
            <span>
              {i.date} {i.time}
            </span>
          </div>
        ))}
      </div>
      <div>
        <h3>후원 알림</h3>
        {data.donation?.map((i) => (
          <div key={i.goodsDonationId} className="item">
            <p>
              {i.name}님이 {i.goods}에 {i.amount}원을 후원하셨습니다.
            </p>
            <span>
              {i.date} {i.time}
            </span>
          </div>
        ))}
      </div>
    </StyledDiv>
  );
}

export default AdminAlarmListsContainer;
