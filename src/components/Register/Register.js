import React from 'react';
import Header from '../Header/Header';
import Section from '../Section/Section';
import Form from '../Form/Form';
import './Register.css';

const Register = () => (
  <>
    <div className="register">
    <Header mod="header_section_auth" />
    <Section mod="section_type_auth" sectionTitle="Добро пожаловать!" sectionTitleMod="section__title_type_auth">
      <Form linkPath="/signin"
        linkText="Войти"
        buttonText="Зарегистрироваться"
        caption="Уже зарегистрированы? "
      >
        <fieldset className="form__fieldset">
          <div className="form__span" htmlFor="name">Имя</div>
          <input className="form__input" id="name" required minLength={2} maxLength={30} defaultValue="Миша" />
          <div className="form__span" htmlFor="email">E-mail</div>
          <input type="email" className="form__input" id="email" required defaultValue="qwerty@mail.ru" />
          <div className="form__span" htmlFor="password">Пароль</div>
          <input type="password" className="form__input form__input_with-error" id="password" required defaultValue="12345678" />
          <span className="form__error">Что-то пошло не так</span>
        </fieldset>
      </Form>
    </Section>
    </div>
  </>
);

export default Register;
