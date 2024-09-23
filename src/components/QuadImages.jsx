import { v4 as uuidv4 } from 'uuid'

import styled from 'styled-components'

import Image from './Image'

const QuadImages = ({ urlArrs }) => {
  const srcArrs = urlArrs.slice(0, 4)

  return (
    <QuadImagesWrap>
      {srcArrs.map((url) => (
        <Image key={uuidv4()} src={url} alt="사분할 이미지" />
      ))}
    </QuadImagesWrap>
  )
}

export default QuadImages

const QuadImagesWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  overflow: hidden;
  & > img {
    width: 100%;
    height: 100%;
  }
`
