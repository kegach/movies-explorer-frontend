import React from 'react';
import './InfoTooltip.css';
import errorImg from '../../images/error.svg';

const InfoTooltip = ({ message = 'Ошибка' }) => (
  <div className="popup">
    <div className="popup__container">
      <img className="popup__image" src={errorImg} alt="Ошибка при совершении запроса" />
      <h2 className="popup__title">Что-то пошло не так...</h2>
      <p className="popup__text">{message}</p>
      <button className="popup__close-button" />
    </div>
  </div>
);

export default InfoTooltip;
