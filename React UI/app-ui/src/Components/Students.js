import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import {getStudents, postStudents, updateStudents, deleteStudent} from "../redux/actions/studentsActions";
import {getClassroom} from "../redux/actions/classroomAction";

function Students() {


  const [studentFirstName, setstudentFirstName] = useState("");
  const [studentLastName, setstudentLastName] = useState("");
  const [studentContactPerson, setstudentContactPerson] = useState("");
  const [studentContactNo, setstudentContactNo] = useState("");
  const [studentEmail, setstudentEmail] = useState("");
  const [studentDateofbirth, setstudentDateofbirth] = useState("");
  const [studentAge, setstudentAge] = useState("");
  const [studentClassId, setstudentClassId] = useState("");
  const postDispatch = useDispatch();

  const validaate=()=>{
   
    if(studentFirstName===""){
      
      alert('First name is required');
      return true;
    }

    if(studentLastName===""){
      
      alert('Last name is required');
      return true;
    }
    if(studentContactPerson===""){
      
      alert('Contact person is required');
      return true;
    }

    if(studentContactNo===""){
      
      alert('Contact no is required');
      return true;
    }

    if(studentAge===""){
      
      alert('Age is required');
      return true;
    }

    if(studentEmail===""){
      
      alert('Email is required');
      return true;
    }

    if(studentDateofbirth===""){
      
      alert('Date of birth is required');
      return true;
    }

  }

  const clickHandler = async (e) =>{

    if(validaate()){
      return this;
    }

    e.preventDefault();
    const finaldata ={
      FirstName:studentFirstName,
      LastName:studentLastName,
      ContactPerson:studentContactPerson,
      ContactNo:studentContactNo,
      Email:studentEmail,
      Dateofbirth:studentDateofbirth,
      Age:studentAge,
      ClassroomID:studentClassId,
    }
    await postDispatch(
      postStudents(finaldata)
    );

   await dispatch(getStudents());
  }


  const dataUpdateHandler = async (e) =>{
    console.log(e.target.value);
    e.preventDefault();
    const finaldata ={
      StudentId:e.target.value,
      FirstName:studentFirstName,
      LastName:studentLastName,
      ContactPerson:studentContactPerson,
      ContactNo:studentContactNo,
      Email:studentEmail,
      Dateofbirth:studentDateofbirth,
      Age:studentAge,
      ClassroomID:studentClassId,
    }
    await postDispatch(updateStudents(finaldata, e.target.value));

    await dispatch(getStudents());

    document.getElementById("saveId").removeAttribute("hidden");
    document.getElementById("updateId").setAttribute("hidden", true);
  }

  const dispatch = useDispatch();
  const responseData = useSelector((state) => state.allstudents.details);
  const classroomData = useSelector((state) => state.allclassroom.details);

  const DobHandler = (e) =>{
    var today = new Date();
    var birthDate = parseInt(e.target.value.split("-")[0]);
    document.getElementById('studentAge').value = today.getFullYear() - birthDate;
    setstudentDateofbirth(e.target.value)
    setstudentAge(document.getElementById('studentAge').value)
  }

  const updateButtonHandler = (e) =>{
    if (responseData) {
      console.log(e.target.value);
      document.getElementById("updateId").value = e.target.value;
      document.getElementById("updateId").removeAttribute("hidden");
      document.getElementById("saveId").setAttribute("hidden", true);
      const res = responseData.find(element => element.StudentId === parseInt(e.target.value));
      console.log(res);
      setstudentFirstName(res.FirstName);
      setstudentLastName(res.LastName);
      setstudentContactPerson(res.ContactPerson);
      setstudentContactNo(res.ContactNo);
      setstudentEmail(res.Email);
      setstudentAge(res.Age);
      setstudentClassId(res.ClassroomID);
      setstudentDateofbirth(res.Dateofbirth);
      document.getElementById("studentDateofbirth").value = res.Dateofbirth;
    }
  }

  const deleteHandler = async (e) =>{
    await postDispatch(deleteStudent(e.target.value));

    await dispatch(getStudents());

  }

  useEffect(() => {
    dispatch(getStudents());
    dispatch(getClassroom());
  }, [dispatch]);

  var result =
    responseData &&
    responseData.map((data, index) => {
      return (
        <tr key={index}>
          <td>{data.FirstName}</td>
          <td>{data.LastName}</td>
          <td>{data.ContactPerson}</td>
          <td>{data.ContactNo}</td>
          <td>{data.Email}</td>
          <td>{data.Dateofbirth}</td>
          <td>{data.Age}</td>
          <td>{data.ClassroomName}</td>
          <td>
            <Button variant="success" value={data.StudentId} onClick={(e) => updateButtonHandler(e)}>Update</Button>{" "}
            <Button variant="danger" value={data.StudentId} onClick={(e) => deleteHandler(e)}>Delete</Button>{" "}
          </td>
        </tr>
      );
    });

    var classroomresult =
    classroomData &&
    classroomData.map((data, index) => {
      return (
        <option key={index} value={data.ClassroomID}>{data.ClassroomName}</option>
      );
    });

  return (
    <div className="body">
      <Form>
        <Form.Group className="firstName">
          <Form.Label htmlFor="firstName">First Name</Form.Label>
          <Form.Control type="text" id="studentFirstName" value={studentFirstName} onChange={(e) => setstudentFirstName(e.target.value)} />
        </Form.Group>
        <Form.Group className="lastName">
          <Form.Label htmlFor="lastName">Last Name</Form.Label>
          <Form.Control type="text" id="studentLastName" value={studentLastName} onChange={(e) => setstudentLastName(e.target.value)} />
        </Form.Group>
        <Form.Group className="Contact_Person">
          <Form.Label htmlFor="Contact_Person">Contact Person</Form.Label>
          <Form.Control type="text" id="studentContactPerson" value={studentContactPerson} onChange={(e) => setstudentContactPerson(e.target.value)} />
        </Form.Group>
        <Form.Group className="Contact_No">
          <Form.Label htmlFor="Contact_No">Contact No</Form.Label>
          <Form.Control type="text" id="studentContactNo" value={studentContactNo} onChange={(e) => setstudentContactNo(e.target.value)} />
        </Form.Group>
        <Form.Group className="email">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control type="text" id="studentEmail" value={studentEmail} onChange={(e) => setstudentEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="Date_of_birth">
          <Form.Label htmlFor="Date_of_birth">Date of birth</Form.Label>
          <Form.Control type="date" id="studentDateofbirth" value={studentDateofbirth}  onChange={(e) => DobHandler(e)} />
        </Form.Group>
        <Form.Group className="age">
          <Form.Label htmlFor="age">Age</Form.Label>
          <Form.Control type="text" id="studentAge" value={studentAge} disabled />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Class Room</Form.Label>
          <Form.Select id="Classrooms" value={studentClassId} onChange={(e) => setstudentClassId(e.target.value)}>
            <option>Select a class room</option>
            {classroomresult}
          </Form.Select>
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
            <td>First Name</td>
            <td>Last Name</td>
            <td>Contact Person</td>
            <td>Contact No</td>
            <td>Email</td>
            <td>Date of birth</td>
            <td>Age</td>
            <td>Classroom</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>{result}</tbody>
      </Table>
    </div>
  );
}

export default Students;
