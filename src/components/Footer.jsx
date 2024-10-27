import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { userMealListState } from 'atoms/mealAtom'
import { userExerciseListState } from 'atoms/exerciseAtom'
import { onermWeightState, onermRepsState, onermExerciseState, onermValueState } from 'atoms/onermAtom'
import { proteinPurpose, proteinGender, proteinWeight, proteinResult } from 'atoms/proteinAtom'

import { useLocation, useNavigate } from 'react-router-dom'

import styled from 'styled-components'

import { MdOutlineEmail } from 'react-icons/md'
import { iconGithub, iconKakao, iconForm } from 'assets/icon'

import { BREAKFAST, LUNCH, DINNER } from 'constants/responseKeys'

import Button from './Button'
import Portal from './Portal'

const Footer = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname, search } = location

  const [footer, setFooter] = useState('main')
  const [userMealList, setUserMealList] = useRecoilState(userMealListState)
  const [userExerciseList, setUserExerciseList] = useRecoilState(userExerciseListState)

  const [onermWeight, setOnermWeight] = useRecoilState(onermWeightState)
  const [onermReps, setOnermReps] = useRecoilState(onermRepsState)
  const [onermValue, setOnermValue] = useRecoilState(onermValueState)
  const [onermExercise, setOnermExercise] = useRecoilState(onermExerciseState)

  const [selectedGoal, setSelectedGoal] = useRecoilState(proteinPurpose)
  const [gender, setGender] = useRecoilState(proteinGender)
  const [weight, setWeight] = useRecoilState(proteinWeight)
  const [proteinIntake, setProteinIntake] = useRecoilState(proteinResult)

  const [showShareCalcModal, setShowShareCalcModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const toggleShareCalcModal = () => setShowShareCalcModal(!showShareCalcModal)

  const onClickCalcReset = () => {
    if (pathname === '/meal') {
      const isConfirm = window.confirm('선택한 식단을 초기화하시겠습니까?')
      if (isConfirm) {
        setUserMealList({
          [BREAKFAST]: [],
          [LUNCH]: [],
          [DINNER]: [],
        })
      }
    } else if (pathname === '/exercise-volume') {
      const isConfirm = window.confirm('선택한 운동을 초기화하시겠습니까?')
      if (isConfirm) setUserExerciseList([])
    } else if (pathname === '/protein-calc') {
      // protenin 초기화
      setSelectedGoal('muscle_gain')
      setGender('male')
      setWeight('')
      setProteinIntake(0)
    } else if (pathname === '/1rm-calc') {
      // 1rm계산 값 초기화
      setOnermValue({ deadlift: 0, squat: 0, benchpress: 0 })
      setOnermExercise('deadlift')
      setOnermWeight('')
      setOnermReps('')
    }
  }

  const onClickCalcSubmit = () => {
    if (pathname === '/meal') {
      const hasAllValues = Object.values(userMealList).every((items) => items.length > 0)
      if (!hasAllValues) {
        setErrorMsg('아침, 점심, 저녁 식단을\n각각 1개 이상 선택해주세요.')
        return
      }
      navigate('/meal/calc')
    } else if (pathname === '/exercise-volume') {
      if (!userExerciseList.length) {
        setErrorMsg('운동을 1개 이상\n선택해주세요.')
        return
      }
      navigate('/exercise-volume/calc')
    } else if (pathname === '/protein-calc') {
      const purposeArr = ['muscle_gain', 'diet', 'weight_maintenance']
      // 프로틴 계산 로직 추가
      if (weight === '' || Number(weight) === 0) {
        setErrorMsg('몸무게를 입력하세요.')
        return
      }

      let intakeFactor
      if (selectedGoal === purposeArr[0]) {
        intakeFactor = gender === 'male' ? 2.0 : 1.8
      } else if (selectedGoal === purposeArr[1]) {
        intakeFactor = gender === 'male' ? 1.5 : 1.3
      } else if (selectedGoal === purposeArr[2]) {
        intakeFactor = gender === 'male' ? 1.2 : 1.0
      }

      const result = weight ? (parseFloat(weight) * intakeFactor).toFixed(2) : 0
      setProteinIntake(Number(result).toFixed(0))
    } else if (pathname === '/1rm-calc') {
      // 1rm 계산 로직 추가
      // 중량 * (1 + 0.033 * 횟수)
      const onerm = onermWeight * (1 + 0.033 * onermReps)
      // 2. 계산 값 전역으로 넘기기
      setOnermValue((prev) => {
        return {
          ...prev,
          // 소수점 제거
          [onermExercise]: onerm.toFixed(0),
        }
      })
    }
  }

  const onClickCalcShare = () => {
    if (pathname === '/meal/calc') {
      const hasAllValues = Object.values(userMealList).every((items) => items.length > 0)
      if (!hasAllValues) {
        setErrorMsg('공유할 식단이 없습니다.\n이전 페이지로 이동합니다.')
        navigate('/meal')
        return
      }
      toggleShareCalcModal()
    } else if (pathname === '/exercise-volume/calc') {
      if (!userExerciseList.length) {
        setErrorMsg('공유할 운동이 없습니다.\n이전 페이지로 이동합니다.')
        navigate('/exercise-volume')
        return
      }
      toggleShareCalcModal()
    }
  }

  useEffect(() => {
    if (['/meal', '/exercise-volume'].includes(pathname)) {
      setFooter(search ? 'main' : 'calc')
    } else if (['/meal/list', '/exercise-volume/list'].includes(pathname)) {
      setFooter('main')
    } else if (['/meal/calc', '/exercise-volume/calc'].includes(pathname)) {
      setFooter('share')
    } else if (['/protein-calc', '/1rm-calc'].includes(pathname)) {
      setFooter('calc')
    } else {
      setFooter('main')
    }
  }, [pathname])

  useEffect(() => {
    setShowErrorModal(!!errorMsg)
  }, [errorMsg])

  return (
    <>
      <WrapFooter>
        {footer === 'main' && (
          <MainFooterSection>
            <p>운동 기구 및 영양소 추가 문의</p>
            <div>
              <IconBtn type="button">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdfevqhv8qujIZ1yUI_Niuzeu2OEbKo3SST9LTXLCu-WwzEjQ/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={iconForm} alt="구글폼 로고" />
                </a>
              </IconBtn>
              <IconBtn type="button">
                <a href="https://open.kakao.com/o/gaFKNPQg" target="_blank" rel="noopener noreferrer">
                  <img src={iconKakao} alt="카카오톡 로고" />
                </a>
              </IconBtn>
              <IconBtn type="button">
                <a href="https://github.com/healthgg" target="_blank" rel="noopener noreferrer">
                  <img src={iconGithub} alt="깃허브 로고" />
                </a>
              </IconBtn>
            </div>
          </MainFooterSection>
        )}

        {footer === 'calc' && (
          <section>
            <Button size="medium" width="footerHalf" height="footer" onClick={() => onClickCalcReset()}>
              초기화
            </Button>
            <Button
              size="medium"
              width="footerHalf"
              height="footer"
              color="mainBlue"
              onClick={() => onClickCalcSubmit()}
            >
              계산하기
            </Button>
          </section>
        )}

        {footer === 'share' && (
          <section>
            <Button
              size="medium"
              width="footerFull"
              height="footer"
              color="mainBlue"
              onClick={() => onClickCalcShare()}
            >
              공유하기
            </Button>
          </section>
        )}
      </WrapFooter>
      {showShareCalcModal && (
        <Portal
          portalType="shareCalcModal"
          dataFlag={pathname === '/meal/calc' ? 'food' : 'exercise'}
          onClose={() => setShowShareCalcModal(false)}
        />
      )}
      {showErrorModal && <Portal portalType="errorModal" data={{ errorMsg }} onClose={() => setErrorMsg('')} />}
    </>
  )
}

export default Footer

const WrapFooter = styled.footer`
  position: sticky;
  bottom: 0;
  min-width: 320px;
  width: 100%;
  max-width: 430px;
  height: 80px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px -3px 8px 0px;
  & > section {
    width: 100%;
    height: 100%;
    & > button {
      font-weight: 700;
    }
  }
`

const MainFooterSection = styled.section`
  background-color: #e9e9e9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  & > * {
    font-size: 16px;
  }
  & > div {
    display: flex;
    gap: 16px;
  }
`

const IconBtn = styled.button`
  img {
    width: 32px;
    height: 32px;
  }
`

const StyledEmail = styled(MdOutlineEmail)`
  width: 32px;
  height: 32px;
`
