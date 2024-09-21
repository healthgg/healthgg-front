import styled from 'styled-components'

const Button = ({ size, width, height, color, children, onClick }) => {
  return (
    <ButtonWrap type="button" size={size} width={width} height={height} color={color} onClick={onClick}>
      {children}
    </ButtonWrap>
  )
}

export default Button

const ButtonWrap = styled.button`
  width: ${({ theme, width }) => theme.width[width] || width};
  height: ${({ theme, height }) => theme.height[height] || height};
  font-size: ${({ theme, size }) => theme.fontSize[size]};
  font-weight: ${({ theme, size }) => theme.fontWeight[size]};
  color: ${({ theme, color }) => (color ? 'white' : theme.colors.typoBlack)};
  background-color: ${({ theme, color }) => (color ? theme.colors.mainBlue : theme.colors.bgWhite)};
  border-radius: ${({ height }) => (height === 'footer' ? '3px 5px 0 0' : '5px')};
`
