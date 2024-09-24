import { useState, useEffect } from 'react'

import { useLocation } from 'react-router-dom'

import styled from 'styled-components'

import { MdOutlineEmail } from 'react-icons/md'
import { iconGithub, iconKakao } from 'assets/icon'

import Button from './Button'

const Footer = () => {
  const location = useLocation()
  const { pathname, search } = location

  const [footer, setFooter] = useState('main')

  useEffect(() => {
    if (['/meal', '/exercise-volume'].includes(pathname)) {
      setFooter(search ? 'main' : 'calc')
    } else if (['/meal/list', '/exercise-volume/list'].includes(pathname)) {
      setFooter('main')
    } else if (['/meal/calc', '/exercise-volume/calc'].includes(pathname)) {
      setFooter('share')
    } else if (['/protein-calc', '1rm-calc'].includes(pathname)) {
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
              <img src={iconKakao} alt="카카오톡 로고" />
            </IconBtn>
            <IconBtn type="button">
              <img src={iconGithub} alt="깃허브 로고" />
            </IconBtn>
          </div>
        </MainFooterSection>
      )}

      {footer === 'calc' && (
        <section>
          <Button size="medium" width="footerHalf" height="footer">
            초기화
          </Button>
          <Button size="medium" width="footerHalf" height="footer" color="mainBlue">
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
  position: fixed;
  bottom: 0;
  min-width: 320px;
  width: 100dvh;
  max-width: 430px;
  height: 80px;
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
    font-size: 12px;
  }
  & > div {
    display: flex;
    gap: 8px;
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
