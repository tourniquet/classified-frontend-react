const initialState = {
  email: '',
  password: '',
  emailPasswordError: false,
  emailUndefined: false,
  wrongPassword: false
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_EMAIL':
      return Object.assign({}, state, {
        email: action.email
      })
    case 'USER_PASSWORD':
      return Object.assign({}, state, {
        password: action.password
      })
    case 'SET_INITIAL_STATE':
      return Object.assign({}, state, {
        emailPasswordError: false,
        emailUndefined: false
      })
    case 'EMAIL_PASSWORD_ERROR':
      return Object.assign({}, state, {
        emailPasswordError: true
      })
    case 'EMAIL_UNDEFINED':
      return Object.assign({}, state, {
        emailUndefined: true
      })
    case 'WRONG_PASSWORD':
      return Object.assign({}, state, {
        wrongPassword: true
      })
    default:
      return state
  }
}

export default loginReducer
