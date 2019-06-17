import React from 'react'

// components
import ListItem from '../ListItem/ListItem'

const ItemsList = ({ items }) =>
  <div className='items-list'>
    <ul className='latest-ads'>
      {items && items.map(item => <ListItem item={item} />)}
    </ul>
  </div>

export default ItemsList
