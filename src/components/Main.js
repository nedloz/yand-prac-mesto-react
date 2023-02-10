import React from "react"
import Api from "../utils/Api"
import { container } from "../utils/Constants"


function Main({onEditProfile, onAddPlace, onEditAvatar, }) {
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

  const container = document.querySelector('.places')

  cards.forEach(card => {
    const newCard = (
      <div class="place">
        <img class="place__image" src={card.link} alt="#"/>
        <button class="place__trash" type="button"></button>
        <div class="place__description">
            <h2 class="place__name">{card.name}</h2>
            <div class="place__like-container">
                <button class="place__like-button" type="button"></button>
                <figcaption class="place__like-count">0</figcaption>
            </div>
        </div>
      </div>
    )
    container.append(newCard)
  })
  
  
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
      <section className="places">
      </section>
    </main>
)
}
// {cards.forEach(card => {
//           return(
            // <div class="place">
            //   <img class="place__image" src={card.link} alt="#"/>
            //   <button class="place__trash" type="button"></button>
            //   <div class="place__description">
            //       <h2 class="place__name">{card.name}</h2>
            //       <div class="place__like-container">
            //           <button class="place__like-button" type="button"></button>
            //           <figcaption class="place__like-count">0</figcaption>
            //       </div>
            //   </div>
            // </div>
//           )
//         })}
// return(
    //   <div class="place">
    //       <img class="place__image" src={cardInfo.link} alt="#"/>
    //       <button class="place__trash" type="button"></button>
    //       <div class="place__description">
    //           <h2 class="place__name">{cardInfo.name}</h2>
    //           <div class="place__like-container">
    //               <button class="place__like-button" type="button"></button>
    //               <figcaption class="place__like-count">0</figcaption>
    //           </div>
    //       </div>
    //   </div>
    // )

export default Main