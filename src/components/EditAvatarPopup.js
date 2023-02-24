import React from "react"
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, buttonText }) {
  const avatarRef = React.useRef()
  React.useEffect(() => { avatarRef.current.value = '' }, [isOpen])

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name='avatar'
      onSubmit={handleSubmit}
      title='Обновить аватар'
      onClose={onClose}
      isOpen={isOpen}
      buttonText={buttonText}
    >
      <label className="popup__input-container">
        <input
          ref={avatarRef}
          className="popup__input popup__input_type_avatar popup__input_type_error"
          id="avatar"
          name="avatar"
          type="url"
          required
          placeholder="Ссылка на новую картинку"
        />
        <span className="popup__error avatar-error popup__error_visible"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup