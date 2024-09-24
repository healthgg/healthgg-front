import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { io } from 'socket.io-client'

import { v4 as uuidv4 } from 'uuid'

import styled from 'styled-components'

import { getMain } from 'api/main'

import { FOOD_IMG_ARR_KEY, EXERCISE_IMG_ARR_KEY } from 'constants/responseKeys'

import { SectionTitle, ContentCard } from 'components'
import { iconCalc, iconMeal, iconProtein } from 'assets/icon'

const Main = () => {
  const navigate = useNavigate()

  const [currentVisitor, setCurrentVisitor] = useState(0)
  const [totalVisitor, setTotalVisitor] = useState(0)
  const [bestList, setBestList] = useState([])

  const lnbList = [
    { name: '프로틴 섭취량\n계산기', path: '/protein-calc', src: iconProtein, alt: '프로틴' },
    { name: '운동볼륨\n계산기', path: '/exercise-volume', src: iconCalc, alt: '계산기' },
    { name: '1RM\n계산기', path: '/1rm-calc', src: iconCalc, alt: '계산기' },
    { name: '커스텀\n식단 만들기', path: '/meal', src: iconMeal, alt: '접시' },
  ]

  // todo: 에러페이지 제작 후 isError || error일 때 해당 페이지로 랜딩
  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ['getMain'],
    queryFn: () => getMain(),
    throwOnError: (err) => console.error(err),
  })

  useEffect(() => {
    const socket = io(process.env.REACT_APP_WEBSOCKET_URL)
    socket.on('clientsCount', (count) => setCurrentVisitor(count))
    return () => {
      socket.off('clientsCount')
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (isSuccess) {
      const { exerciseVolume = [], foodBoardList = [], totalvistor = 0 } = data ?? {}
      setTotalVisitor(totalvistor)
      setBestList([
        {
          type: 'food',
          name: '🍜 BEST 식단',
          path: '/meal/list',
          boardArr: foodBoardList,
          urlArrsKey: FOOD_IMG_ARR_KEY,
        },
        {
          type: 'exercise_volume',
          name: '💪 BEST 운동볼륨',
          path: '/exercise-volume/list',
          boardArr: exerciseVolume,
          urlArrsKey: EXERCISE_IMG_ARR_KEY,
        },
      ])
    }
  }, [isSuccess, data])

  // todo 로딩 스피너 또는 스켈레톤 UI
  return isLoading ? (
    <p>로딩중</p>
  ) : (
    data && (
      <MainWrap>
        <VisitorSection>
          <div>
            <span>현재 접속자 수</span>
            <span>{currentVisitor}</span>
          </div>
          <div>
            <span>전체 방문자</span>
            <span>{totalVisitor}</span>
          </div>
        </VisitorSection>
        <LnbUl>
          {lnbList.map((menu) => (
            <li key={uuidv4()}>
              <LnbButton type="button" onClick={() => navigate(menu.path)}>
                <img src={menu.src} alt={`${menu.alt} 아이콘`} width={26} height={26} />
                <span>{menu.name}</span>
              </LnbButton>
            </li>
          ))}
        </LnbUl>
        <BestSection>
          {bestList.map((list) => (
            <div key={uuidv4()}>
              <SectionTitle showMore onClick={() => navigate(list.path)}>
                {list.name}
              </SectionTitle>
              {/* todo: 추후 가로 슬라이드 구현해서 4개 모두 출력 */}
              <BestSlideDiv>
                {list.boardArr.slice(0, 2).map((board) => (
                  <ContentCard
                    key={uuidv4()}
                    type={list.type}
                    isQuad
                    urlArrs={board?.[list.urlArrsKey] ?? []}
                    title={board?.title ?? ''}
                    desc={board?.sub_title ?? ''}
                    boardId={board?.board_id ?? ''}
                  />
                ))}
              </BestSlideDiv>
            </div>
          ))}
        </BestSection>
      </MainWrap>
    )
  )
}

export default Main

const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const VisitorSection = styled.section`
  display: flex;
  justify-content: space-around;
  height: 100px;
  border: 1px solid #cacaca;
  border-radius: 5px;
  & > div {
    display: flex;
    flex-direction: column;
    gap: 3px;
    align-items: center;
    justify-content: center;
    & > span:first-child {
      font-size: 14px;
    }
    & > span:last-child {
      color: ${({ theme }) => theme.colors.mainBlue};
      font-size: ${({ theme }) => theme.fontSize.title};
      font-weight: ${({ theme }) => theme.fontWeight.subTitle};
    }
  }
`

const LnbUl = styled.ul`
  display: flex;
  gap: 10px;
  & > li {
    flex: 1;
  }
`

const LnbButton = styled.button`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 10px 5px;
  background-color: ${({ theme }) => theme.colors.bgWhite};
  border-radius: 5px;
  & > span {
    font-size: 11px;
    font-weight: ${({ theme }) => theme.fontWeight.subTitle};
    white-space: pre;
  }
`

const BestSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const BestSlideDiv = styled.div`
  display: flex;
  gap: 16px;
  & > div {
    flex: 1;
  }
`
