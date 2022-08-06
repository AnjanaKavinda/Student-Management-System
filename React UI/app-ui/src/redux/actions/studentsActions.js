import { ActionTypes } from "../contants/action-types";
import { GetStudents, PostStudent, PutStudents, deleteStudents } from "../../api/axiosRequest";

const getStudents = () => {

    return function(dispatch){
        return GetStudents().then((res) =>{
            dispatch({
                type: ActionTypes.GET_STUDENT,
                payload: res.data,
            });
        });
    }
}; 

const postStudents = (request) => {

    return function(dispatch){
        return PostStudent(request).then((res) =>{
            dispatch({
                type: ActionTypes.SET_STUDENTS,
                payload: res.data,
            });
        });
    }
};

const updateStudents = (request, id) => {

    return function(dispatch){
        return PutStudents(request, id).then((res) =>{
            dispatch({
                type: ActionTypes.EDIT_STUDENT,
                payload: res.data,
            });
        });
    }
};

const deleteStudent = (id) => {

    return function(dispatch){
        return deleteStudents(id).then((res) =>{
            dispatch({
                type: ActionTypes.REMOVE_STUDENTS,
                payload: res.data,
            });
        });
    }
};

export { getStudents, postStudents, updateStudents, deleteStudent }; 