import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import styled from 'styled-components'

// components
import Image from '../Image/Image'

const ListItemStyled = styled.li`
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

  @media (max-width: 480px) {
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

    .item-category,
    .item-date {
      display: none;
    }
  }

  @media (min-width: 1200px) {
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
`

const dateOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
}

class ItemList extends Component {
  render () {
    const { category, id, published, title, subcategory, url } = this.props.item

    return (
      <ListItemStyled key={id.toString()}>
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
          key={id}
          to={{pathname: `/item/${url}`}}
          className='item-tile'
        >
          {title}
        </Link>
        <span className='item-category'>
          <a href={`/${category}/${subcategory}`}>
            {subcategory}
          </a>
        </span>
        <span className='item-date'>
          {new Date(published).toLocaleDateString('en-GB', dateOptions)}
        </span>
      </ListItemStyled>
    )
  }
}

export default ItemList
