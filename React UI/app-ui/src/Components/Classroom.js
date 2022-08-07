import React, { useEffect, useState } from "react";
import {getClassroom, postClassroom} from "../redux/actions/classroomAction";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

function Classroom() {

  const [classroomName, setclassroomName] = useState("");

  const postDispatch = useDispatch();

  const nameHandler = (e) =>{
    setclassroomName(e.target.value)
  }

  const clickHandler = (e) =>{
    if(classroomName===""){
      alert("Class room name is required");
      return this;
    }
    e.preventDefault();
    const finaldata ={
      classroomName:classroomName,
    }
    postDispatch(postClassroom(finaldata));
  }

  const dispatch = useDispatch();
  const responseData = useSelector((state) => state.allclassroom.details);

  useEffect(() => {
    dispatch(getClassroom());
  });

  
  var result =
    responseData &&
    responseData.map((data, index) => {
      return (
        <tr key={index}>
          <td>{data.ClassroomName}</td>
          <td>
            <Button variant="success">Update</Button>{" "}
            <Button variant="danger">Delete</Button>{" "}
          </td>
        </tr>
      );
    });

  return (
    <div className="body">
      <Form>
        <Form.Group className="class_name">
          <Form.Label htmlFor="class_name">Class Room Name</Form.Label>
          <Form.Control type="text" id="classroomName" onChange={(e) => nameHandler(e)} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={(e) => clickHandler(e)}>
          Submit
        </Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Classroom</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{result}</tbody>
      </Table>
    </div>
  );
}

export default Classroom;
