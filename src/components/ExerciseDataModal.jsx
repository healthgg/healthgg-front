import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { exerciseGramState, eachTotalWeightState } from 'atoms/exerciseAtom'

import { v4 as uuidv4 } from 'uuid'

import styled from 'styled-components'
import { IoCloseOutline } from 'react-icons/io5'

import { EXERCISE_IMG_KEY } from 'constants/responseKeys'

import Image from './Image'
import Button from './Button'

const ExerciseDataModal = ({ data, onClose, onClick }) => {
  const [grams, setGrams] = useRecoilState(exerciseGramState)
  const [eachTotWeight, setEachTotWeight] = useRecoilState(eachTotalWeightState)

  const exercisePlanList = [
    { id: 'reps', name: '횟수', placeholder: '세트 당 횟수를 적어주세요.' },
    { id: 'weight', name: '무게', placeholder: '횟수 당 중량을 적어주세요.' },
    { id: 'sets', name: '세트', placeholder: '총 세트 수를 적어주세요.' },
  ]

  const onChangeInput = (e, id) => {
    const txt = e.target.value
    const regex = /^(0|[1-9]\d{0,3}|)$/
    if (regex.test(txt)) {
      setGrams((prev) => ({
        ...prev,
        [id]: txt,
      }))
    } else {
      alert('0부터 9999까지의 숫자만 입력 가능합니다.')
    }
  }

  const onResetInput = (id) => {
    setGrams((prev) => ({
      ...prev,
      [id]: '',
    }))
  }

  useEffect(() => {
    const { reps, weight, sets } = grams
    setEachTotWeight(+reps * +weight * +sets)
  }, [grams])

  return (
    <BackgroundDiv>
      <MealDataSection>
        <p>{data.fitness_machine_name}</p>
        <Image src={data[EXERCISE_IMG_KEY]} alt={`${data?.fitness_machine_name} 이미지`} width="100%" height="150px" />
        {data?.fitness_machine_notice && <ExerciseDescP>{data?.fitness_machine_notice}</ExerciseDescP>}
        <WrapInputDiv>
          {exercisePlanList.map(({ id, name, placeholder }) => (
            <div key={uuidv4()}>
              <label htmlFor={id}>{name}</label>
              <input
                id={id}
                value={grams[id]}
                placeholder={placeholder}
                onChange={(e) => onChangeInput(e, id)}
                autoComplete="off"
              />
              {id && <StyledClose onClick={() => onResetInput(id)} />}
            </div>
          ))}
        </WrapInputDiv>
        <TotalWeightP>총 중량 {eachTotWeight}kg</TotalWeightP>
        <WrapCtaDiv>
          <Button color="mainBlue" onClick={onClick}>
            추가
          </Button>
          <Button onClick={onClose}>취소</Button>
        </WrapCtaDiv>
      </MealDataSection>
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
