import { ActionTypes } from "../contants/action-types";

const initialState ={
    details: [],
};
export const classroomReducer = (state = initialState, action) =>{
    switch (action.type) {
        case ActionTypes.GET_CLASSROOM:
            return {
             details: action.payload,
            }
        default:
            return state;
    }
};