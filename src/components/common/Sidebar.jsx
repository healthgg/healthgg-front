import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import styled from 'styled-components'

import { IoCloseOutline } from 'react-icons/io5'
import { iconCalc, iconHealth, iconHome, iconMeal, iconProtein } from 'assets/icon'

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const url = location.pathname

  useEffect(() => {
    console.log(url)
  }, [url])

  return (
    <BackgroundDiv onClick={onClose}>
      <SidebarSection>
        <StyledClose onClick={onClose} />
        <img src={iconHealth} alt="바벨 아이콘" width={100} height={100} />
        <MenuUl>
          <li>
            <MenuButton type="button" active={url === '/' ? 'true' : 'false'} onClick={() => navigate('/')}>
              <img src={iconHome} alt="집 아이콘" width={28} height={28} />
              <span>홈</span>
            </MenuButton>
          </li>
          <li>
            <MenuButton
              type="button"
              active={url === '/protein-calc' ? 'true' : 'false'}
              onClick={() => navigate('/protein-calc')}
            >
              <img src={iconProtein} alt="프로틴 아이콘" width={28} height={28} />
              <span>프로틴 섭취량 계산기</span>
            </MenuButton>
          </li>
          <li>
            <MenuButton
              type="button"
              active={url === '/exercise-volume' ? 'true' : 'false'}
              onClick={() => navigate('/exercise-volume')}
            >
              <img src={iconCalc} alt="계산기 아이콘" width={28} height={28} />
              <span>운동볼륨 계산기</span>
            </MenuButton>
          </li>
          <li>
            <MenuButton
              type="button"
              active={url === '/1rm-calc' ? 'true' : 'false'}
              onClick={() => navigate('/1rm-calc')}
            >
              <img src={iconCalc} alt="계산기 아이콘" width={28} height={28} />
              <span>1RM 계산기</span>
            </MenuButton>
          </li>
          <li>
            <MenuButton type="button" active={url === '/meal' ? 'true' : 'false'} onClick={() => navigate('/meal')}>
              <img src={iconMeal} alt="접시 아이콘" width={28} height={28} />
              <span>커스텀 식단 만들기</span>
            </MenuButton>
          </li>
        </MenuUl>
      </SidebarSection>
    </BackgroundDiv>
  )
}

export default Sidebar

const BackgroundDiv = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  margin: auto;
  width: 360px;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
`

const SidebarSection = styled.section`
  position: relative;
  width: 80%;
  height: 100%;
  margin-left: 20%;
  padding-top: 50px;
  background: white;
  text-align: center;
`

const StyledClose = styled(IoCloseOutline)`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`

const MenuUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin: 50px auto 0 auto;
  width: fit-content;
`

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: 24px;
  span {
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme, active }) => (active === 'true' ? theme.colors.mainBlue : theme.colors.typoBlack)};
  }
`
