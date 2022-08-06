import { ActionTypes } from "../contants/action-types";
import {
  deleteAllocateClassroom,
  PostAllocateClassroom,
  GetAllocateClassroom,
} from "../../api/axiosRequest";

const getAllocateClassrooms = () => {
  return function (dispatch) {
    return GetAllocateClassroom().then((res) => {
      dispatch({
        type: ActionTypes.GET_ALLOCATE_CLASSROOM,
        payload: res.data,
      });
    });
  };
};

const postAllocateClassrooms = (request) => {
  return function (dispatch) {
    return PostAllocateClassroom(request).then((res) => {
      dispatch({
        type: ActionTypes.SET_ALLOCATE_CLASSROOM,
        payload: res.data,
      });
    });
  };
};

const deleteAllocateClassrooms = (id) => {
  return function (dispatch) {
    return deleteAllocateClassroom(id).then((res) => {
      dispatch({
        type: ActionTypes.DELETE_ALLOCATE_CLASSROOM,
        payload: res.data,
      });
    });
  };
};

export {
  getAllocateClassrooms,
  postAllocateClassrooms,
  deleteAllocateClassrooms,
};
