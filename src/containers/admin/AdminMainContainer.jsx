import React from "react";
import styled from "styled-components";
import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const StyledDiv = styled.div`
  height: 90vh;
`;
const StyledSection = styled.section`
  margin: 40px auto 0;
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
      margin: 10px 0 10px;
    }

    p.total {
      margin: 8px auto 28px;
      font-size: 15px;
    }
  }
`;

function AdminMainContainer() {
  // const tempToken = import.meta.env.VITE_TEMPTOKEN;
  const token = localStorage.getItem("accessToken") || "needSignIn";

  const fetchAttendanceData = async () => {
    const { data } = await axios.get(
      "http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/admin/summary/attendance",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return data.data;
  };

  const fetchDonationData = async () => {
    const { data } = await axios.get(
      "http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/admin/summary/donation",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return data.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["attendanceData"],
    queryFn: fetchAttendanceData,
  });

  const donationQuery = useQuery({
    queryKey: ["donationData"],
    queryFn: fetchDonationData,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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

  ChartJS.register(ArcElement, Tooltip, Legend);

  const attendanceTable = {
    labels: ["참석", "불참석", "미정"],
    datasets: [
      {
        data: [data.yes, data.no, data.unknown],
        backgroundColor: ["#1552af", "#6c97dc", "#cfcfcf"],
        borderWidth: 0,
      },
    ],
  };

  const donationTable = {
    labels: donationQuery.data?.map((i) => `${i.usersGoodsName}`),
    datasets: [
      {
        data: donationQuery.data?.map((i) => `${i.usersGoodsTotalDonation}`),
        backgroundColor: [
          "#0f3267",
          "#255090",
          "#2079c3",
          "#4294d3",
          "#4facee",
          "#cfcfcf",
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <StyledDiv>
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
              {data.yesRate}%, {data.yes}명
            </p>
            <h4>불참석</h4>
            <p>
              {data.noRate}%, {data.no}명
            </p>
            <h4>미정</h4>
            <p>
              {data.unknownRate}%, {data.unknown}명
            </p>
          </span>
        </div>
      </StyledSection>
      <StyledSection>
        <div className="item">
          <div className="right">
            <h3>상품 그래프</h3>
            <Doughnut
              options={options}
              data={donationTable}
              width="330px"
              height="330px"
            />
          </div>
          <span>
            {donationQuery.data?.map((i) => (
              <div key={i.usersGoodsId}>
                <h4>{i.usersGoodsName}</h4>
                <p className="total">
                  {i.usersGoodsTotalDonation}원({i.usersGoodsTotalDonationRate}%
                  달성)
                </p>
              </div>
            ))}
          </span>
        </div>
      </StyledSection>
    </StyledDiv>
  );
}

export default AdminMainContainer;
