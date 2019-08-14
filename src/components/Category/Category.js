import React from 'react'
import styled from 'styled-components'

const CategoryBlock = styled.div`
  font-size: 13px;
  margin: 0 23px 10px;
  width: 270px;

  > a.category-link {
    align-items: center;
    background: #F6F6F6;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    color: #000;
    display: flex;
    font-weight: 600;
    height: 58px;
    line-height: 58px;
    padding-left: 20px;
    position: relative;
    text-decoration: none;
    
    & i {
      border: solid black;
      border-width: 0 2px 2px 0;
      border-radius: 1px;
      display: none;
      padding: 3px;
      position: absolute;
      right: 20px;
      top: 24px;
    }
  }

  & ul {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border: 2px solid #F6F6F6;
    height: 270px;
    padding: 20px;
    padding-bottom: 0;

    & li.subcategory-list-item {
      padding-bottom: 12px;

      a.subcategory-link {
        color: #515151;
        text-decoration: none;
      }
    }
  }

  @media (max-width: 480px) {
    margin: 0 auto 10px;
    width: 100%;

    & a.category-link {
      background: #FFF;
      border-bottom: 1px solid #F6F6F6;
      border-radius: 0;

      & i {
        display: block;
        transform: rotate(-45deg);
      }
    }

    & ul {
      display: none;
    }
  }
`

const Category = ({ id, subcategories, name }) =>
  <CategoryBlock>
    <a
      className='category-link'
      href={`/category/${name}/1`}
    >
      {name}
      <i />
    </a>

    <ul>
      {subcategories
        .filter(subcategory => subcategory.parent_id === id)
        .map(subcategory => (
          <li
            className='subcategory-list-item'
            key={subcategory.id.toString()}
          >
            <a
              className='subcategory-link'
              href={`/${name}/${subcategory.name}/1`}
            >
              {subcategory.name}
            </a>
          </li>
        ))}
    </ul>
  </CategoryBlock>

export default Category
