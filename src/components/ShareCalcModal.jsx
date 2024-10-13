import { useRecoilState, useRecoilValue } from 'recoil'
import { userMealListState, mealTitleState, mealDescState } from 'atoms/mealAtom'

import { useMutation } from '@tanstack/react-query'
import { postMealShare } from 'api/meal'

import { useNavigate } from 'react-router-dom'

import styled from 'styled-components'
import { IoCloseOutline } from 'react-icons/io5'

import { BREAKFAST, LUNCH, DINNER } from 'constants/responseKeys'

import QuadImages from './QuadImages'
import Button from './Button'

const ShareCalcModal = ({ onClose, onClick }) => {
  const userMealList = useRecoilValue(userMealListState)
  const [mealTitle, setMealTitle] = useRecoilState(mealTitleState)
  const [mealDesc, setMealDesc] = useRecoilState(mealDescState)

  const navigate = useNavigate()

  const urlArrs = Object.values(userMealList).reduce((acc, meals) => {
    meals.forEach((meal) => acc.push(meal.food_imageurl))
    return acc
  }, [])

  const onChangeInput = (e) => {
    const txt = e.target.value
    setMealTitle(txt)
  }

  const onChangeTxtArea = (e) => {
    const txt = e.target.value
    setMealDesc(txt)
  }

  const mutation = useMutation({
    mutationFn: (data) => postMealShare(data),
    onSuccess: (res) => {
      if (String(res.status) === '201') {
        onClose()
        alert('식단 공유 완료')
        navigate('/')
      }
    },
    onError: (err) => {
      console.error('postMealShare err', err)
    },
  })

  const shareCalcData = () => {
    const data = {
      title: mealTitle,
      sub_title: mealDesc,
      description: {
        Breakfast: userMealList[BREAKFAST],
        Lunch: userMealList[LUNCH],
        Dinner: userMealList[DINNER],
      },
    }
    mutation.mutate({ data })
  }

  return (
    <BackgroundDiv>
      <CalcDataSection>
        <h1>식단 공유하기</h1>
        <WrapQuadImgDiv>
          <QuadImages urlArrs={urlArrs} />
        </WrapQuadImgDiv>
        <WrapInputDiv>
          <label htmlFor="mealTitle">식단 제목</label>
          <input
            id="mealTitle"
            value={mealTitle}
            placeholder="식단의 제목을 적어주세요."
            onChange={onChangeInput}
            autoComplete="off"
          />
          {mealTitle && <StyledInputClose onClick={() => setMealTitle('')} />}
        </WrapInputDiv>
        <WrapTxtAreaDiv>
          <label htmlFor="mealDesc">식단 제목</label>
          <textarea
            id="mealDesc"
            value={mealDesc}
            placeholder="식단의 설명을 적어주세요."
            onChange={onChangeTxtArea}
            autoComplete="off"
          />
          {mealDesc && <StyledTxtAreaClose onClick={() => setMealDesc('')} />}
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

const CalcDataSection = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 70%;
  height: fit-content;
  max-height: 600px;
  padding: 20px 30px;
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
    padding: 10px 40px 10px 10px;
    width: 100%;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.bgWhite};
  }
  & > input:focus {
    outline: none;
  }
`

const WrapTxtAreaDiv = styled.div`
  position: relative;
  margin-top: -10px;
  & > label {
    display: none;
  }
  & > textarea {
    padding: 10px 30px 10px 10px;
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
    outline: none;
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
    padding: 5px 8px;
    font-size: 14px;
  }
`
