import React from 'react'
import styled from 'styled-components'

const SidebarToggle = styled.div`
  background-color: transparent;
  background-image: none;
  border-radius: 4px;
  border: 1px solid transparent;
  cursor: pointer;
  display: inline-block;
  flex-grow: 0;
  left: 20px;
  position: absolute;
  text-align: center;
  width: 26px;

  @media (min-width: 481px) {
    display: none;
  }
`

const IconBar = styled.div`
  background-color: #E7775C;
  border-radius: 1px;
  height: 2px;
  margin-bottom: 5px;
  width: 26px;
`

const SidebarToggleComponent = ({ className, onClick }) =>
  <SidebarToggle
    className={className}
    onClick={onClick}
  >
    <IconBar>&nbsp;</IconBar>
    <IconBar>&nbsp;</IconBar>
    <IconBar>&nbsp;</IconBar>
  </SidebarToggle>

export default SidebarToggleComponent
