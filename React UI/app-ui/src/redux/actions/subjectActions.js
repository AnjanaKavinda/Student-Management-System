import { ActionTypes } from "../contants/action-types";
import { GetSubjects, PostSubject, PutSubjects, deleteSubjects } from "../../api/axiosRequest";

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

const updateSubject = (request, id) => {

    return function(dispatch){
        return PutSubjects(request, id).then((res) =>{
            dispatch({
                type: ActionTypes.EDIT_SUBJECT,
                payload: res.data,
            });
        });
    }
};

const deleteSubject = (id) => {

    return function(dispatch){
        return deleteSubjects(id).then((res) =>{
            dispatch({
                type: ActionTypes.DELETE_SUBJECT,
                payload: res.data,
            });
        });
    }
};

export { getSubject, postSubject, updateSubject, deleteSubject }; 