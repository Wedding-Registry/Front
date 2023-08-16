import HttpClient from "../../apis/HttpClient";

//사진 조회
async function getGalleryWeddingImage() {
  try {
    const res = await HttpClient.get(`gallery/img`);
    const data = res.data;
    return data;
  } catch (e) {
    console.error(e);
  }
}

//사진 등록
async function addGalleryWeddingImage(formData) {
  try {
    const res = await HttpClient.post(`gallery/img`, formData);
    const data = res.data;
    return data;
  } catch (e) {
    console.error(e);
  }
}

//사진 삭제
async function deleteGalleryWeddingImage(galleryImgId) {
  try {
    await HttpClient.delete(`gallery/img/?galleryImgId=${galleryImgId}`);
  } catch (e) {
    console.error(e);
  }
}

export {
  getGalleryWeddingImage,
  addGalleryWeddingImage,
  deleteGalleryWeddingImage,
};
