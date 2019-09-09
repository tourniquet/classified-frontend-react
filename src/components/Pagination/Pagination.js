import { NavLink, withRouter } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'

const UlStyled = styled.ul`
  display: flex;
  margin: 40px auto 0;

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

const range = (from, to) => Array(to - from + 1).fill().map((_, i) => from + i)

const pagination = (totalPages, currentPage = 1, totalBlocks = 5) => {
  const pageNeighbours = 1

  if (totalPages > totalBlocks) {
    const start = Math.max(2, currentPage - pageNeighbours)
    const end = Math.min(totalPages, currentPage + pageNeighbours)

    const pages = range(start, end)

    if (currentPage === 1) return [...range(1, 3), totalPages]
    if (currentPage > 1) pages.unshift(1)
    if (end < totalPages) pages.push(totalPages)

    return pages
  }

  return range(1, totalPages)
}

const Pagination = props => {
  const { location, pageNumber, totalItems } = props

  // when user access home page, which usualy doesn't contain any page,
  // location.pathname === /, in that case NavLink doesn't have any active page,
  // so NavLink can't show which page is active at the moment
  if (location.pathname === '/') location.pathname = '/home/page/1'

  const totalPages = Math.ceil(totalItems / 10)
  const pages = pagination(totalPages, parseInt(pageNumber))

  const prevButtonDisabled = Number(pageNumber) === 1 ? 'disabled' : ''
  const nextButtonDisabled = Number(pageNumber) === totalPages ? 'disabled' : ''

  // I'm using .filter(Boolean) because first result is an empty string
  const [pathFirstPart, pathSecondPart] = location.pathname.split('/').filter(Boolean)

  return (
    <UlStyled>
      <li className={`prev-button ${prevButtonDisabled}`}>
        <NavLink to={{ pathname: `/${pathFirstPart}/${pathSecondPart}/${Number(pageNumber) - 1}` }}>
          Prev
        </NavLink>
      </li>

      {pages.map(page =>
        <li>
          <NavLink
            key={page}
            to={{ pathname: `/${pathFirstPart}/${pathSecondPart}/${page}` }}
            activeClassName='active-page'
          >
            {page}
          </NavLink>
        </li>
      )}

      <li className={`next-button ${nextButtonDisabled}`}>
        <NavLink to={{ pathname: `/${pathFirstPart}/${pathSecondPart}/${Number(pageNumber) + 1}` }}>
          Next
        </NavLink>
      </li>
    </UlStyled>
  )
}

export default withRouter(Pagination)
