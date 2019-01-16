import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { checkLoginFail, checkLogin } from "../Store/Actions/auth";
import { listTasks } from "../Store/Actions/task";
import Task from "./Task";

class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenAvailable: false
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

  render() {
    return (
      <div>
        <div>
          <div>
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
    username: state.auth.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    notLoggedIn: () => dispatch(checkLoginFail()),
    getDetails: token => dispatch(checkLogin(token)),
    listTasks: token => dispatch(listTasks(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDo);
