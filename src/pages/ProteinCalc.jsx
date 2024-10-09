import React, { useState } from 'react'
import styled from 'styled-components'

const ProteinCalc = () => {
  const [weight, setWeight] = useState('')
  const [proteinIntake, setProteinIntake] = useState(0)
  const [selectedGoal, setSelectedGoal] = useState('muscle_gain')
  const [gender, setGender] = useState('male')

  const calculateProteinIntake = () => {
    let intakeFactor

    // Define protein intake factor based on the selected goal
    if (selectedGoal === 'muscle_gain') {
      intakeFactor = gender === 'male' ? 2.0 : 1.8
    } else if (selectedGoal === 'diet') {
      intakeFactor = gender === 'male' ? 1.5 : 1.3
    } else if (selectedGoal === 'weight_maintenance') {
      intakeFactor = gender === 'male' ? 1.2 : 1.0
    }

    // Calculate the daily protein intake
    const result = weight ? (parseFloat(weight) * intakeFactor).toFixed(2) : 0
    setProteinIntake(result)
  }

  return (
    <Container>
      <Title>목적에 따른 일일 단백질 섭취량을 계산합니다</Title>
      <ResultTitle>일일 필요 섭취량: {proteinIntake}g</ResultTitle>

      <SectionTitle>섭취목적</SectionTitle>
      <ButtonGroup>
        <label htmlFor="muscle_gain">
          <RadioButton
            type="radio"
            id="muscle_gain"
            name="goal"
            value="muscle_gain"
            checked={selectedGoal === 'muscle_gain'}
            onChange={() => setSelectedGoal('muscle_gain')}
          />
          근성장
        </label>

        <label htmlFor="diet">
          <RadioButton
            type="radio"
            id="diet"
            name="goal"
            value="diet"
            checked={selectedGoal === 'diet'}
            onChange={() => setSelectedGoal('diet')}
          />
          다이어트
        </label>

        <label htmlFor="weight_maintenance">
          <RadioButton
            type="radio"
            id="weight_maintenance"
            name="goal"
            value="weight_maintenance"
            checked={selectedGoal === 'weight_maintenance'}
            onChange={() => setSelectedGoal('weight_maintenance')}
          />
          체중유지
        </label>
      </ButtonGroup>

      <SectionTitle>성별</SectionTitle>
      <ButtonGroup>
        <label htmlFor="male">
          <RadioButton
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={gender === 'male'}
            onChange={() => setGender('male')}
          />
          남
        </label>

        <label htmlFor="female">
          <RadioButton
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={gender === 'female'}
            onChange={() => setGender('female')}
          />
          여
        </label>
      </ButtonGroup>

      <InputWrapper>
        <label htmlFor="weight">몸무게</label>
        <Input
          type="number"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="몸무게 (kg)"
        />
      </InputWrapper>

      <ButtonRow>
        <Button onClick={() => setWeight((prev) => (parseFloat(prev) + 5).toString())}>+5kg</Button>
        <Button onClick={() => setWeight((prev) => (parseFloat(prev) + 10).toString())}>+10kg</Button>
        <Button onClick={() => setWeight((prev) => (parseFloat(prev) + 50).toString())}>+50kg</Button>
      </ButtonRow>
    </Container>
  )
}

// Styled components
const Container = styled.div`
  padding: 20px;
  text-align: center;
`

const Title = styled.h1`
  font-size: 20px;
  margin-bottom: 20px;
`

const ResultTitle = styled.h2`
  font-size: 24px;
  color: #007bff;
  margin-bottom: 20px;
`

const SectionTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
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

export default ProteinCalc
