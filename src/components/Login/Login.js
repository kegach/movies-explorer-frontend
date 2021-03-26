import React from 'react';
import Header from '../Header/Header';
import Section from '../Section/Section';
import Form from '../Form/Form';
import useFormValid from '../../utils/hookValid';

const Login = ({ onLogin, isFormDisabled }) => {
  const { isValid, values, errors, handleChange } = useFormValid({ email: '', password: '' });
  const handleFocus = (evt) => {
    evt.target.removeAttribute('readonly');
  };

  return (
    <>
    <Header mod="header_section_auth" />
    <Section mod="section_type_auth" sectionTitleMod="section__title_type_auth" sectionTitle="Рады видеть!" >
      <Form linkPath="/signup"
        data={values}
        onSubmit={onLogin}
        isValid={isValid}
        isFormDisabled={isFormDisabled}
        linkText="Регистрация"
        buttonText="Войти"
        caption="Еще не зарегистрированы? "
      >
        <fieldset className="form__fieldset" disabled={isFormDisabled}>
          <div className="form__span" htmlFor="email">E-mail</div>
          <input type="email" name="email" id="email" className="form__input"  value={values.email} onChange={handleChange} readOnly onFocus={handleFocus} required/>
          <span className="form__error">{errors.email}</span>
          <div className="form__span" htmlFor="password">Пароль</div>
          <input type="password" name="password" id="password" className="form__input" value={values.password} onChange={handleChange} required/>
          <span className="form__error">{errors.password}</span>
        </fieldset>
      </Form>
    </Section>
    </>
  );
};

export default Login;
