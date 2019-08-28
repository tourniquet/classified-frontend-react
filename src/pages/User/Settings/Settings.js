import React, { Component } from 'react'

// API host config
import { apiHost } from '../../../config'

// components
import Input from '../../../components/Input/Input'
import Label from '../../../components/Label/Label'
import Message from '../../../components/Message/Message'
import RoundedButton from '../../../components/Buttons/RoundedButton/RoundedButton'

// styles
import './Settings.scss'

class Settings extends Component {
  state = {
    wrongOldPassword: false,
    wrongPasswordConfirmation: false,
    passwordUpdated: false
  }

  checkIfUserIsLogged () {
    const cookies = window.document.cookie.split('; ')

    const getCookies = name => cookies.filter(el => el.split('=')[0] === name)
    const email = getCookies('email').toString().replace('email=', '')
    const id = getCookies('id').toString().replace('id=', '')

    if (!email && !id) this.props.history.push('/user/login')
  }

  handleSubmit = event => {
    event.preventDefault()

    const cookies = window.document.cookie.split('; ')
    const getCookies = name => cookies.filter(el => el.split('=')[0] === name)
    const email = getCookies('email').toString().replace('email=', '')

    const form = document.getElementById('reset-password')
    const formData = new window.FormData(form)
    formData.append('email', email)

    const url = `${apiHost}/user-settings.php`
    window
      .fetch(url, {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(result => {
        const { message } = result

        if (message === 'Success!') {
          this.setState({
            wrongOldPassword: false,
            wrongPasswordConfirmation: false,
            passwordUpdated: true
          })
        } else if (message === 'Wrong password!') {
          this.setState({
            wrongOldPassword: true,
            wrongPasswordConfirmation: false,
            passwordUpdated: false
          })
        } else if (message === 'Unmatch!') {
          this.setState({
            wrongOldPassword: false,
            wrongPasswordConfirmation: true,
            passwordUpdated: false
          })
        }
      })
      .catch(err => console.error(err))
  }

  componentDidMount () {
    this.checkIfUserIsLogged()
  }

  render () {
    const { wrongOldPassword, wrongPasswordConfirmation, passwordUpdated } = this.state
    return (
      <>
        <form
          id='reset-password'
          className='reset-password'
          onSubmit={this.handleSubmit}
        >
          <Label
            className='mandatory'
            htmlFor='old-password'
            title='Old password'
          />
          <Input
            className='old-password input'
            placeholder='Old password'
            name='old-password'
            required
            type='password'
          />
          { wrongOldPassword &&
            <Message
              className='error-message'
              message='Old password did not match'
            />
          }

          <Label
            className='mandatory'
            htmlFor='new-password'
            title='New password'
          />
          <Input
            className='new-password input'
            placeholder='New password'
            name='new-password'
            required
            type='password'
          />

          <Label
            className='mandatory'
            htmlFor='confirm-new-password'
            title='Confirm new password'
          />
          <Input
            className='confirm-new-password input'
            placeholder='Confirm new password'
            name='new-password-confirmation'
            required
            type='password'
          />
          { wrongPasswordConfirmation &&
            <Message
              className='error-message'
              message='Password did not match'
            />
          }

          { passwordUpdated &&
            <Message
              className='success-message'
              message='Password was updated'
            />
          }

          <RoundedButton
            title='Reset password'
            type='submit'
          />
        </form>
      </>
    )
  }
}

export default Settings
