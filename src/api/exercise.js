import { getRequest, postRequest, postRequestExcel } from './instance'

// BEST 운동볼륨 조회
export const getExerciseBest = () => {
  return getRequest(`/exercise_volume/best`)
}

// 운동볼륨 조회
export const getExerciseDetail = (params) => {
  return getRequest(`/exercise_volume/board/${params.boardId}`)
}

// 운동 목록 조회
export const getExerciseList = (params) => {
  const { type, take = '', cursorId = '' } = params
  return getRequest(`/fitness_machine/${type}?take=${take}&cursorId=${cursorId}`)
}

// 운동 공유하기
export const postExerciseShare = (data) => {
  return postRequest(`/exercise_volume/share`, data)
}

// 운동볼륨 엑셀 다운로드
export const postExerciseDownload = (data) => {
  // Blob 형식으로 받기 위해 responseType을 'blob'으로 설정
  return postRequestExcel(`/exercise_volume/excel`, data, {
    responseType: 'blob',
  })
}

// 운동 검색
export const getExerciseSearch = (params) => {
  return getRequest(`/fitness_machine?search=${params.keyword}`)
}
