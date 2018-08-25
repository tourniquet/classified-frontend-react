import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

// API host config
import { apiHost } from '../../../config'

// components
import Button from '../../../components/Button/Button'
import Footer from '../../../components/Footer/Footer'
import Header from '../../../components/Header/Header'
import Input from '../../../components/Input/Input'
import Label from '../../../components/Label/Label'

// styles
const UserLoginPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  > form {
    flex: 1 0 auto;
    margin: 0 auto;
    margin-top: 40px;
    width: 20%;
  }

  @media (max-width: 480px) {
    > form {
      width: 80%;
    }
  }
`

const mapStateToProps = state => ({
  username: state.username
})

const UserLogin = props => {
  const setUserName = event => {}

  const setUserPassword = event => {}

  const handleSubmit = event => {
    const url = `${apiHost}/`
    const data = {}

    window
      .fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
      })
      .then(() => { window.location = `` })
      .catch(error => console.error(error))

    event.preventDefaul()
  }

  return (
    <UserLoginPage>
      <Header />

      <form onSubmit={event => handleSubmit(event)}>
        <Label
          className='login-form-user-name'
          htmlFor='username-login-input'
          title='Username'
        />
        <Input
          id='username-login-input'
          className='username-login-input'
          placeholder='Username'
          value={props.username}
          required
          onChange={event => props.dispatch(setUserName(event))}
        />

        <Label
          className='login-form-user-password'
          htmlFor='user-password-login-input'
          title='Password'
        />
        <Input
          id='user-password-login-input'
          className='user-password-login-input'
          placeholder='Password'
          value={props.password}
          required
          onChange={event => props.dispatch(setUserPassword(event))}
        />

        <Button
          className='login-button'
          title='Login'
          type='submit'
        />
      </form>

      <Footer />
    </UserLoginPage>
  )
}

export default connect(mapStateToProps)(UserLogin)
