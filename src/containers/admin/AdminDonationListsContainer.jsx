import React, { useState } from "react";
import styled from "styled-components";
import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useQuery } from "@tanstack/react-query";
import HttpClient from "@/apis/HttpClient.js";

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
  padding: 20px 0;
  min-width: 800px;

  h3 {
    color: #4b4b4b;
    font-size: 21px;
    font-weight: 600;
    margin-bottom: 10px;
    text-align: center;
  }

  .notice {
    color: darkred;
    margin: 5rem auto;
    text-align: center;
  }

  .wrapper {
    display: flex;
    justify-content: flex-start;
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
  p.total {
    margin: 8px auto 28px;
    font-size: 15px;
  }
`;
const StyledArticle = styled.article`
  max-width: 350px;
  h3 {
    margin-top: 40px;
    color: #4b4b4b;
    font-size: 21px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  div.box {
    border: 1px solid #4b4b4b;
    height: 335px;
    border-radius: 10px;
    overflow-y: scroll;
    margin-bottom: 60px;
    button {
      margin-left: 10px;
    }
    div {
      border-bottom: 1px solid #4b4b4b;
      max-width: 300px;
      word-break: break-all;
      word-wrap: break-word;
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
  .edit {
    margin-left: 10px;
    margin-right: 10px;
  }

  p.notice {
    color: darkred;
    font-weight: 600;
    margin: 7rem auto 0.5rem;
    text-align: center;
  }
`;
const StyledBox = styled.div`
  display: flex;
  //width: 1500px;
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

  p.notice {
    color: darkred;
    font-weight: 600;
    border-bottom: 1px solid #aaa;
    padding: 8px 0;
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
    setEditedValue(e.target.value);
    setData((prevItems) =>
      prevItems.map((item) =>
        item.accountTransferId === id ? editedValue : item
      )
    );
  };

  const apiUrl = import.meta.env.VITE_HTTP_API_URL;
  const fetchDonationData = async () => {
    try {
      const { data, status } = await HttpClient.get(
        `${apiUrl}admin/summary/donation`
      );
      if (status === 200 || status === 201) {
        return data.data;
      } else {
        alert(data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchDonationDetailData = async () => {
    try {
      const { data, status } = await HttpClient.get(
        `${apiUrl}admin/donation/product/detail`
      );
      if (status === 200 || status === 201) {
        return data.data;
      } else {
        alert(data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchDonationTransferData = async () => {
    try {
      const { data, status } = await HttpClient.get(
        `${apiUrl}admin/donation/transfer/detail`
      );
      if (status === 200 || status === 201) {
        setData(data.data);
        return data.data;
      } else {
        alert(data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const postDonationTransferData = async () => {
    if (name.trim() === "" || price.trim() === "") {
      alert("이름, 금액을 모두 입력해 주세요");
    } else {
      try {
        const { data, status } = await HttpClient.post(
          `${apiUrl}admin/donation/transfer/detail`,
          {
            transferMemo: `${name} ${price}`,
          }
        );
        if (status === 200 || status === 201) {
          location.reload();
          return data.data;
        } else {
          alert(data.message);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const putDonationTransferData = async (id, value) => {
    try {
      const { data, status } = await HttpClient.put(
        `${apiUrl}admin/donation/transfer/detail`,
        {
          accountTransferId: id,
          transferMemo: value,
        }
      );
      if (status === 200 || status === 201) {
        return data.data;
      } else {
        alert(data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteDonationTransferData = async (id) => {
    try {
      const { data, status } = await HttpClient.delete(
        `${apiUrl}admin/donation/transfer/detail?accountTransferId=${id}`
      );
      if (status === 200 || status === 201) {
        location.reload();
        return data.data;
      } else {
        alert(data.message);
      }
    } catch (e) {
      console.log(e);
    }
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
            {donationQuery.data?.length === 0 ? (
              <h3 className="notice">상품 그래프 관련 데이터가 없습니다</h3>
            ) : (
              <div className="wrapper">
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
                        {i.usersGoodsTotalDonation}원(
                        {i.usersGoodsTotalDonationRate}% 달성)
                      </p>
                    </div>
                  ))}
                </span>
              </div>
            )}
          </div>
        </StyledSection>
        <StyledArticle>
          <h3>계좌 이체 후원자 리스트</h3>
          {donationTransferQuery.data?.length === 0 ? (
            <div className="box">
              <p className="notice">데이터가 없습니다</p>
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
          ) : (
            <div className="box">
              {donationTransferQuery.data?.map((i) => (
                <div
                  key={i.accountTransferId}
                  onClick={() => setIsEditing(true)}
                >
                  <span>{i.transferMemo}</span>
                  {isEditing === true ? (
                    <span>
                      {editingId === i.accountTransferId ? (
                        <>
                          <input
                            className="edit"
                            defaultValue={i.transferMemo}
                            id={i.accountTransferId}
                            value={data.transferMemo}
                            onChange={(e) => editValue(e, i.accountTransferId)}
                          />
                          <button
                            onClick={() => onClickEdit(i.accountTransferId, i)}
                          >
                            수정하기
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            id={i.accountTransferId}
                            onClick={() => setEditingId(i.accountTransferId)}
                          >
                            수정
                          </button>
                          <button
                            onClick={() =>
                              deleteDonationTransferData(i.accountTransferId)
                            }
                          >
                            삭제
                          </button>
                        </>
                      )}
                    </span>
                  ) : (
                    <span>
                      <button onClick={() => setEditingId(i.accountTransferId)}>
                        수정
                      </button>
                      <button
                        onClick={() =>
                          deleteDonationTransferData(i.accountTransferId)
                        }
                      >
                        삭제
                      </button>
                    </span>
                  )}
                </div>
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
          )}
        </StyledArticle>
      </div>
      <StyledBox>
        <StyledDivItem className="item">
          {donationTransferQuery.data?.length === 0 ? (
            <p className="notice">상품 목록이 없습니다</p>
          ) : (
            <>
              {donationDetailQuery.data?.map((i) => (
                <div key={i.usersGoodsId}>
                  <img src={i.goodsImgUrl} alt="상품이미지" />
                  <h4>{i.updatedUsersGoodsName}</h4>
                  {i.donationList?.map((j) => (
                    <p key={j.goodsDonationId}>
                      {j.name} 님 {j.amount}원
                    </p>
                  ))}
                </div>
              ))}
            </>
          )}
        </StyledDivItem>
      </StyledBox>
    </StyledDiv>
  );
}

export default AdminDonationListsContainer;
