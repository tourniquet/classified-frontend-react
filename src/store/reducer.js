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
      const item = action.data

      return Object.assign({}, state, {
        url: item.url,
        categories: state.item.categories,
        category: state.item.category,
        showCategories: !state.item.showCategories,
        subcategories: state.item.subcategories,
        subcategory: state.item.subcategory,
        showSubcategories: false,
        regions: state.item.regions,
        region: state.item.region,
        showRegions: false,
        title: item.title,
        description: item.description,
        images: state.item.images,
        phoneNumber: state.item.phoneNumber,
        userName: item.name,
        price: item.price,
        currencies: state.item.currencies,
        currency: state.item.currency,
        showCurrencies: state.item.showCurrencies
      })
    // input value for search input
    case 'SET_SEARCH_TEXT':
      return Object.assign({}, state, {
        search: action.search
      })
    default:
      return state
  }
}

export default reducer
