import styled from 'styled-components'

const SectionTitle = ({ children, showMore, onClick }) => {
  return (
    <WrapSectionTitle>
      <h1>{children}</h1>
      {showMore && (
        <button type="button" onClick={onClick}>
          더보기
        </button>
      )}
    </WrapSectionTitle>
  )
}

export default SectionTitle

const WrapSectionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  width: 100%;
  & > h1 {
    font-size: ${({ theme }) => theme.fontSize.subTitle};
    font-weight: ${({ theme }) => theme.fontWeight.subTitle};
  }
  & > button {
    font-size: ${({ theme }) => theme.fontSize.regular};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
  }
`
