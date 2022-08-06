import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllocateSubjects,
  postAllocateSubjects,
  deleteAllocateSubjects,
} from "../redux/actions/AllocateSubjectAction";
import { getTeachers } from "../redux/actions/teacherAction";
import { getSubject } from "../redux/actions/subjectActions";

function AllocateSubjects() {

  const [subjectID, setsubjectID] = useState("");
  const [teacherId, setteacherId] = useState("");

  const dispatch = useDispatch();
  const postDispatch = useDispatch();

  const teachertData = useSelector((state) => state.allteachers.details);
  const subjectData = useSelector((state) => state.allsubjects.details);
  const allocateClassroomData = useSelector((state) => state.allallocateSubjects.details);

  const deAllocateHandler = (e) => {
    e.preventDefault();
    console.log("ok");
    document.getElementById("tabeId").deleteRow(e.target.value);
  };

  const allocateHandler = (e) => {

    if(subjectID===""){
      alert("You cannot empty subject name");
      return this;
    }

    if(teacherId===""){
      alert("You cannot empty teacher name");
      return this;
    }
    
    e.preventDefault();

    const res = subjectData.find(
      (element) => element.SubjectID === parseInt(e.target.value)
    );

    let table = document.querySelector(`tbody`);
    let template = `
      <tr key=${res.SubjectID} value=${res.SubjectID} id=${res.SubjectID}>
        <td>${res.SubjectName}</td>
        <td><Button variant="danger" value={res.SubjectID} type="submit" onClick="${(e) => deAllocateHandler(e)}">Deallocate</Button></td>
      </tr>`;
    table.innerHTML += template;
  };

  const subjectHandler = (e) => {
    e.preventDefault();
    setsubjectID(e.target.value);
  };

  const dataSaveHandler = async (e) => {
    e.preventDefault();

    var dataArray = [];
    var ddl = document.getElementById("tabeId").rows.length;
    var table = document.getElementById("tabeId");
    for (var i = 0; i < ddl - 1; i++) {
      var trValue = table
        .getElementsByTagName("tbody")[0]
        .getElementsByTagName("tr");
      var subjectId = trValue[i].id;
      await dataArray.push({
        SubjectID: subjectId,
        TeacherId: teacherId,
      });
    }
    if (dataArray && dataArray) {
      const finaldata = dataArray;
      console.log(finaldata);
      await postDispatch(postAllocateSubjects(finaldata));
      await dispatch(getAllocateSubjects());
    }
    
  };

  useEffect(() => {
    dispatch(getTeachers());
    dispatch(getSubject());
    dispatch(getAllocateSubjects());
  }, [dispatch]);

  var subjectesult =
  subjectData &&
  subjectData.map((data, index) => {
      return (
        <option key={index} value={data.SubjectID}>
          {data.SubjectName}
        </option>
      );
    });

  var teacherresult =
    teachertData &&
    teachertData.map((data, index) => {
      return (
        <option key={index} value={data.TeacherId}>
          {data.FirstName}
        </option>
      );
    });
    const deleteHandler = async (e) =>{
       await postDispatch(deleteAllocateSubjects(e.target.value));
  
       await dispatch(getAllocateSubjects());
  
    }
  
    var result =
    allocateClassroomData &&
    allocateClassroomData.map((data, index) => {
      return (
        <tr key={index}>
          <td>{data.SubjectName}</td>
          <td>{data.TeacherName}</td>
          <td>
            <Button variant="danger" value={data.AllocateSubjectID} onClick={(e) => deleteHandler(e)}>Delete</Button>{" "}
          </td>
        </tr>
      );
    });


  return (
    <div className="body">
      <Card>
        <Card.Header>Teacher Details</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Teacher</Form.Label>
              <Form.Select
                value={teacherId}
                onChange={(e) => setteacherId(e.target.value)}
              >
                <option>Select a teacher</option>
                {teacherresult}
              </Form.Select>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => dataSaveHandler(e)}
            >
              Save
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>Allocated Subject</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Select
                value={subjectID}
                onChange={(e) => subjectHandler(e)}
              >
                <option>Select a Subject</option>
                {subjectesult}
              </Form.Select>
            </Form.Group>
            <Button
              variant="primary"
              value={subjectID}
              type="button"
              onClick={(e) => allocateHandler(e)}
            >
              Allocate
            </Button>
          </Form>

          <Table striped bordered hover id="tabeId">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody></tbody>
          </Table>
        </Card.Body>
      </Card>
      <Table striped bordered hover id="showTabeId">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Teacher</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {result}
        </tbody>
      </Table>
    </div>
  );
}

export default AllocateSubjects;
