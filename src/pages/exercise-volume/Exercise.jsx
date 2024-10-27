import { useCallback, useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { userExerciseListState, exerciseGramState, eachTotalWeightState } from 'atoms/exerciseAtom'

import { v4 as uuidv4 } from 'uuid'

import { useMutation, useQuery } from '@tanstack/react-query'
import { getExerciseList, getExerciseSearch } from 'api/exercise'

import styled from 'styled-components'
import { IoCloseOutline } from 'react-icons/io5'
import { PageTitle, Image, Button, Portal, Loading } from 'components'

import { EXERCISE_IMG_KEY } from 'constants/responseKeys'

const Exercise = () => {
  const [curMainTab, setCurMainTab] = useState('0')
  const [curClickedObj, setCurClickedObj] = useState({})
  const [userExerciseList, setUserExerciseList] = useRecoilState(userExerciseListState)
  const [exerciseList, setExerciseList] = useState([])
  const [eachTotWeight, setEachTotWeight] = useRecoilState(eachTotalWeightState)
  const [grams, setGrams] = useRecoilState(exerciseGramState)
  const [inputTxt, setInputTxt] = useState('') // 실시간 input 입력값
  const [keyword, setKeyword] = useState('') // 검색용 keyword
  const [showExerciseModal, setShowExerciseModal] = useState(false)

  const nutrientList = [
    { tabId: '0', tabName: '전체' },
    { tabId: '1', tabName: '가슴' },
    { tabId: '2', tabName: '등' },
    { tabId: '3', tabName: '어깨' },
    { tabId: '4', tabName: '팔' },
    { tabId: '5', tabName: '하체' },
  ]

  const { data, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ['getExerciseList', curMainTab, inputTxt === '' ? 'empty' : 'filled'],
    queryFn: () => getExerciseList({ type: curMainTab, take: 99, cursorId: 9999 }),
    throwOnError: (err) => console.error(err),
  })

  useEffect(() => {
    if (isSuccess) {
      setExerciseList(data)
    }
  }, [data, isSuccess])

  // inputTxt가 빈문자열일 때 영양소 목록 재조회
  useEffect(() => {
    if (!inputTxt) {
      refetch()
    }
  }, [inputTxt, refetch])

  // 선택한 횟수/무게/세트 값 초기화
  const resetGrams = () => {
    setGrams({
      reps: '',
      weight: '',
      sets: '',
    })
    setEachTotWeight(0)
  }

  // 모달 출력 여부 토글
  const toggleExerciseModal = () => {
    setShowExerciseModal(!showExerciseModal)
    resetGrams()
  }

  // 클릭한 운동 데이터 임시 저장
  const onClickExerciseData = (obj) => {
    setCurClickedObj(obj)
    toggleExerciseModal()
  }

  // 선택한 운동 리스트 저장/삭제
  const setUserExerciseListHandler = (setType, selectedData) => {
    if (setType === 'add') {
      if (userExerciseList.length > 8) {
        alert('운동 갯수는 9개까지만 가능합니다.')
        resetGrams()
        setShowExerciseModal(false)
        return
      }

      if (Object.values(grams).some((num) => !num)) {
        alert('운동 볼륨을 모두 입력해주세요.')
        return
      }
    }

    if (setType === 'add') {
      const uniqueSet = new Set(userExerciseList.map((item) => item.fitness_machine_id))
      if (!uniqueSet.has(selectedData.fitness_machine_id)) {
        const tempData = { ...selectedData, each_tot_weight: eachTotWeight, grams }
        setUserExerciseList((prev) => [...prev, tempData])
      }
    } else if (setType === 'remove') {
      const updatedExerciseList = userExerciseList.filter(
        (item) => item.fitness_machine_id !== selectedData.fitness_machine_id,
      )
      setUserExerciseList(updatedExerciseList)
    }

    resetGrams()
    setShowExerciseModal(false)
  }

  // 검색(5): mutation
  const searchMutation = useMutation({
    mutationFn: (params) => getExerciseSearch(params),
    onSuccess: (res) => setExerciseList(res),
    onError: (err) => console.error(err),
  })

  // 검색(4): keyword값이 변경될 때마다 유효성 검증 후 조회
  useEffect(() => {
    const keywordHandler = () => {
      if (!/^[ㄱ-ㅎ가-힣0-9]*$|^[a-zA-Z0-9]*$/g.test(inputTxt)) {
        alert('검색어는 한글과 영문을 혼합하거나 특수문자, 공백을 포함할 수 없습니다.')
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

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <FilledTabUl>
        {nutrientList.map(({ tabId, tabName }) => (
          <li key={uuidv4()}>
            <FilledButton type="button" $curValue={curMainTab === tabId} onClick={() => setCurMainTab(tabId)}>
              {tabName}
            </FilledButton>
          </li>
        ))}
      </FilledTabUl>
      <PageTitle size="h2">선택한 운동</PageTitle>
      <SelectedUl $hasItem={!!userExerciseList.length}>
        {userExerciseList.length ? (
          userExerciseList.map((list) => (
            <li key={uuidv4()}>
              <SelectedContDiv>
                <p>{list.fitness_machine_name}</p>
                <Image
                  src={list[EXERCISE_IMG_KEY]}
                  alt={`${list.fitness_machine_name} 이미지`}
                  width={85}
                  height={60}
                />
                <CloseButton type="button" onClick={() => setUserExerciseListHandler('remove', list)}>
                  <IoCloseOutline />
                </CloseButton>
              </SelectedContDiv>
            </li>
          ))
        ) : (
          <p>추가할 운동을 선택해주세요.</p>
        )}
      </SelectedUl>

      <Input value={inputTxt} autoComplete="on" maxLength={30} placeholder="식단 검색" onChange={onChangeKeyword} />

      <ItemsDiv>
        {exerciseList.length &&
          exerciseList.map((list) => (
            <ContentCardWrap key={uuidv4()}>
              <Image src={list[EXERCISE_IMG_KEY]} alt={`${list?.fitness_machine_name} 이미지`} />
              <TitleDiv>
                <TitleH2>{list?.fitness_machine_name ?? ''}</TitleH2>
                <Button color="mainBlue" onClick={() => onClickExerciseData(list)}>
                  선택
                </Button>
              </TitleDiv>
              <p>{list?.fitness_machine_notice ?? ''}</p>
            </ContentCardWrap>
          ))}
      </ItemsDiv>
      {showExerciseModal && (
        <Portal
          portalType="exerciseModal"
          data={curClickedObj}
          onClose={toggleExerciseModal}
          onClick={() => setUserExerciseListHandler('add', curClickedObj)}
        />
      )}
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
  font-size: ${({ theme }) => theme.fontSize.regular};
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
  & > img {
    object-fit: contain;
  }
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
  font-size: 18px;
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
