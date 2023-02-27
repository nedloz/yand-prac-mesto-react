import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, buttonText }) {
  const { values, handleChange, setValues } = useForm({});

  React.useEffect(() => {
    setValues({})
  }, [isOpen]);
 



  const handleSubmit = (e) => {
    e.preventDefault()
    onAddPlace(values)
  }

  return (
    <PopupWithForm
      buttonText={buttonText}
      name='card'
      title='Новое место'
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="popup__input-container">
        <input
          onChange={handleChange}
          value={values.name || ''}
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
          onChange={handleChange}
          value={values.link || ''}
          className="popup__input popup__input_type_card-link popup__input_type_error"
          id="card-link"
          name="link"
          type="url"
          required
          placeholder="Ссылка на картинку"
        />
        <span className="popup__error card-link-error popup__error_visible"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup