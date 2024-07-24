import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateAlertInServer, getAlertById } from './alertApi'; // הוספת הפונקציה getAlertById
import './addAlertStyle.css'; // קובץ סגנון
import { userOut } from '../user/userSlice';

const alertTypes = ['סוג א', 'סוג ב', 'סוג ג'];

const UpdateAlert = () => {
  const [alertId, setAlertId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadAlertData = (id) => {
    setIsLoading(true);
    getAlertById(id)
      .then((res) => {
        const alertData = res.data;
        // מעדכן את השדות של הטופס עם הנתונים מהשרת
        setValue('AlertType', alertData.AlertType);
        setValue('MinRange', alertData.MinRange);
        setValue('MaxRange', alertData.MaxRange);
        setValue('UserEmail', alertData.UserEmail);
        setIsLoading(false);
      })
      .catch((err) => {
        alert("לא הצליח לטעון את פרטי ההתראה " + err.response.data.message);
        console.log(err);
        setIsLoading(false);
      });
  };

  const save = (data) => {
    setIsLoading(true);
    updateAlertInServer(alertId, data) // שולח את הנתונים המעודכנים לשרת
      .then((res) => {
        alert("הצלחה לעדכן את ההתראה");
        console.log(res);
        reset(); // לניקוי הטופס לאחר הצלחת שליחה
        navigate('/'); // ניווט לכתובת הבית לאחר העדכון
        setIsLoading(false);
      })
      .catch((err) => {
        alert("לא הצליח לעדכן את ההתראה " + err.response.data.message);
        console.log(err);
        setIsLoading(false);
      });
  };

  const exit = () => {
    dispatch(userOut());
    navigate('/');
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(save)}>
      <label className="form-label">ID של התראה</label>
      <input
        type="text"
        className="form-input"
        value={alertId}
        onChange={(e) => setAlertId(e.target.value)}
        placeholder="הכנס את ה-ID של ההתראה"
      />
      <button
        type="button"
        className="form-submit"
        onClick={() => loadAlertData(alertId)}
        disabled={!alertId || isLoading}
      >
        {isLoading ? 'טוען...' : 'טען נתוני התראה'}
      </button>
      <br />

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

      <input
        type="submit"
        className="form-submit"
        value={isLoading ? "מעדכן..." : "עדכן"}
        disabled={isLoading} // Disable the submit button while loading
      />
      <input id='exitButton' type="button" value="יציאה" onClick={() => exit()} />
    </form>
  );
};

export default UpdateAlert;
