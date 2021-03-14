import React from 'react';
import './Portfolio.css';
import { staticSite, adaptiveSite, mesto } from '../../utils/links';

const Portfolio = () => (
  <div className="portfolio">
    <h3 className="portfolio__title">Портфолио</h3>
    <ul className="portfolio__list">
      <li className="portfolio__list-item">
        <a target="_blank" href={staticSite} rel="noreferrer noopener" className="portfolio__link" >Статичный сайт</a>
      </li>
      <li className="portfolio__list-item">
        <a target="_blank" href={adaptiveSite} rel="noreferrer noopener" className="portfolio__link" >Адаптивный сайт</a>
      </li>
      <li className="portfolio__list-item">
        <a target="_blank" href={mesto} rel="noreferrer noopener" className="portfolio__link" >Одностраничное приложение</a>
      </li>
    </ul>
  </div>
);

export default Portfolio;
