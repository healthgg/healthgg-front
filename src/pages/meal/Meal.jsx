import { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { userMealListState, mealGramState } from 'atoms/mealAtom'

import { v4 as uuidv4 } from 'uuid'

import { useMutation, useQuery } from '@tanstack/react-query'
import { getNutrientList, getNutrientSearch } from 'api/meal'

import styled from 'styled-components'
import { IoCloseOutline } from 'react-icons/io5'
import { PageTitle, Image, Button, Portal, Loading } from 'components'

import { FOOD_IMG_ARR_KEY, BREAKFAST, LUNCH, DINNER } from 'constants/responseKeys'

const Meal = () => {
  const [curMainTab, setCurMainTab] = useState('0')
  const [curSubTab, setCurSubTab] = useState(BREAKFAST)

  const [curClickedObj, setCurClickedObj] = useState({})
  const [userMealList, setUserMealList] = useRecoilState(userMealListState)
  const [mealList, setMealList] = useState([])
  const [grams, setGrams] = useRecoilState(mealGramState)

  const [inputTxt, setInputTxt] = useState('') // 실시간 input 입력값
  const [keyword, setKeyword] = useState('') // 검색용 keyword

  const [showMealModal, setShowMealModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const nutrientList = [
    { tabId: '0', tabName: '전체' },
    { tabId: '1', tabName: '단백질' },
    { tabId: '2', tabName: '탄수화물' },
    { tabId: '3', tabName: '지방' },
    { tabId: '4', tabName: '비타민' },
  ]
  const repastList = [BREAKFAST, LUNCH, DINNER]

  const { data, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ['getNutrientList', curMainTab, inputTxt === '' ? 'empty' : 'filled'],
    queryFn: () => getNutrientList({ type: curMainTab, take: 99, cursorId: 9999 }),
    throwOnError: (err) => console.error(err),
  })

  useEffect(() => {
    if (isSuccess) {
      setMealList(data)
    }
  }, [data, isSuccess])

  // inputTxt가 빈문자열일 때 영양소 목록 재조회
  useEffect(() => {
    if (!inputTxt) {
      refetch()
    }
  }, [inputTxt, refetch])

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
  const setUserMealListHandler = (setType, selectedData) => {
    if (setType === 'add') {
      if (userMealList[curSubTab].length > 5) {
        setErrorMsg('끼니 당 식단은 6개까지만 가능합니다.')
        setGrams('')
        setShowMealModal(false)
        return
      }
      if (!grams) {
        setErrorMsg('섭취량(g)을 적어주세요.')
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

  // 검색(5): mutation
  const searchMutation = useMutation({
    mutationFn: (params) => getNutrientSearch(params),
    onSuccess: (res) => setMealList(res),
    onError: (err) => console.error(err),
  })

  // 검색(4): keyword값이 변경될 때마다 유효성 검증 후 조회
  useEffect(() => {
    const keywordHandler = () => {
      if (!/^[ㄱ-ㅎ가-힣0-9]*$|^[a-zA-Z0-9]*$/g.test(inputTxt)) {
        setErrorMsg('검색어는 한글과 영문을 혼합하거나 특수문자, 공백을 포함할 수 없습니다.')
        setInputTxt('')
        setKeyword('')
        return
      }
      searchMutation.mutate({ keyword })
    }
    if (!keyword) return
    keywordHandler()
  }, [keyword])

  // 검색(3): 커스텀 디바운스 함수, 리턴문에 의해 아래의 함수 반환
  const debounce = (callback, delay) => {
    let timerId = null
    return (...args) => {
      if (timerId) clearTimeout(timerId)
      timerId = setTimeout(() => {
        callback(...args)
      }, delay)
    }
  }

  // 검색(2): 키워드 데이터 세팅 시 디바운스 함수 호출
  const setKeywordData = useCallback(
    debounce((txt) => {
      setKeyword(txt)
    }, 1000),
    [],
  )

  // 검색(1): input 값이 바뀔 때 userInput과 디바운스 함수에 해당 값 전달
  const onChangeKeyword = (e) => {
    if (!e.target.value) {
      setInputTxt('')
      setKeyword('')
    }
    setInputTxt(e.target.value)
    setKeywordData(e.target.value)
  }

  useEffect(() => {
    setShowErrorModal(!!errorMsg)
  }, [errorMsg])

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
                <CloseButton type="button" onClick={() => setUserMealListHandler('remove', list)}>
                  <IoCloseOutline />
                </CloseButton>
              </SelectedContDiv>
            </li>
          ))
        ) : (
          <p>추가할 식단을 선택해주세요.</p>
        )}
      </SelectedUl>

      <Input value={inputTxt} autoComplete="on" maxLength={30} placeholder="식단 검색" onChange={onChangeKeyword} />

      <ItemsDiv>
        {mealList.length &&
          mealList.map((list) => (
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
          onClick={() => setUserMealListHandler('add', curClickedObj)}
        />
      )}
      {showErrorModal && <Portal portalType="errorModal" data={{ errorMsg }} onClose={() => setErrorMsg('')} />}
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
  & > p {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${({ theme }) => theme.fontSize.regular};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    color: ${({ theme }) => theme.colors.bgGray};
  }
`

const Input = styled.input`
  margin-top: 20px;
  width: 100%;
  height: 36px;
  padding: 0 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.bgWhite};
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.mainBlue};
  }
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
  & > img {
    border: 2px solid #c9c9c9;
    border-radius: 3px;
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

const ItemsDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 28px 16px;
  margin-top: 20px;
  & img {
    width: 100%;
    height: 136px;
  }
`

const ContentCardWrap = styled.div`
  overflow: hidden;
  & > p {
    width: 100%;
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & > img {
    border: 1px solid #c9c9c9;
    border-radius: 3px;
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
    padding: 4px 8px;
    height: 100%;
    font-size: 13px;
  }
`
