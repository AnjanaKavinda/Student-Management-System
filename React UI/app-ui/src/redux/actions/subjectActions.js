import { ActionTypes } from "../contants/action-types";
import { GetSubjects, PostSubject } from "../../api/axiosRequest";

const getSubject = () => {

    return function(dispatch){
        return GetSubjects().then((res) =>{
            dispatch({
                type: ActionTypes.GET_SUBJECT,
                payload: res.data,
            });
        });
    }
}; 

const postSubject = (request) => {

    return function(dispatch){
        return PostSubject(request).then((res) =>{
            dispatch({
                type: ActionTypes.SET_SUBJECT,
                payload: "",
            });
        });
    }
};

export { getSubject, postSubject }; 