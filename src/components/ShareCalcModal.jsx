import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { userMealListState, mealTitleState, mealDescState } from 'atoms/mealAtom'
import { userExerciseListState, userExerciseExcelState } from 'atoms/exerciseAtom'

import { useMutation } from '@tanstack/react-query'
import { postMealShare } from 'api/meal'
import { postExerciseShare } from 'api/exercise'

import { useNavigate } from 'react-router-dom'

import styled from 'styled-components'
import { IoCloseOutline } from 'react-icons/io5'
import { imgDone } from 'assets/img'

import { FOOD_IMG_ARR_KEY, EXERCISE_IMG_KEY, BREAKFAST, LUNCH, DINNER } from 'constants/responseKeys'

import QuadImages from './QuadImages'
import Button from './Button'
import Image from './Image'

const ShareCalcModal = ({ dataFlag, onClose }) => {
  const [userMealList, setUserMealList] = useRecoilState(userMealListState)
  const [title, setTitle] = useRecoilState(mealTitleState)
  const [desc, setDesc] = useRecoilState(mealDescState)

  const [userExerciseList, setUserExerciseList] = useRecoilState(userExerciseListState)
  const [userExerciseExcel, setUserExerciseExcel] = useRecoilState(userExerciseExcelState)

  const [showDoneContent, setShowDoneContent] = useState(false)

  const navigate = useNavigate()

  const isTypeFood = dataFlag === 'food'
  const targetArr = isTypeFood ? userMealList : userExerciseList
  const targetTxt = isTypeFood ? '식단' : '운동볼륨'
  const imagesKey = isTypeFood ? FOOD_IMG_ARR_KEY : EXERCISE_IMG_KEY

  const urlArrs = () => {
    return Object.values(targetArr).reduce((acc, data) => {
      if (isTypeFood) {
        data.forEach((value) => acc.push(value[imagesKey]))
      } else {
        acc.push(data[imagesKey])
      }
      return acc
    }, [])
  }

  const onChangeInput = (e) => {
    const txt = e.target.value
    setTitle(txt)
  }

  const onChangeTxtArea = (e) => {
    const txt = e.target.value
    setDesc(txt)
  }

  const onResetAllData = () => {
    setUserMealList({
      [BREAKFAST]: [],
      [LUNCH]: [],
      [DINNER]: [],
    })
    setUserExerciseList([])
    setUserExerciseExcel({
      fitness_machine_name: '',
      repetition: 0,
      set: 0,
      weight: 0,
      total_weight: 0,
    })
    setTitle('')
    setDesc('')
  }

  const mutation = useMutation({
    mutationFn: (data) => (isTypeFood ? postMealShare(data) : postExerciseShare(data)),
    onSuccess: (res) => {
      if (String(res.status) === '201') {
        setShowDoneContent(true)
      }
    },
    onError: (err) => {
      console.error('postMealShare err', err)
      onClose()
    },
  })

  const onCloseDoneModal = () => {
    onClose()
    setShowDoneContent(false)
    onResetAllData()
    navigate('/')
  }

  const shareCalcData = () => {
    const data = {
      title,
      sub_title: desc,
      description: isTypeFood
        ? {
            Breakfast: userMealList[BREAKFAST],
            Lunch: userMealList[LUNCH],
            Dinner: userMealList[DINNER],
          }
        : userExerciseList,
    }
    mutation.mutate({ data })
  }

  return showDoneContent ? (
    <BackgroundDiv>
      <DoneSection>
        <Image src={imgDone} alt="공유 완료 이미지" width="100px" height="100px" />
        <h1>{targetTxt} 공유 완료</h1>
        <Button color="mainBlue" width="regular" height="regular" onClick={onCloseDoneModal}>
          확인
        </Button>
      </DoneSection>
    </BackgroundDiv>
  ) : (
    <BackgroundDiv>
      <CalcDataSection>
        <h1>{targetTxt} 공유하기</h1>
        <WrapQuadImgDiv>
          <QuadImages urlArrs={urlArrs()} />
        </WrapQuadImgDiv>
        <WrapInputDiv>
          <label htmlFor="title">{targetTxt} 제목</label>
          <input
            id="title"
            value={title}
            placeholder={`공유할 ${targetTxt}의 제목을 적어주세요.`}
            onChange={onChangeInput}
            autoComplete="off"
          />
          {title && <StyledInputClose onClick={() => setTitle('')} />}
        </WrapInputDiv>
        <WrapTxtAreaDiv>
          <label htmlFor="desc">{targetTxt} 설명</label>
          <textarea
            id="desc"
            value={desc}
            placeholder={`공유할 ${targetTxt}의 설명을 적어주세요.`}
            onChange={onChangeTxtArea}
            autoComplete="off"
          />
          {desc && <StyledTxtAreaClose onClick={() => setDesc('')} />}
        </WrapTxtAreaDiv>
        <WrapCtaDiv>
          <Button color="mainBlue" onClick={shareCalcData}>
            공유
          </Button>
          <Button onClick={onClose}>취소</Button>
        </WrapCtaDiv>
      </CalcDataSection>
    </BackgroundDiv>
  )
}

export default ShareCalcModal

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

const DoneSection = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  width: 70%;
  height: fit-content;
  height: 250px;
  padding: 20px;
  background: white;
  border-radius: 5px;
  & > h1 {
    font-size: ${({ theme }) => theme.fontSize.subTitle};
    font-weight: ${({ theme }) => theme.fontWeight.subTitle};
  }
  & > button {
  }
`

const CalcDataSection = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 70%;
  height: fit-content;
  max-height: 720px;
  padding: 50px 30px;
  background: white;
  border-radius: 5px;
  text-align: center;
  overflow-x: hidden;
  overflow-y: auto;
  & > h1 {
    font-size: ${({ theme }) => theme.fontSize.subTitle};
    font-weight: ${({ theme }) => theme.fontWeight.subTitle};
  }
  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: lightgray;
  }
`

const WrapQuadImgDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const WrapInputDiv = styled.div`
  position: relative;
  & > label {
    display: none;
  }
  & > input {
    padding: 12px 10px;
    width: 100%;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.bgWhite};
    margin-top: 12px;
  }
  & > input:focus {
    outline: 2px solid ${({ theme }) => theme.colors.mainBlue};
  }
`

const WrapTxtAreaDiv = styled.div`
  position: relative;
  margin-top: -10px;
  & > label {
    display: none;
  }
  & > textarea {
    padding: 12px 10px;
    width: 100%;
    height: 100px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.bgWhite};
    &::-webkit-scrollbar {
      width: 2px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: lightgray;
    }
  }
  & > textarea:focus {
    outline: 2px solid ${({ theme }) => theme.colors.mainBlue};
  }
`

const StyledInputClose = styled(IoCloseOutline)`
  position: absolute;
  top: 50%;
  right: 10px;
  width: 20px;
  height: 20px;
  transform: translateY(-50%);
  cursor: pointer;
`

const StyledTxtAreaClose = styled(IoCloseOutline)`
  position: absolute;
  top: 20%;
  right: 10px;
  width: 20px;
  height: 20px;
  transform: translateY(-50%);
  cursor: pointer;
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
