import React from "react";
import Link from "next/link";

function Main() {
  return (
    <>
      <div className="main_content">
        <img src="/img/logo.png" className="logo" />
        <ul>
          <li>
            <Link href="/play">
              <a>일반모드</a>
            </Link>
          </li>
          <li>
            <Link href="/setting">
              <a>설정</a>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Main;
