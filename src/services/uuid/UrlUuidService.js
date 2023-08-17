import HttpClient from "../../apis/HttpClient";

// 공유할 링크 가져오기
async function getGoodsUrlUUID() {
  try {
    const res = await HttpClient.get(`invitation/uuids`);
    const data = res.data;
    return data;
  } catch (e) {
    console.error(e);
  }
}

export { getGoodsUrlUUID };
