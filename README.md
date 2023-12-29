# Wedding Resitry

<br />

## ABOUT

<div align='center'>
    <h2> Wedding Resitry</h2>  
    <p>결혼을 진행하는 부부에게 결혼 선물을 무엇이 좋을지 고민 하고 또한, 부부의 입장에서는 선뜻 말로 선물을 받고 싶어하는 물품을 말하기 부담스러운 상황이 발생할 수 있었습니다.
부담을 줄이고 조금 더 편리하게 원하는 선물을 받을 수 있고 후원할 수 있도록 하기 위해 시스템을 만들게 되었습니다.</p>
    <br />    
</div>

## TEAM

<div align='center'>
<table> 
  <tbody>
    <tr>            
       <td align="center"><a href="https://github.com/rondido"><img src="https://avatars.githubusercontent.com/u/55516901?v=4" width="100px;" alt=""/><br /><sub><b>박진현</b></sub></a><br /></td>
       <td align="center"><a href="https://github.com/YunHeeW"><img src="https://avatars.githubusercontent.com/u/102518144?v=4" width="100px;" alt=""/><br /><sub><b>원윤희</b></sub></a><br /></td>            
    </tr>
  </tbody>
</table>
</div>

<br />

## 기술 스택

- Development

  ![React](https://img.shields.io/badge/React-18.2.0-1E90FF?logo=React)
  ![Vite](https://img.shields.io/badge/Vite-4.1.0-C8C8FF?logo=Vite)
  ![react-router-dom](https://img.shields.io/badge/react--router-6.14.1-CA4245?logo=reactRouter)
  ![styled-components](https://img.shields.io/badge/styled--components%2Fcss-1.12.0-28A745?logo=styled-components)
  ![axios](https://img.shields.io/badge/axios-1.4.0-%23671DDF?logo=axios)
  ![Recoil](https://img.shields.io/badge/Recoil--0.7.7-1E90FF?logo=Recoil)
  ![Msw](https://img.shields.io/badge/Msw--1.1.0-FF8C8C?logo=Msw)
  ![Swiper](https://img.shields.io/badge/Swiper--9.1.0-0064FF?logo=Swiper)
  ![Js-base64](https://img.shields.io/badge/Js-base64--3.7.5-FFB400?logo=Js-base64)
  ![Eslint](https://img.shields.io/badge/Eslint--8.35.0-7B68EE?logo=Eslint)
  ![Prettier](https://img.shields.io/badge/Prettier--2.8.8-483D8B?logo=Prettier)

## 폴더 구조

```
📦src
 ┣ 📂apis
 ┣ 📂assets
 ┣ 📂components
 ┣ 📂containers
 ┣ 📂hooks
 ┣ 📂mocks => msw를 관련 폴더
 ┣ 📂pages
 ┣ 📂repository 
 ┣ 📂services 
 ┣ 📂state
 ┣ 📂tokens
 ┣ 📂style
 ┣ 📂util
 ┣ App.jsx
 ┣ Main.jsx

```

## 실행 방법

```bash
yarn run dev
# or
yarn run build

```

## 디자인

---

<p><a href="https://www.figma.com/file/SOfzSbhZvdaFUsZ0j7LYvR/wedding-registry?node-id=501%3A2962&t=tSYXjYRKPVBnvgc0-0">Figma 링크 주소</a>
</p>

## Work flow

---

<p><a href="https://whimsical.com/wedding-AXkPY3swAd2tK6g4pmPmAr">work flow</a></p>

## 일정관리

---

- Jira로 일정 관리

![Jira](https://github.com/Wedding-Registry/Front/assets/55516901/deb1cef5-3be2-4874-9af5-054a09d1c4a0)

## 회의록

---

<p><a href="https://shell-barnacle-687.notion.site/TEAM-A-67efc05b8c2244ad8e438f22da89423e">노션 회의록 링크</a></p>

<br/>

## 서비스 소개

---

### 기능

- 메인 페이지
- 상품 등록 페이지
  - 상품 등록
  - 결혼식 날짜 및 시간 CRUD
  - 결혼하는 부부에 대한 정보 등록,수정
- 상품 후원 페이지
  - 결혼식 참석 여부 체크
  - 결혼하는 부부가 등록 상품에 대한 후원 금액 CRUD
- 웨딩 사진 등록 페이지
  - 사진 등록, 삭제
- 웨딩 사진 후원 페이지
  - 결혼하는 부부가 등록한 사진 확인
- 회원 가입 페이지
- 로그인 페이지
- 관리자 페이지(메인)
- 관리자 페이지(후원자 리스트)
- 관리자 페이지(결혼식 참석 여부 리스트)
- 관리자 페이지(알림 목록)
- 관리자 페이지(메모)
 

<br />

## 회고

---

- Rondido

1. 항상 리팩토링과 유지보수성에 대해 고민하고 있었지만 어느샌가 기능 구현에 급급하여 리팩토링을 나중에 하자라는 생각을 가지게 되었다. 실제 현업에서 '과연 기능 구현(모든 프로젝트 기능 구현이 끝난 후)을 다 끝낸 후 리팩토링을 할 시간이 주어질까?' 라고 고민 했을때 나의 답은 아니라고 말할 수 있다. 그렇기 때문에 1개의 기능을 완성할 때마다 바로바로 리팩토링을 해야한다고 느꼈다.

2. 현재 나의 코드를 보면 api 통신을 할때 JWT 인증을 위해 token 값을 보내줘야 하는대 Page 폴더에서 tokens폴더에 있는 getAccessToken()이라는 함수를 통해 모든 Page에서 호출하여 props로 전달. 그렇다면 모든 페이지에서 호출하는것이 아니라 httpClient단에서 호출하면 모든 페이지에서 호출할 필요가 없지 않을까라는 결과를 도출

```
//navbar 알림
async function headerNavbarApi(token) {
  try {
    const res = await axios(
      `navbar/alarm/all`,
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
```

```
import axios from "axios";
const tokenHandler = () => localStorage.getItem("accessToken");
const baseURL = import.meta.env.VITE_HTTP_API_URL;
// axios 생성
const HttpClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

HttpClient.interceptors.request.use(
  async (config) => {
    config.headers["Content-Type"] = "application/json";
    const token = tokenHandler();
    if (token !== null || token !== undefined) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  async (error) => {
    console.error("에러발생", error);
    return Promise.reject(error);
  }
);

HttpClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default HttpClient;


```

- 리팩토링 하기 전 코드에서는 api를 호출할때마다 매개변수로 token값을 받아와야했지만 httpClient에서 token을 값을 직접 주입하기 때문에 넣어 줄 필요가 없어졌다.
- axios Interceptors를 활용하여 http 통신 단계에서 중간에 가로채서 token값 직접 주입하기


3. Recoil을 사용하기 위해 라이브러리를 사용할 수 있었지만 왜 사용하지 않았나?

- 우선 기본적인 React hooks조차 제대로 활용하지 못한 생각이 들었다.
- 현재 나의 기준에서 props drilling이 심한 편이 아니라고 생각했고 무작정 Recoil을 사용한다면 그것 또한 낭비라고 생각이 들었다.
- 상태 자체를 전역적으로 관리해야할 경우에는 Recoil사용하여 상태를 관리하였다.
- 추후 리팩토링 과정에서 props drilling이 심할 경우 Recoil로 바꿀 것이다.

4. Localstorage의 token을 어떻게 관리하는 것이 좋은가?
![image](https://github.com/Wedding-Registry/Front/assets/55516901/013fa310-c7e2-44e1-81b0-97202f15d66c)


5. AWS S3를 통한 배포
- Github actions를 통한 자동화 배포 구현


---

- YunHeeW

1. 서비스를 생각하며 사용자 관점에서 편의성, 시각적 처리를 적용하는 것이 중요하다는 것을 체감했다.
2. 협업을 위한 네이밍, 코드, 구조 등 많은 것을 팀원과 함께 고민할수록 이후 작업의 효율이 높아진다는 것을 느꼈다.
3. SNS로그인(구글,카카오)를 적용하기 위해 OAuth2.0를 사용하면서 인증 방식에 대한 개념을 다시 생각해보게 되었다.

#### OAuth2.0 flow
![img_2](https://firebasestorage.googleapis.com/v0/b/imgsources.appspot.com/o/img_2.png?alt=media&token=38b0c54d-8a2b-4803-aaf4-7612985e4360)


### JWT flow
![img_3](https://firebasestorage.googleapis.com/v0/b/imgsources.appspot.com/o/img_3.png?alt=media&token=8acdceed-3223-4a65-b951-3bf796f3cc91)

