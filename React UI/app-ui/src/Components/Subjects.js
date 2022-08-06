import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { getSubject, postSubject} from "../redux/actions/subjectActions";

function Subjects() {

  const [subjectName, setsubjectName] = useState("");

  const postDispatch = useDispatch();

  const nameHandler = (e) =>{
    setsubjectName(e.target.value)
  }

  const clickHandler = (e) =>{
    if(subjectName===""){
      alert("cannot empty subject name");
      return this;
    }
    e.preventDefault();
    const finaldata ={
      subjectName:subjectName,
    }
    postDispatch(postSubject(finaldata));
  }


  const dispatch = useDispatch();
  const responseData = useSelector((state) => state.allsubjects.details);

  useEffect(() => {
    dispatch(getSubject());
  });

  
  var result =
    responseData &&
    responseData.map((data, index) => {
      return (
        <tr key={index}>
          <td>{data.SubjectName}</td>
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
        <Form.Group className="subject_name">
          <Form.Label htmlFor="subject_name">Subject Name</Form.Label>
          <Form.Control type="text" id="subjectName"  onChange={(e) => nameHandler(e)} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={(e) => clickHandler(e)}>
          Submit
        </Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{result}</tbody>
      </Table>
    </div>
  );
}

export default Subjects;
