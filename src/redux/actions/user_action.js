import { CLEAR_USER, SET_USER, SET_GAME } from "./types";

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const clearUser = (user) => {
  return {
    type: CLEAR_USER,
  };
};

export const setGame = (data) => {
  return {
    type: SET_GAME,
    payload: data,
  };
};
