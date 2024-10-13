import styled from 'styled-components'

import { spinner } from 'assets/gif'

import React from 'react'

const Loading = () => {
  return (
    <SpinnerContainer>
      <SpinnerImage src={spinner} alt="Loading..." />
      <p>Loading...</p>
    </SpinnerContainer>
  )
}

export default Loading

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 10px;
`

const SpinnerImage = styled.img`
  width: 50px;
  height: 50px;
`
