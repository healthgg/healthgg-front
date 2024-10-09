import { getRequest } from './instance'

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
