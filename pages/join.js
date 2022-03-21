import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db, auth } from "src/firebase";
import { ref, onValue, remove, get, off, set } from "firebase/database";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { setUser } from "@redux/actions/user_action";
import Top from "@component/Top";

function Join() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const [loading, setLoading] = useState(false);

  const watchForm = watch();

  const password = useRef();
  password.current = watch("password");
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let createdUser = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(createdUser.user, {
        email: data.email,
        displayName: data.nick,
      });
      //Firebase 데이터베이스에 저장해주기
      await set(ref(db, `users/${createdUser.user.uid}`), {
        nick: createdUser.user.displayName,
        email: data.email,
      });

      setErrorFromSubmit("");
      setLoading(false);
      dispatch(setUser(createdUser.user));
      message.success(`${data.nick}님 반갑습니다 :)`);
      router.push("/");
    } catch (error) {
      setErrorFromSubmit(error.message);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  return (
    <>
      <Top />
      <div className="join-form-wrap">
        <form className="join-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-box">
            <input
              type="email"
              id="email"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            <label
              htmlFor="email"
              className={"place-holder " + (watchForm.email && "on")}
            >
              <span>이메일</span>
            </label>
            {errors.email && errors.email.type === "required" && (
              <p>이메일을 입력해 주세요</p>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <p>이메일 형식이 맞지 않습니다.</p>
            )}
          </div>

          <div className="input-box">
            <input
              type="text"
              id="nick"
              {...register("nick", {
                required: true,
                pattern: /[가-힣a-z0-9]{3,11}$/g,
              })}
            />
            <label
              htmlFor="nick"
              className={"place-holder " + (watchForm.nick && "on")}
            >
              <span>닉네임</span>
            </label>
            {errors.nick && errors.nick.type === "required" && (
              <p>닉네임을 입력해 주세요</p>
            )}
            {errors.nick && errors.nick.type === "pattern" && (
              <p>특수문자를 제외한 4~12자로 입력해 주세요</p>
            )}
          </div>

          <div className="input-box">
            <input
              type="password"
              id="password"
              {...register("password", { required: true, minLength: 6 })}
            />
            <label
              htmlFor="password"
              className={"place-holder " + (watchForm.password && "on")}
            >
              <span>비밀번호</span>
            </label>
            {errors.password && errors.password.type === "required" && (
              <p>비밀번호를 입력해 주세요</p>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <p>비밀번호는 최소 6글자이상 이어야 합니다.</p>
            )}
          </div>
          <div className="input-box">
            <input
              type="password"
              id="password2"
              {...register("password2", {
                required: true,
                validate: (value) => value === password.current,
              })}
            />
            <label
              htmlFor="password2"
              className={"place-holder " + (watchForm.password2 && "on")}
            >
              <span>비밀번호 확인</span>
            </label>
            {errors.password2 && errors.password2.type === "required" && (
              <p>비밀번호 확인을 입력해 주세요</p>
            )}
            {errors.password2 && errors.password2.type === "validate" && (
              <p>비밀번호가 일치하지 않습니다.</p>
            )}
            {errorFromSubmit && <p>{errorFromSubmit}</p>}
          </div>
          <input
            type="submit"
            style={{
              padding: "12px 10px",
              marginTop: "30px",
              fontSize: "16px",
            }}
            value="회원가입"
            disabled={loading}
          />
        </form>
      </div>
    </>
  );
}

export default Join;
