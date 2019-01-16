import * as actions from '../ActionTypes/tasks';
import utility from '../utility/utility';

const initialState={
    error:false,
    loading:false,
    tasks:[]
}

const taskReducer=(state=initialState, action)=>{
    switch(action.type){
        //Task Create
        case actions.task_create_start:
            return{
                ...state,
                loading:true
            }
        case actions.task_create_fail:
            return{
                ...state,
                loading:false,
                error:true
            }
        case actions.task_create_success:
            return{
                ...state,
                loading:false,
                error:false
            }
        //Task Remove
        case actions.task_delete_start:
            return{
                ...state,
                loading:true,
                error:false
            }
        case actions.task_delete_fail:
            return{
                ...state,
                loading:false,
                error:true
            }
        case actions.task_delete_success:
            return{
                ...state,
                loading:false,
                data:action.payload
            }
        //task Get All
        case actions.tasks_getall_start:
            return{
                ...state,
                loading:true
            }
        case actions.tasks_getall_fail:
            return{
                ...state,
                error:true
            }
        case actions.tasks_getall_success:
            return{
                ...state,
                tasks:action.payload,
                loading:false
            }
        case actions.nullify_tasks:
            return{
                ...state,
                tasks:[]
            }
        default:
            return state;
    }
}

export default taskReducer;