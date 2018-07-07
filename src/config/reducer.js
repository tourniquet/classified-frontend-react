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
    case 'TOGGLE_CATEGORIES_LIST':
      return Object.assign({}, state, {
        item: {
          categories: state.item.categories,
          category: state.item.category,
          showCategories: !state.item.showCategories,
          subcategories: state.item.subcategories,
          subcategory: state.item.subcategory,
          showSubcategories: false,
          regions: state.item.regions,
          region: state.item.region,
          showRegions: false,
          title: state.item.title,
          description: state.item.description,
          images: state.item.images,
          price: state.item.price,
          currencies: state.item.currencies,
          currency: state.item.currency,
          showCurrencies: state.item.showCurrencies
        }
      })
    case 'SET_CATEGORY':
      return Object.assign({}, state, {
        item: {
          categories: state.item.categories,
          category: state.item.categories[action.id],
          showCategories: false,
          subcategories: state.item.subcategories,
          subcategory: state.item.subcategory,
          showSubcategories: false,
          regions: state.item.regions,
          region: state.item.region,
          showRegions: false,
          title: state.item.title,
          description: state.item.description,
          images: state.item.images,
          price: state.item.price,
          currencies: state.item.currencies,
          currency: state.item.currency,
          showCurrencies: false
        }
      })
    case 'TOGGLE_SUBCATEGORIES_LIST':
      return Object.assign({}, state, {
        item: {
          categories: state.item.categories,
          category: state.item.category,
          showCategories: false,
          subcategories: state.item.subcategories,
          subcategory: state.item.subcategory,
          showSubcategories: !state.item.showSubcategories,
          regions: state.item.regions,
          region: state.item.region,
          showRegions: false,
          title: state.item.title,
          description: state.item.description,
          images: state.item.images,
          price: state.item.price,
          currencies: state.item.currencies,
          currency: state.item.currency,
          showCurrencies: false
        }
      })
    case 'SET_SUBCATEGORY':
      return Object.assign({}, state, {
        item: {
          categories: state.item.categories,
          category: state.item.category,
          showCategories: false,
          subcategories: state.item.subcategories,
          subcategory: state.item.subcategories[action.id],
          showSubcategories: false,
          regions: state.item.regions,
          region: state.item.region,
          showRegions: false,
          title: state.item.title,
          description: state.item.description,
          images: state.item.images,
          price: state.item.price,
          currencies: state.item.currencies,
          currency: state.item.currency,
          showCurrencies: false
        }
      })
    case 'TOGGLE_REGIONS_LIST':
      return Object.assign({}, state, {
        item: {
          categories: state.item.categories,
          category: state.item.category,
          showCategories: false,
          subcategories: state.item.subcategories,
          subcategory: state.item.subcategory,
          showSubcategories: false,
          regions: state.item.regions,
          region: state.item.region,
          showRegions: !state.item.showRegions,
          title: state.item.title,
          description: state.item.description,
          images: state.item.images,
          price: state.item.price,
          currencies: state.item.currencies,
          currency: state.item.currency,
          showCurrencies: false
        }
      })
    case 'SET_REGION':
      return Object.assign({}, state, {
        item: {
          categories: state.item.categories,
          category: state.item.category,
          showCategories: false,
          subcategories: state.item.subcategories,
          subcategory: state.item.subcategory,
          showSubcategories: false,
          regions: state.item.regions,
          region: state.item.regions[action.id],
          showRegions: false,
          title: state.item.title,
          description: state.item.description,
          images: state.item.images,
          price: state.item.price,
          currencies: state.item.currencies,
          currency: state.item.currency,
          showCurrencies: false
        }
      })
    case 'SET_ITEM_TITLE':
      return Object.assign({}, state, {
        item: {
          categories: state.item.categories,
          category: state.item.category,
          showCategories: false,
          subcategories: state.item.subcategories,
          subcategory: state.item.subcategory,
          showSubcategories: false,
          regions: state.item.regions,
          region: state.item.region,
          showRegions: false,
          title: action.title,
          description: state.item.description,
          images: state.item.images,
          price: state.item.price,
          currencies: state.item.currencies,
          currency: state.item.currency,
          showCurrencies: false
        }
      })
    case 'SET_ITEM_DESCRIPTION':
      return Object.assign({}, state, {
        item: {
          categories: state.item.categories,
          category: state.item.category,
          showCategories: false,
          subcategories: state.item.subcategories,
          subcategory: state.item.subcategory,
          showSubcategories: false,
          regions: state.item.regions,
          region: state.item.region,
          showRegions: false,
          title: state.item.title,
          description: action.description,
          images: state.item.images,
          price: state.item.price,
          currencies: state.item.currencies,
          currency: state.item.currency,
          showCurrencies: false
        }
      })
    case 'UPLOAD_IMAGE':
      return Object.assign({}, state, {
        item: {
          categories: state.item.categories,
          category: state.item.category,
          showCategories: false,
          subcategories: state.item.subcategories,
          subcategory: state.item.subcategory,
          showSubcategories: false,
          regions: state.item.regions,
          region: state.item.region,
          showRegions: false,
          title: state.item.title,
          description: action.description,
          images: [...state.item.images.splice(state.item.images.length - 1, 0, action.image), ...state.item.images],
          price: state.item.price,
          currencies: state.item.currencies,
          currency: state.item.currency,
          showCurrencies: false
        }
      })
    case 'REMOVE_IMAGE':
      return Object.assign({}, state, {
        item: {
          categories: state.item.categories,
          category: state.item.category,
          showCategories: false,
          subcategories: state.item.subcategories,
          subcategory: state.item.subcategory,
          showSubcategories: false,
          regions: state.item.regions,
          region: state.item.region,
          showRegions: false,
          title: state.item.title,
          description: action.description,
          images: state.item.images.filter(el => el !== state.item.images[action.id]),
          price: state.item.price,
          currencies: state.item.currencies,
          currency: state.item.currency,
          showCurrencies: false
        }
      })
    case 'SET_PHONE_NUMBER':
      return Object.assign({}, state, {
        item: {
          categories: state.item.categories,
          category: state.item.category,
          showCategories: false,
          subcategories: state.item.subcategories,
          subcategory: state.item.subcategory,
          showSubcategories: false,
          regions: state.item.regions,
          region: state.item.region,
          showRegions: false,
          title: state.item.title,
          description: state.item.description,
          images: state.item.images,
          price: state.item.price,
          currencies: state.item.currencies,
          currency: state.item.currency,
          showCurrencies: false
        }
      })
    case 'SET_ITEM_PRICE':
      return Object.assign({}, state, {
        item: {
          categories: state.item.categories,
          category: state.item.category,
          showCategories: false,
          subcategories: state.item.subcategories,
          subcategory: state.item.subcategory,
          showSubcategories: false,
          regions: state.item.regions,
          region: state.item.region,
          showRegions: false,
          title: state.item.title,
          description: state.item.description,
          images: state.item.images,
          price: action.price,
          currencies: state.item.currencies,
          currency: state.item.currency,
          showCurrencies: false
        }
      })
    case 'TOGGLE_CURRENCIES':
      return Object.assign({}, state, {
        item: {
          categories: state.item.categories,
          showCategories: state.item.showCategories,
          subcategories: state.item.subcategories,
          showSubcategories: state.item.showSubcategories,
          regions: state.item.regions,
          showRegions: state.item.showRegions,
          title: state.item.title,
          description: state.item.description,
          images: state.item.images,
          price: state.item.price,
          currencies: state.item.currencies,
          showCurrencies: !state.item.showCurrencies
        }
      })
    case 'SET_CURRENCY':
      return Object.assign({}, state, {
        item: {
          categories: state.item.categories,
          category: state.item.category,
          showCategories: false,
          subcategories: state.item.subcategories,
          subcategory: state.item.subcategory,
          showSubcategories: false,
          regions: state.item.regions,
          region: state.item.region,
          showRegions: false,
          title: state.item.title,
          description: state.item.description,
          images: state.item.images,
          price: state.item.price,
          currencies: state.item.currencies,
          currency: state.item.currencies[action.id],
          showCurrencies: false
        }
      })
    default:
      return state
  }
}

export default reducer
