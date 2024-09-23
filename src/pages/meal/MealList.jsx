import { useQuery } from '@tanstack/react-query'

import { getMealBest } from 'api/meal'

import { PageTitle, BoardList } from 'components'

const MealList = () => {
  // todo: 에러페이지 제작 후 isError || error일 때 해당 페이지로 랜딩
  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ['getMealBest'],
    queryFn: () => getMealBest(),
    throwOnError: (err) => console.error(err),
  })

  // todo: 무한스크롤
  return (
    <>
      <PageTitle>🍜 BEST 식단</PageTitle>
      {isLoading && <p>로딩중</p>}
      {isSuccess && data && <BoardList type="food" path="/meal" list={data} />}
    </>
  )
}

export default MealList
