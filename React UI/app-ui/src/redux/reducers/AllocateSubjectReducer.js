import { ActionTypes } from "../contants/action-types";

const initialState ={
    details: [],
};
export const allocateSubjectsReducer = (state = initialState, action) =>{
    switch (action.type) {
        case ActionTypes.GET_ALLOCATE_SUBJECT:
            return {
             details: action.payload,
            }
        default:
            return state;
    }
};