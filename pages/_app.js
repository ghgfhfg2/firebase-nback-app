import React, { useEffect } from "react";
import Top from "@component/Top";
import "styles/globals.css";
import "antd/dist/antd.css";
import "styles/App.css";
import wrapper from "@redux/store/configureStore";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setUser, clearUser } from "@redux/actions/user_action";
import { db, auth } from "src/firebase";
import { ref, onValue, off, get } from "firebase/database";
import Main from "@component/Main";
import AppLayout from "@component/AppLayout";

function App({ Component, pageProps }) {
  let dispatch = useDispatch();
  const router = useRouter();
  const path = router.pathname;
  auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch(setUser(user));
    } else {
      dispatch(clearUser());
    }
  });

  const setScreenSize = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    setScreenSize();
    window.addEventListener("resize", () => setScreenSize());
  }, []);

  return (
    <>
      <div id="content">
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </div>
    </>
  );
}

export default wrapper.withRedux(App);
