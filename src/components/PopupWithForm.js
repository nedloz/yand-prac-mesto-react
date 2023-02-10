
function PopupWithForm({name, title, children, isOpen, onClose}) {
  // 
  return (
    <div className={`popup ${name}-popup ${(isOpen)? 'popup_opened': ''}`}>
      <div className="popup__container">
        <div className="popup__start">
          <h2 className="popup__title">{title}</h2>
          <button className="popup__close-button" type="button" value="" onClick={onClose}></button>
        </div>
        <form noValidate className={`popup__form popup__form_type_${name}`} action="#" name={name + '-form'} method="post">
          {children}
        </form>
      </div>
    </div>
  )
}
export default PopupWithForm