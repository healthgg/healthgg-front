import { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { useQuery } from '@tanstack/react-query'

import { getMealDetail } from 'api/meal'

import { PageTitle, DetailCard } from 'components'

const MealDetail = () => {
  const { boardId = '' } = useParams()

  const [boardTitle, setBoardTitle] = useState('')
  const [mealArr, setMealArr] = useState([])

  // todo: 에러페이지 제작 후 isError || error일 때 해당 페이지로 랜딩
  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ['getMealDetail'],
    queryFn: () => getMealDetail({ boardId }),
    throwOnError: (err) => console.error(err),
  })

  useEffect(() => {
    const { description, title } = data?.[0] || {}
    if (isSuccess) {
      setBoardTitle(title)
      setMealArr(Object.values(description).flat())
    }
  }, [isSuccess, data])

  return (
    <>
      {isLoading && <p>로딩중</p>}
      {isSuccess && data && (
        <>
          <PageTitle>{boardTitle}</PageTitle>
          <DetailCard type="food" list={mealArr} />
        </>
      )}
    </>
  )
}

export default MealDetail
