import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Logout} from '../Store/Actions/auth';

class Navigation extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>Navigation Works</div>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        isLoggedIn:state.auth.isLoggedIn
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        logout:()=>dispatch(Logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

