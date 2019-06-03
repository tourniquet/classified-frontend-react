import styled from 'styled-components'

import Button from '../Button'

const CloseButton = styled(Button)`
  background: url(/img/remove.png);
  border: none;
  height: 20px;
  position: absolute;
  right: -10px;
  top: -10px;
  width: 20px;
`

export default CloseButton
