import { ActionTypes } from "../contants/action-types";

const initialState ={
    details: [],
};
export const teacherReducer = (state = initialState, action) =>{
    switch (action.type) {
        case ActionTypes.GET_TEACHERS:
            return {
             details: action.payload,
            }
        default:
            return state;
    }
};