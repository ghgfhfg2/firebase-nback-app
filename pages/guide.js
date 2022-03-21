import React from "react";
import Top from "@component/Top";

function Guide() {
  return (
    <>
      <Top />
      <div className="guide_box">
        <h2>n-back</h2>
        <p>
          n-back은 두뇌활성화, 기억력과 집중력 향상에 도움을 주는 두뇌 훈련법
          입니다.
        </p>
        <h2>게임방법</h2>
        <ul className="info">
          <li>1. 차례로 나오는 카드에 쓰여진 숫자를 기억한다.</li>
          <li>
            2. 현재 나온 숫자와 설정된 n번째 전에 나온 수가 일치하다면 O, 틀리면
            X를 선택한다.
          </li>
          <li>
            예) 2-back의 경우 카드가 2, 4, 2, 5 라고 나왔을때 2번째 전의 카드와
            비교하면 되므로 정답은 O,X 가 됩니다.
          </li>
        </ul>
        <div className="guide_img">
          <img src="https://firebasestorage.googleapis.com/v0/b/n-back-c8156.appspot.com/o/guide.png?alt=media&token=7398e28f-5396-4e95-b95e-77fb250b4e12" />
        </div>
        <h2>일반모드</h2>
        <p>
          설정을 통해 난이도를 조절할 수 있으며 정해진 라운드만큼 게임이
          진행되고 게임종료 후 정답횟수를 확인 할 수 있습니다. 일반모드에서는
          랭킹을 매기지 않습니다.
        </p>
        <h2>랭킹모드</h2>
        <p>
          n-back 단계와 게임속도를 통해 난이도를 조절 할 수 있으며 오답이
          나오거나 일정라운드 이상 답을 선택하지 못할 경우 게임이 종료됩니다.
          게임이 종료되면 랭킹을 확인 할 수 있습니다.
          <br />
          ※정답횟수에 따라 점수가 올라가며 게임속도가 빠를수록 정답의 점수가
          높아집니다.
        </p>
      </div>
    </>
  );
}

export default Guide;
