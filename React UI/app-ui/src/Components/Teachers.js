import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import {getTeachers, postTeachers, updateTeachers, deleteTeacher} from "../redux/actions/teacherAction";

function Teachers() {

  const [TeacherFirstName, setTeacherFirstName] = useState("");
  const [TeacherLastName, setTeacherLastName] = useState("");
  const [TeacherContactNo, setTeacherContactNo] = useState("");
  const [TeacherEmail, setTeacherEmail] = useState("");

  const postDispatch = useDispatch();
  const dispatch = useDispatch();

  const responseData = useSelector((state) => state.allteachers.details);

  const validaate=()=>{
   
    if(TeacherFirstName===""){
      
      alert('First name is required ');
      return true;
    }

    if(TeacherLastName===""){
      
      alert('Last name is required ');
      return true;
    }
    if(TeacherContactNo===""){
      
      alert('Contact number is required ');
      return true;
    }
    else if (TeacherContactNo.length > 10 || TeacherContactNo.length < 10) {
      alert('Please enter a correct contact number');
      return true;
    }

    if(TeacherEmail===""){
      
      alert('Email is required');
      return true;
    }
  }

  const clickHandler = async (e) =>{
    if(validaate()){
      return this;
    }
    e.preventDefault();
    const finaldata ={
      FirstName:TeacherFirstName,
      LastName:TeacherLastName,
      ContactNo:TeacherContactNo,
      Email:TeacherEmail,
    }
    await postDispatch(
      postTeachers(finaldata)
    );

   await dispatch(getTeachers());
  }

  const dataUpdateHandler = async (e) =>{
    console.log(e.target.value);
    e.preventDefault();
    const finaldata ={
      TeacherId:e.target.value,
      FirstName:TeacherFirstName,
      LastName:TeacherLastName,
      ContactNo:TeacherContactNo,
      Email:TeacherEmail,
    }
    await postDispatch(updateTeachers(finaldata, e.target.value));

    await dispatch(getTeachers());

    document.getElementById("saveId").removeAttribute("hidden");
    document.getElementById("updateId").setAttribute("hidden", true);
  }


  const updateButtonHandler = (e) =>{
    if (responseData) {
      document.getElementById("updateId").value = e.target.value;
      document.getElementById("updateId").removeAttribute("hidden");
      document.getElementById("saveId").setAttribute("hidden", true);
      const res = responseData.find(element => element.TeacherId === parseInt(e.target.value));
      console.log(res);
      setTeacherFirstName(res.FirstName);
      setTeacherLastName(res.LastName);
      setTeacherContactNo(res.ContactNo);
      setTeacherEmail(res.Email);
    }
  }

  const deleteHandler = async (e) =>{
    await postDispatch(deleteTeacher(e.target.value));

    await dispatch(getTeachers());

  }

  
 

  useEffect(() => {
    dispatch(getTeachers());
  }, [dispatch]);

  var result =
    responseData &&
    responseData.map((data, index) => {
      return (
        <tr key={index}>
          <td>{data.FirstName}</td>
          <td>{data.ContactNo}</td>
          <td>{data.Email}</td>
          <td>
          <Button variant="success" value={data.TeacherId} onClick={(e) => updateButtonHandler(e)}>Update</Button>{" "}
            <Button variant="danger" value={data.TeacherId} onClick={(e) => deleteHandler(e)}>Delete</Button>{" "}
          </td>
        </tr>
      );
    });

  return (
    <div className="body">
      <Form>
        <Form.Group className="username">
          <Form.Label htmlFor="firstName">First Name</Form.Label>
          <Form.Control type="text" id="firstName" value={TeacherFirstName} onChange={(e) => setTeacherFirstName(e.target.value)} />
        </Form.Group>
        <Form.Group className="lastName">
          <Form.Label htmlFor="lastName">Last Name</Form.Label>
          <Form.Control type="text" id="lastName" value={TeacherLastName} onChange={(e) => setTeacherLastName(e.target.value)} />
        </Form.Group>
        <Form.Group className="contact_no">
          <Form.Label htmlFor="contact_no">Contact No</Form.Label>
          <Form.Control type="text" id="contact_no" value={TeacherContactNo} onChange={(e) => setTeacherContactNo(e.target.value)} />
        </Form.Group>
        <Form.Group className="email">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control type="text" id="email" value={TeacherEmail} onChange={(e) => setTeacherEmail(e.target.value)} />
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
            <td>Teacher</td>
            <td>Contact No</td>
            <td>Email</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>{result}</tbody>
      </Table>
    </div>
  );
}

export default Teachers;
