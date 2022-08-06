import { ActionTypes } from "../contants/action-types";

const initialState ={
    details: [],
};
export const studentReducer = (state = initialState, action) =>{
    switch (action.type) {
        case ActionTypes.GET_STUDENT:
            return {
             details: action.payload,
            }
        default:
            return state;
    }
};