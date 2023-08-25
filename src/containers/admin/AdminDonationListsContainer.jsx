import React, { useState } from "react";
import styled from "styled-components";
import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

ChartJS.register(ArcElement, Tooltip, Legend);

const StyledDiv = styled.div`
  width: 1300px;
  height: 90vh;
  margin: auto;
  div.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
const StyledSection = styled.section`
  margin: 40px auto;
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

    button {
      margin-left: 10px;
    }
    p {
      border-bottom: 1px solid #4b4b4b;
      margin: 15px 20px 15px 15px;
      padding-top: 5px;
      padding-bottom: 7px;
    }

    .button {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      border: none;
      input {
        width: 45%;
        margin: 10px;
      }
      span {
        width: 40px;
        cursor: pointer;
        margin-left: 5px;
        margin-right: 15px;
        font-size: 14px;
      }
    }
  }
`;
const StyledBox = styled.div`
  display: flex;
  //width: 1200px;
  margin: auto;
`;
const StyledDivItem = styled.div`
  width: 1500px;
  display: flex;
  justify-content: center;
  div {
    display: flex;
    min-width: 350px;
    flex-direction: column;
    align-items: center;
  }
  img {
    width: 140px;
    height: 140px;
    border: 3px solid #00517f;
    border-radius: 5em;
  }
  h4 {
    font-size: 13px;
    max-width: 250px;
    text-align: center;
    margin-top: 15px;
    height: 50px;
  }
  h4::after {
    display: block;
    content: "";
    min-width: 50px;
    max-width: 250px;
    height: 5px;
    margin: 10px auto 15px;
    //border-bottom: 1px solid #aaa;
  }
  p:first-of-type {
    border-top: 1px solid #aaa;
    padding: 8px 0 0;
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
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState("");
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const inputValue = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else {
      setPrice(e.target.value);
    }
  };

  const editValue = (e, id) => {
    console.log(e.target.value, id);
    setEditedValue(e.target.value);
    setData((prevItems) =>
      prevItems.map((item) =>
        item.accountTransferId === id ? editedValue : item
      )
    );
  };

  const token = localStorage.getItem("accessToken") || "needSignIn";

  // const tempToken = import.meta.env.VITE_TEMPTOKEN;
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

  const fetchDonationDetailData = async () => {
    const { data } = await axios.get(
      "http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/admin/donation/product/detail",
      {
        headers: {
          Authorization: "Bearer " + token,
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
          Authorization: "Bearer " + token,
        },
      }
    );
    setData(data.data);
    return data.data;
  };

  const postDonationTransferData = async () => {
    const { data } = await axios.post(
      "http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/admin/donation/transfer/detail",
      {
        transferMemo: `${name} ${price}`,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    location.reload();
    return data.data;
  };

  const putDonationTransferData = async (id, value) => {
    const { data } = await axios.put(
      "http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/admin/donation/transfer/detail",
      {
        accountTransferId: id,
        transferMemo: value,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
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

  const onClickEdit = (id) => {
    putDonationTransferData(id, editedValue);
    setIsEditing(false);
    location.reload();
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
              <p key={i.accountTransferId} onClick={() => setIsEditing(true)}>
                {i.transferMemo}
                {isEditing === true ? (
                  <>
                    {editingId === i.accountTransferId ? (
                      <>
                        <input
                          id={i.accountTransferId}
                          value={data.transferMemo}
                          onChange={(e) => editValue(e, i.accountTransferId)}
                        />
                        <span
                          id={i.accountTransferId}
                          onClick={() => onClickEdit(i.accountTransferId, i)}
                        >
                          수정하기
                        </span>
                      </>
                    ) : (
                      <button
                        id={i.accountTransferId}
                        onClick={() => setEditingId(i.accountTransferId)}
                      >
                        수정
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditingId(i.accountTransferId)}>
                      수정
                    </button>
                  </>
                )}
              </p>
            ))}
            <div className="button">
              <input
                type="text"
                onChange={inputValue}
                name="name"
                value={name}
                placeholder="이름"
              />
              <input
                type="text"
                onChange={inputValue}
                name="price"
                placeholder="금액"
                value={price}
              />
              <span onClick={postDonationTransferData}>추가</span>
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
                  {j.name} 님 {j.amount}원
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
