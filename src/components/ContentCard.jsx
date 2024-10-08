import { useNavigate } from 'react-router-dom'

import styled from 'styled-components'

import Image from './Image'
import QuadImages from './QuadImages'
import Button from './Button'

const ContentCard = ({ type, isQuad, urlArrs, src, alt, title, desc, boardId, showBtn }) => {
  const navigate = useNavigate()

  const browserTarget = type === 'food' ? 'meal' : type === 'exercise_volume' ? 'exercise-volume' : ''

  return (
    <ContentCardWrap>
      {isQuad ? <QuadImages urlArrs={urlArrs} /> : <Image src={src} alt={alt} />}
      <TitleDiv onClick={browserTarget && boardId ? () => navigate(`/${browserTarget}/${boardId}`) : ''}>
        <TitleH2 $showBtn={showBtn}>{title}</TitleH2>
        {showBtn && <Button color="mainBlue">선택</Button>}
      </TitleDiv>
      <p>{desc}</p>
    </ContentCardWrap>
  )
}

export default ContentCard

const ContentCardWrap = styled.div`
  overflow: hidden;
  & > p {
    margin-top: 8px;
    width: 100%;
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const TitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`

const TitleH2 = styled.h2`
  width: ${({ $showBtn }) => ($showBtn ? 'calc(100% - 40px)' : '100%')};
  font-size: 20px;
  font-weight: ${({ theme }) => theme.fontWeight.title};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  & + button {
    display: flex;
    align-items: center;
    padding: 0 4px;
    height: 18px;
    font-size: 11px;
  }
`
