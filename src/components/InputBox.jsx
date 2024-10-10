import styled from 'styled-components'

const InputBox = ({ size, width = '100%', marginTop = '16px', height, placeholder, value, onChange }) => {
  return (
    <InputWrap
      size={size}
      width={width}
      marginTop={marginTop}
      height={height}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}

export default InputBox

/**
 * 인풋박스 css 컴포넌트
 */
const InputWrap = styled.input`
  width: ${({ theme, width }) => theme.width[width] || width};
  height: ${({ theme, height }) => theme.height[height] || height};
  font-size: ${({ theme }) => theme.fontSize.regular};
  padding: 1em;
  margin-top: ${({ marginTop }) => marginTop};
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.typoBlack};
  background-color: ${({ theme }) => theme.colors.bgWhite};
  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholderGray};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.mainBlue || '#007bff'};
  }
`
