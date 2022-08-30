import { SET_USER_TO_CONTEXT } from "../Helper/UserContextTypes";

export const userInitial = {
  token: "",
  tokenKey: "",
  isLogin: false,
  userData: {},
};

const userReducer = (state, { type, payload }) => {
  switch (type) {
    case SET_USER_TO_CONTEXT:
      set_user_to_context_action(state, payload);
      break;

    default:
      return state;
  }
};

export default userReducer;

// Set User to context
function set_user_to_context_action(state, payload) {
  state = {
    tokenKey: payload.tokenKey,
    userData: payload.data,
    isLogin: true,
  };
}
