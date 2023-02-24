import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const [cardName, setCardName] = React.useState('')
  const [cardLink, setCardLink] = React.useState('')

  React.useEffect(() => {
    setCardName('')
    setCardLink('')
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddPlace({
      name: cardName,
      link: cardLink,
    })
  }
  const handleCardNameChange = (e) => {
    setCardName(e.target.value)
  }
  const handleCardLinkChange = (e) => {
    setCardLink(e.target.value)
  }

  return (
    <PopupWithForm 
         buttonText="Создать"
        name='card' 
       title='Новое место' 
      onClose={onClose} 
     isOpen={isOpen} 
    onSubmit={handleSubmit}
    >
    <>
      <label className="popup__input-container">
          <input
                    onChange={handleCardNameChange}
                   className="popup__input popup__input_type_card-name popup__input_type_error"
                  id="card-name"
                 name="name"
                type="text"
               minLength="2"
              maxLength="30" 
             required 
            placeholder="Название"
          />
          <span className="popup__error card-name-error popup__error_visible"></span>
      </label>
      <label className="popup__input-container">
          <input  
                  onChange={handleCardLinkChange}
                 className="popup__input popup__input_type_card-link popup__input_type_error"
                id="card-link"
               name="link"
              type="url"
             required
            placeholder="Ссылка на картинку"
          />
          <span className="popup__error card-link-error popup__error_visible"></span>
      </label>
    </>
  </PopupWithForm>
  )
}

export default AddPlacePopup