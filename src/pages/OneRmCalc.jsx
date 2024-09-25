import React, { useState } from 'react'

import styled from 'styled-components'

import { PageTitle } from 'components'

import Button from '../components/Button'

const OneRmCalc = () => {
  const [weight, setWeight] = useState('')
  const [reps, setReps] = useState('')
  const [oneRm, setOneRm] = useState(null)

  const calculateOneRm = () => {
    if (weight && reps) {
      const result = weight * (1 + reps / 30)
      setOneRm(result.toFixed(2))
    }
  }

  return (
    <Container>
      <PageTitle size="h2">
        반복 횟수와 무게를 기반으로 수행 가능한 <br /> 1RM을 계산합니다
      </PageTitle>

      <div>
        <Label htmlFor="weight">
          <Input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="반복횟수 (10회 이하)"
          />
        </Label>
      </div>

      <div>
        <Label htmlFor="reps">
          <Input type="number" id="reps" value={reps} onChange={(e) => setReps(e.target.value)} placeholder="무게" />
        </Label>
      </div>

      <Button type="button" onClick={calculateOneRm}>
        +5kg
      </Button>

      <Button type="button" onClick={calculateOneRm}>
        +10kg
      </Button>

      <Button type="button" onClick={calculateOneRm}>
        +50kg
      </Button>

      {oneRm && (
        <Result>
          <h3>계산된 1RM: {oneRm} kg</h3>
        </Result>
      )}
    </Container>
  )
}

// 스타일링
const Container = styled.div``

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%; /* 너비를 100%로 설정하여 반응형으로 */
`

// const Button = styled.button`
//   margin-top: 10px;
//   padding: 10px 15px;
//   background-color: #007bff;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
// `

const Result = styled.div`
  margin-top: 20px;
  font-weight: bold;
`

export default OneRmCalc
