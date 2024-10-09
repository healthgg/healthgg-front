import { useEffect, useState } from 'react'

import { v4 as uuidv4 } from 'uuid'

import { useQuery } from '@tanstack/react-query'

import styled from 'styled-components'
import { IoCloseOutline } from 'react-icons/io5'
import { PageTitle, Image, ContentCard } from 'components'

const Exercise = () => {
  const [curMainTab, setCurMainTab] = useState('전체')
  const [userSelectedList, setUserSelectedList] = useState({})
  const [isChosen, setIsChosen] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [mealObject, setMealObject] = useState('muscles')

  const exerciseList = ['전체', '가슴', '등', '어깨', '팔', '하체']
  const mealObjectList = [
    { id: 'muscles', title: '근성장' },
    { id: 'diet', title: '다이어트' },
    { id: 'maintain', title: '체중유지' },
  ]

  return (
    <>
      <FilledTabUl>
        {exerciseList.map((exercise) => (
          <li key={uuidv4()}>
            <FilledButton type="button" $curValue={curMainTab === exercise} onClick={() => setCurMainTab(exercise)}>
              {exercise}
            </FilledButton>
          </li>
        ))}
      </FilledTabUl>
      <PageTitle size="h2">선택한 식단</PageTitle>
      <SelectedUl>
        {!isChosen ? (
          <li>선택한 식단이 없습니다.</li>
        ) : (
          userSelectedList.map((value) => (
            <li key={uuidv4()}>
              <SelectedContDiv>
                <p>{value.food_name}</p>
                <Image src={value.food_imageurl} alt={`${value.food_name} 이미지`} width={85} height={60} />
                <CloseButton type="button">
                  <IoCloseOutline />
                </CloseButton>
              </SelectedContDiv>
            </li>
          ))
        )}
      </SelectedUl>
      <RadioUl>
        {mealObjectList.map((list) => (
          <li key={uuidv4()}>
            <input
              type="radio"
              id={list.id}
              name="mealObject"
              checked={list.id === mealObject}
              onChange={() => setMealObject(list.id)}
            />
            <label htmlFor={list.id}>{list.title}</label>
          </li>
        ))}
      </RadioUl>
      <p>{mealObject}</p>
      {/* <input value={onChangeKeyword} autoComplete="on" maxLength={30} placeholder="하이" onChange={onChangeWord} /> */}
      {/* <ItemsDiv></ItemsDiv> */}
    </>
  )
}

export default Exercise

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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 20px 10px;
  min-height: 120px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.bgWhite};
`

const SelectedContDiv = styled.div`
  position: relative;
  width: 100px;
  & > p {
    padding: 0 3px 5px 3px;
    text-align: left;
    font-weight: ${({ theme }) => theme.fontWeight.subTitle};
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.mainBlue};
  color: ${({ theme }) => theme.colors.bgWhite};
`

const RadioUl = styled.ul`
  display: flex;
  gap: 20px;
  margin: 20px 0;
  & > li {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`

const ItemsDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 28px 16px;
  & img {
    width: 100%;
    height: 136px;
  }
`
