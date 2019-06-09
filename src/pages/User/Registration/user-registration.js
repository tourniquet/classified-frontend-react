import React, { Component } from 'react'
import styled from 'styled-components'

// API host config
import { apiHost } from '../../../config'

// components
import Footer from '../../../components/Footer/Footer'
import Input from '../../../components/Input/Input'
import Label from '../../../components/Label/Label'
import NavBar from '../../../components/NavBar/NavBar'
import RoundedButton from '../../../components/Buttons/RoundedButton/RoundedButton'

const UserRegistrationPage = styled.div`
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

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 18px;
`

class UserRegistration extends Component {
  state = {
    emailIsTaken: false,
    passwordNotMatch: false
  }

  handleSubmit = event => {
    event.preventDefault()

    const form = document.getElementById('form')
    const formData = new window.FormData(form)

    const url = `${apiHost}/registration.php`
    window
      .fetch(url, {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(result => {
        const { message } = result

        if (message === 'Success!') {
          this.props.history.push('/user/login')
        } else if (message === 'Existing!') {
          this.setState({
            emailIsTaken: true,
            // reset password not match message
            passwordNotMatch: false
          })
        } else if (message === 'Unmatch!') {
          this.setState({
            emailIsTaken: false,
            // reset email is taken message
            passwordNotMatch: true
          })
        }
      })
      .catch(error => console.error(error))
  }

  render () {
    const { emailIsTaken, passwordNotMatch } = this.state

    return (
      <UserRegistrationPage>
        <NavBar />

        <form
          id='form'
          onSubmit={this.handleSubmit}
        >
          <Label
            htmlFor='email-registration-input'
            title='Email'
          />
          <Input
            id='email-registration-input'
            pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$'
            name='email'
            placeholder='Email'
            required
            type='email'
          />
          { emailIsTaken &&
            <ErrorMessage>
              Email is already taken!
            </ErrorMessage>
          }

          <Label
            htmlFor='password-registration-input'
            title='Password'
          />
          <Input
            id='password-registration-input'
            name='password'
            placeholder='Password'
            required
            type='password'
          />

          <Label
            htmlFor='confirm-password-registration-input'
            title='Confirm password'
          />
          <Input
            id='confirm-password-registration-input'
            name='passwordConfirmation'
            placeholder='Confirm password'
            required
            type='password'
          />
          { passwordNotMatch &&
            <ErrorMessage>
              Passwords did not match!
            </ErrorMessage>
          }

          <RoundedButton
            title='Register'
            type='submit'
          />
        </form>

        <Footer />
      </UserRegistrationPage>
    )
  }
}

export default UserRegistration
