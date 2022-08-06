import { ActionTypes } from "../contants/action-types";

const initialState ={
    details: [],
};
export const studentDetailsReducer = (state = initialState, action) =>{
    switch (action.type) {
        case ActionTypes.GET_STUDENT_DETAILS:
            return {
             details: action.payload,
            }
        default:
            return state;
    }
};