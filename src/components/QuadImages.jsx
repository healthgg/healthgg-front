import { v4 as uuidv4 } from 'uuid'

import styled from 'styled-components'

import Image from './Image'

const QuadImages = ({ urlArrs }) => {
  const srcArrs = urlArrs.slice(0, 4)

  return (
    <QuadImagesWrap>
      {srcArrs.map((url) => (
        <Image key={uuidv4()} width="95px" height="70px" src={url} alt="사분할 이미지" />
      ))}
    </QuadImagesWrap>
  )
}

export default QuadImages

const QuadImagesWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  width: 190px;
  height: 140px;
  overflow: hidden;
`
