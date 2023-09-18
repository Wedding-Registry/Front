import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Doughnut } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import HttpClient from "@/apis/HttpClient.js";

const StyledSection = styled.section`
  margin: 40px auto;
  width: 1300px;
  display: flex;
  flex-direction: column;
  padding: 20px;

  h3 {
    color: #4b4b4b;
    font-size: 21px;
    font-weight: 600;
    margin-bottom: 10px;
    text-align: center;
  }

  div.item {
    display: flex;
    align-items: center;
    margin: 0 250px;
  }

  .notice {
    color: darkred;
    margin: 5rem auto;
    text-align: center;
  }

  .wrapper {
    display: flex;
    align-items: center;
  }

  .right {
    margin-left: auto;
  }

  span {
    border-left: 1px solid #000;
    height: fit-content;
    padding: 8px 15px;
    margin-left: 60px;
    h4 {
      padding: 5px 0 2px;
      font-size: 16px;
      font-weight: 600;
    }
    p {
      font-size: 14px;
      margin: 7px 0 10px;
    }
  }
`;

function AdminAttendanceListsContainer() {
  const apiUrl = import.meta.env.VITE_HTTP_API_URL;
  const [attendanceData, setAttendanceData] = useState({
    yes: {},
    no: {},
    unknown: {},
  });

  const fetchAttendanceData = async () => {
    try {
      const { data, status } = await HttpClient.get(
        `${apiUrl}admin/attendance/detail`
      );
      if (status === 200 || status === 201) {
        setAttendanceData({
          ...attendanceData,
          ["yes"]: data.data.yes,
          ["no"]: data.data.no,
          ["unknown"]: data.data.unknown,
        });
        return data.data;
      } else {
        console.log(data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["fetchAttendanceData"],
    queryFn: fetchAttendanceData,
  });

  let attendanceTable = {
    labels: ["참석", "불참석", "미정"],
    datasets: [
      {
        data: [
          attendanceData.yes.count,
          attendanceData.no.count,
          attendanceData.unknown.count,
        ],
        backgroundColor: ["#1552af", "#6c97dc", "#cfcfcf"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: false,
    layout: {
      padding: 20,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  useEffect(() => {
    fetchAttendanceData();
    attendanceTable.datasets = [
      {
        data: [
          attendanceData.yes.count,
          attendanceData.no.count,
          attendanceData.unknown.count,
        ],
      },
    ];
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <StyledSection>
      <div className="item">
        {data.no.rate === data.no.rate &&
        data.yes.rate === data.unknown.rate &&
        data.yes.rate === 0 ? (
          <h3 className="notice">결혼식 참석 여부 관련 데이터가 없습니다</h3>
        ) : (
          <div className="wrapper">
            <div>
              <h3>결혼식 참석 여부</h3>
              <Doughnut
                options={options}
                data={attendanceTable}
                width="300px"
                height="300px"
              />
            </div>
            <span>
              <h4>참석</h4>
              <p>
                {data.yes.rate}%, {data.yes.count}명
              </p>
              <h4>불참석</h4>
              <p>
                {data.no.rate}%, {data.no.count}명
              </p>
              <h4>미정</h4>
              <p>
                {data.unknown.rate}%, {data.unknown.count}명
              </p>
            </span>
          </div>
        )}
      </div>
    </StyledSection>
  );
}

export default AdminAttendanceListsContainer;
