const initialState = {
  categories: ['Imobiliare', 'Automobile'],
  category: null,
  showCategories: false,
  subcategories: ['Apartamente', 'Camioane'],
  subcategory: null,
  showSubcategories: false,
  regions: ['London', 'Manchester', 'Oxford'],
  region: null,
  showRegions: false,
  images: [''],
  currencies: ['$', '£'],
  currency: null,
  showCurrencies: false
}

const newItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_CATEGORIES_LIST':
      return Object.assign({}, state, {
        showCategories: !state.showCategories,
        showSubcategories: false,
        showRegions: false,
        showCurrencies: false
      })
    case 'SET_CATEGORY':
      return Object.assign({}, state, {
        category: state.categories[action.id],
        showCategories: false,
        showSubcategories: false,
        showRegions: false,
        showCurrencies: false
      })
    case 'TOGGLE_SUBCATEGORIES_LIST':
      return Object.assign({}, state, {
        showCategories: false,
        showSubcategories: !state.showSubcategories,
        showRegions: false,
        showCurrencies: false
      })
    case 'SET_SUBCATEGORY':
      return Object.assign({}, state, {
        showCategories: false,
        subcategory: state.subcategories[action.id],
        showSubcategories: false,
        showRegions: false,
        showCurrencies: false
      })
    case 'TOGGLE_REGIONS_LIST':
      return Object.assign({}, state, {
        showCategories: false,
        showSubcategories: false,
        showRegions: !state.showRegions,
        showCurrencies: false
      })
    case 'SET_REGION':
      return Object.assign({}, state, {
        showCategories: false,
        showSubcategories: false,
        region: state.regions[action.id],
        showRegions: false,
        showCurrencies: false
      })
    case 'SET_IMAGE_THUMBNAIL':
      return Object.assign({}, state, {
        showCategories: false,
        showSubcategories: false,
        showRegions: false,
        images: [...state.images.splice(state.images.length - 1, 0, action.image), ...state.images],
        showCurrencies: false
      })
    case 'REMOVE_IMAGE':
      return Object.assign({}, state, {
        showCategories: false,
        showSubcategories: false,
        showRegions: false,
        images: state.images.filter(el => el !== state.images[action.id]),
        showCurrencies: false
      })
    case 'TOGGLE_CURRENCIES':
      return Object.assign({}, state, {
        showCategories: false,
        showSubcategories: false,
        showRegions: false,
        showCurrencies: !state.showCurrencies
      })
    case 'SET_CURRENCY':
      return Object.assign({}, state, {
        showCategories: false,
        showSubcategories: false,
        showRegions: false,
        currency: state.currencies[action.id],
        showCurrencies: false
      })
    default:
      return state
  }
}

export default newItemReducer
