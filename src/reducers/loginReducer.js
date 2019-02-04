const initialState = {
  email: '',
  password: '',
  wrongEmail: false,
  wrongPassword: false,
  emailUndefined: false
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER_EMAIL':
      return Object.assign({}, state, {
        email: action.email
      })
    case 'LOGIN_USER_PASSWORD':
      return Object.assign({}, state, {
        password: action.password
      })
    case 'SET_INITIAL_STATE':
      return Object.assign({}, state, {
        wrongEmail: false,
        wrongPassword: false,
        emailUndefined: false
      })
    case 'LOGIN_WRONG_EMAIL':
      return Object.assign({}, state, {
        wrongEmail: true
      })
    case 'LOGIN_WRONG_PASSWORD':
      return Object.assign({}, state, {
        wrongPassword: true
      })
    default:
      return state
  }
}

export default loginReducer
