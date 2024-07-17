import React from 'react';
import { useForm } from 'react-hook-form';
import { addUserToServer } from './userApi';
import { useDispatch } from 'react-redux';
import { userIn } from './userSlice';
import { useNavigate } from "react-router-dom";
import './signInStyle.css';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const save = (data) => {
    addUserToServer(data)
      .then((res) => {
        alert('הצליח להוסיף משתמש');
        dispatch(userIn(res.data));
        console.log(res);
        navigate('/alert');
      })
      .catch((err) => {
        alert('לא הצליח להרשם' + err.response.data.message);
        console.log(err);
      });
  };

  return (
    <div className="sign-up-container">
      <form onSubmit={handleSubmit(save)}>
        <h1>הרשמה</h1>
        <label>מייל</label>
        <input
          type="text"
          {...register('email', {
            required: 'שדה חובה',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'כתובת מייל לא תקינה',
            },
          })}
        />
        {errors.email && (
          <span>{errors.email.message}</span>
        )}
        <br />


        <label>שם משתמש</label>
        <input
          type="text"
          {...register('userName', {
            required: 'שדה חובה',
            maxLength: { value: 10, message: 'שם משתמש יכול להכיל עד 10 תווים' },
          })}
        />
        {errors.userName && (
          <span>{errors.userName.message}</span>
        )}
        <br />

        <input type="submit" />
      </form>
    </div>
  );
};

export default SignUp;
