import React from 'react';
import NavTab from '../NavTab/NavTab';
import './Promo.css';

const Promo = () => (
  <section className="promo">
    <h1 className="promo__title">Учебный проект студента факультета Веб-разработки</h1>
    <NavTab className="promo__nav" />
  </section>
);

export default Promo;
