const initialState = {
  category: null,
  subcategory: null,
  region: null,
  title: null,
  description: null,
  price: null,
  currency: null,
  images: [''],
  phoneNumber: '',
  name: null,
  published: null
}

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    // data for item page
    case 'FETCH_ITEM_DATA':
      const { title, description, name, price, published, views } = action.result

      return Object.assign({}, state, {
        title,
        description,
        // images: state.item.images,
        // phoneNumber: state.item.phoneNumber,
        name,
        price,
        // currency: state.item.currency,
        published,
        views
      })
    default:
      return state
  }
}

export default itemReducer
