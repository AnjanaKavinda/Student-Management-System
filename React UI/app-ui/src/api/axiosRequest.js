import axios from "axios";

export async function AxciosRequest(url, method, headers, params) {
  return params
    ? axios({
        url: url,
        method: method,
        headers: headers,
        data: params,
        timeout: 1000,
      })
    : axios({
        url: url,
        method: method,
        headers: headers,
        data: {},
        timeout: 1000,
      });
}

//GET request

const GetClassroom = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return AxciosRequest(
    "https://localhost:5001/api/Classrooms",
    "GET",
    headers,
    {}
  );
};

const GetSubjects = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return AxciosRequest(
    "https://localhost:5001/api/Subjects",
    "GET",
    headers,
    {}
  );
};

const GetStudents = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return AxciosRequest(
    "https://localhost:5001/api/Students",
    "GET",
    headers,
    {}
  );
};

const GetTeachers = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return AxciosRequest(
    "https://localhost:5001/api/Teachers",
    "GET",
    headers,
    {}
  );
};

const GetAllocateClassroom = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    return AxciosRequest(
      "https://localhost:5001/api/AllocateClassrooms",
      "GET",
      headers,
      {}
    );
  };

  const GetAllocateSubject = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    return AxciosRequest(
      "https://localhost:5001/api/AllocateSubjects",
      "GET",
      headers,
      {}
    );
  };

  const GetStudentDetails = (id) => {
    const headers = {
      "Content-Type": "application/json",
    };
    return AxciosRequest(
      "https://localhost:5001/api/Students/" + id,
      "GET",
      headers,
      {}
    );
  };

//POST request

const PostClassroom = (data) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return AxciosRequest(
    "https://localhost:5001/api/Classrooms",
    "POST",
    headers,
    data
  );
};

const PostSubject = (data) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return AxciosRequest(
    "https://localhost:5001/api/Subjects",
    "POST",
    headers,
    data
  );
};

const PostStudent = (data) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return AxciosRequest(
    "https://localhost:5001/api/Students",
    "POST",
    headers,
    data
  );
};

const PostTeacher = (data) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return AxciosRequest(
    "https://localhost:5001/api/Teachers",
    "POST",
    headers,
    data
  );
};

const PostAllocateClassroom = (data) => {
    const headers = {
      "Content-Type": "application/json",
    };
    return AxciosRequest(
      "https://localhost:5001/api/AllocateClassrooms",
      "POST",
      headers,
      data
    );
  };

  const PostAllocateSubjects = (data) => {
    const headers = {
      "Content-Type": "application/json",
    };
    return AxciosRequest(
      "https://localhost:5001/api/AllocateSubjects",
      "POST",
      headers,
      data
    );
  };

//PUT request

const PutStudents = (data, id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return AxciosRequest(
    "https://localhost:5001/api/Students/" + id,
    "PUT",
    headers,
    data
  );
};

const PutTeachers = (data, id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return AxciosRequest(
    "https://localhost:5001/api/Teachers/" + id,
    "PUT",
    headers,
    data
  );
};

const PutSubjects = (data, id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return AxciosRequest(
    "https://localhost:5001/api/Subjects/" + id,
    "PUT",
    headers,
    data
  );
};

//DELETE request

const deleteStudents = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return AxciosRequest(
    "https://localhost:5001/api/Students/" + id,
    "DELETE",
    headers,
    {}
  );
};

const deleteTeachers = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return AxciosRequest(
    "https://localhost:5001/api/Teachers/" + id,
    "DELETE",
    headers,
    {}
  );
};

const deleteAllocateClassroom = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return AxciosRequest(
    "https://localhost:5001/api/AllocateClassrooms/" + id,
    "DELETE",
    headers,
    {}
  );
};

const deleteAllocateSubject = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return AxciosRequest(
    "https://localhost:5001/api/AllocateSubjects/" + id,
    "DELETE",
    headers,
    {}
  );
};

const deleteSubjects = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return AxciosRequest(
    "https://localhost:5001/api/Subjects/" + id,
    "DELETE",
    headers,
    {}
  );
};

export {
  GetClassroom,
  GetSubjects,
  GetStudents,
  GetTeachers,
  PostClassroom,
  PostSubject,
  PostTeacher,
  PostStudent,
  PutStudents,
  deleteStudents,
  PutTeachers,
  deleteTeachers,
  deleteAllocateClassroom,
  PostAllocateClassroom,
  GetAllocateClassroom,
  GetAllocateSubject,
  PostAllocateSubjects,
  deleteAllocateSubject,
  GetStudentDetails,
  PutSubjects,
  deleteSubjects,
};
