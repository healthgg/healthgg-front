import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { io } from 'socket.io-client'

import styled from 'styled-components'

import { getMain } from 'api/main'

import { SectionTitle, ContentCard } from 'components/common'
import { iconCalc, iconMeal, iconProtein } from 'assets/icon'

const Main = () => {
  const navigate = useNavigate()

  const [currentVisitor, setCurrentVisitor] = useState(0)

  const { data, isLoading } = useQuery({
    queryKey: ['getMain'],
    queryFn: () => getMain(),
    throwOnError: (error) => {
      // 500일 경우 error페이지로 랜딩 or 모달 띄우기
    },
  })

  const { exerciseVolume = [], foodBoardList = [], totalvistor = 0 } = data ?? {}

  useEffect(() => {
    const socket = io(process.env.REACT_APP_WEBSOCKET_URL)

    // 소켓이 연결되어 있지 않으면 연결
    if (!socket.connected) {
      socket.connect()
    }
    // 소켓 연결
    socket.on('connect', () => {})
    // 서버로부터 데이터 수신
    socket.on('clientsCount', (count) => setCurrentVisitor(count))
    // 소켓 연결 해제
    return () => {
      socket.off('connect')
      socket.off('clientsCount')
      socket.disconnect()
    }
  }, [])

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
            <span>{totalvistor}</span>
          </div>
        </VisitorSection>
        <LnbUl>
          <li>
            <LnbButton type="button" onClick={() => navigate('/protein-calc')}>
              <img src={iconProtein} alt="계산기 아이콘" width={26} height={26} />
              <span>
                프로틴 섭취량
                <br />
                계산기
              </span>
            </LnbButton>
          </li>
          <li>
            <LnbButton type="button" onClick={() => navigate('/exercise-volume')}>
              <img src={iconCalc} alt="계산기 아이콘" width={26} height={26} />
              <span>
                운동볼륨
                <br />
                계산기
              </span>
            </LnbButton>
          </li>
          <li>
            <LnbButton type="button" onClick={() => navigate('/1rm-calc')}>
              <img src={iconCalc} alt="계산기 아이콘" width={26} height={26} />
              <span>
                1RM
                <br />
                계산기
              </span>
            </LnbButton>
          </li>
          <li>
            <LnbButton type="button" onClick={() => navigate('/meal')}>
              <img src={iconMeal} alt="계산기 아이콘" width={26} height={26} />
              <span>
                커스텀
                <br />
                식단 만들기
              </span>
            </LnbButton>
          </li>
        </LnbUl>
        <section>
          <SectionTitle showMore onClick={() => navigate('/meal')}>
            🍜 BEST 식단
          </SectionTitle>
          {/* todo: 추후 가로 슬라이드 구현해서 4개 모두 출력 */}
          <BestSlideDiv>
            {foodBoardList.slice(0, 2).map((board, key) => (
              <ContentCard
                key={key}
                type="food"
                isQuad
                urlArrs={board?.food_imageurl ?? []}
                title={board?.title ?? ''}
                desc={board?.sub_title ?? ''}
                boardId={board?.board_id ?? ''}
                showBtn
              />
            ))}
          </BestSlideDiv>
        </section>
        <section>
          <SectionTitle showMore onClick={() => navigate('/exercise-volume')}>
            💪 BEST 운동볼륨
          </SectionTitle>
          <BestSlideDiv>
            {exerciseVolume.slice(0, 2).map((board, key) => (
              <ContentCard
                key={key}
                type="exercise_volume"
                isQuad
                urlArrs={board?.fitness_machine_urls ?? []}
                title={board?.title ?? ''}
                desc={board?.sub_title ?? ''}
                boardId={board?.board_id ?? ''}
                showBtn
              />
            ))}
          </BestSlideDiv>
        </section>
      </MainWrap>
    )
  )
}

export default Main

const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
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
`

const LnbButton = styled.button`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  justify-content: center;
  width: calc(290px / 4);
  height: calc(290px / 4);
  padding: 5px;
  background-color: ${({ theme }) => theme.colors.bgWhite};
  border-radius: 5px;
  & > span {
    font-size: 11px;
    font-weight: ${({ theme }) => theme.fontWeight.subTitle};
  }
`

const BestSlideDiv = styled.div`
  display: flex;
  justify-content: space-between;
`
