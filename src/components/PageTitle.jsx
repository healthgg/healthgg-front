import styled from 'styled-components'

const PageTitle = ({ children }) => {
  return <PageTitleH1>{children}</PageTitleH1>
}

export default PageTitle

const PageTitleH1 = styled.h1`
  margin-bottom: 20px;
  font-size: ${({ theme }) => theme.fontSize.subTitle};
  font-weight: ${({ theme }) => theme.fontWeight.subTitle};
`
