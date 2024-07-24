import logo from './logo.svg';
import './App.css';
import SignUp from './features/user/signIn.js';
import Login from './features/user/login.js';
import AddAlert from './features/alert/addAlert.js';
import UpdateAlert from './features/alert/updateAlert.js';
import DeleteAlert from './features/alert/deleteAlert.js';
import AllAlert from './features/alert/allAlerts.js';
import NavBarGuest from './NavBarGuest.js';
import NavBarUser from './NavBarUser.js';
import { useDispatch } from 'react-redux';
import { userIn} from './features/user/userSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

function App() {

  const currentUser = useSelector(state => state.user.currentUser);
  let dispatch = useDispatch();
  

  useEffect(() => {
    let u = localStorage.getItem("currentUser");
    if (u) {
      dispatch(userIn(JSON.parse(u)));
    }
  },
 []);


  
  
  return (
    <div className="App">
      {/* {currentUser ? 
  <AddAlert />: <Home />} */}
    {currentUser ? <NavBarUser /> : <NavBarGuest />}

 
      
      
      <Routes>
        
        
        <Route path="signup" element={<SignUp/> }/>
        <Route path='login' element={<Login/>}/>

        <Route path="addAlert" element={<AddAlert />}/>
        <Route path='updateAlert' element={<UpdateAlert/>}/>
        <Route path='deleteAlert' element={<DeleteAlert/>}/>
        
        <Route path='myAlerts' element={<AllAlert/>}/>
        {/* <Route path='exit' element={<Home/>}/> */}
        
        {/* <Route path='addProduct' element={
          <ProtectedRouteForManager>
        <AddProduct/></ProtectedRouteForManager>
        }/> */}
        {/* <Route path='addOrder' element={<ProtectedRoute><OrderForm/></ProtectedRoute>}/>
        <Route path='allOrders' element={<ProtectedRouteForManager><AllOrders/></ProtectedRouteForManager>}/>
        <Route path='myOrders' element={<ProtectedRoute><CustomerOrders/></ProtectedRoute>}/>
        <Route path='exit' element={<NavBarGuest/>}/>
        <Route path='finishOrder' element={<FinishOrder/>}/> */}
        
      </Routes>
     
    </div>
  );
}

export default App;
