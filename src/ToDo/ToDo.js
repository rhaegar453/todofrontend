import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { checkLoginFail, checkLogin } from "../Store/Actions/auth";
import { listTasks, createTask } from "../Store/Actions/task";
import Task from "./Task";
import { modalToggle } from "../Store/Actions/ui";
import Modal from "../Assets/Modal";
import {ModalFooter, Input, Button} from 'reactstrap';

class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenAvailable: false,
      title:'',
      description:'',
      endDate:''
    };
  }
  componentDidMount() {
    //Get the token from localstorage
    try {
      let token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("Token not found");
      }
      this.props.getDetails(token);
      console.log("Requesting for the list of tasks");
      this.props.listTasks(token);
    } catch (err) {
      console.log("Not logged in");
    }
  }

  createTask = (e) => {
      e.preventDefault();
    this.props.modalToggle();
  };
  toggle=()=>[
      this.props.modalToggle()
  ]

  submitHandler=(e)=>{
      e.preventDefault();
      let token=localStorage.getItem('jwt');
      this.props.createTask(token,this.state.title, this.state.description, this.state.endDate);
  }

  render() {
      let modal=this.props.modalState?<div>
          <Modal modalTitle="New Task">
            <form onSubmit={this.submitHandler}>
                <div className="form-group">
                    <label>Title</label>
                    <input className="form-control" autoComplete="off" onChange={e=>this.setState({title:e.target.value})}></input>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input className="form-control" autoComplete="off" onChange={e=>this.setState({description:e.target.value})}></input>
                </div>
                <div className="form-group">
                    <label>End Date</label>
                    <Input type="date" onChange={e=>this.setState({endDate:e.target.value})}/>
                </div>
                <ModalFooter>
                    <Button color="success" size="lg" type="submit">Create Task</Button>
                    <button onClick={this.toggle} className="btn btn-danger btn-lg">Cancel</button>
                </ModalFooter>
            </form>
          </Modal>
      </div>:null;
    return (
      <div>
        <div>
          <div>
              {modal}
            <div className="container" id="startContainer">
              <div className="row">
                <div className="col-10">
                  <h1 className="d-flex flex-row justify-content-between">
                    My Tasks
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={this.createTask}
                    >
                      Create New Task
                    </button>
                    <h2>Days Left</h2>
                  </h1>
                </div>
              </div>
              <div className="col-md-10">
                {this.props.tasks.map(task => (
                  <Task
                    title={task.title}
                    description={task.description}
                    endDate={task.endDate}
                    key={task._id}
                    id={task._id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    tasks: state.task.tasks,
    username: state.auth.username,
    modalState:state.ui.modalOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    notLoggedIn: () => dispatch(checkLoginFail()),
    getDetails: token => dispatch(checkLogin(token)),
    listTasks: token => dispatch(listTasks(token)),
    modalToggle: () => dispatch(modalToggle()),
    createTask:(token,title, description, endDate)=>dispatch(createTask(token,title, description, endDate))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDo);
