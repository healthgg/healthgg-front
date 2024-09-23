import { useState } from 'react'

import styled from 'styled-components'

import { iconImgError } from 'assets/icon'

const Image = ({ src, alt, width, height }) => {
  const [imgSrc, setImgSrc] = useState(src || iconImgError)

  return (
    <ImageWrap
      width={width}
      height={height}
      src={imgSrc}
      alt={alt || '이미지'}
      onError={() => setImgSrc(iconImgError)}
    />
  )
}

export default Image

const ImageWrap = styled.img`
  object-fit: cover;
`
