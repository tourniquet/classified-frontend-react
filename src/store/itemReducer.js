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
  pub_date: null
}

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    // data for item page
    case 'FETCH_ITEM_DATA':
      const item = action.data

      return Object.assign({}, state, {
        title: item.title,
        description: item.description,
        // images: state.item.images,
        // phoneNumber: state.item.phoneNumber,
        // userName: item.name,
        price: item.price,
        // currency: state.item.currency,
        pub_date: item.pub_date
      })
    default:
      return state
  }
}

export default itemReducer
