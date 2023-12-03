//등록 상태
//상품 등록 전에 빈 text랑 등록 확인 취소
import React from "react";
import styled from "styled-components";
import logo from "@/assets/icons/logo.png";

export default function CreateState({
  getGoodsUrlItem,
  setGetGoodsUrlItem,
  setIsOpen,
  postGoodsListRender,
  goodsData,
  deleteGoodsRender,
  getAllRenderProducts,
}) {
  const handleGoodsUrl = (e) => {
    setGetGoodsUrlItem(e.target.value);
  };

  const handleGoodsCheckButton = async () => {
    setIsOpen(false);
    await getAllRenderProducts();
  };

  const handleDeleteButton = async (id) => {
    await deleteGoodsRender(id);
    setIsOpen(false);
  };

  const handleCreateGoodsButton = async () => {
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
                  <ApiButton onClick={handleGoodsCheckButton}>확인</ApiButton>|
                  <ApiButton
                    onClick={() => handleDeleteButton(goodsData.usersGoodsId)}
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
            <Text onChange={handleGoodsUrl} value={getGoodsUrlItem} />
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
                  <ApiButton onClick={handleCreateGoodsButton}>
                    등록하기
                  </ApiButton>
                </div>
              </OkorColsebuttonDiv>
            </div>
          </>
        )}
      </GoodsDiv>
    </>
  );
}

const Logo = styled.img`
  margin-top: 5px;
  width: 40px;
  height: 28px;
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
