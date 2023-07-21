import React from "react";
import styled from "styled-components";
import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

ChartJS.register(ArcElement, Tooltip, Legend);

const StyledDiv = styled.div`
  height: max-content;
  width: 1300px;
  margin: auto;
  div.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
const StyledSection = styled.section`
  margin: 40px auto 80px;
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
const StyledArticle = styled.article`
  width: 350px;
  margin-left: auto;
  h3 {
    color: #4b4b4b;
    font-size: 21px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  div.box {
    border: 1px solid #4b4b4b;
    border-radius: 10px;
    overflow-y: scroll;

    p {
      border-bottom: 1px solid #4b4b4b;
      margin: 15px 20px 15px 15px;
      padding-top: 5px;
      padding-bottom: 7px;
    }

    .button {
      display: flex;
      justify-content: flex-end;
      border: none;
      span {
        cursor: pointer;
        margin: 15px 5px 15px;
        padding: 3px;
        font-size: 14px;
      }
      margin-right: 10px;
    }
  }
`;
const StyledBox = styled.div`
  display: flex;
  width: 1200px;
  margin: auto;
  justify-content: space-between;
  align-items: flex-start;
`;
const StyledDivItem = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 140px;
    height: 140px;
    border: 3px solid #00517f;
    border-radius: 5em;
  }
  h4 {
    font-size: 13px;
    text-align: center;
    margin-top: 15px;
  }
  h4::after {
    display: block;
    content: "";
    width: 50px;
    height: 2px;
    margin: 5px auto 15px;
    border-bottom: 1px solid #aaa;
  }
  p {
    margin: 8px 0;
  }
`;

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
function AdminDonationListsContainer() {
  const tempToken = import.meta.env.VITE_TEMPTOKEN;
  const fetchDonationData = async () => {
    const { data } = await axios.get(
      "http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/admin/summary/donation",
      {
        headers: {
          Authorization: "Bearer " + tempToken,
        },
      }
    );
    return data.data;
  };

  const fetchDonationDetailData = async () => {
    const { data } = await axios.get(
      "http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/admin/donation/product/detail",
      {
        headers: {
          Authorization: "Bearer " + tempToken,
        },
      }
    );
    console.log(data.data);

    return data.data;
  };

  const fetchDonationTransferData = async () => {
    const { data } = await axios.get(
      "http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/admin/donation/transfer/detail",
      {
        headers: {
          Authorization: "Bearer " + tempToken,
        },
      }
    );
    return data.data;
  };

  const donationQuery = useQuery({
    queryKey: ["donationData"],
    queryFn: fetchDonationData,
  });

  const donationTransferQuery = useQuery({
    queryKey: ["donationTransferData"],
    queryFn: fetchDonationTransferData,
  });

  const donationDetailQuery = useQuery({
    queryKey: ["donationDetailData"],
    queryFn: fetchDonationDetailData,
  });

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
      <div className="container">
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
                  <h4>
                    {i.usersGoodsName}, {i.usersGoodsTotalDonation}원
                  </h4>
                  <p>{i.usersGoodsTotalDonationRate}% 달성</p>
                </div>
              ))}
            </span>
          </div>
        </StyledSection>
        <StyledArticle>
          <h3>계좌 이체 후원자 리스트</h3>
          <div className="box">
            {donationTransferQuery.data?.map((i) => (
              <p key={i.accountTransferId}>{i.transferMemo}</p>
            ))}
            <div className="button">
              <span>추가</span>
              <span>수정</span>
            </div>
          </div>
        </StyledArticle>
      </div>
      <StyledBox>
        <StyledDivItem className="item">
          {donationDetailQuery.data?.map((i) => (
            <div key={i.usersgoodsId}>
              <img src={i.goodsImgUrl} alt={i.user} />
              <h4>{i.updatedUsersGoodsName}</h4>
              {i.donationList?.map((j) => (
                <p key={j.guestId}>
                  {j.name} 님 {j.amount} 원
                </p>
              ))}
            </div>
          ))}
        </StyledDivItem>
      </StyledBox>
    </StyledDiv>
  );
}

export default AdminDonationListsContainer;
