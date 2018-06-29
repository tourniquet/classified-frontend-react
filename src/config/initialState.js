const initialState = {
  items: [],
  item: {
    categories: ['Imobiliare', 'Automobile'],
    category: null,
    showCategories: false,
    subcategories: ['Apartamente', 'Camioane'],
    subcategory: null,
    showSubcategories: false,
    regions: ['London', 'Manchester', 'Oxford'],
    region: null,
    showRegions: false,
    title: '',
    description: '',
    price: '',
    currencies: ['$', '£'],
    currency: null,
    showCurrencies: false,
    images: ['']
  },
  search: ''
}

export default initialState
