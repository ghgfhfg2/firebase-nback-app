import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { message } from "antd";

function Main() {
  const userInfo = useSelector((state) => state.user.currentUser);
  const onRanking = () => {
    message.error("로그인이 필요합니다.");
  };
  return (
    <>
      <div className="main_content">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/n-back-c8156.appspot.com/o/logo.png?alt=media&token=b36736a6-0889-47b6-bb3f-7c7c5b03e3f9"
          className="logo"
        />
        <ul>
          <li>
            <Link href="/play">
              <a>일반모드</a>
            </Link>
          </li>
          <li className={userInfo ? "" : "disable"}>
            {userInfo ? (
              <Link href="/play_ranking">
                <a>랭킹모드</a>
              </Link>
            ) : (
              <button className="btn_ranking" type="button" onClick={onRanking}>
                랭킹모드
              </button>
            )}
          </li>
          <li>
            <Link href="/ranking">
              <a>랭킹</a>
            </Link>
          </li>
          <li>
            <Link href="/guide">
              <a>게임방법</a>
            </Link>
          </li>
          {userInfo ? (
            <li>
              <Link href="/my_info">
                <a>내 정보</a>
              </Link>
            </li>
          ) : (
            <li>
              <Link href="/login">
                <a>로그인</a>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

export default Main;
