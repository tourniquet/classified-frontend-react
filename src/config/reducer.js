import initialState from './initialState'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return Object.assign({}, state, {
        items: action.data
      })
    case 'SET_ITEM_TITLE':
      return Object.assign({}, state, {
        item: {
          title: action.title,
          description: state.item.description,
          price: state.item.price
        }
      })
    case 'SET_ITEM_DESCRIPTION':
      return Object.assign({}, state, {
        item: {
          title: state.item.title,
          description: action.description,
          price: state.item.price
        }
      })
    case 'SET_ITEM_PRICE':
      return Object.assign({}, state, {
        item: {
          title: state.item.title,
          description: state.item.description,
          price: action.price
        }
      })
    default:
      return state
  }
}

export default reducer
