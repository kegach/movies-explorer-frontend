import React from 'react';
import Section from '../Section/Section';
import './AboutMe.css';
import image from '../../images/in.png';
import { facebook, github } from '../../utils/links';

const AboutMe = ({ children }) => (
  <Section mod="aboutme" sectionTitleMod="aboutme__title" sectionTitle="Студент" id="aboutme">
    <div className="aboutme__two-columns">
      <div className="aboutme__left-column">
        <div className="aboutme__student-info-container">
          <h3 className="aboutme__name">Миша</h3>
          <p className="aboutme__summary">Фронтенд-разработчик, 20 лет</p>
          <p className="aboutme__description">
          Я родился и живу в Москве, учусь в Финансовом Университете при Правительстве РФ на 3 курсе. Я люблю слушать музыку и смотреть фильмы. Недавно начал кодить. После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами, а может и нашел постоянную работу в какой-нибудь веб-студии.
          </p>
        </div>
        <ul className="aboutme__list">
          <li className="aboutme__list-item">
            <a target="_blank" href={facebook} rel="noreferrer noopener" className="aboutme__link" >Facebook</a>
          </li>
          <li className="aboutme__list-item">
            <a target="_blank" href={github} rel="noreferrer noopener" className="aboutme__link" >Github</a>
          </li>
        </ul>
      </div>
      <div className="aboutme__right-column">
        <img className="aboutme__image" src={image} alt="Картинка студента" />
      </div>
    </div>
    {children}
  </Section>
);

export default AboutMe;
