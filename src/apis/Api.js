import axios from "axios";

//상품 등록 게시판 생성
async function addBorderIdApi(token) {
  try {
    const res = await axios(
      `http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/`,
      {
        method: "GET",
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
    const response = await axios.get(
      `http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/usersgoods/all
      `,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//상품 등록
async function postGoodsProductApi(url, token) {
  try {
    const response = await axios.post(
      `http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/usersgoods/add/product`,
      {
        url: url,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//상품 삭제
async function deleteGoodsAdd(token, userGoodsId) {
  try {
    const response = await axios(
      `http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/usersgoods?usersGoodsId=${userGoodsId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//이름 계좌 시간 전체 조회
async function getWeddingHall(token) {
  try {
    const response = await axios.get(
      `http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/weddingHall/all
      `,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//신랑 이름 등록
async function addHusbandName(token, name) {
  try {
    const response = await axios.post(
      `http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/marriage/husband/name`,
      {
        name: name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}
//신부 이름 등록
async function addWifeName(token, name) {
  try {
    const response = await axios.post(
      `http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/marriage/wife/name`,
      {
        name: name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}

//신부 계좌 등록
async function addWifeAccount(token, account, bank) {
  try {
    const response = await axios.post(
      `http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/marriage/wife/account`,
      {
        account: account,
        bank: bank,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}
//신랑 계좌 등록
async function addHusbandAccount(token, account, bank) {
  try {
    const response = await axios.post(
      `http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/marriage/husband/account`,
      {
        account: account,
        bank: bank,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}

// 예식시간
async function addWeddingHallTime(token, date, time) {
  try {
    const response = await axios.post(
      `http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/weddingHall/time`,
      {
        date: date,
        time: time,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}
//예식장 주소 및 주소 변경
async function addWeddingHallLocation(token, address) {
  try {
    const response = await axios.post(
      `http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/weddingHall/location`,
      {
        address: address,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}

//후원가 수정
async function updateGoodsPrice(token, usersGoodsId, usersGoodsPrice) {
  try {
    const response = await axios.post(
      `http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/usersgoods/cost/update?usersGoodsId=${usersGoodsId}`,
      {
        usersGoodsPrice: usersGoodsPrice,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}

//상품이름 수정

async function updateGoodsname(token, usersGoodsId, usersGoodsName) {
  try {
    const response = await axios.post(
      `http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/usersgoods/name/update?usersGoodsId=${usersGoodsId}`,
      {
        usersGoodsName: usersGoodsName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}

//사진 조회
async function getGalleryWeddingImage(token) {
  try {
    const res = await axios.get(
      `http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/gallery/img`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
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
async function postGalleryWeddingImageAdd(formData, token) {
  console.log(formData);
  try {
    const res = await axios.post(
      `http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/gallery/img`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = res.data;
    return data;
  } catch (e) {
    console.error(e);
  }
}

//사진 삭제
async function deleteGalleryWeddingImage(galleryImgId, token) {
  try {
    await axios.delete(
      `http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/gallery/img/?galleryImgId=${galleryImgId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {
    console.error(e);
  }
}

//후원 사진 요청
async function getGallerySupportImage(token, getLocalGeustInfo) {
  try {
    const res = await axios.get(
      `http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/invitation/gallery/images`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Guest-Info": `${getLocalGeustInfo}`,
        },
      },
      { withCredentials: true }
    );
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

//후원 uuid 제공
async function getGallerySupportUUID(token, uuidFirst, uuidSecond) {
  try {
    const res = await axios.get(
      `http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/invitation/uuids/info?uuidFirst=${uuidFirst}&uuidSecond=${uuidSecond}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
      { withCredentials: true }
    );
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

//후원 페이지 상품 조회
async function getGoodsSupportItemsList(token, guestToken) {
  try {
    const res = await axios.get(
      `http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/invitation/weddingHall/products`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

// 후원 페이지 이름,계좌,장소,시간
async function getInforMationList(token, guestToken) {
  try {
    const res = await axios.get(
      `http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/invitation/weddingHall/info`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

//참석 정보
async function getWeddingAttendList(token, guestToken) {
  try {
    const res = await axios.get(
      `http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/invitation/weddingHall/attendance`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
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

//참석,불참석,미정
async function postWeddingAttendList(token, radioButtonValue, guestToken) {
  try {
    const res = await axios.post(
      `http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/invitation/weddingHall/attendance`,
      {
        attend: radioButtonValue,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
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

// 공유할 링크 가져오기
async function getGoodsUrlUUID(token) {
  try {
    const res = await axios.get(
      `http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/invitation/uuids`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = res.data;
    return data;
  } catch (e) {
    console.error(e);
  }
}

//후원 금액 등록 하기
async function postGoodsDonation(token, userGoodsId, donation, guestToken) {
  try {
    const res = await axios.post(
      `http://ec2-54-180-191-154.ap-northeast-2.compute.amazonaws.com:8081/invitation/weddingHall/donation`,
      {
        usersGoodsId: userGoodsId,
        donation: donation,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
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

export {
  getGoodsProductApi,
  postGoodsProductApi,
  deleteGoodsAdd,
  postGalleryWeddingImageAdd,
  deleteGalleryWeddingImage,
  getGalleryWeddingImage,
  addBorderIdApi,
  getGoodsUrlUUID,
  getGallerySupportImage,
  getGallerySupportUUID,
  getGoodsSupportItemsList,
  getInforMationList,
  postWeddingAttendList,
  getWeddingAttendList,
  updateGoodsname,
  updateGoodsPrice,
  getWeddingHall,
  addHusbandName,
  addWeddingHallTime,
  addWeddingHallLocation,
  addHusbandAccount,
  addWifeName,
  addWifeAccount,
  postGoodsDonation,
};
