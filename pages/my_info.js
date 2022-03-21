import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { db, auth } from "src/firebase";
import {
  ref,
  onValue,
  off,
  orderByChild,
  query,
  limitToLast,
} from "firebase/database";
import Top from "@component/Top";
import { AiOutlineLogout } from "react-icons/ai";

function MyInfo() {
  const userInfo = useSelector((state) => state.user.currentUser);
  const [rankingList, setRankingList] = useState();
  const [searchN, setSearchN] = useState(2);
  const router = useRouter();
  useEffect(() => {
    onValue(
      query(
        ref(db, `users/${userInfo.uid}/score/${searchN}`),
        orderByChild("score"),
        limitToLast(100)
      ),
      (data) => {
        let arr = [];
        data.forEach((el) => {
          arr.push(el.val());
        });
        arr.sort((a, b) => {
          return b.score - a.score;
        });
        setRankingList(arr);
      }
    );
    return () => {
      off(ref(db, `users/${userInfo.uid}/scroe/${searchN}`));
    };
  }, [searchN]);
  const onBack = (n) => {
    setSearchN(n);
  };

  const logout = () => {
    auth.signOut();
    router.push("/");
  };

  return (
    <>
      <Top />
      {userInfo && (
        <>
          <div className="my_info">
            <div className="top_info">
              <span>{userInfo.displayName}</span>
              <button type="button" onClick={logout}>
                <AiOutlineLogout />
                로그아웃
              </button>
            </div>
          </div>
          <div className="ranking_tab">
            <button
              type="button"
              className={searchN === 2 ? "on" : ""}
              onClick={() => onBack(2)}
            >
              2-back
            </button>
            <button
              type="button"
              className={searchN === 3 ? "on" : ""}
              onClick={() => onBack(3)}
            >
              3-back
            </button>
            <button
              type="button"
              className={searchN === 4 ? "on" : ""}
              onClick={() => onBack(4)}
            >
              4-back
            </button>
          </div>
          {rankingList && (
            <div className="ranking_box">
              <div className="header">
                <span className="num">순위</span>
                <span>점수</span>
                <span className="date">시간</span>
              </div>
              <ul className="ranking_list my">
                {rankingList.map((el, idx) => (
                  <li key={idx}>
                    <span className="num">{idx + 1}</span>
                    <span className="score">{el.score}</span>
                    <span className="date">{el.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default MyInfo;
