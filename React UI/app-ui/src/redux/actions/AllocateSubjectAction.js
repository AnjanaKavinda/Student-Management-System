import { ActionTypes } from "../contants/action-types";
import {
  deleteAllocateSubject,
  PostAllocateSubjects,
  GetAllocateSubject,
} from "../../api/axiosRequest";

const getAllocateSubjects = () => {
  return function (dispatch) {
    return GetAllocateSubject().then((res) => {
      dispatch({
        type: ActionTypes.GET_ALLOCATE_SUBJECT,
        payload: res.data,
      });
    });
  };
};

const postAllocateSubjects = (request) => {
  return function (dispatch) {
    return PostAllocateSubjects(request).then((res) => {
      dispatch({
        type: ActionTypes.SET_ALLOCATE_SUBJECT,
        payload: res.data,
      });
    });
  };
};

const deleteAllocateSubjects = (id) => {
  return function (dispatch) {
    return deleteAllocateSubject(id).then((res) => {
      dispatch({
        type: ActionTypes.EDIT_ALLOCATE_SUBJECT,
        payload: res.data,
      });
    });
  };
};

export {
  getAllocateSubjects,
  postAllocateSubjects,
  deleteAllocateSubjects,
};
