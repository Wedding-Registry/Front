export const shareKaKaoLink = (HUSBAND_NAME, WIFE_NAME, uuid1, uuid2) => {
  //kakao sdk script 부른 후 window.kakao로 접근
  const INITIAL_LINK = `https://zolabayo.com/GallerySupport/${uuid1}/${uuid2}`;

  if (window.Kakao) {
    const kakao = window.Kakao;
    //중복 initalization 방지
    // 카카오에서 제공하는 javascirpt key를 이용하여  initiallze
    if (!kakao.isInitialized()) {
      //자바스크립트 키
      kakao.init("0140d2f1cdb4b1f0e243294bdeb84e57");
    }
    kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "ZOLABAYO",
        description: `${HUSBAND_NAME} ❤ ${WIFE_NAME}`,
        imageUrl:
          "https://www.urbanbrush.net/web/wp-content/uploads/edd/2022/09/urbanbrush-20220922134835594912.jpg", //local이나 내 ip는 사용할 수 없기 떄문에 test 불가 ,
        imageWidth: 1200,
        imageHeight: 630,
        link: {
          webUrl: INITIAL_LINK,
        },
      },
      buttons: [
        {
          title: "웹으로 보기",
          link: {
            webUrl: INITIAL_LINK,
          },
        },
      ],
    });
  }
};
