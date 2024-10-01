import React, { useState } from 'react'
import styled from 'styled-components'
import { PageTitle } from 'components' // Assuming this is part of your component library

const OneRmCalc = () => {
  const [weight, setWeight] = useState('')
  const [reps, setReps] = useState('')
  const [oneRm, setOneRm] = useState({ deadlift: 0, squat: 0, benchpress: 0 })
  const [selectedExercise, setSelectedExercise] = useState('deadlift')

  const calculateOneRm = () => {
    if (weight && reps) {
      const result = (parseFloat(weight) * (1 + parseFloat(reps) / 30)).toFixed(2)
      setOneRm({
        ...oneRm,
        [selectedExercise]: result,
      })
    }
  }

  return (
    <Container>
      <PageTitle size="h2">
        반복 횟수와 무게를 기반으로 수행 가능한 <br /> 1RM을 계산합니다
      </PageTitle>

      <ButtonGroup>
        <label htmlFor="deadlift">
          <RadioButton
            type="radio"
            id="deadlift"
            name="exercise"
            value="deadlift"
            checked={selectedExercise === 'deadlift'}
            onChange={() => setSelectedExercise('deadlift')}
          />
          데드리프트
        </label>

        <label htmlFor="benchpress">
          <RadioButton
            type="radio"
            id="benchpress"
            name="exercise"
            value="benchpress"
            checked={selectedExercise === 'benchpress'}
            onChange={() => setSelectedExercise('benchpress')}
          />
          벤치프레스
        </label>

        <label htmlFor="squat">
          <RadioButton
            type="radio"
            id="squat"
            name="exercise"
            value="squat"
            checked={selectedExercise === 'squat'}
            onChange={() => setSelectedExercise('squat')}
          />
          스쿼트
        </label>
      </ButtonGroup>

      <Title>수행가능 1RM: {oneRm[selectedExercise]}kg</Title>

      <InputWrapper>
        <label htmlFor="reps">반복횟수 (10회 이하)</label>
        <Input
          type="number"
          id="reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          placeholder="반복횟수 (10회 이하)"
        />
      </InputWrapper>

      <InputWrapper>
        <label htmlFor="weight">무게</label>
        <Input
          type="number"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="무게"
        />
      </InputWrapper>

      <ButtonRow>
        <Button onClick={() => setWeight((prev) => (parseFloat(prev) + 5).toString())}>+5kg</Button>
        <Button onClick={() => setWeight((prev) => (parseFloat(prev) + 10).toString())}>+10kg</Button>
        <Button onClick={() => setWeight((prev) => (parseFloat(prev) + 50).toString())}>+50kg</Button>
      </ButtonRow>

      <Results>
        <Result>데드리프트 1RM: {oneRm.deadlift}kg</Result>
        <Result>스쿼트 1RM: {oneRm.squat}kg</Result>
        <Result>벤치프레스 1RM: {oneRm.benchpress}kg</Result>
      </Results>
    </Container>
  )
}

// Styled components
const Container = styled.div`
  padding: 20px;
  text-align: center;
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  label {
    margin: 0 10px;
    font-weight: bold;
    color: #444;
  }
`

const RadioButton = styled.input`
  margin-right: 5px;
`

const Title = styled.h3`
  color: #007bff;
  font-weight: bold;
  margin-bottom: 20px;
`

const InputWrapper = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
  }
`

const Input = styled.input`
  padding: 10px;
  width: calc(100% - 20px);
  border: 1px solid #ccc;
  border-radius: 5px;
`

const ButtonRow = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
  gap: 10px;
`

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`

const CalcButton = styled(Button)`
  background-color: #007bff;
`

const ResetButton = styled(Button)`
  background-color: #f0f0f0;
  color: #444;
`

const Results = styled.div`
  margin-top: 20px;
`

const Result = styled.div`
  font-size: 18px;
  margin-top: 10px;
`

export default OneRmCalc
