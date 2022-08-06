import '../src/Styles/css/main.css';
import Navbar from './Components/Navbar';
import {
  Routes,
  Route
} from "react-router-dom";
import Students from './Components/Students';
import Teachers from './Components/Teachers';
import Subjects from './Components/Subjects';
import Classroom from  './Components/Classroom'
import AllocateSubject from './Components/AllocateSubjects'
import AllocateClassroom from './Components/AllocateClassrooms'
import StudentsDetails from './Components/StudentsDetails'

function App() {
  return (
    <>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Students />}/>
          <Route path="/teachers" element={<Teachers />}/>
          <Route path="/subject" element={<Subjects />}/>
          <Route path="/classroom" element={<Classroom />}/>
          <Route path="/allocateSubject" element={<AllocateSubject />}/>
          <Route path="/allocateClassroom" element={<AllocateClassroom />}/>
          <Route path="/studentsDetails" element={<StudentsDetails />}/>
        </Routes>
      </div>
    </>
    
  );
}

export default App;
