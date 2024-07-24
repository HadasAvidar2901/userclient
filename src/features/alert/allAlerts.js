import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateAlertInServer, getAlertById } from './alertApi'; // נוסיף את הפונקציה getAlertById
import './addAlertStyle.css'; // קובץ סגנון
import { userOut } from '../user/userSlice';



const AllAlert = () => {


  return (
   <h1>כל ההתראות</h1>
  );
};

export default AllAlert;
