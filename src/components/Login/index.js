import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  onLoginSuccess = token => {
    Cookies.set('jwt_token', token, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onLoginFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      this.onLoginSuccess(data.jwt_token)
    } else {
      const data = await response.json()
      this.onLoginFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showError, errorMsg} = this.state

    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="app-container">
        <img
          src="https://i.ibb.co/D7pZm3z/login-image.jpg"
          className="login-image"
          alt="website login"
        />
        <div className="login-details-container">
          <div className="card-container">
            <img
              src="https://i.ibb.co/Dg5fD10/website-logo.png"
              alt="login website logo"
              className="website-logo"
            />
            <form className="form-container" onSubmit={this.onSubmitForm}>
              <div className="label-input-container">
                <label htmlFor="username" className="label-text">
                  Username*
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  placeholder="Enter Username"
                  className="input-ele"
                  onChange={this.onChangeUsername}
                />
              </div>

              <div className="label-input-container">
                <label htmlFor="password" className="label-text">
                  Password*
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  placeholder="Enter Password"
                  className="input-ele"
                  onChange={this.onChangePassword}
                />
                {showError && <p className="error-text">{errorMsg}</p>}
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
