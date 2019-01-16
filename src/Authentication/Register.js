import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {register} from '../Store/Actions/auth';


class Register extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            username:''
        }
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.registerUser(this.state.email, this.state.password, this.state.username);
        setTimeout(()=>{
            if(this.props.redirect){
                this.props.history.push('/login');
            }
        },1000)
    }
    render(){
        let errorMessage=this.props.error?<p>{this.props.errorMessage}</p>:null
        return(
            <div>
                <div className="login-clean">
          <form onSubmit={this.handleSubmit}>
            <h2 className="sr-only">Login Form</h2>
            <div className="illustration">
              <h1>Sign Up</h1>
              <i className="icon ion-ios-football" />
            </div>
            <div className="form-group">
              <input
                autoComplete="off"
                className="form-control"
                type="email"
                name="email"
                placeholder="Email"
                onChange={e => {
                  this.setState({ email: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <input
                autoComplete="off"
                className="form-control"
                type="text"
                placeholder="Username"
                onChange={e => {
                  this.setState({ username: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <input
                autoComplete="off"
                className="form-control"
                type="password"
                name="password"
                placeholder="Password"
                onChange={e => {
                  this.setState({ password: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
            {errorMessage}
              <button className="btn btn-primary btn-block" type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>
            </div>
        );
    }

}

const mapStateToProps=(state)=>{
    return{
        redirect:state.auth.redirect,
        error:state.auth.registerError,
        errorMessage:state.auth.errorMessage
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        registerUser:(email, password, username)=>dispatch(register(email, password, username))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Register);