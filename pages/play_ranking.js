import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { SiSpeedtest } from "react-icons/si";
import { GiLevelEndFlag } from "react-icons/gi";
import { AiOutlineRedo } from "react-icons/ai";
import { IoExitOutline } from "react-icons/io5";
import { db } from "src/firebase";
import { ref, update } from "firebase/database";
import { getFormatDate } from "@component/CommonFunc";
import uuid from "react-uuid";

function Play_ranking() {
  const router = useRouter();
  const userInfo = useSelector((state) => state.user.currentUser);
  const gameSet = useSelector((state) => {
    return state.game;
  });
  const cardRef = useRef();
  const nextTime = gameSet.speed;
  const backNum = gameSet.nback;
  const score = gameSet.speed === 1000 ? 1.4 : gameSet.speed === 1500 ? 1.2 : 1;

  const [play, setPlay] = useState(false);
  const [finish, setFinish] = useState(false);
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState([]);
  const [mySelect, setMySelect] = useState([]);
  const [answer, setAnswer] = useState([]);

  let numArr = [];

  const initGame = () => {
    setCount(0);
    setFinish(false);
    setNumber([]);
    setMySelect([]);
    setAnswer([]);
  };

  const playGame = () => {
    initGame();
    setPlay(true);
  };

  const nextCard = () => {
    let num;
    if (number.length < backNum) {
      num = Math.round(Math.random() * (9 - 1) + 1);
    } else {
      let ranNum = Math.round(Math.random() * (100 - 1) + 1);
      if (ranNum >= 50) {
        num = number[number.length - backNum];
        setAnswer((arr) => [...arr, "O"]);
      } else {
        num = Math.round(Math.random() * (9 - 1) + 1);
        setAnswer((arr) => [...arr, "X"]);
      }
    }
    if (cardRef.current) {
      cardRef && cardRef.current.classList.add("ani_fade_in");
      cardRef && cardRef.current.classList.remove("ani_fade_out");
      setTimeout(() => {
        cardRef.current && cardRef.current.classList.remove("ani_fade_in");
        cardRef.current && cardRef.current.classList.add("ani_fade_out");
      }, 800);
    }
    setNumber((arr) => [...arr, num]);
    numArr.push(num);
  };

  const selectO = () => {
    setMySelect([...mySelect, "O"]);
  };
  const selectX = () => {
    setMySelect([...mySelect, "X"]);
  };

  //답 체크
  const [answerCount, setAnswerCount] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const checkAnswer = (func) => {
    let count = 0;
    answer.map((el, idx) => {
      if (mySelect[idx] && mySelect[idx] === el) {
        count++;
      }
    });
    setFinalScore(count * 100 * score);
    setAnswerCount(count);
    () => {};
    func(count * 100 * score);
  };
  const realtimeCheck = () => {
    let res = true;
    answer.map((el, idx) => {
      if (mySelect[idx] && mySelect[idx] !== el) {
        res = false;
      }
    });
    return res;
  };

  const endGame = () => {
    const curDate = getFormatDate(new Date());
    const dateFull = `${curDate.full}${curDate.hour}${curDate.min}${curDate.sec}`;
    const date = `${curDate.full_} ${curDate.hour}:${curDate.min}:${curDate.sec}`;
    checkAnswer((score) => {
      update(ref(db, `users/${userInfo.uid}/score/${backNum}/${dateFull}`), {
        score,
        date,
      });
      update(ref(db, `ranking/${backNum}/${uuid()}`), {
        score,
        date,
        user: userInfo.displayName,
      });
    });
    setPlay(false);
  };

  useEffect(() => {
    if (!realtimeCheck() || mySelect.length + 2 < answer.length) {
      setFinish(true);
    } else if (play) {
      setTimeout(() => {
        nextCard();
        setCount((pre) => pre + 1);
      }, nextTime);
    }
  }, [play, count]);

  const onHome = () => {
    router.push("/");
  };
  const onSetting = () => {
    router.push(`/setting/ranking`);
  };

  return (
    <>
      <div className="play_box">
        <button type="button" className="btn_exit" onClick={onHome}>
          <IoExitOutline />
        </button>
        {play ? (
          <>
            <div className="playing">
              {number.length > 0 && !finish && (
                <div ref={cardRef} className="card">
                  {number[number.length - 1]}
                </div>
              )}
              {finish && (
                <div className="btn_box">
                  <button type="button" onClick={endGame}>
                    결과보기
                  </button>
                </div>
              )}
              <div className="my_select">
                <button type="button" onClick={selectO}>
                  O
                </button>
                <button type="button" onClick={selectX}>
                  X
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {finish && (
              <>
                <div className="result">
                  <span className="tit">정답</span>
                  <ul className="list">
                    {answer.map((el, idx) => (
                      <li key={idx}>{el}</li>
                    ))}
                  </ul>
                  <span className="tit">나</span>
                  <ul className="list">
                    {mySelect.map((el, idx) =>
                      idx < answer.length ? <li key={idx}>{el}</li> : ""
                    )}
                  </ul>
                  <dl>
                    <dt>점수</dt>
                    <dd>{finalScore}</dd>
                  </dl>
                  <div className="btn_box">
                    <button type="button" onClick={playGame}>
                      랭킹보기
                    </button>
                    <button type="button" onClick={playGame}>
                      다시하기
                    </button>
                  </div>
                </div>
              </>
            )}
            {!finish && (
              <>
                <div className="start_box">
                  <ul className="setting_list">
                    <li>
                      <GiLevelEndFlag />
                      {backNum}-back
                    </li>
                    <li>
                      <SiSpeedtest />
                      {nextTime === 1000
                        ? "빠름"
                        : nextTime === 1500
                        ? "보통"
                        : "느림"}
                    </li>
                  </ul>
                  <div className="btn_box">
                    <button type="button" onClick={playGame}>
                      게임시작
                    </button>
                    <button type="button" onClick={onSetting}>
                      설정
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Play_ranking;
