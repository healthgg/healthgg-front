import { v4 as uuidv4 } from 'uuid'

import styled from 'styled-components'

import { FOOD_IMAGES_KEY, EXERCISE_IMAGES_KEY } from 'constants/responseKeys'

import ContentCard from './ContentCard'

const BoardList = ({ type, path, list }) => {
  const imagesKey = type === 'food' ? FOOD_IMAGES_KEY : EXERCISE_IMAGES_KEY

  return (
    <WrapBoardList>
      {list.map((board) => (
        <ContentCard
          key={uuidv4()}
          type={type}
          isQuad
          urlArrs={board?.[imagesKey]}
          title={board?.title ?? ''}
          desc={board?.sub_title ?? ''}
          boardId={board?.board_id ?? ''}
        />
      ))}
    </WrapBoardList>
  )
}

export default BoardList

const WrapBoardList = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 15px;
`
