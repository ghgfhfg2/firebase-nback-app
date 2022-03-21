import React from "react";
import { Form, Input, Button } from "antd";
import { db } from "src/firebase";
import { collection, doc, setDoc, getDocs, addDoc } from "firebase/firestore";

function regist() {
  const onFinish = (values) => {
    try {
      setDoc(doc(db, "portfolio", values.title), {
        ...values,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="title"
          name="title"
          rules={[{ required: true, message: "title은 필수입니다." }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="url"
          name="url"
          rules={[{ required: true, message: "url은 필수입니다." }]}
        >
          <Input />
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button type="primary" htmlType="submit" style={{ width: "50%" }}>
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
}

export default regist;
