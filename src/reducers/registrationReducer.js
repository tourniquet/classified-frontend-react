const initialState = {
  email: '',
  password: '',
  passwordConfirmation: ''
}

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_EMAIL':
      return Object.assign({}, state, {
        email: action.email
      })
    case 'USER_PASSWORD':
      return Object.assign({}, state, {
        password: action.password
      })
    case 'USER_PASSWORD_CONFIRMATION':
      return Object.assign({}, state, {
        passwordConfirmation: action.passwordConfirmation
      })
    default:
      return state
  }
}

export default registrationReducer
