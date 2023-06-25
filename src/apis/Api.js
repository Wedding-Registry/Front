import axios from "axios";
import { getAccessToken } from '../tokens/token';

const token1 = getAccessToken();

const BASE_URL = 'http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081';

//상품 등록 게시판 생성
async function addBorderIdApi(token){
  try {
    const res = await axios(`http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/usersgoods/add/board`,
    {  
      method:"GET",
      headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = res.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}

//상품 전체 조회
async function getGoodsProductApi(token) {
  try {
    const response = await axios(`${BASE_URL}/usersgoods/all
    `,{
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

//상품 등록
async function postGoodsProductApi(url,token) {
  //borderid는 상품 등록 게시판 생성 시 만들어짐
  try {
    const response = await axios.post(`${BASE_URL}/usersgoods/add/product`, 
      {             
				url: url,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}

//상품 삭제
async function deleteGoodsAdd(userGoodsId,token) {
  try {
    const response = await fetch(`${BASE_URL}/usersgoods?usersGoodsId=${userGoodsId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = await response.json();
    return { data };
  } catch (error) {
    console.log(error);
  }
}

//후원가 수정
async function updateGoodsPrice(token,userGoodsId,usersGoodsPrice){
  try {
    const response = await axios.post(`${BASE_URL}/usersgoods/cost/update?usersGoodsId=${userGoodsId}`,      
      {             
        usersGoodsPrice: usersGoodsPrice,
      },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}


//상품이름 수정

async function updateGoodsname(token,userGoodsId,usersGoodsName){
  try {
    const response = await axios.post(`${BASE_URL}/usersgoods/name/update?usersGoodsId=${userGoodsId}`,      
      {             
        usersGoodsName: usersGoodsName,
      },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}

//사진 조회
async function getGalleryWeddingImage() {
  try {
    const res = await axios.get(
      `http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/gallery/img`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token1}`,
        },
      }
    );
    const data = res.data;
    return data;
  } catch (e) {
    console.error(e);
  }
}

//사진 등록
async function postGalleryWeddingImageAdd(formData) {
  try {
    const res = await axios.post(
      `http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/gallery/img`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${token1}`,
        },
      }
    );
    return res;
  } catch (e) {
    console.error(e);
  }
}

//사진 삭제
async function deleteGalleryWeddingImage(galleryImgId) {
  try {
    await axios.delete(
      `http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/gallery/img/?galleryImgId=${galleryImgId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token1}`,
        },
      }      
    );      
  } catch (e) {
    console.error(e);
  }
}



export {
  getGoodsProductApi,
  postGoodsProductApi,
  deleteGoodsAdd,
  postGalleryWeddingImageAdd,
  deleteGalleryWeddingImage,
  getGalleryWeddingImage,
  addBorderIdApi,
  updateGoodsPrice,
  updateGoodsname
};
