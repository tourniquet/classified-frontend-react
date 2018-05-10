import initialState from './initialState'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return Object.assign({}, state, {
        items: action.data
      })
    case 'SET_ITEM':
      return Object.assign({}, state, {
        item: action.data
      })
    default:
      return state
  }
}

export default reducer
