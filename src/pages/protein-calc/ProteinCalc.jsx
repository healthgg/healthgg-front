import React, { useState } from 'react'
import styled from 'styled-components'
import { PageTitle } from 'components'
import WeightButton from 'components/WeightButton'
import RadioButton from 'components/RadioButton'
import InputBox from 'components/InputBox'

const ProteinCalc = () => {
  const [weight, setWeight] = useState('')
  const [proteinIntake, setProteinIntake] = useState(0)
  const [selectedGoal, setSelectedGoal] = useState('muscle_gain')
  const [gender, setGender] = useState('male')

  const calculateProteinIntake = () => {
    let intakeFactor
    if (selectedGoal === 'muscle_gain') {
      intakeFactor = gender === 'male' ? 2.0 : 1.8
    } else if (selectedGoal === 'diet') {
      intakeFactor = gender === 'male' ? 1.5 : 1.3
    } else if (selectedGoal === 'weight_maintenance') {
      intakeFactor = gender === 'male' ? 1.2 : 1.0
    }

    const result = weight ? (parseFloat(weight) * intakeFactor).toFixed(2) : 0
    setProteinIntake(result)
  }

  return (
    <Container>
      <PageTitle size="h2">
        목적에 따른 일일 단백질 섭취량을 <br /> 계산합니다
      </PageTitle>
      <ProteinTitle>일일 필요 섭취량: {proteinIntake}g</ProteinTitle>

      <SectionTitle>섭취목적</SectionTitle>
      <RadioWrapper>
        <RadioButton
          type="radio"
          id="muscle_gain"
          name="goal"
          value="muscle_gain"
          checked={selectedGoal === 'muscle_gain'}
          onChange={() => setSelectedGoal('muscle_gain')}
          label="근성장"
        />

        <RadioButton
          type="radio"
          id="diet"
          name="goal"
          value="diet"
          checked={selectedGoal === 'diet'}
          onChange={() => setSelectedGoal('diet')}
          label="다이어트"
        />

        <RadioButton
          type="radio"
          id="weight_maintenance"
          name="goal"
          value="weight_maintenance"
          checked={selectedGoal === 'weight_maintenance'}
          onChange={() => setSelectedGoal('weight_maintenance')}
          label="체중유지"
        />
      </RadioWrapper>

      <SectionTitle style={{ marginTop: '30px' }}>성별</SectionTitle>
      <RadioWrapper>
        <RadioButton
          type="radio"
          id="male"
          name="gender"
          value="male"
          checked={gender === 'male'}
          onChange={() => setGender('male')}
          label="남"
        />
        <RadioButton
          type="radio"
          id="female"
          name="gender"
          value="female"
          checked={gender === 'female'}
          onChange={() => setGender('female')}
          label="여"
        />
      </RadioWrapper>

      <InputBox
        type="number"
        id="weight"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        placeholder="몸무게"
      />

      <WeightButton setWeight={setWeight} />
    </Container>
  )
}

const Container = styled.div`
  text-align: center;
`
// 프로틴 섭취량 계산값
const ProteinTitle = styled.div`
  margin-top: 40px;
  margin-bottom: 40px;
  font-size: ${({ theme }) => theme.fontSize.subTitle};
  font-weight: ${({ theme }) => theme.fontWeight.title};
  color: ${({ theme }) => theme.colors.mainBlue};
`

const SectionTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  text-align: left;
`

const RadioWrapper = styled.div`
  display: flex;
  margin-top: 8px;
`

export default ProteinCalc
