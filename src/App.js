import './App.css';
import Register from './Register';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Login from './Login';
import Dashboard from './Dashboard';
//import ForgotPassword from './ForgotPassword';
//import ResetPassword from './ResetPassword';
function App() {
  return (
    <>
     <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login/>} />
      <Route path="/register" element={<Register />}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      {/*<Route path="/forgotpassword" element={<ForgotPassword/>}/>*/}
      {/*<Route path="/resetpassword" element={<ResetPassword/>}/>*/}
    </Routes> 
  </BrowserRouter>
    </>
  );
}

export default App;