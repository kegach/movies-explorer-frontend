import React from 'react';
import Section from '../Section/Section';
import './AboutProject.css';

const AboutProject = () => (
  <Section mod="about" sectionTitleMod="about__title" sectionTitle="О проекте" id="about">
    <div className="about__two-columns">
      <div className="about__column">
        <h3 className="about__subtitle">Дипломный проект включал 5 этапов</h3>
        <p className="about__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
      </div>
      <div className="about__column">
        <h3 className="about__subtitle">На выполнение диплома ушло 5 недель</h3>
        <p className="about__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
    </div>
    <div className="about__two-columns">
      <div className="about__left-column">
        <div className="about__diagram about__diagram_backend">1 неделя</div>
        <p className="about__diagram-caption">Back-end</p>
      </div>
      <div className="about__right-column">
        <div className="about__diagram about__diagram_frontend">4 недели</div>
        <p className="about__diagram-caption">Front-end</p>
      </div>
    </div>
  </Section>
);

export default AboutProject;
