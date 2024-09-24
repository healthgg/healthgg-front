import { Outlet } from 'react-router-dom'

import styled from 'styled-components'

import Footer from './Footer'
import Navbar from './Navbar'

const Layout = () => {
  return (
    <MaxWidthDiv>
      <Navbar />
      <WrapMain>
        <Outlet />
      </WrapMain>
      <Footer />
    </MaxWidthDiv>
  )
}

export default Layout

const MaxWidthDiv = styled.div`
  position: relative;
  margin: 0 auto;
  min-width: 320px;
  max-width: 430px;
  min-height: 100dvh;
  box-shadow: rgba(0, 0, 0, 0.8) 0px 5px 18px -7px;
`

const WrapMain = styled.main`
  height: calc(100dvh - 144px); // nav + footer
  padding: 30px 20px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: lightgray;
  }
`
