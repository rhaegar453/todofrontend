import * as actionTypes from "../ActionTypes/auth";
import updateObject from "../utility/utility";

const initialState = {
  isLoggedIn: false,
  username: false,
  loading: false,
  error: false,
  errorMessage: false,
  success: false,
  token: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    //Check Login
    case actionTypes.check_login_start:
      return updateObject(state, { loading: true });
    case actionTypes.check_login_fail:
      return updateObject(state, { loading: false });
    case actionTypes.check_login_success:
      return updateObject(state, {
        loading: false,
        isLoggedIn: true,
        token: action.token
      });
      //Login Start
    case actionTypes.login_start:
      return updateObject(state, { loading: true, isLoggedIn: false });
    case actionTypes.login_success:
      return updateObject(state, {
        loading: false,
        isLoggedIn: true,
        success: true,
        username: action.payload
      });
    case actionTypes.login_fail:
      return updateObject(state,{
        loading:false,
        error:true,
        errorMessage:action.payload
      });
      //Register Start
    case actionTypes.register_start:
      return updateObject(state, { loading: true });
    case actionTypes.register_success:
      return updateObject(state, { loading: false, isLoggedIn: false, success:true});
    case actionTypes.register_fail:
      return updateObject(state, {
        loading: false,
        error: true,
        errorMessage: action.payload
      });

    case actionTypes.logout:
      return updateObject(state, {
        loading: false,
        username: false,
        token: null,
        isLoggedIn:false
      });
    default:
      return state;
  }
};


export default authReducer;