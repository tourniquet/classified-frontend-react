import React from 'react'
import { connect } from 'react-redux'

// styles
import './Footer.scss'

const mapStateToProps = state => {
  return {}
}

const Footer = props => {
  return (
    <footer>
      <div className='copyright'>
        © {/* This website is proudly using the classifieds scripts software SCRIPT_NAME */}
      </div>

      <nav className='social'>
        <a className='fb' href='FB_LINK' />
        <a className='ok' href='OK_LINK' />
        <a className='skype' href='skype:SKYPE' />
      </nav>
    </footer>
  )
}

export default connect(mapStateToProps)(Footer)
