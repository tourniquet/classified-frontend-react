import React from 'react'
import styled from 'styled-components'

import { socials } from '../../config'

const A = styled.a`
  display: inline-block;
  background-repeat: no-repeat;
  background-size: 20px 20px;
  background-position: 6px 6px;
  border: 1px solid #3C3C3C;
  border-radius: 22px;
  height: 33px;
  width: 33px;
`

const FooterContainer = styled.footer`
  background: #262626;
  height: 117px;
  margin-top: 40px;
  padding-top: 40px;
  width: 100%;

  & .social {
    text-align: center;

    ${A}.fb {
      background-image: url('/img/fb.png');        
    }

    ${A}.ok {
      background-image: url('/img/ok.png');
      margin: 0 22px;
    }

    ${A}.skype {
      background-image: url('/img/skype.png');
    }
  }

  @media (min-width: 1200px) {
    align-items: center;
    display: flex;
    justify-content: space-around;
    height: 130px;
    padding-top: 0;
  }
`

const Copyright = styled.div`
  color: white;
  margin-bottom: 30px;
  font-size: 12px;
  letter-spacing: .02em;
  text-align: center;

  @media (min-width: 1200px) {
    margin-bottom: 0;
  }
`

const Footer = () =>
  <FooterContainer>
    <Copyright>
      © {/* This website is proudly using the classifieds scripts software SCRIPT_NAME */}
    </Copyright>

    <nav className='social'>
      <A className='fb' href={socials.facebook} />
      <A className='ok' href={socials.ok} />
      <A className='skype' href={`skype:${socials.skype}?chat`} />
    </nav>
  </FooterContainer>

export default Footer
