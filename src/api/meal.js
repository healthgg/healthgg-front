import { getRequest, postRequest } from './instance'

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

// 식단 공유하기
export const postMealShare = (data) => {
  return postRequest(`/food/share`, data)
}

// 식단 엑셀 다운로드
export const postMealDownload = (data) => {
  return postRequest(`/food/excel`, data)
}
