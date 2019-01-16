import * as actions from "../ActionTypes/auth";
import axios from "axios";
import * as devProcess from '../../devConfig'; 
import {listTasks} from '../Actions/task';



/* #region CheckLogin */

const checkLoginStart = () => {
  return {
    type: actions.check_login_start
  };
};

const checkLoginSuccess = (token,actualToken) => {
  return {
    type: actions.check_login_success,
    data: token,
    token:actualToken
  };
};

export const checkLoginFail = err => {
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
      "authorization": token
    };
    axios
      .get(devProcess.REACT_APP_GET_USER_DETAILS,{headers:headers})
      .then(data => {
        console.log(data);
        dispatch(checkLoginSuccess(data, token));
      })
      .catch(err => {
        console.log(err);
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
    token: token.data.token
  };
};

export const login = (email, password) => {
  return dispatch => {
    dispatch(loginStart());
    let data={
      email:email,
      password:password
    }
    let headers={ "Content-Type": "application/json" } 
    axios
      .post(devProcess.REACT_APP_LOGIN_URL, data, {headers:headers})
      .then(token => {
        dispatch(loginSuccess(token));
        localStorage.setItem('jwt', token.data.token);
        dispatch(listTasks(token.data.token));
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
      .post(devProcess.REACT_APP_REGISTER_URL)
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


