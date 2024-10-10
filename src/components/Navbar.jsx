import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import styled from 'styled-components'

import { FaArrowLeft } from 'react-icons/fa6'
import { RxHamburgerMenu } from 'react-icons/rx'

import Portal from './Portal'

const Navbar = () => {
  const navigate = useNavigate()
  const [showSidebar, setShowSidebar] = useState(false)

  const toggleSidebar = () => setShowSidebar(!showSidebar)

  return (
    <WrapNav>
      <button type="button" onClick={() => navigate(-1)}>
        <StyledArrowLeft />
      </button>
      <TitleSpan onClick={() => navigate('/')}>Health.GG</TitleSpan>
      <button type="button" onClick={toggleSidebar}>
        <StyledHamburger />
      </button>
      {showSidebar && <Portal type="sidebar" onClose={toggleSidebar} />}
    </WrapNav>
  )
}

export default Navbar

const WrapNav = styled.nav`
  position: sticky;
  top: 0;
  display: grid;
  grid-template-columns: 60px 1fr 60px;
  align-items: center;
  width: 100%;
  height: 64px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 8px 0px;
`

const TitleSpan = styled.span`
  font-weight: 700;
  cursor: pointer;
`

const StyledArrowLeft = styled(FaArrowLeft)`
  width: 20px;
  height: 20px;
  justify-self: center;
`

const StyledHamburger = styled(RxHamburgerMenu)`
  width: 20px;
  height: 20px;
  justify-self: center;
`
