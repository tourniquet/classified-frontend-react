import { connect } from 'react-redux'
import React from 'react'
import styled from 'styled-components'

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  left: 0;
  min-height: 100vh;
  position: absolute;
  transition: .35s ease;
  width: 100%;

  &.toggle {
    left: 200px;
    overflow: hidden;
    /* min-height: 100vh; */
    position: fixed;
  }
`

const mapStateToProps = state => ({
  toggleSideMenu: state.sideMenuReducer.toggleSideMenu
})

const Wrapper = props => (
  <StyledWrapper
    className={props.toggleSideMenu ? 'toggle' : null}
  >
    {props.children}
  </StyledWrapper>
)

export default connect(mapStateToProps)(Wrapper)
