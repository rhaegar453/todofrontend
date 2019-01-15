import * as actions from '../ActionTypes/ui';

const initialState={
    modalOpen:false
}

const uiReducer=(state=initialState,action)=>{
    switch(action.type){
        case actions.MODAL_TOGGLE:
            return{
                ...state,
                modalOpen:!state.modalOpen
            }
        default:
            return state
    }
}
export default uiReducer;