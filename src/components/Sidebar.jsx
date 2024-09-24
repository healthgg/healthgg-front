import { useLocation, useNavigate } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'

import styled from 'styled-components'

import { IoCloseOutline } from 'react-icons/io5'
import { iconCalc, iconHealth, iconHome, iconMeal, iconProtein } from 'assets/icon'

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location

  const sidebarList = [
    { name: '홈', path: '/', src: iconHome, alt: '집' },
    { name: '프로틴 섭취량 계산기', path: '/protein-calc', src: iconProtein, alt: '프로틴' },
    { name: '운동볼륨 계산기', path: '/exercise-volume', src: iconCalc, alt: '계산기' },
    { name: '1RM 계산기', path: '/1rm-calc', src: iconCalc, alt: '계산기' },
    { name: '커스텀 식단 만들기', path: '/meal', src: iconMeal, alt: '접시' },
  ]

  return (
    <BackgroundDiv onClick={onClose}>
      <SidebarSection>
        <StyledClose onClick={onClose} />
        <img src={iconHealth} alt="바벨 아이콘" width={100} height={100} />
        <MenuUl>
          {sidebarList.map((menu) => (
            <li key={uuidv4()}>
              <MenuButton type="button" $active={pathname === menu.path} onClick={() => navigate(menu.path)}>
                <img src={menu.src} alt={`${menu.alt} 아이콘`} width={28} height={28} />
                <span>{menu.name}</span>
              </MenuButton>
            </li>
          ))}
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
  min-width: 320px;
  width: 100dvh;
  max-width: 430px;
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
    color: ${({ theme, $active }) => ($active ? theme.colors.mainBlue : theme.colors.typoBlack)};
  }
`
