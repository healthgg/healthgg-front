import styled from 'styled-components'

const PageTitle = ({ size, children }) => {
  return !size ? <PageTitleH1>{children}</PageTitleH1> : <PageTitleH2>{children}</PageTitleH2>
}

export default PageTitle

const PageTitleH1 = styled.h1`
  margin-bottom: 20px;
  font-size: ${({ theme }) => theme.fontSize.subTitle};
  font-weight: ${({ theme }) => theme.fontWeight.subTitle};
`

const PageTitleH2 = styled.h2`
  margin-bottom: 10px;
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: ${({ theme }) => theme.fontWeight.subTitle};
`
