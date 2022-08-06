import { ActionTypes } from "../contants/action-types";
import { GetTeachers, PostTeacher, PutTeachers, deleteTeachers } from "../../api/axiosRequest";

const getTeachers = () => {

    return function(dispatch){
        return GetTeachers().then((res) =>{
            dispatch({
                type: ActionTypes.GET_TEACHERS,
                payload: res.data,
            });
        });
    }
}; 

const postTeachers = (request) => {

    return function(dispatch){
        return PostTeacher(request).then((res) =>{
            dispatch({
                type: ActionTypes.SET_TEACHERS,
                payload: res.data,
            });
        });
    }
};

const updateTeachers = (request, id) => {

    return function(dispatch){
        return PutTeachers(request, id).then((res) =>{
            dispatch({
                type: ActionTypes.EDIT_TEACHERS,
                payload: res.data,
            });
        });
    }
};

const deleteTeacher = (id) => {

    return function(dispatch){
        return deleteTeachers(id).then((res) =>{
            dispatch({
                type: ActionTypes.DELETE_TEACHERS,
                payload: res.data,
            });
        });
    }
};

export { getTeachers, postTeachers, updateTeachers, deleteTeacher}; 