import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

import logo from "@/assets/icons/logo.png";
import {  deleteGoodsAdd, postGoodsProductApi,getGoodsProductApi,updateGoodsPrice,updateGoodsname } from "../../apis/Api";
import { useRecoilState } from 'recoil';
import {goodsState} from '../../state/goosState';

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
  width: 135px;
  height: 135px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-repeat: no-repeat;
  
  margin-bottom: 10px;
`;

const GoodsText = styled.p`
  width: 100%;
  justify-content: center;
  display: flex;
`;

//등록 상태
//상품 등록 전에 빈 text랑 등록 확인 취소
// 등록후 값이 변경되고 등록 확인 취소 버튼만 보인다.
function CreateGoodsState({getGoodsUrlItem,setGetGoodsUrlItem,setIsOpen,token,postGoodsListRender,setGoosData,goodsData}){
  const getGoodsUrl = (e) => {
    setGetGoodsUrlItem(e.target.value);
  };

  const okButton = () => {
    setIsOpen(false);
  };

  const deleteButton = () => {
    deleteGoodsAdd();    
    setIsOpen(false);
  };

  const registerGoodsButton = async() =>{
    const createData = await postGoodsListRender(getGoodsUrlItem,token)
    setGoosData(createData.data);
  }
  return(
    <>            
      {
        goodsData.data && goodsData.data  ? goodsData.data.map((v)=>(
          <>
          <GoodsDiv key={v.usersGoodsImgId}>
            <GoodsImage url={v.usersGoodsImgUrl} />
            <GoodsText>상품 이름 : {v.usersGoodsName}</GoodsText>
            <GoodsDonationDiv>
              <GoodsText>
                후&nbsp; 원 &nbsp; 가 : {v.usersGoodsPrice}원
              </GoodsText>
            </GoodsDonationDiv>
          </GoodsDiv>
        </>
        ))              
      : (  
        <>
          <Text onChange={getGoodsUrl} />
          <div>
            <p>
              상품 이름 : <GoodsNameInput />
            </p>
            <GoodsDonationDiv>
              <p>
                후&nbsp; 원 &nbsp; 가 : <GoodsDonationInput />원
              </p>
            </GoodsDonationDiv>
          </div>            
        </>
      )      
    }  
      <div style={{ width: "100%" }}>
        <OkorColsebuttonDiv>
          <div>
            <ApiButton onClick={registerGoodsButton}>등록하기</ApiButton>
          </div>
            <div
              style={{ position: "absolute", top: "85%", right: "10%" }}
            >
              <ApiButton onClick={okButton}>확인</ApiButton>|
              <ApiButton onClick={deleteButton}>취소</ApiButton>
            </div>                          
        </OkorColsebuttonDiv>
      </div>      
    </>
  )
}


// 수정 상태
// text url 후원가 상품 이름
// 수정 삭제하기 버튼 만들어짐

function UpdateGoodsState({setGoosData,token,goodsData}){
  async function updateGoodsPriceRender(token,userGoodsId,usersGoodsName){
    const dataPrice = await updateGoodsPrice(token,userGoodsId,usersGoodsName)
    setGoosData(dataPrice.data);
  }
  
  async function updateGoodsNameRender(token,userGoodsId,usersGoodsPrice){
    const dataName = await updateGoodsname(token,userGoodsId,usersGoodsPrice)
    setGoosData(dataName.data);
  }

  const updateGoodsAllClick = (token,userGoodsId) =>{  
    updateGoodsPriceRender(token,userGoodsId);
    updateGoodsNameRender(token,userGoodsId);
  }
  const updateGoodsNameChange = (e) =>{
    const value = e.target.value;
    updateGoodsNameRender(value);
  }

  const updateGoodsPriceChange = (e) =>{
    const value = e.target.value;
    updateGoodsPriceRender(value);
  }

  return(
    <>
      {goodsData.data && goodsData.data ? goodsData.data.map((v)=>(
        <>
        <GoodsDiv>       
         <Text value={v.usersGoodsImgUrl} disabled="true"/>
          <div>
            <p>
              상품 이름 : <GoodsNameInput value={v.usersGoodsName} onChange={updateGoodsNameChange}/>
            </p>
            <GoodsDonationDiv>
              <p>
                후&nbsp; 원 &nbsp; 가 : <GoodsDonationInput value={v.usersGoodsPrice} onChange={updateGoodsPriceChange}/>원
              </p>
            </GoodsDonationDiv>
          </div>
          <div style={{ width: "100%" }}>
          <OkorColsebuttonDiv>    
              <div
                style={{ position: "absolute", top: "85%", right: "10%" }}
                >
                  <ApiButton onClick={()=>updateGoodsAllClick(token,v.userGoodsId)}>수정하기</ApiButton> |
                  <ApiButton>삭제하기</ApiButton>
              </div>                          
          </OkorColsebuttonDiv>
          </div>
        </GoodsDiv>       
        </>
      ))      
    : 
      <></>
    }
  </>
  )
}

export default function GoodsModal({setIsOpen,setFetchData,token,fetchdata}) { 

  const [goodsData, setGoosData] = useRecoilState(goodsState)
  const [getGoodsUrlItem, setGetGoodsUrlItem] = useState("");

  async function getGoodsList(token){
    const data = await getGoodsProductApi(token)
    setGoosData(data.data);
  }

  async function postGoodsListRender(token) {
    const goodsItems = await postGoodsProductApi(getGoodsUrlItem,token);     
    setGoosData(goodsItems.data);    
  }

  useEffect(()=>{
    getGoodsList(token)
  },[])

  return (
    <Base>
      <Container>
        <TextDiv>
          {goodsData && goodsData ? <></> : <Logo src={logo} />}          
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
          {
            goodsData.data && goodsData.data ? 
            (<UpdateGoodsState goodsData={goodsData} setIsOpen={setIsOpen} token={token} setGetGoodsUrlItem={setGetGoodsUrlItem} postGoodsListRender={postGoodsListRender} setGoosData={setGoosData} setFetchData={setFetchData} fetchdata={fetchdata}/>):
            (<CreateGoodsState setIsOpen={setIsOpen} token={token} setGetGoodsUrlItem={setGetGoodsUrlItem} postGoodsListRender={postGoodsListRender} setGoosData={setGoosData} goodsData={goodsData}/>)
          }
          {/* 등록하기 상태인지 수정하기 상태인지 판별 */}
          {/* {
            goodsData.data && goodsData.data ? goodsData.data.map((v)=>(
              <>
              <Text value={v.usersGoodsImgUrl}/>
               <div>                
                  <p>
                    <GoodsText>상품 이름 : {v.usersGoodsName}</GoodsText>
                  </p>
                  <GoodsDonationDiv>
                    <GoodsText>
                      후&nbsp; 원 &nbsp; 가 : {v.usersGoodsPrice}원
                    </GoodsText>
                  </GoodsDonationDiv>
                </div>
               <ApiButton onClick={postGoodsList}>수정하기</ApiButton> |
               <ApiButton>삭제하기</ApiButton>
              </>              
            ))
                       
           :(
              <></>
            )
          } */}
        
        </TextDiv>
      </Container>
    </Base>
  );
}
