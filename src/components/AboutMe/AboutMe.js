import React from 'react';
import Section from '../Section/Section';
import './AboutMe.css';
import vital from '../../images/vital.svg';
import { facebook, github } from '../../utils/links';

const AboutMe = ({ children }) => (
  <Section mod="aboutme" sectionTitleMod="aboutme__title" sectionTitle="Студент" id="aboutme">
    <div className="aboutme__two-columns">
      <div className="aboutme__left-column">
        <div className="aboutme__student-info-container">
          <h3 className="aboutme__name">Виталий</h3>
          <p className="aboutme__summary">Фронтенд-разработчик, 30 лет</p>
          <p className="aboutme__description">
          Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
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
        <img className="aboutme__image" src={vital} alt="Картинка студента" />
      </div>
    </div>
    {children}
  </Section>
);

export default AboutMe;
