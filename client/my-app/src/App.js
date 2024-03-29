import React from 'react';
import { BrowserRouter,Route, Routes  } from 'react-router-dom';
import Homework from './Components/Homework';
import TeacherForm from './Components/TeacherForm';
import StudentForm from "./Components/StudentForm"
function App () {
 
  return (
      <>
       <BrowserRouter>
       <Routes>
        <Route path='/teacher' element={<TeacherForm/>}/>
        <Route path="/" element={<Homework/>} />
        <Route path='/student' element={<StudentForm/>}/>
       </Routes>
       </BrowserRouter>
      </>
  );
}

export default App;
