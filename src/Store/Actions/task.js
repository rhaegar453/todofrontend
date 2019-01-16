import * as actions from "../ActionTypes/tasks";
import axios from "axios";
import * as devProcess from '../../devConfig';


/* #region Create  */

const createTaskStart = () => {
  return {
    type: actions.task_create_start
  };
};

const createTaskSuccess = data => {
  return {
    type: actions.task_create_success,
    payload: data
  };
};

const createTaskFail = err => {
  return {
    type: actions.task_create_fail,
    payload: err
  };
};
export const createTask = (token, title, description, endDate) => {
  return dispatch => {
    dispatch(createTaskStart());
    let headers = {
      "Content-Type": "application/json",
      authorization: token
    };
    let data = {
      title: title,
      description: description,
      endDate: endDate
    };
    axios
      .post(devProcess.REACT_APP_TASK_CREATE)
      .then(data => {
        dispatch(createTaskSuccess(data));
      })
      .catch(err => {
        dispatch(createTaskFail(err));
      });
  };
};

/* #endregion */

//Task delete
/* #region Delete */

const taskDeleteStarted = () => {
  return {
    type: actions.task_delete_start
  };
};
const taskDeleteFailed = err => {
  return {
    type: actions.task_delete_fail,
    payload: err
  };
};

const taskDeleteSuccess = data => {
  return {
    type: actions.task_delete_success,
    payload: data //contains the id
  };
};

export const taskDelete = (id, token) => {
  let headers = {
    "Content-Type": "application/json",
    authorization: token,
    id: id
  };
  console.log(headers);
  return dispatch => {
    dispatch(taskDeleteStarted());
    axios
      .delete(devProcess.REACT_APP_TASK_DELETE, {headers:headers})
      .then(data => {
        dispatch(taskDeleteSuccess(data));
        dispatch(listTasks(token));
      })
      .catch(err => {
        console.log(err);
        dispatch(taskDeleteFailed(err));
      });
  };
};

/* #endregion */

//Task Update
/* #region Task Update */

const taskUpdateStart = () => {
  return {
    type: actions.tasks_update_start
  };
};

const taskUpdateFail = err => {
  return {
    type: actions.tasks_update_fail
  };
};

const taskUpdateSuccess = data => {
  return {
    type: actions.tasks_update_success,
    payload: data
  };
};

export const taskUpdate = (id, token, title, description, endDate) => {
  return dispatch => {
    dispatch(taskUpdateStart());
    let headers = {
      "Content-Type": "application/json",
      authorization: token,
      id: id
    };
    let data = {
      title: title,
      description: description,
      endDate: endDate
    };
    axios
      .put(devProcess.REACT_APP_TASK_UPDATE, data, { headers: headers })
      .then(data => {
        dispatch(taskUpdateSuccess(data));
      })
      .catch(err => {
        dispatch(taskUpdateFail(err));
      });
  };
};

/* #endregion */

//List

/* #region ListTasks */
const listTasksStarted = () => {
  return {
    type: actions.tasks_getall_start
  };
};
const listTaskSuccess = data => {
  return {
    type: actions.tasks_getall_success,
    payload: data.data.data
  };
};

const listTaskFail = err => {
  return {
    type: actions.tasks_getall_fail,
    err: err
  };
};
export const listTasks = token => {
  return dispatch => {
    dispatch(listTasksStarted());
    let headers = {
      "Content-Type": "application/json",
      authorization: token
    };
    axios
      .get(devProcess.REACT_APP_TASK_LIST, {headers:headers})
      .then(data => {
        dispatch(listTaskSuccess(data));
      })
      .catch(err => {
        dispatch(listTaskFail(err));
      });
  };
};
/* #endregion */

//Nullify tasks after logout

export const nullifyTasks=()=>{
    return{
      type:actions.nullify_tasks
    }
}