import React, { useState } from 'react'
import styled from 'styled-components'
import { PageTitle } from 'components'
import WeightButton from 'components/WeightButton'
import RadioButton from 'components/RadioButton'
import InputBox from 'components/InputBox'
import { useRecoilState } from 'recoil'
import { proteinPurpose, proteinGender, proteinWeight, proteinResult } from 'atoms/proteinAtom'

const ProteinCalc = () => {
  const [selectedGoal, setSelectedGoal] = useRecoilState(proteinPurpose)
  const [gender, setGender] = useRecoilState(proteinGender)
  const [weight, setWeight] = useRecoilState(proteinWeight)
  const [proteinIntake, setProteinIntake] = useRecoilState(proteinResult)

  const handleWeightChange = (e) => {
    const { value } = e.target
    const numeberValue = +value

    if (value === '') {
      setWeight('')
      return
    }

    if (Number.isNaN(numeberValue)) {
      alert('숫자만 입력가능 합니다')
      return
    }

    setWeight(value)
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

      <InputBox type="number" id="weight" value={weight} onChange={handleWeightChange} placeholder="몸무게" />

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
