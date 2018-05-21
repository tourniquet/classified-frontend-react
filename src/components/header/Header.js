import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {}
}

const Header = props => {
  return (
    <h1>Header</h1>
  )
}

export default connect(mapStateToProps)(Header)
