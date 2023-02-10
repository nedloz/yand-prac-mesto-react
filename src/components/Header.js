
function Header(data) {
  return (
    <header className="header">
      <img className="header__image" src={data.logo} alt="логотип *место*"/>
    </header>
  )
}

export default Header