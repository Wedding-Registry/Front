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
  goodsListData,
  setIsOpen,
  deleteGoodsRender,
  getAllRenderProducts,
}) {
  const [postFilterGoodsData, setPostFilterGoodsData] = useState([]);

  const [editNameText, setEditNameText] = useState("");
  const [editPriceText, setEditPriceText] = useState("");
  const [editState, setEditState] = useState({
    state: false,
  });

  //상품 가격 수정
  async function modifyGoodsPriceRender(usersGoodsId, usersGoodsName) {
    const priceData = await updateGoodsPrice(usersGoodsId, usersGoodsName);
    return priceData;
  }
  //상품이름 수정
  async function modifyGoodsNameRender(usersGoodsId, usersGoodsPrice) {
    const nameData = await updateGoodsname(usersGoodsId, usersGoodsPrice);
    return nameData;
  }

  const handleModifyGoodsButton = async (usersGoodsId, name, price) => {
    if (usersGoodsId && price) {
      await modifyGoodsPriceRender(usersGoodsId, price);
    }
    if (usersGoodsId && name) {
      await modifyGoodsNameRender(usersGoodsId, name);
    }
    getAllRenderProducts();
    setIsOpen(false);
  };

  const handleGoodsDeleteButton = async (id) => {
    await deleteGoodsRender(id);
  };
  const handleGoodsNameChange = (e) => {
    const value = e.target.value;
    setEditNameText(value);
  };
  const handleGoodsPriceChange = (e) => {
    const value = e.target.value;
    setEditPriceText(value);
  };

  useEffect(() => {
    const filterGoodsData = goodsListData?.filter(
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
            postFilterGoodsData.map((goodsData) => (
              <div key={goodsData.usersGoodsId}>
                <GoodsImage url={goodsData.usersGoodsImgUrl} />
                <div>
                  <p>
                    상품 이름 :{" "}
                    <GoodsNameInput
                      name="name"
                      value={editNameText}
                      onChange={handleGoodsNameChange}
                    />
                  </p>
                  <GoodsDonationDiv>
                    <p>
                      후&nbsp; 원 &nbsp; 가 :
                      <GoodsDonationInput
                        name="price"
                        value={editPriceText}
                        onChange={handleGoodsPriceChange}
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
                          handleModifyGoodsButton(
                            goodsData.usersGoodsId,
                            editNameText,
                            editPriceText
                          )
                        }
                      >
                        수정하기
                      </ApiButton>
                      |
                      <ApiButton
                        onClick={() =>
                          handleGoodsDeleteButton(goodsData.usersGoodsId)
                        }
                      >
                        삭제하기
                      </ApiButton>
                    </div>
                  </OkorColsebuttonDiv>
                </div>
              </div>
            ))
          : postFilterGoodsData &&
            postFilterGoodsData.map((goodsData) => (
              <div key={goodsData.usersGoodsId} id={goodsData.usersGoodsId}>
                <GoodsImage url={goodsData.usersGoodsImgUrl} />
                <div>
                  <p>
                    상품 이름 :{" "}
                    <GoodsNameInput
                      value={editNameText}
                      onChange={handleGoodsNameChange}
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
                        onClick={() =>
                          handleGoodsDeleteButton(goodsData.usersGoodsId)
                        }
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
