import { ActionTypes } from "../contants/action-types";
import { GetClassroom, PostClassroom } from "../../api/axiosRequest";

const getClassroom = () => {

    return function(dispatch){
        return GetClassroom().then((res) =>{
            dispatch({
                type: ActionTypes.GET_CLASSROOM,
                payload: res.data,
            });
        });
    }
}; 

const postClassroom = (request) => {

    return function(dispatch){
        return PostClassroom(request).then((res) =>{
            dispatch({
                type: ActionTypes.SET_CLASSROOM,
                payload: "",
            });
        });
    }
};

export { getClassroom, postClassroom}; 