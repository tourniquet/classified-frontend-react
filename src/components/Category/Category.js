import React from 'react'
import styled from 'styled-components'

const CategoryBlock = styled.div`
  font-size: 13px;
  width: 270px;

  > a {
    align-items: center;
    background: #F6F6F6;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    display: flex;
    font-weight: 600;
    height: 58px;
    line-height: 58px;
    padding-left: 20px;
    position: relative;
    
    > img {
      display: none;
    }
  }

  > ul {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border: 2px solid #F6F6F6;
    height: 270px;
    padding: 20px;
    padding-bottom: 0;

    > li {
      padding-bottom: 12px;
    }
  }

  @media (max-width: 480px) {
    margin: 0 auto 10px;
    width: 100%;

    > a {
      background: #FFF;
      border-bottom: 1px solid #F6F6F6;
      border-radius: 0;

      > img {
        display: inline-block;
        position: absolute;
        right: 20px;
      }
    }

    > ul {
      display: none;
    }
  }
`

const Category = () =>
  <CategoryBlock>
    <a>
      Category name
      <img src='/img/arrow.png' />
    </a>

    <ul>
      <li className='category-block-item'>Apartamente</li>
      <li className='category-block-item'>Case şi vile</li>
      <li className='category-block-item'>Terenuri</li>
      <li className='category-block-item'>Imobil comercial</li>
      <li className='category-block-item'>Garajuri</li>
    </ul>
  </CategoryBlock>

export default Category
