import { SIGN_IN, SIGN_OUT } from '../type';

export const SignInAction = (payload) => (dispatch) => {
  dispatch({
    type: SIGN_IN,
    payload,
  });
};

export const SignOutAction = (payload) => (dispatch) => {
  dispatch({
    type: SIGN_OUT,
    payload,
  });
};
