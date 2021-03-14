import React from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Section from '../Section/Section';
import Form from '../Form/Form';
import './Profile.css';

const Profile = () => {
  const userName = 'Миша';

  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <Section mod="profile" sectionTitleMod="profile__title" sectionTitle={`Привет, ${userName}!`}>
        <Form linkPath="/signin"
          linkText="Выйти из аккаунта"
          buttonText="Редактировать"
          submitButtonMod="form__submit-button_section_profile"
          linkMod="form__link_type_exit"
        >
          <fieldset className="form__fieldset form__fieldset_section_profile">
            <div className="form__input-container">
              <div className="form__span form__span_section_profile" htmlFor="name">Имя</div>
              <input className="form__input form__input_section_profile" id="name" defaultValue="Миша" required />
            </div>
            <div className="form__input-container">
              <div className="form__span form__span_section_profile" htmlFor="email">Почта</div>
              <input type="email" className="form__input form__input_section_profile" id="email" defaultValue="qwerty@mail.ru" required />
            </div>
          </fieldset>
        </Form>
      </Section>
    </>
  );
};

export default Profile;
