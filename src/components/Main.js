import React from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext"
import Card from "./Card"

function Main({
    onEditAvatar,
    onEditProfile,
    onAddPlace,
    cards,
    onCardClick,
    onCardLike,
    onCardDelete,

}) {
  const currentUser = React.useContext(CurrentUserContext)



  return (
    <main className="main">
      <section className="profile">
        <div className="profile__card">
          <button className="profile__image" type="button" style={{ backgroundImage: `url(${currentUser.avatar})` }} onClick={onEditAvatar}></button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
            <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="places">{
        cards.map(card => (
        <Card 
          key = {card._id}
          card = {card} 
          onCardClick = {onCardClick} 
          onCardLike = {onCardLike}
          onCardDelete = {onCardDelete}
          /> ))
      }</section>
    </main>
  )
}

export default Main