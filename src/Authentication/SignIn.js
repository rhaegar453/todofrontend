import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class SignIn extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <div>Sign In works</div>
                <Link to="/register"><button className="btn btn-primary">Register</button></Link>
            </div>
        );
    }

}

export default SignIn;