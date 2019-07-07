import React from 'react'
import styled from 'styled-components'

const RootDiv = styled.div`
  color: #E26433;
  font-size: small;
  font-weight: 600;
  line-height: 1.65em;

  a:link, a:visited, a:active, a:hover {
    color: #E26433;
    text-decoration: none;
  }

  .slash {
    color: #9D9D9D;
    padding: 0 12px;
  }

  .breadcrumb-ad-title {
    color: #000;
  }

  @media (min-width: 1200px) {
    margin-bottom: 33px;
  }
`

const Breadcrumbs = ({ category, subcategory, title }) =>
  <RootDiv>
    <span><a href='/home/page/1'>Home </a></span>
    <span className='slash'>/ </span>
    <span><a href={`/category/${category}/1`}>{category} </a></span>
    <span className='slash'>/ </span>
    <span><a href={`/${category}/${subcategory}/1`}>{subcategory}</a></span>
    <span className='slash'>/ </span>
    <span className='breadcrumb-ad-title'>{title}</span>
  </RootDiv>

export default Breadcrumbs
