import { useEffect, useState } from 'react'

import { v4 as uuidv4 } from 'uuid'

import styled from 'styled-components'
import { IoCloseOutline } from 'react-icons/io5'
import { PageTitle, Image } from 'components'

import { BREAKFAST, LUNCH, DINNER } from 'constants/responseKeys'

const Meal = () => {
  const [curMainTab, setCurMainTab] = useState('전체')
  const [curSubTab, setCurSubTab] = useState(BREAKFAST)
  const [userSelectedList, setUserSelectedList] = useState({
    [BREAKFAST]: [
      {
        food_id: 2,
        nutrient_id: 2,
        food_imageurl:
          'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201912/16/07712b9e-e451-49c7-a65c-fb94b6dcda0b.jpg',
        food_name: '피자',
        food_notice: '맛있는 피자입니다',
      },
    ],
    [LUNCH]: [
      {
        food_id: 4,
        nutrient_id: 4,
        food_imageurl: 'https://example.com/image4.jpg',
        food_name: '샐러드',
        food_notice: '신선한 샐러드',
      },
    ],
    [DINNER]: [
      {
        food_id: 5,
        nutrient_id: 5,
        food_imageurl: 'https://example.com/image5.jpg',
        food_name: '스테이크',
        food_notice: '구운 스테이크',
      },
    ],
  })
  const [isChosen, setIsChosen] = useState(false)

  const nutrientList = ['전체', '단백질', '탄수화물', '지방', '비타민']
  const repastList = [BREAKFAST, LUNCH, DINNER]

  const setCurTab = (tabType, value) => (tabType === 'main' ? setCurMainTab(value) : setCurSubTab(value))

  useEffect(() => {
    const allSelected = [...userSelectedList[BREAKFAST], ...userSelectedList[LUNCH], ...userSelectedList[DINNER]]
    setIsChosen(allSelected.length > 0)
    console.log(userSelectedList[curSubTab])
  }, [userSelectedList])

  return (
    <>
      <FilledTabUl>
        {nutrientList.map((nutrient) => (
          <li key={uuidv4()}>
            <FilledButton type="button" $curValue={curMainTab === nutrient} onClick={() => setCurTab('main', nutrient)}>
              {nutrient}
            </FilledButton>
          </li>
        ))}
      </FilledTabUl>
      <PageTitle size="h2">선택한 식단</PageTitle>
      <LinedTabUl>
        {repastList.map((repast) => (
          <LinedTabLi key={uuidv4()} $curValue={curSubTab === repast}>
            <LinedButton type="button" $curValue={curSubTab === repast} onClick={() => setCurTab('sub', repast)}>
              {repast}
            </LinedButton>
          </LinedTabLi>
        ))}
      </LinedTabUl>
      <SelectedUl>
        {!isChosen ? (
          <li>선택한 식단이 없습니다.</li>
        ) : (
          userSelectedList?.[curSubTab].map((value) => (
            <li key={uuidv4()}>
              <div>
                <p>{value.food_name}</p>
                <Image src={value.food_imageurl} alt={`${value.food_name} 이미지`} width={85} height={60} />
                <button type="button">
                  <IoCloseOutline />
                </button>
              </div>
            </li>
          ))
        )}
      </SelectedUl>
    </>
  )
}

export default Meal

const FilledTabUl = styled.ul`
  display: flex;
  height: 40px;
  margin-bottom: 30px;
  & > li {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
`

const FilledButton = styled.button`
  width: 100%;
  height: 100%;
  border-radius: 3px;
  background-color: ${({ theme, $curValue }) => ($curValue ? theme.colors.mainBlue : theme.colors.bgWhite)};
  color: ${({ theme, $curValue }) => ($curValue ? theme.colors.bgWhite : theme.colors.typoBlack)};
  font-size: 15px;
  font-weight: ${({ theme, $curValue }) => ($curValue ? theme.fontWeight.title : theme.fontWeight.medium)};
`

const LinedTabUl = styled.ul`
  display: flex;
  height: 40px;
`

const LinedTabLi = styled.li`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border-bottom: ${({ theme, $curValue }) => `2px solid ${$curValue ? theme.colors.mainBlue : theme.colors.bgWhite}`};
`

const LinedButton = styled.button`
  color: ${({ theme, $curValue }) => ($curValue ? theme.colors.mainBlue : theme.colors.typoBlack)};
  font-weight: ${({ theme, $curValue }) => ($curValue ? theme.fontWeight.title : theme.fontWeight.medium)};
`

const SelectedUl = styled.ul`
  display: flex;
  align-items: center;
  padding: 10px;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.bgWhite};
  border-radius: 5px;
  text-align: center;
  & > li {
    flex: 1;
  }
`
