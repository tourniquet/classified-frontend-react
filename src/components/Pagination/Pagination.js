import { Link } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'

const UlStyled = styled.ul`
  display: flex;
  margin: 0 auto;

  > li {
    cursor: pointer;
    font-size: 13px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    width: 25px;

    :not(:first-child) {
      border-left: none;
    }

    > a {
      color: #000;
      height: inherit;
      text-decoration: none;
      width: inherit;

      :hover {
        color: #E26433;
      }
    }

    &.prev-button,
    &.next-button {
      padding: 0 15px;
    }

    &.disabled {
      pointer-events: none;
    }

    &.active-page {
      background: #E26433;
      border-radius: 4px;
      color: #FFF;
    }
  }
`

const Pagination = ({ pageNumber, totalItems }) => {
  const pages = Array.from(Array(Math.ceil(totalItems / 10)), (el, i) => ++i)

  const prevButtonDisabled = Number(pageNumber) === 1 ? 'disabled' : ''
  const nextButtonDisabled = Number(pageNumber) >= pages.length ? 'disabled' : ''

  return (
    <UlStyled>
      <li className={`prev-button ${prevButtonDisabled}`}>
        <Link to={{ pathname: `/page/${Number(pageNumber) - 1}` }}>
          Prev
        </Link>
      </li>

      {pages.map(page =>
        Number(pageNumber) === Number(page) ? (
          <li className='active-page'>{page}</li>
        ) : (
          <li>
            <Link
              key={page}
              to={{ pathname: `/page/${page}` }}
            >
              {page}
            </Link>
          </li>
        )
      )}

      <li className={`next-button ${nextButtonDisabled}`}>
        <Link to={{ pathname: `/page/${Number(pageNumber) + 1}` }}>
          Next
        </Link>
      </li>
    </UlStyled>
  )
}

export default Pagination
