import React from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authTokenAtom } from "@/state/authState.js";
import HttpClient from "@/apis/HttpClient.js";

const signUpValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "너무 짧아요!")
    .max(50, "너무 길어요!")
    .required("필수입니다!"),
  email: Yup.string()
    .email("유효하지 않은 이메일 형식입니다")
    .required("필수입니다!"),
});

const StyledWrapper = styled.div`
  width: 100%;
  min-width: 344px;
  margin-top: 2.5rem;
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

function SignUpMoreInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const setAuthToken = useSetRecoilState(authTokenAtom);
  const apiUrl = import.meta.env.VITE_HTTP_API_URL;

  return (
    <StyledWrapper>
      <Formik
        initialValues={{
          username: "",
          email: location.state.email || "",
          agreeEvent: false,
        }}
        validationSchema={signUpValidationSchema}
        onSubmit={async (values) => {
          try {
            const response = await HttpClient.post(
              `${apiUrl}auth/social/info`,
              {
                email: values.email,
                name: values.username,
                password: location.state.password || "",
                notification: values.agreeEvent,
              }
            );

            if (response.data.status === 200 || response.data.status === 201) {
              const { accessToken, refreshToken } = response.data.data;

              setAuthToken({
                accessToken: accessToken,
                refreshToken: refreshToken,
              });

              localStorage.setItem("refreshToken", accessToken);
              localStorage.setItem("accessToken", refreshToken);

              alert(`회원가입 완료!`);
              navigate("/");
            } else {
              alert(response.data.message);
              navigate("/signin");
            }
          } catch (error) {
            console.error("Login 실패:", error);
          }
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
          </Form>
        )}
      </Formik>
    </StyledWrapper>
  );
}

export default SignUpMoreInfo;
