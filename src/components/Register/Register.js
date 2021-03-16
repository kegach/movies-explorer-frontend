import React from 'react';
import Header from '../Header/Header';
import Section from '../Section/Section';
import Form from '../Form/Form';
import './Register.css';
import useFormValid from '../../utils/hookValid';

const Register = ({ onRegister, isFormDisabled }) => {
  const { isValid, values, errors, handleChange } = useFormValid({ name: '', email: '', password: '' });
  const handleFocus = (evt) => {
    evt.target.removeAttribute('readonly');
  };

  return (
  <>
    <div className="register">
    <Header mod="header_section_auth" />
    <Section mod="section_type_auth" sectionTitleMod="section__title_type_auth" sectionTitle="Добро пожаловать!">
      <Form linkPath="/signin"
        data={values}
        onSubmit={onRegister}
        isValid={isValid}
        isFormDisabled={isFormDisabled}
        buttonText="Зарегистрироваться"
        caption="Уже зарегистрированы? "
        linkText="Войти"
      >
        <fieldset className="form__fieldset" disabled={isFormDisabled}>
          <div className="form__span" htmlFor="name">Имя</div>
          <input name="name" id="name" className="form__input" value={values.name} onChange={handleChange} required minLength={2} maxLength={30}/>
          <span className="form__error">{errors.name}</span>
          <div className="form__span" htmlFor="email">E-mail</div>
          <input name="email" id="email" type="email" className="form__input" value={values.email} onChange={handleChange} required readOnly onFocus={handleFocus}/>
          <span className="form__error">{errors.email}</span>
          <div className="form__span" htmlFor="password">Пароль</div>
          <input name="password" id="password" type="password" className="form__input" value={values.password} onChange={handleChange} required minLength={4}/>
          <span className="form__error">{errors.password}</span>
        </fieldset>
      </Form>
    </Section>
    </div>
  </>
  );
};

export default Register;
