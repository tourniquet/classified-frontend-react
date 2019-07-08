import { Link } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'

// components
import Image from '../Image/Image'

const ItemListContainer = styled.div`
  flex: 1 0 auto;

  > ul {
    margin: 0 auto;
    width: 95%;
  
    > li {
      img.favourite-item {
        height: 16px;
        padding-left: 15px;
        position: relative;
        vertical-align: middle;
        width: 16px;
      }
    
      img.thumbnail {
        height: 16px;
        padding-left: 15px;
        vertical-align: middle;
        width: 16px;
      }
    
      .item-tile {
        color: #000;
        display: inline-block;
        padding-left: 15px;
        text-decoration: none;
      }
    }
  
    @media (max-width: 480px) {
      > li {
        background: #FFF;
        box-sizing: border-box;
        border: 0;
        border-bottom: 1px solid #F5F5F5;
        clear: both;
        display: list-item;
        height: 33px;
        line-height: 32px;
        margin: 0;
        position: relative;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        transition: .5s background;

        &:last-child {
          border-bottom: unset;
        }
    
        .item-category,
        .item-date {
          display: none;
        }
      }
    }
  
    @media (min-width: 1200px) {
      font-size: 13px;
      margin: 51px auto 92px;
      width: 1268px;
  
      > li {
        height: 50px;
        line-height: 50px;
        padding-left: 32px;
        
        &:not(:first-child) {
          border-top: 2px solid #F6F6F6;
        }
        
        span {
          display: inline-block;
        }
    
        .star {
          width: 32px;
        }
    
        .image {
          width: 30px;
        }
    
        .item-tile {
          width: 852px;
          
          a:link, a:visited, a:active {
            text-decoration: none;
            color: black;
          }
        }
    
        .item-category {
          width: 125px;
    
          a {
            color: #E26433;
            text-decoration: none;
          }
        }
    
        .item-date {
          width: 155px;
          text-align: right;
        }
      }
    }
  }
`

const dateOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
}

const ItemList = ({ items }) =>
  <ItemListContainer>
    <ul>
      {items && items.map(item => (
        <li key={item.id.toString()}>
          <Image
            className='favourite-item'
            src='/img/star.png'
            title=''
            alt=''
          />

          <Image
            className='thumbnail'
            src='/img/camera.png'
            title=''
            alt='Particular lists thumbnail'
          />

          <Link
            key={item.id}
            to={{ pathname: `/item/${item.url}` }}
            className='item-tile'
          >
            {item.title}
          </Link>

          <span className='item-category'>
            <a href={`/${item.category}/${item.subcategory}/1`}>
              {item.subcategory}
            </a>
          </span>

          <span className='item-date'>
            {new Date(item.published).toLocaleDateString('en-GB', dateOptions)}
          </span>
        </li>
      ))}
    </ul>
  </ItemListContainer>

export default ItemList
