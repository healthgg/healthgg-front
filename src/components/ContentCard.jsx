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
      {isQuad ? (
        <button type="button" onClick={browserTarget && boardId ? () => navigate(`/${browserTarget}/${boardId}`) : ''}>
          <QuadImages urlArrs={urlArrs} />
          <TitleDiv>
            <TitleH2>{title}</TitleH2>
          </TitleDiv>
          <p>{desc}</p>
        </button>
      ) : (
        <>
          <Image src={src} alt={alt} />
          <TitleDiv>
            <TitleH2 $showBtn={showBtn}>{title}</TitleH2>
            {showBtn && <Button color="mainBlue">선택</Button>}
          </TitleDiv>
          <p>{desc}</p>
        </>
      )}
    </ContentCardWrap>
  )
}

export default ContentCard

const ContentCardWrap = styled.div`
  overflow: hidden;
  & > button {
    text-align: left;
  }
  & > p {
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
`

const TitleH2 = styled.h2`
  margin-top: 8px;
  width: ${({ $showBtn }) => ($showBtn ? 'calc(100% - 40px)' : '100%')};
  font-size: 20px;
  font-weight: ${({ theme }) => theme.fontWeight.title};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: ${({ $showBtn }) => ($showBtn ? 'default' : 'pointer')};
  & + button {
    display: flex;
    align-items: center;
    padding: 6px 8px;
    height: 100%;
    font-size: 13px;
  }
`
