import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledInput = styled.input`
  display: block;
  background: #FFF;
  border: 2px solid #F6F6F6;
  border-radius: 8px;
  height: 58px;
  width: 100%;
  padding-left: 15px;
  margin-bottom: 18px;
  font-size: 14px;
  letter-spacing: 0.08em;
  text-align: left;
  box-sizing: border-box;
`

const Input = props =>
  <StyledInput
    className={`input ${props.className}`}
    id={props.id}
    name={props.name}
    placeholder={props.placeholder}
    inputmode={props.inputmode}
    type={props.type || 'text'}
    accept={props.accept}
    value={props.value}
    aria-label={props['aria-label']}
    pattern={props.pattern}
    required={props.required}
    onChange={props.onChange}
    onKeyDown={props.onKeyDown}
  />

Input.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  inputmode: PropTypes.string,
  type: PropTypes.string,
  accept: PropTypes.string,
  value: PropTypes.string,
  'aria-label': PropTypes.string,
  pattern: PropTypes.string,
  required: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func
}

export default Input
