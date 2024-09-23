import { getRequest } from './instance'

// BEST 식단 조회
export const getMealBest = () => {
  return getRequest(`/food/best`)
}

// 식단 상세 조회
export const getMealDetail = (params) => {
  return getRequest(`/food/board/${params.boardId}`)
}
