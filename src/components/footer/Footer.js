import React from 'react'

import { socials } from '../../config'

// styles
import './Footer.scss'

export const Footer = () =>
  <footer>
    <div className='footer-container'>
      <div className='copyright'>
        © {/* This website is proudly using the classifieds scripts software SCRIPT_NAME */}
      </div>

      <nav className='social'>
        <a className='fb' href={socials.facebook} />
        <a className='ok' href={socials.ok} />
        <a className='skype' href={`skype:${socials.skype}?chat`} />
      </nav>
    </div>
  </footer>
