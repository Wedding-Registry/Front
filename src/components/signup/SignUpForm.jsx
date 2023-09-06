import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authStateAtom } from "@/state/authState.js";
import { prevUrlPathState } from "../../state/prevUrlPathState";
import httpClient from "@/apis/HttpClient.js";

const signUpValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "너무 짧아요!")
    .max(50, "너무 길어요!")
    .required("필수입니다!"),
  email: Yup.string()
    .email("유효하지 않은 이메일 형식입니다")
    .required("필수입니다!"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{9,}$/i,
      "특수문자 최소 하나, 숫자 최소 하나, 영문 최소 하나, 최소 9자리"
    )
    .required("필수입니다!"),
  passwordCheck: Yup.string()
    .oneOf([Yup.ref("password"), null], "패스워드가 일치하지 않습니다")
    .required("필수입니다!"),
});

const StyledWrapper = styled.div`
  width: 100%;
  min-width: 344px;
  margin-top: 4.5rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(234, 234, 234, 0.4);
  form {
    margin: auto;
    width: 50%;
    min-width: 344px;

    input {
      width: 95%;
      min-height: 44px;
      margin-bottom: 0.5rem;
      border: 1px solid #818387;
      border-radius: 10px;
      padding-left: 0.8rem;
    }

    button {
      width: 100%;
      margin-bottom: 1rem;
    }
  }
  .error {
    color: red;
    font-size: 12px;
    margin-bottom: 0.5rem;
    margin-left: 0.3rem;
  }
  .left {
    margin-top: 0.5rem;
    label {
      font-size: 10px;
      input {
        min-width: 15px;
        min-height: 15px;
        width: 15px;
        height: 15px;
      }
    }
    div {
      margin-top: 0.5rem;
      font-size: 10px;
      color: #6c6c6ceb;
      line-height: 0.8rem;
    }
    margin-bottom: 1rem;
  }
  span {
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: center;
    span {
      color: #3f80ff;
      margin-left: 0.5rem;
      cursor: pointer;
    }
  }
`;

const StyledButton = styled.button`
  min-height: 44px;
  min-width: 344px;
  border-radius: 10px;
  color: #fff;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  background-color: #000000b2;
  border: none;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  margin-top: 3em;
  margin-bottom: 0.5rem;
`;

function SignUpForm() {
  const navigate = useNavigate();
  const setAuthState = useSetRecoilState(authStateAtom);
  const urlPathState = useRecoilValue(prevUrlPathState);
  const apiUrl = import.meta.env.VITE_HTTP_API_URL;

  return (
    <StyledWrapper>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          passwordCheck: "",
          agreeEvent: false,
        }}
        validationSchema={signUpValidationSchema}
        onSubmit={(values) => {
          httpClient
            .post(`${apiUrl}auth/signup`, {
              name: values.username,
              email: values.email,
              password: values.password,
              passwordCheck: values.passwordCheck,
              notification: values.agreeEvent,
            })
            .then((res) => {
              if (res.data.success === true) {
                setAuthState({
                  userId: res.data.data.userId,
                  userName: res.data.data.userName,
                  boardsId: res.data.data.boardsId,
                  accessToken: res.data.data.accessToken,
                  refreshToken: res.data.data.refreshToken,
                  needMoreInfo: res.data.data.needMoreInfo,
                });

                localStorage.setItem(
                  "refreshToken",
                  res.data.data.refreshToken
                );
                localStorage.setItem("accessToken", res.data.data.accessToken);
                if (urlPathState.length > 0) {
                  window.location.assign(urlPathState);
                  return;
                }

                alert(`회원가입 성공`);
                navigate("/");
              } else if (res.data.status === 400) {
                alert(`${res.data.message}`);
              } else {
                alert(`${res.data.message}`);
              }
            })
            .catch((res) => {
              console.log("error::: ", res);
            });
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="username" placeholder="성/이름" />
            {touched.username && errors.username && (
              <div className="error">{errors.username}</div>
            )}
            <Field name="email" placeholder="이메일" />
            {touched.email && errors.email && (
              <div className="error">{errors.email}</div>
            )}
            <Field name="password" placeholder="비밀번호" type="password" />
            {touched.password && errors.password && (
              <div className="error">{errors.password}</div>
            )}
            <Field
              name="passwordCheck"
              placeholder="비밀번호 확인"
              type="password"
            />
            {touched.passwordCheck && errors.passwordCheck && (
              <div className="error">{errors.passwordCheck}</div>
            )}
            <div className="left">
              <label>
                <Field type="checkbox" name="agreeEvent" /> 새 기능, 이벤트 홍보
                안내 등의 알림 수신
                <div>
                  이용약관의 변경이나 관계 법령에 따라 회원님께 안내되어야 할
                  중요 고지 사항은 메일 수신 동의 여무에 상관없이 안내될수
                  있습니다.
                </div>
              </label>
            </div>
            <StyledButton type="submit">회원가입 하기</StyledButton>
            <span>
              이미 계정이 있으세요?
              <span onClick={() => navigate(`/signin`)}>로그인</span>
            </span>
          </Form>
        )}
      </Formik>
    </StyledWrapper>
  );
}

export default SignUpForm;
