import * as actions from "../ActionTypes/auth";
import axios from "axios";
/* #region CheckLogin */

const checkLoginStart = () => {
  return {
    type: actions.check_login_start
  };
};

const checkLoginSuccess = token => {
  return {
    type: actions.check_login_success,
    token: token
  };
};

const checkLoginFail = err => {
  return {
    type: actions.check_login_fail,
    payload: "AutoLogin Failed"
  };
};

export const checkLogin = token => {
  return dispatch => {
    dispatch(checkLoginStart());
    console.log("Make a call to the server to fetch the details");
    const headers = {
      "Content-Type": "application/json",
      authorization: token
    };
    axios
      .post(process.env.GET_USER_DETAILS)
      .then(data => {
        dispatch(checkLoginSuccess());
      })
      .catch(err => {
        dispatch(checkLoginFail());
      });
  };
};
/* #endregion */

/* #region Login */
const loginStart = () => {
  return {
    type: actions.login_start
  };
};
const loginFail = err => {
  return {
    type: actions.login_fail,
    payload: err
  };
};

const loginSuccess = token => {
  return {
    type: actions.login_success,
    payload: token.token
  };
};

export const login = (email, password) => {
  return dispatch => {
    dispatch(loginStart());
    axios
      .post(process.env.LOGIN_URL)
      .then(token => {
        dispatch(loginSuccess(token));
      })
      .catch(err => {
        dispatch(loginFail(err));
      });
  };
};
/* #endregion */

/* #region Register Region */
const registerSuccess = data => {
  return {
    type: actions.register_success
  };
};

const registerFail = () => {
  return {
    type: actions.register_fail
  };
};

const registerStart = () => {
  return {
    type: actions.register_start
  };
};
export const register = (email, password, username) => {
  return dispatch => {
    dispatch(registerStart());
    axios
      .post(process.env.REGISTER_URL)
      .then(data => {
        if (data.success) {
          dispatch(registerSuccess("Successfully Registered"));
        } else dispatch(registerFail());
      })
      .catch(err => {
        dispatch(registerFail(err.message));
      });
  };
};
/* #endregion */


export const Logout=()=>{
  return{
    type:actions.logout
  }
}

