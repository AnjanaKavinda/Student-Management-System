import { ActionTypes } from "../contants/action-types";

const initialState ={
    details: [],
};
export const allocateClassroomsReducer = (state = initialState, action) =>{
    switch (action.type) {
        case ActionTypes.GET_ALLOCATE_CLASSROOM:
            return {
             details: action.payload,
            }
        default:
            return state;
    }
};