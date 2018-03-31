import initialState from './store'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return Object.assign({}, state, {
        items: action.data
      })
    default:
      return state
  }
}

export default reducer
