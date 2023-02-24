
function ImagePopup({ card, onClose, isOpen }) {

  return (
    <div className={`popup image-popup ${isOpen ? 'popup_opened' : ''}`}>
      <figure className="image-popup__container">
        <button className="popup__close-button popup__close-button_type_image-popup" type="button" value="" onClick={onClose} ></button>
        <img className="image-popup__image" src={card.link} alt={card.name} />
        <figcaption className="image-popup__title">{card.name}</figcaption>
      </figure>
    </div>
  )
}
export default ImagePopup