import { ActionTypes } from "../contants/action-types";

const initialState ={
    details: [],
};
export const subjectReducer = (state = initialState, action) =>{
    switch (action.type) {
        case ActionTypes.GET_SUBJECT:
            return {
             details: action.payload,
            }
        default:
            return state;
    }
};