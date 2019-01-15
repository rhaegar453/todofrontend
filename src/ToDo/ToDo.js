import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class ToDo extends React.Component{
    constructor(props){
        super(props);
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


export default ToDo;