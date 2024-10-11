import { useState, useEffect } from 'react'
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil'
import { userMealListState } from 'atoms/mealAtom'
import {
  userExerciseListState,
  onermExerciseState,
  onermWeightState,
  onermRepsState,
  onermValueState,
} from 'atoms/exerciseAtom'

import { useLocation, useNavigate } from 'react-router-dom'

import styled from 'styled-components'

import { MdOutlineEmail } from 'react-icons/md'
import { iconGithub, iconKakao } from 'assets/icon'

import { BREAKFAST, LUNCH, DINNER } from 'constants/responseKeys'

import Button from './Button'

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
  const [onermExercise] = useRecoilState(onermExerciseState)

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
      console.log(1)
    } else if (pathname === '/1rm-calc') {
      // 1rm계산 값 초기화
      setOnermValue({ deadlift: 0, squat: 0, benchpress: 0 })
      setOnermWeight('')
      setOnermReps('')
    }
  }

  const onClickCalcSubmit = () => {
    if (pathname === '/meal') {
      const hasAllValues = Object.values(userMealList).every((items) => items.length > 0)
      if (!hasAllValues) {
        alert('아침, 점심, 저녁 식단을 각각 1개 이상 선택해주세요.')
        return
      }
      navigate('/meal/calc')
    } else if (pathname === '/exercise-volume') {
      if (!userExerciseList.length) {
        alert('운동을 1개 이상 선택해주세요.')
        return
      }
      navigate('/exercise-volume/calc')
    } else if (pathname === '/protein-calc') {
      // 프로틴 계산 로직 추가
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

  return (
    <WrapFooter>
      {footer === 'main' && (
        <MainFooterSection>
          <p>운동 기구 및 영양소 추가 문의</p>
          <div>
            <a href="mailto:ystar5008@naver.com">
              <StyledEmail />
            </a>
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
          <Button size="medium" width="footerHalf" height="footer" color="mainBlue" onClick={() => onClickCalcSubmit()}>
            계산하기
          </Button>
        </section>
      )}

      {footer === 'share' && (
        <section>
          <Button size="medium" width="footerFull" height="footer" color="mainBlue">
            공유하기
          </Button>
        </section>
      )}
    </WrapFooter>
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
