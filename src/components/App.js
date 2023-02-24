import React from '../index';
import logo from '../images/logo.svg';

import Header from './Header.js'
import Main from './Main';
import Footer from './Footer';

import Api from '../utils/Api';

import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isImgPopupOpen, setIsImgPopupOpen] = React.useState(false)

  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '#' })
  const [cards, setCards] = React.useState([])
  const [currentUser, setCurrentUser] = React.useState({})
  const [isLoading, setIsLoading] = React.useState(false);
  const isOpen = isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isImgPopupOpen

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])


  React.useEffect(() => {
    Api.getUserInfo()
      .then(res => setCurrentUser(res))
      .catch(err => console.log(err))
    Api.getCardsinfo()
      .then(res => setCards(res))
      .catch(err => console.log(err))
  }, [])

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsImgPopupOpen(false)
    setSelectedCard({ name: '', link: '#' })
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }
  const handleCardClick = (card) => {
    setSelectedCard(card)
    setIsImgPopupOpen(true)
  }
  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    Api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err))
  }
  const handleCardDelete = (deleteCard) => {
    Api.deleteCard(deleteCard._id)
      .then(() => setCards((state) => state.filter((item) => item._id !== deleteCard._id)))
      .catch(err => console.log(err))
  }
  const handleUpdateUser = (data) => {
    setIsLoading(true)
    Api.sendUserInfo(data)
      .then((userData) => {
        setCurrentUser(userData)
        closeAllPopups()
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }
  const handleUpdateAvatar = (avatar) => {
    setIsLoading(true)
    Api.sendUserAvatar(avatar)
      .then(userData => {
        setCurrentUser(userData)
        closeAllPopups()
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }
  const handleAddPlaceSubmit = (cardData) => {
    setIsLoading(true)
    Api.sendNewCard(cardData)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div style={{ backgroundColor: 'black' }}>
        <div className='page'>
          <Header logo={logo} />
          <Main
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            cards={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            buttonText={isLoading ? 'Создаем...' : 'Создать'}
          />
          <PopupWithForm
            name='confirm'
            title='Вы уверены?'
            onClose={closeAllPopups}
            isOpen={false}
            buttonText="Да"
          />
          <ImagePopup
            onClose={closeAllPopups}
            card={selectedCard}
            isOpen={isImgPopupOpen}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App