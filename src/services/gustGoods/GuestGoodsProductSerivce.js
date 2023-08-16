import HttpClient from "../../apis/HttpClient";

//후원 페이지 상품 조회
async function getGoodsSupportItemsList(guestToken) {
  try {
    const res = await HttpClient.get(`/invitation/weddingHall/products`, {
      headers: {
        "Guest-Info": `${guestToken}`,
      },
    });
    const data = res.data;
    return data;
  } catch (e) {
    console.error(e);
  }
}

//후원 uuid 제공
async function getGallerySupportUUID(guestToken, uuidFirst, uuidSecond) {
  try {
    const res = await HttpClient.get(
      `invitation/uuids/info?uuidFirst=${uuidFirst}&uuidSecond=${uuidSecond}`,
      {
        headers: {
          "Guest-Info": `${guestToken}`,
        },
      }
    );
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

//후원 금액 등록 하기
async function postGoodsDonation(userGoodsId, donation, guestToken) {
  try {
    const res = await HttpClient.post(
      `invitation/weddingHall/donation`,
      {
        usersGoodsId: userGoodsId,
        donation: donation,
      },
      {
        headers: {
          "Guest-Info": `${guestToken}`,
        },
      }
    );
    const data = res.data;
    return data;
  } catch (e) {
    console.error(e);
  }
}

export { getGallerySupportUUID, postGoodsDonation, getGoodsSupportItemsList };
