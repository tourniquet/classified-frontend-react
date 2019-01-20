const initialState = {
  email: ''
}

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return Object.assign({}, state, {
        email: action.email
      })
    default:
      return state
  }
}

export default itemsReducer
