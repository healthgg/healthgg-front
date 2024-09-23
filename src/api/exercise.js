import { getRequest } from './instance'

// BEST 운동볼륨 조회
export const getExerciseBest = () => {
  return getRequest(`/exercise_volume/best`)
}

// 운동볼륨 조회
export const getExerciseDetail = (params) => {
  return getRequest(`/exercise_volume/board/${params.boardId}`)
}
