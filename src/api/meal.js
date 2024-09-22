import { getRequest } from './instance'

// BEST 식단 조회
export const getMealBest = () => {
  return getRequest(`/food/best`)
}
