import React from 'react'
import styled from 'styled-components'

// styles
import './Category.scss'

const CategoryBlock = styled.div`
  font-size: 13px;
  width: 270px;

  @media (max-width: 480px) {
    margin: 0 auto;
    margin-bottom: 10px;
  }
`

const CategoryBlockHeader = styled.div`
  background: #F6F6F6;
  font-weight: 600;
  height: 58px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  line-height: 58px;
  padding-left: 20px;

  @media (max-width: 480px) {
    border-radius: 5px;
  }
`

const CategoryList = styled.ul`
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 2px solid #F6F6F6;
  height: 270px;
  padding: 20px;
  padding-bottom: 0;

  @media (max-width: 480px) {
    display: none;
  }
`

export const Category = () =>
  <CategoryBlock>
    <CategoryBlockHeader>
      Category name
    </CategoryBlockHeader>

    <CategoryList>
      <li className='category-block-item'>Apartamente</li>
      <li className='category-block-item'>Case şi vile</li>
      <li className='category-block-item'>Terenuri</li>
      <li className='category-block-item'>Imobil comercial</li>
      <li className='category-block-item'>Garajuri</li>
    </CategoryList>
  </CategoryBlock>
