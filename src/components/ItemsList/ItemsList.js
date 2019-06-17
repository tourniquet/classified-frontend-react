import React from 'react'
import styled from 'styled-components'

// components
import ListItem from '../ListItem/ListItem'

const DivStyled = styled.div`
  flex: 1 0 auto;
`

const ULStyled = styled.ul`
  margin: 0 auto;
  width: 95%;

  @media (min-width: 1200px) {
    font-size: 13px;
    margin: 51px auto 92px;
    width: 1268px;
  }
`

const ItemsList = ({ items }) =>
  <DivStyled>
    <ULStyled>
      {items && items.map(item => <ListItem item={item} />)}
    </ULStyled>
  </DivStyled>

export default ItemsList
