import React from 'react'
import styled from 'styled-components'

const RadioButton = ({ label, name, value, checked, onChange, id }) => {
  return (
    <RadioLabel checked={checked}>
      <RadioInput type="radio" name={name} value={value} checked={checked} onChange={onChange} id={id} />
      <CustomRadio />
      {label}
    </RadioLabel>
  )
}

export default RadioButton

const RadioLabel = styled.label`
  display: flex; /
  align-items: center; 
  cursor: pointer;
  margin-right: 10px; 
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.medium};
   font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme, checked }) => (checked ? theme?.colors?.mainBlue || '#007bff' : theme?.colors?.typoBlack || '#000')};
`

const RadioInput = styled.input`
  display: none;
`

const CustomRadio = styled.span`
  width: 25px;
  height: 25px;
  border: 2px solid ${({ theme }) => theme.colors.borderGray || '#ccc'};
  border-radius: 50%;
  margin-right: 6px;
  position: relative;

  ${RadioLabel} input:checked + & {
    border-color: ${({ theme }) => theme.colors.mainBlue || '#007bff'};
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 50%;
      height: 50%;
      background-color: ${({ theme }) => theme.colors.mainBlue || '#007bff'};
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }
  }
`
