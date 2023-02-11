import React from '../index';
import logo from '../images/logo.svg';
import Header from './Header.js'
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [EditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [AddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [EditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [isImgPopupOpen, setImgPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: '#'})

  const handleCardClick = (card) => {
    setSelectedCard(card)
    setImgPopupOpen(true)
  }
  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true)
  }
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true)
  }
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true)
  }
  const CloseAllPopups = () => {
    setEditAvatarPopupOpen(false)
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setImgPopupOpen(false)
    setSelectedCard({name: '', link: '#'})
  }
  
  return (
    <div style={{backgroundColor: 'black'}}>
      <div className='page'>
        <Header logo={logo}/>
        <Main onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick} onEditProfile ={handleEditProfileClick} onCardClick={handleCardClick}/> 
        <Footer />
        <PopupWithForm name='profile' title='Редактировать профиль' onClose={CloseAllPopups} isOpen={EditProfilePopupOpen} buttonText="Сохранить">
          <>
            <label className="popup__input-container">
                <input className="popup__input popup__input_type_profile-name" id="profile-name" name="name" type="text" minLength="2" maxLength="40" required placeholder="Имя" />
                <span className="popup__error profile-name-error"></span>
            </label>
            <label className="popup__input-container">
                <input className="popup__input popup__input_type_profile-description" id="profile-description" name="about" type="text" minLength="2" maxLength="200" required placeholder="Профессия" />
                <span className="popup__error profile-description-error"></span>
            </label>
          </>
        </PopupWithForm>

        <PopupWithForm name='card' title='Новое место' onClose={CloseAllPopups} isOpen={AddPlacePopupOpen} buttonText="Создать">
          <>
            <label className="popup__input-container">
                <input className="popup__input popup__input_type_card-name popup__input_type_error" id="card-name" name="name" type="text" minLength="2" maxLength="30" required placeholder="Название" />
                <span className="popup__error card-name-error popup__error_visible"></span>
            </label>
            <label className="popup__input-container">
                <input className="popup__input popup__input_type_card-link popup__input_type_error" id="card-link" name="link" type="url" required placeholder="Ссылка на картинку" />
                <span className="popup__error card-link-error popup__error_visible"></span>
            </label>
          </>
        </PopupWithForm>

        <PopupWithForm name='avatar' title='Обновить аватар' onClose={CloseAllPopups} isOpen={EditAvatarPopupOpen} buttonText="Сохранить">
            <>
              <label className="popup__input-container">
                <input className="popup__input popup__input_type_avatar popup__input_type_error" id="avatar" name="avatar" type="url" required placeholder="Ссылка на новую картинку" />
                <span className="popup__error avatar-error popup__error_visible"></span>
              </label>
            </>
        </PopupWithForm>

        <PopupWithForm name='confirm' title='Вы уверены?' onClose={CloseAllPopups} isOpen={false} buttonText="Да">
        </PopupWithForm>

        <ImagePopup onClose={CloseAllPopups} card={selectedCard} isOpen={isImgPopupOpen}/>
    </div>
  </div>
  )
}

export default App