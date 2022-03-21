import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { SiSpeedtest } from "react-icons/si";
import { GiLevelEndFlag } from "react-icons/gi";
import { AiOutlineRedo } from "react-icons/ai";
import { IoExitOutline } from "react-icons/io5";

function Play() {
  const router = useRouter();
  const gameSet = useSelector((state) => {
    return state.game;
  });
  const cardRef = useRef();
  const nextTime = gameSet.speed;
  const backNum = gameSet.nback;
  const finishCount = gameSet.count + gameSet.nback;

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
  const checkAnswer = () => {
    let count = 0;
    answer.map((el, idx) => {
      if (mySelect[idx] && mySelect[idx] === el) {
        count++;
      }
    });
    setAnswerCount(count);
  };

  const endGame = () => {
    checkAnswer();
    setPlay(false);
  };

  useEffect(() => {
    if (count < finishCount && play) {
      setTimeout(() => {
        nextCard();
        setCount((pre) => pre + 1);
      }, nextTime);
    } else if (count === finishCount) {
      setTimeout(() => {
        setFinish(true);
      }, nextTime);
    }
  }, [play, count]);

  const onHome = () => {
    router.push("/");
  };
  const onSetting = () => {
    router.push("/setting/basic");
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
                    <dt>정답수</dt>
                    <dd>{answerCount}</dd>
                  </dl>
                  <dl>
                    <dt>정답률</dt>
                    <dd>{Math.round((answerCount / gameSet.count) * 100)}%</dd>
                  </dl>
                  <div className="btn_box">
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
                      {gameSet.nback}-back
                    </li>
                    <li>
                      <SiSpeedtest />
                      {gameSet.speed === 1000
                        ? "빠름"
                        : gameSet.speed === 2000
                        ? "보통"
                        : "느림"}
                    </li>
                    <li>
                      <AiOutlineRedo />
                      {gameSet.count}
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

export default Play;
