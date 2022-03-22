import { SET_GAME } from "../actions/types";

const initState = {
  nback: 2,
  speed: 1500,
  count: 10,
};

const game = (state = initState, action) => {
  switch (action.type) {
    case SET_GAME:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default game;
