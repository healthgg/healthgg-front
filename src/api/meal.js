import { getRequest } from './instance'

// BEST 식단 조회
export const getMealBest = () => {
  return getRequest(`/food/best`)
}

// 식단 상세 조회
export const getMealDetail = (params) => {
  return getRequest(`/food/board/${params.boardId}`)
}

// 영양소 목록 조회
export const getNutrientList = (params) => {
  const { type, take = '', cursorId = '' } = params
  return getRequest(`/food/${type}?take=${take}&cursorId=${cursorId}`)
}
