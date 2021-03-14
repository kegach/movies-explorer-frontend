import React from 'react';
import { Link } from 'react-router-dom';
import './AuthNav.css';

const AuthNav = () => (
  <div className="authnav">
    <Link to="/signup" className="authnav__link">Регистрация</Link>
    <Link to="/signin" className="authnav__link">
      <button className="authnav__button">Войти</button>
    </Link>
  </div>
);

export default AuthNav;
