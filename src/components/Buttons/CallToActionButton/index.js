import { connect } from 'react-redux'
import React from 'react'
import styled from 'styled-components'

import Button from '..'

const CallToAction = styled(Button)`
  background-color: #E7774A;
  border: 0;
  bottom: 0;
  color: white;
  display: block;
  font-size: 16px;
  height: 40px;
  left: 0;
  line-height: 40px;
  position: fixed;
  text-align: center;
  text-decoration: none;
  top: calc(100vh - 40px);
  width: 100%;
  z-index: 1;

  &.toggle-side-menu {
    display: none;
  }

  @media (min-width: 481px) {
    display: none;
  }
`

const mapStateToProps = state => ({
  toggleSideMenu: state.sideMenuReducer.toggleSideMenu
})

const CallToActionButton = props => (
  <CallToAction
    className={props.toggleSideMenu ? 'toggle-side-menu' : null}
    title={props.title}
  />
)

export default connect(mapStateToProps)(CallToActionButton)
