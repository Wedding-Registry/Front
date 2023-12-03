import HttpClient from "../../apis/HttpClient";

//상품 등록 게시판 생성
async function addBorderId() {
  try {
    const res = await HttpClient.get("usersgoods/add/board");
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

//상품 전체 조회
async function getGoodsList() {
  try {
    const response = await HttpClient.get(`usersgoods/all`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//상품 등록
async function createGoods(url) {
  try {
    const response = await HttpClient.post(`usersgoods/add/product`, {
      url: url,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//상품 삭제
async function deleteGoods(userGoodsId) {
  try {
    const response = await HttpClient.delete(
      `usersgoods?usersGoodsId=${userGoodsId}`
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//상품이름 수정

async function updateGoodsname(usersGoodsId, usersGoodsName) {
  try {
    const response = await HttpClient.post(
      `usersgoods/name/update?usersGoodsId=${usersGoodsId}`,
      {
        usersGoodsName: usersGoodsName,
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}

//후원가 수정
async function updateGoodsPrice(usersGoodsId, usersGoodsPrice) {
  try {
    const response = await HttpClient.post(
      `usersgoods/cost/update?usersGoodsId=${usersGoodsId}`,
      {
        usersGoodsPrice: usersGoodsPrice,
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}

export {
  addBorderId,
  getGoodsList,
  createGoods,
  deleteGoods,
  updateGoodsname,
  updateGoodsPrice,
};
