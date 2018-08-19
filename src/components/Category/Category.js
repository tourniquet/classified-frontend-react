import React from 'react'

// styles
import './Category.scss'

export const Category = () =>
  <div className='category-block'>
    <div className='category-block-header'>
      Category name
    </div>

    <ul className='category-block-categories'>
      <li className='category-block-item'>Apartamente</li>
      <li className='category-block-item'>Case şi vile</li>
      <li className='category-block-item'>Terenuri</li>
      <li className='category-block-item'>Imobil comercial</li>
      <li className='category-block-item'>Garajuri</li>
    </ul>
  </div>
