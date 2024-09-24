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
  width: 100dvh;
  max-width: 430px;
  height: 100%;
`

const WrapMain = styled.main`
  height: 100%;
  padding: 40px 20px 100px 20px;
  overflow-y: auto;
  box-shadow: rgba(0, 0, 0, 0.8) 0px 5px 18px -7px;
  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: gray;
  }
  &::-webkit-scrollbar-track {
    background-color: lightgray;
  }
`
