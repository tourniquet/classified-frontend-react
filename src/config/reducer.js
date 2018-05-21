import initialState from './initialState'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // data for index page
    case 'FETCH_DATA':
      return Object.assign({}, state, {
        items: action.data
      })
    // data for item page
    case 'FETCH_ITEM_DATA':
      return Object.assign({}, state, {
        item: action.data
      })
    // reducers for new item
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
    case 'UPLOAD_IMAGE':
      return Object.assign({}, state, {
        item: {
          title: state.item.title,
          description: state.item.description,
          price: state.item.price,
          images: state.item.images.concat(action.image)
        }
      })
    default:
      return state
  }
}

export default reducer
