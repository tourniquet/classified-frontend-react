const initialState = {
  items: []
}

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    // data for index page
    case 'FETCH_DATA':
      return Object.assign({}, state, {
        items: action.data
      })
    default:
      return state
  }
}

export default itemsReducer
