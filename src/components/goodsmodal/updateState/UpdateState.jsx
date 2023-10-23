// 수정 상태
// text url 후원가 상품 이름
// 수정 삭제하기 버튼 만들어짐
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import {
  updateGoodsname,
  updateGoodsPrice,
} from "../../../services/goods/GoodsProductService";

function UpdateState({
  isOpen,
  fetchData,
  setIsOpen,
  setFetchData,
  deleteGoodsRender,
}) {
  const [postFilterGoodsData, setPostFilterGoodsData] = useState([]);

  const [editNameText, setEditNameText] = useState("");
  const [editPriceText, setEditPriceText] = useState("");
  const [editState, setEditState] = useState({
    state: false,
  });

  //상품 가격 수정
  async function updateGoodsPriceRender(usersGoodsId, usersGoodsName) {
    const priceData = await updateGoodsPrice(usersGoodsId, usersGoodsName);
    return priceData;
  }
  //상품이름 수정
  async function updateGoodsNameRender(usersGoodsId, usersGoodsPrice) {
    const nameData = await updateGoodsname(usersGoodsId, usersGoodsPrice);
    return nameData;
  }

  const updateGoodsAllClick = async (usersGoodsId, name, price) => {
    const priceData = await updateGoodsPriceRender(usersGoodsId, price);
    if (priceData.success) {
      setFetchData((prev) =>
        prev.filter(
          (goods) => goods.usersGoodsId === priceData.data.usersGoodsId
        )
      );
    }
    const nameData = await updateGoodsNameRender(usersGoodsId, name);
    if (nameData.success) {
      setFetchData((prev) =>
        prev.filter(
          (goods) => goods.usersGoodsId === nameData.data.usersGoodsId
        )
      );
    }
    setIsOpen(false);
  };

  const goodsDeleteButton = async (id) => {
    const data = await deleteGoodsRender(id);
    console.log(data);
  };
  const updateGoodsNameChange = (e) => {
    const value = e.target.value;
    setEditNameText(value);
  };
  const updateGoodsPriceChange = (e) => {
    const value = e.target.value;
    setEditPriceText(value);
  };

  useEffect(() => {
    const filterGoodsData = fetchData?.filter(
      (v) => v.usersGoodsId === isOpen.userGoodsId
    );
    setEditNameText(filterGoodsData[0].usersGoodsName);
    setEditPriceText(filterGoodsData[0].usersGoodsPrice);
    setPostFilterGoodsData(filterGoodsData);
  }, []);

  return (
    <>
      <GoodsDiv>
        {editState.state
          ? postFilterGoodsData &&
            postFilterGoodsData.map((v) => (
              <div key={v.usersGoodsId}>
                <GoodsImage url={v.usersGoodsImgUrl} />
                <div>
                  <p>
                    상품 이름 :{" "}
                    <GoodsNameInput
                      name="name"
                      value={editNameText}
                      onChange={updateGoodsNameChange}
                    />
                  </p>
                  <GoodsDonationDiv>
                    <p>
                      후&nbsp; 원 &nbsp; 가 :
                      <GoodsDonationInput
                        name="price"
                        value={editPriceText}
                        onChange={updateGoodsPriceChange}
                      />
                      원
                    </p>
                  </GoodsDonationDiv>
                </div>
                <div style={{ width: "100%" }}>
                  <OkorColsebuttonDiv>
                    <div
                      style={{ position: "absolute", top: "85%", right: "10%" }}
                    >
                      <ApiButton
                        onClick={() =>
                          updateGoodsAllClick(
                            v.usersGoodsId,
                            editNameText,
                            editPriceText
                          )
                        }
                      >
                        수정하기
                      </ApiButton>
                      |
                      <ApiButton
                        onClick={() => goodsDeleteButton(v.usersGoodsId)}
                      >
                        삭제하기
                      </ApiButton>
                    </div>
                  </OkorColsebuttonDiv>
                </div>
              </div>
            ))
          : postFilterGoodsData &&
            postFilterGoodsData.map((v) => (
              <div key={v.usersGoodsId} id={v.usersGoodsId}>
                <GoodsImage url={v.usersGoodsImgUrl} />
                <div>
                  <p>
                    상품 이름 :{" "}
                    <GoodsNameInput
                      value={editNameText}
                      onChange={updateGoodsNameChange}
                      name="name"
                      onFocus={() => setEditState({ state: true })}
                    />
                  </p>
                  <div>
                    <p
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      후&nbsp; 원 &nbsp; 가 :{" "}
                      <GoodsDonationInput
                        value={editPriceText}
                        onFocus={() => setEditState({ state: true })}
                      />
                      원
                    </p>
                  </div>
                </div>
                <div style={{ width: "100%" }}>
                  <OkorColsebuttonDiv>
                    <div
                      style={{ position: "absolute", top: "85%", right: "10%" }}
                    >
                      <ApiButton>수정하기</ApiButton>|
                      <ApiButton
                        onClick={() => goodsDeleteButton(v.usersGoodsId)}
                      >
                        삭제하기
                      </ApiButton>
                    </div>
                  </OkorColsebuttonDiv>
                </div>
              </div>
            ))}
      </GoodsDiv>
    </>
  );
}

export default UpdateState;

const GoodsNameInput = styled.input`
  border: none;
  background: rgba(228, 230, 232, 0.7);
  outline: none;
  width: 400px;
  height: 20px;
  margin-bottom: 10px;
`;

const GoodsDonationInput = styled.input`
  border: none;
  background: rgba(228, 230, 232, 0.7);
  outline: none;
  width: 100px;
  height: 20px;
`;

const GoodsDonationDiv = styled.div`
  margin-top: 10px;
`;

const ApiButton = styled.button`
  border: none;
  background: none;
`;

const OkorColsebuttonDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const GoodsDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 479px;
`;

const GoodsImage = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 10px;
  margin-left: 35%;
`;
