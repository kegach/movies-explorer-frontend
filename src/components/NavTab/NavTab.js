import React from 'react';
import './NavTab.css';

const NavTab = ({ className }) => (
  <section className={className}>
    <a href="#about" className="nav-tab">О проекте</a>
    <a href="#techs" className="nav-tab">Технологии</a>
    <a href="#aboutme" className="nav-tab">Студент</a>
  </section>
);

export default NavTab;
