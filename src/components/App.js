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
  const [AddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [EditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [isImgPopupOpen, setImgPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: '#'})
  const [cards, setCards] = React.useState([])
  const [currentUser, setCurrentUser ] = React.useState({})

  React.useEffect(() => {
    Api.getUserInfo()
      .then(res => setCurrentUser(res))
      .catch(err => console.log(err))
    Api.getCardsinfo()
      .then(res => setCards(res))
      .catch(err => console.log(err))
  }, [])

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setImgPopupOpen(false)
    setSelectedCard({name: '', link: '#'})
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }
  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true)
  }
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true)
  }
  const handleCardClick = (card) => {
    setSelectedCard(card)
    setImgPopupOpen(true)
  }
  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    Api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c ));
      })
      .catch(err => console.log(err))
  }  
  const handleCardDelete = (deleteCard) => {
    Api.deleteCard(deleteCard._id)
      .then(()=> setCards(cards.filter(card => card._id !== deleteCard._id)))
      .catch(err => console.log(err))
  }
  const handleUpdateUser = (data) => {
    Api.sendUserInfo(data)
      .then((userData) => {
        setCurrentUser(userData)
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }
  const handleUpdateAvatar = (avatar) => {
    Api.sendUserAvatar(avatar)
      .then(userData => {
        setCurrentUser(userData)
        closeAllPopups()
      })
  }
  const handleAddPlaceSubmit = (cardData) => {
    Api.sendNewCard(cardData)
      .then(newCard => {
        setCards([newCard, ...cards]); 
        closeAllPopups()
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div style={{backgroundColor: 'black'}}>
      <div className='page'>
        <Header logo={logo}/>
        <Main 
               onEditProfile = {handleEditProfileClick} 
              onEditAvatar = {handleEditAvatarClick} 
             onAddPlace =  {handleAddPlaceClick}
            cards = {cards}
           onCardClick = {handleCardClick}
          onCardLike = {handleCardLike}
         onCardDelete= {handleCardDelete}
        /> 
        <Footer />
        <EditProfilePopup
            isOpen={isEditProfilePopupOpen} 
           onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup 
            isOpen={EditAvatarPopupOpen}
           onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
            isOpen={AddPlacePopupOpen}
           onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupWithForm 
        name='confirm' 
        title='Вы уверены?' 
        onClose={closeAllPopups} 
        isOpen={false} 
        buttonText="Да"
        >
        </PopupWithForm>
        <ImagePopup
          onClose={closeAllPopups}
          card={selectedCard} 
          isOpen={isImgPopupOpen}
        ></ImagePopup>
    </div>
  </div>
  </CurrentUserContext.Provider>
  )
}

export default App