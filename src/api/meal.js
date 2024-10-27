import { getRequest, postRequest, postRequestExcel } from './instance'

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
  // Blob 형식으로 받기 위해 responseType을 'blob'으로 설정
  return postRequestExcel(`/food/excel`, data, {
    responseType: 'blob',
  })
}

// 식단 영양소 검색
export const getNutrientSearch = (params) => {
  return getRequest(`/food?search=${params.keyword}`)
}
