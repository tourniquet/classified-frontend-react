import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledTextarea = styled.textarea`
  display: block;
  border: 2px solid #F6F6F6;
  border-radius: 8px;
  box-sizing: border-box;
  height: 190px;
  width: 100%;
  margin-bottom: 26px;
  resize: none;
`

const Textarea = props =>
  <StyledTextarea
    className={props.className}
    name={props.name}
    placeholder={props.placeholder}
    value={props.value}
    required={props.required}
    onChange={props.onChange}
  />

Textarea.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default Textarea
