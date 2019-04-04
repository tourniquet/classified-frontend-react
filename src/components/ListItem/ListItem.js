import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import styled from 'styled-components'

// components
import Image from '../Image'

const ListItemStyled = styled.li`
  img.favourite-ad {
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

  .ad-title {
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

    .ad-category,
    .ad-date {
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

    .ad-title {
      width: 852px;
      
      a:link, a:visited, a:active {
        text-decoration: none;
        color: black;
      }
    }

    .ad-category {
      width: 125px;

      a {
        color: #E26433;
        text-decoration: none;
      }
    }

    .ad-date {
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
          className='favourite-ad'
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
          className='ad-title'
        >
          {title}
        </Link>
        <span className='ad-category'>
          <a href={`/${category}/${subcategory}`}>
            {subcategory}
          </a>
        </span>
        <span className='ad-date'>
          {new Date(published).toLocaleDateString('en-GB', dateOptions)}
        </span>
      </ListItemStyled>
    )
  }
}

export default ItemList
