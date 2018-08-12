const initialState = {
  value: ''
}

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    // input value for search input
    case 'SET_SEARCH_TEXT':
      return Object.assign({}, state, {
        value: action.search
      })
    default:
      return state
  }
}

export default searchReducer
