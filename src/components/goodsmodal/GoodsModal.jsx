import React, { useState, memo } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import { createGoods } from "../../services/goods/GoodsProductService";

import CreateState from "./createState/CreateState";
import logo from "@/assets/icons/logo.png";
import UpdateState from "./updateState/UpdateState";

function GoodsModal({
  setIsOpen,
  isOpen,
  goodsListData,
  deleteGoodsRender,
  getAllRenderProducts,
}) {
  const [getGoodsUrlItem, setGetGoodsUrlItem] = useState("");
  const [goodsData, setGoodsData] = useState([]);
  async function postGoodsListRender(url) {
    const goodsItems = await createGoods(url);
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
          {goodsListData && goodsListData ? <></> : <Logo src={logo} />}
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
            <UpdateState
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              goodsListData={goodsListData}
              deleteGoodsRender={deleteGoodsRender}
              getAllRenderProducts={getAllRenderProducts}
            />
          ) : (
            <CreateState
              setIsOpen={setIsOpen}
              setGetGoodsUrlItem={setGetGoodsUrlItem}
              postGoodsListRender={postGoodsListRender}
              getGoodsUrlItem={getGoodsUrlItem}
              goodsData={goodsData}
              deleteGoodsRender={deleteGoodsRender}
              getAllRenderProducts={getAllRenderProducts}
            />
          )}
        </TextDiv>
      </Container>
    </Base>
  );
}

export default memo(GoodsModal);

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
