import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => (
  <>
    <section className="notfound">
      <h1 className="notfound__title">404</h1>
      <p className="notfound__subtitle">Страница не найдена</p>
      <Link to="/" className="notfound__back">Назад</Link>
    </section>
  </>
);

export default NotFound;
