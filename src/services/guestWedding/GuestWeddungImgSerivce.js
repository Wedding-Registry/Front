import HttpClient from "../../apis/HttpClient";

//후원 uuid 제공
async function getGallerySupportUUID(uuidFirst, uuidSecond) {
  try {
    const res = await HttpClient.get(
      `invitation/uuids/info?uuidFirst=${uuidFirst}&uuidSecond=${uuidSecond}`
    );
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

//후원 사진 요청
async function getGallerySupportImage(getLocalGeustInfo) {
  try {
    const res = await HttpClient.get(`invitation/gallery/images`, {
      headers: {
        "Guest-Info": `${getLocalGeustInfo}`,
      },
    });
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

export { getGallerySupportImage, getGallerySupportUUID };
