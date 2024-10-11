import React, { useState } from 'react'
import styled from 'styled-components'
import InputBox from 'components/InputBox'
import { PageTitle } from 'components'
import RadioButton from 'components/RadioButton'
import WeightButton from 'components/WeightButton'
import { useRecoilState, useRecoilValue } from 'recoil'
import { onermWeightState, onermRepsState, onermExerciseState, onermValueState } from 'atoms/exerciseAtom'

const OnermCalc = () => {
  const [weight, setWeight] = useRecoilState(onermWeightState)
  const [reps, setReps] = useRecoilState(onermRepsState)
  const [oneRm, setOneRm] = useRecoilState(onermValueState)
  const [selectedExercise, setSelectedExercise] = useRecoilState(onermExerciseState)

  const exercises = [
    { name: '데드리프트', value: oneRm.deadlift },
    { name: '스쿼트', value: oneRm.squat },
    { name: '벤치프레스', value: oneRm.benchpress },
  ]

  const totalOneRM = Object.values(oneRm).reduce((a, c) => Number(a) + Number(c), 0)
  // 반복 횟수 처리
  const handleRepsChange = (e) => {
    const { value } = e.target
    const numeberValue = +value

    if (Number.isNaN(numeberValue)) {
      alert('숫자만 입력가능 합니다')
      return
    }

    if (value === '') {
      // 백스페이스
      setReps('')
      return
    }

    if (numeberValue > 10) {
      alert('횟수는 10이하여야 합니다')
      return
    }

    if (numeberValue <= 10) {
      setReps(value)
    }
  }

  const handleWeightChange = (e) => {
    const { value } = e.target
    const numeberValue = +value

    if (value === '') {
      setWeight('')
    }
    if (numeberValue > 1000) {
      alert('당신은 로니콜먼이 아닙니다')
      return
    }
    setWeight(value)
  }

  return (
    <Container>
      <PageTitle size="h2">
        반복 횟수와 무게를 기반으로 수행 가능한 <br /> 1RM을 계산합니다
      </PageTitle>

      <OnermTitle> {`3대운동 합계: ${totalOneRM}kg`}</OnermTitle>

      <RadioWrapper>
        <RadioButton
          id="deadlift"
          name="exercise"
          value="deadlift"
          checked={selectedExercise === 'deadlift'}
          onChange={() => setSelectedExercise('deadlift')}
          label="데드리프트"
        />
        <RadioButton
          id="squat"
          name="exercise"
          value="squat"
          checked={selectedExercise === 'squat'}
          onChange={() => setSelectedExercise('squat')}
          label="스쿼트"
        />
        <RadioButton
          id="benchpress"
          name="exercise"
          value="benchpress"
          checked={selectedExercise === 'benchpress'}
          onChange={() => setSelectedExercise('benchpress')}
          label="벤치프레스"
        />
      </RadioWrapper>
      <InputBox type="number" id="reps" value={reps} onChange={handleRepsChange} placeholder="반복횟수 (10회 이하)" />
      <InputBox type="number" id="weight" value={weight} onChange={handleWeightChange} placeholder="무게" />
      <WeightButton setWeight={setWeight} />
      <Table>
        <thead>
          <TableRow>
            <TableHeader>종목</TableHeader>
            <TableHeader>1RM</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {exercises.map((exercise, index) => (
            <TableRow key={index}>
              <TableCell>{exercise.name}</TableCell>
              <TableCell style={{ color: '#6385ff' }}>{exercise.value}kg</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

const Container = styled.div`
  text-align: center;
`

const OnermTitle = styled.div`
  margin-top: 40px;
  margin-bottom: 40px;
  font-size: ${({ theme }) => theme.fontSize.subTitle};
  font-weight: ${({ theme }) => theme.fontWeight.title};
  color: ${({ theme }) => theme.colors.mainBlue};
`

// 라디오 버튼
const RadioWrapper = styled.div`
  display: flex;
`
// 테이블
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 40px;
  border: 2px solid #ccc;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`

const TableHeader = styled.th`
  padding: 16px;
  font-weight: bold;
`

const TableRow = styled.tr`
  border-bottom: 2px solid #ccc;
`

const TableCell = styled.td`
  padding: 16px;
  width: 50%;
`

const CalculateButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.mainBlue};
  color: white;
  border: none;
  font-size: ${({ theme }) => theme.fontSize.medium};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkBlue};
  }
`

export default OnermCalc
