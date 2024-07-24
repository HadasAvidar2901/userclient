import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addAlertToServer } from './alertApi';
import './addAlertStyle.css'; // קובץ סגנון
import { userOut } from '../user/userSlice';

// מערך שמות מניות ודוגמה לערכים אפשריים של סוגי התראות
const stockNames = ['מניה א', 'מניה ב', 'מניה ג'];
const alertTypes = ['סוג א', 'סוג ב', 'סוג ג'];

const AddAlert = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm();
  const [selectedOption, setSelectedOption] = useState('all'); // הבחירה בין "כל המניות" ו"מניה ספציפית"
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // פונקציה לשליחת הנתונים לשרת
  const save = (data) => {
    let newObj = [];
    
    if (selectedOption === 'all') {
      stockNames.forEach(stock => {
        newObj.push({ ...data, StockName: stock });
      });
    } else {
      newObj = [{ ...data }];
    }

    newObj.forEach(obj => {
      addAlertToServer(obj)
        .then((res) => {
          alert("הצלחה להוסיף התראה");
          console.log(res);
          reset(); // לניקוי הטופס לאחר הצלחת שליחה
        })
        .catch((err) => {
          alert("לא הצליח להוסיף התראה " + err.response.data.message);
          console.log(err);
        });
    });
  };
  const exit = () => {
              // Dispatch an action to update the Redux state
             dispatch(userOut());
             // Navigate to the "/exit" route
             navigate('/');
             };

  // מעקב אחר שדות
  const watchAlertType = watch('AlertType');
  const watchStockName = watch('StockName');

  return (
    <form className="form-container" onSubmit={handleSubmit(save)}>
      <label className="form-label">בחר אפשרות</label>
      <label>
        <input
          type="radio"
          value="all"
          checked={selectedOption === 'all'}
          onChange={() => setSelectedOption('all')}
        />
        כל המניות
      </label>
      <br/>
      <label>
        <input
          type="radio"
          value="specific"
          checked={selectedOption === 'specific'}
          onChange={() => setSelectedOption('specific')}
        />
        מניה ספציפית
      </label>
      <br />

      {selectedOption === 'specific' && (
        <>
          <label className="form-label">שם מניה</label>
          <select
            className="form-input"
            {...register("StockName", { required: selectedOption === 'specific' ? "שדה חובה" : false })}
            defaultValue=""
          >
            <option value="">בחר מניה</option>
            {stockNames.map((stock, index) => (
              <option key={index} value={stock}>{stock}</option>
            ))}
          </select>
          {errors.StockName && <p className="alert">{errors.StockName.message}</p>}
          <br />
        </>
      )}

      <label className="form-label">סוג התראה</label>
      <select
        className="form-input"
        {...register("AlertType", { required: "שדה חובה" })}
      >
        <option value="">בחר סוג התראה</option>
        {alertTypes.map((type, index) => (
          <option key={index} value={type}>{type}</option>
        ))}
      </select>
      {errors.AlertType && <p className="alert">{errors.AlertType.message}</p>}
      <br />

      <label className="form-label">טווח מינימלי</label>
      <input
        type="number"
        className="form-input"
        {...register("MinRange", { required: "שדה חובה", valueAsNumber: true })}
      />
      {errors.MinRange && <p className="alert">{errors.MinRange.message}</p>}
      <br />

      <label className="form-label">טווח מקסימלי</label>
      <input
        type="number"
        className="form-input"
        {...register("MaxRange", { required: "שדה חובה", valueAsNumber: true })}
      />
      {errors.MaxRange && <p className="alert">{errors.MaxRange.message}</p>}
      <br />

      <label className="form-label">אימייל של משתמש</label>
      <input
        type="email"
        className="form-input"
        defaultValue={currentUser?.email || ''} // ממלא אוטומטית עם האימייל של המשתמש
        {...register("UserEmail", { required: "שדה חובה" })}
        disabled // שדה לא ניתן לעריכה
      />
      {errors.UserEmail && <p className="alert">{errors.UserEmail.message}</p>}
      <br />

      <input type="submit" className="form-submit" value="שלח" />
      <input id='exitButton' type="button" value="יציאה" onClick={() => exit()} />
    </form>
  );
};

export default AddAlert;































