import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllocateClassrooms,
  postAllocateClassrooms,
  deleteAllocateClassrooms,
} from "../redux/actions/AllocateClassroomsAction";
import { getTeachers } from "../redux/actions/teacherAction";
import { getClassroom } from "../redux/actions/classroomAction";

function AllocateClassrooms() {
  const [classroomID, setclassroomID] = useState("");
  const [teacherId, setteacherId] = useState("");

  const dispatch = useDispatch();
  const postDispatch = useDispatch();

  const teachertData = useSelector((state) => state.allteachers.details);
  const classroomData = useSelector((state) => state.allclassroom.details);
  const allocateClassroomData = useSelector((state) => state.allocateClassrooms.details);

  const deAllocateHandler = (e) => {
    e.preventDefault();
    console.log("ok");
    document.getElementById("tabeId").deleteRow(e.target.value);
  };

  const allocateHandler = (e) => {
    e.preventDefault();

    if(classroomID===""){
      alert("You cannot empty class room name");
      return this;
    }

    if(teacherId===""){
      alert("You cannot empty teacher name");
      return this;
    }
    

    const res = classroomData.find(
      (element) => element.ClassroomID === parseInt(e.target.value)
    );

    let table = document.querySelector(`tbody`);
    let template = `
      <tr key=${res.ClassroomID} value=${res.ClassroomID} id=${res.ClassroomID}>
        <td>${res.ClassroomName}</td>
        <td><Button variant="danger" value={res.ClassroomID} type="submit" onClick="${(e) => deAllocateHandler(e)}">Deallocate</Button></td>
      </tr>`;
    table.innerHTML += template;
  };

  const classroomHandler = (e) => {
    e.preventDefault();
    setclassroomID(e.target.value);
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
      var classId = trValue[i].id;
      await dataArray.push({
        ClassroomID: classId,
        TeacherId: teacherId,
      });
    }
    if (dataArray && dataArray) {
      const finaldata = dataArray;
      console.log(finaldata)
      await postDispatch(postAllocateClassrooms(finaldata));
      await dispatch(getAllocateClassrooms());
    }
    
  };

  useEffect(() => {
    dispatch(getTeachers());
    dispatch(getClassroom());
    dispatch(getAllocateClassrooms());
  }, [dispatch]);

  var classroomresult =
    classroomData &&
    classroomData.map((data, index) => {
      return (
        <option key={index} value={data.ClassroomID}>
          {data.ClassroomName}
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
      await postDispatch(deleteAllocateClassrooms(e.target.value));
  
      await dispatch(getAllocateClassrooms());
  
    }
  
    var result =
    allocateClassroomData &&
    allocateClassroomData.map((data, index) => {
      return (
        <tr key={index}>
          <td>{data.ClassroomName}</td>
          <td>{data.TeacherName}</td>
          <td>
            <Button variant="danger" value={data.AllocateClassroomId} onClick={(e) => deleteHandler(e)}>Delete</Button>{" "}
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
        <Card.Header>Allocated Classroom</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Classroom</Form.Label>
              <Form.Select
                value={classroomID}
                onChange={(e) => classroomHandler(e)}
              >
                <option>Select a Classroom</option>
                {classroomresult}
              </Form.Select>
            </Form.Group>
            <Button
              variant="primary"
              value={classroomID}
              type="button"
              onClick={(e) => allocateHandler(e)}
            >
              Allocate
            </Button>
          </Form>

          <Table striped bordered hover id="tabeId">
            <thead>
              <tr>
                <th>Classroom</th>
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
            <th>Classroom</th>
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

export default AllocateClassrooms;
