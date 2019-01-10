const initialState = {
  items: []
}

const searchResultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return Object.assign({}, state, {
        items: action.result
      })
    default:
      return state
  }
}

export default searchResultsReducer
