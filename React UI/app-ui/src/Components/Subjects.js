import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { getSubject, postSubject, updateSubject, deleteSubject} from "../redux/actions/subjectActions";

function Subjects() {

  const [subjectName, setsubjectName] = useState("");

  const postDispatch = useDispatch();

  const nameHandler = (e) =>{
    setsubjectName(e.target.value)
  }

  const clickHandler = (e) =>{
    if(subjectName===""){
      alert("Subject name is required");
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

  const dataUpdateHandler = async (e) =>{
    console.log(e.target.value);
    e.preventDefault();
    const finaldata ={
      SubjectID:e.target.value,
      SubjectName:subjectName,
    }
    await postDispatch(updateSubject(finaldata, e.target.value));

    await dispatch(getSubject());

    document.getElementById("saveId").removeAttribute("hidden");
    document.getElementById("updateId").setAttribute("hidden", true);
  }

  const updateButtonHandler = (e) =>{
    if (responseData) {
      document.getElementById("updateId").value = e.target.value;
      document.getElementById("updateId").removeAttribute("hidden");
      document.getElementById("saveId").setAttribute("hidden", true);
      const res = responseData.find(element => element.SubjectID === parseInt(e.target.value));
      console.log(res);
      setsubjectName(res.SubjectName);
    }
  }

  const deleteHandler = async (e) =>{
    await postDispatch(deleteSubject(e.target.value));

    await dispatch(getSubject());

  }

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
            <Button variant="success" value={data.SubjectID} onClick={(e) => updateButtonHandler(e)} >Update</Button>{" "}
            <Button variant="danger" value={data.SubjectID} onClick={(e) => deleteHandler(e)} >Delete</Button>{" "}
          </td>
        </tr>
      );
    });

  return (
    <div className="body">
      <Form>
        <Form.Group className="subject_name">
          <Form.Label htmlFor="subject_name">Subject Name</Form.Label>
          <Form.Control type="text" id="subjectName" value={subjectName} onChange={(e) => nameHandler(e)} />
        </Form.Group>
        <Button variant="primary" id="saveId" type="submit" onClick={(e) => clickHandler(e)}>
          Save Data
        </Button>
        <Button variant="primary" id="updateId" type="submit" onClick={(e) => dataUpdateHandler(e)} hidden>
          Update Data
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
