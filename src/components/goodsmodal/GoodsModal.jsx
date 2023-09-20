import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import {
  postGoodsProductApi,
  updateGoodsname,
  updateGoodsPrice,
} from "../../services/goods/GoodsProductService";

import logo from "@/assets/icons/logo.png";

//등록 상태
//상품 등록 전에 빈 text랑 등록 확인 취소
// 등록후 값이 변경되고 등록 확인 취소 버튼만 보인다.
function CreateGoodsState({
  getGoodsUrlItem,
  setGetGoodsUrlItem,
  setIsOpen,
  postGoodsListRender,
  goodsData,
  deleteGoodsRender,
}) {
  const getGoodsUrl = (e) => {
    setGetGoodsUrlItem(e.target.value);
  };

  const okButton = () => {
    setIsOpen(false);
  };

  const deleteButton = async (id) => {
    await deleteGoodsRender(id);
    setIsOpen(false);
  };

  const registerGoodsButton = async () => {
    await postGoodsListRender(getGoodsUrlItem);
  };
  return (
    <>
      <GoodsDiv>
        {goodsData?.length !== 0 && goodsData ? (
          <div id={goodsData.usersGoodsId} key={goodsData.usersGoodsId}>
            <CreateGoodsImage url={goodsData.usersGoodsImgUrl} />
            <div>
              <GoodsDonationDiv>
                <p>상품 이름 :{goodsData.usersGoodsName}</p>
                <GoodsText>
                  후&nbsp; 원 &nbsp; 가 : {goodsData.usersGoodsPrice}원
                </GoodsText>
              </GoodsDonationDiv>
            </div>
            <div style={{ width: "100%" }}>
              <OkorColsebuttonDiv>
                <div style={{ position: "absolute", top: "85%", right: "10%" }}>
                  <ApiButton onClick={okButton}>확인</ApiButton>|
                  <ApiButton
                    onClick={() => deleteButton(goodsData.usersGoodsId)}
                  >
                    취소
                  </ApiButton>
                </div>
              </OkorColsebuttonDiv>
            </div>
          </div>
        ) : (
          <>
            {goodsData?.length !== 0 && goodsData ? <></> : <Logo src={logo} />}
            <Text onChange={getGoodsUrl} value={getGoodsUrlItem} />
            <div>
              <GoodsDonationDiv>
                <p>
                  상품 이름 : <GoodsNameInput />
                </p>
                <p>
                  후&nbsp; 원 &nbsp; 가 : <GoodsDonationInput />원
                </p>
              </GoodsDonationDiv>
            </div>
            <div style={{ width: "100%" }}>
              <OkorColsebuttonDiv>
                <div>
                  <ApiButton onClick={registerGoodsButton}>등록하기</ApiButton>
                </div>
              </OkorColsebuttonDiv>
            </div>
          </>
        )}
      </GoodsDiv>
    </>
  );
}

// 수정 상태
// text url 후원가 상품 이름
// 수정 삭제하기 버튼 만들어짐

function UpdateGoodsState({
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

export default function GoodsModal({
  setIsOpen,
  setFetchData,
  isOpen,
  fetchData,
  deleteGoodsRender,
}) {
  const [getGoodsUrlItem, setGetGoodsUrlItem] = useState("");
  const [goodsData, setGoodsData] = useState([]);

  async function postGoodsListRender(url) {
    const goodsItems = await postGoodsProductApi(url);
    if (goodsItems.status === 400) {
      setGetGoodsUrlItem("");
      alert(goodsItems.message);
    }
    setGoodsData(goodsItems.data);
  }
  return (
    <Base>
      <Container>
        <TextDiv>
          {fetchData && fetchData ? <></> : <Logo src={logo} />}
          <AiOutlineClose
            style={{
              marginLeft: "auto",
              position: "absolute",
              top: "10%",
              right: "5%",
            }}
            onClick={() => {
              setIsOpen(false);
            }}
          />
          {isOpen.state === "View" ? (
            <UpdateGoodsState
              setIsOpen={setIsOpen}
              setFetchData={setFetchData}
              isOpen={isOpen}
              fetchData={fetchData}
              deleteGoodsRender={deleteGoodsRender}
            />
          ) : (
            <CreateGoodsState
              setIsOpen={setIsOpen}
              setGetGoodsUrlItem={setGetGoodsUrlItem}
              postGoodsListRender={postGoodsListRender}
              getGoodsUrlItem={getGoodsUrlItem}
              goodsData={goodsData}
              deleteGoodsRender={deleteGoodsRender}
            />
          )}
        </TextDiv>
      </Container>
    </Base>
  );
}

const Base = styled.div`
  background: rgb(228, 230, 232);
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
  width: 643px;
  height: 264px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  z-index: 1;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Container = styled.div`
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 40px;
  width: 621px;
  height: 242px;
  display: flex;
  justify-content: center;
  position: relative;
`;

const Logo = styled.img`
  margin-top: 5px;
  width: 40px;
  height: 28px;
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const Text = styled.input`
  width: 479px;
  height: 29px;
  background: #eeeeee;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  margin-top: 10px;
  padding-left: 10px;
`;

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

const CreateGoodsImage = styled.div`
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
  margin-left: 30%;
`;

const GoodsText = styled.p`
  width: 100%;
  justify-content: center;
  display: flex;
`;
