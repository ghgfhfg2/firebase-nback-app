import React, { useState, useEffect } from "react";
import { db } from "src/firebase";
import {
  ref,
  onValue,
  off,
  orderByChild,
  query,
  limitToLast,
} from "firebase/database";
import Top from "@component/Top";
import { AiOutlineCrown } from "react-icons/ai";

function Ranking() {
  const [rankingList, setRankingList] = useState();
  const [searchN, setSearchN] = useState(2);
  useEffect(() => {
    onValue(
      query(
        ref(db, `ranking/${searchN}`),
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
      off(ref(db, `ranking/${searchN}`));
    };
  }, [searchN]);
  const onBack = (n) => {
    setSearchN(n);
  };

  return (
    <>
      <Top />
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
            <span className="name">닉네임</span>
            <span>점수</span>
          </div>
          <ul className="ranking_list">
            {rankingList.map((el, idx) => (
              <li key={idx}>
                <span className="num">
                  {idx === 0 ? (
                    <AiOutlineCrown
                      style={{
                        position: "relative",
                        top: "2px",
                        fontSize: "15px",
                      }}
                    />
                  ) : (
                    `${idx + 1}`
                  )}
                </span>
                <span className="name">{el.user}</span>
                <span className="score">{el.score}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Ranking;
