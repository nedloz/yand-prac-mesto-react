import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')


  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);


  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  } 

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
           name='profile'
          title='Редактировать профиль' 
         onClose={onClose} 
        isOpen={isOpen} 
       buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
    <>
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
             value={name || ''}
            onChange={handleNameChange}
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
             value={description || ''}
            onChange={handleDescriptionChange}
          />
          <span className="popup__error profile-description-error"></span>
      </label>
    </>
    </PopupWithForm>
  )
}

export default EditProfilePopup