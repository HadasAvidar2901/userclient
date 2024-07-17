import React from 'react';
import { useForm } from 'react-hook-form';
import { login } from './userApi';
import { useDispatch } from 'react-redux';
import { userIn } from './userSlice';
import { useNavigate } from "react-router-dom";
import './loginStyle.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const save = (data) => {
    login(data)
      .then((res) => {
        alert('הצליח למצוא משתמש');
        dispatch(userIn(res.data));
        console.log(res);
        navigate('/alert');
      })
      .catch((err) => {
        alert('לא הצליח למצוא משתמש' + err.response.data.message + 'נסה להרשם קודם');
        navigate('/signup');
        console.log(err);
      });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(save)}>
        <h1>כניסה</h1>
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

        <input type="submit" />
      </form>
    </div>
  );
};

export default Login;
