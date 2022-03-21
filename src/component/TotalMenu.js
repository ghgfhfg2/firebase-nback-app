import React from "react";
import { Button } from "antd";
import * as antIcon from "react-icons/ai";
import style from "styles/nav.module.css";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth, provider } from "src/firebase";
import { setUser, clearUser } from "@redux/actions/user_action";

function TotalMenu({ visible, onCloseMenu }) {
  const userInfo = useSelector((state) => state.user.currentUser);
  const router = useRouter();

  //메뉴닫기
  const onLinkCheck = (e) => {
    if (e.target.tagName === "A") onCloseMenu();
  };

  const logout = () => {
    signOut(auth).then(() => {
      router.push("/");
    });
  };
  return (
    <>
      <nav
        className={
          visible ? `${style[`nav-box`]} ${style.on}` : `${style[`nav-box`]}`
        }
      >
        {userInfo ? (
          <>
            <span>{userInfo.displayName}</span>
            <button type="button" onClick={logout}>
              logout
            </button>
          </>
        ) : (
          <>
            <Link href="/join">
              <a>회원가입</a>
            </Link>
          </>
        )}
        <button
          type="button"
          className={style[`btn-close`]}
          onClick={onCloseMenu}
        >
          <antIcon.AiOutlineClose />
        </button>
        <ul className={style.nav} onClick={onLinkCheck}>
          {userInfo && userInfo.email === "sooya1207@gmail.com" && (
            <li>
              <Link href="/regist">
                <a>등록</a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <div
        onClick={onCloseMenu}
        className={visible ? `${style.bg} ${style.on}` : `${style.bg}`}
      ></div>
    </>
  );
}

export default TotalMenu;
