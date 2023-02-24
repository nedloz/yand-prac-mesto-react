import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext"

function Card({
  card,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext)
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`place__like-button ${isLiked && 'place__like-button_active'}`);

  const handleClick = () => {
    onCardClick(card);
  }
  const handleLikeClick = () => {
    onCardLike(card)
  }
  const handleDeleteClick = () => {
    onCardDelete(card)
  }

  return (
    <div className="place">
      <img className="place__image" src={card.link} alt={card.name} onClick={handleClick} />
      {isOwn && <button className="place__trash" type="button" onClick={handleDeleteClick}></button>}
      <div className="place__description">
        <h2 className="place__name">{card.name}</h2>
        <div className="place__like-container">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
          <figcaption className="place__like-count">{card.likes.length}</figcaption>
        </div>
      </div>
    </div>
  )
}

export default Card