import styled from 'styled-components'
import { imgError } from 'assets/img'

import Button from './Button'
import Image from './Image'

const ErrorModal = ({ data, onClose }) => {
  return (
    <BackgroundDiv>
      <ErrorSection>
        <Image src={imgError} alt="에러 이미지" width="100px" height="100px" />
        <h1>{data.errorMsg}</h1>
        <Button color="mainBlue" width="regular" height="regular" onClick={onClose}>
          확인
        </Button>
      </ErrorSection>
    </BackgroundDiv>
  )
}

export default ErrorModal

const BackgroundDiv = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  margin: auto;
  min-width: 320px;
  max-width: 430px;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
`

const ErrorSection = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  width: 70%;
  height: fit-content;
  height: 300px;
  padding: 20px;
  background: white;
  border-radius: 5px;
  & > h1 {
    font-size: ${({ theme }) => theme.fontSize.medium};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    text-align: center;
    white-space: pre;
  }
  & > button {
  }
`
