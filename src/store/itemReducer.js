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
  userName: null,
  published: null
}

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    // data for item page
    case 'FETCH_ITEM_DATA':
      const { title, description, price, published } = action.result

      return Object.assign({}, state, {
        title,
        description,
        // images: state.item.images,
        // phoneNumber: state.item.phoneNumber,
        // userName: item.name,
        price,
        // currency: state.item.currency,
        published
      })
    default:
      return state
  }
}

export default itemReducer
