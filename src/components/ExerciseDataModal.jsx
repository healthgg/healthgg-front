import { useState, useEffect, useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { exerciseGramState, eachTotalWeightState } from 'atoms/exerciseAtom'

import styled from 'styled-components'
import { imgError } from 'assets/img'
import { IoCloseOutline } from 'react-icons/io5'

import { EXERCISE_IMG_KEY } from 'constants/responseKeys'

import Image from './Image'
import Button from './Button'

const ExerciseDataModal = ({ data, onClose, onClick }) => {
  const [grams, setGrams] = useRecoilState(exerciseGramState)
  const [eachTotWeight, setEachTotWeight] = useRecoilState(eachTotalWeightState)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const exercisePlanList = [
    { id: 'reps', name: '횟수', placeholder: '세트 당 횟수를 적어주세요.' },
    { id: 'weight', name: '무게', placeholder: '횟수 당 중량을 적어주세요.' },
    { id: 'sets', name: '세트', placeholder: '총 세트 수를 적어주세요.' },
  ]

  const onChangeInput = useCallback((e, id) => {
    const txt = e.target.value
    setGrams((prev) => ({
      ...prev,
      [id]: txt,
    }))
  }, [])

  const onResetInput = (id) => {
    setGrams((prev) => ({
      ...prev,
      [id]: '',
    }))
  }

  const validInput = () => {
    const regex = /^(0|[1-9]\d{0,3}|)$/
    const isNotNumber = Object.values(grams).some((txt) => !regex.test(txt))
    if (isNotNumber) {
      setErrorMsg('0부터 9999까지의 숫자만\n입력 가능합니다.')
      return
    }
    onClick()
  }

  useEffect(() => {
    const { reps, weight, sets } = grams
    const totalWeight = (+reps || 0) * (+weight || 0) * (+sets || 0)
    setEachTotWeight(totalWeight)
  }, [grams, setEachTotWeight])

  useEffect(() => {
    setShowErrorModal(!!errorMsg)
  }, [errorMsg])

  return (
    <BackgroundDiv>
      <MealDataSection>
        <p>{data.fitness_machine_name}</p>
        <Image src={data[EXERCISE_IMG_KEY]} alt={`${data?.fitness_machine_name} 이미지`} width="100%" height="150px" />
        {data?.fitness_machine_notice && <ExerciseDescP>{data?.fitness_machine_notice}</ExerciseDescP>}
        <WrapInputDiv>
          {exercisePlanList.map(({ id, name, placeholder }) => (
            <div key={id}>
              <label htmlFor={id}>{name}</label>
              <input
                id={id}
                value={grams[id]}
                placeholder={placeholder}
                onChange={(e) => onChangeInput(e, id)}
                onFocus={(e) => e.target.select()}
                autoComplete="off"
              />
              {id && <StyledClose onClick={() => onResetInput(id)} />}
            </div>
          ))}
        </WrapInputDiv>
        <TotalWeightP>총 중량 {eachTotWeight}kg</TotalWeightP>
        <WrapCtaDiv>
          <Button color="mainBlue" onClick={validInput} disabled={showErrorModal}>
            추가
          </Button>
          <Button onClick={onClose} disabled={showErrorModal}>
            취소
          </Button>
        </WrapCtaDiv>
      </MealDataSection>
      {showErrorModal && (
        <ErrorSection>
          <Image src={imgError} alt="에러 이미지" width="100px" height="100px" />
          <h1>{errorMsg}</h1>
          <Button color="mainBlue" width="regular" height="regular" onClick={() => setErrorMsg('')}>
            확인
          </Button>
        </ErrorSection>
      )}
    </BackgroundDiv>
  )
}

export default ExerciseDataModal

const BackgroundDiv = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  margin: auto;
  min-width: 320px;
  max-width: 430px;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
`

const MealDataSection = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 70%;
  height: fit-content;
  max-height: 720px;
  padding: 50px 30px;
  background: white;
  border-radius: 5px;
  text-align: center;
  overflow-x: hidden;
  overflow-y: auto;
  & > p:first-child {
    font-size: ${({ theme }) => theme.fontSize.medium};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }
  & > img {
    object-fit: contain;
    border: 1px solid #bfbfbf;
    border-radius: 5px;
  }
  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: lightgray;
  }
`

const ExerciseDescP = styled.p`
  margin-top: -10px;
  font-size: ${({ theme }) => theme.fontSize.regular};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  text-align: justify;
`

const WrapInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  & > div {
    position: relative;
    & > label {
      display: inline-block;
      margin-bottom: 3px;
      width: 100%;
      font-size: ${({ theme }) => theme.fontSize.regular};
      font-weight: ${({ theme }) => theme.fontWeight.medium};
      text-align: left;
    }
    & > input {
      padding: 12px 10px;
      width: 100%;
      border-radius: 5px;
      background-color: ${({ theme }) => theme.colors.bgWhite};
    }
    & > input:focus {
      outline: 2px solid ${({ theme }) => theme.colors.mainBlue};
    }
  }
`

const StyledClose = styled(IoCloseOutline)`
  position: absolute;
  bottom: 13%;
  right: 10px;
  width: 20px;
  height: 20px;
  transform: translateY(-13%);
  cursor: pointer;
`

const TotalWeightP = styled.p`
  margin-top: 12px;
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.mainBlue};
`

const WrapCtaDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  & > button {
    padding: 6px 16px;
    font-size: ${({ theme }) => theme.fontSize.regular};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }
`

const ErrorSection = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  width: 70%;
  height: fit-content;
  height: 300px;
  padding: 20px;
  background: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 5px 5px 30px 15px;
  z-index: 1;
  & > h1 {
    font-size: ${({ theme }) => theme.fontSize.medium};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    text-align: center;
    white-space: pre;
  }
  & > button {
  }
`
