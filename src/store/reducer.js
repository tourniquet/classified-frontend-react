import initialState from './initialState'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // input value for search input
    case 'SET_SEARCH_TEXT':
      return Object.assign({}, state, {
        search: action.search
      })
    default:
      return state
  }
}

export default reducer
