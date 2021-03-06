/**
 * Wrapper is used to wrap entire application in src/index.js
 */

import { connect } from 'react-redux'
import React from 'react'
import styled from 'styled-components'

// components
import Footer from '../Footer/Footer'
import NavBar from '../NavBar/NavBar'

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  left: 0;
  min-height: 100vh;
  position: absolute;
  transition: .35s ease;
  width: 100%;

  &.toggle-container {
    left: 200px;
    overflow: hidden;
    position: fixed;
  }
`

const mapStateToProps = state => ({
  toggleSideMenu: state.sideMenuReducer.toggleSideMenu
})

const Wrapper = props => (
  <StyledWrapper
    className={props.toggleSideMenu ? 'toggle-container' : null}
  >
    <NavBar />

    {props.children}

    <Footer />
  </StyledWrapper>
)

export default connect(mapStateToProps)(Wrapper)
