import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {checkLoginFail, checkLogin} from '../Store/Actions/auth';


class ToDo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            tokenAvailable:false
        }
    }

    componentDidMount(){
        //Get the token from localstorage
        try{
            let token=localStorage.getItem('jwt');
            if(!token){
                throw new Error('Token not found');
            }
            this.props.getDetails(token);
        }
        catch(err){ 
            this.props.notLoggedIn();
        }
    }   


    render(){
        return(
            <div>
                To Do Works
                <Link to="/login"><button className="btn btn-primary">To Do</button></Link>
            </div>
        )
    }
}



const mapStateToProps=(state)=>{
    return{
        isLoggedIn:state.auth.isLoggedIn
    }
}


const mapDispatchToProps=(dispatch)=>{
    return{
        notLoggedIn:()=>dispatch(checkLoginFail()),
        getDetails:(token)=>dispatch(checkLogin(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);