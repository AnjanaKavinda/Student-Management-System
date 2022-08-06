import { combineReducers } from "redux";

import { studentReducer } from "./studentReducer";
import { classroomReducer } from "./classroomReducer";
import { subjectReducer} from "./subjectReducer"
import { teacherReducer } from "./teacherReducer";
import { allocateClassroomsReducer } from "./AllocateClassroomReducer";
import { allocateSubjectsReducer } from "./AllocateSubjectReducer";
import { studentDetailsReducer } from "./StudentDetailReducer";


const reducers = combineReducers({
    allstudents: studentReducer,
    allclassroom: classroomReducer,
    allsubjects: subjectReducer,
    allteachers: teacherReducer,
    allocateClassrooms: allocateClassroomsReducer,
    allallocateSubjects: allocateSubjectsReducer,
    allstudentdetails: studentDetailsReducer,
})

export default reducers;