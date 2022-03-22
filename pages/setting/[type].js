import React, { useEffect } from "react";
import { setGame } from "@redux/actions/user_action";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Top from "@component/Top";

function Setting() {
  const dispatch = useDispatch();
  const router = useRouter();
  const type = router.query.type;
  const gameSet = useSelector((state) => {
    return state.game;
  });
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nback: gameSet ? String(gameSet.nback) : "2",
      speed: gameSet ? String(gameSet.speed) : "1500",
      count: gameSet ? String(gameSet.count) : "10",
    },
  });
  const onSubmit = (data) => {
    data.nback = parseInt(data.nback);
    data.speed = parseInt(data.speed);
    data.count = parseInt(data.count);
    dispatch(setGame(data));
    router.push("/play");
  };

  const watchAllFields = watch();

  return (
    <>
      <Top />
      <form className="setting_form" onSubmit={handleSubmit(onSubmit)}>
        <h2>N-Back</h2>
        <div className="radio_box">
          <input
            {...register("nback", { required: true })}
            type="radio"
            id="nback_1"
            value={2}
          />
          <label htmlFor="nback_1">2-back</label>
          <input
            {...register("nback", { required: true })}
            type="radio"
            id="nback_2"
            value={3}
          />
          <label htmlFor="nback_2">3-back</label>
          <input
            {...register("nback", { required: true })}
            type="radio"
            id="nback_3"
            value={4}
          />
          <label htmlFor="nback_3">4-back</label>
        </div>

        <h2 style={{ marginTop: "30px" }}>게임속도</h2>
        <div className="radio_box">
          <input
            {...register("speed", { required: true })}
            type="radio"
            id="speed_1"
            value={2000}
          />
          <label htmlFor="speed_1">느림</label>
          <input
            {...register("speed", { required: true })}
            type="radio"
            id="speed_2"
            value={1500}
          />
          <label htmlFor="speed_2">보통</label>
          <input
            {...register("speed", { required: true })}
            type="radio"
            id="speed_3"
            value={1000}
          />
          <label htmlFor="speed_3">빠름</label>
        </div>
        {type === "basic" && (
          <>
            <h2 style={{ marginTop: "30px" }}>게임횟수</h2>
            <div className="radio_box">
              <input
                {...register("count", { required: true })}
                type="range"
                id="count"
                max={20}
                min={5}
              />
              <label htmlFor="count">{watchAllFields.count}</label>
            </div>
          </>
        )}
        <div className="stting_btn_box">
          <input type="submit" className="btn_submit" value="저장" />
        </div>
      </form>
    </>
  );
}

export default Setting;
