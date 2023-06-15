import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: '', isErrorShows: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsernameInput = () => {
    const {username} = this.state
    return (
      <div className="username-container">
        <label htmlFor="username" className="label-text">
          Username*
        </label>
        <input
          type="text"
          id="username"
          className="user-input"
          placeholder="Enter user name"
          onChange={this.onChangeUsername}
          value={username}
        />
      </div>
    )
  }

  renderPasswordInput = () => {
    const {password} = this.state
    return (
      <div className="password-container">
        <label htmlFor="password" className="label-text">
          Password*
        </label>
        <input
          type="password"
          id="password"
          className="user-input"
          placeholder="Enter password"
          onChange={this.onChangePassword}
          value={password}
        />
      </div>
    )
  }

  onSuccessSubmit = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onFailureSubmit = errorMsg => {
    this.setState({errorMsg, isErrorShows: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const fetchedData = await response.json()

    if (response.ok) {
      this.onSuccessSubmit(fetchedData.jwt_token)
    } else {
      this.onFailureSubmit(fetchedData.error_msg)
    }
  }

  render() {
    const {errorMsg, isErrorShows} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <>
        <div className="login-bg-container">
          <img
            src="https://res.cloudinary.com/dbyzrfi0m/image/upload/v1684864099/Rectangle_1467_itjbbz.png"
            alt="website login"
            className="website-login-img"
          />
          <img
            src="https://res.cloudinary.com/dbyzrfi0m/image/upload/v1684864361/Ellipse_99_vqbpxo.png"
            alt="website login"
            className="mobile-web-login-img"
          />
          <div className="login-card-container">
            <form className="login-form" onSubmit={this.onSubmitForm}>
              <img
                src="https://res.cloudinary.com/dbyzrfi0m/image/upload/v1684865254/Group_7731_rr29gt.png"
                alt="login website logo"
                className="web-logo-img"
              />
              {this.renderUsernameInput()}
              {this.renderPasswordInput()}
              <button type="submit" className="login-button">
                Login
              </button>
              {isErrorShows && <p className="error-msg">*{errorMsg}</p>}
            </form>
          </div>
        </div>
      </>
    )
  }
}
export default LoginForm
