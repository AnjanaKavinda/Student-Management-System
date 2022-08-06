import React from 'react'
import '../Styles/css/main.css'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import {
  Link
} from "react-router-dom";


function NavbarComponent() {
  return (
   <>
        <Navbar bg="dark" variant="dark">
            <Container>
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Students</Nav.Link>
                <Nav.Link as={Link} to="/teachers">Teachers</Nav.Link>
                <Nav.Link as={Link} to="/subject">Subjects</Nav.Link>
                <Nav.Link as={Link} to="/classroom">Classroom</Nav.Link>
                <Nav.Link as={Link} to="/allocateSubject">Allocate Subjects</Nav.Link>
                <Nav.Link as={Link} to="/allocateClassroom">Allocate Classrooms</Nav.Link>
                <Nav.Link as={Link} to="/studentsDetails">Student Detail</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
   </>
  )
}

export default NavbarComponent