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
    // input value for search input
    case 'SET_SEARCH_TEXT':
      return Object.assign({}, state, {
        search: action.search
      })
    // reducers for new item
    case 'SET_ITEM_TITLE':
      return Object.assign({}, state, {
        item: {
          title: action.title,
          description: state.item.description,
          images: state.item.images,
          price: state.item.price
        }
      })
    case 'SET_ITEM_DESCRIPTION':
      return Object.assign({}, state, {
        item: {
          title: state.item.title,
          description: action.description,
          images: state.item.images,
          price: state.item.price
        }
      })
    case 'SET_ITEM_PRICE':
      return Object.assign({}, state, {
        item: {
          title: state.item.title,
          description: state.item.description,
          images: state.item.images,
          price: action.price
        }
      })
    case 'UPLOAD_IMAGE':
      return Object.assign({}, state, {
        item: {
          title: state.item.title,
          description: state.item.description,
          images: [action.image, ...state.item.images],
          price: state.item.price
        }
      })
    default:
      return state
  }
}

export default reducer
