import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteAlertFromServer } from './alertApi';
import './addAlertStyle.css'; // קובץ סגנון
import { userOut } from '../user/userSlice';

const DeleteAlert = () => {
  const [alertId, setAlertId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (data) => {
    setIsLoading(true);
    deleteAlertFromServer(data.AlertId) // שולח את ה-ID של ההתראה למחיקה
      .then((res) => {
        alert("הצלחה למחוק את ההתראה");
        console.log(res);
        reset(); // לניקוי הטופס לאחר הצלחת מחיקה
        setIsLoading(false);
      })
      .catch((err) => {
        alert("לא הצליח למחוק את ההתראה " + err.response.data.message);
        console.log(err);
        setIsLoading(false);
      });
  };

  const exit = () => {
    dispatch(userOut());
    navigate('/');
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(handleDelete)}>
      <label className="form-label">ID של התראה למחיקה</label>
      <input
        type="text"
        className="form-input"
        {...register("AlertId", { required: "שדה חובה" })}
        placeholder="הכנס את ה-ID של ההתראה"
      />
      {errors.AlertId && <p className="alert">{errors.AlertId.message}</p>}
      <br />

      <input
        type="submit"
        className="form-submit"
        value={isLoading ? "מוחק..." : "מחק התראה"}
        disabled={isLoading} // Disable the submit button while loading
      />
      <input id='exitButton' type="button" value="יציאה" onClick={() => exit()} />
    </form>
  );
};

export default DeleteAlert;
































