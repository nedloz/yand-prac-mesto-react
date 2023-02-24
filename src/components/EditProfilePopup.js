import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useForm } from '../hooks/useForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, buttonText }) {

  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, } = useForm({
    name: currentUser.name,
    about: currentUser.about,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      onClose={onClose}
      isOpen={isOpen}
      buttonText={buttonText}
      onSubmit={handleSubmit}
    >
      <label className="popup__input-container">
        <input
          className="popup__input popup__input_type_profile-name"
          id="profile-name"
          name="name"
          type="text"
          minLength="2"
          maxLength="40"
          required
          placeholder="Имя"
          value={values.name || ''}
          onChange={handleChange}
        />
        <span className="popup__error profile-name-error"></span>
      </label>
      <label className="popup__input-container">
        <input
          className="popup__input popup__input_type_profile-description"
          id="profile-description"
          name="about"
          type="text"
          minLength="2"
          maxLength="200"
          required
          placeholder="Профессия"
          value={values.about || ''}
          onChange={handleChange}
        />
        <span className="popup__error profile-description-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup