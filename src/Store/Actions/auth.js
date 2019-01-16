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
    payload: "Login Failed"
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
        localStorage.setItem('loggedIn', true);
        dispatch(listTasks(token.data.token));
      })
      .catch(err => {
        dispatch(loginFail(err.response));
      });
  };
};
/* #endregion */

/* #region Register Region */

const registrationStart=()=>{
  return{
    type:actions.register_start
  }
};

const registerSuccess=(successMessage)=>{
  return{
    type:actions.register_success,
    payload:successMessage
  }
};

const registerFail=(failMessage)=>{
  return{
    type:actions.register_fail,
    payload:failMessage
  }
};
export const register=(email, password, username)=>{
    return dispatch=>{
      dispatch(registrationStart());
      let headers={
        "Content-type":"application/json"
      }
      let data={
        email:email,
        password:password,
        username:username
      }

      axios
      .post(devProcess.REACT_APP_REGISTER_URL, data, {headers:headers})
      .then(resp=>{
        console.log(resp);
        dispatch(registerSuccess(resp.data.data));
      })
      .catch(err=>{
        console.log(err.response.data.message);
        dispatch(registerFail(err.response.data.message));
      });
    }
}


export const Logout=()=>{
  return{
    type:actions.logout
  }
}


