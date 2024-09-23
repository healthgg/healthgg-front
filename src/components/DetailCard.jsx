import { v4 as uuidv4 } from 'uuid'

import styled from 'styled-components'

import { FOOD_IMG_ARR_KEY, EXERCISE_IMG_KEY } from 'constants/responseKeys'

import Image from './Image'

const DetailCard = ({ type, list }) => {
  const nurientNamesArr = [
    { ko: '칼로리', en: 'calory' },
    { ko: '단백질', en: 'protein' },
    { ko: '탄수화물', en: 'carbohydrate' },
    { ko: '지방', en: 'fat' },
  ]
  const routineNamesArr = [
    { ko: '세트', en: 'set' },
    { ko: '반복횟수', en: 'repetition' },
    { ko: '무게', en: 'weight' },
    { ko: '총 중량', en: 'total_weight' },
  ]
  const isTypeFood = type === 'food'
  const targetArr = isTypeFood ? nurientNamesArr : routineNamesArr
  const imagesKey = isTypeFood ? FOOD_IMG_ARR_KEY : EXERCISE_IMG_KEY

  return (
    <CardUl>
      {list.map((data) => (
        <CardLi key={uuidv4()}>
          <Image
            src={data?.[imagesKey]}
            alt={`${data?.[isTypeFood ? 'food_name' : '근력 운동 자세 ']} 이미지`}
            width={175}
            height={175}
          />
          <div>
            {targetArr.map((name) => (
              <p key={uuidv4()}>
                <span>{name.ko}</span>
                <br />
                <span>{isTypeFood ? data?.nutrient?.[name.en] : data?.[name.en]}</span>
              </p>
            ))}
          </div>
        </CardLi>
      ))}
    </CardUl>
  )
}

export default DetailCard

const CardUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 36px;
  justify-content: center;
`

const CardLi = styled.li`
  display: flex;
  gap: 40px;
  & > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    p > span:first-child {
      font-size: 16px;
      font-weight: ${({ theme }) => theme.fontWeight.title};
    }
    p > span:last-child {
      font-size: 14px;
    }
  }
`
