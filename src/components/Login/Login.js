import React from 'react';
import Header from '../Header/Header';
import Section from '../Section/Section';
import Form from '../Form/Form';

const Login = () => (
  <>
    <Header mod="header_section_auth" />
    <Section mod="section_type_auth" sectionTitle="Рады видеть!" sectionTitleMod="section__title_type_auth">
      <Form linkPath="/signup"
        linkText="Регистрация"
        buttonText="Войти"
        caption="Еще не зарегистрированы? "
      >
        <fieldset className="form__fieldset">
          <div className="form__span" htmlFor="email">E-mail</div>
          <input type="email" className="form__input" id="email" required defaultValue="qwerty@mail.ru" />
          <div className="form__span" htmlFor="password">Пароль</div>
          <input type="password" className="form__input" id="password" required />
        </fieldset>
      </Form>
    </Section>
  </>
);

export default Login;
