import React from "react"
import Api from "../utils/Api"
import Card from "./Card"

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
  const [userName, setUserName] = React.useState()
  const [userDescription, setuserDescription] = React.useState()
  const [userAvatar, setuserAvatar] = React.useState()
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    Api.getUserInfo().then(res => {
        setUserName(res.name)
        setuserDescription(res.about)
        setuserAvatar(res.avatar)
      })
    Api.getCardsinfo().then(res => setCards(res))
  }, [])

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__card">
          <button className="profile__image" type="button" style={{ backgroundImage: `url(${userAvatar})` }} onClick={onEditAvatar}></button>
          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
            <p className="profile__description">{userDescription}</p>
          </div>
        </div>
            <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="places">{
        cards.map(card => <Card key={card._id} card={card} onCardClick={onCardClick}/>)
      }</section>
    </main>
  )
}

export default Main