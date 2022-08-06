import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from "react-redux";
import { getStudentDetails} from "../redux/actions/StudentDetailsAction";
import {getStudents } from "../redux/actions/studentsActions";

function StudentsDetails() {

  const [studentContactPerson, setstudentContactPerson] = useState(" ");
  const [studentContactNo, setstudentContactNo] = useState(" ");
  const [studentEmail, setstudentEmail] = useState(" ");
  const [studentDateofbirth, setstudentDateofbirth] = useState(" ");
  const [studentClassName, setstudentClassName] = useState(" ");

  const [studentClassId, setstudentClassId] = useState(" ");

  const dispatch = useDispatch();
  const responseData = useSelector((state) => state.allstudentdetails.details);
  const studentData = useSelector((state) => state.allstudents.details);

  var studentresult =
  studentData &&
  studentData.map((data, index) => {
      return (
        <option key={index} value={data.StudentId}>{data.FirstName}</option>
      );
    });

    const studentClickHandler = async (e) =>{
      setstudentClassId(e.target.value);
      console.log(e.target.value);
      await dispatch(getStudentDetails(e.target.value));
      setTimeout(function () {
        studentHandler();
      }, 1000);
      
      
    }

    const studentHandler = async () =>{
      let table = document.querySelector(".tbody");
      table.innerHTML = ""
      if (responseData) {
        setstudentContactPerson(responseData.ContactPerson);
        setstudentContactNo(responseData.ContactNo);
        setstudentEmail(responseData.Email);
        setstudentDateofbirth(responseData.Dateofbirth);
        setstudentClassName(responseData.ClassroomName);

        console.log(responseData.allocateSubjects);
        
        responseData.allocateSubjects  && responseData.allocateSubjects.map( (data, index) =>{
          let template = `
            <tr key={index}>
              <td>${data.SubjectName}</td>
              <td>${data.TeacherName}</td>
            </tr>`
            table.innerHTML += template;
        });
      }
      
  
    }
   
  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  return (
    <div className="body">
    <Form>
      <fieldset>
      <Table >
      <tbody>
        <tr>
          <td>
          <Form.Group className="mb-3">
          <Form.Label>Student</Form.Label>
            <Form.Select id="studentId" value={studentClassId} onChange={(e) =>studentClickHandler(e)} >
              <option>select Student</option>
              {studentresult}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contact Person</Form.Label>
            <Form.Control placeholder="Contact Person" value={studentContactPerson} onChange={(e) => setstudentContactPerson(e.target.value)} readOnly />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contact No</Form.Label>
            <Form.Control placeholder="Contact No" value={studentContactNo} onChange={(e) => setstudentContactNo(e.target.value)} readOnly/>
          </Form.Group>
          </td>
          <td>
          <Form.Group className="mb-3">
            <Form.Label>Class Rooms</Form.Label>
            <Form.Control placeholder="Class Rooms"  value={studentClassName} onChange={(e) => setstudentClassName(e.target.value)} readOnly/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control placeholder="Email Address"  value={studentEmail} onChange={(e) => setstudentEmail(e.target.value)} readOnly/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date Of Birth</Form.Label>
            <Form.Control placeholder="Date Of Birth" value={studentDateofbirth} onChange={(e) => setstudentDateofbirth(e.target.value)} readOnly/>
          </Form.Group>
          </td>
        </tr>
      </tbody>
    </Table>
      </fieldset>
    </Form>

    <Table striped bordered hover>
      <thead>
      <tr>
          <th>Subject</th>
          <th>Teacher</th>
        </tr>
      </thead>
      <tbody className="tbody">
      </tbody>
    </Table>
    </div>
  )
}

export default StudentsDetails