import {Component} from 'react'

import {GiHamburgerMenu} from 'react-icons/gi'
import {RiCloseCircleFill} from 'react-icons/ri'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

import './index.css'

class Header extends Component {
  state = {mobileLogoutView: false}

  onClickLogoutButton = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onClickHamBurgerMenu = () => {
    this.setState({mobileLogoutView: true})
  }

  onClickCloseIcon = () => {
    this.setState({mobileLogoutView: false})
  }

  render() {
    const {mobileLogoutView} = this.state
    const {home, bookshelves} = this.props
    const activeHomeClassName = home ? 'active-path' : ''
    const activeBookshelvesClassName = bookshelves ? 'active-path' : ''

    return (
      <nav className="nav-header-container">
        <div className="website-logo-and-logout-container">
          <div className="logo-container">
            <Link to="/">
              <img
                src="https://i.ibb.co/Dg5fD10/website-logo.png"
                alt="website logo"
                className="website-logo-image"
              />
            </Link>
          </div>

          <div className="hamburger-menu-container">
            <button
              type="button"
              className="burger-button"
              onClick={this.onClickHamBurgerMenu}
            >
              <GiHamburgerMenu size={26} />
            </button>
          </div>

          <ul className="paths-list-container-desktop-view">
            <li className="list-item">
              <Link to="/" className={`${activeHomeClassName} link`}>
                Home
              </Link>
            </li>
            <li className="list-item">
              <Link
                to="/shelf"
                className={`${activeBookshelvesClassName} link`}
              >
                Bookshelves
              </Link>
            </li>

            <li className="list-item">
              <button
                type="button"
                onClick={this.onClickLogoutButton}
                className="logout-button"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>

        {mobileLogoutView && (
          <ul className="paths-list-container-mobile-view">
            <li className="list-item">
              <Link to="/" className={`${activeHomeClassName} link`}>
                Home
              </Link>
            </li>
            <li className="list-item">
              <Link
                to="/shelf"
                className={`${activeBookshelvesClassName} link`}
              >
                Bookshelves
              </Link>
            </li>
            <li className="list-item">
              <button
                type="button"
                onClick={this.onClickLogoutButton}
                className="logout-button"
              >
                Logout
              </button>
            </li>
            <li className="list-item">
              <button
                type="button"
                className="close-button"
                onClick={this.onClickCloseIcon}
              >
                <RiCloseCircleFill size={28} />
              </button>
            </li>
          </ul>
        )}
      </nav>
    )
  }
}

export default withRouter(Header)
