import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {checkLoginFail, checkLogin} from '../Store/Actions/auth';
import {listTasks} from '../Store/Actions/task';
import Task from './Task';


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
            console.log('Requesting for the list of tasks');
            this.props.listTasks(token);
        }
        catch(err){ 
            console.log('Not logged in')
        }
    }   


    render(){
        return(
            <div>
                {this.props.tasks.map(task=>(
                    <p key={task._id}>{task.title}</p>
                ))}
            </div>
        )
    }
}



const mapStateToProps=(state)=>{
    return{
        isLoggedIn:state.auth.isLoggedIn,
        tasks:state.task.tasks
    }
}


const mapDispatchToProps=(dispatch)=>{
    return{
        notLoggedIn:()=>dispatch(checkLoginFail()),
        getDetails:(token)=>dispatch(checkLogin(token)),
        listTasks:(token)=>dispatch(listTasks(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);