// WeightButton.jsx
import React from 'react'
import styled from 'styled-components'

const WeightButton = ({ setWeight }) => {
  return (
    <ButtonRow>
      <Button onClick={() => setWeight((prev) => +prev + 5)}>+5kg</Button>
      <Button onClick={() => setWeight((prev) => +prev + 10)}>+10kg</Button>
      <Button onClick={() => setWeight((prev) => +prev + 50)}>+50kg</Button>
    </ButtonRow>
  )
}

export default WeightButton

/**
 * 무게추가 버튼 컴포넌트
 */
const ButtonRow = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
`

const Button = styled.button`
  padding: 0.4em 0.8em;
  background-color: ${({ theme }) => theme.colors.mainBlue};
  color: white;
  font-size: ${({ theme, size }) => theme.fontSize[size]};
  border: none;
  text-align: center;
  border-radius: ${({ height }) => (height === 'footer' ? '3px 5px 0 0' : '5px')};
  cursor: pointer;
`
