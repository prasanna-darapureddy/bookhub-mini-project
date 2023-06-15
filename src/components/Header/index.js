import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {GiHamburgerMenu} from 'react-icons/gi'

import './index.css'

class Header extends Component {
  state = {isHamburgerMenu: false}

  onLogoutBtn = () => {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      Cookies.remove('jwt_token')
      const {history} = this.props
      history.replace('/login')
    }
  }

  renderNavItems = () => {
    const {isHomeActive, isShelfActive} = this.props

    const homeClass = isHomeActive ? 'home-link active-link' : 'home-link'
    const shelfClass = isShelfActive ? 'shelf-link active-link' : 'shelf-link'

    return (
      <>
        <nav className="nav-container">
          <ul className="nav-items-container">
            <Link to="/" className={homeClass}>
              <li className="nav-item ">Home </li>
            </Link>

            <Link to="/shelf" className={shelfClass}>
              <li className="nav-item">BookShelves</li>
            </Link>

            <li className="nav-item">
              <button
                type="button"
                className="logout-button"
                onClick={this.onLogoutBtn}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </>
    )
  }

  onClickHamburgerMenu = () => {
    this.setState(prevState => {
      const {isHamburgerMenu} = prevState

      return {
        isHamburgerMenu: !isHamburgerMenu,
      }
    })
  }

  render() {
    const {isHamburgerMenu} = this.state
    return (
      <>
        <div className="header-container">
          <Link to="/" className="linked-logo">
            <img
              src="https://res.cloudinary.com/dbyzrfi0m/image/upload/v1684865254/Group_7731_rr29gt.png"
              className="header-web-logo"
              alt="website logo"
            />
          </Link>
          <div className="menus-container">{this.renderNavItems()}</div>
        </div>

        <div className="mobile-header-container">
          <div className="mobile-items-container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dbyzrfi0m/image/upload/v1684865254/Group_7731_rr29gt.png"
                className="header-web-logo"
                alt="website logo"
              />
            </Link>
            <button
              type="button"
              className="hamburger-button"
              onClick={this.onClickHamburgerMenu}
            >
              <GiHamburgerMenu className="hamburger-icon" />
            </button>
          </div>

          <div className="mobile-menu-items-container">
            {isHamburgerMenu ? this.renderNavItems() : null}
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(Header)
