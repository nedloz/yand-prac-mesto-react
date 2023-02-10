
function Card({card, onCardClick}) {
  const handleClick = () => {
    onCardClick(card);
  }
  return (
    <div className="place">
      <img className="place__image" src={card.link} alt={card.name} onClick={handleClick}/>
      <button className="place__trash" type="button"></button>
      <div className="place__description">
          <h2 className="place__name">{card.name}</h2>
          <div className="place__like-container">
              <button className="place__like-button" type="button"></button>
              <figcaption className="place__like-count">0</figcaption>
          </div>
      </div>
    </div>
  )
}

export default Card