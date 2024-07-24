

import React from 'react';
import { Link } from "react-router-dom";
import './NavBarGuest.css';


const NavBarGuest = () => {
    return (
      <nav className="navbar-container">
        <div className="navbar-content">
          
          
        </div>
        <ul className="navbar-list">
          
          <li className="navbar-item"><Link to="login" className="navbar-link">כניסה</Link></li>
          <li className="navbar-item"><Link to="signup" className="navbar-link">הרשמה</Link></li>
         
        </ul>
      </nav>
    );
}

export default NavBarGuest;