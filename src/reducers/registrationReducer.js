const initialState = {
  email: '',
  password: '',
  passwordConfirmation: '',
  emailIsTaken: false,
  passwordNotMatch: false
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
    case 'SET_INITIAL_STATE':
      return Object.assign({}, state, {
        emailIsTaken: false,
        passwordNotMatch: false
      })
    case 'EMAIL_IS_TAKEN':
      return Object.assign({}, state, {
        emailIsTaken: true
      })
    case 'PASSWORD_NOT_MATCH':
      return Object.assign({}, state, {
        passwordNotMatch: true
      })
    default:
      return state
  }
}

export default registrationReducer