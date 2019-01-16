import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../Store/Actions/auth";
import { Redirect , withRouter} from "react-router-dom";
import {listTasks} from '../Store/Actions/task';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log("Submit Successful");
    this.props.login(this.state.email, this.state.password);
    setTimeout(()=>{
      if(this.props.loginSuccess){
        this.props.history.push('/');
      }
    },1000);
};
  


  render() {
    let loginErr=this.props.error?<p>{this.props.errorMessage}</p>:null;
    const redirector=!this.props.isLoggedIn?<div className="login-clean">
    <form onSubmit={this.handleSubmit}>
      <h2 className="sr-only">Login Form</h2>
      <div className="illustration">
        <h1>Login</h1>
        <i className="icon ion-ios-football" />
      </div>
      <div className="form-group">
        <input
          autoComplete="off"
          className="form-control"
          type="email"
          name="email"
          placeholder="Email"
          onChange={e => this.setState({ email: e.target.value })}
          value={this.state.email}
        />
      </div>
      <div className="form-group">
        <input
          onChange={e => this.setState({ password: e.target.value })}
          autoComplete="off"
          className="form-control"
          type="password"
          name="password"
          placeholder="Password"
          value={this.state.password}
        />
      </div>
      <div className="form-group">
        <button className="btn btn-primary btn-block" type="submit">
          Log In
        </button>
        {loginErr}
      </div>
    </form>
  </div>:<Redirect to="/"/>

    return (
      <div>
        {redirector}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    loginSuccess: state.auth.success,
    error: state.auth.error,
    errorMessage: state.auth.loginErrMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(login(email, password))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SignIn));
