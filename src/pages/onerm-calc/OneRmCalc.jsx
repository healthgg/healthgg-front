import React, { useState } from 'react'
import styled from 'styled-components'
import InputBox from 'components/InputBox'
import { PageTitle } from 'components'
import RadioButton from 'components/RadioButton'
import WeightButton from 'components/WeightButton'

const OnermCalc = () => {
  const [weight, setWeight] = useState('')
  const [reps, setReps] = useState('')
  const [oneRm, setOneRm] = useState({ deadlift: 0, squat: 0, benchpress: 0 })
  const [selectedExercise, setSelectedExercise] = useState('deadlift')

  const exercises = [
    { name: '데드리프트', value: oneRm.deadlift },
    { name: '스쿼트', value: oneRm.squat },
    { name: '벤치프레스', value: oneRm.benchpress },
  ]

  const calculateOneRm = () => {
    if (weight && reps) {
      const result = (parseFloat(weight) * (1 + parseFloat(reps) / 30)).toFixed(2)
      setOneRm({
        ...oneRm,
        [selectedExercise]: result,
      })
    }
  }

  // 값이 세자리일부터 값을 에러를 반환함 수정 필요
  const handleRepsChange = (e) => {
    setReps(e.target.value)
    const numReps = +reps
    console.log(numReps)
    // 숫자 변환 후 11 이상인지 확인
    if (numReps > 10) {
      setReps('')
      window.alert('10회 이하여야함')
    }
  }

  return (
    <Container>
      <PageTitle size="h2">
        반복 횟수와 무게를 기반으로 수행 가능한 <br /> 1RM을 계산합니다
      </PageTitle>

      <OnermTitle>{`수행가능 1RM: ${oneRm[selectedExercise]}kg`}</OnermTitle>

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
          id="benchpress"
          name="exercise"
          value="benchpress"
          checked={selectedExercise === 'benchpress'}
          onChange={() => setSelectedExercise('benchpress')}
          label="벤치프레스"
        />
        <RadioButton
          id="squat"
          name="exercise"
          value="squat"
          checked={selectedExercise === 'squat'}
          onChange={() => setSelectedExercise('squat')}
          label="스쿼트"
        />
      </RadioWrapper>

      <InputBox type="number" id="reps" value={reps} onChange={handleRepsChange} placeholder="반복횟수 (10회 이하)" />

      <InputBox
        type="number"
        id="weight"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        placeholder="무게"
      />

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
  font-size: ${({ theme }) => theme.fontSize.title};
  font-weight: ${({ theme }) => theme.fontWeight.title};
  color: ${({ theme }) => theme.colors.mainBlue};
`

/**
 * 라디오 버튼 래핑으로 가로 정렬
 */
const RadioWrapper = styled.div`
  display: flex;
`

/**
 *
 *테이블
 */

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

export default OnermCalc
