import React, { useContext } from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Section from '../Section/Section';
import Form from '../Form/Form';
import './Profile.css';
import CurrentUserContext from '../../context/CurrentUserContext';
import useFormValid from '../../utils/hookValid';

const Profile = ({ onSignout, onUpdateProfile, isFormDisabled }) => {
  const currentUser = useContext(CurrentUserContext);
  const initValues = { name: currentUser.name, email: currentUser.email };
  const { isValid, values, errors, handleChange } = useFormValid(initValues);
  const isProfileValid = isValid
    && (values.name !== initValues.name || values.email !== initValues.email);

  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <Section mod="profile" sectionTitleMod="profile__title" sectionTitle={`Привет,${currentUser.name}!`}>
        <Form linkPath="/"          
          onLinkClick={onSignout}
          data={values}
          onSubmit={onUpdateProfile}
          isValid={isProfileValid}
          isFormDisabled={isFormDisabled}
          buttonText="Редактировать"
          submitButtonMod="form__submit-button_section_profile"
          linkMod="form__link_type_exit"
          linkText="Выйти из аккаунта"
        >
          <fieldset className="form__fieldset form__fieldset_section_profile">
            <div className="form__input-container">
              <div className="form__span form__span_section_profile" htmlFor="name">Имя</div>
              <input name="name" id="name" className="form__input form__input_section_profile" value={values.name} onChange={handleChange} required />
              <span className="form__error">{errors.name}</span>
            </div>
            <div className="form__input-container">
              <div className="form__span form__span_section_profile" htmlFor="email">Почта</div>
              <input name="email" id="email" type="email" className="form__input form__input_section_profile" value={values.email} onChange={handleChange} required />
              <span className="form__error">{errors.email}</span>
            </div>
          </fieldset>
        </Form>
      </Section>
    </>
  );
};

export default Profile;
