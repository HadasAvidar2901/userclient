

import React from 'react';
import { Link } from "react-router-dom";
import './NavBarGuest.css';


const NavBarUser = () => {
    return (
      <nav className="navbar-container">
        <div className="navbar-content">
          
          
        </div>
        <ul className="navbar-list">
          
          <li className="navbar-item"><Link to="addAlert" className="navbar-link">הוספת התראה</Link></li>
          <li className="navbar-item"><Link to="updateAlert" className="navbar-link">עדכון התראה</Link></li>
          <li className="navbar-item"><Link to="deleteAlert" className="navbar-link">מחיקת התראה</Link></li>
          <li className="navbar-item"><Link to="myAlerts" className="navbar-link">ההתראות שלי </Link></li>
         
        </ul>
      </nav>
    );
}

export default NavBarUser;