import { SET_GAME } from "../actions/types";

const initState = {
  nback: 2,
  speed: 1000,
  count: 5,
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
