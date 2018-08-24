import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

// API host config
import { apiHost } from '../../../config'

// components
import { Button } from '../../../components/Button/Button'
import { Footer } from '../../../components/Footer/Footer'
import { Header } from '../../../components/Header/Header'
import { Input } from '../../../components/Input/Input'
import { Label } from '../../../components/Label/Label'

// styles
const UserRegistrationPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const UserRegistrationForm = styled.div`
  flex: 1 0 auto;
  margin: 0 auto;
  margin-top: 40px;
  width: 20%;
`

const mapStateToProps = state => ({})

const UserRegistration = props => {
  const setUsername = event => {}

  const setUserPassword = event => {}

  const confirmUserPassword = event => {}

  const handleSubmit = event => {
    const url = `${apiHost}/register.php`
    const data = {}

    window
      .fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
      })
      .then(() => { window.location = `` })
      .catch(error => console.error(error))

    event.preventDefault()
  }

  return (
    <UserRegistrationPage>
      <Header />

      <UserRegistrationForm onSubmit={event => handleSubmit(event)}>
        <Label
          className='registration-form-username'
          htmlFor='username-registration-input'
          title='Username'
        />
        <Input
          id='username-registration-input'
          className='username-registration-input'
          placeholder='Username'
          value={props.username}
          required
          onChange={event => props.dispatch(setUsername(event))}
        />

        <Label
          className='registration-form-password'
          htmlFor='password-registration-input'
          title='Password'
        />
        <Input
          id='password-registration-input'
          className='password-registration-input'
          placeholder='Password'
          value={props.password}
          required
          onChange={event => props.dispatch(setUserPassword(event))}
        />

        <Label
          className='registration-form-password'
          htmlFor='confirm-password-registration-input'
          title='Confirm password'
        />
        <Input
          id='confirm-password-registration-input'
          className='confirm-password-registration-input'
          placeholder='Confirm password'
          value={props.confirmPassword}
          required
          onChange={event => props.dispatch(confirmUserPassword(event))}
        />

        <Button
          className='user-registration-submit-button'
          name=''
          title='Register'
          type='submit'
        />
      </UserRegistrationForm>

      <Footer />
    </UserRegistrationPage>
  )
}

export default connect(mapStateToProps)(UserRegistration)
