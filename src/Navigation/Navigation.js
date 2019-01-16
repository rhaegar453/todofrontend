import React, { Component, ReactDOM } from "react";
import { connect } from "react-redux";
import { Logout } from "../Store/Actions/auth";
import { Link, withRouter } from "react-router-dom";
import './Navigation.css';
import {Button} from 'reactstrap';
import {nullifyTasks} from '../Store/Actions/task';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  logoutHandler=()=>{
      setTimeout(()=>{
        this.props.logout();
        localStorage.clear();
        this.props.nullify();
        setTimeout(()=>{
          this.props.history.push('/login');
        },1000);
      },1000)
  }

  render() {
    const authButtons = this.props.isLoggedIn ? (
      <button className="btn btn-primary" type="button" id="authbuttons" onClick={this.logoutHandler}> 
        Log Out
      </button>
    ) : (
      <div>
        {" "}
        <Link to="/register">
        <Button color="primary" outline>
        Register
        </Button>
        </Link>
        <Link to="/login">
        <Button color="success" outline style={{marginLeft:"10px"}}>Login</Button>
        </Link>
      </div>
    );

    return (
      <div>
        <nav className="navbar navbar-dark navbar-expand-md fixed-top bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <i className="icon ion-ios-football" />
              &nbsp;GoalTracker
            </Link>
            <button
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navcol-1"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse d-flex flex-row-reverse"
              id="navcol-1"
            />
            {authButtons}
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(Logout()),
    nullify:()=>dispatch(nullifyTasks())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navigation));
