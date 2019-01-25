const initialState = {
  email: '',
  id: ''
}

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return Object.assign({}, state, {
        email: action.email,
        id: action.id
      })
    default:
      return state
  }
}

export default itemsReducer
