import './App.css';
import  Home from './components/Home';
import NavBar  from './components/NavBar';
import About  from './components/About';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Alert from './components/Alert';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message,type)=>{
    setAlert ({
      message:message,
        type:type
      })
      setTimeout(()=>{
          setAlert(null)
      },1000)
   }
  return (
    <>
      <NoteState>
        <Router>
         <NavBar/>
      <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert}/>}></Route>
              <Route path="/about" element={<About/>}> </Route>
              <Route path="/login" element={<Login showAlert={showAlert}/>}> </Route>
              <Route path="/signup" element={<Signup showAlert={showAlert}/>}> </Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;

