import { NavLink, withRouter } from 'react-router-dom'
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
      display: block;
      height: inherit;
      text-decoration: none;
      width: inherit;

      :hover {
        color: #E26433;
      }

      &.active-page {
        background: #E26433;
        border-radius: 4px;
        color: #FFF;
      }
    }

    &.prev-button,
    &.next-button {
      padding: 0 15px;
    }

    &.disabled {
      pointer-events: none;
    }
  }
`

const Pagination = props => {
  const { location, pageNumber, totalItems } = props

  // when user access home page, which usualy doesn't contain any page,
  // location.pathname === /, in that case NavLink doesn't have any active page,
  // so NavLink can't show which page is active at the moment
  if (location.pathname === '/') location.pathname = '/page/1'

  const pages = Array.from(Array(Math.ceil(totalItems / 10)), (el, i) => ++i)

  const prevButtonDisabled = Number(pageNumber) === 1 ? 'disabled' : ''
  const nextButtonDisabled = Number(pageNumber) >= pages.length ? 'disabled' : ''

  return (
    <UlStyled>
      <li className={`prev-button ${prevButtonDisabled}`}>
        <NavLink to={{ pathname: `/page/${Number(pageNumber) - 1}` }}>
          Prev
        </NavLink>
      </li>

      {pages.map(page =>
        <li>
          <NavLink
            key={page}
            to={{ pathname: `/page/${page}` }}
            activeClassName='active-page'
          >
            {page}
          </NavLink>
        </li>
      )}

      <li className={`next-button ${nextButtonDisabled}`}>
        <NavLink to={{ pathname: `/page/${Number(pageNumber) + 1}` }}>
          Next
        </NavLink>
      </li>
    </UlStyled>
  )
}

export default withRouter(Pagination)
