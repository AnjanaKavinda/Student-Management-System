import { ActionTypes } from "../contants/action-types";
import { GetStudentDetails } from "../../api/axiosRequest";

export const getStudentDetails = (id) => {

    return function(dispatch){
        return GetStudentDetails(id).then((res) =>{
            dispatch({
                type: ActionTypes.GET_STUDENT_DETAILS,
                payload: res.data,
            });
        });
    }
};

export default getStudentDetails;