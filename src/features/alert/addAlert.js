import React from 'react';
// import './NavBarGuestStyle.css';
import { useDispatch } from 'react-redux';
import { userOut } from '../user/userSlice';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";


const AddAlert = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const navigate=useNavigate();
  
      const exit = () => {
          // Dispatch an action to update the Redux state
          dispatch(userOut());
          // Navigate to the "/exit" route
          navigate('/');
        };
    return (<>
   <h1>hello</h1>
   <input id='exitButton' type="button" value="יציאה" onClick={() => exit()} /></>

    );
}

export default AddAlert;