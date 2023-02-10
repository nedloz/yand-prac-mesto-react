
function ImagePopup() {
  return (
    <div className="popup image-popup">
      <figure className="image-popup__container">
        <button className="popup__close-button popup__close-button_type_image-popup" type="button" value=""></button>
        <img className="image-popup__image" src="#" alt="" />
        <figcaption className="image-popup__title"></figcaption>
      </figure>
    </div>
  )
}
export default ImagePopup