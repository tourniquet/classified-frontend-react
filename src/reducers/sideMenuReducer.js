const initialState = {
  toggleSideMenu: false
}

const sideMenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_SIDE_MENU':
      return Object.assign({}, state, {
        toggleSideMenu: !state.toggleSideMenu
      })
    default:
      return state
  }
}

export default sideMenuReducer
