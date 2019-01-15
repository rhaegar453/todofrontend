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
                error:false,
                tasks:action.payload
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
                loading:false //Yet to be implemented
            }
        default:
            return state;
    }
}

export default taskReducer;