import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import HttpClient from "@/apis/HttpClient.js";

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

  .attend {
    span {
      display: inline;
      font-size: 17px;
      font-weight: 600;
      color: #000;
    }
    .yes {
      color: blue;
    }
    .no {
      color: red;
    }
  }
`;

function AdminAlarmListsContainer() {
  const apiUrl = import.meta.env.VITE_HTTP_API_URL;
  const fetchAlarmData = async () => {
    const { data } = await HttpClient.get(`${apiUrl}admin/alarm`);
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
            <p className="attend">
              <span>{i.name}</span>님이 결혼식
              <span
                className={
                  i.attend === "참석"
                    ? "yes"
                    : i.attend === "불참"
                    ? "no"
                    : "unknown"
                }
              >
                {" "}
                {i.attend}
              </span>
              에 체크하셨습니다.
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
