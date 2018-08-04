import React from 'react'

// styles
import './Footer.scss'

export const Footer = () =>
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
