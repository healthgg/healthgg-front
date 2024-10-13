import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { userMealListState, mealGramState } from 'atoms/mealAtom'

import { v4 as uuidv4 } from 'uuid'

import { useQuery } from '@tanstack/react-query'
import { getNutrientList } from 'api/meal'

import styled from 'styled-components'
import { IoCloseOutline } from 'react-icons/io5'
import { PageTitle, Image, Button, Portal, Loading } from 'components'

import { FOOD_IMG_ARR_KEY, BREAKFAST, LUNCH, DINNER } from 'constants/responseKeys'

const Meal = () => {
  const [curMainTab, setCurMainTab] = useState('1')
  const [curSubTab, setCurSubTab] = useState(BREAKFAST)
  const [curClickedObj, setCurClickedObj] = useState({})
  const [userMealList, setUserMealList] = useRecoilState(userMealListState)
  const [grams, setGrams] = useRecoilState(mealGramState)
  const [keyword, setKeyword] = useState('')
  const [mealObject, setMealObject] = useState('muscles')
  const [showMealModal, setShowMealModal] = useState(false)

  const nutrientList = [
    { tabId: '1', tabName: '단백질' },
    { tabId: '2', tabName: '탄수화물' },
    { tabId: '3', tabName: '지방' },
    { tabId: '4', tabName: '비타민' },
  ]
  const repastList = [BREAKFAST, LUNCH, DINNER]
  const mealObjectList = [
    { id: 'muscles', title: '근성장' },
    { id: 'diet', title: '다이어트' },
    { id: 'maintain', title: '체중유지' },
  ]

  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ['getNutrientList', curMainTab],
    queryFn: () => getNutrientList({ type: curMainTab, take: 99, cursorId: 9999 }),
    throwOnError: (err) => console.error(err),
  })

  // 탭 설정
  const setCurTab = (tabType, value) => (tabType === 'main' ? setCurMainTab(value) : setCurSubTab(value))

  // 모달 출력 여부 토글
  const toggleMealModal = () => {
    setShowMealModal(!showMealModal)
    setGrams('')
  }

  // 클릭한 식단 데이터 임시 저장
  const onClickMealData = (obj) => {
    setCurClickedObj(obj)
    toggleMealModal()
  }

  // 선택한 식단 리스트 저장/삭제
  const setMealList = (setType, selectedData) => {
    if (setType === 'add') {
      if (userMealList[curSubTab].length > 5) {
        alert('끼니 당 식단은 6개까지만 가능합니다.')
        setGrams('')
        setShowMealModal(false)
        return
      }
      if (!grams) {
        alert('섭취량(g)을 적어주세요.')
        return
      }
    }

    let updatedMealList = [...userMealList[curSubTab]]
    if (setType === 'add') {
      const uniqueSet = new Set(updatedMealList.map((item) => item.food_id))
      if (!uniqueSet.has(selectedData.food_id)) updatedMealList.push({ ...selectedData, food_weight: grams })
    } else if (setType === 'remove') {
      updatedMealList = updatedMealList.filter((item) => item.food_id !== selectedData.food_id)
    }

    setUserMealList((prev) => ({
      ...prev,
      [curSubTab]: updatedMealList,
    }))

    setGrams('')
    setShowMealModal(false)
  }

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <FilledTabUl>
        {nutrientList.map(({ tabId, tabName }) => (
          <li key={uuidv4()}>
            <FilledButton type="button" $curValue={curMainTab === tabId} onClick={() => setCurTab('main', tabId)}>
              {tabName}
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
      <SelectedUl $hasItem={!!userMealList?.[curSubTab].length}>
        {userMealList?.[curSubTab].length ? (
          userMealList?.[curSubTab].map((list) => (
            <li key={uuidv4()}>
              <SelectedContDiv>
                <p>{list.food_name}</p>
                <Image src={list[FOOD_IMG_ARR_KEY]} alt={`${list.food_name} 이미지`} width={85} height={60} />
                <CloseButton type="button" onClick={() => setMealList('remove', list)}>
                  <IoCloseOutline />
                </CloseButton>
              </SelectedContDiv>
            </li>
          ))
        ) : (
          <p>추가할 식단을 선택해주세요.</p>
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
      {/* <input value={onChangeKeyword} autoComplete="on" maxLength={30} placeholder="하이" onChange={onChangeWord} /> */}
      <ItemsDiv>
        {data &&
          data.map((list) => (
            <ContentCardWrap key={uuidv4()}>
              <Image src={list[FOOD_IMG_ARR_KEY]} alt={`${list?.food_name} 이미지`} />
              <TitleDiv>
                <TitleH2>{list?.food_name ?? ''}</TitleH2>
                <Button color="mainBlue" onClick={() => onClickMealData(list)}>
                  선택
                </Button>
              </TitleDiv>
              <p>{list?.food_notice ?? ''}</p>
            </ContentCardWrap>
          ))}
      </ItemsDiv>
      {showMealModal && (
        <Portal
          portalType="mealModal"
          data={curClickedObj}
          onClose={toggleMealModal}
          onClick={() => setMealList('add', curClickedObj)}
        />
      )}
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
  display: ${({ $hasItem }) => ($hasItem ? 'grid' : 'flex')};
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px 10px;
  padding: 20px 10px;
  min-height: 128px;
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
    & * {
      cursor: pointer;
    }
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
  width: calc(100% - 40px);
  font-size: 20px;
  font-weight: ${({ theme }) => theme.fontWeight.title};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  & + button {
    display: flex;
    align-items: center;
    padding: 0 4px;
    height: 18px;
    font-size: 11px;
  }
`
