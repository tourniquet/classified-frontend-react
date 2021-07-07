import { Helmet } from 'react-helmet'
import React from 'react'

import { siteName } from '../../config'

const BrowserMeta = ({ title }) =>
  <Helmet>
    <title>{title} | {siteName}</title>
  </Helmet>

export default BrowserMeta
