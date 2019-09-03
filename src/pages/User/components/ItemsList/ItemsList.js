import { Link } from 'react-router-dom'
import {
  faEdit,
  faEyeSlash,
  faSyncAlt,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import styled from 'styled-components'

// components
import Image from '../../../../components/Image/Image'

const ItemListContainer = styled.div`
  flex: 1 0 auto;

  > ul {
    margin: 0 auto;
    width: 95%;

    > li {
      &:hover {
        background: #F6F6F6;
        transition: .5s background;
      }

      img.icon-camera {
        height: 16px;
        margin-left: 15px;
        vertical-align: middle;
        width: 16px;
      }

      span.no-thumbnail {
        display: inline-block;
        height: 16px;
        padding-left: 15px;
        vertical-align: middle;
        width: 16px;
      }

      .item-tile {
        color: #000;
        display: inline-block;
        margin-left: 15px;
        text-decoration: none;
      }

      ul.action-buttons {
        color: #BFBFBF;
        display: inline-block;
        width: 200px;

        li {
          display: inline-block;

          &:hover {
            color: #000;
            cursor: pointer;
          }

          &:not(:last-child) {
            margin-right: 15px;
          }

          &:last-child {
            color: #FFBFBF;
          }

          &:last-child:hover {
            color: #F00;
          }
        }
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
        padding-left: 16px;

        &:not(:first-child) {
          border-top: 2px solid #F6F6F6;
        }

        span {
          display: inline-block;
        }

        .icon-camera {
          cursor: pointer;
        }

        .thumbnail-image {
          display: none;
        }

        .display-thumbnail {
          display: block;
          position: absolute;
          z-index: 2;
        }

        .item-tile {
          width: 652px; 
          
          a:link, a:visited, a:active {
            text-decoration: none;
            color: black;
          }
        }

        a.item-category {
          color: #E26433;
          display: inline-block;
          text-decoration: none;
          width: 125px;
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

class ItemList extends Component {
  showThumbnail = el => {
    const parent = Array.from(el.target.parentNode.childNodes)

    const thumbnail = parent.filter(el => el.className === 'thumbnail-image')[0]
    thumbnail.classList.add('display-thumbnail')
    thumbnail.style.top = `${el.pageY}px`
    thumbnail.style.left = `${el.pageX}px`
  }

  hideThumbnail = () => {
    const thumbnails = Array.from(document.getElementsByClassName('display-thumbnail'))
    thumbnails.forEach(el => el.classList.remove('display-thumbnail'))
  }

  render () {
    const { items } = this.props

    return (
      <ItemListContainer>
        <ul>
          {items && items.map(item => (
            <li key={item.id.toString()}>
              { item.images ? (
                <>
                  <Image
                    className='icon-camera'
                    src='/img/camera.png'
                    title=''
                    alt=''
                    onMouseOver={el => this.showThumbnail(el)}
                    onMouseOut={this.hideThumbnail}
                  />

                  <Image
                    className='thumbnail-image'
                    src={`/api/uploads/thumb_${item.images}`}
                    title='Particular listing thumbnail'
                    alt=''
                  />
                </>
              ) : (
                <span className='no-thumbnail' />
              )}

              <Link
                key={item.id}
                to={{ pathname: `/item/${item.url}` }}
                className='item-tile'
              >
                {item.title}
              </Link>

              <ul className='action-buttons'>
                <li>
                  <FontAwesomeIcon icon={faEdit} />
                </li>
                <li>
                  <FontAwesomeIcon icon={faSyncAlt} />
                </li>
                <li>
                  <FontAwesomeIcon icon={faEyeSlash} />
                </li>
                <li>
                  <FontAwesomeIcon icon={faTimesCircle} />
                </li>
              </ul>

              <a
                className='item-category'
                href={`/${item.category}/${item.subcategory}/1`}
              >
                {item.subcategory}
              </a>

              <span className='item-date'>
                {new Date(item.published).toLocaleDateString('en-GB', dateOptions)}
              </span>
            </li>
          ))}
        </ul>
      </ItemListContainer>
    )
  }
}

export default ItemList
