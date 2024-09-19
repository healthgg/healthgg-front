import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

const Layout = () => {
  return (
    <WrapMain>
      <Outlet />
    </WrapMain>
  )
}

export default Layout

const WrapMain = styled.main`
  margin: auto;
  padding: 40px 20px;
  width: 360px;
  height: 100dvh;
  overflow-y: scroll;
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
