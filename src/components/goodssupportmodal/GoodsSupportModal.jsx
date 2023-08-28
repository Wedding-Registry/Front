import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { postGoodsDonation } from "../../services/gustGoods/GuestGoodsProductSerivce";

export default function GoodsSupportModal({
  setIsOpen,
  goodsSupportData,
  usersGoodsId,
  guestToken,
  setGoodsSupportData,
}) {
  const [goodsSupportDataList, setGoodsSupportDataList] = useState([]);
  const [donationText, setDonationText] = useState("");

  async function postGoodsDonationRender(usersGoodsId, donation, guestToken) {
    const donationData = await postGoodsDonation(
      usersGoodsId,
      donation,
      guestToken
    );
    if (donationData.status === 400) {
      alert(donationData.message);
    } else {
      const data = goodsSupportData.map((goods) =>
        goods.usersGoodsId === donationData.data?.usersGoodsId
          ? {
              ...goods,
              usersGoodsTotalDonation:
                donationData.data.usersGoodsTotalDonation,
            }
          : goods
      );
      setGoodsSupportData(data);
    }
  }
  useEffect(() => {
    const filterGoodsData = goodsSupportData?.filter(
      (v) => v.usersGoodsId === usersGoodsId
    );
    setGoodsSupportDataList(filterGoodsData);
    //setDonationText(filterGoodsData[0].usersGoodsTotalDonation);
  }, []);

  const updateGoodsDonation = () => {
    postGoodsDonationRender(usersGoodsId, donationText, guestToken);
    setIsOpen(false);
  };
  const donationChange = (e) => {
    const value = e.target.value;
    setDonationText(value);
  };

  return (
    <Base>
      <Container>
        <TextDiv>
          {goodsSupportDataList.map((goods) => (
            <div id={goods.usersGoodsId} key={goods.usersGoodsId}>
              <GoodsImage url={goods.usersGoodsImgUrl} />
              <GoodsDonationDiv>
                <p>
                  상품 이름 :{" "}
                  <GoodsNameInput name="name" value={goods.usersGoodsName} />
                </p>
                <GoodsText>
                  후&nbsp; 원 &nbsp; 가 :{" "}
                  <GoodsDonationInput
                    value={donationText || ""}
                    onChange={donationChange}
                  />
                  원
                </GoodsText>
              </GoodsDonationDiv>
              <div style={{ width: "100%" }}>
                <OkorColsebuttonDiv>
                  <div>
                    <ApiButton onClick={updateGoodsDonation}>
                      등록하기
                    </ApiButton>
                  </div>
                </OkorColsebuttonDiv>
              </div>
            </div>
          ))}
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
        </TextDiv>
      </Container>
    </Base>
  );
}

const Base = styled.div`
  background: rgba(228, 230, 232, 0.7);
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

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
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

const GoodsText = styled.p`
  width: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
`;

const GoodsDonationInput = styled.input`
  border: none;
  background: rgba(228, 230, 232, 0.7);
  outline: none;
  width: 100px;
  height: 20px;
`;

const GoodsNameInput = styled.input`
  border: none;
  background: rgba(228, 230, 232, 0.7);
  outline: none;
  width: 400px;
  height: 20px;
  margin-bottom: 10px;
`;
