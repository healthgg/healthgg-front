import { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { useQuery } from '@tanstack/react-query'

import { getExerciseDetail } from 'api/exercise'

import { PageTitle, DetailCard, Loading } from 'components'

const ExerciseDetail = () => {
  const { boardId = '' } = useParams()

  const [boardTitle, setBoardTitle] = useState('')
  const [exerciseArr, setExerciseArr] = useState([])

  // todo: 에러페이지 제작 후 isError || error일 때 해당 페이지로 랜딩
  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ['getExerciseDetail'],
    queryFn: () => getExerciseDetail({ boardId }),
    throwOnError: (err) => console.error(err),
  })

  useEffect(() => {
    const { description, title } = data?.[0] || {}
    if (isSuccess) {
      setBoardTitle(title)
      setExerciseArr(Object.values(description).flat())
    }
  }, [isSuccess, data])

  return (
    <>
      {isLoading && <Loading />}
      {isSuccess && data && (
        <>
          <PageTitle>{boardTitle}</PageTitle>
          <DetailCard type="exercise_volume" list={exerciseArr} />
        </>
      )}
    </>
  )
}

export default ExerciseDetail
