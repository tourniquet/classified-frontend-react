const initialState = {
  category: null,
  subcategory: null,
  region: null,
  title: null,
  description: null,
  price: null,
  currency: null,
  images: [],
  phone: '',
  name: null,
  published: null
}

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    /** data for item page */
    case 'FETCH_ITEM_DATA':
      const {
        category,
        subcategory,
        title,
        description,
        images,
        phone,
        name,
        price,
        currency,
        published,
        views
      } = action.result

      return Object.assign({}, state, {
        category,
        subcategory,
        title,
        description,
        images,
        phone,
        name,
        price,
        currency,
        published,
        views
      })
    default:
      return state
  }
}

export default itemReducer
