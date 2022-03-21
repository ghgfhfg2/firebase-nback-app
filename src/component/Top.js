import React, { useState } from "react";
import Link from "next/link";
import * as antIcon from "react-icons/ai";
import style from "styles/header.module.css";
import TotalMenu from "@component/TotalMenu";
import { useRouter } from "next/router";
import { IoChevronBackOutline } from "react-icons/io5";

function Top() {
  const router = useRouter();
  const path = router.pathname;
  const onBack = () => {
    router.back();
  };
  return (
    <>
      <header className={style.header}>
        <button type="button" className={style[`btn-menu`]} onClick={onBack}>
          <IoChevronBackOutline className={style.ic} />
        </button>
        {path.includes("/setting")
          ? "게임설정"
          : path.includes("/guide")
          ? "가이드"
          : path.includes("/ranking")
          ? "랭킹"
          : path.includes("/my_info")
          ? "내정보"
          : path.includes("/join")
          ? "회원가입"
          : path.includes("/login")
          ? "로그인"
          : ""}
      </header>
    </>
  );
}

export default Top;
