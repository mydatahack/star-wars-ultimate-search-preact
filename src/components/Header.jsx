import { h, component } from 'preact'

const Header = () => {
  return (
    <div>
      <div class="img-container">
        <img src='img/star-wars-logo.png' alt="Star Wars Logo" className="star-wars-logo"/>
      </div>
      <div class="header-container">
        <h1 class="header-title">Ultimate Search</h1>
      </div>
    </div>
  )
}

export default Header
