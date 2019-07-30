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
  padding: 40px 0;
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
    padding: 0;
  }
`

const Copyright = styled.div`
  align-items: center;
  color: white;
  display: flex;
  font-size: 12px;
  letter-spacing: .02em;
  margin-bottom: 30px;
  text-align: center;
  
  ${A}.github {
    background: url('/img/github.png') no-repeat;
    background-position-x: 1.2px;
    background-position-y: 1.1px;
    border: none;
  }

  .script-name {
    margin: 4px 0 0 10px;

    .link {
      color: #FFF;
    }
  }

  @media (max-width: 767px) {
    padding: 0 10px 0;

    ${A}.github {
      min-width: 33px;
    }
  }

  @media (min-width: 1200px) {
    margin-bottom: 0;
  }
`

const Footer = () =>
  <FooterContainer>
    <Copyright>
      <A className='github' href='https://github.com/tourniquet/classified-frontend-react' target='_blank' />
      <p className='script-name'>© This website is powered by the classifieds script software&nbsp;
        <a
          className='link'
          href='https://github.com/tourniquet/classified-backend-php'
          target='_blank'
        >
          MinClass
        </a>
      </p>
    </Copyright>

    <nav className='social'>
      <A className='fb' href={socials.facebook} />
      <A className='ok' href={socials.ok} />
      <A className='skype' href={`skype:${socials.skype}?chat`} />
    </nav>
  </FooterContainer>

export default Footer
