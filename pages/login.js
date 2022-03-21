import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Form, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { auth } from "src/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setUser } from "@redux/actions/user_action";
import Top from "@component/Top";
//import { ReactComponent as Logo } from "../img/logo.svg";

function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const onFinish = (values) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        let user = userCredential.user;
        message.success(`${user.displayName}님 반갑습니다 :)`);
        dispatch(setUser(user));
        router.push("/");
      })
      .catch((error) => {
        let errorCode = error.code;
        if (errorCode === "auth/invalid-email") {
          message.error("이메일 형식이 맞지 않습니다.");
        }
        if (errorCode === "auth/wrong-password") {
          message.error("비밀번호가 맞지 않습니다.");
        }
      });
  };
  return (
    <>
      <Top />
      <div className="login_box">
        <div className="form_box">
          <Form
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "이메일 입력해 주세요" }]}
            >
              <Input size="large" placeholder="이메일" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "비밀번호를 입력해 주세요" }]}
            >
              <Input.Password size="large" placeholder="비밀번호" />
            </Form.Item>
            <Form.Item style={{ marginBlock: "10px" }}>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                로그인
              </Button>
            </Form.Item>
          </Form>
          <div className="join_link">
            <Link href="/join" className="btn_join">
              <a>회원가입</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
