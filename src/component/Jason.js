import React, { useRef, useState } from "react";
import uuid from "react-uuid";
import { Form, Input, Button } from "antd";

function Jason() {
  const resRef = useRef();
  const onFinish = (values) => {
    let res = {};
    for (let i = 0; i < 100; i++) {
      let userArr = [
        "sy_87",
        "kmigmem",
        "ghrrr_",
        "phtooth",
        "pic_rot",
        "jyh91",
        "ksh12",
        "kingsman",
        "apple000",
        "timing1207",
        "computer00",
      ];
      let userPic = userArr[Math.floor(Math.random() * userArr.length)];
      let stepArr = [1, 1.2, 1.4];
      let step = stepArr[Math.floor(Math.random() * stepArr.length)];
      let ranScore = 100 * step * (Math.floor(Math.random() * 10) + 1);
      let obj = {
        [uuid()]: {
          date: "2022-03-13 22:45:31",
          score: ranScore,
          user: userPic,
        },
      };
      res = {
        ...res,
        ...obj,
      };
    }
    resRef.current.innerHTML = JSON.stringify(res);
  };
  return (
    <>
      <Form name="basic" onFinish={onFinish} autoComplete="off">
        <Form.Item label="date" name="date">
          <Input />
        </Form.Item>
        <Form.Item label="score" name="score">
          <Input />
        </Form.Item>
        <Form.Item label="user" name="user">
          <Input />
        </Form.Item>
        <Button htmlType="submit">create</Button>
      </Form>
      <div className="result" ref={resRef}></div>
    </>
  );
}

export default Jason;
