import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
// import _ from "lodash";

const StyledSection = styled.section`
  margin: 40px auto;

  width: 1285px;
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
  const [attendanceData, setAttendanceData] = useState({
    yes: {},
    no: {},
    unknown: {},
  });
  const token = localStorage.getItem("accessToken") || "needSignIn";

  // const tempToken = import.meta.env.VITE_TEMPTOKEN;
  const fetchAttendanceData = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/admin/attendance/detail",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      // attendanceData.yes = _.cloneDeep(data.data.yes);
      // attendanceData.no = _.cloneDeep(data.data.no);
      // attendanceData.unknown = _.cloneDeep(data.data.unknown);
      setAttendanceData({
        ...attendanceData,
        ["yes"]: data.data.yes,
        ["no"]: data.data.no,
        ["unknown"]: data.data.unknown,
      });
    } catch (e) {
      console.log(e);
    }
  };

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
    console.log("table", attendanceTable);
  }, []);

  return (
    <StyledSection>
      <div className="item">
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
            {attendanceData.yes.rate}%, {attendanceData.yes.count}명
          </p>
          <h4>불참석</h4>
          <p>
            {attendanceData.no.rate}%, {attendanceData.no.count}명
          </p>
          <h4>미정</h4>
          <p>
            {attendanceData.unknown.rate}%, {attendanceData.unknown.count}명
          </p>
        </span>
      </div>
    </StyledSection>
  );
}

export default AdminAttendanceListsContainer;
