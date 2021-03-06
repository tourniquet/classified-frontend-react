import { connect } from 'react-redux'
import React, { Component } from 'react'
import styled from 'styled-components'

// API host config
import { apiHost } from '../../../config'

// components
import Input from '../../../components/Input/Input'
import Label from '../../../components/Label/Label'
import Message from '../../../components/Message/Message'
import RoundedButton from '../../../components/Buttons/RoundedButton/RoundedButton'

// utils
import * as api from '../../../utils/cookieUtils'

const UserLoginPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  > form {
    flex: 1 0 auto;
    margin: 40px auto 0;
    width: 20%;
  }

  @media (max-width: 480px) {
    > form {
      width: 80%;
    }
  }
`

const mapStateToProps = state => ({
  email: state.userReducer.email,
  id: state.userReducer.id
})

class UserLogin extends Component {
  state = {
    wrongEmail: false,
    wrongPassword: false
  }

  checkIfUserIsLogged () {
    const email = api.getCookies('email').toString().replace('email=', '')
    const id = api.getCookies('id').toString().replace('id=', '')

    if (email && id) this.props.history.push('/')
  }

  handleSubmit = event => {
    event.preventDefault()

    const form = document.getElementById('form')
    const formData = new window.FormData(form)

    const url = `${apiHost}/login.php`
    window
      .fetch(url, {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(result => {
        if (result.email) {
          const month = new Date(new Date().setDate(new Date().getDate() + 30)).toGMTString()

          // save user email and user id in cookies
          window.document.cookie = `email=${result.email}; expires=${month}; path='/'`
          window.document.cookie = `id=${result.id}; expires=${month}; path='/'`

          this.props.dispatch({
            type: 'LOGIN_USER',
            email: result.email,
            id: result.id
          })

          // redirect user to index page
          this.props.history.push('/')
        } else if (result.message === 'Password!') {
          this.setState({
            // reset wrong email message
            wrongEmail: false,
            wrongPassword: true
          })
        } else if (result.message === 'Unsuccess!') {
          this.setState({
            wrongEmail: true,
            // reset wrong password message
            wrongPassword: false
          })
        }
      })
      .catch(error => console.error(error))
  }

  componentDidMount () {
    this.checkIfUserIsLogged()
  }

  render () {
    const { wrongEmail, wrongPassword } = this.state

    return (
      <UserLoginPage>
        <form
          id='form'
          onSubmit={this.handleSubmit}
        >
          <Label
            htmlFor='username-login-input'
            title='Email'
          />
          <Input
            id='username-login-input'
            name='email'
            pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$'
            placeholder='Email'
            required
          />

          <Label
            htmlFor='user-password-login-input'
            title='Password'
          />
          <Input
            id='user-password-login-input'
            name='password'
            placeholder='Password'
            required
            type='password'
          />

          { wrongEmail &&
            <Message
              className='error-message'
              message='Email did not match'
            />
          }

          { wrongPassword &&
            <Message
              className='error-message'
              message='Password did not match'
            />
          }

          <RoundedButton
            className='login-button'
            title='Login'
            type='submit'
          />
        </form>
      </UserLoginPage>
    )
  }
}

export default connect(mapStateToProps)(UserLogin)
