import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';




class Register extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <p>Link to the root component</p>
                <Link to="/">
                <button className="btn btn-primary">
                    Root
                </button></Link>
            </div>
        );
    }

}


export default Register;